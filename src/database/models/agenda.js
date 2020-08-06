import mongoose from 'mongoose';

const ageSchema = mongoose.Schema(
  {
    event: {
      type: String,
      required: true,
    },
    data: {
      type: String,
    },
    mes: String,
    user: {
      type: String,
      required: true,
    },
    tn: String,
  },
  {
    versionKey: false,
  }
);

const ageModel = mongoose.model('calendar', ageSchema, 'calendar');

export default ageModel;
