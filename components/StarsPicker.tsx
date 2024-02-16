import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../constants/Colors";
import { Iconify } from "react-native-iconify";
import Recipe from "../model/Recipe";
import { getCurrentUserData, updateUser } from "../repository/FirebaseUser";
import { updateRecipeAssessment } from "../repository/FirebaseRecipes";
import User from "../model/User";

const Stars = (props: {recipe: Recipe, size?: number}) => {

  const recipe = props.recipe;
  const [assessment, setAssessment] = useState<number>(0);
  const [assessmentText, setAssessmentText] = useState<number>();
  
  useEffect( () => {

    const fetchUserData = async () => {
      try {
        const user: User | null = await getCurrentUserData();
  
        if (user) {

          const assessment = user.assessments[recipe.id];
          setAssessment(assessment !== undefined ?  assessment : 0);
        }
        
      } catch (error) {
        console.log('ERROR: ', error)
      }
    }

    fetchUserData();
    setAssessmentText(recipe.assessment);

  }, []);


  const handleAssessment = async (assessment: number) => {
    try {
      
      const currentUser: User | null = await getCurrentUserData();
      console.log(currentUser)
      if (currentUser) {
        let newNumberOfRatings

        const assessments: Map<string, number> = currentUser.assessments;
        
        newNumberOfRatings = assessments[recipe.id] !== undefined ? recipe.numberOfRatings : recipe.numberOfRatings + 1;
        
        assessments[recipe.id] = assessment;

        updateUser({assessments: assessments});

        const newTotalRating = recipe.totalRating + assessment;
        
        const newAverageRating = newTotalRating / newNumberOfRatings;
        
        const normalizedAssessment = parseFloat(Math.max(0, Math.min(5, newAverageRating)).toFixed(2));
  
        updateRecipeAssessment(recipe.id, newNumberOfRatings, newTotalRating, normalizedAssessment);

        setAssessmentText(normalizedAssessment);
        setAssessment(assessment);

      } else {
        console.error('Usuario no autenticado');
      }
    } catch (error) {
      console.error('Error al manejar la valoración:', error);
    }
  };
  


  return (
    <View style={styles.container}>
      <Text style={styles.assessment}>{assessmentText}/5</Text>
      <View style={styles.stars}>
        <TouchableOpacity onPress={() => {handleAssessment(1)}}>
          <Iconify icon="ic:baseline-star" size={24} color={ assessment >= 1 ? Colors.primary : Colors.gray} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {handleAssessment(2)}}>
          <Iconify icon="ic:baseline-star" size={24} color={ assessment >= 2 ? Colors.primary : Colors.gray} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {handleAssessment(3)}}>
          <Iconify icon="ic:baseline-star" size={24} color={ assessment >= 3 ? Colors.primary : Colors.gray} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {handleAssessment(4)}}>
          <Iconify icon="ic:baseline-star" size={24} color={ assessment >= 4 ? Colors.primary : Colors.gray} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {handleAssessment(5)}}>
          <Iconify icon="ic:baseline-star" size={24} color={ assessment >= 5 ? Colors.primary : Colors.gray} />
        </TouchableOpacity>
        
      </View>

    </View>
  );
  
}

export default Stars;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginLeft: '3%'
  },

  assessment: {
    textAlign: 'center'
  }

});
