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
  vi.mocked(api.post).mockResolvedValueOnce({ data: {} });
  const onJobUpdate = vi.fn();

  const { result } = renderHook(() => useJobActions('job-1', onJobUpdate));
  
  await act(async () => {
    await result.current.uploadToCloud('google_drive');
  });

  expect(api.post).toHaveBeenCalledWith('/jobs/job-1/upload', { provider: 'google_drive' });
  expect(toast.success).toHaveBeenCalledWith('job_processor.upload_start');
  expect(onJobUpdate).toHaveBeenCalled();
});

test('downloadJob should call API and open window', async () => {
  vi.mocked(api.get).mockResolvedValueOnce({ data: { download_url: 'http://download.test' } });
  const mockWindow = { location: { href: '' } } as unknown as Window;
  vi.mocked(window.open).mockReturnValueOnce(mockWindow);

  const { result } = renderHook(() => useJobActions('job-1'));
  
  await act(async () => {
    await result.current.downloadJob();
  });

  expect(api.get).toHaveBeenCalledWith('/jobs/job-1/download');
  expect(window.open).toHaveBeenCalledWith('', '_blank');
  expect(mockWindow.location.href).toBe('http://download.test');
});
