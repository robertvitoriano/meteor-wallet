import { Accounts } from "meteor/accounts-base";
import { ServiceConfiguration } from "meteor/service-configuration";
import { WalletsCollection } from "/api/collections/WalletsCollection";

Accounts.onCreateUser((options, user) => {
  const customizedUser = { ...user };

  WalletsCollection.insert({
    createdAt: new Date(),
    userId: customizedUser._id,
  });
  customizedUser.email = getEmailFromUser(user);
  return customizedUser;
});

function getEmailFromUser(user) {
  if (user.services?.google) {
    return user.services.google.email;
  }

  return user.emails[0].address;
}

Accounts.setDefaultPublishFields({
  ...Accounts._defaultPublishFields.projection,
  email: 1,
});
const settings = Meteor.settings || {};
Meteor.startup(() => {
  if (!settings.googleClientId || !settings.googleSecretKey) {
    throw new Error("Google login configuration not found");
  }

  ServiceConfiguration.configurations.upsert(
    {
      service: "google",
    },
    {
      $set: {
        service: "google",
        clientId: settings.googleClientId,
        secret: settings.googleSecretKey,
      },
    }
  );
});
