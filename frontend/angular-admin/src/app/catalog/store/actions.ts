import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BackendErrorsInterface } from '../../shared/types/backendErrors.interface';
import { CreateCatalogResponseInterface } from '../types/createCatalogResponse.interface';
import { CreateCatalogRequestInterface } from '../types/createCatalogRequest.interface';
import { getCatalogResponseInterface } from '../types/getCatalogResponse.interface';
import { CatalogParams } from '../types/CatalogParams';
import { EditCatalogRequestInterface } from '../types/editCatalogRequest.interface';


export const catalogActions = createActionGroup({
    source: 'catalog',
    events: {
        CreateCatalog: props<{ createCatalog: CreateCatalogRequestInterface }>(),
        'CreateCatalog Success': props<{ res: CreateCatalogResponseInterface }>(),
        'CreateCatalog Failure': props<{ errors: BackendErrorsInterface }>(),

        EditCatalog: props<{ editCatalog: EditCatalogRequestInterface }>(),
        'EditCatalog Success': props<{ editCatalogResponse: CreateCatalogResponseInterface }>(),
        'EditCatalog Failure': props<{ errors: BackendErrorsInterface }>(),

        GetCatalog: props<{catalogParams: CatalogParams}>(),
        'Get Catalog success': props<{ catalog: getCatalogResponseInterface }>(),
        'Get Catalog failure': emptyProps(),

        DeleteCatalogItem: props<{id: string}>(),
        'Delete Catalog Item success': props<{ response: any }>(),
        'Delete Catalog Item failure': emptyProps(),

        fetchCatalogItemById: props<{id: string}>(),
        'Fetch Catalog Item By Id success': props<{ fetchCatalogItemByIdResponse: any }>(),
        'Fetch Catalog Item By Idfailure': emptyProps(),
    }
});


