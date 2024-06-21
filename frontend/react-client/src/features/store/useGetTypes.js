import { getTypes } from "../../services/apiCatalog";

export async function useGetTypes() {
    try {
        const brands = await getTypes();
        return brands;
    } catch (error) {
        console.error('Error fetching brands:', error);
        throw error; // Rethrow the error to handle it elsewhere
    }
}
