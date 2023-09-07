import express from "express";
import { CommentController } from "../controller/comment.controller";

const commentController = new CommentController();

const router = express.Router();

router.get("/:id", commentController.get);
router.get("/post/:postID", commentController.getCommentsByPostID);

router.post("/", commentController.create);

router.delete("/:id", commentController.delete);

router.put("/:id", commentController.update);

// router.get("/user/:userID", postController.getByUserID);
// router.get("/community/:communityID", postController.getByCommunityID);
// router.post("/", postController.create);
// router.delete("/:id", postController.delete);


export default router
