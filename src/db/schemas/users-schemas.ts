import {prop, getModelForClass} from "@typegoose/typegoose";

class Users{
    @prop()
    public name?:string; //both valus or undefined
    @prop({required:true})
    public username!: string //need to have a value
    @prop({required:true})
    public password!: string
    @prop()
    public refreshToken?: string;
}

const UserModel = getModelForClass(Users);

export default UserModel;