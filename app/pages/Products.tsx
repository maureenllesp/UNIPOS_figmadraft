import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, ShoppingCart, Minus, X, User, Coffee, Utensils, MoreVertical } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';

// Mock product data
const mockProducts = [
  { id: '1', name: 'Coffee Beans Premium', category: 'Beverages', price: 450, stock: 24, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop' },
  { id: '2', name: 'Organic Whole Milk', category: 'Dairy', price: 85, stock: 45, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop' },
  { id: '3', name: 'Whole Wheat Bread', category: 'Bakery', price: 65, stock: 30, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop' },
  { id: '4', name: 'Greek Yogurt', category: 'Dairy', price: 120, stock: 18, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=300&fit=crop' },
  { id: '5', name: 'Organic Eggs', category: 'Dairy', price: 95, stock: 35, image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=300&h=300&fit=crop' },
  { id: '6', name: 'Fresh Orange Juice', category: 'Beverages', price: 145, stock: 22, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=300&fit=crop' },
  { id: '7', name: 'Almond Milk', category: 'Dairy', price: 155, stock: 12, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop' },
  { id: '8', name: 'Protein Bars', category: 'Snacks', price: 75, stock: 28, image: 'https://images.unsplash.com/photo-1576187425753-8c59fc34c744?w=300&h=300&fit=crop' },
];

export default function Products() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<Record<string, number>>({});

  const isCashier = user?.role === 'cashier';
  const isAdmin = user?.role === 'admin';

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  };

  const getTotalAmount = () => {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const product = mockProducts.find(p => p.id === id);
      return sum + (product ? product.price * qty : 0);
    }, 0);
  };

  const cartItems = Object.entries(cart).map(([id, qty]) => ({
    product: mockProducts.find(p => p.id === id)!,
    quantity: qty,
  }));

  // Cashier POS View
  if (isCashier) {
    return (
      <div className="flex h-screen">
        {/* Left: Products */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Header with Time */}
          <div className="mb-6">
            <div className="text-sm text-muted-foreground mb-2">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} | {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#5b8db8] flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                    <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <rect x="13" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <rect x="4" y="13" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <path d="M13 15h7M13 18h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl m-0">UNIPOS</h1>
                  <p className="text-sm text-muted-foreground m-0">Point-of-sale system</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="rounded-full w-12 h-12 p-0">
                  <Coffee className="w-5 h-5" />
                </Button>
                <Button variant="outline" className="rounded-full w-12 h-12 p-0">
                  <Utensils className="w-5 h-5" />
                </Button>
                <Button variant="outline" className="rounded-full w-12 h-12 p-0">
                  <User className="w-5 h-5" />
                </Button>
                <Button variant="outline" className="rounded-full w-12 h-12 p-0">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6 glass-card rounded-2xl p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 glass-input rounded-xl h-12 border-none"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                onClick={() => addToCart(product.id)}
                className="glass-card rounded-2xl overflow-hidden border-none hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="mb-1 truncate">{product.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2 m-0">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg m-0">₱ {product.price}</p>
                    <p className="text-sm text-muted-foreground m-0">stk: {product.stock}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right: Current Order */}
        <div className="w-96 glass-card border-l border-white/20 flex flex-col">
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl m-0">Current Order</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Clear All
              </Button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-auto p-6 space-y-3">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <ShoppingCart className="w-16 h-16 mb-4 opacity-20" />
                <p className="m-0">No items in cart</p>
              </div>
            ) : (
              cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-3 bg-white/50 p-3 rounded-xl">
                  <div className="flex items-center justify-center bg-white rounded-lg w-10 h-10 text-lg">
                    {quantity}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate m-0">{product.name}</p>
                    <p className="text-sm text-muted-foreground m-0">₱ {product.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="m-0">₱ {product.price * quantity}</p>
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addToCart(product.id)}
                        className="h-6 w-6 p-0 rounded text-green-600 hover:bg-green-50"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(product.id)}
                        className="h-6 w-6 p-0 rounded text-red-600 hover:bg-red-50"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Total and Checkout */}
          <div className="p-6 border-t border-white/20 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl m-0">TOTAL</h3>
              <h3 className="text-xl m-0">₱ {getTotalAmount().toFixed(2)}</h3>
            </div>
            <Button
              disabled={cartItems.length === 0}
              className="w-full h-12 bg-[#5b8db8] hover:bg-[#4a7194] rounded-xl"
            >
              PLACE ORDER
            </Button>
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#5b8db8] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                    <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <rect x="13" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <rect x="4" y="13" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <path d="M13 15h7M13 18h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin View
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl m-0">Products</h1>
        {isAdmin && (
          <Button className="bg-[#5b8db8] hover:bg-[#4a7194] rounded-xl gap-2">
            <Plus className="w-5 h-5" />
            Add Product
          </Button>
        )}
      </div>

      {/* Search and Cart Summary */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 glass-input rounded-xl h-12"
          />
        </div>
        {isCashier && getTotalItems() > 0 && (
          <Card className="glass-card px-6 py-3 rounded-xl flex items-center gap-4 border-none">
            <div>
              <p className="text-sm text-muted-foreground m-0">Cart</p>
              <p className="m-0">{getTotalItems()} items • ₱{getTotalAmount()}</p>
            </div>
            <Button className="bg-[#5b8db8] hover:bg-[#4a7194] rounded-lg">
              Checkout
            </Button>
          </Card>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="glass-card rounded-2xl overflow-hidden border-none hover:shadow-lg transition-shadow">
            <div className="aspect-square overflow-hidden bg-gray-100">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="m-0 mb-1">{product.name}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div>
                  <p className="text-xl m-0">₱{product.price}</p>
                  <p className="text-sm text-muted-foreground m-0">
                    Stock: {product.stock}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                {isCashier && (
                  <Button
                    onClick={() => addToCart(product.id)}
                    className="flex-1 bg-[#5b8db8] hover:bg-[#4a7194] rounded-lg gap-2"
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {cart[product.id] ? `Added (${cart[product.id]})` : 'Add to Cart'}
                  </Button>
                )}
                {isAdmin && (
                  <>
                    <Button
                      variant="outline"
                      className="flex-1 rounded-lg gap-2 border-[#5b8db8]/30"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-lg border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}