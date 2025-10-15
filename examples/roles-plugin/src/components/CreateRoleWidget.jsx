import { SolutionOutlined } from '@ant-design/icons';
import NiceModal from '@ebay/nice-modal-react';
import RoleInfoModal from './RoleInfoModal';
import './CreateRoleWidget.less';

// Muse: UI widget acts only as an entry point.
// Business logic lives in the modal (RoleInfoModal).
const CreateRoleWidget = () => {
  return (
    <div
      className="create-role-widget"
      // Muse: open RoleInfoModal via NiceModal (extension point for dialogs).
      onClick={() => NiceModal.show(RoleInfoModal)}
    >
      <SolutionOutlined />
      <label>Create a Role</label>
    </div>
  );
};

// Muse: export as a reusable widget; plugins can place it anywhere.
export default CreateRoleWidget;
