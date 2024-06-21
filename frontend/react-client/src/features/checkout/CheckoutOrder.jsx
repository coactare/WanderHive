import styled from "styled-components";
//import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/common/Row";
import Heading from "../../ui/common/Heading";
import Button from "../../ui/common/Button";
import Checkbox from "../../ui/common/Checkbox";
import ButtonGroup from "../../ui/common/ButtonGroup";
//import Spinner from "../../ui/Spinner";

// import { useMoveBack } from "../../hooks/useMoveBack";
// import { useBooking } from "../bookings/useBooking";
// import { useEffect, useState } from "react";
// import Checkbox from "../../ui/Checkbox";
// import { formatCurrency } from "../../utils/helpers";
// import { useCheckin } from "./useCheckin";
// import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
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


function CheckoutOrder() {
  // const [confirmPaid, setConfirmPaid] = useState(false);
  // const [addBreakfast, setAddBreakfast] = useState(false);
  // const { booking, isLoading } = useBooking();
  // const { settings, isLoading: isLoadingSettings } = useSettings();

  // useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  // const moveBack = useMoveBack();
  // const { checkin, isCheckingIn } = useCheckin();

  // if (isLoading || isLoadingSettings) return <Spinner />;

  let booking = [];
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking 1</Heading>
        <ButtonText >&larr; Back</ButtonText>
      </Row>

      {/* <BookingDataBox booking={booking} /> */}

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={true}
           
            id="breakfast"
          >
            Want to add breakfast for $30?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={true}
          disabled={true}
          id="confirm"
        >
          I confirm that Rishi has paid the total amount of $20
          
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button>
          Check in booking 1
        </Button>
        <Button variation="secondary">
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckoutOrder;
