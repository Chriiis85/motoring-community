import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getDriverStandings } from "@/lib/f1-api";
import { DriverStanding } from "@/lib/types";
import FallbackImage from "@/components/ui/FallbackImage";
import ScrollToTop from "@/components/ui/ScrollToTop";
import "./drivers.css"; // Import the exact original CSS

export default async function DriversPage() {
  const standings = await getDriverStandings("current");
  
  return (
    <>
      <Header
        variant="page"
        pageTitle={"Formula One 2026 Drivers"}
        backgroundImage="https://cdn.topgear.es/sites/navi.axelspringer.es/public/media/image/2023/03/fernando-alonso-aston-martin-f1-2975194.jpg?tf=1200x"
      />
      <main className="main" aria-labelledby="main-title">
        <article className="card-driver-container">
          {standings.map((driverStanding: DriverStanding, i: number) => {
            const team = driverStanding.Constructors[0]?.name.replace(/\s+/g, "") || "Unknown";
            const familyName = driverStanding.Driver.familyName;
            const nationality = driverStanding.Driver.nationality;
            const permanentNumber = driverStanding.Driver.permanentNumber || "?";
            const code = driverStanding.Driver.code || "";
            const givenName = driverStanding.Driver.givenName;
            const surnameLowercase = familyName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            return (
              <div
                key={i}
                tabIndex={0}
                className="card-driver"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: `0 0 2px black, 0 0 10px black, 0 0 20px var(--${team}), 0 0 30px var(--${team}), 0 0 40px var(--${team}), 0 0 50px var(--${team})`,
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://media.formula1.com/content/dam/fom-website/manual/Helmets2024/${familyName}.png')`
                }}
              >
                <div className="driver-image">
                  <FallbackImage 
                    src={`/images/DriversPNG/${surnameLowercase}.png`} 
                    fallbackSrc="/images/transparent.svg" 
                    alt="Driver Image"
                    style={{ width: '130%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                  />
                </div>
                <div className="card-driver-info">
                  <div className="driverNumber">
                    <h1>{permanentNumber}</h1>
                    <h1>{code}</h1>
                  </div>
                  <div className="driver-data">
                    <div className="driverHelmet">
                      <FallbackImage 
                        src={`https://media.formula1.com/content/dam/fom-website/manual/Helmets2024/${familyName}.png`} 
                        fallbackSrc="/images/transparent.svg" 
                        alt="Driver Helmet" 
                      />
                    </div>
                    <div className="driverFlag" style={{ paddingLeft: '40px' }}>
                      <FallbackImage 
                        src={`https://media.formula1.com/content/dam/fom-website/flags/${nacionalidadAPais(nationality)}.jpg`} 
                        fallbackSrc="/images/transparent.svg" 
                        alt="Country Flag" 
                      />
                    </div>
                  </div>
                </div>
                <div className="card-driver-name">
                  <h1 className="name">{givenName}</h1>
                  <h1 className="surname">{familyName}</h1>
                </div>
              </div>
            );
          })}
        </article>
      </main>
      <ScrollToTop />
      <Footer />
    </>
  );
}

function nacionalidadAPais(nacionalidad: string) {
  switch (nacionalidad) {
    case 'Dutch':
      return 'Netherlands';
    case 'Mexican':
      return 'Mexico';
    case 'Monegasque':
      return 'Monaco';
    case 'Spanish':
      return 'Spain';
    case 'British':
      return 'Great-Britain';
    case 'Australian':
      return 'Australia';
    case 'Canadian':
      return 'Canada';
    case 'Japanese':
      return 'Japan';
    case 'German':
      return 'Germany';
    case 'Danish':
      return 'Denmark';
    case 'Chinese':
      return 'China';
    case 'French':
      return 'France';
    case 'Finnish':
      return 'Finland';
    case 'American':
      return 'United%20States';
    case 'Thai':
      return 'Thailand';
    case 'Italian':
      return 'Italy';
    case 'Austrian':
      return 'Austria';
    case 'Swiss':
      return 'Switzerland';
    case 'Brazilian':
      return 'Brazil';
    case 'New Zealander':
      return 'New%20Zealand';
    default:
      return 'Unknown';
  }
}
