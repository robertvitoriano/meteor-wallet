import { Meteor } from "meteor/meteor";

// @ts-ignore
import { Roles } from "meteor/alanning:roles";
import { SystemRoles } from "/utils/SystemRoles";

Meteor.startup(() => {
  Roles.createRole(SystemRoles.ADMIN, { unlessExists: true });
  const user = Meteor.users.findOne({ email: "robert@robert.com" });
  if (!user || Roles.userIsInRole(user._id, SystemRoles.ADMIN)) {
    return;
  }
  Roles.addUsersToRoles(user._id, SystemRoles.ADMIN);
});
