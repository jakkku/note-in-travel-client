import { useEffect, useState } from "react";
import { Animated } from "react-native";

function useAnimation(initialState, toValue, duration) {
  const [animation] = useState(new Animated.Value(initialState));

  useEffect(() => {
    Animated.timing(animation, {
      toValue,
      duration,
    }).start();
  }, [animation, toValue, duration]);

  return animation;
}

export default useAnimation;
