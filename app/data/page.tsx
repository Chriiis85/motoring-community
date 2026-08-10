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
        backgroundImage="https://media.formula1.com/image/upload/content/dam/fom-website/manual/Misc/2022-Pre-Season/Day1/GettyImages-1383808805.jpg"
      />
      <HistoricData />
      <ScrollToTop />
      <Footer />
    </main>
  );
}
