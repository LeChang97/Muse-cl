// Import the "add user" icon from Ant Design's icon library.
// Ant Design icons provide ready-to-use SVG React components.
import { UserAddOutlined } from '@ant-design/icons';
// Import NiceModal, a lightweight modal management library used for showing and hiding modal dialogs in React.
import NiceModal from '@ebay/nice-modal-react';
// Import the custom modal component that will be shown when the user clicks the widget.
import UserInfoModal from './UserInfoModal';
import './CreateUserWidget.less';

// Define the CreateUserWidget functional component.
// This widget will appear in the Muse dashboard and allow users to open a modal for creating a new user.
const CreateUserWidget = () => {
  return (
    <div
      className="create-user-widget"
      onClick={() => NiceModal.show(UserInfoModal)}
    >
      <UserAddOutlined />
      <label>Create an User</label>
    </div>
  );
};

// Export the widget as default so it can be registered in museDashboard (see ext/museDashboard.jsx).
export default CreateUserWidget;
