<template>
  <div v-if="product" class="product-card">
    <img v-if="product.image" :src="product.image" :alt="product.title" class="product-image" />
    <h3 class="product-title">{{ product.title }}</h3>
    <p class="product-description">{{ product.description }}</p>
    <p class="product-price">Price: ${{ product.price }}</p>
    <div class="product-rating">
      Rating: {{ product.rating.rate }} ({{ product.rating.count }} reviews)
    </div>
  </div>
  <div v-else>

  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

.product-card {
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #fff;

}

.product-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.product-title {
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.product-description {
  font-size: 1rem;
  margin-bottom: 10px;
}

.product-price {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.product-rating {
  color: #f90;
  font-style: italic;
}
</style>
