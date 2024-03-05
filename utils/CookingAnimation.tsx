import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
import { useState } from "react";

function CookingAnimation () {
  return (
      <LottieView
        source={require('../assets/Cooking Animation.json')}
        style={styles.animation}
        autoPlay
      />
  );
}
const styles = StyleSheet.create({
  animation: {
    width: '100%',
    height: '100%',
  },
});

export default CookingAnimation;