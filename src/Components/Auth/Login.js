import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Authprovider";
import "./Login.css";

const Login = () => {

  const {logIn,logInWithGoogle,logInWithGithub,loading} = useContext(AuthContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
    generalError: "",
  });

  const passwordHandler = (e) => {
    const password = e.target.value;
    
    if (password === "") {
      setError({ ...error, passwordError: "Password can not be empty " });
      setUserInfo({ ...userInfo, password: "" });
    }
     else if (password.length < 6) {
      setError({
        ...error,
        passwordError: "Password at lest 6 characters length ",
      });
      setUserInfo({ ...userInfo, password: "" });
    } 
     else {
      setError({ ...error, passwordError: "" });
      setUserInfo({ ...userInfo, password: password });
    }
  };

  const emailHandler = (e) => {
    const email = e.target.value;
    
    if (email === "") {
      setError({ ...error, emailError: " Email must not be empty " });
      setUserInfo({ ...userInfo, email: "" });
    } 
    else if (!email.match(/^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/)) {
      setError({ ...error, emailError: " Please provide a valid email " });
      setUserInfo({ ...userInfo, email: "" });

    }
     else {
      setError({ ...error, emailError: "" });
      setUserInfo({ ...userInfo, email: email });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

     logIn(userInfo.email, userInfo.password)
          .then((result)=>{
            toast.success("Login success")
            navigate(from,{replace:true})
          })
          .catch(error=>console.log(error));
  };

  const googleLoginHandler = ()=>{
           logInWithGoogle()
           .then((result)=>{
            toast.success("Login success")
            navigate(from,{replace:true})
          })
          .catch(error=>console.log(error));
  }

  const githubLoginHandler  = ()=>{
        logInWithGithub()
        .then((result)=>{
          toast.success("Login success")
          navigate(from,{replace:true})
        })
        .catch(error=>console.log(error));
          
  }

  // set loading 

  if(loading)
  {
    return <progress className="progress w-full"></progress>
  }


  return (
    <div className="auth-hero h-screen">
         <Helmet>
                <title>Joya Kitchen - Login</title>
                <link rel="canonical" href="https://www.tacobell.com/" />
           </Helmet>
      <div>
        <div className="card-body md:w-[450px] mx-auto shadow-lg mt-10 ">
          <form onSubmit={submitHandler}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered text-black"
                required
                onChange={emailHandler}
              />
              {error.emailError && (
                <label className="label">
                  <p className="label-text-alt link text-red-400 font-bold link-hover">
                    {error.emailError}
                  </p>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Password</span>
              </label>

              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered text-black"
                onChange={passwordHandler}
              />

              {error.passwordError && (
                <label className="label">
                  <p className="label-text-alt link text-red-400 font-bold link-hover">
                    {error.passwordError}
                  </p>
                </label>
              )}

              {error.generalError && (
                <label className="label">
                  <p className="label-text-alt link text-red-400 font-bold link-hover">
                    {error.generalError}
                  </p>
                </label>
              )}

              <label className="label">
                <span>
                  <small>
                    Don't have account ?
                    <Link to={"/register"} className="text-red-500">
                      Register
                    </Link>
                  </small>
                </span>
              </label>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>

          <div className="flex gap-1">
            <div className="w-1/2 bg-orange-400 text-center rounded-md text-white hover:bg-slate-500">
              <button onClick={googleLoginHandler} className="py-2 flex items-center">
              
                <p className="ml-2 md:ml-4">
                  LogIn with <span className="inline-block">Google</span>
                </p>
              </button>
            </div>

            <div className="w-1/2  bg-orange-400 text-center rounded-md text-white hover:bg-slate-500">
              <button onClick={githubLoginHandler} className="py-2 flex items-center">
              
                <p className="ml-2 md:ml-4">
                  LogIn with <span className="inline-block">Github</span>
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
