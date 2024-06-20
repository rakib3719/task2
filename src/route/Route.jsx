import { createBrowserRouter } from "react-router-dom";
import Home from "../component/home/Home";
import Main from "../main/Main";
import Login from "../component/authantication/Login";
import Register from "../component/authantication/Registar";
import ForgotPassword from "../component/authantication/ForgotPassword";

export const router = createBrowserRouter([
{
    path:'/',
    element:<Main></Main>,
    children:[{

path:'/',
element:<Home></Home>,

    },

    {
        path:'/login',
        element:<Login></Login>
    },

{
    path:'/registar',
    element: <Register></Register>
},{
    path:'/forgot-password',
    element:<ForgotPassword></ForgotPassword>
}
]
}

    
])