const signupSchema =require('../model/signup')
const bcrypt = require('bcrypt')


const logVerify = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await signupSchema.findOne({ email: email })

        if (!email || !password) {
            req.flash('error', 'All fields are required');
            res.redirect('/login'); 
        } else if (!user) {
            req.flash('error', 'User not found');
            res.redirect('/login'); 

        } else {
            req.session.userId=user._id
            next();
        }
    } catch (error) {
        console.error("Error during login:", error);
        req.flash('error', 'An error occurred during login');
        res.redirect('/login'); 
    }
};



const  signupVerify = async (req, res, next) => {
    const { name, email, phone, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        res.send('password incorrect')
    }
    try {
        const existingUser = await signupSchema.findOne({ email: email });
        console.log(existingUser);
        if (existingUser) {
            res.redirect('/signup')
        }else{

            const hashedpassword = await bcrypt.hash(password, 10)
            const data = {
                name: name,
                email: email,
                phone: phone,
                password: hashedpassword
            }
            const newUser = await signupSchema.create(data)
            next();
        }
    } catch (error) {
        console.error("error during user registration", error);
    }
}









module.exports = { logVerify, signupVerify }















