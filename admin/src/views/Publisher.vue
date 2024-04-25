<template>
    <div class="product">
        <div class="product__header">
            <div class="product__header__action">
                <button @click="handlePublisher">+</button>
            </div>
        </div>
        <div class="product__form" :class="{'product__form--active': publisher_form }">
            <form action="" @submit.prevent="handleSubmit">
                <p class="btn btn-outline-danger close" @click="handlePublisher">&times</p>
                <h3>Nhà xuất bản</h3>
                <div class="product__form__item">
                    <p>Tên:</p>
                    <input required type="text" v-model="ten">
                </div>
                <div class="product__form__item">
                    <p>Địa chỉ:</p>
                    <input required type="text" v-model="diachi">
                </div>
                <button>Xác nhận</button>
            </form>
        </div>
        <TablePublisher :nameTable="this.$route.name" @edit="handleEditPublisher" />
    </div>
</template>
<script>
import StaffService from '@/services/staff.service.js'
import TablePublisher from '@/components/TablePublisher.vue'

export default {
    components: {
        TablePublisher
    },
    methods: {
        handlePublisher() {
            this.ten = '';
            this.diachi = '';
            this.id = null;
            this.publisher_form = !this.publisher_form;
        },
        handleEditPublisher(publisher) {
            this.ten = publisher.ten;
            this.diachi = publisher.diachi;
            this.id = publisher._id;
            this.publisher_form = !this.publisher_form;
        },
        async handleSubmit() {
            if(this.id == null) {
                const data = {
                    ten: this.ten,
                    diachi: this.diachi
                }
                if(await StaffService.addPublisher(data)) {
                    this.publisher_form = !this.publisher_form;
                }
            }
            if(this.id != null) {
                const data = {
                    ten: this.ten,
                    diachi: this.diachi,
                    _id: this.id
                }
                if(await StaffService.updatePublisher(data)) {
                    this.publisher_form = !this.publisher_form;
                }
            }

        }
    },
    data() {
        return {
            publisher_form: false,
            ten: '',
            diachi: '',
            id: null,
        }
    }
}
</script>