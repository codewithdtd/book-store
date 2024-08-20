<template>
    <div class="payment col-lg-3">
        <p class="payment__title">Thông tin thanh toán</p>
        <form class="payment__form" @submit.prevent="handlePayment">
            <div class="payment__item">
                <label for="">Họ:</label>
                <input required type="text" v-model="docgia.ho">
            </div>
            <div class="payment__item">
                <label for="">Tên:</label>
                <input required type="text" v-model="docgia.ten">
            </div>
            <div class="payment__item">
                    <label for="">Địa chỉ:</label>
                    <input required type="text" v-model="docgia.diachi">
            </div>
            <div class="payment__item">
                    <label for="">Số điện thoại:</label>
                    <input required type="text" v-model="docgia.sodienthoai">
            </div>
            <div class="payment__item">
                    <label for="">Ghi chú:</label>
                    <textarea v-model="note" rows="3"></textarea>
            </div>
            <div class="payment__item">
                <p>Tổng tiền: 
                    <span>
                        {{ tinhtongtien.toLocaleString() }} VNĐ
                    </span>
                </p>
            </div>
            <div class="payment__item">
                <label for="">Ngày mượn:</label>
                <input :class="{'payment_item--validate': !handleDate()}" type="date" @change="handleDate" v-model="ngaymuon">
            </div>
            <div class="payment__item">
                <p class="fst-italic">Lưu ý: Thời gian mượn tối đa <span class="text-danger">7 ngày</span> nếu quá hạn phụ thu thêm 20%</p>
            </div>
            <div class="payment__item">
                    <label for="">Hình thức thanh toán:</label>
                    <input required type="radio" name="method" value="cod" v-model="method_payment"> COD
                    <input required type="radio" name="method" value="card" v-model="method_payment"> Card
            </div>
            <div class="payment__item">
                <button>THANH TOÁN</button>
            </div>
        </form>
    </div>
</template>
<script>
import { useUserStore } from '@/stores/userStore';
import userService from '@/services/user.service';
// import Notification from '../components/Notification.vue'
export default {
    emits: ['showNotify',],
    // components: {
    //     Notification
    // },
    props: {
        total: Number,
    },
    computed: {
        tinhtongtien() {
            return this.userStore.cart.reduce((total, currentItem) => total + parseInt(currentItem.gia), 0);
        }
    },
    methods: {
        async handlePayment() {
            const data = {
                sach: this.userStore.cart,
                docgia: this.docgia,
                note: this.note,
                method_payment: this.method_payment, 
                tongtien: this.tinhtongtien,
                ngaymuon: this.ngaymuon,
            };
            if(data.sach.length > 0 && this.handleDate() )
                try {
                    if(await userService.addOrder(data)) {
                        this.message = 'Thành công';
                        this.$emit('showNotify',this.message);
                    }
                } catch (error) {
                    console.log(error);
                }
            else {
                this.message = 'Thất bại'
                this.$emit('showNotify',this.message)
            }
        },
        handleDate() {
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
            const yyyy = today.getFullYear();

            const currentDate = new Date(yyyy, mm - 1, dd);
            const parts = this.ngaymuon.split('-');
            const ngaymuon = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));

            return ngaymuon >= currentDate;
        }
    },
    data() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const yyyy = today.getFullYear();

        const currentDate = yyyy + '-' + mm + '-'+ dd;
        return {
            userStore: useUserStore(),
            docgia: useUserStore().user,
            // diachi: useUserStore().user.diachi,
            // sodienthoai: useUserStore().user.sodienthoai,
            ngaymuon: currentDate,
            // ngaytra: '',
            method_payment: '',
            note: '',
            message: ''
        }
    }
}
</script>
<style>
.payment {
    background-color: rgb(240, 240, 240);
    border: 2px solid #000000b9;
    height: fit-content;
    padding: 0;
    border-radius: 10px;
    margin: auto;
}

.payment__title {
    text-transform: uppercase;
    font-weight: 800;
    font-size: 1.3rem;
    border-bottom: 2px solid #000000;
    margin: 10px;
}

.payment__form {
    margin: 5px 10px;
}


.payment__item {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
}

.payment__item input {
    max-width: 100%;
}

.payment__item span {
    color: rgb(0, 150, 231);
    font-weight: 800;
}

.payment__item button{
    width: 100%;
    background-color: var(--color-main);
    border: none;
    padding: 10px;
    border-radius: 30px;
    color: #fff;
    font-weight: 400;
}

.payment_item--validate {
    background-color: rgb(250, 215, 215);
    border-color: red;
}
</style>