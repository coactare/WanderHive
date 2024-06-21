import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";



const StyledMainAppLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function MainAppLayout() {

  return (
    <StyledMainAppLayout>
      <Header />
      {/* <Sidebar /> */}
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
      <Footer />
    </StyledMainAppLayout>
  );
}

export default MainAppLayout;
