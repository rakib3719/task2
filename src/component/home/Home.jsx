import ParentComponent from "../ParentComponent";
import Posts from "./Posts";


const Home = () => {
    return (
       <div>

<div className="min-h-screen flex items-center justify-center bg-gray-100">
     
     <div className="text-center">
         <h1 className="text-4xl font-bold mb-4">Welcome to Social Media App</h1>
         <p className="text-gray-700 mb-6">Join us and share your moments with the world!</p>
         <div className="space-x-4">
             <a href="/register" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">Register</a>
             <a href="/login" className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300">Login</a>
         </div>
     </div>

 </div>
<ParentComponent></ParentComponent>
       </div>
    );
};

export default Home;
