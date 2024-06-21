import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/apiCatalog";

export function useGetProductById() {
    
    const { productId } = useParams();
  
    const {
      isLoading,
      data,
      error
    } = useQuery({
        queryKey: ["product", productId],
      queryFn: () => getProductById(productId),
      retry: false,
    });
    
    return { isLoading, error, data };
  }