import Mongo from "../utils/mongoose";
const SchemaDefinition = {
  usertype: {
    type: String,
    required: true,
    enum: ['admin', 'master', 'user'],
    default: 'user'
  },
  created: {
    type: Date,
    required: true,
    default: new Date()
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  tel: {
    type: String,
    required: true,
    uniqure: true
  },
  salt: {
    type: String,
    required: true
  }
};

const authModel = new Mongo().releaseModel('auth', SchemaDefinition)

export default authModel;