const UserService = require("../services/user.service");
const CartService = require("../services/cart.service")
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const jwt = require('jsonwebtoken');


const generateAccessToken = require("../middleware/generateAccessToken")
const generateRefreshToken = require("../middleware/generateRefreshToken");
const OrderService = require("../services/order.service");
const BookService = require("../services/book.service")
require('dotenv').config()

exports.create = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.create(req.body);
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
        const userService = new UserService(MongoDB.client);
        const queryParams = req.query;
        if (Object.keys(queryParams).length > 0) {
            documents = await userService.findByQuery(queryParams);
        } else {
            documents = await userService.find({});
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
        const userService = new UserService(MongoDB.client);
        const document = await userService.findById(req.params.id);
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
        const userService = new UserService(MongoDB.client);
        const document = await userService.update(req.params.id, req.body);
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
        const userService = new UserService(MongoDB.client);
        const document = await userService.delete(req.params.id);
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
        const userService = new UserService(MongoDB.client);
        const deletedCount = await userService.deleteAll();
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
        const data = req.body;
        const userService = new UserService(MongoDB.client);
        const user = await userService.findUserLogin({ sodienthoai: data.sodienthoai });
    
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
        const userService = new UserService(MongoDB.client);
        const cartService = new CartService(MongoDB.client);
        const bookService = new BookService(MongoDB.client);

        const data = req.body;
        const { soluong, ...all } = data
        const id = req.user.user._id;

        const cartItems = [];
        const cartItem = {
            sach: all,
            soluong: !data.soluong ? 1 : data.soluong,
            dongia: data.dongia,
        };
        // Kiểm tra số lượng trong kho
        const countProduct = await bookService.findById(data._id)

        const findCart = await cartService.find(id, data._id)
        // console.log(cartItem);
        
        if(countProduct.soluong >= cartItem.soluong && !findCart ){
            countProduct.soluong = countProduct.soluong - cartItem.soluong;
            cartItems.push(cartItem)
            const addCart = await userService.addCart(id, cartItems);

            const updateBook = await bookService.update(cartItem.sach._id,countProduct)

            const addtoCart = await cartService.create(id, cartItem);
            return res.send({addtocart: addtoCart});
        }
        else if(findCart && countProduct.soluong >= cartItem.soluong) {
            countProduct.soluong = countProduct.soluong - cartItem.soluong;
            findCart.soluong+=cartItem.soluong;
            const total = cartItem.dongia*cartItem.soluong+findCart.dongia;
            findCart.dongia = total;
            // cartItems.push(cartItem)
            const updateBook = await bookService.update(cartItem.sach._id,countProduct)
            const addtoCart = await cartService.updatesoluong(findCart);
        
            const carts = await cartService.findAllCartUser(id)

            const newCarts = carts.map(({ user, ...rest}) => rest);
            const clearCart = await userService.deleteAllCart(id)
            const updateCartUser = await userService.updateCart(id,newCarts) 

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
        const cartService = new CartService(MongoDB.client);
        const carts = await cartService.findAllCartUser(req.user.user._id)
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
        const user = req.user.user._id;

        const cartService = new CartService(MongoDB.client);
        const userService = new UserService(MongoDB.client);
        const bookService = new BookService(MongoDB.client)
   
        //Check số lượng sản phẩm trong kho
        const countProduct = await bookService.findById(cart.sach._id)

        const item = await cartService.findById(cart._id);
        
        if(countProduct.soluong >= (cart.soluong - item.soluong)){
            if(cart.soluong > item.soluong)
                countProduct.soluong = countProduct.soluong - (cart.soluong - item.soluong);
            else 
                countProduct.soluong = countProduct.soluong + (item.soluong - cart.soluong)
            console.log(countProduct.soluong)


            const updateCart = await cartService.update(cart._id,cart)
            const carts = await cartService.findAllCartUser(user)

            const updateBook = await bookService.update(cart.sach._id,countProduct)
            // console.log(updateBook)


            const newCarts = carts.map(({ user, ...rest}) => rest);
            const clearCart = await userService.deleteAllCart(user)
            const updateCartUser = await userService.updateCart(user,newCarts) 

            return res.json(updateCartUser)
        }
        else 
            return res.json({message: "Quá số lượng"})
    } catch (error) {
        // console.log(error)
        return next(new ApiError(
            500, "Đã có lỗi xảy ra!"
        ))
    }
}

exports.deleteCart = async (req, res, next) => {
    try {
        const cart_id = req.params.id;
        const user = req.user.user._id;


        const cartService = new CartService(MongoDB.client);
        const userService = new UserService(MongoDB.client);
        const bookService = new BookService(MongoDB.client)

        const cart = await cartService.findById(cart_id)
        const product = await bookService.findById(cart.sach._id)

 
        cart.soluong = cart.soluong + product.soluong;

        const countProduct = await bookService.update(cart.sach._id, {soluong: cart.soluong} )


        const deleteCart = await cartService.delete(cart._id);
        const deleteCartUser = await userService.deleteCart(user, cart._id)

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
        const user = req.user.user._id;

        order.userId = user;
        console.log(user);

        const cartService = new CartService(MongoDB.client);
        const orderService = new OrderService(MongoDB.client);
        const userService = new UserService(MongoDB.client);

        // Create order
        const addOrder = await orderService.create(order);
        await cartService.deleteAllCartUser(user);
        await userService.deleteAllCart(user);
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
        const orderService = new OrderService(MongoDB.client);

        const updateOrder = await orderService.update(order._id,order)
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
        const userId = req.user.user._id;
        const orderService = new OrderService(MongoDB.client);

        const AllOrder = await orderService.findAllOrderUser(userId)
        return res.json(AllOrder)
    } catch (error) {
        console.log(error)
        return next( new ApiError(
            500, "Đã có lỗi xảy ra!"
        ))
    }
}