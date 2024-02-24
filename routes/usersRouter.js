import express from "express";
import validateBody from "../helpers/validateBody.js";
import { updateSubscriptionSchema } from "../schemas/usersSchemas.js";
import { authenticate } from "../middlewares/authenticate.js";
import { updateSubscriptionUser } from "../controllers/usersControllers.js";

const validateSubscription = validateBody(updateSubscriptionSchema);

const usersRouter = express.Router();

usersRouter.patch(
  "/",
  authenticate,
  validateSubscription,
  updateSubscriptionUser
);

export default usersRouter;
