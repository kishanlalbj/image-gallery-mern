const Header = () => {
  return (
    <div className="bg-primary h-14 text-white">
      <div className="container flex items-center justify-between h-full">
        <p>Image Gallery</p>

        <div className="flex items-center gap-4">{/* <Upload /> */}</div>
      </div>
    </div>
  );
};

export default Header;
