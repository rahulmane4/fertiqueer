import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { COLORS } from "../theme/Colors";

type Props = {
  active?: boolean;
  options: BottomTabNavigationOptions;
  onLayout: (e: LayoutChangeEvent) => void;
  onPress: () => void;
};

const SingleTab = ({ active, options, onLayout, onPress }: Props) => {
  const animatedCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, { duration: 250 }),
        },
      ],
    };
  });

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 0.5, { duration: 250 }),
    };
  }, []);
  return (
    <Pressable
      onPress={onPress}
      onLayout={onLayout}
      style={styles.singleTabContainer}
    >
      <View style={styles.iconContainer}>
        {options.tabBarIcon ? options.tabBarIcon(active) : <Text>?</Text>}
      </View>
      <Animated.View
        style={[
          styles.circle,
          animatedCircleStyle,
          { backgroundColor: active ? COLORS.BG : COLORS.BG },
        ]}
      >
        <Animated.View
          style={[animatedIconContainerStyles, styles.iconContainer]}
        >
          {options.tabBarIcon ? options.tabBarIcon(active) : <Text>?</Text>}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default SingleTab;

const styles = StyleSheet.create({
  singleTabContainer: {
    height: 65,
    width: 65,
    marginBottom: 10,
    marginTop: -15,
  },
  circle: {
    flex: 1,  
    borderRadius:50,
    backgroundColor: COLORS.BG,
  },
  not_circle: {
    flex: 1,
    bottom: 0,
    borderRadius:25,
    backgroundColor: COLORS.BG,
  },
  iconContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
