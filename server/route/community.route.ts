import express from "express"
import { CommunityController } from "../controller/community.controller";

const router = express.Router();

const communityController = new CommunityController();

router.get("/getAll", communityController.getAll);

router.get("/:id", communityController.get);

router.get("/:id/allUsers", communityController.getAllUsers)

router.post("/", communityController.create);

router.put("/:id", communityController.update);

router.delete("/:id", communityController.delete);

export default router

