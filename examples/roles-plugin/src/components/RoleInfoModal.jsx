import { useCallback } from 'react';
import { Form, Modal } from 'antd';
import FormBuilder from '@ebay/nice-form-react';
import { useDispatch } from 'react-redux';
import NiceModal, { useModal, antdModalV5 } from '@ebay/nice-modal-react';

// NiceModal.create makes the component "pluggable" at the UI level, so any feature can open it imperatively with NiceModal.show(RoleInfoModal, props).
const RoleInfoModal = NiceModal.create(({ role }) => {
  const dispatch = useDispatch(); // Muse: reducers own domain state, UI only dispatches actions
  const modal = useModal();       // NiceModal lifecycle handle (open/close/resolve)
  const [form] = Form.useForm();

  const meta = {
    initialValues: role,
    fields: [
      { key: 'name', label: 'Name', required: true },
      { key: 'description', label: 'Description', widget: 'textarea', required: true },
    ],
  };

  // UI validates input and dispatches domain actions.
  // Business logic (state changes) lives in reducers, not in this component.
  const handleSubmit = useCallback(() => {
    form.validateFields().then(() => {
      const newRole = { ...form.getFieldsValue() };

      if (!role) {
        dispatch({ type: 'new-role', payload: newRole });
      } else {
        newRole.id = role.id;
        dispatch({ type: 'update-role', payload: newRole });
      }

      // NiceModal lets us resolve a value back to the opener (promise-based)
      modal.resolve(newRole);
      modal.hide();
    });
  }, [modal, role, dispatch, form]);

  return (
    <Modal
      {...antdModalV5(modal)}  // Bridge NiceModal state with AntD Modal props
      title={role ? 'Edit Role' : 'New Role'}
      okText={role ? 'Update' : 'Create'}
      onOk={handleSubmit}
    >
      {/* Muse: declarative form rendering; meta defines structure, FormBuilder renders controls */}
      <Form form={form}>
        <FormBuilder meta={meta} />
      </Form>
    </Modal>
  );
});

export default RoleInfoModal;
