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
    <section className="w-full my-[5%] flex items-center justify-center font-[family-name:var(--font-bebas)] bg-[#f3f3f3] dark:bg-[#121212] text-black dark:text-white tracking-wide transition-colors duration-300">
      <article className="w-11/12 md:w-4/5 flex flex-col items-center justify-center bg-white dark:bg-[#1e1e1e] shadow-xl overflow-hidden rounded-lg border border-transparent dark:border-gray-800">
        {/* Filters */}
        <div className="w-full h-auto md:h-[100px] flex flex-col md:flex-row items-center justify-around bg-[#222222] py-4 md:py-0">
          <div className="relative w-[300px] my-[3%] md:my-0">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="appearance-none w-full text-lg md:text-[1.15rem] py-[0.675em] pr-8 pl-4 bg-white dark:bg-[#2c2c30] border border-[#caced1] dark:border-gray-700 rounded font-[family-name:var(--font-open-sans)] text-black dark:text-white cursor-pointer hover:shadow-[0_0_3px_3px_#00b9ff] focus:shadow-[0_0_3px_3px_#00b9ff] outline-none"
              aria-label="Select Year"
            >
              {years.map((y) => (
                <option key={y} value={y} className="bg-white dark:bg-[#222] text-black dark:text-white">{y}</option>
              ))}
            </select>
            <div className="absolute right-4 top-[45%] pointer-events-none border-x-[0.3rem] border-x-transparent border-t-[0.3rem] border-t-black dark:border-t-white"></div>
          </div>

          <div className="relative w-[300px] my-[3%] md:my-0">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none w-full text-lg md:text-[1.15rem] py-[0.675em] pr-8 pl-4 bg-white dark:bg-[#2c2c30] border border-[#caced1] dark:border-gray-700 rounded font-[family-name:var(--font-open-sans)] text-black dark:text-white cursor-pointer hover:shadow-[0_0_3px_3px_#00b9ff] focus:shadow-[0_0_3px_3px_#00b9ff] outline-none"
              aria-label="Select Category"
            >
              <option value="Constructors" className="bg-white dark:bg-[#222] text-black dark:text-white">Constructors Standings</option>
              <option value="Drivers" className="bg-white dark:bg-[#222] text-black dark:text-white">Drivers Standings</option>
              <option value="Race" className="bg-white dark:bg-[#222] text-black dark:text-white">Race Result</option>
            </select>
            <div className="absolute right-4 top-[45%] pointer-events-none border-x-[0.3rem] border-x-transparent border-t-[0.3rem] border-t-black dark:border-t-white"></div>
          </div>

          {category === "Race" && (
            <div className="relative w-[300px] my-[3%] md:my-0">
              <select
                value={raceRound}
                onChange={(e) => setRaceRound(e.target.value)}
                className="appearance-none w-full text-lg md:text-[1.15rem] py-[0.675em] pr-8 pl-4 bg-white dark:bg-[#2c2c30] border border-[#caced1] dark:border-gray-700 rounded font-[family-name:var(--font-open-sans)] text-black dark:text-white cursor-pointer hover:shadow-[0_0_3px_3px_#00b9ff] focus:shadow-[0_0_3px_3px_#00b9ff] outline-none"
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
        <div className="w-full flex flex-col items-center justify-evenly py-[3%]">
          <h1 className="font-[family-name:var(--font-f1-title)] text-center text-2xl md:text-3xl lg:text-[3em] mb-[3%] px-4 text-black dark:text-white">{getTitle()}</h1>
          
          <div className="w-[95%] md:w-[90%] overflow-x-auto pb-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00b9ff]"></div>
              </div>
            ) : (
              <table className="w-full border-collapse text-sm md:text-lg lg:text-[1.25em] shadow-[0_0_20px_rgba(0,0,0,0.15)] font-[family-name:var(--font-f1-regular)] text-center whitespace-nowrap md:whitespace-normal">
                <thead>
                  <tr className="bg-[#222222] text-white font-[family-name:var(--font-f1-title)] text-base md:text-xl lg:text-[1.5em] uppercase">
                    <th className="p-3 md:p-[12px_15px]">Position</th>
                    <th className="p-3 md:p-[12px_15px]">{category === "Constructors" ? "Team Name" : "Driver Name"}</th>
                    {category === "Race" && <th className="p-3 md:p-[12px_15px]">Constructor</th>}
                    {category !== "Constructors" && <th className="p-3 md:p-[12px_15px]">Nationality</th>}
                    {category === "Constructors" && <th className="p-3 md:p-[12px_15px]">Nationality</th>}
                    {category === "Race" && <th className="p-3 md:p-[12px_15px]">Time/Status</th>}
                    <th className="p-3 md:p-[12px_15px]">Points</th>
                    {category !== "Race" && <th className="p-3 md:p-[12px_15px]">Wins</th>}
                  </tr>
                </thead>
                <tbody>
                  {tableData.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-4 text-center text-gray-500 dark:text-gray-400">No data available</td>
                    </tr>
                  ) : (
                    tableData.map((item, index) => (
                      <tr 
                        key={index} 
                        tabIndex={0} 
                        className="border-b border-[#dddddd] dark:border-[#333338] bg-white dark:bg-[#1e1e1e] even:bg-[#f3f3f3] dark:even:bg-[#26262a] text-black dark:text-gray-100 last:border-b-2 last:border-[#00b9ff] hover:shadow-[0_0_3px_3px_#00b9ff] focus:shadow-[0_0_3px_3px_#00b9ff] transition-shadow"
                      >
                        <td className="p-2 md:p-[12px_15px] font-bold">{item.position}</td>
                        <td className="p-2 md:p-[12px_15px] font-semibold">
                          {category === "Constructors" ? item.Constructor?.name || "N/A" : `${item.Driver?.givenName || ""} ${item.Driver?.familyName || ""}`.trim() || "N/A"}
                        </td>
                        {category === "Race" && <td className="p-2 md:p-[12px_15px]">{item.Constructor?.name || "N/A"}</td>}
                        {category !== "Constructors" && <td className="p-2 md:p-[12px_15px]">{item.Driver?.nationality || "N/A"}</td>}
                        {category === "Constructors" && <td className="p-2 md:p-[12px_15px]">{item.Constructor?.nationality || "N/A"}</td>}
                        {category === "Race" && <td className="p-2 md:p-[12px_15px]">{item.Time?.time || item.status || "N/A"}</td>}
                        <td className="p-2 md:p-[12px_15px] font-bold">{item.points}</td>
                        {category !== "Race" && <td className="p-2 md:p-[12px_15px]">{item.wins || "0"}</td>}
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
