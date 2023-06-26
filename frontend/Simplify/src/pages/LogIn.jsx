import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GiBookPile } from "react-icons/gi";
import { toast } from "react-toastify";
import { logUserIn, reset } from "../features/Auth/AuthSlice";

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // destructure the auth initialstate properties form the initialstae in the authslice using the useSelector hook
  const { user, isLoading, message, isError, isSuccess } = useSelector(
    (state) => state.auth
  );
  // destructure the form data properties from the formdata state
  const { email, password } = formData;

  useEffect(() => {
    if (isError) {
      // if an error occure, throw the error message as a toast
      toast.error(message);
    }

    if (isSuccess && user) {
      // navigate to the dashoard page if the user has completed the registration successfully
      navigate("/");
      // throw a success message
      toast.success(`welcome back, ${user.name}`);
      console.log(user);
    }
    console.log(user);
    // dispatch the reset function in the authslice reducer to clear the form
    dispatch(reset());
  }, [user, message, isError, isSuccess, dispatch, navigate]);

  //console.log(user);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  // Form subimtion function
  const handleSubmit = (e) => {
    e.preventDefault();
    // check if all fields have been filled properlyby user
    if (password && email) {
      const userData = {
        email,
        password,
      };
      // dispatch the user data filled in for registration to the register function in the authslice
      dispatch(logUserIn(userData));
      console.log(user);
    }
  };
  return (
    <>
      <div className="w-full h-screen mx-auto flex items-center justify-center">
        <div className="w-full h-full mx-auto flex items-center justify-center">
          <div className="w-1/3 h-[470px] p-8 bg-white shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center text-navyBlue text-3xl mb-8">
                <GiBookPile className="" />
                <h2 className="font-poppins font-bold ml-2 uppercase">
                  Simplify
                </h2>
              </div>
              <div className="mt-16">
                <h3 className="font-poopins font-bold text-2xl text-navyBlue mb-8">
                  Sign In to your Account
                </h3>
                <div className="flex flex-col">
                  <input
                    type="Your email"
                    value={email}
                    onChange={onChange}
                    placeholder="Your email"
                    id="email"
                    className="h-12 p-2 bg-gray-100 border-b-2 mb-4 focus:outline-none focus:border-navyBlue"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Your password"
                    id="password"
                    className="h-12 p-2 bg-gray-100 border-b-2 mb-4 focus:outline-none focus:border-navyBlue"
                  />
                  <button className="w-full bg-navyBlue h-10 mt-4 text-lg text-white font-poppins hover:rounded-lg">
                    Log In
                  </button>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p>Don't have an Account?</p>
                  <Link
                    to="/register"
                    className="text-navyBlue font-poppins font-bold text-lg border-b-2 border-b-navyBlue"
                  >
                    Register Here
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
