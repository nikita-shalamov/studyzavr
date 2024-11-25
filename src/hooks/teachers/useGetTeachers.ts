import { useQuery } from "@tanstack/react-query";
import { getTeachers } from "@/services/teachers/getTeachers.service";

const useGetTeachers = (studentId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["teachers", studentId],
    queryFn: () => getTeachers(studentId),
    enabled: !!studentId,
    select: (data) => data.data.teachers,
    staleTime: 300000,
  });

  return { data, isLoading, isError };
};

export default useGetTeachers;
