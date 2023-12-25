import React, { useState } from "react";
import { calculateOptimalAngle, determineSeason } from "./helpers";

function OptimalAngleCalculator({ latitude, currentMonth }) {
  const [calculatedAngle, setCalculatedAngle] = useState(null);
  const season = determineSeason(latitude, currentMonth);
  const [selectedOption, setSelectedOption] = useState("mevsim");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = () => {
    let angle;
    if (selectedOption === "yillik") {
      // Yıllık hesaplama için enlemi doğrudan kullandım
      angle = latitude * 0.9 - 2.5;
    } else {
      // Mevsim bazlı hesaplama
      angle = calculateOptimalAngle(latitude, currentMonth);
    }
    setCalculatedAngle(angle);
  };

  return (
    <div className="optimal-angle-calculator">
      <h2>Optimal Açı Hesaplama</h2>
      <p>Mevcut Mevsim: {season}</p>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="mevsim">Mevsim Bazlı</option>
        <option value="yillik">Yıllık Sabit</option>
      </select>
      <button onClick={handleSubmit}>Açıyı Hesapla</button>
      {calculatedAngle !== null && (
        <p className="hesaplama">
          Optimal Panel Açısı: {calculatedAngle.toFixed(2)}°
        </p>
      )}
    </div>
  );
}

export default OptimalAngleCalculator;
