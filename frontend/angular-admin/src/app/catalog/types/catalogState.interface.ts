import { BackendErrorsInterface } from "../../shared/types/backendErrors.interface";
import { CreateCatalogResponseInterface } from "./createCatalogResponse.interface";
import { getCatalogResponseInterface } from "./getCatalogResponse.interface";

export interface CatalogStateInterface {
    isSubmitting: boolean,
    isLoading: boolean,
    validationErrors: BackendErrorsInterface | null
    currentCatalog: CreateCatalogResponseInterface | undefined,
    catalogData: getCatalogResponseInterface | undefined
    deleteActionResponse : any
    fetchCatalogItemByIdActionResponse : any,
    editCatalogResponse: any
}