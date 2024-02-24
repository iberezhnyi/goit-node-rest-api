import HttpError from "../helpers/HttpError.js";
import { User } from "../models/user.js";

export const updateSubscriptionUser = async (req, res, next) => {
  try {
    const { id: owner, subscription } = req.user;

    const { subscription: newSubscription } = req.body;

    if (subscription === newSubscription) {
      throw HttpError(400, "This rate plan is already applied!");
    }

    const result = await User.findByIdAndUpdate(
      owner,
      { subscription: newSubscription },
      { new: true }
    );

    res
      .status(200)
      .send({ email: result.email, subscription: result.subscription });
  } catch (error) {
    next(error);
  }
};
