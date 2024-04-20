<template>
    <!-- <AppHeader /> -->
    <div class="home">
        <div class="home__one">
            <div class="home__one__element">
                <h1>Chào mừng đến với Book Store</h1>
                <p>Sở hữu không gian mua sắm rộng rãi, thoáng mát với đầy đủ các thể loại sách đa dạng phong phú, từ sách văn học, khoa học kỹ thuật, kinh tế, ngoại ngữ,... đến sách thiếu nhi, truyện tranh,... đáp ứng mọi nhu cầu đọc của quý khách hàng.</p>
                <router-link to="/menu">
                    <button class="">Xem Sách</button>
                </router-link>
            </div>
        </div>
        <div class="home__two">
            <div class="home__two__left">
                <img src="../assets/home.jpg" alt="">
                <img src="../assets/home2.jpg" alt="">
            </div>  
            <div class="home__two__right">
                <h2>Cửa hàng chúng tôi</h2>
                <p>
                    Không gian cửa hàng được bài trí tinh tế với những góc đọc nhỏ xinh, ánh sáng dịu nhẹ, tạo cảm giác thư giãn và dễ chịu. Những chiếc ghế êm ái tựa như mời gọi ta chìm đắm vào từng trang sách, đắm chìm trong những câu chuyện, những khám phá mới mẻ.
                </p>
                <p>
                    Thiên đường tri thức không chỉ là nơi mua sắm sách, mà còn là nơi chắp cánh cho ước mơ, nuôi dưỡng niềm đam mê và lan tỏa tri thức đến cộng đồng. Đến đây, bạn không chỉ tìm được những cuốn sách yêu thích mà còn có cơ hội gặp gỡ những người bạn đồng điệu, cùng nhau chia sẻ niềm đam mê đọc và học hỏi.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Tilt+Neon&display=swap');
.home__one {
    color: #fff;
    height:calc(100vh - 100px);
    max-width: 100%;
    /* background: #373737; */
    background: url('https://www.housedigest.com/img/gallery/how-to-make-custom-wallpaper-using-old-book-pages/l-intro-1660552487.jpg');    
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;
    margin: 10px;
    border-radius: 40px;
    /* align-items: center; */
}

.home__one__element {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.home__one h1 {
    /* padding-top: 15%; */
    /* font-family: "Dancing Script", cursive; */
    font-family: "Tilt Neon", sans-serif;
    color: var(--color-main);
    font-size: 3rem;
    font-weight: 700;
    text-shadow: 0.05rem 0.1rem hsl(0, 0%, 0%);
}

.home__one p {
    width: 60%;
    color: #ffffff;
    font-weight: 400;
    text-shadow: 0.05rem 0.1rem hsl(0, 0%, 0%);
    padding: 10px 0;
}
.home__one button {
    font-size: 1.1rem;
    border-radius: 10px;
    color: #ffffff;
    padding: 10px 50px;
    font-weight: 600;
    background-color: var(--color-main);
    border: none;
}
.home__one button:hover {
    background-color: #a00f0f;
}


.home__two {
    color: #000000;
    height: calc(100vh - 100px);
    /* height: fit-content; */
    max-width: 100%;
    /* background: #1e1e1e; */
    text-align: center;
    display: flex;
    justify-content: center;
}

.home__two__right {
    max-width: 50%;
    align-self: center;
    text-align: left;
}

.home__two__right h2 {
    color: var(--color-main);
    font-weight: 500;
}

.home__two__right p {
    font-weight: 400;
}

.home__two__left {
    display: flex;
    max-height: fit-content;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    /* max-height: 100%; */
} 
.home__two__left img {
   display: block;
   border-radius: 20px;
   max-height: 40%;
   margin: 10px;
}

@media screen and  (max-width: 1175px) {
    .home__two__left img { 
        max-height: 30%;
    }
}
</style>