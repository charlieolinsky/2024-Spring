import products from '@/data/products.json';

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand?: string; //A question mark indicates that the property is optional.
    category: string;
    thumbnail: string;
    images: string[];
}

export function getProducts(): Product[] {
    return products.items;
}