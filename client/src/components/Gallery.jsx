import { useEffect, useState } from "react";
import GalleryCard from "./GalleryCard";
import Image from "./Image";

const Gallery = ({ images, loading }) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [showFull, setShowFull] = useState(false);

  const handleOpenImage = (idx) => {
    setCurrentIndex(idx);
    setShowFull(true);
  };

  const handleCloseFull = (e) => {
    e.stopPropagation();
    setShowFull(false);
    setCurrentIndex(null);
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
  };

  const renderSkeletons = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
      <div
        key={e}
        className="bg-zinc-400 animate-pulse min-w-full h-[100px]"
      ></div>
    ));
  };

  const renderImages = () => {
    if (loading) return renderSkeletons();

    if (images?.length === 0) return <p>No Images</p>;

    return images.map((img, index) => {
      return (
        <GalleryCard
          image={img.url}
          key={img._id}
          onClick={() => handleOpenImage(index)}
        ></GalleryCard>
      );
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowFull(false);
      }

      if (e.key === "ArrowLeft") {
        if (currentIndex !== 0) {
          setCurrentIndex((prev) => prev - 1);
        }
      } else if (e.key === "ArrowRight") {
        if (currentIndex + 1 !== images.length) {
          setCurrentIndex((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, images.length]);

  return (
    <>
      <section>
        <div className="gallery">{renderImages()}</div>

        {showFull && (
          <div
            className="fixed top-0 left-0 bg-[rgba(0,0,0,1)] w-full h-full overflow-y-scroll z-10"
            onClick={handleCloseFull}
          >
            <div className="w-full absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <div className="flex flex-col items-center justify-center gap-12">
                <Image
                  src={images[currentIndex].url}
                  className="w-2/5 shadow-md border-2 border-transparent rounded-md"
                  onClick={handleImageClick}
                ></Image>

                <p className="text-white">
                  {currentIndex + 1} / {images.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Gallery;
