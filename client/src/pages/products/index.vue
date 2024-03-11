<script setup lang="ts">
import { ref, computed } from "vue";
import { type Product, getProducts } from "@/model/products";
import ProductCard from "@/components/ProductCard.vue";
import FlyOut from "@/components/FlyOut.vue";

//This is a common pattern for retreiving data from an API
const products = ref([] as Product[]);
products.value = getProducts();

//Why is there a type here? There shouldnt be
type CartItem = {
  product: Product;
  quantity: number;
};
const cart = ref([] as CartItem[]);

function addToCart(product: Product) {
  //Does this product exist yet?
  const item = cart.value.find((item) => item.product.id === product.id);

  //If so, increment the quantity
  if (item) {
    item.quantity++;
  } else {
    //if not, add it to the cart
    cart.value.push({ product, quantity: 1 });
  }
}

//Here is the arrow function sytnax
const addToCart2 = (product: Product) => {
  const itemPredicate = (item: CartItem) => item.product.id === product.id;
  //find() takes a function as a parameter
  const item = cart.value.find(itemPredicate);

  if (item) {
    item.quantity++;
  } else {
    cart.value.push({ product, quantity: 1 });
  }
};

const total = computed(() =>
  cart.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
);
</script>

<template>
  <div class="product-list">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @addToCart="addToCart"
    />
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @addToCart="addToCart"
    />
  </div>

  <FlyOut>
    <div class="flyout-content">
      <h1 class="title">The Cart</h1>
      <ul class="cart">
        <li v-for="item in cart" :key="item.product.id">
          <img :src="item.product.thumbnail" :alt="item.product.title" />
          {{ item.product.title }} x {{ item.quantity }}
        </li>
      </ul>
      {{ cart.length }} items in cart for a total of ${{ total }}
    </div>
  </FlyOut>
</template>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.cart li {
  display: flex;
  align-items: center;
  margin: 1rem 0;
}
.cart img {
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
}
</style>
