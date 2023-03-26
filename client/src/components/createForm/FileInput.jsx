import React from "react";
import FileModal from "./FileModal";
import Loader from "../Loader";

const FileInput = ({ selectedFiles, setSelectedFiles, isLoading }) => {
  const handleFileChange = (event, index) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles[index] = {
      ...selectedFiles[index],
      file: event.target.files[0],
    };
    setSelectedFiles(newSelectedFiles);
  };

  const handleDelete = (event, index) => {
    setSelectedFiles(selectedFiles.filter((e, i) => i !== index));
  };

  const handleAddFileInput = () => {
    setSelectedFiles([
      ...selectedFiles,
      {
        file: null,
        height: "",
        width: "",
        quantity: "",
        requirment_type: "",
      },
    ]);
  };

  return (
    <div className="flex flex-col space-y-5">
      <FileModal
        index={0}
        handleFileChange={handleFileChange}
        selectedFiles={selectedFiles[0]}
        setSelectedFiles={setSelectedFiles}
      />
      {selectedFiles.map((file, index) =>
        index !== 0 ? (
          <FileModal
            key={index}
            index={index}
            handleDelete={handleDelete}
            handleFileChange={handleFileChange}
            selectedFiles={selectedFiles[index]}
            setSelectedFiles={setSelectedFiles}
          />
        ) : null
      )}
      <div
        className="flex flex-r
      space-x-5"
      >
        <button type="button" className="btn" onClick={handleAddFileInput}>
          Add more
        </button>

        <button
          type="submit"
          className={`flex items-center justify-center bg-green-700 border border-r-2 text-cyan-50 px-5 py-1 text-center w-32 md-96 ${
            isLoading ? "bg-slate-400" : ""
          } `}
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default FileInput;
