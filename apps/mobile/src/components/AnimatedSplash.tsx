import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { Audio } from 'expo-av';
import * as SplashScreen from 'expo-splash-screen';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface AnimatedSplashProps {
  onFinish: () => void;
}

export function AnimatedSplash({ onFinish }: AnimatedSplashProps) {
  const translateY = useRef(new Animated.Value(0)).current;
  const [soundLoaded, setSoundLoaded] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    let isMounted = true;

    const prepare = async () => {
      try {
        // Keep native splash screen visible until we're ready
        await SplashScreen.preventAutoHideAsync();

        // Load and prepare audio (only on native platforms)
        if (Platform.OS !== 'web') {
          try {
            // Configure audio mode for playback
            await Audio.setAudioModeAsync({
              playsInSilentModeIOS: true,
              staysActiveInBackground: false,
              shouldDuckAndroid: false,
            });

            // Load the sound
            const { sound } = await Audio.Sound.createAsync(
              require('../../assets/audio/shutter_sound.m4a'),
              { shouldPlay: false }
            );

            if (isMounted) {
              soundRef.current = sound;
              setSoundLoaded(true);
            }
          } catch (audioError) {
            console.warn('Failed to load splash audio:', audioError);
            // Continue without audio if it fails to load
            if (isMounted) {
              setSoundLoaded(true);
            }
          }
        } else {
          // On web, skip audio loading
          if (isMounted) {
            setSoundLoaded(true);
          }
        }
      } catch (error) {
        console.error('Error preparing splash screen:', error);
        if (isMounted) {
          setSoundLoaded(true);
        }
      }
    };

    prepare();

    return () => {
      isMounted = false;
      // Cleanup sound on unmount
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(console.error);
      }
    };
  }, []);

  useEffect(() => {
    if (!soundLoaded) return;

    const startAnimation = async () => {
      try {
        // Hide the native splash screen
        await SplashScreen.hideAsync();

        // Small delay to ensure everything is ready
        await new Promise(resolve => setTimeout(resolve, 100));

        // Play sound if available (native only)
        if (soundRef.current && Platform.OS !== 'web') {
          try {
            await soundRef.current.playAsync();
          } catch (playError) {
            console.warn('Failed to play splash audio:', playError);
          }
        }

        // Start the shutter animation (moving up)
        Animated.timing(translateY, {
          toValue: -SCREEN_HEIGHT, // Move completely off screen
          duration: 2000, // 2 seconds
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished) {
            // Clean up and notify parent
            if (soundRef.current) {
              soundRef.current.unloadAsync().catch(console.error);
            }
            onFinish();
          }
        });
      } catch (error) {
        console.error('Error starting splash animation:', error);
        onFinish();
      }
    };

    startAnimation();
  }, [soundLoaded, translateY, onFinish]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.imageContainer,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <Image
          source={require('../../assets/images/splash_green.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background behind the shutter
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
