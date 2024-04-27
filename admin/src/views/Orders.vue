<template>
    <div class="order">
        <div class="order__header">
           
        </div>
        <div class="order__form" :class="{'order__form--active': order_form }">
            <form action="" @submit.prevent="handleSubmit">
                <p class="btn btn-outline-danger close" @click="handleOrder">&times</p>
                <h3>Chỉnh sửa phiếu theo dõi</h3>
                <div class="order__form__item">
                    <p>Mã phiếu:</p>
                    <span>{{ order._id }}</span>
                </div>
                <div class="order__form__item">
                    <p>Đọc giả:</p>
                    <span>{{ docgia.ho + ' ' + docgia.ten }}</span>
                </div>
                <div class="order__form__item">
                    <p>Số điện thoại:</p>
                    <span>{{ docgia.sodienthoai }}</span>
                </div>
                <div class="order__form__item">
                    <p>Sách:</p>
                </div>
                <div class="order__form__item order__form__item__book" v-for="(item,index) in book">
                    <span>{{ index+1+'. ' + item.sach.ten + ' x' + item.soluong + ' quyển ' + item.gia + 'VNĐ' }}</span>
                </div>
                <div class="order__form__item">
                    <p>Tổng tiền:</p>
                    <span>{{ order.tongtien }}VNĐ</span>
                </div>
                <div class="order__form__item">
                    <p>Ngày mượn:</p>
                    <span>{{ order.ngaymuon }}</span>
                </div>
                <div class="order__form__item">
                    <p>Ngày trả:</p>
                    <input v-if="order.trangthai != 'Đã trả'" type="date" v-model="ngaytra" @change="handlePhuthu">
                    <input v-else disabled type="date" v-model="ngaytra" @change="handlePhuthu">
                </div>
                <div class="order__form__item">
                    <p>Trạng thái:</p>
                    <input v-if="order.trangthai == 'Đã trả'" disabled type="text" v-model="order.trangthai">
                    <select v-else name="" id="" v-model="trangthai">
                        <option :value="order.trangthai" selected>{{ order.trangthai }}</option>
                        <option value="Đã duyệt">Đã duyệt</option>
                        <option value="Đang mượn">Đang mượn</option>
                        <option value="Đã trả">Đã trả</option>
                        <option value="Quá hạn">Quá hạn</option>
                    </select>
                </div>
                <div class="order__form__item">
                    <p>Phụ thu:</p>
                    <input v-if="order.trangthai != 'Đã trả'" type="checkbox" v-model="phuthu">
                    <input v-else disabled type="checkbox" v-model="phuthu">
                </div>
                <p v-if="phuthu">Phụ thu: {{ tongtien*20/100 }} Tổng tiền: {{ tongtien + tongtien*20/100 }}</p>
                <button>Cập nhật</button>
            </form>
        </div>
        <TableOrder :nameTable="this.$route.name" @edit="handleEditOrder"/>
    </div>
</template>
<script>
import TableOrder from "@/components/TableOrder.vue";
import staffService from "@/services/staff.service";
export default {
    components: {
        TableOrder
    },
    watch: {
        phuthu(newValue, oldValue) {
            if (newValue) {
                this.phuthu = 1; // Nếu checkbox được chọn, cập nhật giá trị của phuthu thành 1
                console.log('thay đổi' + this.phuthu)
            }
            else {
                console.log('không có thay đổi' + this.phuthu)
            }
        }
    },
    methods: {
        handleOrder() {
            this.order_form = !this.order_form;
        },
        handleEditOrder(order) {
            this.order = order;
            this.book = order.sach;
            this.docgia = order.docgia;
            this.ngaymuon = order.ngaymuon;
            this.ngaytra = order.ngaytra;
            this.tongtien = order.tongtien;
            this.trangthai = order.trangthai;
            this.order_form = !this.order_form;
        },
        handlePhuthu() {
            const parts = this.ngaymuon.split('-');
            const ngay_muon = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
            console.log('ngay mượn: '+ngay_muon)

            const parts_two = this.ngaytra.split('-')
            const ngay_tra = new Date(parseInt(parts_two[0]), parseInt(parts_two[1]) - 1, parseInt(parts_two[2]));

            console.log('ngay trả: '+ ngay_tra)
            return ngay_tra - ngay_muon < 7*24*60*60*1000; //7 ngày
        },
        async handleSubmit() {
            if(!this.handlePhuthu)
                this.phuthu = this.tongtien * 20 / 100;
            !this.phuthu ? this.tongtien = this.tongtien : this.tongtien = this.tongtien + this.tongtien * 20 / 100
            const data = {
                _id: this.order._id,
                ngaymuon: this.ngaymuon,
                ngaytra: this.ngaytra,
                docgia: this.docgia,
                tongtien: this.tongtien,
                sach: this.book,
                trangthai: this.trangthai, 
            }
            if(await staffService.updateOrder(data)) {
                this.order_form = !this.order_form;
            }
        }
    },
    data() {
        return {
            order_form: false,
            order: '',
            book: [],
            docgia: {},
            ngaymuon: '',
            ngaytra: '',
            tongtien: 0,
            trangthai:'',
            phuthu: 0,
        }
    }
}
</script>
<style>
.order__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.order__header input {
    font-size: 0.9rem;
    padding: 5px 7px;
    border-radius: 7px;
    border: none;
    width: 10rem;
}

.order__header__action {
    display: flex;
    align-items: center;
}

.order__header__search {
    background-color: white;
    padding: 0 4px;
    border-radius: 7px;
}

.order__header__search input:focus, .order__header__filter select:focus {
    border: none;
    outline: none;
}

.order__header__action button {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: none;
    font-weight: 400;
    font-size: 20px;
    background-color: rgb(57, 107, 255);
    color: #fff;
    margin-right: 10px;
}
.order__header__action button:hover {
    background-color: #081aa3;
}

.order__header__filter {
    background-color: #fffefe;
    border-radius: 7px;
    overflow: hidden;
    padding: 1px 0 2px 10px;
    margin-right: 5px;
}

.order__header__filter select{
    font-size: 0.9rem;
    padding: 5px 3px;
    border: none;
    /* width: 10rem; */
}

.order__form {
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

.order__form.order__form--active {
    top: 0;
}

.order__form form {
    position: relative;
    background-color: #4a4a4a;
    /* backdrop-filter: blur(10px); */
    margin: auto;
    height: fit-content;
    text-align: center;
    border-radius: 20px;
    font-weight: 300;
    color: #fff;
    padding: 20px 0;
    /* border: 2px solid; */
    box-shadow: 1px 5px 10px rgba(255, 255, 255, 0.267);
    
}

.order__form form h3 {
    padding: 15px;
    color: #328cdb;
    font-weight: 600;
    font-size: 2rem;
}

.order__form__item {
    display: flex;
    justify-content: space-between;
    padding: 2px 15px;
    text-align: start;
}
.order__form__item p {
    width: 100px;
    margin: 5px;
    font-weight: 400;
}

.order__form__item input, 
.order__form__item select,
.order__form__item textarea {
    flex-grow: 1;
    border-radius: 10px;
    border: none;
}


.order__form form button {
    width: 150px;
    height: 40px;
    border-radius: 12px;
    background-color: var(--color-main);
    border: none;
    font-weight: 600;
    color: rgb(255, 255, 255);
}
.order__form form .close {
    position: absolute;
    right: 10px;
    top: 10px;
}

.order__form__item img {
    height: 100px;
    width: 100px;
    object-fit: cover;
    border-radius: 10px
}

.order__form__item__book {
    margin-left: 50px;
}

</style>

  