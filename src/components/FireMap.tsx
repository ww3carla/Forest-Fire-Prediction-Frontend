import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, useMap } from "react-leaflet";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";

interface FireMapProps {
  lat: number;
  lon: number;
  riskPercentage: number;
  city: string;
}

const MapUpdater = ({ lat, lon }: { lat: number; lon: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon], 10, { animate: true });
  }, [lat, lon, map]);
  return null;
};

const PulsingCircle = ({ lat, lon }: { lat: number; lon: number }) => {
  return (
    <>
      <CircleMarker center={[lat, lon]} radius={30} pathOptions={{ color: "hsl(0, 75%, 55%)", fillColor: "hsl(0, 75%, 55%)", fillOpacity: 0.15, weight: 1 }} />
      <CircleMarker center={[lat, lon]} radius={15} pathOptions={{ color: "hsl(0, 75%, 55%)", fillColor: "hsl(0, 75%, 55%)", fillOpacity: 0.3, weight: 2 }} />
      <CircleMarker center={[lat, lon]} radius={6} pathOptions={{ color: "hsl(0, 75%, 65%)", fillColor: "hsl(0, 75%, 55%)", fillOpacity: 0.8, weight: 2 }} />
    </>
  );
};

const FireMap = ({ lat, lon, riskPercentage, city }: FireMapProps) => {
  const isHigh = riskPercentage >= 70;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="glass-card rounded-2xl overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Satellite View — {city}
        </h3>
        {isHigh && (
          <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded-md animate-pulse">
            ● HIGH RISK ZONE
          </span>
        )}
      </div>
      <div className="h-[300px]">
        <MapContainer
          center={[lat, lon]}
          zoom={10}
          className="h-full w-full"
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          <MapUpdater lat={lat} lon={lon} />
          {isHigh && <PulsingCircle lat={lat} lon={lon} />}
          {!isHigh && (
            <CircleMarker center={[lat, lon]} radius={8} pathOptions={{ color: "hsl(32, 95%, 55%)", fillColor: "hsl(32, 95%, 55%)", fillOpacity: 0.5, weight: 2 }} />
          )}
        </MapContainer>
      </div>
    </motion.div>
  );
};

export default FireMap;
