import { useSelector } from 'react-redux';
import { Select } from 'antd';

// Muse: A small field widget that integrates with Redux.
// It renders a <Select> dropdown populated with roles from the domain state.
const RoleSelect = props => {
  const roles = useSelector(s => s.pluginRolesPlugin.roles); // read roles from reducer
  
  return (
    <Select {...props}>
      {roles.map(role => (
        <Select.Option key={role.id} value={role.id}>
          {role.name}
        </Select.Option>
      ))}
    </Select>
  );
};

// Muse: This object contributes to the extension point `userInfo.fields.getFields`, which was defined in users-plugin-new.
// The UserInfoModal invokes this extension point, collects fields from all plugins, sorts them by `order`, and then renders them via FormBuilder.
//
// Here we add a new "Role" field. Notice how the plugin only needs to declare schema (key, label, order, widget). The modal takes care of rendering and dispatching updates — keeping UI and domain logic decoupled.
const userInfo = {
  fields: {
    getFields: () => {
      return {
        key: 'role',       // unique key for the field
        label: 'Role',     // field label shown in the form
        order: 50,         // position relative to other fields
        widget: RoleSelect // custom React component used as the input widget
      };
    },
  },
};

export default userInfo;

// Muse: By exporting this object and registering it via ext/index.js, the core UserInfoModal will automatically pick up the new Role field.
// No core code changes are required — this is the essence of Muse extensibility.

