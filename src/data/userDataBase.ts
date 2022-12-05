import { recipes } from "../endpoints/recipes";
import { Recipe } from "../entidades/recipesCreate";
import { User } from "../entidades/User";
import { BaseDataBase } from "./BaseDataBase";

export class UserDataBase extends BaseDataBase {
  public async newUser(user: User): Promise<void> {
    try {
      await BaseDataBase.connection("CreateUsers").insert({
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
      });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async uniqueEmail(email: string): Promise<User> {
    try {
      const user = await BaseDataBase.connection("CreateUsers")
        .select("*")
        .where({ email });
      return user[0] && User.userModel(user[0]);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
  // usuario pelo token
  public async getUsers(token: string): Promise<User[]> {
    try {
      const users = await BaseDataBase.connection("CreateUsers").where({
        token,
      });

      return users[0];
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  // pegar usuario pelo id

  public async getOwn(id: string): Promise<User> {
    try {
      const result = await BaseDataBase.connection("CreateUsers").where({ id });
      return result[0];
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
