<script setup lang="ts">
import type { Product } from "@/model/products";

//Props
const props = defineProps<{
  product: Product;
}>();

//Events (dont pass functions as props in Vue 3)
const emit = defineEmits<{
  addToCart: [product: Product];
}>();
</script>

<template>
  <div class="card">
    <div class="card-image">
      <img :src="product.thumbnail" :alt="product.title" />
    </div>
    <div class="card-content">
      <p class="price">${{ product.price }}</p>
      <h3>{{ product.title }}</h3>
      <i>{{ product.brand }}</i>
      <p class="desc">{{ product.description }}</p>
      <button class="button is-primary" @click="emit('addToCart', product)">
        Add to Cart
      </button>
    </div>
  </div>
</template>

<style scoped></style>
