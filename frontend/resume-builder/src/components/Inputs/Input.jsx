import React from 'react'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'

const Input = ({value, onChange, label, placeholder, type}) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
  return (
    <div>
        <label htmlFor="" className=''>{label}</label>
        <div className='input-box'>
            <input 
            type={type=="password" ? (showPassword ? "text" : "password"): type} 
            placeholder={placeholder}
            value={value}
            className='w-full bg-transparent outline-none'
            onChange={(e) => onChange(e)}
            />

            {type === "password" && (
                <>
                    {showPassword ? (
                        <FaRegEye
                        size={22}
                        className='text-primary cursor-pointer'
                        onClick={() => handleShowPassword()}
                        />
                    ) : (
                        <FaRegEyeSlash
                        size={22}
                        className='text-slate-400 cursor-pointer'
                        onClick={() => handleShowPassword()}
                        />
                    )}
                    
                </>
            )}
        </div>
    </div>
  )
}

export default Input