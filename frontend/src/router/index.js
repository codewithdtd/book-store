import { createWebHistory, createRouter } from "vue-router";
import Register from "@/views/Register.vue";
import Home from "@/views/Home.vue";
import Menu from "@/views/Menu.vue";
import Order from "@/views/Order.vue";
import Cart from "@/views/Cart.vue";
import Login from "@/views/Login.vue";
// import Payment from "@/views/Payment.vue";
import About from "@/views/About.vue";
import Contact from "@/views/Contact.vue";
import DetailProduct from "@/views/DetailProduct.vue";

import { useUserStore } from "@/stores/userStore";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/cart",
        name: "Cart",
        component: Cart,
        beforeEnter: (to, from, next) => {
            // Kiểm tra xem userStore có tồn tại không
            if (!useUserStore().login) {
              // Hiển thị thông báo yêu cầu đăng nhập
              const confirmed = confirm('Bạn cần đăng nhập để xem giỏ hàng. Bạn có muốn đăng nhập ngay không?');
              if (confirmed) {
                // Chuyển hướng đến trang đăng nhập
                next('/login'); // Thay đổi '/login' thành địa chỉ của trang đăng nhập của bạn
              } else {
                // Nếu không muốn đăng nhập, trở về trang trước đó
                next(false);
              }
            } else {
              // Nếu userStore tồn tại, cho phép điều hướng đến trang giỏ hàng
              next();
            }
          },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/menu",
        name: "Menu",
        component: Menu,
    },
    {
        path: "/order",
        name: "Order",
        component: Order,
    },
    // {
    //     path: "/payment",
    //     name: "Payment",
    //     component: Payment,
    // },
    {
        path: "/about",
        name: "About",
        component: About,
    },
    {
        path: "/contact",
        name: "Contact",
        component: Contact,
    },
    {
        path: "/menu/:id",
        name: "DetailProduct",
        component: DetailProduct,
    },
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;