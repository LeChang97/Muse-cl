// In a Muse plugin, the `src/ext/index.js` file acts as the central entry point for all extension contributions. 
// The Muse framework will automatically load this file and register the exported objects.
// Each export corresponds to a specific extension point defined by Muse or by other Muse-compatible plugins (e.g., @ebay/muse-lib-react, @ebay/muse-layout-antd).
// By collecting and re-exporting extensions here, we make sure the framework can discover and integrate them into the app.


// Contribute layout configuration (header + sider)
// from ext/museLayout.js
export { default as museLayout } from './museLayout';

// Contribute homepage configuration
// from ext/home.js
export { default as home } from './home';

// Contribute dashboard widgets
// from ext/museDashboard.jsx
export { default as museDashboard } from './museDashboard';
