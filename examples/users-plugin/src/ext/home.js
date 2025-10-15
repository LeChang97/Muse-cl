// Define the Homepage
// In Muse, pages are usually mapped under specific URL patterns, but the root path "/" is treated specially as the homepage.
// The main app of a Muse plugin is rendered by `@ebay/muse-lib-react`, which provides an extension point `home.homepage` for customizing the homepage.
// You can attach any React component as the homepage by creating a file `src/ext/home.js` like this one.
// Once configured, visiting the root path "/" will render your custom homepage component inside the main app area.

// Import the React component that you want to use as the homepage.
// In this example, the component is defined in src/components/HomePage.js.
import HomePage from '../components/HomePage';

// Define an extension object for the "home" namespace.
// The key "homepage" is a special extension point provided by @ebay/muse-lib-react.
// Assigning the HomePage component here tells Muse to render it at the root path ("/").
const home = {
  homepage: HomePage,
};

// Export the home extension object as the default export.
// This will later be imported in src/ext/index.js and connected so the Muse framework knows which component to display as the homepage.
export default home;
