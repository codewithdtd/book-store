import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Publisher from "@/views/Publisher.vue";
import Products from "@/views/Products.vue";
import Orders from "@/views/Orders.vue";
import NotFound from "@/views/NotFound.vue"
import Customers from "@/views/Customers.vue";
import { useUserStore } from "@/stores/userStore";


const routes = [
    {
        path: '/',
        name: 'Nhà xuất bản',
        component: Publisher,
        beforeEnter: (to, from, next) => {
            // Kiểm tra xem userStore có tồn tại không
            if (!useUserStore().login) {
              // Hiển thị thông báo yêu cầu đăng nhập
              const confirmed = confirm('Bạn cần đăng nhập');
              if (confirmed) {
                // Chuyển hướng đến trang đăng nhập
                next('/login'); // Thay đổi '/login' thành địa chỉ của trang đăng nhập của bạn
              } else {
                next('/404');
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
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/products",
        name: "Sản phẩm",
        component: Products,
        beforeEnter: (to, from, next) => {
            // Kiểm tra xem userStore có tồn tại không
            if (!useUserStore().login) {
              // Hiển thị thông báo yêu cầu đăng nhập
              const confirmed = confirm('Bạn cần đăng nhập');
              if (confirmed) {
                // Chuyển hướng đến trang đăng nhập
                next('/login'); // Thay đổi '/login' thành địa chỉ của trang đăng nhập của bạn
              } else {
                next('/404');
              }
            } else {
              // Nếu userStore tồn tại, cho phép điều hướng đến trang giỏ hàng
              next();
            }
        },
    },
    {
        path: "/orders",
        name: "Đơn hàng",
        component: Orders,
        beforeEnter: (to, from, next) => {
            // Kiểm tra xem userStore có tồn tại không
            if (!useUserStore().login) {
              // Hiển thị thông báo yêu cầu đăng nhập
              const confirmed = confirm('Bạn cần đăng nhập');
              if (confirmed) {
                // Chuyển hướng đến trang đăng nhập
                next('/login'); // Thay đổi '/login' thành địa chỉ của trang đăng nhập của bạn
              } else {
                next('/404');
              }
            } else {
              // Nếu userStore tồn tại, cho phép điều hướng đến trang giỏ hàng
              next();
            }
        },
    },
    {
        path: "/customers",
        name: "Khách hàng",
        component: Customers,
        beforeEnter: (to, from, next) => {
            // Kiểm tra xem userStore có tồn tại không
            if (!useUserStore().login) {
              // Hiển thị thông báo yêu cầu đăng nhập
              const confirmed = confirm('Bạn cần đăng nhập');
              if (confirmed) {
                // Chuyển hướng đến trang đăng nhập
                next('/login'); // Thay đổi '/login' thành địa chỉ của trang đăng nhập của bạn
              } else {
                next('/404');
              }
            } else {
              // Nếu userStore tồn tại, cho phép điều hướng đến trang giỏ hàng
              next('/');
            }
        },
    },
    {
        path: "/404",
        name: "Not Found",
        component: NotFound,
    },
    {
        path: '/*',
        redirect: '/login'
    }
    
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;