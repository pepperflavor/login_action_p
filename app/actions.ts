"use server"

import { resolve } from "path"
import { z} from "zod"

const checkPassword = (password : string) =>{
    if(password == '12345') return true
    else{
        return false
    }
}

const formSchema = z.object({
    username :  z.string().min(5, "Username should be at least 5 charactors long."),
    email : z.string().email().refine((email) => email.includes("@zod.com") ? true : false, "Only @zod.com emails are allowed"),
    password : z.string().refine(checkPassword, "Password is wrong")
    // .refine((password)=> {
    //     if(password.match(/[^0-9]/)){
    //         return true}else{
    //             return false
    //         }}, "Password sould be contain at least number (0123456789)")
})

    export async function handlePassword(preState:any, formData: FormData){
    const data = {
        usename : formData.get("username"),
        email : formData.get("email"),
        password : formData.get("password")
    }

    const result = formSchema.safeParse(data)

    await new Promise((resolve) => setTimeout(resolve, 2000))
    if(!result.success){
        return result.error.flatten()
    }else{
        console.log(result.data)
    }

    
}
// const inputPassword = formData.get("password")
// console.log(" 입력한 비밀번호?")
// console.log(inputPassword)
// let error: string;
//     if(inputPassword == "12345"){
//         await new Promise((resolve) => setTimeout(resolve,3000))
//         return error = ""
//     }else if(inputPassword != "12345"){
//         return error = "Wrong password"

//     }