import logo from "../../images/logo-devlinks-small.svg";
import email from "../../images/icon-email.svg";
import password from "../../images/icon-password.svg";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { logIn } from "../../service/userService";
import { useSetAtom } from "jotai";
import { apiAccessTokenAtom } from "../../store";

const Login = () => {
  const navigate = useNavigate();
  const setApiAccessToken = useSetAtom(apiAccessTokenAtom);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    logIn(data.username, data.password)
      .then(({ data }) => {
        // logInUser(data.user);
        setApiAccessToken(data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Welcome!");
        navigate("/");
      })
      .catch(() => {
        setError("username", {
          message: "Oops, something went wrong. Try again",
        });
      });
  };

  return (
    <div className="w-full">
      <section className="bg-gray-50 ">
        <div className="flex flex-col items-center justify-center px-2 xs:px-6 py-8 h-screen lg:py-10">
          <a
            href="#"
            className="flex  mb-6 text-2xl font-semibold text-gray-900"
          >
            <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
            devlinks
          </a>
          <div className="w-full xs:bg-white rounded-lg xs:shadow  md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="font-bold leading-tight tracking-tight text-gray-900 text-3xl ">
                Login
              </h1>
              <p className="leading-tight tracking-tight text-gray-500 ">
                Add your details below to get back in to the app
              </p>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    className={`block text-xs font-light ${
                      errors.username?.message
                        ? "text-red-500"
                        : "text-gray-900"
                    }`}
                  >
                    Email address
                  </label>
                  <div
                    className={`flex fex-row border bg-white  rounded-lg focus-within:border-purp ${
                      errors.username?.message
                        ? "border-red-500"
                        : "border-gray-300"
                    } `}
                  >
                    <img src={email} alt="" className="px-3 rounded-xl" />
                    <input
                      type="email"
                      id="email"
                      className={`text-gray-900 sm:text-sm block rounded-lg w-full p-2.5 focus:outline-none ${
                        errors.username?.message ? "bg-white" : "bg-white"
                      } `}
                      placeholder="e.g. alex@email.com"
                      {...register("username")}
                    />
                    <p
                      className={`self-center text-xs  ${
                        errors.username?.message ? "text-red-500" : "text-white"
                      }`}
                    >
                      Can't be empty
                    </p>
                  </div>
                </div>
                <div>
                  <label
                    className={`block text-xs font-light ${
                      errors.password?.message
                        ? "text-red-500"
                        : "text-gray-900"
                    }`}
                  >
                    Password
                  </label>
                  <div
                    className={`flex fex-row border bg-white  rounded-lg focus-within:border-purp ${
                      errors.password?.message
                        ? "border-red-500 "
                        : "border-gray-300 "
                    } `}
                  >
                    <img src={password} alt="" className="px-3 rounded-xl" />
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      className={`text-gray-900 sm:text-sm block rounded-lg w-full p-2.5 focus:outline-none ${
                        errors.password?.message ? "bg-white" : "bg-white"
                      } `}
                      {...register("password")}
                    />
                    <p
                      className={`self-center text-xs ${
                        errors.password?.message ? "text-red-500" : "text-white"
                      }`}
                    >
                      Please check again
                    </p>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-purp hover:bg-hover-purp hover:border-hover-purp font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Login
                </button>
                <p className="text-sm font-light text-gray-500 text-center">
                  Don't have an account yet?{"  "}
                  <a
                    href="/auth/register"
                    className="font-medium text-purp text-center "
                  >
                    Create account
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
