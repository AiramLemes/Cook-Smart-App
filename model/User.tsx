interface User {
  userName: string;
  email: string;
  image: string;
  recipesIds: string[];
  assessments: Map<string, number>;
  likedRecipes: string[];
}



export default User;