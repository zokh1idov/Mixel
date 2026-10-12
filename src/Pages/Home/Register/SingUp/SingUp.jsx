import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../../Sevices/Config";
import { useState } from "react";
import { toast } from "sonner";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [watchPassword, setWatchPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = () => {
    setLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username: username.trim(),
      email: email.trim(),
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return fetch(`${baseUrl}/users/register`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.username) {
          toast.success("Account created!");
          navigate("/Login");
        } else if (result.email) {
          toast.warning(result.email);
        } else {
          toast.error(result.message || "Something went wrong");
        }
      })
      .catch(() => toast.error("Network error"))
      .finally(() => setLoading(false));
  };

  const field =
    "w-full border-b border-gray-300 bg-transparent pb-3 pt-2 text-base text-black outline-none transition-colors placeholder:text-gray-400 focus:border-black dark:border-gray-600 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white sm:text-[14px]";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="py-8 sm:py-10">
        <div className="container_1200 px-4">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-24">
            <div className="hidden bg-[#C9E3E8] dark:bg-gray-800 lg:block">
              <img
                src="/SingUp-img/cart.png"
                alt=""
                className="h-[560px] w-full object-contain dark:opacity-90"
              />
            </div>

            <div className="mx-auto w-full max-w-sm lg:max-w-96">
              <h2 className="text-3xl font-semibold leading-tight text-black dark:text-white sm:text-[42px] sm:leading-none">
                Create an account
              </h2>

              <p className="mb-10 mt-3 text-[13px] text-[#555] dark:text-gray-400 sm:mb-12">
                Enter your details below
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSignUp();
                }}
                className="space-y-6 sm:space-y-7"
              >
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  required
                  minLength={2}
                  autoComplete="username"
                  placeholder="Name"
                  className={field}
                />

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Email"
                  className={field}
                />

                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={watchPassword ? "text" : "password"}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    placeholder="Password"
                    className={`${field} pr-10`}
                  />
                  <button
                    type="button"
                    aria-label={watchPassword ? "Hide password" : "Show password"}
                    onClick={() => setWatchPassword((p) => !p)}
                    className="absolute bottom-1 right-0 flex h-9 w-9 cursor-pointer items-center justify-center text-lg text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                  >
                    {watchPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded bg-[#db4444] text-[15px] font-medium text-white duration-300 hover:bg-[#c53b3b] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  )}
                  {loading ? "Loading..." : "Create Account"}
                </button>

                <button
                  type="button"
                  className="flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded border border-[#d9d9d9] text-[15px] text-[#333] transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  <img src="/SingUp-img/google.png" alt="" className="h-5 w-5" />
                  Sign up with Google
                </button>

                <div className="flex justify-center gap-2 pt-2 text-[14px] text-[#777] dark:text-gray-400">
                  <span>Already have account?</span>
                  <Link to="/Login" className="font-medium text-black dark:text-white">
                    Log in
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;