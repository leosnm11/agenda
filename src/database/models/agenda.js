import mongoose from 'mongoose';

const ageSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    turno: String,
    color: String,
    doc: [{ evento: String, data: String, mes: String, ano: String }],
  },
  {
    versionKey: false,
  }
);

const ageModel = mongoose.model('calendar', ageSchema, 'calendar');

export default ageModel;
