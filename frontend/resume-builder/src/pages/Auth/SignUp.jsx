import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/useContext';
import uploadImage from '../../utils/uploadImage';


const SignUp = ({setCurrentPage}) => {
  const {updateUser} = useContext(UserContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [error, setError] = React.useState(null);
  const [profilePic, setProfilePic] = React.useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }
    if(!password){
      setError("Please enter a password");
      return;
    }
    if(!fullName){
      setError("Please enter a username");
      return;
    }
    if(!profilePic){
      setError("Please select a profile picture");
      return;
    }
    setError(null);
    // Sign up API call
    try{

      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        email,
        password,
        name: fullName,
        profileImageUrl
      })

      const {token} = response.data;

      if(token){
        localStorage.setItem("token",token);
        updateUser(response.data);
        navigate("/dashboard");
      }
      
    }catch(error){
      if(error.response && error.response.message){
        setError(error.response.data.message);
        return;
      }else{
        setError("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <div className='w-[90vw] md:w-[33vw] flex flex-col p-7 justify-center'>
      <h3 className='text-lg font-semibold text-black'>
        Create Your Account
      </h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Please enter your details to create an account.
      </p>

      <ProfilePhotoSelector
        image={profilePic}
        setImage={setProfilePic}
      />

      <Input
        type='text'
        onChange={(e) => setFullName(e.target.value)}
        value={fullName}
        label='Username'
        placeholder='Enter your username'
        required
      />
      <Input
        type='text'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        label='Email Address'
        placeholder='Enter your email address'
        required
      />
      <Input
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        label='Password'
        placeholder='Enter your password'
        required
      />
      {error && (<p className='text-red-500'>{error}</p>)}
      <button type='submit' className='btn-primary' onClick={handleSignUp}>SIGNUP</button>
      <p className='text-[13px] text-slate-800 mt-3'>
        Already have an account?{" "}
        <button className='font-medium text-primary underline cursor-pointer'
        onClick={() => {
          setCurrentPage("login");
        }
        }> 
          Login
        </button>

      </p>
    </div>
  )
}

export default SignUp