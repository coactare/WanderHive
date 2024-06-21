export interface EditCatalogRequestInterface {
    brands: ProductBrand;
    description: string;
    image: null | File;
    imageFile: any; // Assuming null, you may need to change this
    name: string;
    price: string;
    summary: string;
    types: ProductType;
}

interface ProductBrand {
    id: string | null;
    name: string;
}

interface ProductType {
    id: string | null;
    name: string;
}