import Image from "./Image";

const GalleryCard = ({ image, ...rest }) => {
  return (
    <div className="gallery-item" {...rest}>
      <Image src={image}></Image>
    </div>
  );
};

export default GalleryCard;
