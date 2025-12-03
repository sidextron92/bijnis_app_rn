import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { sendOTP, selectAuthLoading, selectAuthError, clearError } from '../store/authSlice';
import { useTheme } from '@/theme';
import {
  SushiButton,
  SushiTextField,
  H1,
  Body,
  Caption,
} from 'design-system';

export function LoginForm() {
  const [phone, setPhone] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const { theme } = useTheme();

  const handleSendOTP = async () => {
    if (phone.length !== 10) {
      return;
    }

    dispatch(clearError());
    const result = await dispatch(sendOTP(phone));

    if (sendOTP.fulfilled.match(result)) {
      router.push({ pathname: '/(auth)/otp', params: { phone } });
    }
  };

  return (
    <View style={styles.container}>
      <H1 style={styles.title}>Login</H1>
      <Body color="secondary" style={styles.subtitle}>
        Enter your phone number to continue
      </Body>

      <SushiTextField
        label="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        maxLength={10}
        leadingIcon={<Body>+91</Body>}
        placeholder="Enter 10-digit number"
        error={!!error}
        supportText={error || undefined}
        containerStyle={styles.input}
      />

      <SushiButton
        title="Continue"
        onPress={handleSendOTP}
        disabled={phone.length !== 10}
        loading={isLoading}
        size="lg"
        fullWidth
        style={styles.button}
      />

      <Caption color="secondary" style={styles.terms}>
        By continuing, you agree to our Terms of Service and Privacy Policy
      </Caption>

      <View
        style={[
          styles.demoHint,
          {
            backgroundColor: theme.colors.background.brandSubtle,
            borderColor: theme.colors.border.brand,
          },
        ]}
      >
        <Caption color="brand">
          Demo: Enter any 10-digit number, OTP is 123456
        </Caption>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
  },
  terms: {
    textAlign: 'center',
  },
  demoHint: {
    marginTop: 24,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
});
