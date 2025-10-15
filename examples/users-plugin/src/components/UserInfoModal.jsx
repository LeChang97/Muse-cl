import { useCallback, useState } from 'react';
import { Form, Modal } from 'antd';
import FormBuilder from '@ebay/nice-form-react';
import jsPlugin from 'js-plugin';
import { useDispatch } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import _ from 'lodash';
import NiceModal, { useModal, antdModalV5 } from '@ebay/nice-modal-react';
import './UserInfoModal.less';

// NiceModal component. Shown via NiceModal.show(id, props), resolves a promise.
export default NiceModal.create(({ user }) => {
  const modal = useModal();              // modal lifecycle (open/close/resolve)
  const dispatch = useDispatch();        // domain state commit (Redux)
  const [form] = Form.useForm();         // AntD controlled form
  const [updatedAvatar, setUpdatedAvatar] = useState(); // local preview override

  // Base schema kept minimal/stable for cross-plugin coordination
  const formFields = [
    { key: 'name', label: 'Name', order: 10, required: true },
    { key: 'job', label: 'Job Title', order: 20 },
    { key: 'address', label: 'Address', order: 30 },
  ];

  // Muse extension point: allow plugins to contribute/position fields
  // Contract: jsPlugin.invoke('userInfo.fields.getFields', { formFields }) -> Field[]
  formFields.push(
    ..._.flatten(jsPlugin.invoke('userInfo.fields.getFields', { formFields })).filter(Boolean),
  );

  // Shared ordering convention so core + plugins compose deterministically
  jsPlugin.sort(formFields);

  // Renderer-agnostic meta (structure only); behavior wired via handlers below
  const meta = {
    initialValues: user,
    fields: formFields,
    formItemLayout: [6, 18],
  };

  // Submit after validation; delegate persistence to domain reducers
  const handleSubmit = useCallback(() => {
    form.validateFields().then(() => {
      const newUser = { ...form.getFieldsValue() };
      if (updatedAvatar) newUser.avatar = updatedAvatar;

      if (!user) {
        dispatch({ type: 'new-user', payload: newUser });
      } else {
        newUser.id = user.id;
        dispatch({ type: 'update-user', payload: newUser });
      }

      modal.resolve(newUser);
      modal.hide();
    });
  }, [modal, user, form, dispatch, updatedAvatar]);

  // Local-only avatar preview; real upload/storage is out of scope for the modal
  const handleChangeAvatar = useCallback((evt) => {
    const file = evt.target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener('load', () => setUpdatedAvatar(reader.result));
    reader.readAsDataURL(file);
  }, []);

  const avatarToShow = updatedAvatar || user?.avatar;

  return (
    <Modal
      {...antdModalV5(modal)} // binds NiceModal to AntD v5
      title={user ? 'Edit User' : 'New User'}
      okText={user ? 'Update' : 'Create'}
      onOk={handleSubmit}
      width="800px"
    >
      <div className="user-info-modal">
        <div className="user-avatar">
          {avatarToShow ? <img src={avatarToShow} alt="user-avatar" /> : <UserOutlined />}
          <input type="file" onChange={handleChangeAvatar} />
        </div>

        <Form form={form}>
          <FormBuilder meta={meta} />
        </Form>
      </div>
    </Modal>
  );
});