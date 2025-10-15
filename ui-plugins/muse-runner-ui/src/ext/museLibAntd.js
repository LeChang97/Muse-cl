import { theme } from 'antd';

const museLibAntd = {
  configProvider: {
    processProps(configProps) {
      configProps.theme.algorithm = theme.darkAlgorithm;
    },
  },
};

export default museLibAntd;

//用于全局应用深色模式