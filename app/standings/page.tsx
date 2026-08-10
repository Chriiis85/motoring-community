import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StandingsClient from "@/components/standings/StandingsClient";
import { getDriverStandings, getConstructorStandings, getDriversByConstructor } from "@/lib/f1-api";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const revalidate = 3600; // Cache for 1 hour

export default async function StandingsPage() {
  const driverStandings = await getDriverStandings();
  const constructorStandings = await getConstructorStandings();
  const driversByConstructor = getDriversByConstructor(driverStandings);

  return (
    <main className="min-h-screen flex flex-col bg-[#f3f3f3]">
      <Header
        variant="page"
        pageTitle="Formula One Season Standings"
        backgroundImage="https://img2.rtve.es/i/?w=1600&i=1680083321103.JPG"
      />
      <StandingsClient 
        driverStandings={driverStandings}
        constructorStandings={constructorStandings}
        driversByConstructor={driversByConstructor}
      />
      <ScrollToTop />
      <Footer />
    </main>
  );
}
