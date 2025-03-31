import { useEffect } from 'react';

import type { MountOnceCallback } from './types';

let didRun = false;

const useMountOnce = (callback: MountOnceCallback) => {
  useEffect(() => {
    if (!didRun) {
      callback();
      didRun = true;
    }
  }, [callback]);
};

export default useMountOnce;
