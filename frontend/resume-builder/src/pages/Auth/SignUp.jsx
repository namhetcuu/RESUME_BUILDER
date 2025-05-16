import React from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';


const SignUp = ({setCurrentPage}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [error, setError] = React.useState(null);
  const [profilePic, setProfilePic] = React.useState(null);

  const navigate = useNavigate();

  const handleSinUp = async (e) => {}

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
        preview={null}
        setPreview={() => {}}
      />

      <Input
        type='text'
        onChange={(e) => setUsername(e.target.value)}
        value={username}
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
      <button type='submit' className='btn-primary'>SIGNUP</button>
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