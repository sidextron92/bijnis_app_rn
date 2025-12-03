import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { SushiTextField } from './SushiTextField';
import { ThemeProvider } from '../../theme';

// Simple icon components for stories
const SearchIcon = () => (
  <Text style={{ fontSize: 16, color: '#666' }}>🔍</Text>
);
const MailIcon = () => (
  <Text style={{ fontSize: 16, color: '#666' }}>✉️</Text>
);
const LockIcon = () => (
  <Text style={{ fontSize: 16, color: '#666' }}>🔒</Text>
);
const UserIcon = () => (
  <Text style={{ fontSize: 16, color: '#666' }}>👤</Text>
);
const PhoneIcon = () => (
  <Text style={{ fontSize: 16, color: '#666' }}>📞</Text>
);
const LocationIcon = () => (
  <Text style={{ fontSize: 16, color: '#666' }}>📍</Text>
);
const CalendarIcon = () => (
  <Text style={{ fontSize: 16, color: '#666' }}>📅</Text>
);

const meta: Meta<typeof SushiTextField> = {
  title: 'Sushi/Atoms/TextField',
  component: SushiTextField,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'underline'],
      description: 'TextField variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'TextField size',
    },
    labelBehavior: {
      control: 'select',
      options: ['static', 'floating'],
      description: 'Label behavior - static (above) or floating (animated)',
    },
    label: {
      control: 'text',
      description: 'Input label',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    supportText: {
      control: 'text',
      description: 'Support/helper text below input',
    },
    isError: {
      control: 'boolean',
      description: 'Error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    readOnly: {
      control: 'boolean',
      description: 'Read-only state',
    },
    required: {
      control: 'boolean',
      description: 'Required field indicator',
    },
    showResetButton: {
      control: 'boolean',
      description: 'Show reset/clear button',
    },
    prefixText: {
      control: 'text',
      description: 'Prefix text before input',
    },
    suffixText: {
      control: 'text',
      description: 'Suffix text after input',
    },
    secureTextEntry: {
      control: 'boolean',
      description: 'Password input',
    },
  },
  args: {
    placeholder: 'Enter text...',
    variant: 'outlined',
    size: 'md',
  },
  decorators: [
    (Story) => (
      <ThemeProvider initialMode="light">
        <View style={{ padding: 16, width: 320 }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SushiTextField>;

// Default
export const Default: Story = {
  args: {
    placeholder: 'Enter your text...',
  },
};

// With Label
export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
};

// With Support Text
export const WithSupportText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    supportText: 'Username must be 3-20 characters',
  },
};

// Required Field
export const Required: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
  },
};

// Error State
export const Error: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    text: 'invalid-email',
    isError: true,
    supportText: 'Please enter a valid email address',
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    text: 'user@example.com',
    disabled: true,
  },
};

// Read Only
export const ReadOnly: Story = {
  args: {
    label: 'Account ID',
    text: 'ACC-12345-XYZ',
    readOnly: true,
    supportText: 'This field cannot be edited',
  },
};

// Password Input
export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    secureTextEntry: true,
  },
};

// With Reset Button
export const WithResetButton: Story = {
  render: () => {
    const [value, setValue] = useState('Some text to clear');
    return (
      <SushiTextField
        label="Search"
        placeholder="Type to search..."
        text={value}
        onTextChange={setValue}
        showResetButton
      />
    );
  },
};

// With Prefix and Suffix Text
export const WithPrefixSuffixText: Story = {
  args: {
    label: 'Price',
    placeholder: '0',
    prefixText: '$',
    suffixText: '.00',
  },
};

// With Leading Icon
export const WithLeadingIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leadingIcon: <SearchIcon />,
  },
};

// With Trailing Icon
export const WithTrailingIcon: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter email',
    trailingIcon: <MailIcon />,
  },
};

// With Both Icons
export const WithBothIcons: Story = {
  args: {
    label: 'Location',
    placeholder: 'Enter location',
    leadingIcon: <LocationIcon />,
    trailingIcon: <SearchIcon />,
  },
};

// With Reset Button and Icon
export const WithResetButtonAndIcon: Story = {
  render: () => {
    const [value, setValue] = useState('New York');
    return (
      <SushiTextField
        label="Search Location"
        placeholder="Enter city name..."
        text={value}
        onTextChange={setValue}
        leadingIcon={<SearchIcon />}
        showResetButton
      />
    );
  },
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiTextField
        label="Outlined"
        placeholder="Outlined variant"
        variant="outlined"
      />
      <SushiTextField
        label="Filled"
        placeholder="Filled variant"
        variant="filled"
      />
      <SushiTextField
        label="Underline"
        placeholder="Underline variant"
        variant="underline"
      />
    </View>
  ),
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiTextField
        label="Small"
        placeholder="Small input"
        size="sm"
      />
      <SushiTextField
        label="Medium"
        placeholder="Medium input"
        size="md"
      />
      <SushiTextField
        label="Large"
        placeholder="Large input"
        size="lg"
      />
    </View>
  ),
};

// States Comparison
export const StatesComparison: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiTextField
        label="Default"
        placeholder="Default state"
      />
      <SushiTextField
        label="With Value"
        placeholder="With value"
        text="Some text"
      />
      <SushiTextField
        label="Error"
        placeholder="Error state"
        text="Invalid input"
        isError
        supportText="This field has an error"
      />
      <SushiTextField
        label="Disabled"
        placeholder="Disabled state"
        text="Cannot edit"
        disabled
      />
      <SushiTextField
        label="Read Only"
        text="Read only value"
        readOnly
      />
    </View>
  ),
};

// Form Example
export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      password: '',
    });

    const updateField = (field: string) => (value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
      <View style={{ gap: 16 }}>
        <SushiTextField
          label="Full Name"
          placeholder="Enter your full name"
          required
          leadingIcon={<UserIcon />}
          text={formData.name}
          onTextChange={updateField('name')}
          showResetButton
        />
        <SushiTextField
          label="Email"
          placeholder="Enter your email"
          required
          leadingIcon={<MailIcon />}
          keyboardType="email-address"
          autoCapitalize="none"
          text={formData.email}
          onTextChange={updateField('email')}
          showResetButton
        />
        <SushiTextField
          label="Phone"
          placeholder="Enter your phone number"
          leadingIcon={<PhoneIcon />}
          keyboardType="phone-pad"
          text={formData.phone}
          onTextChange={updateField('phone')}
          showResetButton
        />
        <SushiTextField
          label="Password"
          placeholder="Enter your password"
          required
          leadingIcon={<LockIcon />}
          secureTextEntry
          text={formData.password}
          onTextChange={updateField('password')}
          supportText="Minimum 8 characters"
        />
      </View>
    );
  },
};

// Multiline
export const Multiline: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
    multiline: true,
    numberOfLines: 4,
  },
};

// Character Counter
export const WithCharacterCounter: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const maxLength = 280;

    return (
      <SushiTextField
        label="Tweet"
        placeholder="What's happening?"
        text={value}
        onTextChange={setValue}
        maxLength={maxLength}
        supportText={`${value.length}/${maxLength} characters`}
        multiline
        numberOfLines={3}
        isError={value.length > maxLength - 20}
      />
    );
  },
};

// Price Input with Prefix/Suffix
export const PriceInput: Story = {
  render: () => {
    const [price, setPrice] = useState('99');

    return (
      <SushiTextField
        label="Product Price"
        placeholder="0"
        text={price}
        onTextChange={setPrice}
        prefixText="$"
        suffixText="USD"
        keyboardType="numeric"
        showResetButton
      />
    );
  },
};

// Date Input with Icon
export const DateInput: Story = {
  args: {
    label: 'Date of Birth',
    placeholder: 'MM/DD/YYYY',
    trailingIcon: <CalendarIcon />,
  },
};

// Filled Variant States
export const FilledVariantStates: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiTextField
        label="Default"
        placeholder="Default filled"
        variant="filled"
      />
      <SushiTextField
        label="With Value"
        placeholder="With value"
        variant="filled"
        text="Some text"
      />
      <SushiTextField
        label="Error"
        placeholder="Error filled"
        variant="filled"
        isError
        supportText="Invalid input"
      />
      <SushiTextField
        label="Disabled"
        placeholder="Disabled filled"
        variant="filled"
        disabled
      />
    </View>
  ),
};

// Underline Variant States
export const UnderlineVariantStates: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiTextField
        label="Default"
        placeholder="Default underline"
        variant="underline"
      />
      <SushiTextField
        label="With Value"
        placeholder="With value"
        variant="underline"
        text="Some text"
      />
      <SushiTextField
        label="Error"
        placeholder="Error underline"
        variant="underline"
        isError
        supportText="Invalid input"
      />
      <SushiTextField
        label="Disabled"
        placeholder="Disabled underline"
        variant="underline"
        disabled
      />
    </View>
  ),
};

// Custom Colors
export const CustomColors: Story = {
  args: {
    label: 'Custom Styled',
    placeholder: 'Enter text...',
    colors: {
      focusedBorder: '#6B46C1',
      unfocusedBorder: '#D6BCFA',
      containerColor: '#FAF5FF',
      placeholderColor: '#9F7AEA',
    },
  },
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [searchText, setSearchText] = useState('');
    const [results, setResults] = useState<string[]>([]);

    const handleSearch = (text: string) => {
      setSearchText(text);
      if (text.length > 2) {
        setResults(['Result 1', 'Result 2', 'Result 3']);
      } else {
        setResults([]);
      }
    };

    return (
      <View style={{ gap: 8 }}>
        <SushiTextField
          label="Search Products"
          placeholder="Type at least 3 characters..."
          text={searchText}
          onTextChange={handleSearch}
          leadingIcon={<SearchIcon />}
          showResetButton
          supportText={results.length > 0 ? `${results.length} results found` : 'Start typing to search'}
        />
        {results.map((result, index) => (
          <Text key={index} style={{ paddingLeft: 8, color: '#666' }}>
            {result}
          </Text>
        ))}
      </View>
    );
  },
};

// ============================================
// FLOATING LABEL STORIES
// ============================================

// Basic Floating Label
export const FloatingLabel: Story = {
  args: {
    label: "Receiver's Name",
    labelBehavior: 'floating',
  },
};

// Floating Label with Value
export const FloatingLabelWithValue: Story = {
  args: {
    label: "Receiver's Name",
    labelBehavior: 'floating',
    text: 'John',
  },
};

// Floating Label Interactive
export const FloatingLabelInteractive: Story = {
  render: () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    return (
      <View style={{ gap: 16 }}>
        <SushiTextField
          label="Receiver's Name"
          labelBehavior="floating"
          text={name}
          onTextChange={setName}
          showResetButton
        />
        <SushiTextField
          label="Receiver's Phone"
          labelBehavior="floating"
          text={phone}
          onTextChange={setPhone}
          showResetButton
          keyboardType="phone-pad"
        />
      </View>
    );
  },
};

// Floating Label with Icons
export const FloatingLabelWithIcons: Story = {
  render: () => {
    const [name, setName] = useState('John');
    const [phone, setPhone] = useState('+91 9876543210');

    return (
      <View style={{ gap: 16 }}>
        <SushiTextField
          label="Receiver's Name"
          labelBehavior="floating"
          text={name}
          onTextChange={setName}
          showResetButton
          trailingIcon={<PhoneIcon />}
        />
        <SushiTextField
          label="Receiver's Phone"
          labelBehavior="floating"
          text={phone}
          onTextChange={setPhone}
          showResetButton
          keyboardType="phone-pad"
        />
      </View>
    );
  },
};

// Floating Label States
export const FloatingLabelStates: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiTextField
        label="Empty (unfocused)"
        labelBehavior="floating"
      />
      <SushiTextField
        label="With Value"
        labelBehavior="floating"
        text="Some text"
      />
      <SushiTextField
        label="Error State"
        labelBehavior="floating"
        text="Invalid"
        isError
        supportText="Please enter a valid value"
      />
      <SushiTextField
        label="Disabled"
        labelBehavior="floating"
        text="Disabled value"
        disabled
      />
      <SushiTextField
        label="Required Field"
        labelBehavior="floating"
        required
      />
    </View>
  ),
};

// Floating Label All Sizes
export const FloatingLabelAllSizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SushiTextField
        label="Small Input"
        labelBehavior="floating"
        size="sm"
        text="Small"
      />
      <SushiTextField
        label="Medium Input"
        labelBehavior="floating"
        size="md"
        text="Medium"
      />
      <SushiTextField
        label="Large Input"
        labelBehavior="floating"
        size="lg"
        text="Large"
      />
    </View>
  ),
};

// Floating Label Form Example (like screenshot)
export const FloatingLabelForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: 'John',
      phone: '+91 9876543210',
      email: '',
      address: '',
    });

    const updateField = (field: string) => (value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
      <View style={{ gap: 16, backgroundColor: '#F5F5F5', padding: 16, borderRadius: 16 }}>
        <SushiTextField
          label="Receiver's Name"
          labelBehavior="floating"
          text={formData.name}
          onTextChange={updateField('name')}
          showResetButton
          trailingIcon={<PhoneIcon />}
        />
        <SushiTextField
          label="Receiver's Phone"
          labelBehavior="floating"
          text={formData.phone}
          onTextChange={updateField('phone')}
          showResetButton
          keyboardType="phone-pad"
        />
        <SushiTextField
          label="Email Address"
          labelBehavior="floating"
          text={formData.email}
          onTextChange={updateField('email')}
          showResetButton
          keyboardType="email-address"
        />
        <SushiTextField
          label="Delivery Address"
          labelBehavior="floating"
          text={formData.address}
          onTextChange={updateField('address')}
          showResetButton
        />
      </View>
    );
  },
};

// Comparison: Static vs Floating
export const StaticVsFloating: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View>
        <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#666' }}>
          Static Label (default)
        </Text>
        <SushiTextField
          label="Email Address"
          labelBehavior="static"
          placeholder="Enter your email"
        />
      </View>
      <View>
        <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#666' }}>
          Floating Label
        </Text>
        <SushiTextField
          label="Email Address"
          labelBehavior="floating"
        />
      </View>
    </View>
  ),
};
