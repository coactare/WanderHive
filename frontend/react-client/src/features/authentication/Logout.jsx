import { HiLogout } from "react-icons/hi";
import ButtonIcon from "../../ui/common/ButtonIcon";
import { useOidc } from '@axa-fr/react-oidc'

function Logout() {

  const { logout } = useOidc()

  return (
    <ButtonIcon onClick={() => logout('/login')}>
      <HiLogout />
    </ButtonIcon>
  );
}

export default Logout;
