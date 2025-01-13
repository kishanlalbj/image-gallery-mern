import { useEffect, useState } from "react";
import Header from "../components/Header";
import Upload from "../components/Upload";
import Gallery from "../components/Gallery";
import usePrivateApi from "../hooks/usePrivateApi";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { setUser } = useAuth();

  const privateApi = usePrivateApi();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const res = await privateApi.get(`/images`);

        if (res.status === 200) {
          setImages(res.data);
        } else {
          setError("Something went wrong");
        }
      } catch (error) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [privateApi]);

  const handleUpload = async (file) => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("file", file, file.name);

      const resp = await privateApi.post(`/upload`, formData);

      if (resp.status === 201) {
        setImages((prev) => [resp.data.result, ...prev]);
      }
    } catch (error) {
      setError("Somthing went wrong..");
    } finally {
      setLoading(null);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await privateApi.post("/auth/logout");

      if (res.data.success) {
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }, [error]);

  return (
    <div>
      <Header loading={loading} onLogout={handleLogout} />

      <div className="container mt-10">
        <Upload onUpload={handleUpload} />
        <Gallery images={images} loading={loading} />
      </div>

      {error && <p> {error}</p>}
    </div>
  );
};

export default Home;
