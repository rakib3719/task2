// src/components/Login.jsx

import { useContext, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../firebase/firebase.config';
import toast, { Toaster } from 'react-hot-toast';
import useAxiosSecure from '../../hook/useAxiosSecure';
import AuthLoading from '../loader/AuthLoading';
import { AuthContext } from '../../provider/AuthProvider';

const Login = () => {
    const {login} = useContext(AuthContext)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const axiosSecure = useAxiosSecure()
const [loading, setLoading] = useState(false)
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            

            const data =await axiosSecure.get(`/checkUser/${username}`);
     if(!data.data){

        toast.error('User not exist. please input correct user name')
        setLoading(false)
        return;
     }

    const email = data?.data?.email;
         

          
    await login(email, password)
          
            setLoading(false)
            toast.success('Login Successful');

            
        } catch (error) {
            setLoading(false)

            if(error.message === 'Firebase: Error (auth/invalid-email).'){
                toast.error('Invalid Email Or password')
                setLoading(false)
                return
            }
            toast.error(error.message);
            
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Toaster />
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                   {


loading? <AuthLoading></AuthLoading> : "Login"
                   }
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Forgot your password?{' '}
                    <a href="/forgot-password" className="text-blue-500 hover:underline">
                        Reset Password
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
