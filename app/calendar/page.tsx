import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getRaceCalendar } from "@/lib/f1-api";
import { Race } from "@/lib/types";
import CalendarCountdown from "@/components/calendar/CalendarCountdown";
import FallbackImage from "@/components/ui/FallbackImage";
import { getTranslations } from "@/lib/i18n/server";
import ScrollToTop from "@/components/ui/ScrollToTop";
import "./calendar.css"; // Import original exact CSS

export default async function CalendarPage() {
  const races = await getRaceCalendar("current");
  const { t } = await getTranslations();
  
  function renderSessionTime(timeZ: string | undefined, durationHours: number) {
    if (!timeZ) return "TBD";
    // Parse UTC time from "15:00:00Z"
    const match = timeZ.match(/^(\d{2}):(\d{2})/);
    if (match) {
      const h = parseInt(match[1], 10);
      const m = match[2];
      const startStr = `${h.toString().padStart(2, '0')}:${m}`;
      
      const endH = (h + durationHours) % 24;
      const endStr = `${endH.toString().padStart(2, '0')}:${m}`;
      return `${startStr} - ${endStr}`;
    }
    return "TBD";
  }
  
  // Try to find the next race based on current date
  const now = new Date();
  const nextRace = races.find((r: Race) => new Date(r.date) > now) || races[0];

  return (
    <>
      <Header
        variant="page"
        pageTitle={t('calendarTitle')}
        backgroundImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ2FSs_yYHn2hXM7rtVhaGMr0_KAInpOcy1Lof38NJyh_7UzOk1iM8sOo&s=10"
      />
      
      <section className="next-race" aria-labelledby="next-race-title">
        <div className="next-race-container">
          <div className="row">
            <div className="col-md-7 col-lg-8 col-xl-9">
              <div className="next-race-title">
                <div className="next-race-date">
                  <p id="next-race-date">{nextRace.date}</p>
                </div>
                <div className="next-race-info">
                  <div className="next-race-next-race-circuit-imagecontainer">
                    <FallbackImage 
                      id="next-race-circuito" 
                      className="circuit-image" 
                      src={`/images/Tracks/${nextRace.raceName.replace(/\s+/g, '')}.png`} 
                      fallbackSrc="/images/transparent.svg"
                      alt="F1 live race circuit" 
                    />
                  </div>
                  <div className="next-race-text-container">
                    <div className="next-race-text">
                      <span id="next-race-title" className="race-name">{nextRace.raceName}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5 col-lg-4 col-xl-3">
              <CalendarCountdown 
                date={nextRace.date} 
                time={nextRace.time || '00:00:00Z'} 
                round={nextRace.round} 
              />
            </div>
          </div>
        </div>
      </section>

      <main className="calendar-main">
        <section className="calendar-season-container" aria-labelledby="calendar-title">
        <article className="calendar-season">
          {races.map((race: Race, i: number) => {
            const raceName = race.raceName;
            const circuitName = race.Circuit.circuitName;
            
            // Format dates
            const dateObj = new Date(race.date);
            const dia1 = dateObj.getDate().toString().padStart(2, '0');
            const mes = dateObj.toLocaleString('en-US', { month: 'short' });
            
            // Assume first practice date if available, or just subtract 2 days
            let dia2 = '01';
            if ((race as any).FirstPractice?.date) {
               dia2 = new Date((race as any).FirstPractice.date).getDate().toString().padStart(2, '0');
            } else {
               const fp = new Date(dateObj);
               fp.setDate(fp.getDate() - 2);
               dia2 = fp.getDate().toString().padStart(2, '0');
            }

            const circuitImg = raceName.replace(/\s+/g, '');
            const tipoCarrera = (race as any).Sprint ? "Sprint" : "Normal";
            
            let pais = race.Circuit.Location.country;
            if (pais === "UK") pais = "united-kingdom";
            else if (pais === "USA") pais = "united-states";
            else if (pais === "UAE") pais = "united-arab-emirates";
            pais = pais.toLowerCase().replace(/\s+/g, '-');

            return (
              <div 
                key={i} 
                role="article"
                aria-label={`Round ${i + 1}: ${raceName} at ${circuitName}`}
                className="race-container" 
                tabIndex={0}
              >
                <div className="race-container-front">
                    <div className="race-container-round">
                        <h2>ROUND {i + 1}</h2>
                    </div>
                    <div className="race-container-title">
                        <span>{dia2}-{dia1} {mes.toUpperCase()}</span>
                        <FallbackImage 
                          src={`https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/Flags%2016x9/${pais}-flag.png.transform/2col/image.png`} 
                          fallbackSrc="/images/transparent.svg"
                          alt={`${pais} flag`} 
                        />
                    </div>
                    <div className="race-container-desc">
                        <h3>{raceName}</h3>
                        <p>{circuitName}</p>
                    </div>
                    <div className="race-container-img">
                        <FallbackImage 
                          src={`/images/Tracks/${circuitImg}.png`} 
                          fallbackSrc="/images/transparent.svg"
                          alt={`Track layout of ${circuitName}`} 
                        />
                    </div>
                </div>
                
                <div className="race-container-back">
                    <div className="race-container-round">
                        <h2>ROUND {i + 1}</h2>
                    </div>
                    <div className="race-container-title">
                        <span>{dia2}-{dia1} {mes.toUpperCase()}</span>
                        <FallbackImage 
                          src={`https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/Flags%2016x9/${pais}-flag.png.transform/2col/image.png`} 
                          fallbackSrc="/images/transparent.svg"
                          alt={`${pais} flag`} 
                        />
                    </div>
                    
                    {tipoCarrera === "Normal" && (
                      <>
                        <div className="race-container-sesion">
                          <h4 className="race-container-sesion-title">Free Practice 1:</h4>
                          <p className="race-container-sesion-hour">{renderSessionTime((race as any).FirstPractice?.time, 1)}</p>
                        </div>
                        <div className="race-container-sesion">
                          <h4 className="race-container-sesion-title">Free Practice 2:</h4>
                          <p className="race-container-sesion-hour">{renderSessionTime((race as any).SecondPractice?.time, 1)}</p>
                        </div>
                        <div className="race-container-sesion">
                          <h4 className="race-container-sesion-title">Free Practice 3:</h4>
                          <p className="race-container-sesion-hour">{renderSessionTime((race as any).ThirdPractice?.time, 1)}</p>
                        </div>
                        <div className="race-container-sesion">
                          <h4 className="race-container-sesion-title">Qualifying:</h4>
                          <p className="race-container-sesion-hour">{renderSessionTime((race as any).Qualifying?.time, 1)}</p>
                        </div>
                        <div className="race-container-sesion">
                          <h4 className="race-container-sesion-title">Race:</h4>
                          <p className="race-container-sesion-hour">{renderSessionTime(race.time, 2)}</p>
                        </div>
                      </>
                    )}
                    
                    {tipoCarrera === "Sprint" && (
                      <>
                        <div className="race-container-sesion">
                          <h4 className="race-container-sesion-title">Free Practice 1:</h4>
                          <p className="race-container-sesion-hour">{renderSessionTime((race as any).FirstPractice?.time, 1)}</p>
                        </div>
                        <div className="race-container-sesion">
                          <h4 className="race-container-sesion-title">Sprint Qualifying:</h4>
                          <p className="race-container-sesion-hour">{renderSessionTime((race as any).SecondPractice?.time, 1)}</p>
                        </div>
                        <div className="race-container-sesion">
                          <h4 className="race-container-sesion-title">Sprint Race:</h4>
                          <p className="race-container-sesion-hour">{renderSessionTime((race as any).Sprint?.time, 1)}</p>
                        </div>
                        <div className="race-container-sesion">
                          <h4 className="race-container-sesion-title">Qualifying:</h4>
                          <p className="race-container-sesion-hour">{renderSessionTime((race as any).Qualifying?.time, 1)}</p>
                        </div>
                        <div className="race-container-sesion">
                          <h4 className="race-container-sesion-title">Race:</h4>
                          <p className="race-container-sesion-hour">{renderSessionTime(race.time, 2)}</p>
                        </div>
                      </>
                    )}
                </div>
              </div>
            );
          })}
        </article>
      </section>
      </main>
      
      <ScrollToTop />
      <Footer />
    </>
  );
}
