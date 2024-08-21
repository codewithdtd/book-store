<template>
    <div class="order" v-if="this.load">
        <h3>Đơn hàng của bạn</h3>
        <div class="order__list order__list__title row col-sm-11">
            <div class="order__list__item col-sm-5"></div>
            <div class="order__list__item col-sm-2">Tổng tiền</div>
            <div class="order__list__item col-sm-2">Ngày mượn</div>
            <div class="order__list__item col-sm-2">Ngày trả</div>
            <div class="order__list__item col-sm-1">Trạng thái</div>
        </div>
        <div v-for="(item, index) in order" class="order__list row col-sm-11" :key="item.id">
            <div class="order__list__item order__list__item--sach col-sm-5">
                <div class="order__list__item__sach d-flex" v-for="item_item in item.sach">
                    <img :src="'http://localhost:3000/static/'+item_item.sach.hinhanh" alt="">
                    <div>
                        <p>{{ item_item.sach.ten }}</p>
                        <p>x{{ item_item.soluong }} {{ item_item.gia.toLocaleString() }} VNĐ</p>
                    </div>
                </div>
            </div>
            <div class="order__list__item col-sm-2">{{ item.tongtien.toLocaleString() }} VNĐ</div>
            <div class="order__list__item col-sm-2">{{ item.ngaymuon }}</div>
            <div class="order__list__item col-sm-2">{{ item.ngaytra }}</div>
            <div v-if="item.trangthai == 'Đã trả'" class="order__list__item col-sm-1 text-success">
                {{ item.trangthai }}
            </div>
            <div v-else-if="item.trangthai == 'Quá hạn'" class="order__list__item col-sm-1 text-danger">
                {{ item.trangthai }}
            </div>
            <div v-else class="order__list__item col-sm-1 text-warning">
                {{ item.trangthai }}
            </div>
        </div>
    </div>
</template>

<script>
import userService from '@/services/user.service';
import bookService from '@/services/book.service';
export default {
    updated() {
        // this.getOrder();
    },
    mounted() {
        this.getOrder();
    },
    methods: {
        async getOrder() {
            this.order = await userService.getAllOrder();
            this.book = await bookService.getAll();
            this.order.map(o => {
                o.sach.map(os => {
                    const book = this.book.find(b => os.sach_id === b.id);
                    if (book) {
                        os.sach = book; // Gán đối tượng `book` vào `os.sach`
                    }
                    return os;
                })
            })
            this.load = true
        }
    },
    data() {
        return {
            order: [],
            book: [],
            load: false
        }
    }
}
</script>

<style>
.order {
    height: 80vh;
    min-height: fit-content;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.order h3 {
    margin-top: 20px;
    text-align: center;
    color: var(--color-main);
    height: min-content;
}
.order__list {
    align-items: center;
    border: 2px solid #73737392 ;
    border-top: none ;
    margin: 0 auto;
    padding: 10px 0;
}

.order__list__item__sach img{
    width: 70px;
}

.order__list__item--sach {
    text-align: start;
}

.order__list__item--sach p {
    margin: 0;
}

.order__list__title {
    background-color: var(--color-main);
    font-weight: 600;
}

</style>