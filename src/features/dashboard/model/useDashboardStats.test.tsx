import { renderHook, waitFor } from '@testing-library/react';
import { useDashboardStats } from './useDashboardStats';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { expect, test, vi, beforeEach } from 'vitest';
import api from '@/shared/api/api';

vi.mock('@/shared/api/api');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
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

test('should fetch and parse dashboard stats successfully', async () => {
  const mockResponse = {
    data: {
      usage: {
        plan: "free",
        credits: 10,
        is_beta_tester: true
      },
      recent_jobs: [],
      connected_providers: ["google_drive"]
    }
  };

  (api.get as any).mockResolvedValueOnce(mockResponse);

  const { result } = renderHook(() => useDashboardStats(), { wrapper });

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });

  expect(result.current.data?.usage.credits).toBe(10);
  expect(result.current.data?.connected_providers).toContain("google_drive");
});
