import { Request, Response } from "express";
import { RecipeDatabase } from "../data/RecipeDatabase";
import { UserDataBase } from "../data/userDataBase";
import { Recipe } from "../entidades/recipesCreate";
import { Autheticator } from "../services/generateToken";
import { generateId } from "../services/genereteId";
import { HashManege } from "../services/hash";

export async function recipes(req: Request, res: Response) {
  try {
    const { title, description} = req.body;
    if (!title || !description ) {
      res.status(422).send("dados obrigatorios");
    }
    const idGeneretor = new generateId();
    const id = idGeneretor.generate();

    const repositorio = new RecipeDatabase();

    const recipe = new Recipe(id, title, description, new Date());
    const newReceita = await repositorio.createRecipe(recipe);

    const authetication = new Autheticator();
    const token: string = authetication.generate({ id });
    res.status(200).send({message:"cadastrado com sucesso"})
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}
