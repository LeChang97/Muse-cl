// Register the Muse plugin
// -------------------------------------------------------------
// Every Muse plugin needs a main entry file (usually `src/index.js`).
// This file uses `js-plugin` to register the plugin with the Muse framework.
//
// The registration object defines:
// - `name`: the unique plugin name
// - `route`: the plugin's routing configuration
// - `reducer`: the Redux reducer for managing plugin state
// - `ext`: contributions to extension points (homepage, dashboard, layout, etc.)

// Import the plugin registration utility
import plugin from 'js-plugin';

// Import routing configuration for this plugin.
// This file typically defines URL patterns and maps them to components.
import route from './route';

// Import Redux reducer for this plugin.
// This manages the plugin’s own slice of application state.
import reducer from './reducer';

// Import all extension points (home, dashboard, layout, etc.) from the ext directory. Using `* as ext` collects them into an object.
import * as ext from './ext';

// Register the plugin with Muse.
// The spread operator (`...ext`) merges all exported extension objects (from src/ext/index.js) into the registration, so Muse can discover them.
plugin.register({
  name: 'users-plugin',  // unique name for the plugin
  route,                 // routing configuration
  reducer,               // Redux reducer
  ...ext,                // homepage, dashboard, layout, etc.
});
