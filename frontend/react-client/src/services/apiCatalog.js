import apiUrl from '../services/apiUrl';
export async function add_editCatalogItem(catalogItem) {

    const formData = new FormData();

    formData.append('Name', catalogItem.productname);
    formData.append('Summary', catalogItem.productsummary);
    formData.append('Description', catalogItem.productdescription);
    formData.append('Price', catalogItem.price);
    formData.append('Image', catalogItem.image[0]);
    formData.append('Brands.Name', catalogItem.brandname);
    formData.append('Types.Name', catalogItem.producttype);

    try {
        let url = String();

        if (catalogItem.id != null && catalogItem.id != undefined && catalogItem.id) {
            url = apiUrl() + 'Catalog/UpdateProduct';
            formData.append('Id', catalogItem.id);
        }
        else {
            url = apiUrl() + 'Catalog/CreateProduct';
        }
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to create/edit product');
        }

        const data = await response.json();

        return data;

    } catch (error) {
        throw new Error(`Error creating/editing product: ${error.message}`);
    }
}

export async function getCatalog(queryParams) {

    try {
        const url = apiUrl() + `Catalog/GetAllProductsAllowAnonymous?${queryParams}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();

        return jsonData;
    }
    catch (error) {

        console.error('Error fetching catalogs:', error);
        throw error;
    }
}

// export function getBrands() {

//     try {
//         const url = apiUrl() + `Catalog/GetAllBrands`;

//         const response = fetch(url);

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const jsonData = response.json();

//         return jsonData;
//     }
//     catch (error) {

//         console.error('Error fetching catalogs:', error);
//         throw error;
//     }
// }

export async function getBrands() {
    try {
        const url = apiUrl() + `Catalog/GetAllBrands`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error to handle it elsewhere
    }
}


// export async function getTypes() {

//     try {
//         const url = apiUrl() + `Catalog/GetAllTypes?${queryParams}`;

//         const response = await fetch(url);

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const jsonData = await response.json();

//         return jsonData;
//     }
//     catch (error) {

//         console.error('Error fetching catalogs:', error);
//         throw error;
//     }
// }

export async function getTypes() {
    try {
        const url = apiUrl() + `Catalog/GetAllTypes`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error to handle it elsewhere
    }
}

export async function getProductById(id) {
    try {

        const url = apiUrl() + `Catalog/GetProductById/${id}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch Product with ID ${id}`);
        }

        const data = await response.json();

        return data;

    } catch (error) {
        throw new Error(`Error fetching Product: ${error.message}`);
    }
}

export async function deleteCatalogItem(id) {
    try {
        const url = apiUrl() + `Catalog/DeleteProduct/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();

        return jsonData;
    }
    catch (error) {

        console.error('Error fetching catalogs:', error);
        throw error;
    }
}