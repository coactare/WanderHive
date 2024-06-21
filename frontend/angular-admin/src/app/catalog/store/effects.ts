import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { CatalogService } from '../services/catalog.service'
import { catalogActions } from './actions'
import { catchError, map, of, switchMap } from 'rxjs'
import { CreateCatalogResponseInterface } from '../types/createCatalogResponse.interface'
import { PersistanceService } from '../../shared/services/persistance.service'
import { getCatalogResponseInterface } from '../types/getCatalogResponse.interface'

export const getCreateCatalogRequestEffect = createEffect((actions$ = inject(Actions), catalogService = inject(CatalogService), persistanceService = inject(PersistanceService)) => {
    return actions$.pipe(
        ofType(catalogActions.createCatalog),
        switchMap(({ createCatalog }) => {
            return catalogService.createCatalog(createCatalog).pipe(
                map((res: CreateCatalogResponseInterface) => {
                    
                    persistanceService.set('accessToken', '1234567890');
                    return catalogActions.createCatalogSuccess({ res })
                }),
                catchError((error) => {
                    return of(catalogActions.createCatalogFailure({ errors: error }));
                })
            );
        })
    );
}, { functional: true });

export const editCatalogRequestEffect = createEffect((actions$ = inject(Actions), catalogService = inject(CatalogService), persistanceService = inject(PersistanceService)) => {
  return actions$.pipe(
      ofType(catalogActions.editCatalog),
      switchMap(({ editCatalog }) => {
          return catalogService.editCatalog(editCatalog).pipe(
              map((editCatalogResponse: CreateCatalogResponseInterface) => {
                  //persistanceService.set('accessToken', '1234567890');
                  return catalogActions.editCatalogSuccess({ editCatalogResponse })
              }),
              catchError((error) => {
                  return of(catalogActions.createCatalogFailure({ errors: error }));
              })
          );
      })
  );
}, { functional: true });


export const getCatalogEffect = createEffect(
    (actions$ = inject(Actions), catalogService = inject(CatalogService)) => {
      return actions$.pipe(
        ofType(catalogActions.getCatalog),
        switchMap(({catalogParams}) => {
          
          return catalogService.getCatalog(catalogParams).pipe(
            map((catalog: getCatalogResponseInterface) => {
              return catalogActions.getCatalogSuccess({catalog})
            }),
            catchError(() => {
              return of(catalogActions.getCatalogFailure())
            })
          )
        })
      )
    },
    {functional: true}
  )

  export const deleteCatalogItemEffect = createEffect(
    (actions$ = inject(Actions), catalogService = inject(CatalogService)) => {
      return actions$.pipe(
        ofType(catalogActions.deleteCatalogItem),
        switchMap(({id}) => {
          return catalogService.deleteCatalogItem(id).pipe(
            map((response: any) => {
              return catalogActions.deleteCatalogItemSuccess({response})
            }),
            catchError(() => {
              return of(catalogActions.deleteCatalogItemFailure())
            })
          )
        })
      )
    },
    {functional: true}
  )

  export const fetchCatalogItemByIdEffect = createEffect(
    (actions$ = inject(Actions), catalogService = inject(CatalogService)) => {
      return actions$.pipe(
        ofType(catalogActions.fetchCatalogItemById),
        switchMap(({id}) => {
          return catalogService.fetchCatalogItemById(id).pipe(
            map((fetchCatalogItemByIdResponse: any) => {
              return catalogActions.fetchCatalogItemByIdSuccess({fetchCatalogItemByIdResponse})
            }),
            catchError(() => {
              return of(catalogActions.fetchCatalogItemByIdfailure())
            })
          )
        })
      )
    },
    {functional: true}
  )





// let someData: CreateCatalogRequestInterface = {
//     name: 'Product Name',
//     summary: 'Product Summary',
//     description: 'Product Description',
//     image: 'product-image.jpg',
//     imageFile: 'product-image-file.jpg',
//     price: 100,
//     brands: { id: '1', name: 'Brand Name' },
//     types: { id:'1', name: 'Product Type' }
// };