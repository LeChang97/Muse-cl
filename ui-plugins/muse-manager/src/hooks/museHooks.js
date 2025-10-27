import { invoke, isObject } from 'lodash';
import { useQuery, useMutation } from '@tanstack/react-query';
import museClient from '../museClient';
  
/**
 compatible with: useMuseQuery(queryArgs, apiPath, ...args)
 */
export function useMuseQuery(apiPath, ...args) {
  let queryArgs = {};

  // 如果是对象，赋值给queryArgs
  if (isObject(apiPath)) {
    queryArgs = apiPath;
    // 第一个元素作为真正的apiPath
    apiPath = args.shift();
  }
  // 允许用户可以只传apiPath，也可以把配置对象一起传

  // 用于异步数据请求和管理
  const query = useQuery({
    // 唯一标识本次请求
    queryKey: ['muse-query', apiPath, ...args],
    // 执行请求的函数
    queryFn: () => {
      // 调用Muse API客户端来发送请求
      return invoke(museClient, apiPath, ...args);
    },
    retry: 0,
    // 若失败不自动重试

    refetchOnWindowFocus: false, // 窗口获得焦点时不自动重新请求
    ...queryArgs,
  });
  return query;
}

export function useMuseData(dataKey, args) {
  let queryArgs = {};
  if (isObject(dataKey)) {
    queryArgs = dataKey;
    dataKey = args;
  }
  return useMuseQuery(queryArgs, 'data.get', dataKey);
}

export function usePollingMuseQuery(apiPath, ...args) {
  let queryArgs = {};

  if (isObject(apiPath)) {
    queryArgs = apiPath;
    apiPath = args.shift();
  }
  if (!queryArgs.refetchInterval) {
    queryArgs.refetchInterval = 10000;
  }

  return useMuseQuery(queryArgs, apiPath, ...args);
}

export function usePollingMuseData(...args) {
  if (isObject(args[0])) {
    args.splice(1, 0, 'data.get');
  } else {
    args.unshift('data.get');
  }
  return usePollingMuseQuery(...args);
}

export function useMuseMutation(apiPath) {
  const mutation = useMutation({
    mutationFn: (args) => {
      // _museParams to support multiple arguments: https://github.com/TanStack/query/discussions/1226
      if (args._museParams) return invoke(museClient, apiPath, ...args._museParams);
      return invoke(museClient, apiPath, args);
    },
  });
  return mutation;
}
