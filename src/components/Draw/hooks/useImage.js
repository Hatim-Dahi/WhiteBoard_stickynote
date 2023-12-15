import { useState } from "react";

export const useImage =()=>{
    const [images, setImages] = useState([]);
    const [imagesRedoHistory,setImagesRedoHistory]=useState([])

    const handleDragEnd = (id, x, y) => {
        const updatedImages = images.map((image) =>
          image.id === id ? { ...image, x, y } : image
        );
        setImages(updatedImages);
      };
      const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onload = (e) => {
          const image = new window.Image();
          image.src = e.target.result;
          image.onload = () => {
            const newImage = {
              id: Date.now(), // Unique identifier for the image
              src: image,
              x: 0,
              y: 0,
              width: image.width,
              height: image.height,
            };
            setImages([...images, newImage]);
          };
        };
    
        reader.readAsDataURL(file);
      };

      


  const handleResize = (id, width, height) => {
    const updatedImages = images.map((image) =>
      image.id === id ? { ...image, width, height } : image
    );
    setImages(updatedImages);
  };

    return { images,setImages,imagesRedoHistory,setImagesRedoHistory,handleDragEnd,handleImageUpload,handleResize}
}