import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-72 bg-base-200/95 backdrop-blur-md border-r border-base-300/50 hidden lg:flex flex-col h-screen sticky top-0 shadow-lg">
      {/* Logo Section */}
      <div className="p-6 border-b border-base-300/50">
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-90 transition-opacity group"
        >
          <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
            <ShipWheelIcon className="size-8 text-primary group-hover:rotate-180 transition-transform duration-500" />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wide">
            StreamStudio
          </span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/"
          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
            currentPath === "/"
              ? "bg-primary text-primary-content shadow-md"
              : "hover:bg-base-300 hover:shadow-sm"
          }`}
        >
          <HomeIcon
            className={`size-5 ${
              currentPath === "/"
                ? "text-primary-content"
                : "text-base-content/70 group-hover:text-primary"
            }`}
          />
          <span className="font-medium text-base">Home</span>
        </Link>

        <Link
          to="/friends"
          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
            currentPath === "/friends"
              ? "bg-primary text-primary-content shadow-md"
              : "hover:bg-base-300 hover:shadow-sm"
          }`}
        >
          <UsersIcon
            className={`size-5 ${
              currentPath === "/friends"
                ? "text-primary-content"
                : "text-base-content/70 group-hover:text-primary"
            }`}
          />
          <span className="font-medium text-base">Friends</span>
        </Link>

        <Link
          to="/notifications"
          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
            currentPath === "/notifications"
              ? "bg-primary text-primary-content shadow-md"
              : "hover:bg-base-300 hover:shadow-sm"
          }`}
        >
          <div className="relative">
            <BellIcon
              className={`size-5 ${
                currentPath === "/notifications"
                  ? "text-primary-content"
                  : "text-base-content/70 group-hover:text-primary"
              }`}
            />
            {/* Optional: Notification badge */}
            {/* <span className="absolute -top-1 -right-1 size-2 bg-error rounded-full"></span> */}
          </div>
          <span className="font-medium text-base">Notifications</span>
        </Link>
      </nav>

      {/* USER PROFILE SECTION */}
      <div className="p-4 border-t border-base-300 mt-auto">
        <Link
          to="/profile"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-base-300/50 transition-all duration-200 group"
        >
          <div className="avatar online">
            <div className="w-12 h-12 rounded-full ring-2 ring-primary/30 group-hover:ring-primary/60 transition-all overflow-hidden bg-base-100">
              {authUser?.profilePic ? (
                <img
                  src={authUser.profilePic}
                  alt={authUser?.fullName || "User"}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/20">
                  <span className="text-xl font-bold text-primary">
                    {authUser?.fullName?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-base truncate">
              {authUser?.fullName}
            </p>
            <p className="text-sm text-success flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-success inline-block animate-pulse" />
              Online
            </p>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <svg
              className="size-5 text-base-content/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Link>
      </div>
    </aside>
  );
};
export default Sidebar;
