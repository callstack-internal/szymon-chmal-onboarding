import React, {ReactNode} from 'react';
import {TextInput, TextInputProps, View} from 'react-native';
import {styled} from 'nativewind';

export type InputProps = TextInputProps & {
  rightAdornment?: ReactNode;
};

export const Input = styled(function UnstyledInput({
  style,
  rightAdornment,
  ...other
}: InputProps) {
  return (
    <View
      className="flex-row items-center bg-gray-200 h-12 rounded"
      style={style}>
      <TextInput className="h-full flex-1 px-2 pb-2 text-lg" {...other} />
      {rightAdornment ? <View className="mr-2">{rightAdornment}</View> : null}
    </View>
  );
});
