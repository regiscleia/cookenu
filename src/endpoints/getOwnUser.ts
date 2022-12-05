import { Request, Response } from "express";
import { UserDataBase } from "../data/userDataBase";
import { User } from "../entidades/User";
import { Autheticator } from "../services/generateToken";

export async function getOwnuser(req:Request, res:Response){
    try{

        const id = req.params.id
        if(!id){
            res.status(400).send("necessario id do usuario")
        }
       const token = req.headers.authorization
     if(!token){
          res.status(200).send("necessario authorization")
       }
       const authetication = new Autheticator()
       const tokeData = authetication.getTokenData(token as string)

        const userDataBase = new UserDataBase()
        const data = await userDataBase.getOwn(id)

        res.send(User.userModel(data)).status(200)
    }catch(error:any){
        res.status(400).send(error.message)
    }
}