// src/components/ForgotPassword.jsx



import { useState } from 'react';
import { auth } from '../../firebase/firebase.config';
import toast, { Toaster } from 'react-hot-toast';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
          toast.success('Please Check Your Email')
        } catch (error) {
           toast.error(error.message)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Toaster></Toaster>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
                <form onSubmit={handleResetPassword}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input 
                            type="email" 
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">Send Reset Email</button>
                </form>
                <p className="text-center text-gray-600 mt-4">Remembered your password? <a href="/login" className="text-blue-500 hover:underline">Login</a></p>
            </div>
        </div>
    );
};

export default ForgotPassword;
