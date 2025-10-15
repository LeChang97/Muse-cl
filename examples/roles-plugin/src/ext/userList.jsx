import { Tag } from 'antd';
import { useSelector } from 'react-redux';

// Muse: A small presentational component that looks up a role by id from Redux domain state and renders its name inside a <Tag>.
const RoleName = ({ roleId }) => {
  const roles = useSelector(s => s.pluginRolesPlugin.roles); // read roles from reducer
  const item = roleId && roles.find(r => r.id === roleId);
  if (!item) return null;
  return <Tag style={{ border: 'none' }}>{item.name}</Tag>;
};

// Muse: This object contributes to the extension point `userList.columns.getColumns`, which was declared in users-plugin-new.
// The core UserList component invokes this extension point, collects column definitions from all plugins, sorts them by `order`, and renders them in a stable, predictable way.
//
// Here we add a new "Role" column. Notice how the plugin only declares schema (key, title, dataIndex, order, render).
// The core table component takes care of composition and rendering.
const userList = {
  columns: {
    getColumns() {
      return {
        key: 'role',              // unique key for this column
        title: 'Role',            // column header label
        dataIndex: 'role',        // field from user data
        order: 15,                // position relative to other columns
        width: '150px',
        render: roleId => <RoleName roleId={roleId} />, // delegate to RoleName component
      };
    },
  },
};

export default userList;

// Muse: By exporting this object and registering it via ext/index.js, the core UserList will automatically integrate this Role column.
// No modification to UserList itself is required — this is the essence of Muse extensibility.
