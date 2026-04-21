import { prop, getModelForClass } from "@typegoose/typegoose";
import { Types } from "mongoose";

class Counter {
  @prop({ required: true, ref: "User" })
  public userId!: Types.ObjectId;
  @prop({ required: true, type: () => String })
  public name!: string;
  @prop({ default: 0, type: () => Number })
  public row?: number;
  @prop({ default: 0, type: () => Number })
  public stitch?: number;
  @prop({ default: 0, type: () => Number })
  public rowGoal?: number;
  @prop({ default: 0, type: () => Number })
  public stitchGoal?: number;
}

export const CounterModel = getModelForClass(Counter, {
  schemaOptions: { timestamps: true },
});

export const createProject = (values: Record<string, any>) =>
  new CounterModel(values).save().then((doc) => doc.toObject());
export const getProjectByUserId = (userId: string | Types.ObjectId) =>
  CounterModel.findOne({ userId });
export const getProjectsById = (id: string) => CounterModel.findById(id);
export const deleteProjectById = (
  id: string,
  userId: string | Types.ObjectId,
) =>
  CounterModel.findOneAndDelete({
    _id: id,
    userId: userId,
  });
export const updateProjectCountById = (
  id: string,
  userId: string | Types.ObjectId,
  data: { row?: number; stitch?: number },
) => CounterModel.findOneAndUpdate({ _id: id, userId }, data, { new: true });
