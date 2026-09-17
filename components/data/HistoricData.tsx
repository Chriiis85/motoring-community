"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Option {
  value: string;
  label: string;
}

export default function HistoricData() {
  const [year, setYear] = useState<string>("2026");
  const [category, setCategory] = useState<string>("Drivers");
  const [raceRound, setRaceRound] = useState<string>("1");
  const [races, setRaces] = useState<Option[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const years = Array.from({ length: 2026 - 1950 + 1 }, (_, i) => 2026 - i);

  useEffect(() => {
    fetchRaces(year);
  }, [year]);

  useEffect(() => {
    fetchData();
  }, [year, category, raceRound]);

  const fetchRaces = async (selectedYear: string) => {
    try {
      const res = await fetch(`https://api.jolpi.ca/ergast/f1/${selectedYear}.json`);
      const data = await res.json();
      const racesData = data.MRData.RaceTable.Races || [];
      
      const today = new Date();
      const formattedToday = today.toISOString().split("T")[0];
      
      const pastRaces = racesData.filter((r: any) => r.date < formattedToday).map((r: any) => ({
        value: r.round,
        label: r.raceName
      }));
      
      setRaces(pastRaces);
      if (pastRaces.length > 0) {
        setRaceRound(pastRaces[pastRaces.length - 1].value);
      }
    } catch (error) {
      console.error("Error fetching races:", error);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    setTableData([]);
    try {
      let url = "";
      if (category === "Constructors") {
        url = `https://api.jolpi.ca/ergast/f1/${year}/constructorStandings.json`;
      } else if (category === "Drivers") {
        url = `https://api.jolpi.ca/ergast/f1/${year}/driverStandings.json`;
      } else if (category === "Race") {
        url = `https://api.jolpi.ca/ergast/f1/${year}/${raceRound}/results.json`;
      }

      if (!url) return;

      const res = await fetch(url);
      const data = await res.json();

      if (category === "Constructors") {
        setTableData(data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || []);
      } else if (category === "Drivers") {
        setTableData(data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || []);
      } else if (category === "Race") {
        setTableData(data.MRData.RaceTable.Races[0]?.Results || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTitle = () => {
    if (category === "Constructors") return `${year} Constructors Standings`;
    if (category === "Drivers") return `${year} Driver Standings`;
    if (category === "Race") {
      const raceName = races.find((r) => r.value === raceRound)?.label || "";
      return `${year} ${raceName} Results`;
    }
    return "";
  };

  return (
    <section className="w-full my-[4%] flex items-center justify-center font-['F1Regular'] bg-[#f3f3f3] dark:bg-[#121212] text-black dark:text-white tracking-wide transition-colors duration-300">
      <article className="w-11/12 md:w-4/5 flex flex-col items-center justify-center bg-white dark:bg-[#1e1e1e] shadow-xl overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
        {/* Filters */}
        <div className="w-full h-auto md:h-[80px] flex flex-col md:flex-row items-center justify-around bg-[#222222] py-4 md:py-0 px-4 gap-3">
          <div className="relative w-full max-w-[280px]">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="appearance-none w-full text-xs sm:text-sm py-2.5 pr-8 pl-3 bg-white dark:bg-[#2c2c30] border border-[#caced1] dark:border-gray-700 rounded font-['F1Regular'] text-black dark:text-white cursor-pointer hover:shadow-[0_0_3px_3px_#00b9ff] focus:shadow-[0_0_3px_3px_#00b9ff] outline-none transition-shadow"
              aria-label="Select Year"
            >
              {years.map((y) => (
                <option key={y} value={y} className="bg-white dark:bg-[#222] text-black dark:text-white">{y}</option>
              ))}
            </select>
            <div className="absolute right-4 top-[45%] pointer-events-none border-x-[0.3rem] border-x-transparent border-t-[0.3rem] border-t-black dark:border-t-white"></div>
          </div>

          <div className="relative w-full max-w-[280px]">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none w-full text-xs sm:text-sm py-2.5 pr-8 pl-3 bg-white dark:bg-[#2c2c30] border border-[#caced1] dark:border-gray-700 rounded font-['F1Regular'] text-black dark:text-white cursor-pointer hover:shadow-[0_0_3px_3px_#00b9ff] focus:shadow-[0_0_3px_3px_#00b9ff] outline-none transition-shadow"
              aria-label="Select Category"
            >
              <option value="Constructors" className="bg-white dark:bg-[#222] text-black dark:text-white">Constructors Standings</option>
              <option value="Drivers" className="bg-white dark:bg-[#222] text-black dark:text-white">Drivers Standings</option>
              <option value="Race" className="bg-white dark:bg-[#222] text-black dark:text-white">Race Result</option>
            </select>
            <div className="absolute right-4 top-[45%] pointer-events-none border-x-[0.3rem] border-x-transparent border-t-[0.3rem] border-t-black dark:border-t-white"></div>
          </div>

          {category === "Race" && (
            <div className="relative w-full max-w-[280px]">
              <select
                value={raceRound}
                onChange={(e) => setRaceRound(e.target.value)}
                className="appearance-none w-full text-xs sm:text-sm py-2.5 pr-8 pl-3 bg-white dark:bg-[#2c2c30] border border-[#caced1] dark:border-gray-700 rounded font-['F1Regular'] text-black dark:text-white cursor-pointer hover:shadow-[0_0_3px_3px_#00b9ff] focus:shadow-[0_0_3px_3px_#00b9ff] outline-none transition-shadow"
                aria-label="Select Race"
              >
                {races.map((r) => (
                  <option key={r.value} value={r.value} className="bg-white dark:bg-[#222] text-black dark:text-white">{r.label}</option>
                ))}
              </select>
              <div className="absolute right-4 top-[45%] pointer-events-none border-x-[0.3rem] border-x-transparent border-t-[0.3rem] border-t-black dark:border-t-white"></div>
            </div>
          )}
        </div>

        {/* Content Table */}
        <div className="w-full flex flex-col items-center justify-evenly py-6 px-3 sm:px-6">
          <h2 className="font-[family-name:var(--font-f1-title)] text-center text-xl sm:text-2xl md:text-3xl mb-5 px-4 text-black dark:text-white uppercase tracking-wider">{getTitle()}</h2>
          
          <div role="region" aria-label="Historic Formula One data table" tabIndex={0} className="w-full overflow-x-auto pb-4 outline-none focus:ring-1 focus:ring-[#00b9ff] rounded">
            {isLoading ? (
              <div role="status" aria-label="Loading historic Formula 1 data" className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#00b9ff]"></div>
                <span className="sr-only">Loading historic data...</span>
              </div>
            ) : (
              <table className="w-full border-collapse text-xs sm:text-sm md:text-base shadow-sm font-[family-name:var(--font-f1-regular)] text-center whitespace-nowrap md:whitespace-normal">
                <thead>
                  <tr className="bg-[#222222] text-white font-[family-name:var(--font-f1-title)] text-xs sm:text-sm md:text-base uppercase tracking-wider">
                    <th scope="col" className="p-2.5 sm:p-3.5">Pos</th>
                    <th scope="col" className="p-2.5 sm:p-3.5">{category === "Constructors" ? "Team Name" : "Driver Name"}</th>
                    {category === "Race" && <th scope="col" className="p-2.5 sm:p-3.5">Constructor</th>}
                    {category !== "Constructors" && <th scope="col" className="p-2.5 sm:p-3.5">Nationality</th>}
                    {category === "Constructors" && <th scope="col" className="p-2.5 sm:p-3.5">Nationality</th>}
                    {category === "Race" && <th scope="col" className="p-2.5 sm:p-3.5">Time/Status</th>}
                    <th scope="col" className="p-2.5 sm:p-3.5">Points</th>
                    {category !== "Race" && <th scope="col" className="p-2.5 sm:p-3.5">Wins</th>}
                  </tr>
                </thead>
                <tbody>
                  {tableData.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">No data available</td>
                    </tr>
                  ) : (
                    tableData.map((item, index) => (
                      <tr 
                        key={index} 
                        tabIndex={0} 
                        className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1e1e1e] even:bg-[#f8f8f8] dark:even:bg-[#252528] text-black dark:text-gray-100 hover:bg-slate-100 dark:hover:bg-[#2c2c30] focus:bg-slate-100 dark:focus:bg-[#2c2c30] transition-colors"
                      >
                        <td className="p-2.5 sm:p-3.5 font-bold">{item.position}</td>
                        <td className="p-2.5 sm:p-3.5 font-semibold text-slate-900 dark:text-white">
                          {category === "Constructors" ? item.Constructor?.name || "N/A" : `${item.Driver?.givenName || ""} ${item.Driver?.familyName || ""}`.trim() || "N/A"}
                        </td>
                        {category === "Race" && <td className="p-2.5 sm:p-3.5">{item.Constructor?.name || "N/A"}</td>}
                        {category !== "Constructors" && <td className="p-2.5 sm:p-3.5 text-gray-600 dark:text-gray-300">{item.Driver?.nationality || "N/A"}</td>}
                        {category === "Constructors" && <td className="p-2.5 sm:p-3.5 text-gray-600 dark:text-gray-300">{item.Constructor?.nationality || "N/A"}</td>}
                        {category === "Race" && <td className="p-2.5 sm:p-3.5 font-mono text-xs sm:text-sm">{item.Time?.time || item.status || "N/A"}</td>}
                        <td className="p-2.5 sm:p-3.5 font-bold text-[#008cc3] dark:text-[#00b9ff]">{item.points}</td>
                        {category !== "Race" && <td className="p-2.5 sm:p-3.5">{item.wins || "0"}</td>}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </article>
    </section>
  );
}
