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
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { cart, userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });

    localStorage.removeItem('cartItems');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1}></ToastContainer>
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>amazona</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto w-100 justify-content-end">
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
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />

                      <LinkContainer to="#signout" onClick={signoutHandler}>
                        <NavDropdown.Item>Signout</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
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
                path="/profile"
                element={<ProfileScreen></ProfileScreen>}
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
              <Route
                path="/order/:id"
                element={<OrderScreen></OrderScreen>}
              ></Route>
              <Route
                path="/orderhistory"
                element={<OrderHistoryScreen></OrderHistoryScreen>}
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
