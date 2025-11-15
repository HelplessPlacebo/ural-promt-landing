'use client';

import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import s from './styles.module.css';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultActiveId?: string;
}

export function Tabs({ tabs, defaultActiveId }: TabsProps) {
  const [active, setActive] = useState<string>(defaultActiveId || tabs[0].id);
  const current = tabs.find((t) => t.id === active)!;

  return (
    <div className={s.tabsRoot}>
      <div className={s.tabHeader} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            className={cn(s.tabBtn, { [s.tabBtnActive]: active === tab.id })}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={s.tabContent}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className={s.tabPaneMotion}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.36, ease: 'easeInOut' }}
            layout
          >
            {current.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
