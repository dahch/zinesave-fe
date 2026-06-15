import { expect, test, vi, beforeEach } from 'vitest';
import api from './api';
import { useAuthStore } from '@/entities/auth/model/store';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(api);

beforeEach(() => {
  mock.reset();
  useAuthStore.setState({ token: null });
});

test('should attach authorization header if token exists', async () => {
  useAuthStore.setState({ token: 'test-token' });
  mock.onGet('/test').reply(200);

  const response = await api.get('/test');
  expect(response.config.headers?.Authorization).toBe('Bearer test-token');
});

test('should logout on 401 response', async () => {
  useAuthStore.setState({ token: 'test-token' });
  mock.onGet('/test').reply(401);

  await expect(api.get('/test')).rejects.toThrow();
  expect(useAuthStore.getState().token).toBeNull();
});
