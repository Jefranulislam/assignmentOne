import mongoose, { Document, Schema } from 'mongoose';
import Joi from 'joi'; // Import Joi for validation

export interface IUser extends Document {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders: {
    productName: string;
    price: number;
    quantity: number;
  }[];
}

const userSchema = new Schema({
  userId: { type: Number, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: [{ type: String }],
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  orders: [
    {
      productName: { type: String },
      price: { type: Number },
      quantity: { type: Number },
    },
  ],
});

// Add validation using Joi
userSchema.pre<IUser>('save', async function (next) {
  const schema = Joi.object({
    userId: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    fullName: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
    }),
    age: Joi.number().required(),
    email: Joi.string().email().required(),
    isActive: Joi.boolean().required(),
    hobbies: Joi.array().items(Joi.string()),
    address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      country: Joi.string().required(),
    }),
    orders: Joi.array().items(
      Joi.object({
        productName: Joi.string(),
        price: Joi.number(),
        quantity: Joi.number(),
      })
    ),
  });

  try {
    await schema.validateAsync(this.toObject());
    next();
  } catch (error) {
    next();
  }
});

export default mongoose.model<IUser>('User', userSchema);
