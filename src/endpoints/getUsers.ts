import { Request, Response } from "express";
import { UserDataBase } from "../data/userDataBase";
import { Autheticator } from "../services/generateToken";
import { User } from "../entidades/User";

export async function getUser(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(422).send("necessario uma autorization");
    }

    const authetication = new Autheticator();
    const data = authetication.getTokenData(token as string);

    const userDataBase = new UserDataBase();
    const result = await userDataBase.getOwn(data.id);
    const user = User.userModel(result);

    res
      .send({
        user: {
          id: user.getId(),
          name: user.getName(),
          email: user.getEmail(),
        },
      })
      .status(200);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}
