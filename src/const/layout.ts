import { LayoutType } from '@/types';

const IMAGE_SIZES: Record<LayoutType, { width: number; height: number }> = {
  mobile: { width: 350, height: 450 },
  tablet: { width: 700, height: 500 },
  desktop: { width: 1150, height: 500 },
};

export const getImageSizeByLayout = (layout: LayoutType) => IMAGE_SIZES[layout];
