import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Badge from 'react-bootstrap/Badge';
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ShippingScreen from './screens/ShippingScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  console.log(state);

  const { cart, userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });

    localStorage.removeItem('cartItems');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1}></ToastContainer>
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>amazona</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <Link to="/profile">
                      <NavDropdown.Item>User profile</NavDropdown.Item>
                    </Link>
                    <Link to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </Link>
                    <NavDropdown.Divider />

                    <Link to="#signout" onClick={signoutHandler}>
                      Signout
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-4">
            <Routes>
              <Route path="/cart" element={<CartScreen></CartScreen>}></Route>
              <Route
                path="/products/:slug"
                element={<ProductScreen></ProductScreen>}
              ></Route>
              <Route
                path="/signin"
                element={<SigninScreen></SigninScreen>}
              ></Route>
              <Route
                path="/signup"
                element={<SignupScreen></SignupScreen>}
              ></Route>
              <Route
                path="/shipping"
                element={<ShippingScreen></ShippingScreen>}
              ></Route>
              <Route
                path="/payment"
                element={<PaymentMethodScreen></PaymentMethodScreen>}
              ></Route>
              <Route
                path="/placeorder"
                element={<PlaceOrderScreen></PlaceOrderScreen>}
              ></Route>
              <Route path="/" element={<HomeScreen></HomeScreen>}></Route>
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved.</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
