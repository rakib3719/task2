
import { NavLink } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const Navbar = () => {
    const user = true; // Placeholder for authentication context

    const nav = (
        <div className="lg:flex text-lg font-poppins">
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/login'>Login</NavLink></li>
            <li><NavLink to='/registar'>Registar</NavLink></li>
            <li><NavLink to='/my_crafts'>My Art & Craft List</NavLink></li>
        </div>
    );

    return (
        <div className="navbar w-[96%] md:w-[90%] mx-auto max-w-[1620px] z-10 relative">
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden -ml-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-md dropdown-content mt-3 z-[1] shadow bg-base-100 rounded-box w-52">
                            {nav}
                        </ul>
                    </div>
                    <a className="text-[16px] sm:text-2xl font-bold font-playFair -ml-4 sm:-ml-0">ATG World</a>
                </div>
                <div className={!user ? "navbar-center hidden -mr-36 lg:flex" : "navbar-center hidden mr-24 lg:flex"}>
                    <ul className="menu menu-horizontal px-1">
                        {nav}
                    </ul>
                </div>
                <div>
                    {/* Placeholder for additional navbar content */}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
