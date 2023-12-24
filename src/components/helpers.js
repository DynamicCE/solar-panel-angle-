export const determineSeason = (latitude, month) => {
  const isNorthernHemisphere = latitude > 0;
  if (month >= 2 && month <= 4) {
    return isNorthernHemisphere ? "İlkbahar" : "Sonbahar";
  } else if (month >= 5 && month <= 7) {
    return isNorthernHemisphere ? "Yaz" : "Kış";
  } else if (month >= 8 && month <= 10) {
    return isNorthernHemisphere ? "Sonbahar" : "İlkbahar";
  } else {
    return isNorthernHemisphere ? "Kış" : "Yaz";
  }
};

// Mevsime göre optimum açıyı hesaplayan fonksiyon
export const calculateOptimalAngle = (latitude, month) => {
  const season = determineSeason(latitude, month);

  if (season === "İlkbahar" || season === "Sonbahar") {
    return latitude - 2.5;
  } else if (season === "Yaz") {
    return latitude * 0.9 - 23.5;
  } else if (season === "Kış") {
    return latitude * 0.9 + 29;
  } else {
    return latitude; // Eğer mevsim belirlenemezse varsayılan değer
  }
};

// Aşağıdaki fonksiyonlar şu an kullanılmıyor ama dursun
/*
const calculateMonthlyOptimalAngle = (latitude, month) => {
  if (month < 3 || month > 8) {
    return (latitude * 0.9) + 29;
  } else {
    return (latitude * 0.9) - 23.5;
  }
};

const calculateQuarterlyOptimalAngle = (latitude, month) => {
  if (month < 3 or month > 8) {
    return latitude - 2.5;
  } else {
    return month >= 3 && month <= 5 ? (latitude * 0.9) - 23.5 : (latitude * 0.9) + 29;
  }
};

const calculateYearlyOptimalAngle = (latitude) => {
  return (latitude * 0.9) - 2.5;
};
*/
