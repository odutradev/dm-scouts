import { getConfig } from '@actions/admin';
import useMountOnce from '@hooks/useMountOnce';
import { ConfigModelType } from '@utils/types/models/config';
import { useState } from 'react';

const useConfig = () => {
  const [config, setConfig] = useState<ConfigModelType | null>(null);

  useMountOnce(async () => {
    const response = await getConfig();
    if (!('error' in response)){
        setConfig(response as any);
    };
  });

  return config;
};

export default useConfig;
