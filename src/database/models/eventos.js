import mongoose from 'mongoose';

const eveSchema = mongoose.Schema(
  {
    eventos: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const eveModel = mongoose.model('evento', eveSchema);

export default eveModel;
