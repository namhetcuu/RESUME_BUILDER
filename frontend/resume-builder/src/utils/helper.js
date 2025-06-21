export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

//Phân tích ảnh từ URL và trả về màu sáng trung bình của ảnh (theo định dạng rgb(r, g, b)).
export const getLightColorFromImage = (imageUrl) => {
  return new Promise((resolve, reject) => {
    if(!imageUrl || typeof imageUrl !== 'string') {
      return reject(new Error('Invalid image URL'));
    }

    const img = new Image();
    if(!imageUrl.startsWith("data:")){
      img.crossOrigin = 'anonymous'; // Handle CORS if the image is from a different origin
    }

    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img,0,0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      let r = 0,g = 0,b =0,count = 0;

      for(let i=0;i<imageData.length;i+=4){
        const red = imageData.data[i];
        const green = imageData.data[i + 1];
        const blue = imageData.data[i + 2];
        const brightness = (red + green + blue) / 3;
        if(brightness > 100){ // Adjust threshold as needed
          r += red;
          g += green;
          b += blue;
          count++;
        }
      }

      if(count === 0) {
        resolve('#ffffff'); // Default to white if no bright pixels found
      }else{
        r = Math.round(r/count);
        g = Math.round(g/count);
        b = Math.round(b/count);
        resolve(`rgb(${r}, ${g}, ${b})`);
      }
    };
    img.onerror = (error) => {
      reject(new Error('Failed to load image: ' + error.message));
    };
  })
}