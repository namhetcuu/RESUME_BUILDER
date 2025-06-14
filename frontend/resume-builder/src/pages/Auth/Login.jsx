import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/useContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const Login = ({setCurrentPage}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if(!password){
      setError("Please enter a password");
      return;
    }

    setError(null);
    //login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const {token} = response.data;

      if(token){
        localStorage.setItem("token",token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
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
      <h3 className='text-lg font-semibold text-black'>Welcome Back</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Please enter your credentials to access your account.
      </p>
      <form onSubmit={handleLogin} action="" method="post">

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
        <button type='submit' className='btn-primary'>LOGIN</button>
        <p className='text-[13px] text-slate-800 mt-3'>
          Don't have an account?{" "}
          <button
          className='font-medium text-primary underline cursor-pointer'
          onClick={() => {
            setCurrentPage("signup")
          }}
          >
            SignUp
          </button>
        </p>
        
      </form>
    </div>
  )
}

export default Login