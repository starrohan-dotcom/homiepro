
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Bedding' | 'Lighting' | 'Decor' | 'Furniture';
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
