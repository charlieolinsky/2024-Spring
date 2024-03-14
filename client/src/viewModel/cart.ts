import { computed, ref } from "vue";
import { type Product } from "@/model/products";

//Why is there a type here? There shouldnt be
type CartItem = {
    product: Product;
    quantity: number;
};
const cart = ref([] as CartItem[]);

export const refCart = () => cart; 

export function addToCart(product: Product) {
    const item = cart.value.find((i) => i.product.id === product.id);
    if (item) {
    item.quantity++;
    } else {
    cart.value.push({ product, quantity: 1 });
    }
}

export const total = computed(() => cart.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0));