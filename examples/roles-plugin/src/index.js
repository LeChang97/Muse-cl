import plugin from 'js-plugin';
import route from './route';
import reducer from './reducer';
import * as ext from './ext';

// Muse: This is the entry point of the "roles-plugin" feature.
// In Muse architecture, each feature is packaged as a plugin that declares what it contributes to the system.
//
// The plugin registers its own route, reducer, and extension modules. The core framework (via js-plugin) collects these contributions and integrates them automatically.

plugin.register({
  name: 'roles-plugin', // unique plugin name

  // Muse: route contribution
  // Feature defines its own pages, the core router aggregates them.
  route,

  // Muse: reducer contribution
  // Feature owns its own slice of domain state ("roles"),
  // reducer is injected into the global Redux store.
  reducer,

  // Muse: extension contributions
  // Import everything from ./ext (e.g. museLayout, museDashboard, userList, userInfo).
  // These extension points allow other parts of the system to render
  // navigation items, widgets, or form fields defined by this plugin.
  ...ext,
});

// Muse: By calling plugin.register, the "roles-plugin" is discoverable and composable. To add a new feature, create a plugin module with its own route/reducer/ext, and register it the same way. Core code remains untouched.
