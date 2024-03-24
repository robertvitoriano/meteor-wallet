import SimpleSchema from "meteor/aldeed:simple-schema";

SimpleSchema.defineValidationErrorTransform((error) =>{
  const ddpError = new Meteor.Error(error.message);
  ddpError.error = "validation-error";
  ddpError.details = error.details;
  return ddpError;
})
