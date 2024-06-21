import { getBrands } from "../../services/apiCatalog";

export async function useGetBrands() {
    
    try {
        const brands = await getBrands();
        return brands;
    } catch (error) {
        console.error('Error fetching brands:', error);
        throw error; // Rethrow the error to handle it elsewhere
    }
}
