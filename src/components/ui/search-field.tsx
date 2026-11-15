import { TextInput } from 'react-native';

type SearchFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  className?: string;
};

export function SearchField({ value, onChangeText, placeholder, className }: SearchFieldProps) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="muted"
      autoCapitalize="none"
      autoCorrect={false}
      spellCheck={false}
      returnKeyType="search"
      clearButtonMode="while-editing"
      style={{
        flex: 1,
        color: 'ink',
        fontSize: 15,
        paddingVertical: 0,
      }}
      className={className}
    />
  );
}
