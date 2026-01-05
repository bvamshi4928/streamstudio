import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getRecommendedUsers,
  getMyFriends,
  sendFriendRequest,
  acceptFriendRequest,
  getFriendRequests,
  getOutgoingFriendReqs,
  getProfileStats,
  updateProfile,
  updateProfilePicture,
} from "../controllers/user.controller.js";
const router = express.Router();

router.use(protectRoute);

// User routes
router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

// Profile routes
router.get("/profile/stats", getProfileStats);
router.put("/profile", updateProfile);
router.post("/profile/picture", updateProfilePicture);

export default router;
