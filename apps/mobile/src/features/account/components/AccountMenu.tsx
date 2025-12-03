import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout, selectUser } from '@/features/auth/store/authSlice';
import { H2, Body, Caption, useTheme } from 'design-system';
import { spacing } from '@/theme/spacing';

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress: () => void;
}

export function AccountMenu() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { theme } = useTheme();
  const colors = theme.colors;
  const styles = useMemo(() => createStyles(colors), [colors]);

  const menuItems: MenuItem[] = [
    {
      icon: 'person-outline',
      title: 'My Profile',
      subtitle: 'Edit your personal information',
      onPress: () => {},
    },
    {
      icon: 'location-outline',
      title: 'Saved Addresses',
      subtitle: 'Manage your delivery addresses',
      onPress: () => {},
    },
    {
      icon: 'card-outline',
      title: 'Payment Methods',
      subtitle: 'Manage your saved cards',
      onPress: () => {},
    },
    {
      icon: 'notifications-outline',
      title: 'Notifications',
      subtitle: 'Manage notification preferences',
      onPress: () => {},
    },
    {
      icon: 'help-circle-outline',
      title: 'Help & Support',
      subtitle: 'FAQs and customer support',
      onPress: () => {},
    },
    {
      icon: 'document-text-outline',
      title: 'Terms & Conditions',
      onPress: () => {},
    },
    {
      icon: 'shield-outline',
      title: 'Privacy Policy',
      onPress: () => {},
    },
  ];

  const handleLogout = async () => {
    await dispatch(logout());
    router.replace('/(auth)/login');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <H2 style={styles.avatarText}>
            {user?.name?.charAt(0) || user?.phone?.charAt(0) || 'U'}
          </H2>
        </View>
        <View style={styles.profileInfo}>
          <Body weight="semibold" style={styles.name}>{user?.name || 'User'}</Body>
          <Caption color="secondary" style={styles.phone}>{user?.phone || '+91 XXXXXXXXXX'}</Caption>
        </View>
        <Pressable style={styles.editButton}>
          <Ionicons name="pencil-outline" size={20} color={colors.interactive.primary} />
        </Pressable>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <Pressable
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuIconContainer}>
              <Ionicons name={item.icon} size={22} color={colors.icon.secondary} />
            </View>
            <View style={styles.menuContent}>
              <Body weight="medium">{item.title}</Body>
              {item.subtitle && (
                <Caption color="secondary">{item.subtitle}</Caption>
              )}
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.icon.tertiary} />
          </Pressable>
        ))}
      </View>

      {/* Logout Button */}
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color={colors.text.error} />
        <Body weight="medium" style={styles.logoutText}>Logout</Body>
      </Pressable>

      <Caption color="secondary" style={styles.version}>Version 1.0.0</Caption>
    </ScrollView>
  );
}

const createStyles = (colors: ReturnType<typeof useTheme>['theme']['colors']) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.secondary,
    },
    profileSection: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background.primary,
      padding: spacing.lg,
      marginBottom: spacing.sm,
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.interactive.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarText: {
      color: colors.text.inverse,
    },
    profileInfo: {
      flex: 1,
      marginLeft: spacing.md,
    },
    name: {
      fontSize: 18,
    },
    phone: {
      marginTop: spacing.xs,
    },
    editButton: {
      padding: spacing.sm,
    },
    menuSection: {
      backgroundColor: colors.background.primary,
      marginBottom: spacing.sm,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.subtle,
    },
    menuIconContainer: {
      width: 40,
      alignItems: 'center',
    },
    menuContent: {
      flex: 1,
      marginLeft: spacing.sm,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background.primary,
      paddingVertical: spacing.lg,
      marginBottom: spacing.sm,
    },
    logoutText: {
      color: colors.text.error,
      marginLeft: spacing.sm,
    },
    version: {
      textAlign: 'center',
      paddingVertical: spacing.lg,
    },
  });
