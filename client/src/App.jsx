import { useEffect, useState } from "react";
import "./App.css";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import { API_URL } from "./utils/config";
import Upload from "./components/Upload";

// const IMAGES = [
//   {
//     id: 1,
//     url: "https://picsum.photos/200/200"
//   },
//   {
//     id: 2,
//     url: "https://picsum.photos/200/201"
//   },
//   {
//     id: 3,
//     url: "https://picsum.photos/200/202"
//   },
//   {
//     id: 4,
//     url: "https://picsum.photos/200/203"
//   },
//   {
//     id: 5,
//     url: "https://picsum.photos/200/204"
//   }
// ];

function App() {
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);
  // const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
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

    fetchImages();
  }, []);

  // const handleFileChange = (e) => {
  //   e.preventDefault();
  //   setFile(e.target.files[0]);
  // };

  const handleUpload = async (file) => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("file", file, file.name);

      const resp = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData
      });

      const data = await resp.json();

      if (resp.status === 201) {
        setImages((prev) => [data.result, ...prev]);
      }
    } catch (error) {
      setError("Somthing went wrong..");
    } finally {
      setLoading(null);
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
    <>
      <Header loading={loading} />

      <div className="container mt-10">
        <Upload onUpload={handleUpload} />
        <Gallery images={images} />
      </div>

      {error && <p>{error}</p>}
    </>
  );
}

export default App;
