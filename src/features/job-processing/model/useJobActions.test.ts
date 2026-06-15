import { renderHook, act } from '@testing-library/react';
import { useJobActions } from './useJobActions';
import { expect, test, vi, beforeEach } from 'vitest';
import api from '@/shared/api/api';
import { toast } from 'sonner';

vi.mock('@/shared/api/api');
vi.mock('sonner', () => ({ toast: { error: vi.fn(), success: vi.fn() } }));

beforeEach(() => {
  vi.clearAllMocks();
  Object.defineProperty(window, 'open', {
    value: vi.fn(),
    writable: true
  });
});

test('uploadToCloud should call API and toast success', async () => {
  (api.post as any).mockResolvedValueOnce({ data: {} });
  const onJobUpdate = vi.fn();

  const { result } = renderHook(() => useJobActions('job-1', onJobUpdate));
  
  await act(async () => {
    await result.current.uploadToCloud('google_drive');
  });

  expect(api.post).toHaveBeenCalledWith('/jobs/job-1/upload', { provider: 'google_drive' });
  expect(toast.success).toHaveBeenCalledWith('Iniciada subida a Google Drive');
  expect(onJobUpdate).toHaveBeenCalled();
});

test('downloadJob should call API and open window', async () => {
  (api.get as any).mockResolvedValueOnce({ data: { download_url: 'http://download.test' } });

  const { result } = renderHook(() => useJobActions('job-1'));
  
  await act(async () => {
    await result.current.downloadJob();
  });

  expect(api.get).toHaveBeenCalledWith('/jobs/job-1/download');
  expect(window.open).toHaveBeenCalledWith('http://download.test', '_blank');
});
