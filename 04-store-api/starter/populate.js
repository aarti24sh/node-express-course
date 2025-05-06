require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')
const jsonProducts = require('./products.json')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(jsonProducts);
        
        console.log('Products populated successfully!');
        process.exit(0); // Exit the process after completion
    } catch (error) {
        console.log(error)
        //console.error('Error populating products:', error);
        process.exit(1); // Exit the process with an error code
    }
}

start()