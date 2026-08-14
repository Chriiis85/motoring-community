// Jolpica F1 API Client (Ergast API replacement)
// Base URL: https://api.jolpi.ca/ergast/f1/

const BASE_URL = "https://api.jolpi.ca/ergast/f1";

async function fetchF1Data(endpoint: string) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!res.ok) {
      console.warn(`F1 API error: ${res.status}`);
      return { MRData: { StandingsTable: { StandingsLists: [] }, RaceTable: { Races: [] } } };
    }
    return res.json();
  } catch (error) {
    console.error("Fetch F1 Data failed:", error);
    return { MRData: { StandingsTable: { StandingsLists: [] }, RaceTable: { Races: [] } } };
  }
}

export async function getDriverStandings(year: string | number = "current") {
  const data = await fetchF1Data(`/${year}/driverStandings.json`);
  return data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];
}

export async function getConstructorStandings(year: string | number = "current") {
  const data = await fetchF1Data(`/${year}/constructorStandings.json`);
  return data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || [];
}

export async function getRaceCalendar(year: string | number = "current") {
  const data = await fetchF1Data(`/${year}.json`);
  return data.MRData.RaceTable.Races || [];
}

export async function getRaceResults(year: string | number, round: string | number) {
  const data = await fetchF1Data(`/${year}/${round}/results.json`);
  return data.MRData.RaceTable.Races[0]?.Results || [];
}

export async function getAllSeasonRaces(year: string | number) {
  const data = await fetchF1Data(`/${year}.json`);
  return data.MRData.RaceTable.Races || [];
}

// Get next upcoming race from calendar
export function getNextRace(races: Array<{date: string; time?: string; raceName: string; round: string; Circuit: {circuitName: string; Location: {country: string}}}>) {
  const now = new Date();
  return races.find((race) => {
    const raceDate = new Date(`${race.date}T${race.time || "00:00:00Z"}`);
    return raceDate > now;
  });
}

// Get drivers grouped by constructor
export function getDriversByConstructor(
  standings: Array<{
    Driver: { givenName: string; familyName: string };
    Constructors: Array<{ constructorId: string; name: string }>;
  }>
) {
  const teamDrivers: Record<string, Array<{ givenName: string; familyName: string }>> = {};
  
  for (const standing of standings) {
    const constructorName = standing.Constructors[0]?.name || "Unknown";
    if (!teamDrivers[constructorName]) {
      teamDrivers[constructorName] = [];
    }
    teamDrivers[constructorName].push({
      givenName: standing.Driver.givenName,
      familyName: standing.Driver.familyName,
    });
  }
  
  return teamDrivers;
}
