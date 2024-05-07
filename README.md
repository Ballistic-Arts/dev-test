# React/NextJS Frontend for WordPress Backend

## Result:
A simple React/NextJS application that uses data from the WordPress JSON API as its backend.

## Instructions

### Running the project locally
  - In the root directory of the project, run `npm run dev`

### Documentation
In my own words, my understanding is as follows;
  - To build a React/NextJS app using data from the WordPress JSON API as the backend
  - Freedom to customize the layout, other than a mandatory Header containing the main menu (Home, Posts, Pages/Dropdown Menu) and footer that displays on every page
  - Only recent posts from the /posts endpoint listed on the Home Page, listed with the most recent post showing first, and special styling applied to show that the most recent one (1st one in the list) is "featured", with each post containing title, image if applicable, and excerpt. OnClick of the link should route to a template page which shows the post in full detail within the application.
  - Fetch data using fetch API, and handle potential errors & loading states, use Next App Router with URLs & page names that make sense
  - Basic styling using Tailwind CSS, with layout being responsive and mobile-friendly

My assumptions during development were as follows;
  - Use the /posts endpoint and the /pages endpoint for the content
  - Some posts have images/videos, some do not
  - Determine if a post has images/videos based on the featured_media value, if it is not 0, use the /media endpoint with the featured_media value (id) to render images/videos in post previews on the Home Page
  - Posts in both the home page and posts page are to display images/videos if applicable
  - Posts in the home page are only recent posts with excerpts
  - Posts in the posts page are all the posts in a list with full content of each one
  - Home page is supposed to have only the most recent posts, so there are only 4 being displayed
  - The dropdown menu (Pages button) lists pages from the API, and onClick they route to the link from the API instead of being displayed within the application
  - The template page is for dynamically showing single posts in more detail
  - The posts page shows posts in full detail but in list format, as well as routing to the template page for single view
  - ACF Fields weren't applicable given the absence of ACF values in the objects returned by the API requests from /posts
  - Content in the footer is not of importance
  - Footer is supposed to be fixed and always in view
  - Keep styling simple and basic
  - Formatting or styling the content/excerpts from the posts was not necessary

Overall, I hope you enjoy reviewing my project. I made the most calculated assumptions possible based on the instructions, which were mostly clear, however there were some gray areas. In general, I tried to display skills related to code organization, working with API's, error handling, CSS styling, and good documentation during this assessment.  

