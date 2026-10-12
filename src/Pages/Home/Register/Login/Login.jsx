import { useState } from "react";
import cart from "../../../../../public/SingUp-img/cart.png";
import { baseUrl } from "../../../../Sevices/Config";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { setToken } from "../../../../Sevices/Token";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [watchPassword, setWatchPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const LoginPage = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username: username,
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    setLoading(true);
    return fetch(`${baseUrl}/token/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.access) {
          toast.success("krildi");
          setToken(result.access);
          navigate("/");
        } else if (result.detail) {
          toast.error("royxatdan o'tilgan akaunt topilmadi ");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Tarmoq xatosi, qayta urinib ko'ring");
      })
      .finally(() => setLoading(false));
  };

  const field =
    "w-full border-b border-gray-300 bg-transparent pb-2 pt-3 text-base text-black outline-none transition-colors placeholder:text-gray-400 focus:border-black dark:border-gray-600 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white sm:text-sm";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <section className="container_1200 mx-auto flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-8 md:min-h-0 md:flex-row md:justify-between md:gap-12 md:py-12">
        <div className="hidden w-full items-center justify-center overflow-hidden rounded-r-md bg-[#CBE4E8] dark:bg-gray-800 md:flex md:w-1/2">
          <img
            src={cart}
            alt="Log in to Exclusive"
            className="h-auto w-full object-cover dark:opacity-90"
          />
        </div>

        <div className="mx-auto w-full max-w-sm rounded-2xl px-2 sm:px-4 md:mx-0 md:w-1/2 md:max-w-96">
          <h1 className="mb-3 text-2xl font-semibold tracking-wide text-black dark:text-white sm:text-3xl">
            Log in to Exclusive
          </h1>
          <p className="mb-8 text-sm text-gray-600 dark:text-gray-400 md:mb-10">
            Enter your details below
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              LoginPage();
            }}
            className="flex flex-col gap-6 md:gap-8"
          >
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              autoComplete="username"
              placeholder="Email or Phone Number"
              className={field}
            />

            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={watchPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Password"
                className={`${field} pr-10`}
              />
              <button
                type="button"
                aria-label={watchPassword ? "Hide password" : "Show password"}
                className="absolute bottom-1 right-0 flex h-9 w-9 cursor-pointer items-center justify-center text-lg text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                onClick={() => setWatchPassword((p) => !p)}
              >
                {watchPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>

            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={loading}
                className="flex min-w-[110px] cursor-pointer items-center justify-center gap-2 rounded bg-[#DB4444] px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#c33838] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:px-10"
              >
                {loading && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                )}
                Login
              </button>

              <a
                href="#"
                className="text-center text-sm text-[#DB4444] hover:underline sm:text-left"
              >
                Forget Password?
              </a>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;