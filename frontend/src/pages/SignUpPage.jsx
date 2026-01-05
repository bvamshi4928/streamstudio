import React from "react";
import { useState } from "react";
import {
  ShipWheelIcon,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp.js";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const checkPasswordStrength = (password) => {
    if (password.length === 0) return "";
    if (password.length < 6) return "weak";
    if (password.length < 10) return "medium";
    return "strong";
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setSignupData({ ...signupData, password: newPassword });
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  // const queryClient = useQueryClient();

  // const {
  //   mutate: signupMutation,
  //   isPending,
  //   error,
  // } = useMutation({
  //   mutationFn: signup,
  //   onSuccess: () => queryClient.invalidateQueries(["authUser"]),
  // });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-base-200 to-base-300"
      data-theme="forest"
    >
      <div className="border border-primary/30 flex flex-col lg:flex-row w-full max-w-6xl mx-auto bg-base-100 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm animate-fade-in">
        {/* Left side with form */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col">
          {/*LOGO"*/}
          <div className="mb-6 flex items-center justify-start gap-3 animate-slide-down">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ShipWheelIcon className="size-8 text-primary animate-spin-slow" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wide">
              StreamStudio
            </span>
          </div>
          {/*error message*/}
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
                  "An error occurred"}
              </span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-6">
                <div className="animate-slide-up">
                  <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Create Account
                  </h2>
                  <p className="text-base opacity-80">
                    Join thousands of users on StreamStudio!
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <User className="size-4" />
                        Full Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Smith"
                      className="input input-bordered w-full focus:input-primary transition-all duration-300"
                      value={signupData.fullName}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          fullName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <Mail className="size-4" />
                        Email
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="john@email.com"
                      className="input input-bordered w-full focus:input-primary transition-all duration-300"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          email: e.target.value,
                        })
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
                        value={signupData.password}
                        onChange={handlePasswordChange}
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
                    {passwordStrength && (
                      <div className="mt-2">
                        <div className="flex gap-1 mb-1">
                          <div
                            className={`h-1 flex-1 rounded ${
                              passwordStrength === "weak"
                                ? "bg-error"
                                : passwordStrength === "medium"
                                ? "bg-warning"
                                : "bg-success"
                            }`}
                          ></div>
                          <div
                            className={`h-1 flex-1 rounded ${
                              passwordStrength === "medium"
                                ? "bg-warning"
                                : passwordStrength === "strong"
                                ? "bg-success"
                                : "bg-base-300"
                            }`}
                          ></div>
                          <div
                            className={`h-1 flex-1 rounded ${
                              passwordStrength === "strong"
                                ? "bg-success"
                                : "bg-base-300"
                            }`}
                          ></div>
                        </div>
                        <p
                          className={`text-xs ${
                            passwordStrength === "weak"
                              ? "text-error"
                              : passwordStrength === "medium"
                              ? "text-warning"
                              : "text-success"
                          }`}
                        >
                          {passwordStrength === "weak" &&
                            "Weak - Use at least 6 characters"}
                          {passwordStrength === "medium" &&
                            "Medium - Consider adding more characters"}
                          {passwordStrength === "strong" && "Strong password!"}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-3">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-sm"
                        required
                      />
                      <span className="text-sm leading-relaxed">
                        I agree to the{" "}
                        <span className="text-primary hover:text-primary-focus font-medium hover:underline cursor-pointer">
                          terms of service
                        </span>{" "}
                        and{" "}
                        <span className="text-primary hover:text-primary-focus font-medium hover:underline cursor-pointer">
                          privacy policy
                        </span>
                      </span>
                    </label>
                  </div>

                  <button
                    className="btn btn-primary w-full text-base hover:scale-105 transition-transform duration-200"
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="size-5" />
                        Create Account
                      </>
                    )}
                  </button>

                  <div className="divider text-sm opacity-60">OR</div>

                  <div className="text-center">
                    <p className="text-base">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-primary hover:text-primary-focus font-semibold hover:underline transition-colors"
                      >
                        Sign in here
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* Right side with image */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-primary/20 to-secondary/20 items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="max-w-md p-8 relative z-10 animate-slide-right">
            <div className="relative aspect-square max-w-sm mx-auto mb-8 group">
              <div className="absolute inset-0 bg-secondary/20 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
              <img
                src="/i.png"
                alt="StreamStudio connection illustration"
                className="w-full h-full relative z-10 drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Join Our Growing Community
              </h2>
              <p className="opacity-80 text-base leading-relaxed">
                Experience seamless video streaming, real-time collaboration,
                and instant messaging all in one place
              </p>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="bg-base-100/50 backdrop-blur-sm p-3 rounded-lg">
                  <div className="text-2xl font-bold text-primary">10K+</div>
                  <div className="text-xs opacity-70">Active Users</div>
                </div>
                <div className="bg-base-100/50 backdrop-blur-sm p-3 rounded-lg">
                  <div className="text-2xl font-bold text-secondary">99%</div>
                  <div className="text-xs opacity-70">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
