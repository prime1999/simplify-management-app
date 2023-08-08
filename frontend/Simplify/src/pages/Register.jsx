import { useEffect, useState } from "react";
import axios from "axios";
import { GiBookPile } from "react-icons/gi";
import { AiFillCamera } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/Auth/AuthSlice";
import { toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import Spinner from "../components/Spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // destructure the auth initialstate properties form the initialstae in the authslice using the useSelector hook
  const { user, isLoading, message, isError, isSuccess } = useSelector(
    (state) => state.auth
  );
  // destructure the form data properties from the formdata state
  const { name, email, password, password2 } = formData;

  useEffect(() => {
    if (isError) {
      // if an error occure, throw the error message as a toast
      toast.error(message);
    }

    if (isSuccess && user) {
      // navigate to the dashoard page if the user has completed the registration successfully
      navigate("/");
      // throw a success message
      toast.success(`welcome to Simplify, ${user.name}`);
    }
    // dispatch the reset function in the authslice reducer to clear the form
    dispatch(reset());
  }, [dispatch, navigate, user, message, isError, isSuccess]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const postUserAvatar = async (pics) => {
    setLoading(true);

    if (!pics) {
      toast.error("Please select an image");

      setLoading(false);
      return;
    }

    try {
      if (pics.type === "image/jpeg" || pics.type === "image/png") {
        // set an instance of the FormData
        const picsData = new FormData();
        // append the following key-value pairs to it
        picsData.append("file", pics);
        picsData.append("upload_preset", "chat-app");
        picsData.append("cloud_name", "ddboi173o");
        // send the data(your new FormData with the required data) to your cloudinary url
        const { data } = await axios.post(
          "https://api.cloudinary.com/v1_1/ddboi173o/image/upload",
          picsData
        );

        setPic(data.url.toString());
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Upload image again");
    }
  };

  // Form subimtion function
  const handleSubmit = (e) => {
    e.preventDefault();
    // check if all fields have been filled properlyby user
    if (password === password2 && name && email) {
      const userData = {
        name,
        email,
        password,
        pic,
      };
      // dispatch the user data filled in for registration to the register function in the authslice
      dispatch(register(userData));
    }
  };

  return (
    <>
      <div className="w-full h-screen mx-auto flex items-center justify-center">
        <div className="w-full h-full mx-auto flex items-center justify-center">
          <div className="w-1/3 h-[600px] p-8 bg-white shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center text-navyBlue text-3xl">
                <GiBookPile className="" />
                <h2 className="font-poppins font-bold ml-2 uppercase">
                  Simplify
                </h2>
              </div>
              <div className="mt-4">
                <h3 className="font-poopins font-bold text-3xl text-navyBlue">
                  Create An Account
                </h3>
                <div>
                  <label
                    className="flex items-center justify-center mt-4 relative"
                    htmlFor="userAvatar"
                  >
                    {loading ? (
                      <>
                        <Spinner />
                      </>
                    ) : (
                      <>
                        {" "}
                        <Avatar
                          sx={{ width: "70px", height: "70px" }}
                          alt="user avatar"
                          src={pic}
                        ></Avatar>
                        <AiFillCamera className="absolute text-3xl top-[60%] right-[40%] cursor-pointer" />
                      </>
                    )}
                  </label>
                  <input
                    id="userAvatar"
                    type="file"
                    accept="image/*"
                    onChange={(e) => postUserAvatar(e.target.files[0])}
                    className="hidden"
                  />
                </div>
                <div className="flex flex-col">
                  <input
                    type="text"
                    value={name}
                    placeholder="Your name"
                    id="name"
                    onChange={onChange}
                    className="h-12 p-2 bg-gray-100 border-b-2 my-4 focus:outline-none focus:border-navyBlue"
                  />
                  <input
                    type="email"
                    value={email}
                    placeholder="Your email"
                    id="email"
                    onChange={onChange}
                    className="h-12 p-2 bg-gray-100 border-b-2 mb-4 focus:outline-none focus:border-navyBlue"
                  />
                  <input
                    type="password"
                    value={password}
                    placeholder="Create password"
                    id="password"
                    onChange={onChange}
                    className="h-12 p-2 bg-gray-100 border-b-2 mb-4 focus:outline-none focus:border-navyBlue"
                  />
                  <input
                    type="password"
                    value={password2}
                    placeholder="Confirm password"
                    id="password2"
                    onChange={onChange}
                    className="h-12 p-2 bg-gray-100 border-b-2 focus:outline-none focus:border-navyBlue"
                  />
                  <button className="w-full bg-navyBlue h-10 mt-4 text-lg text-white font-poppins hover:rounded-lg">
                    Sign Up
                  </button>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p>Already have an Account?</p>
                  <Link
                    to="/login"
                    className="text-navyBlue font-poppins font-bold text-lg border-b-2 border-b-navyBlue"
                  >
                    Log In
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

export default Register;
