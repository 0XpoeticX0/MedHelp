import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosClient from "../../api/axiosClient";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import { LocateFixed } from "lucide-react";
import { Icon } from "leaflet";

const NavigationPage = () => {
  const [help, setHelp] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [route, setRoute] = useState([]);
  const { helpId } = useParams();

  // Fetch help data
  useEffect(() => {
    const fetchHelpById = async () => {
      try {
        const response = await axiosClient.get(`/help/${helpId}`);
        setHelp(response.data);
      } catch (error) {
        console.error("Error fetching help:", error);
      }
    };

    fetchHelpById();
  }, [helpId]);

  // Get volunteer's current location
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  // Fetch route when both locations are available
  useEffect(() => {
    const fetchRoute = async () => {
      if (!userLocation || !help) return;

      try {
        const response = await axios.post(
          "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
          {
            coordinates: [
              [userLocation.lng, userLocation.lat],
              [help.longitude, help.latitude],
            ],
          },
          {
            headers: {
              Authorization: import.meta.env.VITE_GEOLOCATION_API_KEY,
              "Content-Type": "application/json",
            },
          }
        );

        const coords = response.data.features[0].geometry.coordinates.map(
          ([lng, lat]) => [lat, lng]
        );
        setRoute(coords);
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    fetchRoute();
  }, [userLocation, help]);

  if (!help || !userLocation) return <p>Loading...</p>;

  if (help.status === "completed") {
    return (
      <div className="text-3xl text-green-500 font-semibold flex justify-center items-center h-screen">
        This help request has been completed.
      </div>
    );
  }

  const volunteerIcon = new Icon({
    iconUrl: "/map-pin-house.png",
    iconSize: [35, 35],
  });

  const patientIcon = new Icon({
    iconUrl: "/location-pin.png",
    iconSize: [35, 35],
  });

  return (
    <div className="w-full h-screen">
      <MapContainer
        center={userLocation}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        <Marker position={userLocation} icon={volunteerIcon}>
          <Popup>
            <h2>Volunteer</h2>
          </Popup>
        </Marker>
        <Marker
          position={{ lat: help.latitude, lng: help.longitude }}
          icon={patientIcon}
        >
          <Popup>
            <h2>Patient</h2>
          </Popup>
        </Marker>
        {route.length > 0 && <Polyline positions={route} color="blue" />}
      </MapContainer>
    </div>
  );
};

export default NavigationPage;
