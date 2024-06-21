
import CabinRow from "./CabinRow";
import styled from 'styled-components';
import Table from '../../ui/common/Table';
import Menus from "../../ui/common/Menus";
import Pagination from "../../ui/common/Pagination";
import { formatCurrency } from "../../utils/helpers";
import { HiOutlineCurrencyDollar, HiArrowUpOnSquare, HiTrash, HiMinus, HiPlus } from 'react-icons/hi2';
import Button from '../../ui/common/Button';
import BookingDataBox from "./BookingDataBox";
import ButtonGroup from "../../ui/common/ButtonGroup";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useAppSelector } from '../../store/configureStore';




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
/*DataItem*/
const StyledDataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 0.8rem 0;
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 500;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-600);
  }
`;
/*DataItem*/


function CartDetails() {

  const moveBack = useMoveBack();

  const { basket, status } = useAppSelector(state => state.basket);
  
  let catalogs = [{ "id": "997d2149e773f2a3990b47fa", "name": "Adidas FIFA World Cup 2018 OMB Football", "summary": "Adidas FIFA World Cup 2018 OMB Football", "description": "Featuring an innovative surface panel design, this is the match ball used during football's FIFA World Cup™. Inspired by Russia's urban landscapes, a pixelated graphic pays tribute to the iconic Telstar ball. Its thermally bonded seamless surface designs.", "imageFile": "Nike-Footb244002611.png", "image": "" },
  { "id": "997d2149e773f2a3990b47fb", "name": "Adidas FIFA World Cup 2018 OMB Football", "summary": "Adidas FIFA World Cup 2018 OMB Football", "description": "Featuring an innovative surface panel design, this is the match ball used during football's FIFA World Cup™. Inspired by Russia's urban landscapes, a pixelated graphic pays tribute to the iconic Telstar ball. Its thermally bonded seamless surface designs.", "imageFile": "Nike-Footb244002611.png", "image": "" }];

  //'{"userName":"sharma","items":[{"quantity":3,"imageFile":"images/products/adidas_shoe-1.png","price":3000,"productId":"602d2149e773f2a3990b47f5","productName":"Adidas Quick Force Indoor Badminton Shoes"}],"totalPrice":9000}'
  return (
    <Menus>
      <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      <Table columns='0.3fr 0.3fr 0.3fr 0.1fr'>
        <Table.Header>
          <div>Product Name</div>
          <div>Price</div>
          <div>Quantity</div>
          
          <div>Remove</div>
        </Table.Header>

        <Table.Body data={basket?.items} render={(item) => (<CabinRow totalPrice={basket?.totalPrice} catalog={item} key={item.productId} />)} />

        <Table.Footer>
          <Pagination count={basket?.items?.length} />
        </Table.Footer>
      </Table>

      {/* <StyledDataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(200.00)}

            {true &&
              ` (${formatCurrency(100.00)} cabin + ${formatCurrency(
                20.00
              )} breakfast)`}
          </StyledDataItem>

          <Button
                icon={<HiArrowUpOnSquare />}
                
                disabled={false}
              >
                Check out
              </Button> */}

      <BookingDataBox booking={basket} />
      <ButtonGroup>
        {/* <Button disabled={false} onClick={alert('xx')}>
          Order now
        </Button> */}
        {/* <Button variation="secondary">
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
                </Button> */}
      </ButtonGroup>
    </Menus>
  );
}

export default CartDetails;