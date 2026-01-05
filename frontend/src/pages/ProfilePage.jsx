import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Camera,
  Mail,
  MapPin,
  Calendar,
  Users,
  MessageSquare,
  Video,
  Edit2,
  Save,
  X,
} from "lucide-react";
import useAuthUser from "../hooks/useAuthUser";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
  });

  // Fetch profile stats
  const { data: stats } = useQuery({
    queryKey: ["profileStats"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/profile/stats");
      return res.data;
    },
  });

  // Update profile mutation
  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.put("/users/profile", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });

  // Upload profile picture mutation
  const { mutate: uploadProfilePic, isPending: isUploading } = useMutation({
    mutationFn: async (imageUrl) => {
      const res = await axiosInstance.post("/users/profile/picture", {
        profilePic: imageUrl,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Profile picture updated!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to upload picture");
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      // Create a preview URL from the file
      const reader = new FileReader();
      reader.onloadend = () => {
        // For now, using a placeholder. In production, upload to a service like Cloudinary
        const placeholderUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${authUser?.fullName}`;
        uploadProfilePic(placeholderUrl);
        toast.info(
          "Using placeholder avatar. Integrate cloud storage for actual uploads."
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateProfile(editData);
  };

  const handleCancel = () => {
    setEditData({
      fullName: authUser?.fullName || "",
      bio: authUser?.bio || "",
      nativeLanguage: authUser?.nativeLanguage || "",
      learningLanguage: authUser?.learningLanguage || "",
    });
    setIsEditing(false);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Card */}
        <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-primary to-secondary relative">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
          </div>

          {/* Profile Content */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-20 relative">
              {/* Profile Picture */}
              <div className="relative group">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full ring-4 ring-base-100 bg-base-200 overflow-hidden">
                    {authUser?.profilePic ? (
                      <img
                        src={authUser.profilePic}
                        alt={authUser.fullName}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/20">
                        <span className="text-5xl font-bold text-primary">
                          {authUser?.fullName?.charAt(0)?.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <label className="absolute bottom-2 right-2 btn btn-circle btn-sm btn-primary shadow-lg cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="size-4" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                </label>
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-base-100/80 rounded-full">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 pb-2">
                {!isEditing ? (
                  <>
                    <h1 className="text-3xl font-bold mb-1">
                      {authUser?.fullName}
                    </h1>
                    <p className="text-base-content/70 mb-2">
                      {authUser?.email}
                    </p>
                    <p className="text-base-content/80 max-w-2xl">
                      {authUser?.bio || "No bio yet. Click edit to add one!"}
                    </p>
                  </>
                ) : (
                  <div className="space-y-3">
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-md"
                      value={editData.fullName}
                      onChange={(e) =>
                        setEditData({ ...editData, fullName: e.target.value })
                      }
                      placeholder="Full Name"
                    />
                    <textarea
                      className="textarea textarea-bordered w-full max-w-2xl"
                      rows="3"
                      value={editData.bio}
                      onChange={(e) =>
                        setEditData({ ...editData, bio: e.target.value })
                      }
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                )}
              </div>

              {/* Edit Button */}
              <div className="flex gap-2">
                {!isEditing ? (
                  <button
                    className="btn btn-primary gap-2"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 className="size-4" />
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      className="btn btn-primary gap-2"
                      onClick={handleSave}
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <Save className="size-4" />
                      )}
                      Save
                    </button>
                    <button
                      className="btn btn-ghost gap-2"
                      onClick={handleCancel}
                    >
                      <X className="size-4" />
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 mt-6 text-base-content/70">
              <div className="flex items-center gap-2">
                <Calendar className="size-5" />
                <span>Joined {formatDate(authUser?.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="size-5" />
                <span>{stats?.friendsCount || 0} Friends</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-base-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="size-6 text-primary" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">
              {stats?.friendsCount || 0}
            </h3>
            <p className="text-base-content/70">Friends</p>
          </div>

          <div className="bg-base-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <MessageSquare className="size-6 text-secondary" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">
              {stats?.totalChats || 0}
            </h3>
            <p className="text-base-content/70">Total Chats</p>
          </div>

          <div className="bg-base-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Video className="size-6 text-accent" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">
              {stats?.totalCalls || 0}
            </h3>
            <p className="text-base-content/70">Video Calls</p>
          </div>

          <div className="bg-base-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-success/10 rounded-lg">
                <Users className="size-6 text-success" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">
              {stats?.pendingRequests || 0}
            </h3>
            <p className="text-base-content/70">Pending Requests</p>
          </div>
        </div>

        {/* Language Learning Info */}
        <div className="bg-base-100 rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MapPin className="size-6 text-primary" />
            </div>
            Language Profile
          </h2>

          {!isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-base-200 rounded-xl">
                <h3 className="text-sm font-semibold text-base-content/70 mb-2">
                  Native Language
                </h3>
                <p className="text-xl font-bold">
                  {authUser?.nativeLanguage || "Not set"}
                </p>
              </div>
              <div className="p-4 bg-base-200 rounded-xl">
                <h3 className="text-sm font-semibold text-base-content/70 mb-2">
                  Learning Language
                </h3>
                <p className="text-xl font-bold">
                  {authUser?.learningLanguage || "Not set"}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Native Language
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={editData.nativeLanguage}
                  onChange={(e) =>
                    setEditData({ ...editData, nativeLanguage: e.target.value })
                  }
                  placeholder="e.g., English"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Learning Language
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={editData.learningLanguage}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      learningLanguage: e.target.value,
                    })
                  }
                  placeholder="e.g., Spanish"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
