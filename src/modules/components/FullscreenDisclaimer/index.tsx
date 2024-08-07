import React from 'react';
import {View} from 'react-native';

export type FullscreenDisclaimerProps = {
  children: React.ReactNode;
};

export const FullscreenDisclaimer = ({
  children,
}: FullscreenDisclaimerProps): React.JSX.Element => {
  return <View className="flex-1 justify-center items-center">{children}</View>;
};
