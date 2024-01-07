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

    // navigator web tarayıcısının işlevlerini içeren bi javascript objesi, geolocation apisine bu obje üzerinden erişmek zorundayım
    // geolocation coğrafi konumu enlem ve boylam türünde verilerle döndürür, getCurrentPosition da onun bir fonksiyonu.
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        const sunInfo = SunCalc.getPosition(new Date(), latitude, longitude); //SunCalc bir JS Kütüphanesi. SunCalc.getPosition() fonksiyonu güneşin yükseklik ve azimuth açılarını hesaplar
        //güncel tarih için enlem ve boylamı hesaplar, suncalc'ı zaten bunun için kullandım
        // navigator.geolocation.getCurrentPosition() bu fonk sadece enlem ve boylamı döndürür, tarih icin suncalc kütphansi
        const azimuthInDegrees =
          (sunInfo.azimuth * (180 / Math.PI) + 360) % 360;
        setSunPosition({
          // azimuthu hesapladım ama bunu sadece ekrana yazdırdım, hesaplamada kullanmadım.
          altitude: sunInfo.altitude,
          azimuth: azimuthInDegrees,
        });
      },
      () => {
        setError("Konum bilgisine erişilemiyor"); // hata durumunda döndürülecek mesaj
      }
    );
  }, []);

  const handleSubmit = () => {
    const angle = calculateOptimalAngle(location.latitude, currentMonth);
    setOptimalAngle(angle);
  }; // helpers'dan gelen fonksiyonu kullanarak açıyı döndürüyor(state'i güncelliyor)

  return (
    <div
      className="App bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: "url('/solarpanel.jpg')",
        backgroundSize: "cover", // elementi kaplayacak şekilde resmi büyütür
        backgroundRepeat: "no-repeat", // resmi tekrar etmeyecek
      }}
    >
      <div className="bg-black bg-opacity-50 p-4 rounded">
        {" "}
        {/* opacity: saydamlık , rounded köşeleri yuvarlar*/}
        <div className="baslik-container">
          <h1 className="ana-baslik">
            Güneş Paneli Açısı Hesaplama Uygulaması
          </h1>
        </div>
        {error ? ( // konum bilgisine ulaşıldıysa hesaplamlaarı yapacak, ulaşılamadıysa hata mesajı döndürecek
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
