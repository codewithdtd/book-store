import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Products from "@/views/Products.vue";
import Orders from "@/views/Orders.vue";
import Customers from "@/views/Customers.vue";

const routes = [
    {
        path: '/',
        name: 'Tổng quan',
        component: Home,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/products",
        name: "Sản phẩm",
        component: Products,
    },
    {
        path: "/orders",
        name: "Đơn hàng",
        component: Orders,
    },
    {
        path: "/customers",
        name: "Khách hàng",
        component: Customers,
    },
    
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;