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
    <div className="min-h-screen bg-[#0C1814] text-[#F8FAF9] selection:bg-[#D4AF37] selection:text-[#0C1814]">
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
