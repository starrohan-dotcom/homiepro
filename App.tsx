
import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import ChatAssistant from './components/ChatAssistant';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';
// Added missing icon imports: ShoppingBag and Sparkles
import { CheckCircle, Truck, ShieldCheck, Heart, ShoppingBag, Sparkles } from 'lucide-react';

const HomePage: React.FC<{ onAddToCart: (p: Product) => void }> = ({ onAddToCart }) => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1920&q=80" 
            alt="Interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase mb-6">Premium Collection 2024</span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold leading-tight mb-8">Elevate Your Living Space</h1>
            <p className="text-lg md:text-xl text-slate-100 mb-10 leading-relaxed font-light">
              Discover our curated selection of high-quality bedding, lighting, and artisanal decor designed to turn your house into a home.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#/shop" className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-bold text-center hover:bg-slate-50 transition-all active:scale-95 shadow-xl">
                Explore Collection
              </a>
              <a href="#/category/Lighting" className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl font-bold text-center hover:bg-white/20 transition-all">
                Shop Lighting
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10 bg-white rounded-3xl shadow-sm border border-slate-100 px-8">
          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600 mb-4"><Truck size={28} /></div>
            <h3 className="font-bold text-slate-900">Fast Shipping</h3>
            <p className="text-sm text-slate-500">Free delivery on orders over $150</p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-600 mb-4"><ShieldCheck size={28} /></div>
            <h3 className="font-bold text-slate-900">Secure Payments</h3>
            <p className="text-sm text-slate-500">100% encrypted Stripe checkout</p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-rose-50 p-4 rounded-2xl text-rose-600 mb-4"><Heart size={28} /></div>
            <h3 className="font-bold text-slate-900">Eco-Friendly</h3>
            <p className="text-sm text-slate-500">Sustainably sourced materials</p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-amber-50 p-4 rounded-2xl text-amber-600 mb-4"><CheckCircle size={28} /></div>
            <h3 className="font-bold text-slate-900">Quality Tested</h3>
            <p className="text-sm text-slate-500">30-day satisfaction guarantee</p>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Trending Now</h2>
            <p className="text-slate-500 text-lg">Our most loved pieces from the new season.</p>
          </div>
          <a href="#/shop" className="text-indigo-600 font-bold flex items-center hover:translate-x-1 transition-transform">
            View All Products
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      {/* Full Width Banner */}
      <section className="relative h-[600px] bg-slate-100 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full w-full">
          <div className="h-full relative overflow-hidden hidden lg:block">
            <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80" alt="Furniture" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center px-12 lg:px-24 bg-white">
            <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-6">Interior Design Expert Advice</h3>
            <h2 className="text-5xl font-serif font-bold text-slate-900 mb-8 leading-tight">Create Your Personal Sanctuary</h2>
            <p className="text-slate-500 text-lg mb-12 leading-relaxed">
              Not sure how to mix textures or choose the right lighting? Our AI assistant is here to help you coordinate like a professional interior designer.
            </p>
            <button className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all self-start">
              Chat with Homie AI
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-indigo-500 rounded-full blur-3xl opacity-50" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">Join the Homie Club</h2>
            <p className="text-indigo-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Get interior design tips and 15% off your first order when you subscribe.
            </p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white transition-all"
              />
              <button className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-xl">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

const ShopPage: React.FC<{ onAddToCart: (p: Product) => void }> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Bedding', 'Lighting', 'Decor', 'Furniture'];
  
  const filteredProducts = useMemo(() => {
    return activeCategory === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif font-bold text-slate-900 mb-6">Our Collection</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all border ${
                activeCategory === cat 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-900 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};

const CheckoutPage: React.FC<{ cart: CartItem[] }> = ({ cart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-slate-100">
        {/* Stripe Mock Form */}
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">Secure Checkout</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
              <input type="email" placeholder="homie@example.com" className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-100 focus:ring-2 focus:ring-indigo-600 outline-none" />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Shipping Information</label>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-100" />
                <input type="text" placeholder="Last Name" className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-100" />
              </div>
              <input type="text" placeholder="Address" className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-100 mt-4" />
            </div>

            <div className="pt-6 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                <ShieldCheck size={14} className="mr-1 text-indigo-600" />
                Payment via Stripe
              </label>
              <div className="p-4 bg-slate-50 rounded-xl border border-indigo-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-slate-600">Card Number</span>
                  <div className="flex space-x-2">
                    <div className="w-8 h-5 bg-slate-300 rounded" />
                    <div className="w-8 h-5 bg-slate-300 rounded" />
                  </div>
                </div>
                <div className="h-10 border-b border-slate-200 mb-4 flex items-center px-1 text-slate-400">•••• •••• •••• ••••</div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="border-b border-slate-200 pb-2 text-slate-400">MM / YY</div>
                  <div className="border-b border-slate-200 pb-2 text-slate-400">CVC</div>
                </div>
              </div>
            </div>

            <button className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-indigo-700 transition-all active:scale-95 mt-8">
              Pay ${total.toFixed(2)} Now
            </button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="bg-slate-50 p-8 md:p-12 border-l border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-8">Order Summary</h3>
          <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 mb-8">
            {cart.map(item => (
              <div key={item.id} className="flex space-x-4">
                <img src={item.image} className="w-16 h-16 object-cover rounded-xl border border-slate-200" />
                <div className="flex-grow">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-slate-500">Qty: {item.quantity}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-4 pt-6 border-t border-slate-200">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Shipping</span>
              <span className="text-emerald-600 font-bold">FREE</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-slate-900 pt-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 pt-24 pb-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center space-x-2 mb-8">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
              <ShoppingBag size={20} />
            </div>
            <span className="text-2xl font-bold tracking-tight font-serif text-white">HOMIE PRO</span>
          </div>
          <p className="leading-relaxed mb-8">Curating the world's most beautiful and sustainable home decor for conscious living.</p>
          <div className="flex space-x-4">
            {['IG', 'FB', 'PI', 'TW'].map(social => (
              <a key={social} href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-8">Collections</h4>
          <ul className="space-y-4">
            <li><a href="#/category/Bedding" className="hover:text-white transition-colors">Bedding Sets</a></li>
            <li><a href="#/category/Lighting" className="hover:text-white transition-colors">Artisanal Lighting</a></li>
            <li><a href="#/category/Decor" className="hover:text-white transition-colors">Wall & Shelf Decor</a></li>
            <li><a href="#/category/Furniture" className="hover:text-white transition-colors">Modern Furniture</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-8">Customer Care</h4>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-8">Visit Us</h4>
          <p className="leading-relaxed mb-4">
            123 Design District<br />
            New York, NY 10012
          </p>
          <p>hello@homiepro.com</p>
        </div>
      </div>
      
      <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>&copy; 2024 Homie Pro. All rights reserved.</p>
        <div className="flex space-x-8 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    window.location.hash = '#/checkout';
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Header 
          cartCount={cartCount} 
          onCartClick={() => setIsCartOpen(true)} 
          onOpenChat={() => setIsChatOpen(true)}
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage onAddToCart={addToCart} />} />
            <Route path="/shop" element={<ShopPage onAddToCart={addToCart} />} />
            <Route path="/category/:name" element={<ShopPage onAddToCart={addToCart} />} />
            <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
          </Routes>
        </main>
        
        <Footer />
        
        <Cart 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          items={cart}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onCheckout={handleCheckout}
        />
        
        <ChatAssistant 
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
        
        {!isChatOpen && (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 z-40 bg-indigo-600 text-white p-4 rounded-2xl shadow-2xl hover:bg-indigo-700 hover:scale-110 transition-all flex items-center space-x-2"
          >
            <Sparkles size={24} />
            <span className="font-bold pr-2">Need advice?</span>
          </button>
        )}
      </div>
    </HashRouter>
  );
}
