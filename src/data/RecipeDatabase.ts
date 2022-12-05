import { BaseDataBase } from "./BaseDataBase";
import { Recipe } from "../entidades/recipesCreate";
import { recipes } from "../endpoints/recipes";

export class RecipeDatabase extends BaseDataBase {
  public async createRecipe(recipe: Recipe): Promise<void> {
    try {
      await BaseDataBase.connection("recipes").insert({
        id: recipe.getId(),
        title: recipe.getTitle(),
        description: recipe.getDescription(),
        created_at: recipe.getCreatedAt(),
      });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }



  public async getRecipeById(id: string): Promise<Recipe> {
    try {
      const result = await BaseDataBase.connection("recipes").where({ id });
      return result[0];
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
