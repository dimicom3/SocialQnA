import express from "express"
import { AuthController } from "../controller/auth.controller";
import { UserController } from "../controller/user.controller";

const userController = new UserController();
const authController = new AuthController();

const router = express.Router();

router.get("/:id", userController.get);
router.get("/:userFollowID/follow/user/:userFollowingID", userController.getFollowUserInfo);
router.get("/:userID/follow/community/:communityID", userController.getFollowCommunityInfo);
router.get("/:id/followedCommunities", userController.getFollowedCommunities);

router.post("/", userController.create);
router.post("/like/post", userController.likePost);
router.post("/dislike/post", userController.dislikePost);
router.post("/like/comment", userController.likeComment);
router.post("/dislike/comment", userController.dislikeComment);
router.post("/follow/community", userController.followCommunity);
router.post("/follow/user", authController.isAuth, userController.followUser);

router.delete("/:id", userController.delete);

router.put("/:id", userController.update);


export default router;