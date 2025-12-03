import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { verifyOTP, sendOTP, selectAuthLoading, selectAuthError, clearError } from '../store/authSlice';
import { useTheme } from '@/theme';
import {
  SushiButton,
  H1,
  Body,
  Caption,
  SushiLoader,
} from 'design-system';

interface OTPFormProps {
  phone: string;
}

const OTP_LENGTH = 6;

export function OTPForm({ phone }: OTPFormProps) {
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(''));
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef<TextInput[]>([]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const { theme } = useTheme();

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when complete
    if (newOtp.every(digit => digit) && newOtp.join('').length === OTP_LENGTH) {
      handleVerifyOTP(newOtp.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async (otpValue: string) => {
    dispatch(clearError());
    const result = await dispatch(verifyOTP({ phone, otp: otpValue }));

    if (verifyOTP.fulfilled.match(result)) {
      router.replace('/(main)/(tabs)/home');
    }
  };

  const handleResendOTP = () => {
    dispatch(sendOTP(phone));
    setResendTimer(30);
  };

  return (
    <View style={styles.container}>
      <H1 style={styles.title}>Verify OTP</H1>
      <Body color="secondary" style={styles.subtitle}>
        Enter the 6-digit code sent to +91 {phone}
      </Body>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => {
              if (ref) inputRefs.current[index] = ref;
            }}
            style={[
              styles.otpInput,
              {
                borderColor: digit
                  ? theme.colors.border.brand
                  : theme.colors.border.default,
                backgroundColor: digit
                  ? theme.colors.background.brandSubtle
                  : theme.colors.background.primary,
                color: theme.colors.text.primary,
              },
            ]}
            maxLength={1}
            keyboardType="number-pad"
            value={digit}
            onChangeText={value => handleOtpChange(value, index)}
            onKeyPress={e => handleKeyPress(e, index)}
          />
        ))}
      </View>

      {error && (
        <Caption color="error" style={styles.error}>
          {error}
        </Caption>
      )}

      {isLoading && (
        <View style={styles.loader}>
          <SushiLoader size="md" />
        </View>
      )}

      <View style={styles.resendContainer}>
        {resendTimer > 0 ? (
          <Body color="secondary">Resend OTP in {resendTimer}s</Body>
        ) : (
          <SushiButton
            title="Resend OTP"
            variant="text"
            onPress={handleResendOTP}
          />
        )}
      </View>

      <SushiButton
        title="Change phone number"
        variant="text"
        onPress={() => router.back()}
      />
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  otpInput: {
    width: 48,
    height: 52,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  error: {
    marginBottom: 12,
    textAlign: 'center',
  },
  loader: {
    marginVertical: 16,
    alignItems: 'center',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
});
