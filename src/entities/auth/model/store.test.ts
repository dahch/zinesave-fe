import { expect, test, beforeEach } from 'vitest';
import { useAuthStore } from './store';

beforeEach(() => {
  useAuthStore.setState({ token: null, isHydrated: false });
});

test('should default to unauthenticated', () => {
  expect(useAuthStore.getState().isAuthenticated()).toBe(false);
});

test('should set token and become authenticated', () => {
  useAuthStore.getState().setToken('new-token');
  expect(useAuthStore.getState().token).toBe('new-token');
  expect(useAuthStore.getState().isAuthenticated()).toBe(true);
});

test('should logout and clear token', () => {
  useAuthStore.getState().setToken('new-token');
  useAuthStore.getState().logout();
  expect(useAuthStore.getState().token).toBeNull();
  expect(useAuthStore.getState().isAuthenticated()).toBe(false);
});
