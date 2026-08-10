import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HistoricData from "@/components/data/HistoricData";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default async function DataPage() {
  
  return (
    <main className="min-h-screen flex flex-col bg-[#f3f3f3]">
      <Header
        variant="page"
        pageTitle={"HISTORIC DATA"}
        backgroundImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgblDkkDGp9qUwT1QmDysK2nf19xuvP-Fo5KjORf37UBYZnuVVVxiiKqQ&s=1024x1024"
      />
      <HistoricData />
      <ScrollToTop />
      <Footer />
    </main>
  );
}
