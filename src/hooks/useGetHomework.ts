import { useQuery } from "@tanstack/react-query";
import getHomework from "@/services/homework/getHomework.service";

const useGetHomework = (tutorId: string, studentId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["homeworkStudent", tutorId, studentId],
    queryFn: () => getHomework(tutorId, studentId),
    select: (data) => data.data.homework,
    enabled: !!tutorId || !!studentId,
  });

  return { homework: data, isLoading };
};

export default useGetHomework;
