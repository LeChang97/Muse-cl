import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import api from './api';

const useRunnerData = () => {
  const {
    data: runningData,
    isLoading: runningDataIsLoading,
    error: runningDataError,
  } = useQuery({
    //实时运行数据（每30s轮询）
    queryKey: ['running-data'],
    refetchInterval: 30000,
    queryFn: async () => {
      return (await api.get('/running-data')).data;
    },
  });

  const {
    data: configData,
    isLoading: configDataIsLoading,
    error: configDataError,
  } = useQuery({
    //配置数据
    queryKey: ['config-data'],
    queryFn: async () => {
      const configData = (await api.get('/config-data')).data;
      configData.appList?.forEach((app) => {
        app?.plugins?.forEach((p) => {
          p.id = `${app.id}:${p.name.replace(/\//g, '.')}`;
        });
      });
      return configData;
    },
  });

  const {
    data: initData,
    isLoading: initDataIsLoading,
    error: initDataError,
  } = useQuery({
    //初始化数据（仅一次）
    queryKey: ['init-data'],
    cacheTime: Infinity, // init-data should need to be fetched once
    queryFn: async () => {
      return (await api.get('/init-data')).data;
    },
  });

  const {
    //git仓库状态
    data: gitStatus,
    isLoading: gitStatusIsLoading,
    error: gitStatusError,
  } = useQuery({
    queryKey: ['git-status'],
    cacheTime: Infinity, // init-data should need to be fetched once
    queryFn: async () => {
      return (await api.get('/git-status')).data;
    },
  });

  //合并运行数据&配置数据
  const data = useMemo(() => {
    if (runningData && configData) {
      const appList = _.cloneDeep(configData.appList || []);
      const { plugins: pluginsConfig } = configData;
      const runningPluginByDir = _.keyBy(runningData.plugins, 'dir');
      runningData?.apps?.forEach((runningApp) => {
        const found = appList.find((item) => item.id === runningApp.id);
        if (found) found.running = runningApp;
      });

      appList.forEach((app) => {
        app.plugins?.forEach((p) => {
          p.appId = app.id;
          Object.assign(p, configData?.plugins?.[p.name] || {});
          // p.dir = configData?.plugins?.[p.name]?.dir || null;
          if (p.dir && runningPluginByDir[p.dir]) {
            p.running = runningPluginByDir[p.dir];
          }
          if (p.linkedPlugins) {
            p.linkedPlugins = p.linkedPlugins.map((lp) => {
              return {
                name: lp.name,
                dir: pluginsConfig?.[lp.name]?.dir,
                mainPlugin: p.name,
              };
            });
          }
        });
      });
      return appList;
    }
  }, [runningData, configData]);

  const itemById = useMemo(() => {
    if (data) {
      const itemById = {};
      data?.forEach((app) => {
        itemById[app.id] = app;
        app?.plugins?.forEach((p) => {
          itemById[p.id] = p;
        });
      });
      return itemById;
    }
  }, [data]);
  return {
    data,
    initData,
    https: !!initData?.https,
    apps: initData?.apps,
    appByName: _.keyBy(initData?.apps, 'name'),
    itemById,
    configData,
    settings: configData?.settings,
    runningData,
    gitStatus,
    plugins: initData?.plugins,
    pluginByName: _.keyBy(initData?.plugins, 'name'),
    isLoading:
      runningDataIsLoading || initDataIsLoading || configDataIsLoading || gitStatusIsLoading,
    error: runningDataError || configDataError || initDataError || gitStatusError,
  };
};
export default useRunnerData;
