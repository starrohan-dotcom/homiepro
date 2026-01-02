
import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md flex flex-col bg-white shadow-2xl transform transition-transform duration-500">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between">
              <h2 className="text-2xl font-bold font-serif text-slate-900">Shopping Cart</h2>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-500">
                <X size={24} />
              </button>
            </div>

            <div className="mt-8">
              {items.length === 0 ? (
                <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center p-6 bg-slate-50 rounded-full mb-4">
                    <ShoppingBag className="text-slate-300" size={48} />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900">Your cart is empty</h3>
                  <p className="mt-1 text-slate-500">Looks like you haven't added any decor yet.</p>
                  <button 
                    onClick={onClose}
                    className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <li key={item.id} className="py-6 flex">
                      <div className="flex-shrink-0 w-24 h-24 border border-slate-200 rounded-xl overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-base font-semibold text-slate-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-slate-500 capitalize">{item.category}</p>
                        </div>
                        <div className="flex-1 flex items-end justify-between text-sm">
                          <div className="flex items-center space-x-3 bg-slate-50 px-2 py-1 rounded-lg">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="text-slate-500 hover:text-indigo-600 p-1"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="font-medium text-slate-700">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="text-slate-500 hover:text-indigo-600 p-1"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <button 
                            onClick={() => onRemove(item.id)}
                            className="flex items-center text-rose-500 hover:text-rose-600 font-medium"
                          >
                            <Trash2 size={16} className="mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {items.length > 0 && (
            <div className="border-t border-slate-100 px-4 py-6 sm:px-6 bg-slate-50/50">
              <div className="flex justify-between text-base font-medium text-slate-900 mb-2">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm text-slate-500 mb-6">
                <p>Shipping and taxes calculated at checkout.</p>
              </div>
              <button
                onClick={onCheckout}
                className="w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-2xl shadow-sm text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all active:scale-[0.98]"
              >
                Checkout with Stripe
              </button>
              <div className="mt-6 flex justify-center text-sm text-center text-slate-500">
                <p>
                  or{' '}
                  <button onClick={onClose} className="text-indigo-600 font-semibold hover:text-indigo-500">
                    Continue Shopping
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
