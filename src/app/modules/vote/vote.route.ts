import { Router } from "express";
import * as voteController from "./vote.controller"; 
import protect from "../../../middlewares/auth.middleware";

const router = Router();

router.post("/:ideaId", protect(), voteController.handleVote);
router.get("/:ideaId", voteController.getIdeaVotes);

export default router;