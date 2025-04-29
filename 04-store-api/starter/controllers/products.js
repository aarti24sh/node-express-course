const Product = require('../models/product')  //check Product or product

const getAllProductsStatic = async (req, res) => {
    
    const products = await Product.find({ price: { $gt: 30 }})
    .sort('price')
    .select('name price')
    //throw new Error('Testing async errors')   
    res.status(200).json({ products, nbHits : products.length })  // Return the products and their count
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query
    const queryObject = {}
    
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' } // case-insensitive search
    }
    if (numericFilters) {
        //console.log(numericFilters)
        const operatorMap = {
            '>': '$gt',
            '<': '$lt',
            '=': '$eq',
            '>=': '$gte',
            '<=': '$lte'
        }
        const regEx = /\b(<|>|=|>=|<=)\b/g
        let filters = numericFilters.replace(regEx, match => `-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filters.split(',').forEach(item => {
            const [field, operator, value] = item.split('-')
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
            }
        })
    }

    console.log(queryObject)
    let result = Product.find(queryObject)
    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    else {
        result = result.sort('createdAt') // default sorting by createdAt in descending order
    }

    if (fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    result = result.skip(skip).limit(limit)

    const products = await result 
    res.status(200).json({ products, nbHits : products.length })
}

module.exports = {
    getAllProducts,
    getAllProductsStatic,
}