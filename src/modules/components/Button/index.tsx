import React from 'react';
import {RectButton, RectButtonProps} from 'react-native-gesture-handler';
import {styled} from 'nativewind';
import {Text} from 'react-native';

const StyledRectButton = styled(RectButton);

export type ButtonProps = RectButtonProps;

export const Button = styled(function UnstyledButton({
  children,
  enabled,
  ...other
}: RectButtonProps) {
  return (
    <StyledRectButton
      className={`
        bg-gray-200 h-12 rounded px-2 py-2 justify-center items-center
        ${!enabled && 'opacity-50'}
      `}
      enabled={enabled}
      {...other}>
      <Text className="text-lg">{children}</Text>
    </StyledRectButton>
  );
});
