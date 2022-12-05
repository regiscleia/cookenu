import { Autheticator } from "../services/generateToken";
import { generateId } from "../services/genereteId";
import { HashManege } from "../services/hash";
import { Request, Response } from "express";
import { UserDataBase } from "../data/userDataBase";
import { User } from "../entidades/User";

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(422).send("Usuario não cadastrado");
    }
    if (password.lenght < 6) {
      res.status(422).send("minimo 6 caracteres");
    }
    const UserData = new UserDataBase();
    const usuarioEmail = await UserData.uniqueEmail(email);
    if (!usuarioEmail) {
      res.status(409).send("email não  cadastrado");
    }

    const hashManege = new HashManege();
    const confirmePassaword = await hashManege.compare(
      password,
      usuarioEmail.getPassword()
    );
    if (!confirmePassaword) {
      res.status(401).send("email ou senha incorreta");
    }
    const authetication = new Autheticator();
    const token: string = authetication.generate({ id: usuarioEmail.getId() });

    res.send({ access_token: token }).status(200);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}
