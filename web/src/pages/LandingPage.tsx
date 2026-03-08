import { CTA } from "@/components/landing/CTA";
import { FAQs } from "@/components/landing/FAQs";
import Features from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Navbar from "@/components/landing/Navbar";
import SocialProof from "@/components/landing/SocialProofSection";
import Testimonials from "@/components/landing/Testimonials";

const LandingPage = () => {
  return (
    <div className="w-full   transition-colors  overflow-hidden">
      <Navbar />
      <Hero />
      <SocialProof />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <FAQs />
      <Footer />
    </div>
  );
};

export default LandingPage;
