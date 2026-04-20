import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Account/Dashboard';
import AdminDashboard from './pages/Admin/Dashboard';
import CartDrawer from './components/cart/CartDrawer';
import RubberCursor from './components/ui/RubberCursor';
import Footer from './components/ui/Footer';
import { Toaster } from 'react-hot-toast';
import Meta from './components/ui/Meta';

function App() {
  return (
    <div className="min-h-screen bg-bg text-text flex flex-col font-body selection:bg-accent selection:text-black cursor-none">
      <Meta />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#0A0A0A',
            color: '#fff',
            border: '1px solid #1F1F1F',
            fontFamily: 'monospace',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          },
        }}
      />
      <RubberCursor />
      <Navbar />
      <CartDrawer />
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
