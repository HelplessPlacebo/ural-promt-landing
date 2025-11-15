import s from './styles.module.css';

export function Footer() {
  return (
    <footer className={s.footer}>
      <p>© {new Date().getFullYear()} ООО "УРАЛПРОМТ"</p>
    </footer>
  );
}
