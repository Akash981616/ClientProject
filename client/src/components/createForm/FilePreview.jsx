import React, { useEffect, useRef } from "react";

function FilePreview({ imgObj }) {
  const ref = useRef();

  useEffect(() => {
    const file = imgObj;
    if (file) {
      ref.current.src = URL.createObjectURL(file);
    }
  }, [imgObj]);

  return (
    <div className="relative container border-2 border-green-600 m-2 sm:w-52 sm:h-32 w-42">
      <img src="" ref={ref} className="w-full h-full" alt={imgObj.name} />
    </div>
  );
}

export default FilePreview;
