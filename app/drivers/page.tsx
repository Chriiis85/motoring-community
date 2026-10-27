import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getDriverStandings } from "@/lib/f1-api";
import { DriverStanding, nationalityToCountryCode } from "@/lib/types";
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
        backgroundImage="/images/Login-img.jpg"
      />
      <main className="drivers-main w-full max-w-full overflow-x-hidden min-w-0" aria-labelledby="main-title">
        {standings.length === 0 ? (
          <div className="py-20 px-4 text-center text-gray-700 dark:text-gray-300 font-['F1Regular']">
            <p className="text-xl sm:text-2xl font-bold">⚠️ No se han podido cargar los pilotos en este momento.</p>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2">Por favor, comprueba tu conexión a Internet o inténtalo de nuevo en unos minutos.</p>
          </div>
        ) : (
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
                role="article"
                aria-label={`Driver ${givenName} ${familyName}, Number ${permanentNumber}, Team ${team}`}
                className="card-driver"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: `0 0 2px black, 0 0 10px black, 0 0 20px var(--${team}), 0 0 30px var(--${team}), 0 0 40px var(--${team}), 0 0 50px var(--${team})`,
                  backgroundImage: `url('/images/Helmets/${encodeURI(familyName)}.png')`
                }}
              >
                <div className="driver-image">
                  <FallbackImage 
                    src={`/images/DriversPNG/${surnameLowercase}.png`} 
                    fallbackSrc="/images/transparent.svg" 
                    alt={`Portrait of ${givenName} ${familyName}`}
                    style={{ width: '130%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                  />
                </div>
                <div className="card-driver-column">
                  <div className="driver-number-badge">
                    <span className="driver-number">{permanentNumber}</span>
                    {code && <span className="driver-code">{code}</span>}
                  </div>
                  <div 
                    className="driver-team-logo"
                    style={{ backgroundColor: `var(--${team})` }}
                  >
                    <FallbackImage 
                      src={`/images/Teams/${team}.png`} 
                      fallbackSrc="/images/transparent.svg" 
                      alt={`${team} constructor logo`}
                      style={{ width: '70%', height: '70%', objectFit: 'contain' }}
                    />
                  </div>
                  <div className="driver-country-flag">
                    <FallbackImage 
                      src={`https://flagcdn.com/w80/${nationalityToCountryCode(nationality).toLowerCase()}.png`} 
                      fallbackSrc="/images/transparent.svg" 
                      alt={`${nationality} nationality flag`} 
                    />
                  </div>
                </div>
                <div className="card-driver-name">
                  <h2 className="name">{givenName}</h2>
                  <h2 className="surname">{familyName}</h2>
                </div>
              </div>
            );
          })}
        </article>
        )}
      </main>
      <ScrollToTop />
      <Footer />
    </>
  );
}

