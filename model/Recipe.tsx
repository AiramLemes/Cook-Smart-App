import { Timestamp } from "firebase/firestore";
import Ingredient from "./Ingredient";

interface Recipe {
  userId: string;
  title: string,
  mainImage: string,
  id: string,
  images: string[],
  ingredients: Ingredient[],
  steps: string[],
  lang: string,
  preparation: RecipeTime,
  cooking: RecipeTime,
  rest: RecipeTime,
  servings: number,
  difficulty: number,
  category: string,
  timestamp: any,
  likes: number,
  likedUsersId: string[],
  numberOfRatings: number;
  totalRating: number;
  assessment: number,
}


interface RecipeTime {
  amount: number,
  unit: string, 
  index: number
}
  
export default Recipe;