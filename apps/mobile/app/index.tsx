import { Redirect } from 'expo-router';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/features/auth/store/authSlice';

export default function Index() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Redirect href="/(main)/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/login" />;
}
