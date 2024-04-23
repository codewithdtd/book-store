import { defineStore } from "pinia";
import userService from "@/services/staff.service";
import router from "@/router";
export const useUserStore = defineStore('userStore', {
    state:() => ({
        user: null,
        login: false,
        book: [],
    }),
    getters: {

    },
    actions: {
        setUser(data) {
            this.user = data 
            this.login = true
        },
        async logout() {
            this.user = null;
            this.login = false;
            this.book = [];
            await userService.logout(); 
            await router.push("/");
            // Xóa dữ liệu trong session storage ở đây
        }
    },
    persist: {
        enabled: true,
    }
})