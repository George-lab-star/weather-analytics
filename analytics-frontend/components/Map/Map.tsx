"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../styles/map.css";
import MapWithEvents from "./MapWithEvents";
import { useState } from "react";

const Map: React.FC = () => {
  const [marker, setMarker] = useState<[lat: number, lng: number] | null>(null);

  const [response, setResponse] = useState<{ response: object } | null>(null);

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet-geosearch@3.0.0/dist/geosearch.css"
      />
      <MapContainer
        className="map"
        center={[0, 0]}
        zoom={2}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapWithEvents
          marker={marker}
          setMarker={setMarker}
          setResponse={setResponse}
        />
      </MapContainer>
      <div className="">{response && <p>{JSON.stringify(response)}</p>}</div>
    </div>
  );
};

export default Map;
