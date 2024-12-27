// components/CustomSplash.tsx
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import Animated, { 
  useAnimatedStyle, 
  withTiming,
  useSharedValue,
  withSequence
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

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
    <Animated.View style={[styles.container, animatedStyle]}>

      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/images/log.png')}  
          style={styles.logo}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150, 
    height: 150, 
    resizeMode: 'contain',
    borderRadius:75,
  },
});