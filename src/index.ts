import {app} from "./app";
import { getOwnuser } from "./endpoints/getOwnUser";
import { getRecipes } from "./endpoints/getRecipes";
import { getUser } from "./endpoints/getUsers";
import { login } from "./endpoints/login";
import { recipes } from "./endpoints/recipes";
import { signup } from "./endpoints/signup";


app.get ("/recipe/:id", getRecipes)
app.get("/user/profile", getUser)
app.get("/user/:id",getOwnuser)
app.post("/signup", signup)
app.post ("/user/login", login)
app.post ("/recipe", recipes)