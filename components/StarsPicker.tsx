import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Iconify } from "react-native-iconify";
import Colors from "../constants/Colors";
import Recipe from "../model/Recipe";
import User from "../model/User";
import { updateRecipeAssessment } from "../repository/FirebaseRecipes";
import { getCurrentUser, updateUser } from "../repository/FirebaseUser";

const Stars = (props: {recipe: Recipe}) => {

  const recipe = props.recipe;
  const [assessment, setAssessment] = useState<number>(0);
  const [assessmentText, setAssessmentText] = useState<number>();
  
  useEffect( () => {

    const fetchUserData = async () => {
      try {
        const user: User | null = await getCurrentUser();
  
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


  const calculateNewRatings = (assessments: Map<string, number>, recipe: Recipe, assessment: number) => {
    let newNumberOfRatings = assessments.get(recipe.id) !== undefined ? recipe.numberOfRatings : recipe.numberOfRatings + 1;
    const newTotalRating = recipe.totalRating + assessment;
    const newAverageRating = newTotalRating / newNumberOfRatings;
    const normalizedAssessment = parseFloat(Math.max(0, Math.min(5, newAverageRating)).toFixed(2));
  
    return { newNumberOfRatings, newTotalRating, normalizedAssessment };
  };


  const handleAssessment = async (assessment: number) => {
    try {
      const currentUser: User | null = await getCurrentUser();
      
      if (currentUser) {
        const assessments: Map<string, number> = currentUser.assessments;
        assessments[recipe.id] = assessment;
  
        const { newNumberOfRatings, newTotalRating, normalizedAssessment } = calculateNewRatings(assessments, recipe, assessment);
  
        updateUser({assessments: assessments});
        updateRecipeAssessment(recipe.id, newNumberOfRatings, newTotalRating, normalizedAssessment);
  
        setAssessmentText(normalizedAssessment);
        setAssessment(assessment);
  
      } else {
        console.error('Unauthenticated user');
      }
    } catch (error) {
      console.error('Error setting an assessment', error);
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

