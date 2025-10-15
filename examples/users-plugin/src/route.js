import UserList from './components/UserList';
import UserDetail from './components/UserDetail'; 

/**
 * In Muse architecture, routes themselves are part of the "extension surface".
 * Core features declare minimal routes, and plugins (or other modules) can add
 * more child routes without directly modifying core code.
 *
 * A route item is shaped like:
 * {
 *   path: '/some-path',
 *   component: SomeComponent,
 * }
 *
 * This keeps navigation declarative: UI router only consumes this schema, and does not hardcode domain-specific screens.
 */
const route = {
  // Muse: childRoutes allow modular features to register their own screens.
  // Here the "users" feature contributes a page at /users, backed by UserList.
  childRoutes: [
    { path: '/users', component: UserList },
    { path: '/users/:id', component: UserDetail },
  ],
};

export default route;
