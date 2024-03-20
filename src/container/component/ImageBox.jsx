import { useLayoutEffect, useRef, useState } from "react";
import {
  faUpload,
  faFloppyDisk,
  faXmark,
  faAngleLeft,
  faAngleRight,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateString } from "../../app/string";
export const ImagePicker = ({
  folder,
  multiply = false,
  images,
  setImages,
}) => {
  const [previewImage, setPreviewImage] = useState([]);
  const [currentPreview, setCurrentPreview] = useState(0);
  const pickerRef = useRef(null);
  const handleClick = () => {
    if (pickerRef && images.length == 0) {
      pickerRef.current.click();
    }
  };
  const handlePreviewFullImage = (image, index) => {
    setPreviewImage(image);
    setCurrentPreview(index);
  };
  useLayoutEffect(() => {
    if (previewImage.length !== 0) {
      setPreviewImage(images);
    }
  }, [images]);

  return (
    <div
      onClick={handleClick}
      className="w-full min-h-36 border border-gray-200 rounded flex justify-center items-center cursor-pointer px-2 py-4"
    >
      {images.length == 0 ? (
        <div className="flex flex-col justify-center h-full items-center w-1/2 mx-auto">
          <FontAwesomeIcon icon={faUpload} size="xl" />
          <p className="text-sm font-semibold my-5">Chọn ảnh để upload</p>
          <input
            multiple={multiply}
            onChange={(e) => {
              setImages(
                multiply ? [...images, ...e.target.files] : [e.target.files[0]]
              );
            }}
            ref={pickerRef}
            className="hidden"
            type="file"
            accept="image/*"
          />
        </div>
      ) : (
        <div
          className={`${
            multiply
              ? "w-full flex justify-start items-center flex-wrap gap-1 pl-3"
              : "w-1/2 mx-auto"
          } h-full`}
        >
          {images?.map((im, index) => {
            return (
              <img
                key={index.toString()}
                onClick={() => {
                  handlePreviewFullImage(images);
                }}
                src={URL.createObjectURL(im)}
                alt="preview-avatar"
                style={{ width: multiply ? "48%" : "100%" }}
                className="object-contain h-full rounded"
              />
            );
          })}
          <input
            multiple={multiply}
            onChange={(e) => {
              setImages(
                multiply ? [...images, ...e.target.files] : [e.target.files[0]]
              );
            }}
            ref={pickerRef}
            className="hidden"
            type="file"
            accept="image/*"
          />
        </div>
      )}
      <PreviewImage
        previewImages={previewImage}
        setPreviewImages={setPreviewImage}
        setImages={setImages}
        current={currentPreview}
        inputRef={pickerRef}
        multiply={multiply}
      />
    </div>
  );
};
export const ImageBox = (props) => {};

export const PreviewImage = ({
  previewImages,
  setPreviewImages,
  setImages,
  currentFrom = 0,
  inputRef,
  multiply = true,
  canAdd = true,
}) => {
  let min = 0;
  const [current, setCurrent] = useState(currentFrom);

  const handleNext = () => {
    setCurrent(current + 1 < previewImages.length ? current + 1 : current);
  };
  const handlePrev = () => {
    setCurrent(current - 1 >= min ? current - 1 : current);
  };
  const handleClose = () => {
    setPreviewImages([]);
  };
  const handleSaveImage = (image) => {
    const aElement = document.createElement("a");
    aElement.href = URL.createObjectURL(image);
    aElement.download = generateString(12) + ".png";
    document.body.appendChild(aElement);
    aElement.click();
    document.body.removeChild(aElement);
  };

  const handleRemoveImage = (image) => {
    let newArr = [...previewImages];
    newArr.splice(previewImages.indexOf(image), 1);
    setImages(newArr);
    setPreviewImages(newArr);
    setCurrent(0);
  };
  const handleAddImage = () => {
    if (multiply) {
      inputRef.current.click();
    }
  };
  return (
    <>
      {previewImages.length != 0 && (
        <div
          className="w-screen h-screen fixed z-10 top-0 flex justify-center items-center px-2 md:px-0"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <div className="fixed top-6 w-full flex justify-between items-center px-10">
            <div className="w-1/3 flex justify-start items-center">
              <button
                onClick={() => {
                  handleSaveImage(previewImages[current]);
                }}
                type="button"
                className="outline-none shadow-none bg-transparent"
                title="save this image"
              >
                <FontAwesomeIcon
                  icon={faFloppyDisk}
                  size="2xl"
                  color="rgba(255,255,255,1)"
                />
              </button>
            </div>
            <div className="w-1/3 flex justify-center items-center">
              <p className="text-white">
                {current + 1} of {previewImages.length}
              </p>
            </div>
            <div className="w-1/3 flex justify-end items-center gap-5">
              {canAdd && (
                <button
                  onClick={handleAddImage}
                  type="button"
                  className="outline-none shadow-none bg-transparent"
                  title="close"
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    size="2xl"
                    color="rgba(255,255,255,1)"
                  />
                </button>
              )}
              {canAdd && (
                <button
                  onClick={() => {
                    handleRemoveImage(previewImages[current]);
                  }}
                  type="button"
                  className="outline-none shadow-none bg-transparent"
                  title="close"
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    size="xl"
                    color="rgba(255,255,255,1)"
                  />
                </button>
              )}

              <button
                onClick={handleClose}
                type="button"
                className="outline-none shadow-none bg-transparent"
                title="close"
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  size="2xl"
                  color="rgba(255,255,255,1)"
                />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center px-10">
            <button
              onClick={handlePrev}
              type="button"
              className="outline-none shadow-none bg-transparent"
              title="close"
            >
              {current - 1 >= min && (
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  size="2xl"
                  color="rgba(255,255,255,1)"
                />
              )}
            </button>
            <div className="w-100 md:w-1/2 lg:1/2 xl:1/2 h-auto rounded">
              <img
                className="w-full object-cover rounded"
                src={URL.createObjectURL(previewImages[current])}
              />
            </div>

            <button
              onClick={handleNext}
              type="button"
              className="outline-none shadow-none bg-transparent"
              title="close"
            >
              {current + 1 < previewImages.length && (
                <FontAwesomeIcon
                  icon={faAngleRight}
                  size="2xl"
                  color="rgba(255,255,255,1)"
                />
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
