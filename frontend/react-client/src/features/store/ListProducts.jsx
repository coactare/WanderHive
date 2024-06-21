import { HiBackspace, HiEye, HiShoppingCart } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ButtonIcon from "../../ui/common/ButtonIcon";
import Checkbox from "../../ui/common/Checkbox";
import { HiSearch } from "react-icons/hi";
import Input from "../../ui/common/Input";
import Select from "../../ui/common/Select";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useGetCatalog } from './useGetCatalog';
import { useGetBrands } from "./useGetBrands";
import Img from '../../ui/common/Img';
import Pagination from "../../ui/common/Pagination";
import { useEffect } from "react";
import { useGetTypes } from "./useGetTypes";
import Spinner from "../../ui/common/Spinner";

const Section = styled.section`
    padding: 20px;
`;

const FilterGroup = styled.div`
    margin-bottom: 20px;
`;

const Title = styled.h3`
    margin-bottom: 10px;
    color: var(--color-brand-600);
`;

const FilterList = styled.ul`
    list-style: none;
    padding: 0;
`;

/* products list sectiomn*/

const SearchContainer = styled.div`
    display: flex;    
    justify-content: start;
    margin-bottom: 20px;
    margin-top: 20px;

    input {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-right: 10px;
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
`;

const Item = styled.div`
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;

    img {
        width: 100%;
        border-radius: 4px;
        margin-bottom: 10px;
    }

    a {
        text-decoration: none;
        color: #333;

        &:hover {
            text-decoration: underline;
        }
    }
`;

const ItemDisplay = styled.div``;
const ItemAction = styled.div``;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;    
`;

const ProductTitle = styled.h6`
    margin: 0;
    font-size: 18px;
    color: #333;
    margin-bottom: 5px;
`;

const ProductPrice = styled.span`
    font-size: 18px;
    color: #666;
`;

const ActionButtonDiv = styled.div`
display:flex;
flex-direction:row;
justify-content:end;

`;

function ListProducts() {

    const { isLoading, data: catalogs, error } = useGetCatalog();

    /* Brand Management Start */

    const [brandCheckboxes, setBrandCheckboxes] = useState([]);

    const handleCheckAllBrands = (event) => {
        const isChecked = event.target.checked;
        const updatedCheckboxes = brandCheckboxes.map(checkbox => ({ ...checkbox, checked: isChecked }));
        setBrandCheckboxes(updatedCheckboxes);
    };

    const handleBrandCheckboxChange = (event, id) => {

        searchParams.set("brandId", id);
        setSearchParams(searchParams);
        const isChecked = event.target.checked;
        const updatedCheckboxes = brandCheckboxes.map(checkbox =>
            checkbox.id === id ? { ...checkbox, checked: isChecked } : checkbox
        );
        setBrandCheckboxes(updatedCheckboxes);
    };

    const isBrandCheckAllChecked = brandCheckboxes.length > 0 && brandCheckboxes.every(checkbox => checkbox.checked);

    useEffect(() => {
        const fetchData = async () => {
            const data = await useGetBrands();
            setBrandCheckboxes(data.data);
        };

        fetchData();
    }, []);
    /* Brand Management Ends */


    /* Sort By Management Starts */
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get("sortBy") || "";

    function handleSortByChange(e) {
        searchParams.set("sortBy", e.target.value);
        setSearchParams(searchParams);
    }
    /* Sort By Management Ends */

    /* Types Management Start ********************************************************************************/

    
    const [typeCheckboxes, setTypeCheckboxes] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await useGetTypes();
            setTypeCheckboxes(data.data.map(type => ({ ...type, checked: false })));
        };
        fetchData();
    }, []);

    const handleCheckAllTypes = (event) => {
        const isChecked = event.target.checked;
        const updatedCheckboxes = typeCheckboxes.map(checkbox => ({ ...checkbox, checked: isChecked }));
        setTypeCheckboxes(updatedCheckboxes);
    };

    const handleTypeCheckboxChange = (event, id) => {

        searchParams.set("typeId", id);
        setSearchParams(searchParams);
        const isChecked = event.target.checked;
        const updatedCheckboxes = typeCheckboxes.map(checkbox =>
            checkbox.id === id ? { ...checkbox, checked: isChecked } : checkbox
        );
        setTypeCheckboxes(updatedCheckboxes);
    };

    const isTypeCheckAllChecked = typeCheckboxes.length > 0 && typeCheckboxes.every(checkbox => checkbox.checked);


    /* Types Management Ends ********************************************************************************/


    const navigate = useNavigate();

    function addItemToCart() {
        alert('Item added to cart');
    }

    if (isLoading) return <Spinner />;
    return (
        <div class="container grid grid--2-cols">
            <Section>
                <FilterGroup>
                    <Title>Sort By</Title>
                    <Select
                        options={[
                            { value: "nameAsc", label: "Sort by name (A-Z)" },
                            { value: "nameDesc", label: "Sort by name (Z-A)" },
                            { value: "priceAsc", label: "Sort by price (low first)" },
                            { value: "priceDesc", label: "Sort by price (high first)" }
                        ]}
                        type="white"
                        value={sortBy}
                        onChange={handleSortByChange} />
                </FilterGroup>



                <FilterGroup>
                    <Title>Brands</Title>
                    <FilterList>
                        <Checkbox
                            id="brand-all"
                            checked={isBrandCheckAllChecked}
                            onChange={handleCheckAllBrands}
                            value="all">
                            All
                        </Checkbox>
                        {brandCheckboxes?.map(checkbox => (
                            <Checkbox
                                key={checkbox.id}
                                id={checkbox.id}
                                checked={checkbox.checked || false}
                                onChange={(event) => handleBrandCheckboxChange(event, checkbox.id)}
                                value={checkbox.name}> {checkbox?.name} </Checkbox>
                        ))}
                    </FilterList>
                </FilterGroup>

                <FilterGroup>
                    <Title>Types</Title>
                    <FilterList>
                        <Checkbox
                            id="brand-all"
                            checked={isTypeCheckAllChecked}
                            onChange={handleCheckAllTypes}
                            value="all">
                            All
                        </Checkbox>
                        {typeCheckboxes?.map(checkbox => (
                            <Checkbox
                                key={checkbox.id}
                                id={checkbox.id}
                                checked={checkbox.checked || false}
                                onChange={(event) => handleTypeCheckboxChange(event, checkbox.id)}
                                value={checkbox.name}> {checkbox?.name} </Checkbox>
                        ))}
                    </FilterList>
                </FilterGroup>



            </Section>
            <Section>
                <div>
                    <Pagination count={catalogs?.count} />
                    {/* <SearchContainer>
                            <Input type="text" placeholder="Search" />
                            <ButtonIcon><HiSearch /></ButtonIcon>
                            <ButtonIcon><HiBackspace /></ButtonIcon>
                        </SearchContainer> */}
                    <Grid>
                        {catalogs?.data &&

                            catalogs?.data?.map(catalog => (
                                <Item onClick={() => navigate(`/product-details/${catalog.id}`)} key={catalog.id}>
                                    <ItemDisplay>
                                        <Img src={`data:image/jpeg;base64,${catalog.image}`} alt="Base64 Image" />
                                        {/* <ActionButtonDiv>
                                            <ButtonIcon onClick={addItemToCart}>
                                                <HiShoppingCart />
                                            </ButtonIcon>
                                           
                                        </ActionButtonDiv> */}
                                    </ItemDisplay>
                                    <ItemAction>
                                        <ProductInfo>
                                            <ProductTitle>{catalog.name}</ProductTitle>
                                            <ProductPrice>MRP : ₹ {catalog.price}</ProductPrice>
                                        </ProductInfo>
                                    </ItemAction>
                                </Item>
                            ))}
                    </Grid>
                </div>
            </Section>
        </div >
    );
}

export default ListProducts;