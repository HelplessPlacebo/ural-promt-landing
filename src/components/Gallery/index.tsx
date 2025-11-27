'use client';

import {ResponsiveGallerySlider} from '../ResponsiveGallerySlider';
import {useModal} from '@/hooks';
import {MODAL_IDS} from '@/const';
import gs from '../../styles/styles.module.css';
import s from './styles.module.css';
import cn from 'classnames';
import {getLayoutType} from '@/utils';

type Slide = {
    src: string;
    type: 'image' | 'video';
};

const slides: Slide[] = [
    {src: '/slider-img3.webp', type: 'image'},
    {src: '/slider-img2.webp', type: 'image'},
    {src: '/video1.mp4', type: 'video'},
    {src: '/slider-img4.webp', type: 'image'},
    {src: '/slider-img5.webp', type: 'image'},
    {src: '/slider-img6.webp', type: 'image'},
    {src: '/slider-img7.webp', type: 'image'},
    {src: '/slider-img8.webp', type: 'image'},
];

function GalleryItem({src, type = 'image'}: Slide) {
    const {openModal} = useModal();
    const isImg = type === 'image';

    const click = () => {
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
                    {isImg ? <img src={src}/> : <video src={src} controls/>}
                </div>
            ),
        });
    };

    if (isImg)
        return <img src={src} className={s.galleryPreviewImg} onClick={click} draggable={false}/>;

    return (
        <video
            src={src}
            className={cn(s.galleryPreviewImg, s.galleryVideoPreview)}
            onClick={click}
        />
    );
}

export function Gallery() {
    return (
        <section id="gallery">
            <h2>Галерея</h2>

            <ResponsiveGallerySlider
                items={slides.map((sl) => ({
                    ...sl,
                    element: <GalleryItem {...sl} />,
                }))}
            />
        </section>
    );
}
