<template>
  <div class="product-list" ref="productListRef">
      <div class="fl">
        <p class="textOne">For convenience, select a category</p>
        <div class="custom-select">
          <select v-model="selectedCategory" @change="filterProducts">
            <option value="" disabled hidden>Select a category</option>
            <option v-for="category in categories" :value="category" :key="category">{{ category }}</option>
          </select>
        </div>
      </div>
      

      <div class="flexik product-card-wrapper">
        <div v-for="(product, index) in displayedProducts" :key="product.id" class="product-card">
          <ProductCard :key="index" :product="product" />
        </div>
      </div>
      
      <button v-if="showLoadMoreButton" @click="loadMore" class="load-more-btn">Load more</button>
    </div>
</template>

<script>
import request from '../middleware/request'
import ProductCard from './ProductCard' 

export default {
  name: 'ProductList',
  components: {
    ProductCard
  },
  data() {
    return {
      products: [],
      displayedProducts: [],
      loading: true,
      limit: 4,
      showLoadMoreButton: false,
      lastScrollPosition: 0,
      selectedCategory: 'All Categories',
      lastSelectedCategory: '',
      categories: ['All Categories',"electronics", "jewelery", "men's clothing", "women's clothing"]
    }
  },
  async created() {
    await this.fetchProducts()
  },
  methods: {
    async fetchProducts() {
      try {
        let response = await request.getWithLimit(this.limit)
        response = response.res
        if (response && response.data && Array.isArray(response.data)) {
          this.products = response.data
          this.showLoadMoreButton = true
          this.updateDisplayedProducts()
        } else {
          console.error('Error')
        }
        this.loading = false
      } catch (error) {
        console.error('Erorr', error)
        this.loading = false
      }
    },
    updateDisplayedProducts() {
      this.displayedProducts = this.products.slice(0, this.limit)
      this.showLoadMoreButton =  this.products.length>=this.limit
    },
    async loadMore() {
      this.loading = true
      this.limit += 4
      try {
        if(this.selectedCategory=='All Categories' ){
          let response = await request.getWithLimit(this.limit)
        response = response.res
        if (response && response.data && Array.isArray(response.data)) {
          this.products = response.data
          this.updateDisplayedProducts()
        } else {
          console.error('Error')
        }
        this.loading = false
        }else{
          let response = await request.getByCategory(this.selectedCategory,this.limit)
        response = response.res
        if (response && response.data && Array.isArray(response.data)) {
          this.products = response.data
          this.updateDisplayedProducts()
        } else {
          console.error('Error')
        }
        }
      } catch (error) {
        console.error('Error', error)
        this.loading = false
      }
    },
   async filterProducts() {
if(this.selectedCategory!=this.lastSelectedCategory)this.limit= 0
const last = this.lastSelectedCategory
this.lastSelectedCategory = this.selectedCategory
if(this.selectedCategory&&this.selectedCategory!=last)    this.loadMore()
    }
  }
}
</script>


<style scoped>

.flexik {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: 200px;
}

.product-card {
  width: calc(50% - 10px);
  margin-bottom: 20px;
  box-sizing: border-box;

  
}

.load-more-btn {
  margin-top: 20px;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: rgb(211, 166, 114);
  cursor: pointer;
  width: 200px;
  height: 70px;
  margin-top: 20px;
  margin-bottom: 100px;
  margin-left: 490px;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
}
.product-list{
 
  margin: 0 auto;
  max-width: 1240px;
  
}

.custom-select {
  position: relative;
  display: inline-block;
  
}

.custom-select select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #292525;
  border-radius: 4px;
  cursor: pointer;
  width: 200px;
}

.custom-select select:focus {
  outline: none;
  border-color: #3498db;
}

.custom-select::after {
  content: '▼';
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
}
.fl{
  display: flex;
  flex-direction: row;
  margin-top: 100px;
  margin-bottom: 100px;
  text-align: center;
  justify-content: center;
}
.textOne{
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-right: 40px;
  margin-left: -90px;
  margin-top: 2px;
}

</style>
