import CreateRoleWidget from '../components/CreateRoleWidget';
import RolesCountWidget from '../components/RolesCountWidget';
import widgetPreviewRolesCount from '../images/widgetPreviewRolesCount.png';
import widgetPreviewCreateRole from '../images/widgetPreviewCreateRole.png';

// Muse: This module defines a plugin that contributes widgets to the dashboard.
// In Muse, the dashboard is an extension surface. Plugins can register categories and widgets by returning them through getCategories() and getWidgets().
// The core system then discovers and renders them without hardcoding.

const museDashboard = {
  widget: {
    // Muse: Register a new dashboard category.
    // Categories group related widgets together (here, "Roles").
    getCategories: () => {
      return {
        key: 'roles.dashboardCategory', // unique identifier for the category
        name: 'Roles',                  // human-friendly label shown in UI
      };
    },

    // Muse: Register widgets under this category.
    // Each widget is a self-contained unit: it has a key, metadata, preview image, and a React component that implements its UI.
    getWidgets: () => {
      return [
        {
          key: 'roles.rolesCount',
          name: 'Roles Count',
          category: 'roles.dashboardCategory', // link widget to category
          description: 'A simple block to show how many roles in system.',
          previewImage: widgetPreviewRolesCount, // shown in widget gallery
          component: RolesCountWidget,           // actual React component to render
          width: 3,  // layout metadata (grid width)
          height: 3, // layout metadata (grid height)
        },
        {
          key: 'roles.createRole',
          name: 'Create Role',
          category: 'roles.dashboardCategory',
          description: 'A simple block allow to create a role.',
          previewImage: widgetPreviewCreateRole,
          component: CreateRoleWidget,
          width: 3,
          height: 3,
        },
      ];
    },
  },
};

export default museDashboard;

// Muse: By exporting this object, we make it available to ext/index.js, which then aggregates all feature plugins and registers them with the core.
//
// To add a new widget, simply extend getWidgets() here and ensure the module is exported via ext/index.js. The core will pick it up through the registry,
// so no central dashboard code needs to be modified — this is the essence of Muse extensibility.
