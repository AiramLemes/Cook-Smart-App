import { StyleSheet, View } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { Iconify } from "react-native-iconify";

const Stars = (props: { assessment: number, size: number }) => {
  const { assessment, size } = props;

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(assessment);
    const hasHalfStar = assessment - fullStars >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Iconify
            key={i}
            icon="ic:baseline-star"
            size={size}
            color={Colors.primary}
            style={styles.star}
          />
        );
      } else if (hasHalfStar && i === fullStars + 1) {
        stars.push(
          <Iconify
            key={i}
            icon="ic:baseline-star-half"
            size={size}
            color={Colors.primary}
            style={styles.star}
          />
        );
      } else {
        stars.push(
          <Iconify
            key={i}
            icon="ic:baseline-star"
            size={size}
            color={Colors.gray}
            style={styles.star}
          />
        );
      }
    }
    return stars;
  };

  return <View style={styles.container}>{renderStars()}</View>;
}

export default Stars;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
   
  },
});
