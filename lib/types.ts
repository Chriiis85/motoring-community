// F1 API Types (Jolpica - same format as Ergast)

export interface Driver {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

export interface Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

export interface DriverStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: Driver;
  Constructors: Constructor[];
}

export interface ConstructorStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: Constructor;
}

export interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: {
    lat: string;
    long: string;
    locality: string;
    country: string;
  };
}

export interface Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
  FirstPractice?: { date: string; time: string };
  SecondPractice?: { date: string; time: string };
  ThirdPractice?: { date: string; time: string };
  Qualifying?: { date: string; time: string };
  Sprint?: { date: string; time: string };
  SprintQualifying?: { date: string; time: string };
  SprintShootout?: { date: string; time: string };
}

export interface RaceResult {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: Driver;
  Constructor: Constructor;
  grid: string;
  laps: string;
  status: string;
  Time?: { millis: string; time: string };
  FastestLap?: {
    rank: string;
    lap: string;
    Time: { time: string };
    AverageSpeed: { units: string; speed: string };
  };
}

// Team color mapping
export const TEAM_COLORS: Record<string, string> = {
  red_bull: "#3671c6",
  ferrari: "#dc0000",
  mclaren: "#ff8000",
  mercedes: "#00d2be",
  aston_martin: "#229971",
  rb: "#6692ff",
  haas: "#b6babd",
  williams: "#00a0de",
  sauber: "#ff2d00", // Audi
  audi: "#ff2d00",
  alpine: "#ff87bc",
  cadillac: "#aaaaad",
  // Aliases
  alphatauri: "#6692ff",
  alfa: "#ff2d00",
};

export function getTeamColor(constructorId: string): string {
  const normalized = constructorId.toLowerCase().replace(/[\s-]/g, "_");
  return TEAM_COLORS[normalized] || "#888888";
}

// Nationality to country mapping
export function nationalityToCountry(nationality: string): string {
  const map: Record<string, string> = {
    British: "Great Britain",
    Spanish: "Spain",
    Dutch: "Netherlands",
    Mexican: "Mexico",
    Monegasque: "Monaco",
    Finnish: "Finland",
    Australian: "Australia",
    Canadian: "Canada",
    French: "France",
    German: "Germany",
    Japanese: "Japan",
    Chinese: "China",
    Thai: "Thailand",
    Danish: "Denmark",
    American: "United States",
    Italian: "Italy",
    Austrian: "Austria",
    Swiss: "Switzerland",
    Brazilian: "Brazil",
    Belgian: "Belgium",
    Polish: "Poland",
    "New Zealander": "New Zealand",
    Argentine: "Argentina",
    Colombian: "Colombia",
    Indian: "India",
    Indonesian: "Indonesia",
    Irish: "Ireland",
    Malaysian: "Malaysia",
    Portuguese: "Portugal",
    Russian: "Russia",
    Saudi: "Saudi Arabia",
    "South African": "South Africa",
    Swedish: "Sweden",
    Venezuelan: "Venezuela",
  };
  return map[nationality] || nationality;
}

// Nationality to country code mapping (ISO 3166-1 alpha-2) for flag APIs
export function nationalityToCountryCode(nationality: string): string {
  const map: Record<string, string> = {
    British: "GB",
    Spanish: "ES",
    Dutch: "NL",
    Mexican: "MX",
    Monegasque: "MC",
    Finnish: "FI",
    Australian: "AU",
    Canadian: "CA",
    French: "FR",
    German: "DE",
    Japanese: "JP",
    Chinese: "CN",
    Thai: "TH",
    Danish: "DK",
    American: "US",
    Italian: "IT",
    Austrian: "AT",
    Swiss: "CH",
    Brazilian: "BR",
    Belgian: "BE",
    Polish: "PL",
    "New Zealander": "NZ",
    Argentine: "AR",
    Colombian: "CO",
    Indian: "IN",
    Indonesian: "ID",
    Irish: "IE",
    Malaysian: "MY",
    Portuguese: "PT",
    Russian: "RU",
    Saudi: "SA",
    "South African": "ZA",
    Swedish: "SE",
    Venezuelan: "VE",
  };
  return map[nationality] || "UN";
}

// Calculate age from date of birth
export function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// Get month abbreviation
export function getMonthAbbreviation(month: number): string {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  return months[month] || "";
}

// Format race time to local timezone
export function formatRaceTime(dateStr: string, timeStr: string): string {
  const dateTime = new Date(`${dateStr}T${timeStr}`);
  return dateTime.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

// Get track image name from race name
export function getTrackImageName(raceName: string): string {
  return raceName.replace(/\s/g, "").replace(/GrandPrix/i, "GrandPrix");
}

// Constructor ID to display name mapping
export const CONSTRUCTOR_NAMES: Record<string, string> = {
  red_bull: "Red Bull",
  ferrari: "Ferrari",
  mclaren: "McLaren",
  mercedes: "Mercedes",
  aston_martin: "Aston Martin",
  rb: "RB F1 Team",
  haas: "Haas F1 Team",
  williams: "Williams",
  sauber: "Audi F1 Team",
  audi: "Audi F1 Team",
  alpine: "Alpine F1 Team",
  cadillac: "Cadillac F1 Team",
  alphatauri: "RB F1 Team",
  alfa: "Audi F1 Team",
};

// Constructor ID to image filename mapping  
export const CONSTRUCTOR_IMAGE_MAP: Record<string, string> = {
  red_bull: "RedBull",
  ferrari: "Ferrari",
  mclaren: "McLaren",
  mercedes: "Mercedes",
  aston_martin: "AstonMartin",
  rb: "RBF1Team",
  haas: "HaasF1Team",
  williams: "Williams",
  sauber: "Audi",
  audi: "Audi",
  alpine: "AlpineF1Team",
  cadillac: "CadillacF1Team",
  alphatauri: "RBF1Team",
  alfa: "Audi",
};
