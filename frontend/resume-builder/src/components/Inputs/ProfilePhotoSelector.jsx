import React from 'react'
import { LuUpload, LuUser, LuTrash } from 'react-icons/lu';
const ProfilePhotoSelector = ({image, setImage, preview, setPreview}) => {
    const inputRef = React.useRef(null);
    const [previewUrl, setPreviewUrl] = React.useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        
        if (file) {
            //Update the image state
            setImage(file);

            //Generate preview URL from the file
            const preview = URL.createObjectURL(file);
            if(setPreview){
                setPreview(preview);
            }
            setPreviewUrl(preview);
        }
    }
    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);

        if(setPreview){
            setPreview(null);
        }
    }

    const onChooseFile = () => {
        inputRef.current.click();
    }
  return (
    <div className='flex justify-center mb-6'>
        <input 
        type="file" 
        accept='image/*'
        onChange={handleImageChange}
        ref={inputRef}
        className='hidden'
        />

        {!image ? (
            <div className='w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative cursor-pointer'>
                <LuUser className='text-4xl text-purple-500'/>
                <button
                type='button'
                className='w-8 h-8 flex items-center justify-center bg-linear-to-r from-purple-500/85 to-purple-700 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
                onClick={onChooseFile}
                >
                    <LuUpload/>
                </button>
            </div>
        ): (
            <div className=''>
                <img 
                src={preview || previewUrl} 
                alt="Profile photo" 
                className=''/>
                <button
                type='button'
                className=''
                onClick={handleRemoveImage}
                >
                    <LuTrash/>
                </button>
            </div>
        )}
    </div>
  )
}

export default ProfilePhotoSelector