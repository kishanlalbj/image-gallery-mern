import useAuth from "../hooks/useAuth";

const Header = ({ onLogout }) => {
  const { user } = useAuth();

  return (
    <div className="bg-primary h-14 text-white shadow-md">
      <div className="container flex items-center justify-between h-full">
        <a href="#">Image Gallery</a>

        <div className="flex items-center gap-4">
          {user?.accessToken && (
            <ul className="flex items-center gap-4">
              <li>{user?.user?.name}</li>
              <li>
                <button onClick={onLogout}>Logout</button>{" "}
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
