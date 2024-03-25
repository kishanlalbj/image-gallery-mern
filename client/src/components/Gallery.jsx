import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";

const Gallery = ({ images, loading }) => {
  const [isFullView, setFullView] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleImageClick = (index) => {
    setFullView(true);

    setSelectedImageIndex(index);
  };

  const handleToggleFullView = () => {
    setFullView((prev) => !prev);
  };

  const handlePrevious = (e) => {
    e.stopPropagation();
    if (selectedImageIndex === 0) return;

    if (selectedImageIndex > 0) {
      setSelectedImageIndex((prev) => prev - 1);
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (selectedImageIndex === images.length - 1) return;

    if (selectedImageIndex < images.length - 1) {
      setSelectedImageIndex((prev) => prev + 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.which === 37) handlePrevious();
    else if (e.which === 39) handleNext();
  };

  const renderImages = () => {
    if (images?.length === 0) return <p>No Images</p>;

    return images.map((img, index) => (
      <div
        className="gallery-img"
        key={img._id}
        onClick={() => handleImageClick(index)}
      >
        <img
          // src={"https://picsum.photos/800/600?grayscale"}
          src={img.imageUrl}
          alt={img.name}
          width={"100%"}
        ></img>

        <div className="img-overlay"></div>
      </div>
    ));
  };

  const renderSkeletons = () => {
    return [1, 2, 3, 4, 5, 6].map((item, index) => (
      <div key={item + index} className="loading-skeleton"></div>
    ));
  };

  return (
    <>
      <section className="gallery-section">
        <div className="gallery-container">
          {!loading ? renderImages() : renderSkeletons()}
        </div>

        {isFullView && (
          <div className="full-view-container" onClick={handleToggleFullView}>
            <div className="full-view-img">
              <AiOutlineArrowLeft
                style={{
                  cursor: "pointer",
                  visibility: selectedImageIndex !== 0 ? "visible" : "hidden"
                }}
                size={"48px"}
                onKeyDown={handleKeyDown}
                onClick={handlePrevious}
              />

              <img
                src={images[selectedImageIndex]?.imageUrl}
                alt={images[selectedImageIndex]?.name}
                width={"50%"}
              ></img>

              <AiOutlineArrowRight
                style={{
                  cursor: "pointer",
                  visibility:
                    selectedImageIndex !== images.length - 1
                      ? "visible"
                      : "hidden"
                }}
                size={"48px"}
                onKeyDown={handleKeyDown}
                onClick={handleNext}
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Gallery;
