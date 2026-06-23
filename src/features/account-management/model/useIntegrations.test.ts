import { renderHook, act } from '@testing-library/react';
import { useIntegrations } from './useIntegrations';
import { expect, test, vi, beforeEach } from 'vitest';
import api from '@/shared/api/api';
import { toast } from 'sonner';

vi.mock('@/shared/api/api');
vi.mock('sonner', () => ({ toast: { error: vi.fn(), success: vi.fn() } }));
vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (k: string) => k }) }));

beforeEach(() => {
  vi.clearAllMocks();
  // Mock window.location
  Object.defineProperty(window, 'location', {
    value: { href: '' },
    writable: true
  });
});

test('connectGoogleDrive should redirect on success', async () => {
  vi.mocked(api.get).mockResolvedValueOnce({ data: { auth_url: 'http://auth.test' } });

  const { result } = renderHook(() => useIntegrations());
  
  await act(async () => {
    await result.current.connectGoogleDrive();
  });

  expect(window.location.href).toBe('http://auth.test');
});

test('connectGoogleDrive should toast on error', async () => {
  vi.mocked(api.get).mockRejectedValueOnce(new Error('API Error'));

  const { result } = renderHook(() => useIntegrations());
  
  await act(async () => {
    await result.current.connectGoogleDrive();
  });

  expect(toast.error).toHaveBeenCalledWith('dashboard.account.integrations.error_google');
});

test('connectDropbox should redirect on success', async () => {
  vi.mocked(api.get).mockResolvedValueOnce({ data: { auth_url: 'http://auth.test/dropbox' } });

  const { result } = renderHook(() => useIntegrations());
  
  await act(async () => {
    await result.current.connectDropbox();
  });

  expect(window.location.href).toBe('http://auth.test/dropbox');
});

test('connectDropbox should toast on error', async () => {
  vi.mocked(api.get).mockRejectedValueOnce(new Error('API Error'));

  const { result } = renderHook(() => useIntegrations());
  
  await act(async () => {
    await result.current.connectDropbox();
  });

  expect(toast.error).toHaveBeenCalledWith('dashboard.account.integrations.error_dropbox');
});

test('connectOneDrive should redirect on success', async () => {
  vi.mocked(api.get).mockResolvedValueOnce({ data: { auth_url: 'http://auth.test/onedrive' } });

  const { result } = renderHook(() => useIntegrations());
  
  await act(async () => {
    await result.current.connectOneDrive();
  });

  expect(window.location.href).toBe('http://auth.test/onedrive');
});

test('connectOneDrive should toast on error', async () => {
  vi.mocked(api.get).mockRejectedValueOnce(new Error('API Error'));

  const { result } = renderHook(() => useIntegrations());
  
  await act(async () => {
    await result.current.connectOneDrive();
  });

  expect(toast.error).toHaveBeenCalledWith('dashboard.account.integrations.error_onedrive');
});
