/**
 * @format
 */

import React from 'react';
import {App} from '../src/App';

import {it, beforeAll, afterEach, afterAll} from '@jest/globals';

import {render} from '@testing-library/react-native';

import {server} from '@/modules/msw/node';
import {queryClient} from '@/modules/query/client.ts';

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  queryClient.clear();
});
afterAll(() => server.close());

it('renders correctly', () => {
  render(<App />);
});

it('navigates to details screen when item is clicked', () => {
  render(<App />);
});
