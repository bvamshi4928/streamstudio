import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  // const queryClient = useQueryClient();
  // const { mutate: logoutMutation } = useMutation({
  //   mutationFn: logout,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-200/95 backdrop-blur-md border-b border-base-300/50 sticky top-0 z-30 h-16 flex items-center shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <ShipWheelIcon className="size-7 text-primary" />
                </div>
                <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wide">
                  StreamStudio
                </span>
              </Link>
            </div>
          )}

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Notification button */}
            <Link to="/notifications">
              <button className="btn btn-ghost btn-circle hover:bg-base-300 transition-all duration-200 hover:scale-105">
                <div className="indicator">
                  <BellIcon className="h-5 w-5 text-base-content/80" />
                  {/* Optional: Add notification badge */}
                  {/* <span className="badge badge-xs badge-primary indicator-item"></span> */}
                </div>
              </button>
            </Link>

            {/* Theme selector */}
            <div className="hidden sm:block">
              <ThemeSelector />
            </div>

            {/* Profile image with better styling */}
            <Link to="/profile" className="group">
              <div className="avatar online placeholder">
                <div className="w-10 h-10 rounded-full ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all duration-300 overflow-hidden bg-base-300">
                  {authUser?.profilePic ? (
                    <img
                      src={authUser.profilePic}
                      alt={authUser?.fullName || "User"}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-lg font-semibold text-primary">
                      {authUser?.fullName?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  )}
                </div>
              </div>
            </Link>

            {/* Logout button */}
            <button
              className="btn btn-ghost btn-circle hover:bg-error/10 hover:text-error transition-all duration-200 hover:scale-105"
              onClick={logoutMutation}
              title="Logout"
            >
              <LogOutIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
