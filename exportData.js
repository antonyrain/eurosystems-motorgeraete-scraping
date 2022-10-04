const Data = require('./dataSchema')

const exportData = (obj) => {
    try {
        const data = new Data({
            category: obj.category,
            name: obj.name,
            price: obj.price,
            timestamp: obj.timestamp,
            required: true,
        })
        data.save()
        console.log('Data export to database SUCCESS')
    } catch (error) {
        console.error('Data export to database FAIL')
    }
}

module.exports = exportData
