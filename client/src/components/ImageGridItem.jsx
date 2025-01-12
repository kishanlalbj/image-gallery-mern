function getSpanEstimate(size) {
  if (size > 250) {
    return 3;
  }

  return 1;
}

const ImageGridItem = ({ image, imageUrl, alt }) => {
  console.log("--", image.height);

  const style = {
    width: "100%",
    gridColumnEnd: `span ${getSpanEstimate(image.width)}`,
    gridRowEnd: `span ${getSpanEstimate(image.height)}`
  };

  return <img style={style} src={imageUrl} alt={alt} />;
};

export default ImageGridItem;
