import { useQuery } from "@tanstack/react-query";
import getHomework from "@/services/homework/getHomework.service";

const useGetHomework = (tutorId: string, studentId: string) => {
  const queryEnabled = Boolean(tutorId && studentId);
  const { data, isLoading } = useQuery({
    queryKey: ["homeworkStudent", tutorId, studentId],
    queryFn: () => getHomework(tutorId, studentId),
    select: (data) => data.data.homework,
    enabled: queryEnabled,
  });

  return { homework: data, isLoading };
};

export default useGetHomework;
