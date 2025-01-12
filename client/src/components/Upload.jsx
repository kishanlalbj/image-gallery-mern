import { useState } from "react";

const Upload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    onUpload(file);
  };

  return (
    <div className="flex items-center justify-end gap-4">
      <input
        type="file"
        className="btn bg-secondary p-2 text-sm font-semibold rounded-sm "
        onChange={handleFileChange}
      />

      <button
        className="btn bg-secondary text-white p-2 rounded-md"
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
};

export default Upload;
