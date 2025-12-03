/**
 * TypeScript types for Home Header API
 */

// ============================================================================
// Background Configuration Types
// ============================================================================

export type BackgroundType = 'solid' | 'gradient' | 'image' | 'animation' | 'video';

export interface BackgroundConfig {
  type: BackgroundType;
  config: SolidConfig | GradientConfig | ImageConfig | AnimationConfig | VideoConfig;
}

export interface SolidConfig {
  color: string;
}

export interface GradientConfig {
  colors: string[];
  start: { x: number; y: number };
  end: { x: number; y: number };
  type?: 'linear' | 'radial';
}

export interface ImageConfig {
  url: string;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat';
  opacity?: number;
}

export interface AnimationConfig {
  url: string;
  loop?: boolean;
  autoPlay?: boolean;
  speed?: number;
}

export interface VideoConfig {
  url: string;
  loop?: boolean;
  muted?: boolean;
  opacity?: number;
}

// ============================================================================
// Delivery Types
// ============================================================================

export interface DeliveryInfo {
  label: string;
  value: string;
  location: LocationInfo;
  estimatedRange?: EstimatedRange;
}

export interface LocationInfo {
  addressLine?: string;
  city: string;
  pincode: string;
  formatted: string;
}

export interface EstimatedRange {
  min: number;
  max: number;
  unit: 'minutes' | 'hours' | 'days';
}

// ============================================================================
// Search Types
// ============================================================================

export interface SearchConfig {
  placeholders: string[];
  voiceEnabled: boolean;
}

// ============================================================================
// User Types
// ============================================================================

export interface UserInfo {
  name: string;
  initials: string;
  avatarUrl?: string | null;
  notificationCount?: number;
}

// ============================================================================
// Tab Navigation Types
// ============================================================================

export interface TabsConfig {
  background?: BackgroundConfig | null;
  selectedTabId?: string;
  items: TabItem[];
}

export interface TabItem {
  id: string;
  label: string;
  icon: TabIcon;
  badge?: TabBadge | null;
  enabled: boolean;
  visible: boolean;
  analytics?: AnalyticsData;
}

export interface TabIcon {
  default: string;
  pressed: string;
}

export interface TabBadge {
  count: number;
  color?: string;
}

// ============================================================================
// Promotional Banner Types
// ============================================================================

export interface PromotionalBanner {
  id: string;
  priority: number;
  background: BackgroundConfig;
  content: BannerContent;
  cta?: BannerCTA;
  target: NavigationTarget;
  schedule?: BannerSchedule;
  analytics?: AnalyticsData;
}

export interface BannerContent {
  title?: string;
  subtitle?: string;
  imageUrl?: string | null;
}

export interface BannerCTA {
  text: string;
  style: 'primary' | 'secondary' | 'ghost';
}

export interface BannerSchedule {
  startDate: string;
  endDate: string;
  timezone: string;
}

// ============================================================================
// Navigation Target Types
// ============================================================================

export type NavigationType = 'screen' | 'webview' | 'deeplink' | 'modal';

export interface NavigationTarget {
  type: NavigationType;
  config: ScreenConfig | WebviewConfig | DeeplinkConfig | ModalConfig;
}

export interface ScreenConfig {
  screen: string;
  params?: Record<string, any>;
}

export interface WebviewConfig {
  url: string;
  title?: string;
}

export interface DeeplinkConfig {
  url: string;
}

export interface ModalConfig {
  component: string;
  props?: Record<string, any>;
}

// ============================================================================
// Analytics Types
// ============================================================================

export interface AnalyticsData {
  impressionTrackingId?: string;
  clickTrackingId?: string;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
}

// ============================================================================
// Section Backgrounds Types
// ============================================================================

export interface SectionBackgrounds {
  toolbar?: BackgroundConfig | null;
  searchBar?: BackgroundConfig | null;
  tabNavigation?: BackgroundConfig | null;
}

// ============================================================================
// Metadata Types
// ============================================================================

export interface ApiMetadata {
  lastUpdated: string;
  version: string;
  trackingId: string;
}

// ============================================================================
// Main API Response Type
// ============================================================================

export interface HomeHeaderApiResponse {
  delivery: DeliveryInfo;
  background: BackgroundConfig;
  sectionBackgrounds?: SectionBackgrounds;
  search: SearchConfig;
  user: UserInfo;
  tabs: TabsConfig;
  banners: PromotionalBanner[];
  metadata?: ApiMetadata;
}

// ============================================================================
// Helper Type Guards
// ============================================================================

export function isSolidBackground(config: BackgroundConfig): config is { type: 'solid'; config: SolidConfig } {
  return config.type === 'solid';
}

export function isGradientBackground(config: BackgroundConfig): config is { type: 'gradient'; config: GradientConfig } {
  return config.type === 'gradient';
}

export function isImageBackground(config: BackgroundConfig): config is { type: 'image'; config: ImageConfig } {
  return config.type === 'image';
}

export function isAnimationBackground(config: BackgroundConfig): config is { type: 'animation'; config: AnimationConfig } {
  return config.type === 'animation';
}

export function isVideoBackground(config: BackgroundConfig): config is { type: 'video'; config: VideoConfig } {
  return config.type === 'video';
}

export function isScreenNavigation(target: NavigationTarget): target is { type: 'screen'; config: ScreenConfig } {
  return target.type === 'screen';
}

export function isWebviewNavigation(target: NavigationTarget): target is { type: 'webview'; config: WebviewConfig } {
  return target.type === 'webview';
}

export function isDeeplinkNavigation(target: NavigationTarget): target is { type: 'deeplink'; config: DeeplinkConfig } {
  return target.type === 'deeplink';
}

export function isModalNavigation(target: NavigationTarget): target is { type: 'modal'; config: ModalConfig } {
  return target.type === 'modal';
}
