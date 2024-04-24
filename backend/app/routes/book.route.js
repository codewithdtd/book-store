const express = require("express");
const book = require("../controllers/book.controller");
// const publisher = require("../controllers/publisher.controller");

const multer  = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads'))
    },
    filename: function (req, file, cb) {
      const originalname = file.originalname;
      const filename = originalname.replace(/\s+/g, '-');

      cb(null, filename)
      console.log(filename);
    }
  })    
const upload = multer({ storage });
const router = express.Router();

// router.route("/category")
//     .get(book.findAllCategory)
//     .post(book.createCategory)
//     .delete(book.deleteCategory);
    
// router.route("/category/:id")
//     .get(book.findOneCategory)
//     .put(book.updateCategory)
//     .delete(book.deleteCategory);

router.route("/")
    .get(book.findAll)
    .post(upload.single("hinhanh"), book.create)
    // .post(book.create)
    .delete(book.deleteAll);


router.route("/:id")
    .get(book.findOne)
    .put(upload.single("hinhanh"),book.update)
    .delete(book.delete);

module.exports = router;