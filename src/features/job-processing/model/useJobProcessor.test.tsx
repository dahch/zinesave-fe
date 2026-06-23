import { renderHook, act, waitFor } from '@testing-library/react';
import { useJobProcessor } from './useJobProcessor';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { expect, test, vi, beforeEach } from 'vitest';
import api from '@/shared/api/api';

vi.mock('@/shared/api/api');
vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

beforeEach(() => {
  queryClient.clear();
  vi.clearAllMocks();
});

test('should initialize with default values', () => {
  const { result } = renderHook(() => useJobProcessor(), { wrapper });
  expect(result.current.urlInput).toBe('');
  expect(result.current.currentJobId).toBeNull();
});

test('should create a job and update currentJobId', async () => {
  const mockJobResponse = {
    data: {
      id: 'job-123',
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
    }
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
