import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f3f3f3]">
      <Header
        variant="page"
        pageTitle="About Formula One 2026"
        backgroundImage="https://www.f1-fansite.com/wp-content/uploads/2023/06/SI202306040579.jpg"
      />
      <main className="flex-grow w-full py-10 px-4 md:px-8 conic-mesh-bg">
        <article className="max-w-4xl mx-auto bg-white p-8 md:p-12 border-2 border-black rounded-[15px] shadow-[0_5px_15px_rgba(0,0,0,0.35)] font-medium text-lg leading-relaxed text-[#282828]">
          <h1 className="text-3xl md:text-5xl font-[family-name:var(--font-f1-title)] mb-6 uppercase tracking-wider">About Formula One</h1>
          <p className="mb-6">
            Formula One, commonly known as Formula 1 or F1, is the highest class
            of international racing for open-wheel single-seater formula racing
            cars sanctioned by the Fédération Internationale de l'Automobile
            (FIA). The FIA Formula One World Championship has been one of the
            world's premier forms of racing since its inaugural running in 1950.
            The word formula in the name refers to the set of rules all
            participants' cars must follow. A Formula One season consists of a
            series of races, known as Grands Prix. Grands Prix take place in
            multiple countries and continents on either purpose-built circuits or
            closed public roads.
          </p>
          <p className="mb-10">
            A point-system is used at Grands Prix to determine two annual World
            Championships: one for the drivers, and one for the constructors (the
            teams). Each driver must hold a valid Super Licence, the highest class
            of racing licence the FIA issues, and the races must be held on grade
            one tracks, the highest grade rating the FIA issues for tracks.
          </p>

          <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-f1-title)] mb-6 uppercase tracking-wider">The Constructors</h1>
          <p className="mb-6">
            A Formula One constructor is the entity credited for designing the
            chassis and the engine. If both are designed by the same company, that
            company receives sole credit as the constructor (e.g., Ferrari). If
            they are designed by different companies, both are credited, and the
            name of the chassis designer is placed before that of the engine
            designer (e.g., McLaren-Mercedes). All constructors are scored
            individually, even if they share either chassis or engine with another
            constructor (e.g., Williams-Ford, Williams-Honda in 1983).
          </p>
          <p className="mb-8">
            Since 1981, Formula One teams have been required to build the chassis
            in which they compete, and consequently the distinction between the
            terms "team" and "constructor" became less pronounced, though engines
            may still be produced by a different entity. This requirement
            distinguishes the sport from series such as the IndyCar Series which
            allows teams to purchase chassis, and "spec series" such as Formula 2
            which require all cars be kept to an identical specification. It also
            effectively prohibits privateers, which were common even in Formula
            One well into the 1970s.
          </p>
          
          <div className="flex justify-center mb-12">
            <Link href="/teams">
              <button className="bg-[#222] text-white px-8 py-4 font-[family-name:var(--font-f1-bold)] text-xl rounded hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(0,0,0,0.5)] transition-all duration-300">
                View all Teams
              </button>

            </Link>
          </div>

          <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-f1-title)] mb-6 uppercase tracking-wider">The Drivers</h1>
          <p className="mb-6">
            Every team in Formula One must run two cars in every session in a
            Grand Prix weekend, and every team may use up to four drivers in a
            season. A team may also run two additional drivers in Free Practice
            sessions, which are often used to test potential new drivers for a
            career as a Formula One driver or gain experienced drivers to evaluate
            the car. Most drivers are contracted for at least the duration of a
            season, with driver changes taking place in-between seasons, in
            comparison to early years when drivers often competed on an ad hoc
            basis from race to race.
          </p>
          <p className="mb-8">
            Each competitor must be in the possession of a FIA Super Licence to
            compete in a Grand Prix, which is issued to drivers who have met the
            criteria of success in junior motorsport categories and having
            achieved 300 kilometres (190 mi) of running in a Formula One car.
            Drivers may also be issued a Super Licence by the World Motor Sport
            Council if they fail to meet the criteria. Although most drivers earn
            their seat on ability, commercial considerations also come into play
            with teams having to satisfy sponsors and financial demands.
          </p>

          <div className="flex justify-center mb-12">
            <Link href="/drivers">
              <button className="bg-[#222] text-white px-8 py-4 font-[family-name:var(--font-f1-bold)] text-xl rounded hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(0,0,0,0.5)] transition-all duration-300">
                View all Drivers
              </button>
            </Link>
          </div>

          <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-f1-title)] mb-6 uppercase tracking-wider">The Race Calendar</h1>
          <p className="mb-6">
            Every year, several Grand Prix races are organized in different parts
            of the world. In the 2026 season, the number is 24 Grand Prix races,
            and in 2023, it was 22, for example. Previously, championships were
            shorter, and the number of Grand Prix races has been progressively
            increasing. In the early days, championships averaged around 10-11
            Grand Prix races. In the 80s and 90s, the number of Grand Prix races
            was around 13-15.
          </p>
          <p className="mb-6">
            The competition takes place over the weekend and lasts for three days.
            On Friday, there are two sessions of free practice, where the drivers
            test and adjust their cars to the circuit, both in terms of settings
            and tires. On Saturday, another practice session takes place, followed
            by the qualifying session.
          </p>
          <p className="mb-8">
            On Sunday, the race takes place. The cars are lined up on the grid
            thirty minutes before the standard scheduled start time of the Grand
            Prix, typically at 15:00 local time, although occasionally the timings may
            vary, primarily for broadcasting convenience in Europe, especially
            when races are held in Asia or Oceania.
          </p>

          <div className="flex justify-center mb-4">
            <Link href="/calendar">
              <button className="bg-[#222] text-white px-8 py-4 font-[family-name:var(--font-f1-bold)] text-xl rounded hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(0,0,0,0.5)] transition-all duration-300">
                View the Calendar
              </button>
            </Link>
          </div>
        </article>
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  );
}
