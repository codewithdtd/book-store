const StaffService = require("../services/staff.service");
const CartService = require("../services/cart.service")
const PostgreSQL = require("../utils/postgresql.util");
const ApiError = require("../api-error");
const jwt = require('jsonwebtoken');


const generateAccessToken = require("../middleware/generateAccessToken")
const generateRefreshToken = require("../middleware/generateRefreshToken");
const OrderService = require("../services/order.service");
const BookService = require("../services/book.service");
const PublisherService = require("../services/publisher.service");
require('dotenv').config()

exports.create = async (req, res, next) => {
    try {
        const staffService = new StaffService();
        const document = await staffService.create(req.body);
        return res.send(document);
    } catch (error) { 
        return next(
            new ApiError(500, "Đã có lỗi xảy ra trong quá trình tạo tài khoản") 
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const staffService = new StaffService();
        const queryParams = req.query;
        if (Object.keys(queryParams).length > 0) {
            documents = await staffService.findByQuery(queryParams);
        } else {
            documents = await staffService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "Đã có lỗi xảy ra")
        ); 
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const staffService = new StaffService();
        const document = await staffService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "user not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving user with id=${req.params.id}`
            )
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const staffService = new StaffService();
        const document = await staffService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "user not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving user with id=${req.params.id}`)
        );
    }
}


exports.delete = async (req, res, next) => {
    try {
        const staffService = new StaffService();
        const document = await staffService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "user not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500, 
                `Không thể xóa id=${req.params.id}`
            )
        );
    }
}


exports.deleteAll = async (_req, res, next) => {
    try {
        const staffService = new StaffService();
        const deletedCount = await staffService.deleteAll();
        return res.send({
            message: `${deletedCount} users were delete successfully`,
        })
    } catch (error) {
        return next (
            new ApiError(
                500, "Đã có lỗi xảy ra!"
            )
        )
    }
}

exports.login = async (req, res, next) => {
    try {
        const staffService = new StaffService();
        const data = req.body;
        const user = await staffService.findUserLogin({ sodienthoai: data.sodienthoai, password: data.password });
        if(!user) {
            return next(new ApiError(404, "user not found"));
        }
        
        if(data.password !== user.password) {
            return res.send({
                message: `Sai mật khẩu`,
            })
        }
        if(user) {
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            })

            res.cookie("token", accessToken, {
                // httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            })

            const {password, ...orther} = user;
            return res.json({...orther});
        }
    }catch(err) {
        return next (
            new ApiError(
                500, "Đã có lỗi xảy ra!"
            )
        )
    }
}

exports.logout = async  (req, res, next) => {
    res.clearCookie("refreshToken");
    res.clearCookie("token");
    return res.json({message: "Logged out!"})
}


exports.refreshToken = async (req, res, next) => {
    const refreshToken = req.cookies?.refreshToken;

    if(!refreshToken) {
        return next( new ApiError(403, "You're not authenticated"));
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user)=> {
        console.log(user)
        if(err) {
            console.log(err);
        }
        // tạo access token mới
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
        })
        return res.json(newAccessToken);
    })
}

// CART
exports.addCart = async (req,res,next) => {
    try {
        const staffService = new StaffService();
        const cartService = new CartService();
        const bookService = new BookService();

        const data = req.body;
        const id = req.user.user.id;

        const cartItems = [];
        const cartItem = {
            sach: data,
            soluong: !data.soluong ? 1 : data.soluong,
            dongia: data.dongia,
        };
        // Kiểm tra số lượng trong kho
        const countProduct = await bookService.findById(data.id)

        const findCart = await cartService.find(id, data.id)
        console.log(cartItem);
        
        if(countProduct.soluong >= cartItem.soluong && !findCart ){
            countProduct.soluong = countProduct.soluong - cartItem.soluong;

            cartItems.push(cartItem)

            const updateBook = await bookService.update(cartItem.sach.id,countProduct)

            const addtoCart = await cartService.create(id, cartItem);
            return res.send({addtocart: addtoCart});
        }
        else if(findCart && countProduct.soluong >= cartItem.soluong) {
            countProduct.soluong = countProduct.soluong - cartItem.soluong;
            findCart.soluong+=cartItem.soluong;
            const total = cartItem.dongia*cartItem.soluong+findCart.dongia;
            findCart.dongia = total;
            // cartItems.push(cartItem)

            const updateBook = await bookService.update(cartItem.sach.id,countProduct)
            const addtoCart = await cartService.updatesoluong(findCart);
        
            const carts = await cartService.findAllCartUser(id)

      

            return res.send(addtoCart);
        }
        return res.json({message: "Quá số lượng"});

    } catch(err) {
        console.log(err)
        return next( new ApiError(
            500, "Đã có lỗi xảy ra!"
        ))
    }
}

exports.findAllCartUser = async (req, res, next) => {
    try {
        const cartService = new CartService();
        const carts = await cartService.findAllCartUser(req.user.user.id)
        return res.json(carts)
    } catch (error) {
        return next( new ApiError(
            500, "Đã có lỗi xảy ra!"
        ))
    }
}

exports.updateCart = async (req, res, next) => {
    try {
        const cart = req.body;
        const user = req.user.user.id;

        const cartService = new CartService();
        const staffService = new StaffService();
        const bookService = new BookService()
   
        //Check số lượng sản phẩm trong kho
        const countProduct = await bookService.findById(cart.sach.id)

        const item = await cartService.findById(cart.id);
        
        if(countProduct.soluong >= (cart.soluong - item.soluong)){
            if(cart.soluong > item.soluong)
                countProduct.soluong = countProduct.soluong - (cart.soluong - item.soluong);
            else 
                countProduct.soluong = countProduct.soluong + (item.soluong - cart.soluong)
            console.log(countProduct.soluong)


            const updateCart = await cartService.update(cart.id,cart)
            const carts = await cartService.findAllCartUser(user)

            const updateBook = await bookService.update(cart.sach.id,countProduct)
            // console.log(updateBook)


        

            return res.json(updateCartUser)
        }
        else 
            return res.json({message: "Quá số lượng"})
    } catch (error) {
        console.log(error)
        return next(new ApiError(
            500, "Đã có lỗi xảy ra!"
        ))
    }
}

exports.deleteCart = async (req, res, next) => {
    try {
        const cartid = req.params.id;
        const user = req.user.user.id;


        const cartService = new CartService();
        const staffService = new StaffService();
        const bookService = new BookService()

        const cart = await cartService.findById(cartid)
        const product = await bookService.findById(cart.sach.id)

 
        cart.soluong = cart.soluong + product.soluong;

        const countProduct = await bookService.update(cart.sach.id, {soluong: cart.soluong} )


        const deleteCart = await cartService.delete(cart.id);
     

        return res.json(deleteCartUser);
    } catch (error) {
        return next( new ApiError(
            500, "Đã có lỗi xảy ra!"
        ))
    }
}

exports.addOrder = async (req, res, next) => {
    try {
        const order = req.body;
        const user = req.user.user.id;

        order.userId = user;

        const cartService = new CartService();
        const orderService = new OrderService();

        // Create order
        const addOrder = await orderService.create(order);
        await cartService.deleteAllCartUser(user);
        return res.json(addOrder);
    } catch (error) {
        console.log(error)
        return next( new ApiError(
            500, "Đã có lỗi xảy ra!"
        ))
    }
}

exports.updateOrder = async (req, res, next) => {
    try {
        const order = req.body;
        const orderService = new OrderService();
        
        const updateOrder = await orderService.update(order.id,order)
        return res.json(updateOrder)
    } catch (error) {
        console.log(error)
        return next( new ApiError(
            500, "Đã có lỗi xảy ra!"
        ))
    }
}

exports.findAllOrderUser = async (req, res, next) => {
    try {
        const userId = req.user.user.id;
        const orderService = new OrderService();

        const AllOrder = await orderService.findAllOrderUser(userId)
        return res.json(AllOrder)
    } catch (error) {
        console.log(error)
        return next( new ApiError(
            500, "Đã có lỗi xảy ra!"
        ))
    }
}

exports.findAllOrder = async (req, res, next) => {
    let AllOrder = [];
    try {
        const orderService = new OrderService();

        AllOrder = await orderService.findAll();
        // const AllOrder = await orderService.findAllOrderUser(userId)
        const AllOrderDetail = await orderService.findAllOrderDetailUser();
        console.log(AllOrderDetail)
        AllOrder.forEach(item => {
            item.sach = [];
            AllOrderDetail.forEach(detail => {
                if (item.id == detail.phieutheodoi_id) 
                    item.sach.push(detail);
            })
        })
        return res.json(AllOrder)
    } catch (error) {
        console.log(error)
        return next( new ApiError(
            500, "Đã có lỗi xảy ra!"
        ))
    }
    return res.send(AllOrder)
}

exports.findAllPublisher = async (req, res, next) => {
    try {
        const publisherService = new PublisherService();

        const AllPublisher = await publisherService.find()
        return res.json(AllPublisher)
    } catch (error) {
        // console.log(error)
        return next( new ApiError(
            500, "Đã có lỗi xảy ra!"
        ))
    }
}

exports.addPublisher = async (req, res, next) => {
    try {
        const publisherService = new PublisherService();
        const newPublisher = await publisherService.create(req.body);
        
        return res.send(newPublisher);

    } catch (error) {
        console.log(error)
        return next( new ApiError(
            500, "Đã có lỗi xảy ra!"
        ))
    }
}

exports.updatePublisher = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const publisherService = new PublisherService();
        const document = await publisherService.update(req.body.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error with id=${req.body.id}`)
        );
    }
}

exports.deletePublisher = async (req, res, next) => {
    try {
        const publisherService = new PublisherService();
        const document = await publisherService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500, 
                `Không thể xóa id=${req.params.id}`
            )
        );
    }
}

exports.findAllOrderDetailUser = async (req, res, next) => {
    try {
        const userId = req.user.user.id;
        const orderService = new OrderService();

        const AllOrder = await orderService.findAllOrderUser(userId)
        const AllOrderDetail = await orderService.findAllOrderDetailUser();
        console.log(AllOrderDetail)
        AllOrder.forEach(item => {
            item.sach = [];
            AllOrderDetail.forEach(detail => {
                if (item.id == detail.phieutheodoi_id) 
                    item.sach.push(detail);
            })
        })
        return res.json(AllOrder)
    } catch (error) {
        console.log(error)
        return next( new ApiError(
            500, "Đã có lỗi xảy ra!"
        ))
    }
}
