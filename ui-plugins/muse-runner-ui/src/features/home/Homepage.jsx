import React, { useState, useEffect } from 'react';
import SplitPane from 'rspv2/lib/SplitPane';
import Pane from 'rspv2/lib/Pane';
import { useMutation } from '@tanstack/react-query'; //封装更新设置的异步请求
import { Empty } from 'antd'; //右侧无内容时占位
import { RequestStatus } from '@ebay/muse-lib-antd/src/features/common'; //加载状态组件
import Sider from './Sider'; //左侧栏内容
import useRunnerData from './useRunnerData'; //自定义hook，拉取页面所需数据
import './Homepage.less';
import api from './api';

export default function Homepage({ children }) {

  //自定义的Hook useRunnerData 获取侧边栏数据、插件、加载状态
  const { data, apps, plugins, isLoading, settings } = useRunnerData();
  //初始化状态（设置左侧边栏宽度）
  const [siderWidth, setSiderWidth] = useState(settings?.siderWidth);

  //副作用处理：初始化宽度（settings异步返回时 如果当前无宽度 就用设置里的值补上）
  useEffect(() => {
    if (!siderWidth) setSiderWidth(settings?.siderWidth);
  }, [siderWidth, settings?.siderWidth]);

  //定义一个保存侧栏宽度的请求（乐观更新：UI先改，网络请求再发）
  const { mutateAsync: updateSiderWidth } = useMutation({
    mutationFn: async (width) => {
      await api.post('/settings', { key: 'siderWidth', value: width });
    },
  });

  //拖拽结束回调
  const handleResizeEnd = (sizes) => {
    setSiderWidth(sizes[0]); //立刻更新本地UI宽度
    updateSiderWidth(sizes[0]); //异步持久化到后端
    window.dispatchEvent(new Event('resize')); //通知全局做一次重算布局
  };

  const emptyContent = (
    <div className="p-3 text-gray-500">Select a row in the sider to show output.</div>
  );

  return (
    <div
      style={{
        margin: '-24px',
        backgroundColor: 'rgb(9, 32, 42)',
        height: 'calc(100vh - 50px)',
      }}
    >
      {isLoading ? (
        <div className="p-6">
          <RequestStatus loading={isLoading} />
        </div>
      ) : null}

      {!!data?.length && apps && plugins && (
        <SplitPane split="vertical" onChange={() => {}} onResizeEnd={handleResizeEnd}>
          <Pane minSize="200px" maxSize="800px" size={siderWidth || '500px'}>
            <Sider />
          </Pane>
          <Pane className="bg-[rgb(9,32,42)]">{children || emptyContent}</Pane>
        </SplitPane>
      )}

      {data?.length === 0 && (
        <div className="h-full grid place-items-center">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}
    </div>
  );
}
