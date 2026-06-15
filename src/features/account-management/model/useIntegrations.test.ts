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
  (api.get as any).mockResolvedValueOnce({ data: { auth_url: 'http://auth.test' } });

  const { result } = renderHook(() => useIntegrations());
  
  await act(async () => {
    await result.current.connectGoogleDrive();
  });

  expect(window.location.href).toBe('http://auth.test');
});

test('connectGoogleDrive should toast on error', async () => {
  (api.get as any).mockRejectedValueOnce(new Error('API Error'));

  const { result } = renderHook(() => useIntegrations());
  
  await act(async () => {
    await result.current.connectGoogleDrive();
  });

  expect(toast.error).toHaveBeenCalledWith('dashboard.account.integrations.error_google');
});
