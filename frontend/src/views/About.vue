<template>
    <div class="about">
        <h1>About JDa Chef</h1>
        <p>Nhà hàng được mở từ năm 1990, là một trong những nhà hàng Trung Hoa lâu đời nhất tại thành phố. Trải qua bao thăng trầm, nơi đây vẫn giữ nguyên hương vị truyền thống của ẩm thực Trung Hoa, níu chân thực khách bởi những món ăn ngon và không gian ấm cúng.</p>

        <p>
            Thực đơn của nhà hàng vô cùng phong phú, với hơn 100 món ăn đa dạng, từ các món khai vị thanh đạm, món chính đậm đà cho đến các món tráng miệng ngọt ngào. Mỗi món ăn đều được chế biến tỉ mỉ, cầu kỳ, mang hương vị đặc trưng của từng vùng miền Trung Quốc.
        </p>
        <p>
            Đặc biệt, nhà hàng còn sở hữu đội ngũ đầu bếp giàu kinh nghiệm, luôn tâm huyết mang đến cho thực khách những món ăn ngon nhất. Nguyên liệu được sử dụng đều tươi ngon, đảm bảo chất lượng, góp phần tạo nên hương vị hoàn hảo cho từng món ăn.
        </p>
        <p>
            Nếu bạn đang tìm kiếm một nhà hàng Trung Hoa mang đậm dấu ấn thời gian, với hương vị truyền thống và không gian ấm cúng, thì nhà hàng này chính là điểm đến lý tưởng dành cho bạn.
        </p>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
.about {
    color: #fff;
    /* background: url("../assets/bg.jpg");     */
    background: #000000d7;    
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;
    height: 100vh;
    min-height: fit-content;
}
.about h1 {
    padding-top: 20px;
    font-family: "Dancing Script", cursive;
    color: var(--color-main);
    font-size: 2.7rem;
}

.about p {
    width: 60%;
    margin: auto;
    color: #ffffff;
    font-weight: 400;
    /* background-color: #00000059; */
    margin-top: 20px;
    line-height: 1.7;
}
.about button {
    font-size: 1.2rem;
    border-radius: 30px;
    margin: 10px 30px;
}
</style>