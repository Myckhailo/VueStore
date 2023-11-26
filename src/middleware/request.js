const axios = require('axios')

module.exports = {
    get: async() => {
        try {
            const res = await axios.get('https://fakestoreapi.com/products')
            return { res: res }
        } catch (err) {
            return {res:undefined}
        }
    },
    getWithLimit: async(limit) => {
        try {
            const res = await axios.get(`https://fakestoreapi.com/products?limit=${limit}`)
            return { res: res }
        } catch (err) {
            return {res:undefined}
        }
    },
    getByCategory: async(category,limit) => {
        try {
            const res = await axios.get(`https://fakestoreapi.com/products/category/${category}?${limit}`)
            return { res: res }
        } catch (err) {
            return {res:undefined}
        }
    }
}