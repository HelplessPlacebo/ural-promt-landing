'use client';

import { getImageSizeByLayout } from '@/const';
import { LayoutType } from '@/types';
import { getLayoutType } from '@/utils';
import { useEffect, useState } from 'react';

export const useResponsiveImageSize = () => {
  if (typeof window === 'undefined') return getImageSizeByLayout('desktop');
  const [layout, setLayout] = useState<LayoutType>(getLayoutType(window.innerWidth));

  useEffect(() => {
    const onResize = () => setLayout(getLayoutType(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return getImageSizeByLayout(layout);
};
