interface User {
  userName: string;
  email: string;
  image: string;
  recipesIds: string[];
  assessments: Map<string, number>;
}



export default User;