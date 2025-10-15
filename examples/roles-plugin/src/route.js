import RoleList from './components/RoleList';

/**
 * Muse: In this architecture, routes are declared by feature plugins, not hardcoded in the core. Each module contributes its own route config object. The core system aggregates them (via ext/index.js) and builds the routing table dynamically.
 *
 * A route item looks like:
 * {
 *   path: '/some-path',
 *   component: SomeComponent,
 * }
 */
const route = {
  childRoutes: [
    {
      path: '/roles',       // Muse: feature-owned path
      component: RoleList,  // Muse: feature-owned UI component
    },
  ],
};

export default route;

// Muse: By exporting this route config and registering it through ext/index.js, the Roles feature automatically integrates with the global router.
// To add a new page, simply declare it in your feature module and export it.
// No core routing code needs to change — this is how Muse keeps navigation extensible.
