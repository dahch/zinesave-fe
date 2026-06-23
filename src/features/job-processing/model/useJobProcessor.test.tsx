import { renderHook, act, waitFor } from '@testing-library/react';
import { useJobProcessor } from './useJobProcessor';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { expect, test, vi, beforeEach } from 'vitest';
import api from '@/shared/api/api';
import { toast } from 'sonner';
import { useAuthStore } from '@/entities/auth/model/store';

vi.mock('@/shared/api/api');
vi.mock('sonner', () => ({ toast: { error: vi.fn(), success: vi.fn() } }));
vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    }
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

function createMockJob(id: string, extra = {}) {
  return {
    id,
    base_url: 'http://test.com',
    source_url: 'http://test.com/article',
    user_id: 'user-1',
    current_step: null,
    error_code: null,
    error_message: null,
    started_at: null,
    status: 'processing',
    progress: 0,
    created_at: new Date().toISOString(),
    finished_at: null,
    ...extra
  };
}

beforeEach(() => {
  queryClient.clear();
  vi.clearAllMocks();
  // Reset auth store
  act(() => {
    useAuthStore.getState().logout();
  });
  // Mock window.open
  Object.defineProperty(window, 'open', {
    value: vi.fn(),
    writable: true,
    configurable: true
  });
  // Mock global.fetch
  global.fetch = vi.fn();
});

test('should initialize with default values', () => {
  const { result } = renderHook(() => useJobProcessor(), { wrapper });
  expect(result.current.urlInput).toBe('');
  expect(result.current.currentJobId).toBeNull();
  expect(result.current.jobType).toBe('simple');
});

test('should create a job and update currentJobId', async () => {
  const mockJobResponse = {
    data: createMockJob('job-123')
  };

  vi.mocked(api.post).mockResolvedValueOnce(mockJobResponse);

  const { result } = renderHook(() => useJobProcessor(), { wrapper });

  act(() => {
    result.current.createJobMutation.mutate('http://test.com/article');
  });

  await waitFor(() => {
    expect(result.current.createJobMutation.isSuccess).toBe(true);
  });

  expect(result.current.currentJobId).toBe('job-123');
});

test('should handle simple job creation error 403 INSUFFICIENT_CREDITS', async () => {
  const { result } = renderHook(() => useJobProcessor(), { wrapper });
  const err403 = {
    response: {
      status: 403,
      data: { detail: 'INSUFFICIENT_CREDITS' }
    }
  };
  vi.mocked(api.post).mockRejectedValueOnce(err403);
  act(() => {
    result.current.createJobMutation.mutate('http://test.com');
  });
  await waitFor(() => {
    expect(result.current.createJobMutation.isError).toBe(true);
  });
  expect(result.current.isPaywallOpen).toBe(true);
});

test('should handle simple job creation error 409 Conflict', async () => {
  const { result } = renderHook(() => useJobProcessor(), { wrapper });
  const err409 = { response: { status: 409 } };
  vi.mocked(api.post).mockRejectedValueOnce(err409);
  act(() => {
    result.current.createJobMutation.mutate('http://test.com');
  });
  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith('job_processor.error_conflict');
  });
});

test('should handle simple job creation error 429 Rate limit', async () => {
  const { result } = renderHook(() => useJobProcessor(), { wrapper });
  const err429 = { response: { status: 429 } };
  vi.mocked(api.post).mockRejectedValueOnce(err429);
  act(() => {
    result.current.createJobMutation.mutate('http://test.com');
  });
  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith('job_processor.error_rate_limit');
  });
});

test('should handle simple job creation error 400 with detail', async () => {
  const { result } = renderHook(() => useJobProcessor(), { wrapper });
  const err400 = { response: { status: 400, data: { detail: 'Bad input parameter' } } };
  vi.mocked(api.post).mockRejectedValueOnce(err400);
  act(() => {
    result.current.createJobMutation.mutate('http://test.com');
  });
  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith('Bad input parameter');
  });
});

test('should handle simple job creation generic error', async () => {
  const { result } = renderHook(() => useJobProcessor(), { wrapper });
  const errGeneric = { response: { status: 500 } };
  vi.mocked(api.post).mockRejectedValueOnce(errGeneric);
  act(() => {
    result.current.createJobMutation.mutate('http://test.com');
  });
  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith('job_processor.create_error');
  });
});

test('should create a composite job and update currentJobId', async () => {
  const mockJobResponse = {
    data: createMockJob('job-composite-123')
  };

  vi.mocked(api.post).mockResolvedValueOnce(mockJobResponse);

  const { result } = renderHook(() => useJobProcessor(), { wrapper });

  act(() => {
    result.current.createCompositeJobMutation.mutate({ urls: ['url1', 'url2'], title: 'Test Composite' });
  });

  await waitFor(() => {
    expect(result.current.createCompositeJobMutation.isSuccess).toBe(true);
  });

  expect(result.current.currentJobId).toBe('job-composite-123');
});

test('should handle composite job creation error 403 INSUFFICIENT_CREDITS', async () => {
  const { result } = renderHook(() => useJobProcessor(), { wrapper });
  const err403 = { response: { status: 403, data: { detail: 'INSUFFICIENT_CREDITS' } } };
  vi.mocked(api.post).mockRejectedValueOnce(err403);
  act(() => {
    result.current.createCompositeJobMutation.mutate({ urls: [], title: '' });
  });
  await waitFor(() => {
    expect(result.current.createCompositeJobMutation.isError).toBe(true);
  });
  expect(result.current.isPaywallOpen).toBe(true);
});

test('should handle composite job creation error 409 Conflict', async () => {
  const { result } = renderHook(() => useJobProcessor(), { wrapper });
  const err409 = { response: { status: 409 } };
  vi.mocked(api.post).mockRejectedValueOnce(err409);
  act(() => {
    result.current.createCompositeJobMutation.mutate({ urls: [], title: '' });
  });
  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith('job_processor.error_conflict');
  });
});

test('should handle composite job creation error 429 Rate limit', async () => {
  const { result } = renderHook(() => useJobProcessor(), { wrapper });
  const err429 = { response: { status: 429 } };
  vi.mocked(api.post).mockRejectedValueOnce(err429);
  act(() => {
    result.current.createCompositeJobMutation.mutate({ urls: [], title: '' });
  });
  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith('job_processor.error_rate_limit');
  });
});

test('should handle composite job creation error 400 with detail', async () => {
  const { result } = renderHook(() => useJobProcessor(), { wrapper });
  const err400 = { response: { status: 400, data: { detail: 'Error detail message' } } };
  vi.mocked(api.post).mockRejectedValueOnce(err400);
  act(() => {
    result.current.createCompositeJobMutation.mutate({ urls: [], title: '' });
  });
  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith('Error detail message');
  });
});

test('should handle composite job creation error 422 Unprocessable', async () => {
  const { result } = renderHook(() => useJobProcessor(), { wrapper });
  const err422 = { response: { status: 422, data: { detail: 'unprocessable' } } };
  vi.mocked(api.post).mockRejectedValueOnce(err422);
  act(() => {
    result.current.createCompositeJobMutation.mutate({ urls: [], title: '' });
  });
  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith('job_processor.urls_required');
  });
});

test('should handle composite job creation generic error', async () => {
  const { result } = renderHook(() => useJobProcessor(), { wrapper });
  const errGeneric = { response: { status: 500 } };
  vi.mocked(api.post).mockRejectedValueOnce(errGeneric);
  act(() => {
    result.current.createCompositeJobMutation.mutate({ urls: [], title: '' });
  });
  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith('job_processor.create_error');
  });
});

test('should handle state reset', () => {
  const { result } = renderHook(() => useJobProcessor(), { wrapper });

  act(() => {
    result.current.setUrlInput('http://test.com');
    result.current.setJobType('composite');
    result.current.setUrlsInput(['url1', 'url2']);
    result.current.setTitleInput('Title');
    result.current.handleReset();
  });

  expect(result.current.urlInput).toBe('');
  expect(result.current.currentJobId).toBeNull();
  expect(result.current.urlsInput).toEqual(['', '']);
  expect(result.current.titleInput).toBe('');
});

test('should handle file upload successfully', async () => {
  const { result } = renderHook(() => useJobProcessor(), { wrapper });

  const mockJobResponse = { data: createMockJob('job-123') };
  vi.mocked(api.post).mockResolvedValueOnce(mockJobResponse);

  act(() => {
    result.current.createJobMutation.mutate('http://test.com/article');
  });

  await waitFor(() => {
    expect(result.current.currentJobId).toBe('job-123');
  });

  vi.mocked(api.post).mockResolvedValueOnce({ data: {} });

  await act(async () => {
    await result.current.handleUpload('google_drive');
  });

  expect(api.post).toHaveBeenLastCalledWith('/jobs/job-123/upload', { provider: 'google_drive' });
  expect(toast.success).toHaveBeenCalledWith('job_processor.upload_success');
});

test('should handle file upload failure', async () => {
  const { result } = renderHook(() => useJobProcessor(), { wrapper });

  const mockJobResponse = { data: createMockJob('job-123') };
  vi.mocked(api.post).mockResolvedValueOnce(mockJobResponse);

  act(() => {
    result.current.createJobMutation.mutate('http://test.com/article');
  });

  await waitFor(() => {
    expect(result.current.currentJobId).toBe('job-123');
  });

  vi.mocked(api.post).mockRejectedValueOnce(new Error('Upload error'));

  await act(async () => {
    await result.current.handleUpload('google_drive');
  });

  expect(toast.error).toHaveBeenCalledWith('job_processor.upload_error');
});

test('should handle file download successfully', async () => {
  act(() => {
    useAuthStore.getState().setToken('secret-token');
  });

  vi.mocked(global.fetch).mockResolvedValueOnce({
    ok: true,
    json: async () => ({ download_url: 'http://file.download' })
  } as Response);

  const { result } = renderHook(() => useJobProcessor(), { wrapper });

  const mockJobResponse = { data: createMockJob('job-download-123', { status: 'done', progress: 100 }) };
  vi.mocked(api.post).mockResolvedValueOnce(mockJobResponse);
  vi.mocked(api.get).mockResolvedValueOnce(mockJobResponse);

  act(() => {
    result.current.createJobMutation.mutate('http://test.com');
  });

  await waitFor(() => {
    expect(result.current.currentJobId).toBe('job-download-123');
  });

  await waitFor(() => {
    expect(result.current.jobId).toBe('job-download-123');
  });

  await act(async () => {
    await result.current.handleDownload();
  });

  expect(global.fetch).toHaveBeenCalledWith(
    `${process.env.NEXT_PUBLIC_API_URL}/jobs/job-download-123/download`,
    {
      headers: {
        Authorization: 'Bearer secret-token'
      }
    }
  );
  expect(window.open).toHaveBeenCalledWith('http://file.download', '_blank');
});

test('should handle file download failure response', async () => {
  vi.mocked(global.fetch).mockResolvedValueOnce({
    ok: false,
    status: 400
  } as Response);

  const { result } = renderHook(() => useJobProcessor(), { wrapper });

  const mockJobResponse = { data: createMockJob('job-err-123', { status: 'done' }) };
  vi.mocked(api.post).mockResolvedValueOnce(mockJobResponse);
  vi.mocked(api.get).mockResolvedValueOnce(mockJobResponse);
  
  act(() => {
    result.current.createJobMutation.mutate('http://test.com');
  });

  await waitFor(() => {
    expect(result.current.jobId).toBe('job-err-123');
  });

  await act(async () => {
    await result.current.handleDownload();
  });

  expect(toast.error).toHaveBeenCalledWith('job_processor.upload_error');
});

test('should handle file download exception', async () => {
  vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'));

  const { result } = renderHook(() => useJobProcessor(), { wrapper });

  const mockJobResponse = { data: createMockJob('job-exception-123', { status: 'done' }) };
  vi.mocked(api.post).mockResolvedValueOnce(mockJobResponse);
  vi.mocked(api.get).mockResolvedValueOnce(mockJobResponse);
  
  act(() => {
    result.current.createJobMutation.mutate('http://test.com');
  });

  await waitFor(() => {
    expect(result.current.jobId).toBe('job-exception-123');
  });

  await act(async () => {
    await result.current.handleDownload();
  });

  expect(toast.error).toHaveBeenCalledWith('job_processor.upload_error');
});
