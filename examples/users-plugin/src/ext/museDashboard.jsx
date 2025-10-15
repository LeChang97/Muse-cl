// Define custom Dashboard Widgets for Muse
// In Muse, the dashboard is extensible. Plugins can contribute widgets that appear in the dashboard area of the app. 
// Each widget is a small self-contained UI block that can display information or perform actions.
//
// To register dashboard widgets, you export a `museDashboard` object from `src/ext/museDashBoard.jsx`. The framework will look for it and render the widgets in the dashboard UI.

// Import the React components that implement the widgets.
import UsersCountWidget from '../components/UsersCountWidget';
import CreateUserWidget from '../components/CreateUserWidget';

// Import preview images for the widgets.
// These images are shown in the widget gallery so users know what the widget looks like before adding it.
import widgetPreviewUsersCount from '../images/widgetPreviewUsersCount.png';
import widgetPreviewCreateUser from '../images/widgetPreviewCreateUser.png';

// Define the museDashboard extension object.
// The `widget` key is special: Muse recognizes it as the entry point for custom dashboard widgets.
const museDashboard = {
  widget: {
    // getCategories defines one or more categories that widgets can belong to.
    // Categories are useful for grouping widgets in the gallery.
    getCategories: () => {
      return {
        key: 'users.dashboardCategory', // unique identifier
        name: 'Users',                  // display name in the dashboard
      };
    },

    // getWidgets defines the widgets themselves.
    // Each widget entry specifies its identity, UI component, and metadata.
    getWidgets: () => {
      return [
        {
          key: 'users.usersCount',                  // unique ID for the widget
          name: 'Users Count',                      // display name
          category: 'users.dashboardCategory',      // assign to category
          description: 'A simple block to show how many users in system.', // tooltip
          previewImage: widgetPreviewUsersCount,    // preview image in gallery
          component: UsersCountWidget,              // React component to render
          width: 3,                                 // default width in grid units
          height: 3,                                // default height in grid units
        },
        {
          key: 'users.createUser',
          name: 'Create User',
          category: 'users.dashboardCategory',
          description: 'A simple block allow to create a user.',
          previewImage: widgetPreviewCreateUser,
          component: CreateUserWidget,
          width: 3,
          height: 3,
        },
      ];
    },
  },
};

// Export the museDashboard object so the Muse framework can load it.
// Once registered, your widgets will appear in the dashboard gallery and can be added by users to their workspace.
export default museDashboard;
