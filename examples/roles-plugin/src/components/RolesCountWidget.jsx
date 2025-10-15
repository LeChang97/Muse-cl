import { useSelector } from 'react-redux';
import { AuditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './RolesCountWidget.less';

const RolesCountWidget = () => {
  // UI does not own the data; it only reads from Redux.
  // The domain reducer (pluginRolesPlugin) owns the authoritative roles state.
  const roles = useSelector(s => s.pluginRolesPlugin.roles);

  return (
    // This widget is a reusable "entry point".
    // It only renders data and provides navigation, no domain logic inside.
    <Link to="/roles" className="roles-count-widget">
      {/* Purely visual: icon + count + label */}
      <AuditOutlined />
      <label className="roles-count">{roles.length}</label>
      <label className="roles-label">Roles</label>
    </Link>
  );
};

// Muse: export as a small, composable widget.
// Other features (dashboards, sidebars, etc.) can place this widget anywhere,
// without coupling to how roles are created or updated (that is handled by reducers).
export default RolesCountWidget;
