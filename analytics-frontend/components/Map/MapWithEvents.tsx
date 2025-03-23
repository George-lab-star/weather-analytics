"use client";

import { useEffect, useRef } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import axios from "axios";

// Set icons for marker
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Interface for marker
interface MapProps {
  marker: [lat: number, lng: number] | null;
  setMarker: (position: [lat: number, lng: number]) => void;
  setResponse: (response: { response: object }) => void;
}

const MapWithEvents: React.FC<MapProps> = ({
  marker,
  setMarker,
  setResponse,
}) => {
  const map = useMap();
  const provider = new OpenStreetMapProvider();
  const search = new (GeoSearchControl as any)({
    provider,
    style: "bar",
    autoComplete: true,
    showMarker: false,
  });

  // Flag for recuperation of addendum handlers
  const isHandlersAdded = useRef(false);

  // Handler of event of search
  const searchEventHandler = async (e: any) => {
    if (setMarker) {
      const { x, y } = e.location;
      console.log(`${x}, and ${y}`);
      setMarker([y, x]);
      const response = await axios.get(
        `http://localhost:8000/weather/get?lat=${y}&lon=${x}`,
      );
      setResponse(response.data);
    }
  };

  // Handler of event for click on the map
  const setMarkerState = async (e: L.LeafletMouseEvent) => {
    if (e.latlng != null && setMarker) {
      setMarker([e.latlng.lat, e.latlng.lng]);
      const response = await axios.get(
        `http://localhost:8000/weather/get?lat=${e.latlng.lat}&lon=${e.latlng.lng}`,
      );
      setResponse(response.data);
    }
  };

  // Adding control of search and handler only onсe
  if (!isHandlersAdded.current) {
    map.addControl(search);
    map.on("geosearch/showlocation", searchEventHandler);
    map.on("click", setMarkerState);
    isHandlersAdded.current = true; // setting flag to true
  }

  // Remove handlers on unmounting components
  const removeHandlers = () => {
    map.off("geosearch/showlocation", searchEventHandler);
    map.off("click", setMarkerState);
    map.removeControl(search);
  };

  useEffect(() => {
    return () => {
      removeHandlers();
    };
  }, [map]);

  return marker === null ? null : (
    <Marker position={{ lat: marker[0], lng: marker[1] }}>
      <Popup>Selected location</Popup>
    </Marker>
  );
};

export default MapWithEvents;
