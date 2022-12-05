import { Request, Response } from "express";
import { UserDataBase } from "../data/userDataBase";
import { User } from "../entidades/User";
import { Autheticator } from "../services/generateToken";
import { generateId } from "../services/genereteId";
import { HashManege } from "../services/hash";

export async function signup(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(422).send("dados obrigatorios");
    }
    if (password.lenght < 6) {
      res.status(422).send("minimo 6 caracteres");
    }
    const UserData = new UserDataBase();
    const usuarioEmail = await UserData.uniqueEmail(email);
    if (usuarioEmail) {
      res.status(409).send("email ja cadastrado");
    }
    const idGeneretor = new generateId();
    const id = idGeneretor.generate();

    const hashManege = new HashManege();
    const hashPassword = await hashManege.hash(password as string);

    const insertDB = new User(id, name, email, hashPassword);
    await UserData.newUser(insertDB);

    const authetication = new Autheticator();
    const token: string = authetication.generate({ id });

    res.send({ access_token: token }).status(200);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}
