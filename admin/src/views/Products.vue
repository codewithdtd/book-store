<template>
    <div class="product">
        <div class="product__header">
            <div class="product__header__search">
                <i class="ri-search-line"></i>
                <input type="text" placeholder="Tìm kiếm">
            </div>
            <div class="product__header__action">
                <button @click="handleProduct">+</button>
            </div>
        </div>
        <div class="product__form" :class="{'product__form--active': product_form }">
            <form action="" @submit.prevent="handleSubmit">
                <p class="btn btn-outline-danger close" @click="handleProduct">&times</p>
                <h3 v-if="!product._id">Thêm sản phẩm</h3>
                <h3 v-else>Chỉnh sửa sản phẩm</h3>
                <div class="product__form__item">
                    <p>Tên:</p>
                    <input required type="text" v-model="ten">
                    <p>Tác giả:</p>
                    <input required type="text" v-model="tacgia">
                </div>
                <div class="product__form__item">
                    <p>Nhà xuất bản:</p>
                    <input required type="text" v-model="nhaxuatban">
                    <p>Năm xuất bản:</p>
                    <input required type="text" v-model="namxuatban">
                </div>
                <div class="product__form__item">
                    <p>Giá:</p>
                    <input required type="number" v-model="dongia">
                    <p>Số lượng:</p>
                    <input required type="number" v-model="soluong">
                </div>
                <div class="product__form__item">
                    <p>Mô tả:</p>
                    <textarea name="" id="" cols="30" rows="3">{{ mota }}</textarea>
                </div>
                <div class="product__form__item">
                    <p>Hình ảnh:</p>
                    <img v-if="product.hinhanh != null && hinhanhPreview == null" :src="'http://localhost:3000/static/'+product.hinhanh" alt="">
                    <img v-else :src="hinhanhPreview" alt="">
                    <input v-if="product.hinhanh == null" required type="file" accept="image/*" @change="handleImage($event.target.files[0])">
                    <input v-if="product.hinhanh != null" type="file" accept="image/*" @change="handleImage($event.target.files[0])">
                </div>
                <button v-if="!product._id">Thêm</button>
                <button v-else>Cập nhật</button>
            </form>
        </div>
        <TableProduct :nameTable="this.$route.name" @edit="handleEditProduct"></TableProduct>
    </div>
</template>
<script>
import TableProduct from '@/components/TableProduct.vue'
import ProductService from '@/services/product.service.js'

export default {
    components: {
        TableProduct
    },
    methods: {
        handleProduct() {
            this.product = {};
            this.ten = '';
            this._id = null;
            this.mota = '';
            this.tacgia = '';
            this.namxuatban = '';
            this.nhaxuatban = '';
            this.dongia = '';
            this.soluong = '';
            this.product_form = !this.product_form;
        },
        handleEditProduct(product) {
            this.product = product;
            // const {ten, hinhanh, mota, dongia, soluong, _id} = product;
            this.ten = product.ten;
            this._id = product._id;
            this.mota = product.mota;
            this.tacgia = product.tacgia;
            this.namxuatban = product.namxuatban;
            this.nhaxuatban = product.nhaxuatban;
            this.dongia = product.dongia;
            this.soluong = product.soluong;
            this.product_form = !this.product_form;
        },
        async handleSubmit() {
            if(this.product._id == null) {
                const data = new FormData();
                data.append('ten', this.ten);
                data.append('tacgia', this.tacgia);
                data.append('namxuatban', this.namxuatban);
                data.append('nhaxuatban', this.nhaxuatban);
                data.append('dongia', this.dongia);
                data.append('soluong', this.soluong);
                data.append('mota', this.mota);
                data.append('hinhanh', this.hinhanh);
                console.log(data);
                if(await ProductService.addProduct(data)) {
                    this.product = data;
                    this.product_form = !this.product_form;
                }
            }
            if(this.product._id != null) {
                const data = new FormData();
                data.append('_id', this._id);
                data.append('ten', this.ten);
                data.append('tacgia', this.tacgia);
                data.append('namxuatban', this.namxuatban);
                data.append('nhaxuatban', this.nhaxuatban);
                data.append('dongia', this.dongia);
                data.append('soluong', this.soluong);
                data.append('mota', this.mota);
                this.hinhanh != null ? data.append('hinhanh', this.hinhanh) : data.append('hinhanh', this.product.hinhanh);
                if(await ProductService.updateProduct(data)) {
                    this.product = data;
                    this.product_form = !this.product_form;
                }
            }

        },
        handleImage(img) {
            this.hinhanh = img;
            this.hinhanhPreview = URL.createObjectURL(img);
        }
    },
    mounted() {
    },
    data() {
        return {
            product_form: false,
            product: {},
            ten: '',
            dongia: '',
            soluong: '',
            mota: '',
            _id: '',
            tacgia: '',
            nhaxuatban: '',
            namxuatban: '',
            filter: '',
            productChange: 0,
            hinhanh: null,
            hinhanhPreview: null
        }
    }

}


</script>
<style>
.product__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.product__header input {
    font-size: 0.9rem;
    padding: 5px 7px;
    border-radius: 7px;
    border: none;
    width: 10rem;
}

.product__header__action {
    display: flex;
    align-items: center;
}

.product__header__search {
    background-color: white;
    padding: 0 4px;
    border-radius: 7px;
}

.product__header__search input:focus, .product__header__filter select:focus {
    border: none;
    outline: none;
}

.product__header__action button {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: none;
    font-weight: 400;
    font-size: 20px;
    background-color: rgb(196, 255, 199);
}
.product__header__action button:hover {
    background-color: #fff;
}

.product__header__filter {
    background-color: #fffefe;
    border-radius: 7px;
    overflow: hidden;
    padding: 1px 0 2px 10px;
    margin-right: 5px;
}

.product__header__filter select{
    font-size: 0.9rem;
    padding: 5px 3px;
    border: none;
    /* width: 10rem; */
}

.product__form {
    background-color: rgba(0, 0, 0, 0.397);
    /* backdrop-filter: blur(1px); */
    width: 100%;
    position: fixed;
    z-index: 1;
    height: 100%;
    top: -200%;
    left: 0;
    display: flex;
    transition: .5s ease;
    /* display: none; */
}

.product__form.product__form--active {
    top: 0;
}

.product__form form {
    position: relative;
    background-color: #4a4a4a;
    /* backdrop-filter: blur(10px); */
    margin: auto;
    height: fit-content;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    padding: 20px 0;
    /* border: 2px solid; */
    box-shadow: 1px 5px 10px rgba(255, 255, 255, 0.267);
    
}

.product__form form h3 {
    padding: 15px;
    color: #328cdb;
    font-weight: 600;
    font-size: 2rem;
}

.product__form__item {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    text-align: start;
}
.product__form__item p {
    width: 100px;
    margin: 5px;
}

.product__form__item input, 
.product__form__item select,
.product__form__item textarea {
    flex-grow: 1;
    border-radius: 10px;
    border: none;
}


.product__form form button {
    width: 150px;
    height: 40px;
    border-radius: 12px;
    background-color: #32a041;
    border: none;
    font-weight: 600;
    color: rgb(255, 255, 255);
}
.product__form form .close {
    position: absolute;
    right: 10px;
    top: 10px;
}

.product__form__item img {
    height: 100px;
    width: 100px;
    object-fit: cover;
    border-radius: 10px
}

</style>

  