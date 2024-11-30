import { useQuery } from "@tanstack/react-query";
import { getMyTeacher } from "@/services/getMyTeacher.service";

const useGetMyTeacher = (referralCode: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["myTeacher", referralCode],
    queryFn: () => getMyTeacher(referralCode),
    select: (data) => data.data.tutor,
    enabled: !!referralCode,
  });

  return { data, isLoading, error };
};

export default useGetMyTeacher;
