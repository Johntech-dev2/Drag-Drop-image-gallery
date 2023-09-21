import React, { useState, useRef } from 'react';
import './Drag.css';



function Dragdrop() {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  function selectFiles() {
    fileInputRef.current.click();
  }

//   function openImageModal(image) {
//     setSelectedImage(image);
//     setModalOpen(true);
//   }

//   function closeImageModal() {
//     setSelectedImage(null);
//     setModalOpen(false);
//   }

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
  //  function deleteImage(index){
  //     setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  //  }
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
    < div className='bg-black max-h-screen min-h-screen'>
      
          <input
        className='items-center mt-3 flex bg-transparent px-2 py-2 font-semibold text-purple-600 rounded-xl border-none w-[350px] ring-2 ring-gray-300 focus:ring-2 focus:ring-gray-500 mx-auto'
        type='text'
        placeholder='Search by image name'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        />
       
     
    <div className='p-1 text-center pb-6'>
      <div className='text-center font-bold text-purple-600 text-[30px]'>
        <p>Drag & Drop Image Uploading</p>
      </div>
      <div className='h-[150px] w-[300px] mx-auto rounded-xl border-[2px] border-dashed border-purple-600 text-purple-500 flex justify-center mt-3  items-center' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
        {isDragging ? (
          <span className='justify-center'>Drop Images here</span>
        ) : (
          <>
            {"  Drag & Drop images here or   "} {"         "}
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
      <button
        type='button' 
        className='border p-[10px] cursor-pointer bg-purple-400 text-white mt-[20px] w-[40%]'
      >
        Upload
      </button>
      
    
    </div>
    
      <section className='grid grid-cols-2 ml-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-h-24 max-w-24 min-h-0 justify-between items-center gap-6'>
         
         {images
          .filter((image) =>
            image.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        .map((image, index) => (
          <div className=' w-28 flex flex-col rounded-lg ' key={index}>
          <img className='w-28 rounded-xl'
          src={image.url} alt={image.name} /> 
          <p className='text-purple-600'>{image.name} </p>
          </div>
          ))}
        
         
      </section>
      </div>
  );
}



export default Dragdrop;