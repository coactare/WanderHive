
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreateCatalogRequestInterface } from "../types/createCatalogRequest.interface";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { CreateCatalogResponseInterface } from "../types/createCatalogResponse.interface";
import { getCatalogResponseInterface } from "../types/getCatalogResponse.interface";
import { CatalogParams } from "../types/CatalogParams";
import { AcntService } from "../../account/acnt.service";
import { EditCatalogRequestInterface } from "../types/editCatalogRequest.interface";

@Injectable({
    providedIn: 'root',
})

export class CatalogService {

    constructor(private http: HttpClient, private acntService: AcntService) { }

    createCatalog(data: CreateCatalogRequestInterface): Observable<CreateCatalogResponseInterface> {

        const httpOptions = {
            headers: new HttpHeaders({

                'Authorization': this.acntService.authorizationHeaderValue
            })
        };

        const fullUrl = environment.apiUrl + 'Catalog/CreateProduct';

        const formData = new FormData();

        formData.append('Name', data.name);
        formData.append('Summary', data.summary);
        formData.append('Description', data.description);
        formData.append('Price', data.price.toString());
        if (data.image instanceof File) {

            formData.append('Image', data.image);
        }
        formData.append('ImageFile', data.imageFile);
        formData.append('Brands.Name', data.brands.name);
        formData.append('Types.Name', data.types.name);

        debugger
        return this.http.post<CreateCatalogResponseInterface>(fullUrl, formData, { headers: httpOptions.headers });
    }

    editCatalog(data: EditCatalogRequestInterface): Observable<CreateCatalogResponseInterface> {

        debugger
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': this.acntService.authorizationHeaderValue
            })
        };

        const fullUrl = environment.apiUrl + 'Catalog/UpdateProduct';

        const formData = new FormData();

        formData.append('Name', data.name);
        formData.append('Summary', data.summary);
        formData.append('Description', data.description);
        formData.append('Price', data.price.toString());
        if (data.image instanceof File) {

            formData.append('Image', data.image);
        }
        formData.append('ImageFile', data.imageFile);
        formData.append('Brands.Name', data.brands.name);
        formData.append('Types.Name', data.types.name);

        debugger
        return this.http.post<CreateCatalogResponseInterface>(fullUrl, formData, { headers: httpOptions.headers });
    }

    getCatalog(catalogParams: CatalogParams): Observable<getCatalogResponseInterface> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.acntService.authorizationHeaderValue
            })
        };


        let params = new HttpParams();
        if (catalogParams.brandId) {
            params = params.append('brandId', catalogParams.brandId);
        }
        if (catalogParams.typeId) {
            params = params.append('typeId', catalogParams.typeId);
        }

        if (catalogParams.search) {
            params = params.append('search', catalogParams.search);
        }


        params = params.append('sort', catalogParams.sort);
        params = params.append('pageIndex', catalogParams.pageIndex);
        params = params.append('pageSize', catalogParams.pageSize);

        const fullUrl = environment.apiUrl + 'Catalog/GetAllProducts';

        /*
        this.http.get<CreateCatalogResponseInterface>(fullUrl).subscribe((res: CreateCatalogResponseInterface) => {
            var x = res;
            console.log(res);
        }); 
        */

        return this.http.get<getCatalogResponseInterface>(fullUrl, { params: params, headers: httpOptions.headers });
    }

    deleteCatalogItem(id: string): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.acntService.authorizationHeaderValue
            })
        };

        const fullUrl = environment.apiUrl + `Catalog/DeleteProduct/${id}`;
        /*
        this.http.delete(fullUrl).subscribe((res: any) => {
            var x = res;
            console.log(res);
        });
        */
        return this.http.delete(fullUrl, { headers: httpOptions.headers });
    }

    fetchCatalogItemById(id: string): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.acntService.authorizationHeaderValue
            })
        };

        const fullUrl = environment.apiUrl + `Catalog/GetProductById/${id}`;


        // this.http.get(fullUrl).subscribe((res: any) => {
        //     var x = res;
        //     console.log(res);
        // });

        return this.http.get<any>(fullUrl, { headers: httpOptions.headers });
    }

}
