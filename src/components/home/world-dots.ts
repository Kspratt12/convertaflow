/**
 * Generate world map dots using a dense grid with land/ocean classification.
 * Uses simplified bounding boxes for major landmasses to determine if a point is on land.
 */

interface LandRegion {
  name: string;
  bounds: { latMin: number; latMax: number; lngMin: number; lngMax: number }[];
}

const landRegions: LandRegion[] = [
  {
    name: "North America",
    bounds: [
      { latMin: 25, latMax: 50, lngMin: -130, lngMax: -65 },  // contiguous US
      { latMin: 50, latMax: 72, lngMin: -170, lngMax: -55 },  // Canada
      { latMin: 55, latMax: 72, lngMin: -170, lngMax: -140 }, // Alaska
      { latMin: 15, latMax: 25, lngMin: -105, lngMax: -80 },  // Mexico/Central America
      { latMin: 18, latMax: 25, lngMin: -90, lngMax: -75 },   // Caribbean area
    ],
  },
  {
    name: "South America",
    bounds: [
      { latMin: -55, latMax: 12, lngMin: -82, lngMax: -35 },
    ],
  },
  {
    name: "Europe",
    bounds: [
      { latMin: 36, latMax: 72, lngMin: -10, lngMax: 40 },
      { latMin: 55, latMax: 72, lngMin: 10, lngMax: 60 },  // Scandinavia/Finland/Russia
    ],
  },
  {
    name: "Africa",
    bounds: [
      { latMin: -35, latMax: 37, lngMin: -18, lngMax: 52 },
    ],
  },
  {
    name: "Asia",
    bounds: [
      { latMin: 10, latMax: 55, lngMin: 40, lngMax: 145 },   // Main Asia
      { latMin: 55, latMax: 75, lngMin: 40, lngMax: 180 },   // Siberia
      { latMin: 5, latMax: 30, lngMin: 65, lngMax: 100 },    // India/SE Asia
      { latMin: -8, latMax: 8, lngMin: 95, lngMax: 140 },    // Indonesia
      { latMin: 30, latMax: 45, lngMin: 125, lngMax: 145 },  // Japan/Korea
    ],
  },
  {
    name: "Australia",
    bounds: [
      { latMin: -45, latMax: -10, lngMin: 112, lngMax: 155 },
    ],
  },
  {
    name: "Middle East",
    bounds: [
      { latMin: 12, latMax: 42, lngMin: 25, lngMax: 65 },
    ],
  },
  {
    name: "UK/Ireland",
    bounds: [
      { latMin: 50, latMax: 60, lngMin: -11, lngMax: 2 },
    ],
  },
  {
    name: "New Zealand",
    bounds: [
      { latMin: -48, latMax: -34, lngMin: 165, lngMax: 178 },
    ],
  },
];

function isLand(lat: number, lng: number): boolean {
  // Simple ocean exclusion: if deep in the ocean, skip
  for (const region of landRegions) {
    for (const b of region.bounds) {
      if (lat >= b.latMin && lat <= b.latMax && lng >= b.lngMin && lng <= b.lngMax) {
        return true;
      }
    }
  }
  return false;
}

// Generate a dense grid of dots, keeping only land points
function generateWorldDots(): [number, number][] {
  const dots: [number, number][] = [];
  const step = 2; // degrees between dots — dense for clear continent shapes

  for (let lat = -60; lat <= 72; lat += step) {
    for (let lng = -170; lng <= 178; lng += step) {
      if (isLand(lat, lng)) {
        // Add slight random jitter for organic look
        const jLat = lat + (Math.random() - 0.5) * 1.5;
        const jLng = lng + (Math.random() - 0.5) * 1.5;
        dots.push([jLat, jLng]);
      }
    }
  }

  return dots;
}

export const allContinentCoords: [number, number][] = generateWorldDots();
