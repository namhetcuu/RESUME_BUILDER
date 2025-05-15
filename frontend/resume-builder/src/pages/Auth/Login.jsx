import React from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';

const Login = ({setCurrentPage}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
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
        {error && <p className='text-red-500'>{error}</p>}
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