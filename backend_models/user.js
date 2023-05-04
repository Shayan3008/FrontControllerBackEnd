module.exports = class users {
    constructor(id, f_name, l_name, p_number, email, passwordhash,address) {
        this.id = id
        this.l_name = l_name
        this.f_name = f_name
        this.p_number = p_number
        this.email = email
        this.passwordhash = passwordhash
        this.address = address
    }
}