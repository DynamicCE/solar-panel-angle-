function LocationInfo({ latitude, longitude }) {
  return (
    <div className="location-info">
      <h2>Konum Bilgileri</h2>
      <p>Enlem: {latitude ? latitude.toFixed(3) : "Yükleniyor..."}</p>
      <p>Boylam: {longitude ? longitude.toFixed(3) : "Yükleniyor..."}</p>
    </div>
  );
}

export default LocationInfo;
