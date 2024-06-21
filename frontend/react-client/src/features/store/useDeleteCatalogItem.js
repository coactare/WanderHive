import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCatalogItem } from '../../services/apiCatalog';
import toast from "react-hot-toast";

export function useDeleteCabin() {
    const queryClient = useQueryClient();

    const { isLoading, mutate } = useMutation(
        {
            mutationFn: deleteCatalogItem,
            onSuccess: () => {
                toast.success('Catalog item successfully deleted');
                queryClient.invalidateQueries({queryKey: ["cabins"]})
            },
            onError: (err) => toast.error(err.message),
        }
    )

    return { isLoading, mutate };
}