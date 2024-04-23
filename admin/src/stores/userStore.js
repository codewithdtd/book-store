import { defineStore } from "pinia";
import router from "@/router";
import staffService from "@/services/staff.service";
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
            await staffService.logout(); 
            await router.push("/login");
            // Xóa dữ liệu trong session storage ở đây
        }
    },
    persist: {
        enabled: true,
    }
})