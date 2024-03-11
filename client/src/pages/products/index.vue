<script setup lang="ts">
import { ref, computed } from "vue";
import { type Product, getProducts } from "@/model/products";
import ProductCard from "@/components/ProductCard.vue";

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
  </div>

  <div class="flyout">
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
  </div>
</template>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.card {
  flex-basis: 15rem;
  flex-grow: 1;
  margin: 0.5rem;
}
h3 {
  font-weight: bold;
}
.price {
  font-weight: bold;
  font-size: xx-large;
  color: hotpink;
  float: right;
}
.flyout {
  position: fixed;
  top: 0;
  right: 0;
  width: 20rem;
  height: 100%;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: -1px 0 5px 0 rgba(0, 0, 0, 0.5);
  z-index: 100;
  transform: translateX(80%);
  transition: transform 1s;
  padding: 1rem;
}
.flyout.open,
.flyout:hover {
  transform: translateX(0);
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
