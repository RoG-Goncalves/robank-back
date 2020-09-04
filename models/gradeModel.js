import mongoose from 'mongoose';

const gradeSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  subject: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  value: {
    type: Number,
    require: true,
    validate(value) {
      if (value < 0)
        throw new Error('Valor negativo não permitido');
    },
    min: 0
  },
  lastModified: {
    type: Date,
    default: Date.now,
  }
});

gradeSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();

  object.id = _id;

  return object;
});

const gradeModel = mongoose.model('grade', gradeSchema, 'grade');
export default gradeModel 