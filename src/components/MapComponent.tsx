import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";


const customIcon = new L.Icon({
  iconUrl: "/icon-location.svg",
  iconRetinaUrl: "/icon-location.svg",
  iconSize: [46, 56], 
  iconAnchor: [23, 56],
  popupAnchor: [0, -56],  
});

function ChangeMapCenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
}

interface MapProps {
  lat?: number;
  lng?: number;
}

export default function MapComponent({ lat, lng }: MapProps) {
  
  const position: [number, number] = [lat ?? 40.650002, lng ?? -73.949997];

  return (
    <MapContainer
      center={position}
      zoom={13}
      zoomControl={false}
      className="w-full h-full min-h-[calc(100vh-280px)] z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={customIcon} />
      <ChangeMapCenter center={position} />
    </MapContainer>
  );
}