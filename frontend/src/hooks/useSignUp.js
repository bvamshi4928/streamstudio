import {signup} from "../lib/api.js"
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useSignUp = () => {
    const queryClient = useQueryClient();
  const {
    mutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });
  return {error,isPending,singupMutation:mutate}
}

export default useSignUp