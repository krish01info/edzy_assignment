import { useQuery } from '@tanstack/react-query';
import { getStudents, getStudent } from '../api/client';

export const useStudents = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: getStudents,
    staleTime: 30 * 1000, // 30 seconds
    // retry & retryDelay inherited from QueryClient defaults in App.tsx
  });
};

export const useStudent = (id: number) => {
  return useQuery({
    queryKey: ['student', id],
    queryFn: () => getStudent(id),
    staleTime: 30 * 1000,
    enabled: !!id && id > 0,
    // retry & retryDelay inherited from QueryClient defaults in App.tsx
  });
};
