import SimpleSchema from "simpl-schema";

export const walletSchema =  new SimpleSchema({
  balance: {
    type: Number,
    min: 0,
    required: true,
    defaultValue: 0,
  },
  currency: {
    type: String,
    required: true,
    allowedValues:['USD', 'EUR'],
    defaultValue: 'USD',
  },
  createdAt: {
    type: Date,
    defaultValue: new Date(),
  },
}) ;
