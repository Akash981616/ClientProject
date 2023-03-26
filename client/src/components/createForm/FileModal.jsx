import React from "react";
import FileModalInput from "./FileModalInput";
import FilePreview from "./FilePreview";

function FileModal({
  index,
  handleFileChange,
  selectedFiles,
  handleDelete,
  setSelectedFiles,
}) {
  return (
    <div
      key={index}
      className="border-4 border-black flex md:flex-row flex-col  md:justify-start md:items-center md:space-x-5 p-5"
    >
      {selectedFiles?.file && <FilePreview imgObj={selectedFiles.file} />}
      <div className="flex flex-col space-y-2">
        <input
          type="file"
          onChange={(event) => handleFileChange(event, index)}
        />
        {selectedFiles && (
          <p>
            <span className="font-semibold">File Name: </span>
            {selectedFiles.name}
          </p>
        )}
        <FileModalInput
          index={index}
          setSelectedFiles={setSelectedFiles}
          selectedFiles={selectedFiles}
        />
        {handleDelete && (
          <button
            type="button"
            onClick={(event) => handleDelete(event, index)}
            className="btn"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default FileModal;
