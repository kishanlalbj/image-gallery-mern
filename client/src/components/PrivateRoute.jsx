import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  console.log({ user });

  if (user?.accessToken) return children;

  return <Navigate to={"/"} />;
};

export default PrivateRoute;
