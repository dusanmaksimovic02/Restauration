import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "./MapComponent.css";

const position: LatLngTuple = [43.32102, 21.89476];

const MapComponent: React.FC = () => {
  return (
    <MapContainer
      center={position}
      zoom={20}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100%", color: "black" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          <div style={{ color: "black" }}>Lokacija Restauration</div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
