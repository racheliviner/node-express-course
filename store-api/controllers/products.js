const ProductSchema = require('../models/product')

async function getAllProducts(req, res) {
    try {
        const {name, featured, company, numericFilters, sort, fields} = req.query
        let queryObject = {}
        if (name){
            queryObject.name = {$regex: name, $options: 'i'}
        }
        if (featured){
            queryObject.featured = featured
        }
        if (company){
            queryObject.company = company
        }
        if (numericFilters){
            const operatorMap = {
                '>': '$gt',
                '>=': '$gte',
                '=': '$eq',
                '<': '$lt',
                '<=': '$lte',
            };
            const regEx = /\b(<|>|>=|=|<|<=)\b/g;
            let filters = numericFilters
             .replace(regEx, (match) => `-${operatorMap[match]}-`);

            const options = ['price', 'rating'];
            filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) };
            }
            });

        }

        let result = ProductSchema.find(queryObject);

        if (sort) {
            const sortList = sort.split(',').join(' ');
            result = result.sort(sortList);
          } else {
            result = result.sort('createdAt');
        }
        if (fields) {
            const fieldsList = fields.split(',').join(' ');
            result = result.select(fieldsList);
        }

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        result = result.skip(skip).limit(limit);
        
        const products = await result
        res.status(200).json({ hbHits: products.length, products})

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

module.exports = getAllProducts