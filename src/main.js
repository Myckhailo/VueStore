import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import ProductList from './components/ProductList'
import ProductCard from './components/ProductCard'


const app = createApp(App).use(store)
app.component('my-component', ProductList )
app.component('my-componentFirst', ProductCard )
app.mount('#app');
