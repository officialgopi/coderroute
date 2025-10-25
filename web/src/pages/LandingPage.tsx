import { CTA } from "@/components/landing/CTA";
import { FAQs } from "@/components/landing/FAQs";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";

const LandingPage = () => {
  return (
    <div className="w-full   transition-colors">
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <FAQs />
      <Footer />
    </div>
  );
};

export default LandingPage;
