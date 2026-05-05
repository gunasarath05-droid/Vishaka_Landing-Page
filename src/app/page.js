import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Amenities from "@/components/Amenities";
import Locality from "@/components/Locality";
import FloorPlan from "@/components/FloorPlan";
import Specifications from "@/components/Specifications";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import MapLocation from "@/components/MapLocation";
import Nearby from "@/components/Nearby";
import About from "@/components/About";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Amenities />
      <Locality />
      <FloorPlan />
      {/* <Specifications /> */}
      <Testimonials />
      <Gallery />
      <Nearby />
      <MapLocation />
      <About />
      <CTASection />
      <Footer />
    </main>
  );
}
