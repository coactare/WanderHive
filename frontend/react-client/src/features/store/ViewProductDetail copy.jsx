import styled from "styled-components";
import Row from "../../ui/common/Row";
import Heading from "../../ui/common/Heading";
import Button from "../../ui/common/Button";
import { HiArrowUpOnSquare, HiMinus, HiPlus } from "react-icons/hi2";

import { useMoveBack } from "../../hooks/useMoveBack";
import Img from '../../ui/common/Img';
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

// const Img = styled.img`
//   display: block;
//   width: 6.4rem;
//   aspect-ratio: 3 / 2;
//   object-fit: cover;
//   object-position: center;
//   transform: scale(1.5) translateX(-7px);
// `;

const Tag = styled.span`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  /* Make these dynamic, based on the received prop */
  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
`;

const ButtonText = styled.button`
  color: var(--color-brand-600);
  font-weight: 500;
  text-align: center;
  transition: all 0.3s;
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);

  &:hover,
  &:active {
    color: var(--color-brand-700);
  }
`;


function ProductDetail() {
    let booking = null;
    const moveBack = useMoveBack();
    // const navigate = useNavigate();
  
    // if (isLoading) return <Spinner />;
    // if (!booking) return <Empty resourceName="booking" />;
  
    const statusToTagName = {
      unconfirmed: "blue",
      "checked-in": "green",
      "checked-out": "silver",
    };
  
    return (
      <>
        <Row type="horizontal">
          

          <Img src="./adidas_football-1.png" alt="Adidas Football" />

          {"unconfirmed" === "unconfirmed" && (
            <Button >
              <HiMinus/>
            </Button>
          )}

<Heading as="h4">1</Heading>
  
          {"checked-in" === "checked-in" && (
            <Button
              icon={<HiArrowUpOnSquare />}
              
              disabled={false}
            >
              <HiPlus/>
            </Button>
          )}

{"checked-in" === "checked-in" && (
            <Button
              icon={<HiArrowUpOnSquare />}
              
              disabled={false}
            >
              Add To Cart
            </Button>
          )}
          {/* <HeadingGroup>
           
            <Tag>In-Progress</Tag>
          </HeadingGroup> */}
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>
        <Row type="vertical">
          <HeadingGroup>
            <Heading as="h1">Adidas FIFA World Cup 2018 OMB Football ₹3,200.00</Heading>
            <Tag>In-Progress</Tag>
          </HeadingGroup>
        </Row>
  
        {/* <BookingDataBox booking={booking} /> */}
  
        <ButtonGroup>
      
  
          {/* <Modal>
            <Modal.Open opens="delete">
              <Button variation="danger">Delete booking</Button>
            </Modal.Open>
  
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="booking"
                disabled={false}
              />
            </Modal.Window>
          </Modal> */}
  
          <Button variation="secondary" >
            Back
          </Button>
        </ButtonGroup>
      </>
    );
  }

export default ProductDetail;