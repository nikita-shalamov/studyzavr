import { useQuery } from "@tanstack/react-query";
import getStudentLessons from "@/services/lessons/getStudentLessons.service";

const useGetStudentLessons = (
  userId: string,
  startDate: string,
  endDate: string
) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["lessons", userId, startDate, endDate],
    queryFn: () => getStudentLessons(userId, startDate, endDate),
    enabled: !!userId && !!startDate && !!endDate,
    staleTime: 300000,
  });

  return { data, isLoading, isError };
};

export default useGetStudentLessons;
