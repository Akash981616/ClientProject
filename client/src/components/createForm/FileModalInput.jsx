import React from "react";

function FileModalInput({ index, selectedFiles, setSelectedFiles }) {
  const handleChange = (ev) => {
    const { id, value } = ev.target;
    selectedFiles[id] = value;
    setSelectedFiles((prev) => {
      return [...prev];
    });
  };

  return (
    <>
      <label className="font-bold" htmlFor="width">
        Width
      </label>
      <input
        type="text"
        id="width"
        onChange={handleChange}
        value={selectedFiles?.width}
        required
      />

      <label className="font-bold" htmlFor="height">
        Height
      </label>
      <input
        type="text"
        id="height"
        onChange={handleChange}
        value={selectedFiles?.height}
        required
      />

      <label className="font-bold" htmlFor="quantity">
        Quantity
      </label>
      <input
        type="text"
        id="quantity"
        onChange={handleChange}
        value={selectedFiles?.quantity}
        required
      />

      <label className="font-bold" htmlFor="requirment_type">
        Type of Requirement
      </label>
      <input
        type="text"
        id="requirment_type"
        onChange={handleChange}
        value={selectedFiles?.requirment_type}
        required
      />
    </>
  );
}

export default FileModalInput;
