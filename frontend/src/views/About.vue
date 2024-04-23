<template>
    <div class="about">
        <div class="about__inside">
            <h1>Giới thiệu</h1>
            <p style="text-align: justify;">Sách quốc văn với nhiều thể loại đa dạng như sách giáo khoa - tham khảo, giáo trình, sách học ngữ, từ điển, sách tham khảo thuộc nhiều chuyên ngành phong phú: văn học, tâm lý – giáo dục, khoa học kỹ thuật, khoa học kinh tế - xã hội, khoa học thường thức, sách phong thủy, nghệ thuật sống, danh ngôn, sách thiếu nhi, truyện tranh, truyện đọc, từ điển, công nghệ thông tin, khoa học – kỹ thuật, nấu ăn, làm đẹp...  của nhiều Nhà xuất bản, nhà cung cấp sách có uy tín như: NXB Trẻ, Giáo Dục, Kim Đồng, Văn hóa -Văn Nghệ, Tổng hợp TP.HCM, Chính Trị Quốc Gia; Công ty Đông A, Nhã Nam, Bách Việt, Alphabook, Thái Hà, Minh Lâm, Đinh Tị, Minh Long, TGM, Sáng Tạo Trí Việt, Khang Việt, Toàn Phúc…</p>
            <p style="text-align: justify;">Gồm Phân xưởng in và Phân xưởng thành phẩm: với nhiều máy in hiện đại của Đức và Nhật: Heidelberg, Komori, Akiyama, Lithrone, Mitsubishi… cùng nhiều máy móc, thiết bị khác như: máy cắt, máy vô bìa sách, máy bế hộp…  Đội ngũ công nhân tay nghề cao, đã cho ra những sản phẩm có chất lượng tốt, nhờ đó, sản xuất theo đúng nhu cầu - thị hiếu của khách hàng và hình thành được quy trình in & phát hành.</p>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
.about {
    color: #000000;
    background: url("../assets/home.jpg");  
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;
    height: 100vh;
    min-height: fit-content;
}
.about__inside {
    color: #000000;
    background-color: #00000093;
    backdrop-filter: blur(2px);
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;
    height: 100vh;
    min-height: fit-content;
}
.about h1 {
    padding-top: 20px;
    color: var(--color-main);
    font-size: 2.7rem;
    text-shadow: 0.05rem 0.05rem hsl(0, 0%, 100%);
}

.about p {
    width: 60%;
    margin: auto;
    color: #ffffff;
    font-weight: 400;
    /* background-color: #00000059; */
    margin-top: 20px;
    line-height: 1.7;
    /* text-shadow: 0.05rem 0.05rem hsl(0, 0%, 0%); */
}
.about button {
    font-size: 1.2rem;
    border-radius: 30px;
    margin: 10px 30px;
}
</style>