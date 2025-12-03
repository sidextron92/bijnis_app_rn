/**
 * Hook for fetching Home Header data
 */

import { useState, useEffect, useCallback } from 'react';
import { fetchHomeHeader, fetchHomeHeaderScenario, mockScenarios } from '../api/homeHeader';
import { HomeHeaderApiResponse } from '../types/homeHeader';

interface UseHomeHeaderDataOptions {
  /** User ID for personalization */
  userId?: string;
  /** Location for delivery estimation */
  location?: { lat: number; lng: number };
  /** Use specific mock scenario instead of default */
  scenario?: keyof typeof mockScenarios;
  /** Enable auto-refresh */
  autoRefresh?: boolean;
  /** Auto-refresh interval in milliseconds */
  refreshInterval?: number;
}

interface UseHomeHeaderDataResult {
  /** Home header data */
  data: HomeHeaderApiResponse | null;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
  /** Manually refetch data */
  refetch: () => Promise<void>;
  /** Whether data has been fetched at least once */
  isFetched: boolean;
}

/**
 * Custom hook to fetch and manage home header data
 *
 * @example
 * ```tsx
 * function HomeScreen() {
 *   const { data, isLoading, error, refetch } = useHomeHeaderData({
 *     userId: 'user123',
 *     autoRefresh: true,
 *     refreshInterval: 60000, // 1 minute
 *   });
 *
 *   if (isLoading) return <Skeleton />;
 *   if (error) return <ErrorView error={error} onRetry={refetch} />;
 *   if (!data) return null;
 *
 *   return <HomeHeader {...transformApiDataToProps(data)} />;
 * }
 * ```
 */
export function useHomeHeaderData(
  options: UseHomeHeaderDataOptions = {}
): UseHomeHeaderDataResult {
  const {
    userId,
    location,
    scenario,
    autoRefresh = false,
    refreshInterval = 60000,
  } = options;

  const [data, setData] = useState<HomeHeaderApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = scenario
        ? await fetchHomeHeaderScenario(scenario)
        : await fetchHomeHeader({ userId, location });

      setData(response);
      setIsFetched(true);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch home header data'));
    } finally {
      setIsLoading(false);
    }
  }, [userId, location, scenario]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh
  useEffect(() => {
    if (!autoRefresh || !isFetched) return;

    const intervalId = setInterval(() => {
      fetchData();
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, [autoRefresh, refreshInterval, isFetched, fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
    isFetched,
  };
}

/**
 * Hook variant that returns data immediately with a fallback
 * Useful when you need data synchronously
 */
export function useHomeHeaderDataSync(
  fallbackData: HomeHeaderApiResponse,
  options: UseHomeHeaderDataOptions = {}
): UseHomeHeaderDataResult & { data: HomeHeaderApiResponse } {
  const result = useHomeHeaderData(options);

  return {
    ...result,
    data: result.data || fallbackData,
  };
}
