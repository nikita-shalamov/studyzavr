import { useQuery } from "@tanstack/react-query";
import { getNoneConfirmedStudents } from "@/services/students/getNoneConfirmedStudents.service";

interface Student {
  id: number;
  name: string;
  image: string | null;
}

interface TutorStudent {
  student: Student;
}

const useGetNoneConfirmedStudents = (tutorId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["noneConfirmedStudents", tutorId],
    queryFn: () => getNoneConfirmedStudents(tutorId),
    select: (data: { students: TutorStudent[] }) =>
      data.students.map((item) => item.student),
    enabled: !!tutorId,
    staleTime: 5 * 60 * 1000,
  });

  return { students: data, isLoading };
};

export default useGetNoneConfirmedStudents;
