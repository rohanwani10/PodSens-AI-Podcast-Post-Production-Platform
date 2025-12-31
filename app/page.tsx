import { Header } from "@/components/home/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeatureSection";
import { PricingSection } from "@/components/home/PricingSection";
import { CtaSection } from "@/components/home/CtaSection";
import { Footer } from "@/components/home/Footer";

export default function Home() {
  return (
    <div className="">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
