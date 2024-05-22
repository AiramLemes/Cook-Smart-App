import React from "react";
import { StyleSheet, View } from "react-native";
import { Iconify } from "react-native-iconify";
import Colors from "../constants/Colors";

const Stars = (props: { assessment: number, size: number }) => {
  const { assessment, size } = props;

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(assessment);
    const hasHalfStar = assessment - fullStars >= 0.5;

    for (let i = 1; i <= 5; i++) {
      let star;
      if (i <= fullStars) {
        star = <Iconify key={i} icon="ic:baseline-star" size={size} color={Colors.primary} style={styles.star} />;
      } else if (hasHalfStar && i === fullStars + 1) {
        star = <Iconify key={i} icon="ic:baseline-star-half" size={size} color={Colors.primary} style={styles.star} />;
      } else {
        star = <Iconify key={i} icon="ic:baseline-star" size={size} color={Colors.gray} style={styles.star} />;
      }
      stars.push(star);
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
