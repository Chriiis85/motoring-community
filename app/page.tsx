
import './home.css';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSlideshow from "@/components/home/HeroSlideshow";
import CountdownTimer from "@/components/home/CountdownTimer";
import NewsCards from "@/components/home/NewsCards";
import AboutSection from "@/components/home/AboutSection";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen w-full max-w-full overflow-x-hidden min-w-0 flex flex-col">
        <HeroSlideshow />
        <CountdownTimer />
        <NewsCards />
        <AboutSection />
      </main>
      <ScrollToTop />
      <Footer />
    </>
  );
}
