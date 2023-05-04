module.exports = class item {
    constructor(id, catId, name, image, price, count,description) {
        this.id = id
        this.name = name
        this.catId = catId
        this.image = image
        this.price = price
        this.count = count
        this.description = description
    }
}
