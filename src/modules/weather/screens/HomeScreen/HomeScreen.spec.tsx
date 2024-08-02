import React, {createRef} from 'react';
import {
  describe,
  it,
  expect,
  beforeAll,
  afterEach,
  afterAll,
} from '@jest/globals';
import {
  render,
  screen,
  userEvent,
  waitFor,
} from '@testing-library/react-native';
import {QueryClientProvider} from '@/modules/query';
import {RootNavigator, RootStackParamList} from '@/modules/navigation';
import {overrideNetworkResponse} from '@/modules/msw';
import {GET_WEATHER_URL} from '@/modules/weather/api/useWeather.ts';
import {server as nodeServer} from '@/modules/msw/node.ts';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationContainerRef} from '@react-navigation/core';

describe('HomeScreen', () => {
  // setup MSW
  beforeAll(() => nodeServer.listen());
  afterEach(() => nodeServer.resetHandlers());
  afterAll(() => nodeServer.close());

  it('should gracefully handle network issues', async () => {
    overrideNetworkResponse({
      server: nodeServer,
      url: GET_WEATHER_URL,
      data: {cod: '500'},
      status: 500,
    });

    render(
      <QueryClientProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </QueryClientProvider>,
    );

    const errorMessage = await screen.findByText(/something went wrong/i);
    expect(errorMessage).toBeDefined();
  });

  it('should show list of cities', async () => {
    render(
      <QueryClientProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      const allWeatherButtons = screen.getAllByTestId(/weather-/i);
      expect(allWeatherButtons).toHaveLength(2);
    });
  });

  it('should navigate to details screen on tap', async () => {
    const navigationContainerRef =
      createRef<NavigationContainerRef<RootStackParamList>>();

    render(
      <QueryClientProvider>
        <NavigationContainer ref={navigationContainerRef}>
          <RootNavigator />
        </NavigationContainer>
      </QueryClientProvider>,
    );

    const weatherElement = await screen.findByTestId(/weather-sumy/i);
    await userEvent.press(weatherElement);

    await waitFor(() => {
      expect(
        navigationContainerRef.current?.getCurrentRoute()?.name,
      ).toStrictEqual('Details' as keyof RootStackParamList);
    });
  });
});
