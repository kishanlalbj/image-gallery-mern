import Image from "./Image";

const GalleryCard = ({ image, ...rest }) => {
  return (
    <div className="gallery-item" {...rest} key={image._id}>
      <Image src={image}></Image>
    </div>
  );
};

export default GalleryCard;
