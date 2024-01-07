import React, { useState } from "react";
import { calculateOptimalAngle, determineSeason } from "./helpers";

function OptimalAngleCalculator({ latitude, currentMonth }) {
  const [calculatedAngle, setCalculatedAngle] = useState(null);
  const [animate, setAnimate] = useState(false); // Animasyon kontrolü için state
  const season = determineSeason(latitude, currentMonth);
  const [selectedOption, setSelectedOption] = useState("mevsim");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = () => {
    setAnimate(false); // Animasyonu sıfırla
    let angle;
    if (selectedOption === "yillik") {
      angle = latitude * 0.9 - 2.5;
    } else {
      angle = calculateOptimalAngle(latitude, currentMonth);
    }
    setCalculatedAngle(angle);
    setAnimate(true); // Animasyonu başlat
    setTimeout(() => setAnimate(false), 2000); // 2 saniye sonra animasyonu durdur
  };

  return (
    <div className="optimal-angle-calculator">
      <h2>Optimal Açı Hesaplama</h2>
      <p>Mevcut Mevsim: {season}</p>{" "}
      <select value={selectedOption} onChange={handleOptionChange}>
        {/* Khesaplama tipini seçmek için   */}
        <option value="mevsim">Mevsim Bazlı</option>
        <option value="yillik">Yıllık Sabit</option>
      </select>
      <button onClick={handleSubmit}>Açıyı Hesapla</button>{" "}
      {calculatedAngle !== null && (
        <div className="hesaplama-container">
          {/* Eğer hesaplanmış bir açı varsa, bunu göster */}
          <p
            className={`hesaplama  ${
              animate ? "popUpAnimation colorShiftAnimation" : ""
            }`}
            style={{ fontSize: "23px" }}
          >
            Optimal Panel Açısı: {calculatedAngle.toFixed(2)}°{" "}
            {/* Hesaplanan açıyı göster */}
          </p>
        </div>
      )}
    </div>
  );
}

export default OptimalAngleCalculator;
