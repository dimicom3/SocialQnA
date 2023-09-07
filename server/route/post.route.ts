import express from "express";
import { AuthController } from "../controller/auth.controller";
import { PostController } from "../controller/post.controller";

const postController = new PostController();
const authController = new AuthController();

const router = express.Router();

router.get("/top10/", postController.getTop10);
router.get("/:id", postController.get);
router.get("/user/:userID", postController.getByUserID);
router.get("/community/:communityID", postController.getByCommunityID);
router.get("/edit-history/:id", postController.getEditHistory);
router.get("/following-users/:id", postController.getByFollowingUsers);
router.post("/", authController.isAuth, postController.create);
router.post("/visit/:id", postController.visitPost);
router.delete("/:id", postController.delete);
router.put("/:id", postController.update);

export default router
