import React, { useState } from "react";
import QRCode from "qrcode.react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

// Khai báo custom style cho modal
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    padding: "20px",
    maxWidth: "300px", // Thay đổi kích thước modal tùy ý
    width: "50%",
  },
};

const QRCodeModal = ({handleModalQr, modalIsOpen}) => {



  return (
    <div className={`absolute top-0 left-0 right-0 bottom-0 bg-[#b5b3b354] m-auto rounded-sm ${modalIsOpen? "block": "hidden"}`}>
      <Modal
        isOpen={modalIsOpen}
            onRequestClose={handleModalQr}
            style={customStyles}
            contentLabel="QR Code Modal"
          >
            <div className="">
              <div className="title">
                Quét mã Qr
              </div>
              <button
                className="absolute top-0 right-0 m-2 cursor-pointer"
                onClick={handleModalQr}
              >
                <FontAwesomeIcon icon={faX} className="text-sm " />
              </button>
              <hr></hr>
              <QRCode value="https://www.facebook.com/profile.php?id=100086153393963" className="mx-auto my-3 " />
            </div>
          </Modal>
    </div>
  );
};

export default QRCodeModal;
