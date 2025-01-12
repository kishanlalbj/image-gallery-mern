const Image = ({ src, className, onClick }) => {
  return (
    <>
      <img
        className={`cursor-pointer ${className}`}
        src={src}
        alt="image"
        onClick={onClick}
        loading="lazy"
      />
    </>
  );
};

export default Image;
