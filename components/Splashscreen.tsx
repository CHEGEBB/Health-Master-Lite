// components/Splashscreen.tsx
import { View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import Animated, { 
  useAnimatedStyle, 
  withTiming,
  useSharedValue,
  withSequence
} from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function CustomSplash() {
  const router = useRouter();
  const opacity = useSharedValue(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      opacity.value = withSequence(
        withTiming(0, { duration: 1000 })
      );
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }));

  return (
    <AnimatedView 
      style={[animatedStyle]}
      className="flex-1 bg-white"
    >
      <Image 
        source={require('../assets/background.png')}
        className="absolute w-full h-full"
      />
      <View className="absolute inset-0 items-center justify-center">
        <Image 
          source={require('../assets/logo.png')}
          className="w-40 h-40"
        />
      </View>
    </AnimatedView>
  );
}