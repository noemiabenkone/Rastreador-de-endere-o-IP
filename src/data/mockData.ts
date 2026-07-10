export interface MockLocation {
  ip: string;
  location: {
    city: string;
    region: string;
    postalCode: string;
    timezone: string;
    lat: number;
    lng: number;
  };
  isp: string;
}

export const mockData: MockLocation[] = [
  {
    ip: "142.250.191.46",
    location: {
      city: "São Paulo",
      region: "Brasil",
      postalCode: "01000-000",
      timezone: "-03:00",
      lat: -23.55052,
      lng: -46.633308,
    },
    isp: "Vivo Fibra",
  },

  {
    ip: "172.217.18.206",
    location: {
      city: "Rio de Janeiro",
      region: "Brasil",
      postalCode: "20000-000",
      timezone: "-03:00",
      lat: -22.906847,
      lng: -43.172897,
    },
    isp: "Claro",
  },

  {
    ip: "151.101.1.69",
    location: {
      city: "Brasília",
      region: "Brasil",
      postalCode: "70000-000",
      timezone: "-03:00",
      lat: -15.793889,
      lng: -47.882778,
    },
    isp: "Oi Fibra",
  },

  {
    ip: "104.18.12.123",
    location: {
      city: "Paris",
      region: "França",
      postalCode: "75001",
      timezone: "+01:00",
      lat: 48.8566,
      lng: 2.3522,
    },
    isp: "Orange",
  },

  {
    ip: "185.199.108.153",
    location: {
      city: "Lyon",
      region: "França",
      postalCode: "69001",
      timezone: "+01:00",
      lat: 45.764,
      lng: 4.8357,
    },
    isp: "Orange",
  },

  {
    ip: "91.198.174.192",
    location: {
      city: "Bruxelas",
      region: "Bélgica",
      postalCode: "1000",
      timezone: "+01:00",
      lat: 50.8503,
      lng: 4.3517,
    },
    isp: "Proximus",
  },

  {
    ip: "23.45.67.89",
    location: {
      city: "Londres",
      region: "Reino Unido",
      postalCode: "SW1A",
      timezone: "+00:00",
      lat: 51.5074,
      lng: -0.1278,
    },
    isp: "BT",
  },

  {
    ip: "31.13.71.36",
    location: {
      city: "Nova York",
      region: "Estados Unidos",
      postalCode: "10001",
      timezone: "-05:00",
      lat: 40.7128,
      lng: -74.006,
    },
    isp: "Verizon",
  },

  {
    ip: "13.107.42.14",
    location: {
      city: "Toronto",
      region: "Canadá",
      postalCode: "M5H",
      timezone: "-05:00",
      lat: 43.6532,
      lng: -79.3832,
    },
    isp: "Bell",
  },

  {
    ip: "52.96.34.18",
    location: {
      city: "Tóquio",
      region: "Japão",
      postalCode: "100-0001",
      timezone: "+09:00",
      lat: 35.6762,
      lng: 139.6503,
    },
    isp: "NTT",
  },

  {
    ip: "34.120.45.87",
    location: {
      city: "Sydney",
      region: "Austrália",
      postalCode: "2000",
      timezone: "+10:00",
      lat: -33.8688,
      lng: 151.2093,
    },
    isp: "Telstra",
  },

  {
    ip: "45.77.90.12",
    location: {
      city: "Dubai",
      region: "Emirados Árabes Unidos",
      postalCode: "00000",
      timezone: "+04:00",
      lat: 25.2048,
      lng: 55.2708,
    },
    isp: "Etisalat",
  },
];

export function findLocation(query: string): MockLocation | undefined {
  const value = query.trim().toLowerCase();

  return mockData.find((item) => {
    return (
      item.ip.toLowerCase().includes(value) ||
      item.location.city.toLowerCase().includes(value) ||
      item.location.region.toLowerCase().includes(value) ||
      item.isp.toLowerCase().includes(value)
    );
  });
}

export function getRandomLocation(): MockLocation {
  return mockData[Math.floor(Math.random() * mockData.length)];
}