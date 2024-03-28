import Ingredient from "./Ingredient";

interface User {
  userName: string;
  email: string;
  image: string;
  recipesIds: string[];
  assessments: Map<string, number>;
  likedRecipes: string[];
  shoppingList: Ingredient[];
}



export default User;