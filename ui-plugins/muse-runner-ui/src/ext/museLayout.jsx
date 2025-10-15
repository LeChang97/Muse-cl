import React from 'react';
import { Button } from 'antd';
import NiceModal from '@ebay/nice-modal-react';
import EditAppModal from '../features/home/EditAppModal';

const museLayout = {

  //顶部配置
  header: {
    //顶部基本配置：标题
    getConfig() {
      return {
        title: 'Muse Runner',
        backgroundColor: 'rgb(21,40,48)',
      };
    },
    //顶部交互项，按钮和图标
    getItems() {
      return [
        {
          key: 'add-app',
          label: 'Add App',
          position: 'left',
          render: () => {
            return (
              //点击按钮会调用
              <Button type="primary" className="ml-5" onClick={() => NiceModal.show(EditAppModal)}>
                + Add App
              </Button>
            );
          },
        },
        {
          key: 'help',
          icon: 'QuestionCircleOutlined',
          position: 'right',
          link: 'https://pages.github.corp.ebay.com/muse/muse-site/docs/2.0/get-started/using-muse-runner',
          linkTarget: '_blank',
        },
        // {
        //   key: 'quit',
        //   icon: 'PoweroffOutlined',
        //   position: 'right',
        //   tooltip: 'Quit Muse Runner',
        //   onClick: () => {
        //     Modal.info({
        //       title: 'Quit Muse Runner',
        //       content: 'Not implemented yet.',
        //     });
        //   },
        // },
      ];
    },
  },
  //不显示侧边栏
  sider: {
    getConfig() {
      return {
        mode: 'none', //禁用模式！
      };
    },
  },
};
export default museLayout;
