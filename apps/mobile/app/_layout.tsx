import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { ThemeProvider, SushiSnackbarHost } from 'design-system';
import { SnackbarProvider, useSnackbar } from '@/contexts/SnackbarContext';
import { AnimatedSplash } from '@/components/AnimatedSplash';
import { useState } from 'react';

function LayoutContent() {
  const snackbarHostState = useSnackbar();

  return (
    <SushiSnackbarHost hostState={snackbarHostState}>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      </Stack>
    </SushiSnackbarHost>
  );
}

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <AnimatedSplash onFinish={() => setShowSplash(false)} />;
  }

  return (
    <Provider store={store}>
      <ThemeProvider initialMode="system">
        <SnackbarProvider>
          <GestureHandlerRootView style={styles.container}>
            <LayoutContent />
          </GestureHandlerRootView>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
