import { useMemo, useCallback, useState } from 'react';
import { Button, Table } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import jsPlugin from 'js-plugin';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useModal } from '@ebay/nice-modal-react';
import RoleInfoModal from './RoleInfoModal';
import './RoleList.less';

export default function RoleList() {
  const roleModal = useModal(RoleInfoModal);
  const roles = useSelector((s) => s.pluginRolesPlugin.roles);

  // Muse: Base schema for table columns.
  // Keep minimal and stable so that plugins can add/position their own columns.
  const columns = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        width: '200px',
        order: 10,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        order: 20,
      },
      {
        title: 'Edit',
        width: '100px',
        order: 100,
        render(value, role) {
          return (
            <Button
              type="link"
              icon={<EditOutlined />}
              // Muse: open modal imperatively; modal handles domain dispatch
              onClick={() => {
                roleModal.show({ role });
              }}
            />
          );
        },
      },
    ],
    [roleModal],
  );

  // Muse: Extension point.
  // Allow external plugins to contribute extra columns.
  // Contract: jsPlugin.invoke('RoleList.columns.getColumns', { columns }) -> Column[]
  columns.push(
    ..._.flatten(jsPlugin.invoke('RoleList.columns.getColumns', { columns })).filter(Boolean),
  );

  // Muse: Shared convention — sort by "order" so core + plugins combine predictably.
  jsPlugin.sort(columns);

  return (
    <div className="role-list">
      <h1>Roles List</h1>
      {/* Muse: New Role entry point — opens modal, actual logic in reducer */}
      <Button type="primary" onClick={() => roleModal.show()} style={{ float: 'right' }}>
        + New Role
      </Button>
      <p style={{ color: 'gray' }}>
        This is the role list component allow to manage roles in the system.
      </p>
      {/* Muse: Declarative table rendering. 
          Data comes from Redux (domain layer), 
          columns schema can be extended by plugins. */}
      <Table
        size="small"
        rowKey="id"
        pagination={false}
        columns={columns}
        dataSource={roles}
        style={{ marginTop: '20px' }}
      />
    </div>
  );
}
