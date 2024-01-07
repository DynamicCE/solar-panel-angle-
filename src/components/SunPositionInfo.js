import { useState } from "react";
function SunPositionInfo({ altitude, azimuth }) {
  const [infoVisible, setInfoVisible] = useState(false);

  // App.jsden geçirdiğim azimutun negatif cıkmaması lazım, o yüzden;
  const azimuthInDegrees = azimuth
    ? ((azimuth * (180 / Math.PI) + 360) % 360).toFixed(2)
    : null;

  return (
    <div className="sun-position-info">
      <h2>Güneş Pozisyonu</h2>
      <p>
        Güneşin Yüksekliği:{" "}
        {altitude // suncalc kütüphanesinden azimut gelebildiyse ve state'e aktarıldıysa kod çalışır , yoksa Yükleniyor... yazar
          ? (altitude * (180 / Math.PI)).toFixed(2) + "°"
          : "Yükleniyor..."}
      </p>
      <p>
        Güneşin Azimut Açısı:{" "}
        {azimuthInDegrees ? azimuthInDegrees + "°" : "Yükleniyor..."}
        {/*azimutInDegrees yoksa bu da dönmeyecek, zaten olmasa yukarıdaki yükseklik de dönmez */}
      </p>
    </div>
  );
}

export default SunPositionInfo;
