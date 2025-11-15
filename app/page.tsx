import { Contact, Footer, Gallery, Header, Hero, PlatformTabs } from '@/components';
import { ModalProvider } from '@/context';

export default function Page() {
  return (
    <ModalProvider>
      <Header />
      <main>
        <Hero />
        <PlatformTabs />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </ModalProvider>
  );
}
