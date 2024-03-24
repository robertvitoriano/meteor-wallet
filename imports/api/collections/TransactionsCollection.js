import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import 'meteor/aldeed:collection2/static';

export const TRANSFER_TYPE = 'TRANSFER';
export const ADD_TYPE = 'ADD';

export const TransactionsCollection = new Mongo.Collection('transactions');


const TransactionsSchema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: [TRANSFER_TYPE, ADD_TYPE],
  },
  sourceWalletId: {
    type: String,
  },
  destinationContactId: {
    type: String,
    optional: true,
  },
  amount: {
    type: Number,
    min: 1,
  },
  createdAt: {
    type: Date,
  },
  userId: {
    type: String,
  },
});

TransactionsCollection.attachSchema(TransactionsSchema);
