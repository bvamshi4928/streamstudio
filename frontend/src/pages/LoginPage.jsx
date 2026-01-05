import { useState } from "react";
import { ShipWheel, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin.js";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // const queryClient = useQueryClient();

  // const {
  //   mutate: loginMutation,
  //   isPending,
  //   error,
  // } = useMutation({
  //   mutationFn: login,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  const { isPending, error, loginMutation } = useLogin();

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-base-200 to-base-300"
      data-theme="forest"
    >
      <div className="border border-primary/30 flex flex-col lg:flex-row w-full max-w-6xl mx-auto bg-base-100 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm animate-fade-in">
        {/*login form section*/}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col">
          {/*logo*/}
          <div className="mb-6 flex items-center justify-start gap-3 animate-slide-down">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ShipWheel className="size-8 text-primary animate-spin-slow" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wide">
              StreamStudio
            </span>
          </div>
          {/* ERROR MESSAGE DISPLAY */}
          {error && (
            <div className="alert alert-error mb-4 animate-shake">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                {error.response?.data?.message ||
                  error.message ||
                  "An unknown error occurred"}
              </span>
            </div>
          )}
          <div className="w-full">
            <form onSubmit={handleLogin}>
              <div className="space-y-6">
                <div className="animate-slide-up">
                  <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Welcome Back!
                  </h2>
                  <p className="text-base opacity-80">
                    Sign in to continue your StreamStudio journey
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <Mail className="size-4" />
                        Email
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="hello@example.com"
                      className="input input-bordered w-full focus:input-primary transition-all duration-300"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <Lock className="size-4" />
                        Password
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="input input-bordered w-full pr-12 focus:input-primary transition-all duration-300"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="size-5" />
                        ) : (
                          <Eye className="size-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-full mt-2 text-base hover:scale-105 transition-transform duration-200"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  <div className="divider text-sm opacity-60">OR</div>

                  <div className="text-center">
                    <p className="text-base">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-primary hover:text-primary-focus font-semibold hover:underline transition-colors"
                      >
                        Create one now
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/*image section */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-primary/20 to-secondary/20 items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="max-w-md p-8 relative z-10 animate-slide-left">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto mb-8 group">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
              <img
                src="/i.png"
                alt="StreamStudio connection illustration"
                className="w-full h-full relative z-10 drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Connect & Collaborate Worldwide
              </h2>
              <p className="opacity-80 text-base leading-relaxed">
                Stream, chat, and collaborate with people around the globe in
                real-time
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <div className="badge badge-primary badge-lg">HD Video</div>
                <div className="badge badge-secondary badge-lg">Live Chat</div>
                <div className="badge badge-accent badge-lg">Screen Share</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
