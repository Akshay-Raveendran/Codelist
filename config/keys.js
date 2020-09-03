const mongoose = require('mongoose')

const URI = 'mongodb+srv://dbUser:defaultitis@cluster0-bvuoi.mongodb.net/test?retryWrites=true&w=majority'

const connectDB = async() =>{
		await mongoose.connect(URI,{ useUnifiedTopology: true,useNewUrlParser: true } );
		console.log('connected db')

};

module.exports = connectDB;