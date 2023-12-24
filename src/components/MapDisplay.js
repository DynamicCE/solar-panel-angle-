import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function MapDisplay({ latitude, longitude }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (latitude && longitude) {
      const map = L.map(mapRef.current).setView([latitude, longitude], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup("Buradasınız.")
        .openPopup();
    }
  }, [latitude, longitude]);

  return <div ref={mapRef} style={{ height: "400px", width: "100%" }}></div>;
}

export default MapDisplay;
