import React, { useState, useRef, useEffect } from "react";

function HelpButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Ekranın dışına tıklandığında modalı kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    // Eğer modal açıksa, bu event listener'ı ekleyin
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <>
      <button onClick={toggleModal} className="help-button">
        Yardım
      </button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <span className="close" onClick={toggleModal}>
              &times;
            </span>
            <h2>Yardım & SSS</h2>
            <h3>Konum Bilgileri</h3>
            <p>
              Enlem ve Boylama göre güneşin bölgenizdeki yüksekliği ve azimuth
              açısı hesaplanır
            </p>
            <h3>Güneş Pozisyonu, Yükseklik ve Azimuth Açıları</h3>

            <p>
              Güneşin pozisyonu güneşin anlık pozisyonunu gösterir, güneş henüz
              doğduğu an yükseklik açısı 0'dır. Güneşin tam tepede olduğu öğlen
              vakti açı 90 derece olur ve sonrasında tekrar azalarak negatife
              döner.Bu açının negatif olması güneşin henüz doğmadığını gösterir,
              açı sıfıra yaklaştığı zaman güneşin doğmasına kalan sürenin de
              azaldığını anlarız. Güneş tekrar doğar ve açı sıfırlanır, güneş
              yükseldikçe açı da büyür ve tepedeyken 90'ı görür. Bundan sonra
              güneş batarken açı tekrar azalır ve bu döngü devam eder.
            </p>

            <h3>Optimal Açı Hesaplama</h3>
            <p>
              Optimal açı güneş panelinden alınacak verimin en yüksek olduğu
              açıdır, Seçtiğiniz zaman frekansına göre panelin durması gereken
              optimal açıyı hesaplatırsınız.Bu optimal açıya göre panelinizi
              yerleştirmeniz gerekir, panel altında ayarlanabilir destek/takoz
              vb kullanarak frekans değişimlerinde de açı değşitirebilrisiniz.
            </p>
            <h3>Panel Yönünü Belirlerken</h3>
            <p>panel yönü güneye doğru olmalı,</p>
          </div>
        </div>
      )}
    </>
  );
}
export default HelpButton;
