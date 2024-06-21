import { getCatalog } from '../../services/apiCatalog';
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
export function useGetCatalog() {

    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

    // FILTER
    //const filterValue = searchParams.get("description");
    //const Description = !filterValue ? null : "all";
    const Description = searchParams.get("description") || "all";

    // SORT
    const Sort = searchParams.get("sortBy") || "nameAsc";
    //const [field, direction] = sortByRaw.split("-");
    //const Sort = { field, direction };


    const Page = searchParams.get("page") || "1";

    const BrandId = searchParams.get("brandId") || "";

    const TypeId = searchParams.get("typeId") || "";

    

    let pageIndex;
    let pageSize;
    
    if (Page) {
        pageIndex = Page;
        pageSize = PAGE_SIZE;
    }
    
    const queryParams = new URLSearchParams({
        Sort: Sort,
        Description: Description,
        PageIndex: pageIndex,
        PageSize: pageSize,
        BrandId: BrandId,
        TypeId: TypeId,
    });

    // const queryParams = {
    //     Description: Description,
    //     Sort: Sort
    // };

    const { isLoading, data: catalogs, error } = useQuery({
        queryKey: ["catalogs"],
        //queryFn: getCatalog(queryParams),
        queryFn: () => getCatalog(queryParams),
    });


    queryClient.prefetchQuery({
        
            queryKey: ["catalogs"],
            queryFn: () => getCatalog(queryParams),
        
    });

    return { isLoading, data: catalogs, error };
}
