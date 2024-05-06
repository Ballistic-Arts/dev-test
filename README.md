# Web Development Test: React/NextJS Frontend for WordPress Backend

## Objective:
Develop a simple React/NextJS application that uses data from the WordPress JSON API as its backend. 
The application should have a homepage and templates for displaying individual pages and posts.

## Instructions

### 1. API Endpoints
   - The WordPress JSON API will be accessible from `https://dev-test.yourballistic.com/wp-json`. 
   - No auth is required, as you'll only be using get endpoints that aren't protected.
   - Be careful with CORS errors.
   - Feel free to explore the API to understand the structure of posts, pages, and ACF fields. You are free to use any endpoints you wish as long as the data being pulled is correct.

### 2. Layout
  - You're free to customize the layout. The only requirements are that you have a header with the main menu and a footer on every page.
  - The main menu should have three buttons: "Home", "Posts", and "Pages". The last one should be a dropdown that shows pages coming from the API.

### 3. Homepage:
   - Create a homepage that displays a list of recent posts with the most recent post being 'featured'. Make the featured post stand out in whichever way you prefer. 
   - Each post on the list entry should display the title, featured image, excerpt, and should link to the individual post page.

### 4. Post/Page Template:
   - Develop a couple of templates for viewing individual posts and pages.
   - The templates should display the title, content, and any ACF fields associated with the posts.
   - Ensure the template handles and displays media (images, videos) properly if included in the post/page content.

### 5. Fetching Data:
   - Use `fetch` API or any suitable library like Axios to retrieve data from the WordPress JSON API.
   - Implement proper error handling and loading states while data is being fetched.

### 6. Routing:
   - You're free to use whatever routing pattern you choose. (NextJS App Router is preferred).
   - URLs should be user-friendly and SEO-friendly.

### 7. Styling:
   - Apply basic styling using a CSS lib like Tailwind, Chakra or MaterialUI. The layout should be responsive and mobile-friendly.

### 8. Documentation:
   - Provide a README file with instructions on how to run the project locally.
   - Document any assumptions or decisions made during the development process.

## Submission:
- Submit the complete source code via by creating a Pull Request to this repository.

## Evaluation Criteria:
- Functionality: The application works and meets all functional requirements.
- Code Quality: Code is clean, well-organized, and properly commented.
- UI/UX Design: The application is easy to navigate on any device size.
- Error Handling: The application gracefully handles and reports errors.
