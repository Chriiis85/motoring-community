"use client";

import { useState } from "react";
import Image from "next/image";
import { DriverStanding, ConstructorStanding, getTeamColor, CONSTRUCTOR_IMAGE_MAP, nationalityToCountry, nationalityToCountryCode, calculateAge } from "@/lib/types";

interface StandingsClientProps {
  driverStandings: DriverStanding[];
  constructorStandings: ConstructorStanding[];
  driversByConstructor: Record<string, Array<{ givenName: string; familyName: string }>>;
}

export default function StandingsClient({ driverStandings, constructorStandings, driversByConstructor }: StandingsClientProps) {
  const [activeTab, setActiveTab] = useState<"drivers" | "constructors">("drivers");
  const [expandedDriver, setExpandedDriver] = useState<string | null>(null);
  const [expandedConstructor, setExpandedConstructor] = useState<string | null>(null);

  const toggleDriver = (driverId: string) => {
    setExpandedDriver(expandedDriver === driverId ? null : driverId);
  };

  const toggleConstructor = (constructorId: string) => {
    setExpandedConstructor(expandedConstructor === constructorId ? null : constructorId);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center bg-[#f3f3f3] w-full pb-10">
      <article className="w-4/5 mt-[3%] flex flex-col md:flex-row items-center justify-around rounded-[5px] font-[family-name:var(--font-f1-title)] text-lg uppercase text-white bg-[#222222]">
        <div
          id="DriverStan"
          tabIndex={0}
          className="w-[90%] md:w-[45%] xl:w-[28%] h-20 md:h-[50px] flex flex-col items-center justify-around transition-all duration-200 cursor-pointer hover:bg-white hover:text-black focus:bg-white focus:text-black relative"
          onClick={() => setActiveTab("drivers")}
          onKeyDown={(e) => e.key === "Enter" && setActiveTab("drivers")}
        >
          <h1 className="mt-2 md:mt-0">Drivers Standings</h1>
          {activeTab === "drivers" && (
            <div className="absolute bottom-0 md:-bottom-[4px] w-[300px] md:w-[350px] xl:w-[20%] h-[4px] bg-[#00b9ff]" />
          )}
        </div>
        <div
          id="ConstStan"
          tabIndex={0}
          className="w-[90%] md:w-[45%] xl:w-[28%] h-20 md:h-[50px] flex flex-col items-center justify-around transition-all duration-200 cursor-pointer hover:bg-white hover:text-black focus:bg-white focus:text-black relative"
          onClick={() => setActiveTab("constructors")}
          onKeyDown={(e) => e.key === "Enter" && setActiveTab("constructors")}
        >
          <h1 className="mt-2 md:mt-0">Constructors Standings</h1>
          {activeTab === "constructors" && (
            <div className="absolute bottom-0 md:-bottom-[4px] w-[300px] md:w-[350px] xl:w-[20%] h-[4px] bg-[#00b9ff]" />
          )}
        </div>
      </article>

      {/* Driver Standings */}
      {activeTab === "drivers" && (
        <article className="w-full mt-[1%] mb-[2%] flex flex-col items-center justify-center text-center gap-[1%] font-[family-name:var(--font-f1-bold)]">
          {driverStandings.map((driver) => {
            const teamId = driver.Constructors[0]?.constructorId || "";
            const teamName = driver.Constructors[0]?.name || "Unknown";
            const teamColor = getTeamColor(teamId);
            const teamImageName = CONSTRUCTOR_IMAGE_MAP[teamId.replace(/_/g, "")] || CONSTRUCTOR_IMAGE_MAP[teamId] || teamId;
            const isExpanded = expandedDriver === driver.Driver.driverId;
            const surnameLowercase = driver.Driver.familyName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const surnameHelmet = driver.Driver.familyName;

            return (
              <div key={driver.Driver.driverId} className="w-full flex flex-col items-center mb-[1%]">
                <div
                  tabIndex={0}
                  className={`w-4/5 h-[70px] flex flex-row items-center justify-between bg-white cursor-pointer transition-all duration-300 hover:bg-[#222222] hover:text-white focus:bg-[#222222] focus:text-white ${isExpanded ? "rounded-t-[5px]" : "rounded-[5px]"}`}
                  onClick={() => toggleDriver(driver.Driver.driverId)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), toggleDriver(driver.Driver.driverId))}
                >
                  <div className="w-[20%] h-full flex flex-row items-center justify-center text-base sm:text-lg md:text-xl">
                    {driver.position}
                    <div className="w-[7px] h-1/2 ml-[5%] border border-black" style={{ backgroundColor: teamColor }} />
                  </div>
                  <div className="w-[30%] flex flex-row items-center justify-center text-base sm:text-lg md:text-xl">
                    {driver.Driver.givenName} {driver.Driver.familyName}
                  </div>
                  <div className="w-[20%] h-full flex flex-row items-center justify-center gap-[5%] text-base sm:text-lg">
                    {teamName}
                    {teamId && (
                      <div 
                        className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: teamColor }}
                      >
                        <Image src={`/images/Teams/${teamImageName}.png`} alt="Team Logo" width={30} height={30} className="w-[70%] h-[70%] object-contain drop-shadow-md" />
                      </div>
                    )}
                  </div>
                  <div className="w-[30%] sm:w-[20%] h-1/2 flex items-center justify-center">
                    <div className="text-sm sm:text-base md:text-lg rounded-[50px] text-white p-[3%] bg-gray-500 whitespace-nowrap">
                      {driver.points} PTS.
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="w-4/5 h-auto md:h-[275px] -mt-[0%] mb-[1%] rounded-b-[15px] flex flex-col md:flex-row items-center justify-around bg-[#222222] font-[family-name:var(--font-f1-title)] text-white">
                    <div className="w-full md:w-[30%] h-64 md:h-full flex items-center justify-center rounded-b-none md:rounded-bl-[15px] overflow-hidden">
                      <Image
                        src={`/images/DriversPNG/${surnameLowercase}.png`}
                        alt="Driver Image"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover object-top rounded-bl-[15px]"
                        unoptimized
                        onError={(e) => { e.currentTarget.src = "/images/DriversPNG/default.png"; }}
                      />
                    </div>
                    <div className="w-full md:w-[70%] h-full flex flex-col items-center justify-center rounded-br-[15px] p-4">
                      <div className="w-[90%] md:h-[30%] flex flex-col md:flex-row items-center justify-center md:ml-[7%]">
                        <div className="w-full md:w-[80%] h-full flex items-center justify-center md:justify-start text-xl sm:text-2xl md:text-3xl">
                          <h1>{driver.Driver.givenName} {driver.Driver.familyName}</h1>
                        </div>
                        <div className="w-full md:w-[30%] h-full flex items-center justify-center text-xl sm:text-2xl md:text-3xl mt-2 md:mt-0">
                          <h1>{driver.Driver.permanentNumber}</h1>
                          <Image
                            src={`https://flagcdn.com/w80/${nationalityToCountryCode(driver.Driver.nationality).toLowerCase()}.png`}
                            alt={`${driver.Driver.nationality} Flag`}
                            width={60}
                            height={40}
                            className="w-[30%] ml-[25%] rounded-[3px] mb-[1%]"
                            unoptimized
                          />
                        </div>
                        
                      </div>
                      <div className="w-[90%] h-auto md:h-[70%] flex flex-col md:flex-row items-start md:items-center justify-center font-[family-name:var(--font-f1-bold)] text-sm sm:text-base md:text-[1.1em] gap-4 md:gap-0 mt-4 md:mt-0">
                        <div className="w-full md:w-1/2 h-full flex flex-col items-start justify-start gap-[10%] md:mt-[5%]">
                          <p className="m-0 md:ml-[10%]">Wins: {driver.wins}</p>
                          <p className="m-0 md:ml-[10%]">Total Points: {driver.points} PTS.</p>
                          <p className="m-0 md:ml-[10%]">Constructor: {teamName}</p>
                          <a href={driver.Driver.url} target="_blank" rel="noopener noreferrer" className="m-0 md:ml-[10%] text-[#00b9ff] hover:underline" title={`Go to Biography ${driver.Driver.givenName} Page`}>
                            Access to the biography
                          </a>
                        </div>
                        <div className="w-full md:w-1/2 h-full flex flex-col items-start justify-start gap-[10%]">
                          <p className="m-0 md:ml-[10%]">Nationality: {driver.Driver.nationality}.</p>
                          <p className="m-0 md:ml-[10%]">Date of Birth: {driver.Driver.dateOfBirth}</p>
                          <p className="m-0 md:ml-[10%]">Age: {calculateAge(driver.Driver.dateOfBirth)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </article>
      )}

      {/* Constructor Standings */}
      {activeTab === "constructors" && (
        <article className="w-full mt-[1%] mb-[2%] flex flex-col items-center justify-center text-center font-[family-name:var(--font-f1-bold)]">
          {constructorStandings.map((team) => {
            const teamId = team.Constructor.constructorId;
            const teamName = team.Constructor.name;
            const teamColor = getTeamColor(teamId);
            const teamImageName = CONSTRUCTOR_IMAGE_MAP[teamId.replace(/_/g, "")] || CONSTRUCTOR_IMAGE_MAP[teamId] || teamId;
            const isExpanded = expandedConstructor === teamId;
            const drivers = driversByConstructor[teamName] || [];
            const d1 = drivers[0] || { givenName: "Unknown", familyName: "Unknown" };
            const d2 = drivers[1] || { givenName: "Unknown", familyName: "Unknown" };

            return (
              <div key={teamId} className="w-full flex flex-col items-center mb-[1%]">
                <div
                  tabIndex={0}
                  className={`w-4/5 h-[70px] flex flex-row items-center justify-between bg-white cursor-pointer transition-all duration-300 hover:bg-[#222222] hover:text-white focus:bg-[#222222] focus:text-white ${isExpanded ? "rounded-t-[5px]" : "rounded-[5px]"}`}
                  onClick={() => toggleConstructor(teamId)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), toggleConstructor(teamId))}
                >
                  <div className="w-[20%] h-full flex flex-row items-center justify-center text-base sm:text-lg md:text-xl">
                    {team.position}
                    <div className="w-[7px] h-1/2 ml-[5%] border border-black" style={{ backgroundColor: teamColor }} />
                  </div>
                  <div className="w-[20%] flex flex-row items-center justify-center text-base sm:text-xl md:text-2xl lg:text-[1.5em]">
                    {teamName}
                  </div>
                  <div className="hidden md:flex w-[20%] flex-row items-center justify-center text-sm md:text-base text-black/60 group-hover:text-white focus:text-white">
                    {d1.familyName}/{d2.familyName}
                  </div>
                  <div className="w-[10%] h-full flex flex-row items-center justify-center gap-[5%] text-base sm:text-lg">
                    <div 
                      className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: teamColor }}
                    >
                      <Image src={`/images/Teams/${teamImageName}.png`} alt="Team Logo" width={30} height={30} className="w-[70%] h-[70%] object-contain drop-shadow-md" />
                    </div>
                  </div>
                  <div className="w-[30%] sm:w-[20%] h-1/2 flex items-center justify-center">
                    <div className="text-sm sm:text-base md:text-lg rounded-[50px] text-white p-[3%] bg-gray-500 whitespace-nowrap">
                      {team.points} PTS.
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="w-4/5 h-auto md:h-[250px] -mt-[0%] mb-[1%] rounded-b-[15px] flex flex-col md:flex-row items-center justify-around bg-[#222222] font-[family-name:var(--font-f1-title)] text-white">
                    <div
                      className="w-full md:w-[40%] h-48 md:h-full flex items-center justify-center rounded-b-none md:rounded-bl-[15px] bg-white overflow-hidden relative"
                      style={{
                        backgroundImage: `linear-gradient(0deg, transparent 24%, #e1e1e1 25%, #e1e1e1 26%, transparent 27%, transparent 74%, #e1e1e1 75%, #e1e1e1 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #e1e1e1 25%, #e1e1e1 26%, transparent 27%, transparent 74%, #e1e1e1 75%, #e1e1e1 76%, transparent 77%, transparent)`,
                        backgroundSize: "80px 80px",
                      }}
                    >
                      <Image
                        src={`/images/Cars/${teamImageName}.png`}
                        alt="Car Img"
                        width={400}
                        height={200}
                        className="w-[95%] h-auto object-contain"
                        unoptimized
                        onError={(e) => { e.currentTarget.src = "/images/Cars/default.png"; }}
                      />
                    </div>
                    <div className="w-full md:w-[60%] h-full flex flex-col items-center justify-center rounded-br-[15px] p-4">
                      <div className="w-[90%] md:h-[30%] flex flex-col md:flex-row items-center justify-center">
                        <div className="w-full md:w-[70%] h-full flex items-center justify-center md:justify-start md:pl-[5%] text-xl sm:text-2xl md:text-3xl">
                          <h1>{teamName}</h1>
                        </div>
                        <div className="w-full md:w-[30%] h-full flex items-center justify-center text-xl sm:text-2xl md:text-3xl mt-2 md:mt-0">
                          <h1></h1>
                          <Image
                            src={`https://flagcdn.com/w80/${nationalityToCountryCode(team.Constructor.nationality).toLowerCase()}.png`}
                            alt={`${team.Constructor.nationality} Flag`}
                            width={60}
                            height={40}
                            className="w-[50%] md:w-[30px] ml-[15%] rounded-[3px] mb-[1%]"
                            unoptimized
                          />
                        </div>
                        <div className="w-full h-full flex items-center justify-center mt-2 md:mt-0">
                          <div 
                            className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: teamColor }}
                          >
                            <Image
                              src={`/images/Teams/${teamImageName}.png`}
                              alt="Team Logo"
                              width={40}
                              height={40}
                              className="w-[70%] h-[70%] object-contain drop-shadow-md"
                              unoptimized
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-[90%] h-auto md:h-[70%] flex flex-col md:flex-row items-center justify-center font-[family-name:var(--font-f1-bold)] text-sm sm:text-base md:text-[1.1em] gap-4 md:gap-0 mt-4 md:mt-0">
                        <div className="w-full md:w-1/2 h-full flex flex-col items-start justify-center gap-[10%]">
                          <p className="m-0 md:ml-[10%]">Wins: {team.wins}.</p>
                          <p className="m-0 md:ml-[10%]">Total Points: {team.points} PTS.</p>
                          <a href={team.Constructor.url} target="_blank" rel="noopener noreferrer" className="m-0 md:ml-[10%] text-[#00b9ff] hover:underline" title={`Go to ${teamName} Biography Page`}>
                            Access to the biography.
                          </a>
                        </div>
                        <div className="w-full md:w-1/2 h-full flex flex-col items-start justify-center gap-[10%]">
                          <p className="m-0 md:ml-[10%]">Nationality: {team.Constructor.nationality}.</p>
                          <p className="m-0 md:ml-[10%]">Driver1: {d1.givenName} {d1.familyName}.</p>
                          <p className="m-0 md:ml-[10%]">Driver2: {d2.givenName} {d2.familyName}.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </article>
      )}
    </div>
  );
}
