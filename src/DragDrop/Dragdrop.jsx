import React, { useState, useRef } from 'react';
import './Drag.css';

function Dragdrop() {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  function selectFiles() {
    fileInputRef.current.click();
  }

  function onFileSelect(event) {
    const files = event.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }
   function deleteImage(index){
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
   }
   function onDragOver(event) {
      event.preventDefault();
      setIsDragging(true);
      event.dataTransfer.dropEffect = "copy";
   }
   function onDragLeave(event) {
    event.preventDefault();
    setIsDragging(false);
   }
   function onDrop(event) {
      event.preventDefault();
      setIsDragging(false);
      const files = event.dataTransfer.files;
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.split('/')[0] !== 'image') continue;
        if (!images.some((e) => e.name === files[i].name)) {
          setImages((prevImages) => [
            ...prevImages,
            {
              name: files[i].name,
              url: URL.createObjectURL(files[i]),
            },
          ]);
        }
      }
    
   }
  return (
    <div className='p-1 overflow-hidden shadow-[0,0,5px #ffdfdf] text-center bg-black h-screen'>
      <div className='text-center font-bold text-purple-300 text-[30px]'>
        <p>Drag & Drop Image Uploading</p>
      </div>
     
      <div className='h-[350px] w-[80%] rounded-[5px] border-[2px] border-dashed border-purple-600 text-purple-500 flex justify-center mt-10 mx-auto mb-10 items-center ' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
        {isDragging ? (
          <span className='text-white'>Drop Images here</span>
        ) : (
          <>
            Drag & Drop images here or {" "}
            <span role='button' onClick={selectFiles}>
              Browse
            </span>
          </>
        )}
        <input
          name='file'
          type='file'
          multiple
          ref={fileInputRef}
          onChange={onFileSelect}
          className='display'
        />
      </div>
      <div className='container'>
        {images.map((image, index) => (
          <div className='image' key={index}>
            <span className='delete' onClick={() => deleteImage(index)}>&times;</span>
            <img src={image.url} alt={image.name} />
          </div>
        ))}
      </div>
      <button
        type='button' 
        className='border p-[10px] w-[50%] cursor-pointer bg-purple-300 text-white '
      >
        Upload
      </button>
    </div>
  );
}

export default Dragdrop;
