// /api/news

const { NextResponse } = require("next/server");
import pool from "@/app/utils/connection";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const searchQuery = searchParams.get("search") || ""; // Get search query parameter
  const sourceFilter = searchParams.get("source") || ""; // Get source filter parameter
  const page = parseInt(searchParams.get("page")) || 1; // Get pagination page number
  const limit = parseInt(searchParams.get("limit")) || 10; // Get pagination limit
  const offset = (page - 1) * limit; // Calculate offset

  try {
    // Base SQL query for fetching news
    let sqlQuery = `
      SELECT title, link, date, description, source 
      FROM news 
      WHERE TRUE
    `;

    const queryConditions = [];
    const params = [];

    // Add conditions for search query
    if (searchQuery) {
      queryConditions.push(`title ~* $${queryConditions.length + 1}`);
      params.push(`\\y${searchQuery}\\y`);
    }

    // Add conditions for source filter
    if (sourceFilter) {
      queryConditions.push(`source = $${queryConditions.length + 1}`);
      params.push(sourceFilter);
    }

    // If there are query conditions, append them to SQL
    if (queryConditions.length > 0) {
      sqlQuery += " AND " + queryConditions.join(" AND ");
    }

    // Count total articles matching the criteria
    let countQuery = `
      SELECT COUNT(*) AS total 
      FROM news 
      WHERE TRUE
    `;
    const countConditions = [];

    if (searchQuery) {
      countConditions.push(`title ~* $${countConditions.length + 1}`);
    }

    if (sourceFilter) {
      countConditions.push(`source = $${countConditions.length + 1}`);
    }

    // Append conditions to the count query
    if (countConditions.length > 0) {
      countQuery += " AND " + countConditions.join(" AND ");
    }

    // Execute the count query first
    const countResult = await pool.query(countQuery, params);
    const totalArticles = parseInt(countResult.rows[0].total, 10); // Get total articles count

    // Add order by, limit, and offset for pagination to the news query
    sqlQuery += ` ORDER BY date DESC LIMIT $${params.length + 1} OFFSET $${
      params.length + 2
    }`;
    params.push(limit, offset);

    // Execute the SQL query for paginated articles
    const result = await pool.query(sqlQuery, params);

    // Format response data
    const newsList = result.rows.map((item) => ({
      title: item.title,
      link: item.link,
      date: item.date ? item.date.toISOString() : null,
      description: item.description,
      source: item.source,
    }));

    // Return the news with pagination info
    return NextResponse.json({
      page,
      limit,
      news: newsList,
      totalArticles, // Include total articles in the response
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}