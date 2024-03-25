const UploadButton = ({ loading, file, onChange, onUpload }) => {
  return (
    <>
      <section>
        <div className="upload-container">
          <button onClick={onUpload} disabled={loading}>
            {loading ? "Loading" : "Upload"}
          </button>
          <input
            type="file"
            accept=".jpg"
            id="actual-btn"
            onChange={onChange}
            multiple={false}
            hidden
          ></input>

          <label id="file-upload-btn" htmlFor="actual-btn">
            Browse files
          </label>

          <p color="white">{file && file.name}</p>
        </div>
      </section>
    </>
  );
};

export default UploadButton;
