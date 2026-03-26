import typegoose from "typegoose";

class users{
    @typegoose.prop()
    public name?:string; //both valus or undefined
    @typegoose.prop({required:true})
    public username!: string //need to have a value
    @typegoose.prop({required:true})
    public password!: string
}