import SimpleSchema from "simpl-schema";

export const transactionSchema =  new SimpleSchema({
  isTransfering: {
    type: Boolean,
  },
  sourceWalletId: {
    type: String,
  },
  destinationWalletId: {
    type: String,
    optional: true
  },
  amount:{
    type: Number,
    min: 0,
  }
});
