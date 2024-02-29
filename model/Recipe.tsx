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
  preparation: string,
  cooking: string,
  rest: string,
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
  
export default Recipe;