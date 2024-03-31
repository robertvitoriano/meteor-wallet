import { Accounts } from "meteor/accounts-base";
import { WalletsCollection } from "/api/collections/WalletsCollection";

Accounts.onCreateUser((options, user) => {
  const customizedUser = { ...user };

  WalletsCollection.insert({
    createdAt: new Date(),
    userId: customizedUser._id,
  });

  return customizedUser;
});
Accounts.onLogin((first) => {
  console.log(first.user.services);
  console.log(first.user.resume);
});
