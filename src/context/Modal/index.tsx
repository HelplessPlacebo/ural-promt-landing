'use client';

import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { MdClose, MdCloseFullscreen, MdOpenInFull } from 'react-icons/md';

import cn from 'classnames';
import s from './styles.module.css';

type ModalSize = 's' | 'm' | 'l' | 'fullscreen';
type MediaFit = 'contain' | 'cover';

export type ModalConfig = {
  id?: string;
  content: ReactNode;
  closable?: boolean;
  className?: string;
  size?: ModalSize;
  centered?: boolean;
  mediaFit?: MediaFit;
  showFullscreenButton?: boolean;
};

export type ModalContextType = {
  openModal: (config: ModalConfig) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modal, setModal] = useState<ModalConfig | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const lastActiveEl = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const openModal = useCallback((config: ModalConfig) => {
    lastActiveEl.current = document.activeElement as HTMLElement | null;
    setModal(config);
    setIsFullscreen(false);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
    setIsFullscreen(false);
    document.body.style.overflow = '';

    setTimeout(() => {
      lastActiveEl.current?.focus?.();
    }, 0);
  }, []);

  /* ESC / F keys */
  useEffect(() => {
    if (!modal) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modal.closable !== false) {
        closeModal();
      } else if (e.key === 'f' && modal.showFullscreenButton) {
        setIsFullscreen((v) => !v);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal, closeModal]);

  /* Focus trap */
  useEffect(() => {
    if (!modal) return;
    const t = setTimeout(() => closeBtnRef.current?.focus?.(), 60);
    return () => clearTimeout(t);
  }, [modal]);

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
      }}
    >
      {children}

      <AnimatePresence>
        {modal && (
          <motion.div
            className={s.modalOverlay}
            onClick={() => modal.closable !== false && closeModal()}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={modal.id || 'modal'}
              className={cn(
                s.modalContainer,
                {
                  [s.modalS]: modal.size === 's',
                  [s.modalM]: modal.size === 'm' || !modal.size,
                  [s.modalL]: modal.size === 'l',
                  [s.modalFullscreenActive]: modal.size === 'fullscreen' || isFullscreen,
                },
                modal.className
              )}
              onClick={(e) => e.stopPropagation()}
              initial={{
                scale: 0.96,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.96,
                opacity: 0,
              }}
              transition={{
                duration: 0.18,
              }}
            >
              {modal.closable !== false && (
                <button ref={closeBtnRef} onClick={closeModal} className={s.modalClose}>
                  <MdClose />
                </button>
              )}

              {modal.showFullscreenButton && (
                <button
                  className={s.modalFullscreenToggle}
                  onClick={() => setIsFullscreen((v) => !v)}
                >
                  {isFullscreen ? <MdCloseFullscreen /> : <MdOpenInFull />}
                </button>
              )}

              {modal.mediaFit ? (
                <div className={s.modalMediaContainer}>{modal.content}</div>
              ) : (
                <div className={s.modalInner}>{modal.content}</div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
};
