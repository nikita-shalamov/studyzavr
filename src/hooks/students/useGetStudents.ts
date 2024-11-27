import { useQuery } from "@tanstack/react-query";
import { getStudents } from "@/services/students/getStudents.service";

interface Student {
  id: number;
  name: string;
  image: string | null;
}

interface TutorStudent {
  student: Student;
}

const useGetStudents = (tutorId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["students", tutorId],
    queryFn: () => getStudents(tutorId),
    select: (data: { data: { students: TutorStudent[] } }) =>
      data.data.students.map((item) => item.student),
    enabled: !!tutorId,
    staleTime: 5 * 60 * 1000,
  });

  return { students: data, isLoading };
};

export default useGetStudents;
