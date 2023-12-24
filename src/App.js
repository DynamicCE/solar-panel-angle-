import React, { useState, useEffect } from "react";
import SunCalc from "suncalc";
import LocationInfo from "./components/LocationInfo";
import SunPositionInfo from "./components/SunPositionInfo";
import OptimalAngleCalculator from "./components/OptimalAngleCalculator";
import MapDisplay from "./components/MapDisplay";
import { calculateOptimalAngle } from "./components/helpers";
import "./App.css";
import HelpButton from "./components/HelpButton";

function App() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [sunPosition, setSunPosition] = useState({
    altitude: null,
    azimuth: null,
  });
  const [optimalAngle, setOptimalAngle] = useState(null);
  const [error, setError] = useState(null);

  // react dev tools'tan erişmek icin;
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation desteklenmiyor");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        const sunInfo = SunCalc.getPosition(new Date(), latitude, longitude);
        const azimuthInDegrees =
          (sunInfo.azimuth * (180 / Math.PI) + 360) % 360;
        setSunPosition({
          altitude: sunInfo.altitude,
          azimuth: azimuthInDegrees,
        });
      },
      () => {
        setError("Konum bilgisine erişilemiyor");
      }
    );
  }, []);

  const handleSubmit = () => {
    const angle = calculateOptimalAngle(location.latitude, currentMonth);
    setOptimalAngle(angle);
  };

  return (
    <div
      className="App bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: "url('/solarpanel.jpg')",
        backgroundSize: "cover", // Burada arkaplanı ayarlayın
        backgroundRepeat: "no-repeat", // Tekrar etmeyi engelle
      }}
    >
      <div className="bg-black bg-opacity-50 p-4 rounded">
        <h1 className="text-2xl font-bold text-white mb-4">
          Güneş Paneli Açısı Hesaplama Uygulaması
        </h1>
        {error ? (
          <p>Hata: {error}</p>
        ) : (
          <>
            <LocationInfo
              latitude={location.latitude}
              longitude={location.longitude}
            />
            <SunPositionInfo
              altitude={sunPosition.altitude}
              azimuth={sunPosition.azimuth}
            />
            <OptimalAngleCalculator
              latitude={location.latitude}
              currentMonth={currentMonth}
              onCalculate={handleSubmit}
              optimalAngle={optimalAngle}
            />
            <MapDisplay
              latitude={location.latitude}
              longitude={location.longitude}
            />
            <HelpButton />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
