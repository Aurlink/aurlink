import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import NetworkPerformance from "../components/NetworkPerformance";
import SolutionShowcase from '../components/SolutionShowcase';
import FinalCTA from '../components/FinalCTA';
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-[#0A0F2C] text-white">
      <Navbar />
      <Hero />
      <NetworkPerformance />
      <SolutionShowcase />
      <FinalCTA />
      <Footer />
    </div>
  );
}