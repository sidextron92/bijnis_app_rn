/**
 * Address types (extended)
 */

export type AddressLabel = 'Home' | 'Work' | 'Other';

export interface AddressBase {
  label: AddressLabel;
  fullAddress: string;
  landmark?: string;
  latitude: number;
  longitude: number;
}

export interface CreateAddressRequest extends AddressBase {
  isDefault?: boolean;
}

export interface UpdateAddressRequest extends Partial<AddressBase> {
  isDefault?: boolean;
}

export interface AddressSearchResult {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

export interface GeocodingResult {
  formattedAddress: string;
  latitude: number;
  longitude: number;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface DeliveryCheck {
  isServiceable: boolean;
  deliveryFee: number;
  estimatedTime: string; // "10-15 mins"
  message?: string;
}
