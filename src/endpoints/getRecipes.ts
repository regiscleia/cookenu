import { Request, Response } from "express";
import { RecipeDatabase } from "../data/RecipeDatabase";
import { UserDataBase } from "../data/userDataBase";
import { Autheticator } from "../services/generateToken";
import { Recipe } from "../entidades/recipesCreate";

export async function getRecipes(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send("necessario id da receita");
    }
    const token = req.headers.authorization;
    if (!token) {
      res.status(200).send("necessario authorization");
    }
    const authetication = new Autheticator();
    const tokeData = authetication.getTokenData(token as string);

    const RecipeDB: any = new RecipeDatabase();
    const data = await RecipeDB.getRecipeById(id);
    if (!data) {
      throw new Error("Não encontrado")
    }
    res.send(Recipe.userModelRecipes(data)).status(200);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}
