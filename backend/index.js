
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4, v4 } = require('uuid');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const { type } = require('os');
const bcrypt = require('bcryptjs');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://nguyenvyadoramy:musawir@cluster0.ut64qog.mongodb.net/e-commerce");

app.get('/', (req, res) => {
    res.send('Express app is running');
});

// Image Storage 
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

app.use('/images', express.static('upload/images'));

app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    });
});

// Schema for creating Product model

const Product = mongoose.model('Product', {
    id: {
        type: String,
        required: true,
        default: uuidv4
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_prices: {
        type: Number,
        required: true
    },
    old_prices: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    avilable: {
        type: Boolean,
        default: true
    }
});

// Creating Products
app.post('/addproduct', async (req, res) => {
    const product = new Product({
        id: req.body.id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_prices: req.body.new_prices,
        old_prices: req.body.old_prices
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name
    });
});

app.get('/allproducts', async (req, res) => {
    const products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
});

app.delete('/deleteproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    });
});

// Schema for creating User model

const Users = mongoose.model('Users', {
    email: {
        type: String,
        unique: true,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

// Create Endpoint for registering the user
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(12);
    await bcrypt.hash(password, salt);
}

app.get('/allproducts/:id', async(req, res) => {
    try {
        const product = await Product.findOne({id: req.body.id});
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.send(product.image);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});

app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        res.status(400).json({
            success: false,
            errors: "existing user found with same email address"
        });
    }
    let cart = {};
    for (let i = 0; i < 100; i++) {
        cart[i] = 0;
    }

    // const hashedPassword = await hashPassword(req.body.password);

    const user = new Users({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        cartData: cart,
    });
    await user.save();

    const data = {
        user: {
            id: user.id,
        }
    }
    
    console.log(user.password);
    const token = jwt.sign(data, process.env.SECRET_KEY);

    res.json({
      success: true,
      token,
    });
});

// Create Endpoint for logining user
app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    let user = await Users.findOne({email: req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
           const data = {
            user: {
                id: user.id
            }
           }
           const token = jwt.sign(data, process.env.SECRET_KEY);
           res.json({
            success: true,
            token
           });
        }
        else{
            res.json({
                success: false,
                errors: "Wrong Password"
            });
        }
    }
    else{
        res.json({
            success: false,
            errors: "Wrong Email Id"
        });
    }
});

// Creating Endpoint for Newcollections data

app.get('/allcollectionsdata', async(req, res) => {
    let products = await Product.find({});
    // bỏ sản phẩm đầu tiên và lấy 4 sản phẩm cuối cùng từ danh sách còn lại
    let newcollection = products.slice(1).slice(-4);
    console.log("Newcollection Fetched");
    res.send(newcollection);
});

// Creating Endpoint for Popular for Women

app.get('/popularinwomen', async(req, res) => {
    let products = await Product.find({category: "women"});
    let product_in_women = products.slice(0, 4);
    console.log("Popular in Women Fetched");
    res.send(product_in_women);
});

// Create Middleware to fetch user
const fetchUser = (req, res, next) => {
    const token = req.header("auth-token");
    if(!token){
        res.status(401).send({errors: "Please authenticate using valid token"});
    }
    else{
        try {
            const data = jwt.verify(token, process.env.SECRET_KEY, { expiresIn: '1h' });
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors: "Please authenticate using a valid token"});
        }
    }
}
// Creating Endpoint for adding products in cartData

app.post('/addtocart', fetchUser, async(req, res) => {
    console.log("Added", req.body.itemId);
    let userData = await Users.findOne({_id: req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    res.send("Added");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});


