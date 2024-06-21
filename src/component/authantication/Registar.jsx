// src/components/Register.jsx



import { useContext, useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import useAxiosSecure from '../../hook/useAxiosSecure';
import AuthLoading from '../loader/AuthLoading';
import { AuthContext } from '../../provider/AuthProvider';

const Register = () => {

    const {registar, updateUser} = useContext(AuthContext)
    
    const axiosSecure = useAxiosSecure()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleRegister = async (e) => {
        setError('')
        e.preventDefault();
        try {
            // Register user with email and password
setLoading(true)
const data =await axiosSecure.get(`/checkUser/${username}`);
if(data.data.userName === username){
setError('User Name Already in exist')
setLoading(false)
  return;


}

        await registar(email, password);
      await axiosSecure.post('/jwt',{email})
    
   await updateUser(username)
            toast.success('User registered successfully')


const userData = {

    email: email,
    userName : username
}



await axiosSecure.post('/user', userData);
setLoading(false)
      
 
        } catch (error) {
     
            toast.error(error.message)
            setLoading(false)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Toaster></Toaster>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <p className='-mt-2 mb-2 text-red-500'>{error}</p>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input 
                            type="email" 
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">   

{
    loading? <AuthLoading ></AuthLoading> : "Register"
}
 
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">Already have an account? <a href="/login" className="text-blue-500 hover:underline"> Login  </a></p>
            </div>
        </div>
    );
};

export default Register;
