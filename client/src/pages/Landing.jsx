import { useEffect, useState } from "react";
import LoginCard from "../components/LoginCard";
import RegistrationCard from "../components/RegistrationCard";
import { useNavigate } from "react-router-dom";
import { API } from "../utils/config";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import usePrivateApi from "../hooks/usePrivateApi";

const Landing = () => {
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const privateAPI = usePrivateApi();

  const handleSignIn = async (creds) => {
    try {
      const res = await API.post("/auth/login", creds);
      console.log(res.data);
      if (res.data.success) {
        setUser({
          accessToken: res.data.message,
          user: jwtDecode(res.data.message)
        });
        navigate("/home");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleSignUp = async (form) => {
    try {
      const res = await API.post("/auth/register", form);

      if (res.data.success) {
        alert("Registered Successfully");
        setShowRegister(false);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await privateAPI.get("/auth/me");
        if (res.data.success) {
          navigate("/home");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMe();
  }, [navigate, privateAPI]);

  return (
    <div className="grid md:grid-cols-2 sm:grid-cols-1 h-screen">
      <div className="bg-gradient-to-r from-stone-500 to-stone-700 sm:hidden md:block">
        <div className="flex items-center justify-center h-full  text-white">
          <div>
            <h1 className="text-6xl font-extrabold">Image Gallery</h1>
            <br />
            <p>Store and Organize your pictures</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center h-full">
        {showRegister ? (
          <RegistrationCard onSignUp={handleSignUp} />
        ) : (
          <LoginCard onSignIn={handleSignIn} />
        )}

        {showRegister ? (
          <p className="mt-2">
            Already have an account ?{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => setShowRegister((prev) => !prev)}
            >
              Signin here
            </span>
          </p>
        ) : (
          <p className="mt-2">
            Don&apos;t have an account ?{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => setShowRegister((prev) => !prev)}
            >
              Signup here
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Landing;
