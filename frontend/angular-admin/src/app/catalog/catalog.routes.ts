import { Route } from "@angular/router";
import { ManageCatalogComponent } from "./components/manage-catalog/manage-catalog.component";
import { CreateCatalogComponent } from "./components/create-catalog/create-catalog.component";
import { EditComponentComponent } from "./components/edit-component/edit-component.component";

export const manageCatalogRoutes: Route[] = [
    {
        path: '',
        component: ManageCatalogComponent
    },
]

export const addCatalogRoutes: Route[] = [
    {
        path: '',
        component: CreateCatalogComponent
    },
]

export const editCatalogRoutes: Route[] = [
    {
        path: '',
        component: EditComponentComponent
    },
]