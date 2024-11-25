import { useQuery } from "@tanstack/react-query";
import getTeacherLessons from "@/services/lessons/getTeacherLessons.service";

const useGetTeacherLessons = (
  tutorId: string,
  startDate: string,
  endDate: string
) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["lessons", tutorId, startDate, endDate],
    queryFn: () => getTeacherLessons(tutorId, startDate, endDate),
    enabled: !!tutorId && !!startDate && !!endDate,
    staleTime: 300000,
  });

  return { data, isLoading, isError };
};

export default useGetTeacherLessons;
