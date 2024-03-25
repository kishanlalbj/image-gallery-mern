import { useState } from "react";
import "./App.css";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import UploadButton from "./components/UploadButton";
import { useEffect } from "react";
import { API_URL } from "./utils/config";

function App() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [uploadLoading, setUploadLoading] = useState(false);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/images`);
      const data = await res.json();

      if (res.status === 200) {
        setImages(data);
      } else {
        setError("Something went wrong");
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      setUploadLoading(true);
      const formData = new FormData();

      formData.append("file", file, file.name);

      const resp = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData
      });

      if (resp.status === 201) {
        setUploadLoading(false);

        fetchImages();
      }
    } catch (error) {
      setUploadLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="app">
        <div className="container">
          <UploadButton
            loading={uploadLoading}
            file={file}
            onChange={handleFileChange}
            onUpload={handleUpload}
          />

          <Gallery loading={loading} images={images} />

          {error && <p>{error}</p>}
        </div>
      </div>
    </>
  );
}

export default App;
