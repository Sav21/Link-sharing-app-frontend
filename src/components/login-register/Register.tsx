import logo from "../../images/logo-devlinks-small.svg";
import email from "../../images/icon-email.svg";
import password from "../../images/icon-password.svg";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../../service/userService";

const Register = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: '',
      password_confirmation: '',
    },
  });
  const onSubmit = handleSubmit((data) => {
    if (data.password_confirmation != data.password) {
      setError("password_confirmation", { message: "Passwords must match" });
      return;
    }

    registerUser(data.username, data.password)
      .then(({ data }) => {
        // logInUser(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Registration successful, please login!");
        navigate("/auth/login");
      })
      .catch(() => {
        setError("username", { message: "Oops, something went wrong. Try again" });
      });
  });

  return (
    <div className="w-full">
      <section className="bg-gray-50 ">
        <div className="flex flex-col items-center justify-center px-2 xs:px-6 py-8 h-screen lg:py-10">
          <a
            href="#"
            className="flex  mb-6 text-2xl font-semibold text-gray-900 "
          >
            <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
            devlinks
          </a>
          <div className="w-full xs:bg-white rounded-lg xs:shadow  md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="font-bold leading-tight tracking-tight text-gray-900 text-3xl ">
                Create account
              </h1>
              <p className="leading-tight tracking-tight text-gray-500  ">
                Let's get you started sharing your links!
              </p>
              <form
                action="/auth/register"
                onSubmit={onSubmit}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label className="block text-xs font-light text-gray-900 ">
                    Email address
                  </label>
                  <div
                    className={`flex fex-row border bg-white rounded-lg focus-within:border-purp ${
                      errors.username?.message ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <img src={email} alt="" className="px-3 rounded-xl " />
                    <input
                      type="email"
                      className="bg-white text-gray-900 sm:text-sm block rounded-lg w-full p-2.5 focus:outline-none "
                      placeholder="e.g. alex@email.com"
                      {...register("username", { required: { message: "Required", value: true }})}
                    />
                    <p
                      className={`self-center text-xs   ${
                        errors.username?.message ? "text-red-500" : "text-white"
                      }`}
                    >
                      {errors.username?.message}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-light text-gray-900 ">
                    Create password
                  </label>
                  <div
                    className={`flex fex-row border bg-white rounded-lg focus-within:border-purp ${
                      errors.password?.message ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <img src={password} alt="" className="px-3 rounded-xl" />
                    <input
                      type="password"
                      placeholder="At least 8 characters"
                      className="bg-white text-gray-900 sm:text-sm rounded-lg w-full p-2.5  focus:outline-none"
                      {...register("password", { required: { message: "Required", value: true }})}
                    />
                    <p
                      className={`self-center text-xs ${
                        errors.password?.message ? "text-red-500" : "text-white"
                      }`}
                    >
                      {errors.password?.message}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-light text-gray-900 ">
                    Confirm password
                  </label>
                  <div
                    className={`flex fex-row border bg-white rounded-lg focus-within:border-purp ${
                      errors.password_confirmation?.message ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <img src={password} alt="" className="px-3 rounded-xl" />
                    <input
                      type="password"
                      placeholder="At least 8 characters"
                      className="bg-white text-gray-900 sm:text-sm rounded-lg w-full p-2.5  focus:outline-none"
                      {...register("password_confirmation", { required: { message: "Required", value: true }})}
                    />
                    <p
                      className={`self-center text-xs ${
                        errors.password_confirmation?.message ? "text-red-500" : "text-white"
                      }`}
                    >
                      {errors.password_confirmation?.message}
                    </p>
                  </div>
                </div>

                <p className="text-gray-500 text-xs">
                  Password must contain at least 8 characters
                </p>

                <button
                  type="submit"
                  className="w-full text-white bg-purp hover:bg-hover-purp hover:border-hover-purp font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create new account
                </button>
                <p className="text-sm font-light text-gray-500  text-center">
                  Already have an account?{"  "}
                  <a
                    href="/auth/login"
                    className="font-medium text-purp text-center "
                  >
                    Login
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

export default Register;
