import { getRecipeById, url } from "../api/crudRecipe.js";

//get the recipeId from sessionStorage
const recipeId = sessionStorage.getItem("recipeId");

const recipe = await getRecipeById(recipeId, url);

const details = document.querySelector("recipe-details");

details.recipeName = recipe.title;
details.instructions = recipe.instructions;
details.setAttribute("ingredients", JSON.stringify(recipe.ingredients));
