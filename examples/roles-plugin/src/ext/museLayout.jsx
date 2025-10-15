// Muse: This module contributes configuration to the @ebay/muse-layout-antd plugin.
// In Muse architecture, the layout (sider, header, etc.) is an extension surface.
// Features can register their own navigation items by returning objects here, instead of hardcoding them in the core layout.

const museLayout = {
  // Muse: Customize the sidebar (sider).
  // getItems() is an extension point: the layout plugin calls it and merges the returned object into the global navigation tree.
  sider: {
    getItems: () => {
      return {
        key: 'roles-list',   // unique id for this navigation entry
        label: 'Roles List', // text shown in the sidebar
        order: 30,           // sort order; core + plugins share this convention
        link: '/roles',      // route path this item navigates to
        icon: 'audit',       // icon identifier (mapped by layout plugin)
      };
    },
  },
};

export default museLayout;

// Muse: By exporting this object, we let ext/index.js aggregate it, and the core layout system integrates it automatically.
// To add a new menu item, just extend getItems() in your feature module and export it via ext/index.js — no core layout code needs to change.
