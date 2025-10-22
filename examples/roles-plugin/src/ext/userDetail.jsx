const userDetail = {
  getTabs({ user, roles }) {
    const role = roles.find(r => r.id === user.role); 

    const meta = {
      viewMode: true,
      initialValues: role,
      columns: 2,
      fields: [
        { key: 'name', label: 'Name', order: 10 },
        { key: 'description', label: 'Description', order: 20 },
        { key: 'roleLevel', label: 'Level', order: 30 },
        { key: 'duty', label: 'Duty', colSpan: 2, order: 50 },
      ],
    };

    return [
      {
        key: 'positionInfo',
        label: 'Position Information',
        children: (
          <div className="p-3">
            <Form>
              <NiceForm meta={meta} viewMode={true} />
            </Form>
          </div>
        ),
      }
    ];
  }
};

export default userDetail;