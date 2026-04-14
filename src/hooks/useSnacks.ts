import { useQuery } from '@tanstack/react-query';
import { getSnacks } from '../api/client';

export const useSnacks = () => {
  return useQuery({
    queryKey: ['snacks'],
    queryFn: getSnacks,
    staleTime: 60 * 1000, // 60 seconds
    // retry & retryDelay inherited from QueryClient defaults in App.tsx
  });
};
