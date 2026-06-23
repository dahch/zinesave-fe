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

test('providerName should map keys correctly', () => {
  const { result } = renderHook(() => useJobActions('job-1'));
  expect(result.current.providerName('google_drive')).toBe('Google Drive');
  expect(result.current.providerName('dropbox')).toBe('Dropbox');
  expect(result.current.providerName('onedrive')).toBe('OneDrive');
  expect(result.current.providerName('unknown')).toBe('unknown');
});

test('uploadToCloud should toast error on failure', async () => {
  vi.mocked(api.post).mockRejectedValueOnce(new Error('Upload Error'));
  const onJobUpdate = vi.fn();

  const { result } = renderHook(() => useJobActions('job-1', onJobUpdate));
  
  await act(async () => {
    await result.current.uploadToCloud('google_drive');
  });

  expect(toast.error).toHaveBeenCalledWith('job_processor.upload_error_provider');
  expect(onJobUpdate).not.toHaveBeenCalled();
});

test('downloadJob should toast error on API failure', async () => {
  vi.mocked(api.get).mockRejectedValueOnce(new Error('Download Error'));
  const mockWindow = { location: { href: '' }, close: vi.fn() } as unknown as Window;
  vi.mocked(window.open).mockReturnValueOnce(mockWindow);

  const { result } = renderHook(() => useJobActions('job-1'));
  
  await act(async () => {
    await result.current.downloadJob();
  });

  expect(mockWindow.close).toHaveBeenCalled();
  expect(toast.error).toHaveBeenCalledWith('job_processor.download_error');
});

test('downloadJob should toast error if download_url is missing', async () => {
  vi.mocked(api.get).mockResolvedValueOnce({ data: {} });
  const mockWindow = { location: { href: '' }, close: vi.fn() } as unknown as Window;
  vi.mocked(window.open).mockReturnValueOnce(mockWindow);

  const { result } = renderHook(() => useJobActions('job-1'));
  
  await act(async () => {
    await result.current.downloadJob();
  });

  expect(mockWindow.close).toHaveBeenCalled();
  expect(toast.error).toHaveBeenCalledWith('job_processor.download_error');
});

test('downloadJob should fall back to window.location if newWindow is null', async () => {
  vi.mocked(api.get).mockResolvedValueOnce({ data: { download_url: 'http://download.fallback' } });
  vi.mocked(window.open).mockReturnValueOnce(null);

  // Mock window.location
  Object.defineProperty(window, 'location', {
    value: { href: '' },
    writable: true,
    configurable: true
  });

  const { result } = renderHook(() => useJobActions('job-1'));
  
  await act(async () => {
    await result.current.downloadJob();
  });

  expect(window.location.href).toBe('http://download.fallback');
});
