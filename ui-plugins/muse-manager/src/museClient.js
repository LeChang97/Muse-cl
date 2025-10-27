import mClient from '@ebay/muse-client';

const g = window.MUSE_GLOBAL;

// 生成一个Muse API客户端实例
const museClient = mClient.create({
  //  配置API访问地址
  endpoint:
    g.pluginVariables?.['@ebay/muse-manager']?.museApiEndpoint ||
    g.appVariables?.museApiEndpoint ||
    '/api/v2',
  // 获取当前登录用户，用于接口身份验证
  token: g.getUser()?.museSession,
  axiosConfig: {
    timeout: 120000,
  },
});

export default museClient;
