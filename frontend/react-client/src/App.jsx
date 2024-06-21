import GlobalStyles from "./styles/GlobalStyles";
import MainAppLayout from "./ui/layout-components/MainAppLayout";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom/dist";
import ProductDetail from "./pages/ProductDetail";
import Store from "./pages/Store";
import CartDetails from "./features/cart/CartDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from './store/configureStore';
import { DarkModeProvider } from "./context/DarkModeContext";
import { OidcProvider, OidcSecure } from '@axa-fr/react-oidc';
import { configuration as is4 } from './services/identityServer4';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});


function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <Provider store={store}>


          <GlobalStyles />
          <OidcProvider configuration={is4} >
            <BrowserRouter>
              <Routes>
                <Route element={<OidcSecure><MainAppLayout /></OidcSecure>}>
                  {/* <Route index element={<Navigate replace to="home" />} /> */}
                  <Route path="home" element={<Home />} />
                  <Route path="store" element={<Store />} />
                  <Route path="product-details/:productId" element={<ProductDetail />} />
                  {/* <Route path="checkout" element={<Checkout />} /> */}
                  <Route path="cart-details" element={<CartDetails />} />


                </Route>
                <Route index element={<Navigate replace to="login" />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
          </OidcProvider>

        </Provider>
      </DarkModeProvider>
    </QueryClientProvider>

  );
}

export default App;