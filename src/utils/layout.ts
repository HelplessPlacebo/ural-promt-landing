import { LayoutType } from '@/types';

const LAYOUT_SIZES = {
  mobile: 768,
  tablet: 1200,
};

export const getLayoutType = (width: number): LayoutType => {
  if (width < LAYOUT_SIZES.mobile) return 'mobile';
  if (width < LAYOUT_SIZES.tablet) return 'tablet';
  return 'desktop';
};
