import { ColorRing} from "react-loader-spinner";


const AuthLoading = () => {
    return (
        <div className="flex justify-center ">
           <ColorRing
  height="30"
  width="40"
  ariaLabel="fidget-spinner-loading"
  wrapperStyle={{}}
  wrapperClass="fidget-spinner-wrapper"
  /> 
        </div>
    );
};

export default AuthLoading;