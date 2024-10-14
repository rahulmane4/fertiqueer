import { LayoutChangeEvent, StyleSheet, Text, View } from "react-native";
import React, { useReducer } from "react";
import { ClipPath, Defs, Mask, Path, Rect, Svg } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { COLORS } from "../theme/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { SCREEN_WIDTH } from "../theme/Screen";
import SingleTab from "./SingleTab";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const AnimatedTabBar = ({
  state: { index: activeIndex, routes },
  navigation,
  descriptors,
}: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets();

  const reducer = (state: any, action: { x: number; index: number }) => {
    return [...state, { x: action.x, index: action.index }];
  };

  const [layout, dispatch] = useReducer(reducer, []);
  console.log(layout);
  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    dispatch({ x: event.nativeEvent.layout.x, index });
  };

  const xOffset = useDerivedValue(() => {
    if (layout.length !== routes.length) return 0;
    return [...layout].find(({ index }) => index === activeIndex)?.x - 25;
  }, [activeIndex, layout]);

  const animatedStyles = useAnimatedProps(() => {
    return {
      transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }],
    };
  });

  return (
    <View style={[styles.tabBarContainer, { paddingBottom: bottom }]}>
      <AnimatedSvg
        width={SCREEN_WIDTH}
         
      >
        
      </AnimatedSvg>
      <View style={styles.tabs}>
        {routes.map((route, index) => {
          const active = index === activeIndex;
          const option = descriptors[route.key].options;
          return (
            <SingleTab
              key={route.key}
              active={active}
              options={option}
              onLayout={(e) => handleLayout(e, index)}
              onPress={() => {
                console.log("route.name" + route.name);
                if (route.name == "Chat") {
                  navigation.navigate("ChatScreen");
                } else {
                  navigation.navigate(route.name);
                }
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default AnimatedTabBar;

const styles = StyleSheet.create({
  tabBarContainer: {
    height: 65,
    backgroundColor: COLORS.BLACK1,
    position: "absolute",
    width: "100%",
    marginBottom: -10,
    bottom: 0,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "absolute",
    width: "100%", 
    backgroundColor: "black",
  },
  activeBG: {
    backgroundColor:'black'
  },
});
