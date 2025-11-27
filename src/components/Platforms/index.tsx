'use client';

import { MODAL_IDS } from '@/const';
import { Platform, platforms } from '@/data';
import { useModal } from '@/hooks';
import { getLayoutType } from '@/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import gs from '../../styles/styles.module.css';
import { Tabs } from '../Tabs';
import s from './styles.module.css';
import cn from "classnames";

export function PlatformTabs() {
  const { openModal } = useModal();

  const tabs = platforms.map((platform: Platform) => ({
    id: platform.id,
    label: platform.name,
    content: (
      <div className={cn(gs.glass, s.platformSpec)}>
        <div className={s.platformHero}>
          <motion.div layoutId={`platform-image-${platform.id}`} className={s.platformImageWrap}>
            <img
              src={platform.image}
              alt={platform.name}
              className={gs.previewImg}
              onClick={() => {
                if (getLayoutType(window.innerWidth) !== 'desktop') {
                  return window.open(platform.image, '_blank');
                }

                openModal({
                  id: `${MODAL_IDS.platforms}`,
                  size: 'l',
                  closable: true,
                  mediaFit: 'contain',
                  showFullscreenButton: true,
                  content: (
                    <div className={gs.modalMediaContainer}>
                      <img src={platform.image} alt="preview" draggable={false} />
                    </div>
                  ),
                });
              }}
            />
          </motion.div>
        </div>

        <div>
          <div className={s.platformHeader}>
            <div>
              <h3>{platform.name}</h3>
              <p className={s.platformModel}>{platform.model}</p>
            </div>
            <Link href={platform.pdf} download className={gs.btnPrimary}>
              Скачать PDF
            </Link>
          </div>

          <p className={s.platformDescription}>{platform.description}</p>

              <div className={s.specsGrid}>
                {platform.specs.map((spec, i) => (
                  <div
                    key={i}
                    className={s.specItem}
                  >
                    <div className={s.specLabel}>{spec.label}</div>
                    <div className={s.specValue}>{spec.value}</div>
                  </div>
                ))}
              </div>


        </div>
      </div>
    ),
  }));

  return (
    <section id="platforms">
      <h2> Платформы </h2> <Tabs tabs={tabs} defaultActiveId={platforms[0].id} />
    </section>
  );
}
