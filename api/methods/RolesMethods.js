import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import { SystemRoles } from "/utils/SystemRoles";

Meteor.methods({
  "roles.isAdmin"() {
    const { userId } = this;
    if (!userId) {
      throw new Error("Access denied");
    }

    return Roles.userIsInRole(userId, SystemRoles.ADMIN);
  },
});
