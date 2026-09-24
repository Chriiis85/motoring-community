import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getRaceCalendar } from "@/lib/f1-api";
import { Race } from "@/lib/types";
import CalendarCountdown from "@/components/calendar/CalendarCountdown";
import FallbackImage from "@/components/ui/FallbackImage";
import { getTranslations } from "@/lib/i18n/server";
import ScrollToTop from "@/components/ui/ScrollToTop";
import "./calendar.css";

interface SessionInfo {
  title: string;
  text: string;
  isPast: boolean;
  isLive: boolean;
}

function getSessionInfo(
  sessionDate: string | undefined,
  sessionTime: string | undefined,
  raceDate: string,
  durationHours: number
): { text: string; isPast: boolean; isLive: boolean } {
  if (!sessionTime) {
    return { text: "TBD", isPast: false, isLive: false };
  }

  const dateStr = sessionDate || raceDate;
  const normalizedTime = sessionTime.endsWith("Z") ? sessionTime : `${sessionTime}Z`;
  const start = new Date(`${dateStr}T${normalizedTime}`);

  if (isNaN(start.getTime())) {
    return { text: "TBD", isPast: false, isLive: false };
  }

  const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);
  const now = new Date();

  // Spanish peninsular time (Europe/Madrid) - handles CET and CEST automatically
  const timeFormatter = new Intl.DateTimeFormat("es-ES", {
    timeZone: "Europe/Madrid",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return {
    text: `${timeFormatter.format(start)} - ${timeFormatter.format(end)}`,
    isPast: end.getTime() < now.getTime(),
    isLive: now.getTime() >= start.getTime() && now.getTime() <= end.getTime(),
  };
}

export default async function CalendarPage() {
  const races = await getRaceCalendar("current");
  const { t } = await getTranslations();
  const now = new Date();

  // Find next race taking race end time into consideration
  const nextRace = races.find((r: Race) => {
    const raceEnd = new Date(`${r.date}T${r.time || "23:59:59Z"}`).getTime() + 2 * 60 * 60 * 1000;
    return raceEnd > now.getTime();
  }) || races[races.length - 1] || races[0];

  const formatNextRaceHeaderDate = (dateStr: string, timeStr?: string) => {
    if (!dateStr) return "-";
    const [year, month, day] = dateStr.split("-").map(Number);
    const dayStr = day.toString().padStart(2, "0");
    const monthNames = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
    const monthStr = monthNames[month - 1] || "";
    
    if (timeStr) {
      const normalized = timeStr.endsWith("Z") ? timeStr : `${timeStr}Z`;
      const d = new Date(`${dateStr}T${normalized}`);
      if (!isNaN(d.getTime())) {
        const timeFmt = new Intl.DateTimeFormat("es-ES", {
          timeZone: "Europe/Madrid",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        return `${dayStr} ${monthStr} ${year} • ${timeFmt.format(d)}h (${t('spainTime')})`;
      }
    }
    return `${dayStr} ${monthStr} ${year}`;
  };

  return (
    <>
      <Header
        variant="page"
        pageTitle={t("calendarTitle")}
        backgroundImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ2FSs_yYHn2hXM7rtVhaGMr0_KAInpOcy1Lof38NJyh_7UzOk1iM8sOo&s=10"
      />

      <section className="next-race" aria-labelledby="next-race-title">
        <div className="next-race-container">
          <div className="row">
            <div className="col-md-7 col-lg-8 col-xl-9">
              <div className="next-race-title">
                <div className="next-race-date">
                  <p id="next-race-date">{formatNextRaceHeaderDate(nextRace.date, nextRace.time)}</p>
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
              
              // Dates formatting
              const [rYear, rMonth, rDay] = race.date.split("-").map(Number);
              const dia1 = rDay.toString().padStart(2, "0");
              const monthNames = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
              const mes = monthNames[rMonth - 1] || "";
              
              let dia2 = "01";
              if (race.FirstPractice?.date) {
                const fpParts = race.FirstPractice.date.split("-");
                dia2 = fpParts[2] ? fpParts[2].padStart(2, "0") : dia1;
              } else {
                dia2 = Math.max(1, rDay - 2).toString().padStart(2, "0");
              }

              const circuitImg = raceName.replace(/\s+/g, "");
              const tipoCarrera = race.Sprint ? "Sprint" : "Normal";
              
              let pais = race.Circuit.Location.country;
              if (pais === "UK") pais = "united-kingdom";
              else if (pais === "USA") pais = "united-states";
              else if (pais === "UAE") pais = "united-arab-emirates";
              pais = pais.toLowerCase().replace(/\s+/g, "-");

              // Status for race card
              const raceEndTime = new Date(`${race.date}T${race.time || "23:59:59Z"}`).getTime() + 2 * 60 * 60 * 1000;
              const isRacePast = raceEndTime < now.getTime();
              const isRaceNext = nextRace.round === race.round;

              // Build sessions array with Spanish time (Europe/Madrid) and completion status
              const sessions: SessionInfo[] = [];
              if (tipoCarrera === "Normal") {
                sessions.push({
                  title: t("freePractice1"),
                  ...getSessionInfo(race.FirstPractice?.date, race.FirstPractice?.time, race.date, 1),
                });
                sessions.push({
                  title: t("freePractice2"),
                  ...getSessionInfo(race.SecondPractice?.date, race.SecondPractice?.time, race.date, 1),
                });
                sessions.push({
                  title: t("freePractice3"),
                  ...getSessionInfo(race.ThirdPractice?.date, race.ThirdPractice?.time, race.date, 1),
                });
                sessions.push({
                  title: t("qualifying"),
                  ...getSessionInfo(race.Qualifying?.date, race.Qualifying?.time, race.date, 1),
                });
                sessions.push({
                  title: t("race"),
                  ...getSessionInfo(race.date, race.time, race.date, 2),
                });
              } else {
                // Sprint Weekend
                sessions.push({
                  title: t("freePractice1"),
                  ...getSessionInfo(race.FirstPractice?.date, race.FirstPractice?.time, race.date, 1),
                });
                const sprintQualy = race.SprintQualifying || race.SprintShootout || race.SecondPractice;
                sessions.push({
                  title: t("sprintQualifying"),
                  ...getSessionInfo(sprintQualy?.date, sprintQualy?.time, race.date, 1),
                });
                sessions.push({
                  title: t("sprintRace"),
                  ...getSessionInfo(race.Sprint?.date, race.Sprint?.time, race.date, 1),
                });
                sessions.push({
                  title: t("qualifying"),
                  ...getSessionInfo(race.Qualifying?.date, race.Qualifying?.time, race.date, 1),
                });
                sessions.push({
                  title: t("race"),
                  ...getSessionInfo(race.date, race.time, race.date, 2),
                });
              }

              return (
                <div 
                  key={i} 
                  role="article"
                  aria-label={`Round ${i + 1}: ${raceName} at ${circuitName}`}
                  className="race-container" 
                  tabIndex={0}
                >
                  {/* Card Front */}
                  <div className="race-container-front">
                      <div className="race-container-round">
                          <h2>ROUND {i + 1}</h2>
                          {isRacePast && (
                            <span className="race-status-pill race-status-past">{t("raceFinished")}</span>
                          )}
                          {!isRacePast && isRaceNext && (
                            <span className="race-status-pill race-status-next">{t("raceNext")}</span>
                          )}
                      </div>
                      <div className="race-container-title">
                          <span>{dia2}-{dia1} {mes}</span>
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
                  
                  {/* Card Back */}
                  <div className="race-container-back">
                      <div className="race-container-round">
                          <h2>ROUND {i + 1}</h2>
                          <span className="race-tz-pill" title={t("spainTimeNotice")}>{t("spainTime")}</span>
                      </div>
                      <div className="race-container-title">
                          <span>{dia2}-{dia1} {mes}</span>
                          <FallbackImage 
                            src={`https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/Flags%2016x9/${pais}-flag.png.transform/2col/image.png`} 
                            fallbackSrc="/images/transparent.svg"
                            alt={`${pais} flag`} 
                          />
                      </div>
                      
                      {sessions.map((ses, sIdx) => (
                        <div 
                          key={sIdx}
                          className={`race-container-sesion ${ses.isPast ? "session-past" : ""} ${ses.isLive ? "session-live" : ""}`}
                          title={ses.isPast ? t("sessionPast") : ses.isLive ? t("sessionLive") : t("sessionUpcoming")}
                        >
                          <h4 className="race-container-sesion-title">{ses.title}:</h4>
                          <p className="race-container-sesion-hour">
                            {ses.isPast && <span className="session-past-check" aria-hidden="true">✓</span>}
                            {ses.isLive && <span className="session-live-dot" aria-hidden="true" />}
                            <span>{ses.text}</span>
                          </p>
                        </div>
                      ))}
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
