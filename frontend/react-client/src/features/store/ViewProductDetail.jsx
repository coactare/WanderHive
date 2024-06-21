import styled from "styled-components";
import Row from "../../ui/common/Row";
import Heading from "../../ui/common/Heading";
import Button from "../../ui/common/Button";
import { HiArrowUpOnSquare, HiMinus, HiPlus } from "react-icons/hi2";
import { useMoveBack } from "../../hooks/useMoveBack";
import Img from "../../ui/common/Img";
import { useGetProductById } from "./useGetProductById";
import Spinner from "../../ui/common/Spinner";

import { useAppSelector } from '../../store/configureStore';
//import { decrementCartItem, incrementCartItem } from '../cart/basketSlice';
import { useSetBasket } from "../cart/useSetBasket";
import { useSelector, useDispatch } from 'react-redux';
import { addItem, addItemToCart, setBasketState, decrementCartItem } from '../../features/cart/basketSlice';


const Tag = styled.span`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;
  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);
`;

const ButtonText = styled.button`
  color: var(--color-brand-600);
  font-weight: 500;
  text-align: center;
  transition: all 0.3s;
  background: none;
  display: flex;
  justify-content: start;
  border: none;
  border-radius: var(--border-radius-sm);

  &:hover,
  &:active {
    color: var(--color-brand-700);
  }
`;


function ProductDetail() {

    const { mutate } = useSetBasket();
    const { basket, status } = useAppSelector(state => state.basket);
    const dispatch = useDispatch();

    

    const { isLoading, error, data } = useGetProductById();

    const moveBack = useMoveBack();

    if (isLoading) return <Spinner />;

    const handleAddToCart = () => {
        dispatch(addItem({ data }));
        dispatch(addItemToCart({ basket }));
    };

    return (
        <>
            <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            <div class="container grid grid--2-cols grid--center-v">
                <div class="step-img-box">
                    <Img src={`data:image/jpeg;base64,${data.image}`} alt="Base64 Image" />
                </div>

                <div class="step-text-box">
                    <Row type="horizontal">
                        <Row type="vertical">
                            <h2 class="heading-secondary">
                                {data.name}
                            </h2>
                            <h3 class="heading-tertiary">₹ {data.price}</h3>
                        </Row>
                    </Row>

                    <Row type="horizontal">
                        {/* <Button onClick={() => dispatch(decrementCartItem(1))}><HiMinus /></Button>

                        <Heading as="h4">{counterValue}</Heading>

                        <Button onClick={() => dispatch(incrementCartItem(1))} disabled={false}>
                            <HiPlus />
                        </Button> */}

                        {/* <Button onClick={() => dispatch({ type: 'basket/incrementCartItem', payload: { productId: data?.id, itemCount: 1 } })}>Add To Cart</Button> */}
                        <Button icon={<HiArrowUpOnSquare />} disabled={false} onClick={handleAddToCart}>
                            Add To Cart
                        </Button>
                    </Row>
                    <p class="step-description">
                        {data.description}
                    </p>
                </div>
            </div>

        </>
    );
}

export default ProductDetail;