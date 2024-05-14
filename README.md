# Next.js and WordPress JSON API Project | BA Test

This is a simple Next.js application that uses the WordPress JSON API as its backend. The application features a homepage that lists recent posts, and templates for displaying individual pages and posts. The styling is done using Tailwind CSS.

## Features

- Home page displaying recent posts
- Individual post and page templates
- Responsive design
- Header with navigation and dropdown menu
- Footer

## Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later) or yarn (v1.x or later)

## Assumptions and Decisions
- API Endpoints: The WordPress JSON API is accessible at https://dev-test.yourballistic.com/wp-json.
- No Authentication Required: The API does not require authentication.
- App Directory Structure: The project uses the Next.js App Directory structure introduced in Next.js 14.
- Inline Styles: The project renders content with inline styles directly from the API using dangerouslySetInnerHTML.
- Responsive Design: Tailwind CSS is used to ensure the application is responsive and user-friendly.