import React, {useEffect, useState} from 'react';
import {getConfig} from '@/modules/config';

const enableMocking = async () => {
  require('./polyfills');
  const {server} = require('./rn');
  server.listen();
};

export type MswProviderProps = {
  children: React.ReactNode;
};

export const MswProvider = ({
  children,
}: MswProviderProps): React.JSX.Element => {
  const [isReady, setReady] = useState(getConfig('USE_MSW') === 'false');

  useEffect(() => {
    if (isReady) {
      return;
    }

    enableMocking().then(() => {
      setReady(true);
    });
  }, [isReady]);

  return <>{children}</>;
};
