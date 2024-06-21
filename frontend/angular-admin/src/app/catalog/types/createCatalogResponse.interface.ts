export interface CreateCatalogResponseInterface {
    brands: ProductBrand;
    description: string;
    id: string;
    image: any; // You may need to define a proper type for the image
    imageFile: any;
    
    name: string;
    price: number;
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

/*
const result: createCatalogResponseInterface = {
    brands: {
        id: null,
        name: "somebrand2"
    },
    description: "someproductdesction2",
    id: "66681824172f9ca8599f1443",
    image: null,
    imageFile: "adidas_foo242556450.png",
    name: "someproductname2",
    price: 10,
    summary: "someproductsummary2",
    types: {
        id: null,
        name: "sometype2"
    }
};
*/