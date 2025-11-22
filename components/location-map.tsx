"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in React Leaflet
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface LocationMapProps {
  lat: number;
  lon: number;
  city?: string;
  region?: string;
  country?: string;
}

export function LocationMap({ lat, lon, city, region, country }: LocationMapProps) {
  const position: [number, number] = [lat, lon];
  const locationName = [city, region, country].filter(Boolean).join(", ") || "Location";

  useEffect(() => {
    // Fix for SSR
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  return (
    <MapContainer
      center={position}
      zoom={10}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", zIndex: 0 }}
      className="rounded-b-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={icon}>
        <Popup>
          <div className="text-sm font-medium">
            {locationName}
            <br />
            <span className="text-xs text-muted-foreground">
              {lat.toFixed(4)}, {lon.toFixed(4)}
            </span>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
