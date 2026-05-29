import { useLenis } from '@/hooks/useLenis';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChatbotWidget } from '@/components/ChatbotWidget';
import { HeroSection } from '@/sections/HeroSection';
import { ServicesSection } from '@/sections/ServicesSection';
import { WhyChooseSection } from '@/sections/WhyChooseSection';
import { SchedulingSection } from '@/sections/SchedulingSection';
import { FAQSection } from '@/sections/FAQSection';
import { ContactSection } from '@/sections/ContactSection';

function App() {
  useLenis();

  return (
    <div className="min-h-screen" style={{ background: '#0B1F3F' }}>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <WhyChooseSection />
        <SchedulingSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}

export default App;
