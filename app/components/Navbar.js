"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Toggle } from "@/components/ui/toggle";

export default function Navbar() {
  const { theme, setTheme } = useTheme(); // Use the useTheme hook
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const isDarkMode = theme === "dark"; // Check if the current theme is dark

  return (
    <nav
      className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-2 md:px-8">
        <div className="flex items-center space-x-2 md:space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full"
                  style={{
                    backgroundColor: "var(--input)",
                    color: "var(--foreground)",
                  }}
                />
                <Button variant="ghost" className="justify-start">
                  Login
                </Button>
                <Toggle
                  aria-label="Toggle dark mode"
                  pressed={isDarkMode}
                  onPressedChange={() =>
                    setTheme(isDarkMode ? "light" : "dark")
                  } // Toggle theme
                  className="justify-start"
                >
                  {isDarkMode ? (
                    <>
                      <Sun className="mr-2 h-4 w-4" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="mr-2 h-4 w-4" />
                      Dark Mode
                    </>
                  )}
                </Toggle>
              </nav>
            </SheetContent>
          </Sheet>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Toggle search</span>
          </Button>
          <a
            href="/"
            className="text-xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            MyApp
          </a>
        </div>
        <div className="hidden md:flex md:items-center md:space-x-4">
          <Input
            type="search"
            placeholder="Search..."
            className="w-[200px] md:w-[300px]"
            style={{
              backgroundColor: "var(--input)",
              color: "var(--foreground)",
            }}
          />
          <Button
            variant="ghost"
            className="text-slate-700 dark:text-slate-400"
            style={{ color: "var(--foreground)" }}
          >
            Login
          </Button>
          <Toggle
            aria-label="Toggle dark mode"
            pressed={isDarkMode}
            onPressedChange={() => setTheme(isDarkMode ? "light" : "dark")} // Toggle theme
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Toggle>
        </div>
      </div>
      {isSearchVisible && (
        <div
          className="border-t border-slate-200 p-2 dark:border-slate-700"
          style={{ backgroundColor: "var(--card)" }}
        >
          <Input
            type="search"
            placeholder="Search..."
            className="w-full"
            style={{
              backgroundColor: "var(--input)",
              color: "var(--foreground)",
            }}
          />
        </div>
      )}
    </nav>
  );
}
