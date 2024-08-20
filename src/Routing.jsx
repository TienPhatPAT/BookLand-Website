import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/client/Home";
import BookDetail from "./pages/client/BookDetail";
import Ranking from "./pages/client/Ranking";
import Checkout from "./pages/client/Checkout";
import Contact from "./pages/client/Contact";
import FavoriteBook from "./pages/client/FavoriteBook";
import RootLayout from "./pages/client/RootLayout";
import Account from "./pages/client/Account";
import Type from "./pages/client/Type";
import Cart from "./pages/client/Cart";
import Billing from "./pages/client/Billing";
import BillingDetail from "./pages/client/BillingDetail";
import Privacy from "./pages/client/Privacy";
import CustomerHelp from "./pages/client/CustomerHelp";
import TypeDetail from "./pages/client/TypeDetail";
import BlogBaner from "./pages/client/BlogBanner";
import AuthorDetail from "./pages/client/AuthorDetail";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<Navigate to={"/home"} replace={true} />} />
      <Route path="home" element={<Home />} />
      {/* <Route path="shop" element={<Product />} /> */}
      <Route path="book/:id" element={<BookDetail />} />
      <Route path="ranking" element={<Ranking />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="contact" element={<Contact />} />
      <Route path="type" element={<Type />} />
      <Route path="type/:id" element={<TypeDetail />} />
      <Route path="favorite-book" element={<FavoriteBook />} />
      <Route path="cart" element={<Cart />} />
      <Route path="billing" element={<Billing />} />
      <Route path="billing/:id" element={<BillingDetail />} />
      <Route path="customer-help" element={<CustomerHelp />} />
      <Route path="privacy" element={<Privacy />} />
      <Route path="setting" element={<Account />} />
      <Route path="banner/:id" element={<BlogBaner />} />
      <Route path="author/:id" element={<AuthorDetail />} />

      {/* <Route path="*" element={<NotFound />} /> */}
    </Route>
  )
);

const Routing = () => <RouterProvider router={router} />;

export default Routing;
