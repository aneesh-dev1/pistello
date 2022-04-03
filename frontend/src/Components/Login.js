import React from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import share from "../assets/share.mp4";
import logo from "../assets/logo.svg";
import { connect } from "../connect";

const Login = () => {
  const navigate =useNavigate();
    const responseGoogle = (response) =>{
      localStorage.setItem('user',JSON.stringify(response.profileObj));
      const {name, googleId,imageUrl} =response.profileObj;
      const doc ={
        _id: googleId,
        _type : 'user',
        username : name,
        image : imageUrl
      }
      connect.createIfNotExists(doc).then(()=>{
        navigate('/',{replace:true})
      })
    }


  return (
    <div className="flex justify-start items-center flex-col h-screen overflow-hidden">
      <div className="relative w-full ">
        <video
          src={share}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5" >
            <img src={logo} alt="logo" width="170px"/>
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
            clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
            render={(renderProps)=>(
             <button
             type="button"
             className="bg-mainColor flex justify-center items-center p-3 pl-4 pr-4 rounded-lg outline-none cursor-pointer"
             onClick={renderProps.onClick}
             disabled={renderProps.disabled}
             >
               <FcGoogle className="mr-4"/>Sign In With This
             </button> 
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;