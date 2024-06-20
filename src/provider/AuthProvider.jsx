import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword,  signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";


export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {

    const [user, setUser] = useState({})
    const [loader, setLoader] = useState(true)


   
     
   

   
    const registar = (email, password)=>{

        return createUserWithEmailAndPassword(auth, email, password)
    }
    const login = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateUser = (name, photo)=>{
    
    
        return updateProfile(auth.currentUser,{
            displayName: name,
            photoURL:photo
        })
    }
    const logOut = ()=>{
        return signOut(auth)
    }

    
useEffect(()=>{

const unSubscribe  = onAuthStateChanged(auth, (currentUser)=>{


setLoader(false)
setUser(currentUser)

})

return ()=> unSubscribe()

},[])


     const authInfo = {  registar, login, logOut, updateUser, user, loader}


    return (
        <AuthContext.Provider value={authInfo}>

            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
};
export default AuthProvider;