import { createFeature, createReducer, on } from '@ngrx/store'
import { CatalogStateInterface } from '../types/catalogState.interface'
import { catalogActions } from './actions'
import { act } from '@ngrx/effects'
import { getCatalogResponseInterface } from '../types/getCatalogResponse.interface';

const initialState: CatalogStateInterface = {
    isSubmitting: false,
    isLoading: false,
    validationErrors: null,
    currentCatalog: undefined,
    catalogData: undefined,
    deleteActionResponse: false,
    fetchCatalogItemByIdActionResponse : undefined,
    editCatalogResponse: undefined
}

const catalogFeature = createFeature({
    name: 'catalog',
    reducer: createReducer(
        initialState,
        on(catalogActions.createCatalog, (state) => ({ ...state, isSubmitting: true, isLoading: true, validationErrors: null })),
        on(catalogActions.createCatalogSuccess, (state, action) => ({ ...state, isSubmitting: false, isLoading: false, currentCatalog: action.res })),
        on(catalogActions.createCatalogFailure, (state, action) => ({ ...state, isSubmitting: false, isLoading: false, validationErrors: action.errors })),

        on(catalogActions.editCatalog, (state) => ({ ...state, isSubmitting: true, isLoading: true, validationErrors: null })),
        on(catalogActions.editCatalogSuccess, (state, action) => ({ ...state, isSubmitting: false, isLoading: false, editCatalogResponse: action.editCatalogResponse })),
        on(catalogActions.editCatalogFailure, (state, action) => ({ ...state, isSubmitting: false, isLoading: false, validationErrors: action.errors })),


        on(catalogActions.getCatalog, (state) => ({ ...state, isLoading: true })),
        on(catalogActions.getCatalogSuccess, (state, action) => ({ ...state, isLoading: false, catalogData: action.catalog })),
        on(catalogActions.getCatalogFailure, (state) => ({ ...state, isLoading: false })),

        on(catalogActions.deleteCatalogItem, (state) => ({ ...state, isLoading: true })),
        on(catalogActions.deleteCatalogItemSuccess, (state, action) => ({ ...state, isLoading: false, deleteActionResponse: action.response })),
        on(catalogActions.deleteCatalogItemFailure, (state) => ({ ...state, isLoading: false })),

        on(catalogActions.fetchCatalogItemById, (state) => ({ ...state, isLoading: true })),
        on(catalogActions.fetchCatalogItemByIdSuccess, (state, action) => ({ ...state, isLoading: false, fetchCatalogItemByIdActionResponse : action.fetchCatalogItemByIdResponse })),
        on(catalogActions.fetchCatalogItemByIdfailure, (state) => ({ ...state, isLoading: false })),
    )
})

export const { name: catalogFeatureKey, reducer: catalogReducer, selectIsSubmitting,selectValidationErrors,selectFetchCatalogItemByIdActionResponse, selectIsLoading, selectCatalogData, selectDeleteActionResponse, selectEditCatalogResponse} = catalogFeature