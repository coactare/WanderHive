import styled from 'styled-components';
import Table from '../../ui/common/Table';
import { HiOutlineCurrencyDollar, HiPencil, HiArrowUpOnSquare, HiTrash, HiMinus, HiPlus } from 'react-icons/hi2';
import Row from '../../ui/common/Row';
import Button from '../../ui/common/Button';
import Heading from "../../ui/common/Heading";
import { decrementCartItem, incrementCartItem, removeItemFromServerCart, removeItemFromLocalCart } from './basketSlice';
import { useDispatch } from 'react-redux';

import Modal from '../../ui/common/Modal';
import ConfirmDelete from '../../ui/common/ConfirmDelete';

import CreateCabinForm from './CreateCabinForm';

// import { formatCurrency } from '../../utils/helpers';
// import { useDeleteCabin } from './useDeleteCabin';
// import CreateCabinForm from './CreateCabinForm';
// import { HiPencil, HiTrash } from 'react-icons/hi';
// import { HiSquare2Stack } from 'react-icons/hi2';
import Menus from '../../ui/common/Menus';

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

const Delete = styled.div`
  cursor: pointer;
`;

//"quantity":3,"imageFile":"images/products/adidas_shoe-1.png","price":3000,"productId":"602d2149e773f2a3990b47f5","productName":"Adidas Quick Force Indoor Badminton Shoes"}

function CabinRow({ catalog, totalPrice }) {

  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {

    console.log(productId);
    //dispatch(removeItemFromLocalCart({ productId }));
    //dispatch(removeItemFromServerCart());
  };

  const handleIncrementCartItem = (productId) => {

    dispatch(incrementCartItem({ productId, itemCount: 1 }));
    dispatch(removeItemFromServerCart());
  };

  const handleDecrementCartItem = (productId) => {

    dispatch(decrementCartItem({ productId, itemCount: 1 }));
    dispatch(removeItemFromServerCart());
  };

  return (
    <>
      <Table.Row role="Row">
        <div>{catalog.productName}</div>
        <div>₹ {catalog.price}</div>
        <div>
          <Row type="horizontal">

            {"unconfirmed" === "unconfirmed" && (
              // <Button onClick={() => dispatch({ type: 'basket/decrementCartItem', payload: { productId: catalog.productId, itemCount: 1 } })}>
              //   <HiMinus />
              // </Button>

              <Button onClick={() => handleDecrementCartItem(catalog.productId)}>
                <HiMinus />
              </Button>
            )}

            <Heading as="h5">{catalog.quantity}</Heading>

            {"checked-in" === "checked-in" && (
              // <Button icon={<HiArrowUpOnSquare />} disabled={false} onClick={() => dispatch({ type: 'basket/decrementCartItem', payload: { productId: catalog.productId, itemCount: 1 } })}>
              //   <HiPlus />
              // </Button>

              <Button icon={<HiArrowUpOnSquare />} disabled={false} onClick={() => handleIncrementCartItem(catalog.productId)}>
                <HiPlus />
              </Button>
            )}

          </Row>
        </div>

        {/* <Delete onClick={() => handleRemoveFromCart(catalog.productId)}><HiTrash /></Delete> */}

        {/* <Img src={`data:image/jpeg;base64,${image}`} alt="Base64 Image" />
      <Price>{formatCurrency(price)}</Price>

       */}

        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={catalog.productId} />

              <Menus.List id={catalog.productId}>
                {/* <Menus.Button icon={<HiSquare2Stack />} onClick={() => alert(1)}>
                Duplicate
              </Menus.Button> */}

                {/* <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open> */}

                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>



                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              {/* <Modal.Window name="edit">
              <CreateCabinForm catalogToEdit={catalog} />
            </Modal.Window> */}

              <Modal.Window name="edit">
                <CreateCabinForm catalogToEdit={catalog} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="catalog"
                  disabled={false}
                  onConfirm={() => handleRemoveFromCart(catalog.productId)}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>

    </>
  )
}
export default CabinRow;