// Import an image to use as the app logo in the header.
import logo from '../images/user.png';

// Contribute to @ebay/muse-layout-antd plugin
// The Muse layout plugin provides extension points for customizing the global layout of the app, such as the header and the sidebar (sider).
// By exporting a `museLayout` object, you can override these areas with your own configuration.

const museLayout = {
  // Customize the header section at the top of the app.
  header: {
    // getConfig returns the header configuration object.
    // You can control colors, icons, and titles here.
    getConfig: () => {
      return {
        backgroundColor: '#37474F',        // header background color
        icon: logo,                        // logo displayed on the left
        title: 'User Manager',             // main title shown in the header
        subTitle: 'A Muse demo application.', // subtitle shown under the title
      };
    },
  },

  // Customize the sidebar (sider) navigation menu.
  sider: {
    // getItems returns the navigation entries to add to the sider.
    // Each entry defines a link that appears in the navigation panel.
    getItems: () => {
      return {
        key: 'users-list',   // unique identifier for the menu item
        order: 20,           // sort order relative to other menu items
        label: 'Users List', // text displayed in the menu
        link: '/users',      // path to navigate when clicked
        icon: 'team',        // icon name from Ant Design's icon set
      };
    },
  },
};

// Export the museLayout object so the Muse framework can apply it.
// Once registered, the app’s header and sider will be customized according to the configuration provided here.
export default museLayout;
