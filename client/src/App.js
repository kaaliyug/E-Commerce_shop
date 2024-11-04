import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import Store from "./pages/Store/StorePage";
import SingleProduct from "./pages/Store/SingleProduct";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import { Payment } from "./pages/Payment";
import ProfilePage from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import ProductsAdminPage from "./pages/ProductsAdminPage";
import ProductEditPage from "./pages/ProductEditPage";
import UsersPage from "./pages/UsersPage";
import UserEditPage from "./pages/UserEditPage";
import Home from "./components/Home";


function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout><Home /></Layout> } />
                <Route path="/store" element={<Layout><Store /></Layout>} />
                <Route path="/search/:searchTerm" element={<Layout><Store /></Layout>} />
                <Route path="/tag/:tag" element={<Layout><Store /></Layout>} />
                <Route path="/category/:category" element={<Layout><Store /></Layout>} />
                <Route path="/product/:id" element={<Layout><SingleProduct /></Layout>} />
                <Route path="/product/slug/:slug" element={<Layout><SingleProduct /></Layout>} />
                <Route path="/cart" element={<Layout><CartPage /></Layout>} />
                <Route path="/login" element={<Layout><Login /></Layout>} />
                <Route path="/register" element={<Layout><Register /></Layout>} />
                <Route path="/checkout" element={<Layout><AuthRoute><Checkout /></AuthRoute></Layout>} />
                <Route path="/payment" element={<Layout><AuthRoute><Payment /></AuthRoute></Layout>} />
                <Route path="/profile" element={<Layout><AuthRoute><ProfilePage /></AuthRoute></Layout>} />
                <Route path="/dashboard" element={<Layout><AuthRoute><Dashboard /></AuthRoute></Layout>} />
                <Route path="/admin/products/:searchTerm?" element={<Layout><AdminRoute><ProductsAdminPage /></AdminRoute></Layout>} />
                <Route path="/admin/addProduct" element={<Layout><AdminRoute><ProductEditPage /></AdminRoute></Layout>} />
                <Route path="/admin/editProduct/:productId" element={<Layout><AdminRoute><ProductEditPage /></AdminRoute></Layout>} />
                <Route path="/admin/users/:searchTerm?" element={<Layout><AdminRoute><UsersPage /></AdminRoute></Layout>} />
                <Route path="/admin/editUser/:userId" element={<Layout><AdminRoute><UserEditPage /></AdminRoute></Layout>} />
            </Routes>
        </div>
    )
}


export default App;