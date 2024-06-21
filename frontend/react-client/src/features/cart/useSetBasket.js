import { setBasket } from "../../services/apiCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSetBasket() {

  const queryClient = useQueryClient();
  
  const { mutate, isLoading } = useMutation({
    mutationFn: setBasket,
    onSuccess: () => {
      toast.success("New basket successfully created");
      queryClient.invalidateQueries({ queryKey: ["basket"] });
    },
    onError: (err) => toast.error(err.message)
  });

  return { mutate, isLoading };
}
