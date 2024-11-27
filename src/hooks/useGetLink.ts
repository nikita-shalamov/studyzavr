import { useQuery } from "@tanstack/react-query";
import getLink from "@/services/lessons/getLink.service";

const useGetLink = (studentId: string, tutorId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["lessons", studentId, tutorId],
    queryFn: () => getLink(studentId, tutorId),
    enabled: !!studentId && !!tutorId,
    staleTime: 300000,
  });

  return { data, isLoading, isError };
};

export default useGetLink;
