
export const loginSchema = {
    username:{
        notEmpty: {
            errorMessage:"Username is required"
        }
    },
    password:{
        notEmpty: {
            errorMessage:"Password is required"
        }
    }
}