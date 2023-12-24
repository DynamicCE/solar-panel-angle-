import { useState } from "react";
function SunPositionInfo({ altitude, azimuth }) {
  const [infoVisible, setInfoVisible] = useState(false);

  // azimutun negatif cıkmaması lazım, o yüzden;
  const azimuthInDegrees = azimuth
    ? ((azimuth * (180 / Math.PI) + 360) % 360).toFixed(2)
    : null;

  return (
    <div className="sun-position-info">
      <h2 onClick={() => setInfoVisible(!infoVisible)}>Güneş Pozisyonu</h2>
      <p>
        Güneşin Yüksekliği:{" "}
        {altitude
          ? (altitude * (180 / Math.PI)).toFixed(2) + "°"
          : "Yükleniyor..."}
      </p>
      <p>
        Güneşin Azimut Açısı:{" "}
        {azimuthInDegrees ? azimuthInDegrees + "°" : "Yükleniyor..."}
      </p>
    </div>
  );
}

export default SunPositionInfo;
