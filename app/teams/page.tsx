import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getConstructorStandings, getDriverStandings } from "@/lib/f1-api";
import { ConstructorStanding, DriverStanding } from "@/lib/types";
import FallbackImage from "@/components/ui/FallbackImage";
import ScrollToTop from "@/components/ui/ScrollToTop";
import "./teams.css"; // Import original exact CSS

export default async function TeamsPage() {
  const [constructors, drivers] = await Promise.all([
    getConstructorStandings("current"),
    getDriverStandings("current")
  ]);
  
  // Group drivers by constructor
  const driversByConstructor: Record<string, typeof drivers> = {};
  drivers.forEach((driverStanding: DriverStanding) => {
    const constructorId = driverStanding.Constructors[0]?.constructorId;
    if (constructorId) {
      if (!driversByConstructor[constructorId]) {
        driversByConstructor[constructorId] = [];
      }
      driversByConstructor[constructorId].push(driverStanding);
    }
  });

  return (
    <>
      <Header
        variant="page"
        pageTitle={"Formula One 2026 Constructors"}
        backgroundImage="/images/Register-img.jpg"
      />
      <main className="teams-main">
        {constructors.length === 0 ? (
          <div className="py-20 px-4 text-center text-gray-700 dark:text-gray-300 font-['F1Regular']">
            <p className="text-xl sm:text-2xl font-bold">⚠️ No se han podido cargar las escuderías en este momento.</p>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2">Por favor, comprueba tu conexión a Internet o inténtalo de nuevo en unos minutos.</p>
          </div>
        ) : (
          <article className="teams-container">
          {constructors.map((teamStanding: ConstructorStanding) => {
            const team = teamStanding.Constructor;
            const teamNameSafe = team.name.replace(/\s+/g, "");
            const teamDrivers = driversByConstructor[team.constructorId] || [];

            return (
              <div
                key={team.constructorId}
                className="team-card-container"
                tabIndex={0}
                style={{
                  border: `solid 5px var(--${teamNameSafe})`,
                  boxShadow: `0 0 20px black, 0 0 1px black, 0 0 20px var(--${teamNameSafe}), 0 0 20px var(--${teamNameSafe}), 0 0 20px var(--${teamNameSafe}), 0 0 10px var(--${teamNameSafe})`,
                  borderLeft: "none",
                  borderBottom: "none"
                }}
              >
                <div className="team-card-title">
                  <h1>{team.name}</h1>
                  <div 
                    className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `var(--${teamNameSafe})` }}
                  >
                    <FallbackImage 
                      src={`/images/Teams/${teamNameSafe}.png`} 
                      fallbackSrc="/images/transparent.svg" 
                      alt="Team Logo"
                      style={{ width: '70%', height: '70%', objectFit: 'contain' }}
                    />
                  </div>
                </div>
                
                {teamDrivers.map((d: DriverStanding, index: number) => {
                  const driverName = `${d.Driver.givenName} ${d.Driver.familyName}`;
                  const surnameLowercase = d.Driver.familyName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                  
                  return (
                    <div key={index} className="team-card-driver">
                      <h1>{driverName}</h1>
                      <div className="w-[70px] h-[70px] overflow-hidden rounded-full border-2" style={{ borderColor: `var(--${teamNameSafe})`, backgroundColor: '#e1e1e1' }}>
                        <FallbackImage 
                          src={`/images/DriversPNG/${surnameLowercase}.png`} 
                          fallbackSrc="/images/transparent.svg" 
                          alt="Driver Image" 
                          style={{ width: '100%', height: '120%', objectFit: 'cover', objectPosition: 'top' }}
                        />
                      </div>
                    </div>
                  );
                })}

                <div className="team-card-car">
                  <FallbackImage 
                    src={`/images/Cars/${teamNameSafe}.png`} 
                    fallbackSrc="/images/transparent.svg" 
                    alt="Car Image" 
                  />
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
