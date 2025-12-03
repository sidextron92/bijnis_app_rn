import { useState, useEffect } from 'react';
import { homeApi } from '@/mocks';
import type { SDUIWidget } from '@/features/sdui/types';

interface HomeLayout {
  widgets: SDUIWidget[];
}

export function useHomeLayout() {
  const [layout, setLayout] = useState<HomeLayout | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLayout = async () => {
      try {
        setIsLoading(true);
        const response = await homeApi.getHomeLayout();
        if (response.success && response.data) {
          setLayout({ widgets: response.data.widgets as SDUIWidget[] });
        } else {
          throw new Error(response.error || 'Failed to fetch layout');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch home layout');
        // Fallback to default layout
        setLayout({
          widgets: [
            {
              id: 'fallback-banner',
              type: 'banner_carousel',
              data: { banners: [] },
            },
            {
              id: 'fallback-categories',
              type: 'category_grid',
              data: { categories: [] },
            },
          ],
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLayout();
  }, []);

  return { layout, isLoading, error };
}
