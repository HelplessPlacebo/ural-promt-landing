'use client';
import { MODAL_IDS } from '@/const';
import { useModal } from '@/hooks';
import { getLayoutType } from '@/utils';
import cn from 'classnames';
import Image from 'next/image';
import { useResponsiveImageSize } from '../../hooks/imageSize';
import gs from '../../styles/styles.module.css';
import { Slider } from '../Slider';
import s from './styles.module.css';

type Slide = {
  src: string;
  type: 'image' | 'video';
};

const slides: Slide[] = [
  {
    src: '/slider-img3.webp',
    type: 'image',
  },
  {
    src: '/slider-img2.webp',
    type: 'image',
  },
  {
    src: '/video1.mp4',
    type: 'video',
  },
  {
    src: '/slider-img4.webp',
    type: 'image',
  },
  {
    src: '/slider-img5.webp',
    type: 'image',
  },
  {
    src: '/slider-img6.webp',
    type: 'image',
  },
  {
    src: '/slider-img7.webp',
    type: 'image',
  },
  {
    src: '/slider-img8.webp',
    type: 'image',
  },
];

function GalleryItem({ src, type = 'image' }: { src: string; type?: 'image' | 'video' }) {
  const { openModal } = useModal();
  const isImgType = type === 'image';
  const { width, height } = useResponsiveImageSize();

  const handleImgClick = () => {
    if (getLayoutType(window.innerWidth) !== 'desktop') {
      return window.open(src, '_blank');
    }

    openModal({
      id: `${MODAL_IDS.gallery}-${src}`,
      size: 'l',
      closable: true,
      mediaFit: 'contain',
      showFullscreenButton: true,
      content: (
        <div className={gs.modalMediaContainer}>
          {isImgType ? (
            <img src={src} alt="preview" draggable={false} />
          ) : (
            <video src={src} controls />
          )}
        </div>
      ),
    });
  };

  if (isImgType) {
    return (
      <Image
        src={src}
        width={width}
        height={height}
        alt="thumb"
        className={gs.previewImg}
        onClick={handleImgClick}
      />
    );
  }

  return <video src={src} controls className={cn(gs.previewImg, s.galleryVideoPreview)} />;
}

export function Gallery() {
  return (
    <section id="gallery">
      <h2> Галерея </h2>

      <Slider
        slides={slides.map((slide, i) => (
          <div key={slide.type + slide.src + i} className={s.slide}>
            <GalleryItem {...slide} />
          </div>
        ))}
      />
    </section>
  );
}
