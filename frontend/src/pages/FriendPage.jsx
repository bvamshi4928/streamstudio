import React from "react";
import { useQuery } from "@tanstack/react-query";
import FriendCard from "../components/FriendCard";
import { getUserFriends } from "../lib/api";  // Make sure this exists & works

const FriendPage = () => {
  const { data: friends = [], isLoading, error } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading friends...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500">Failed to load friends.</p>;
  }

  return (
    <div className="p-6 lg:ml-64">
      <h2 className="text-2xl font-bold mb-4">Your Friends</h2>

      {friends.length === 0 ? (
        <p className="text-sm text-gray-400">You don't have any friends yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {friends.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendPage;
