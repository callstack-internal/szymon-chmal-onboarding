import React from 'react';
import {styled} from 'nativewind';
import {
  BorderlessButton,
  BorderlessButtonProps,
} from 'react-native-gesture-handler';

export type IconButtonProps = BorderlessButtonProps;

export const IconButton = styled(function UnstyledIconButton(
  props: IconButtonProps,
) {
  return <BorderlessButton {...props} />;
});
