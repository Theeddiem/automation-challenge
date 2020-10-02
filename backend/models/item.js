const { v4: uuidv4 } = require('uuid');

module.exports = class Item {

    constructor(name, description, count)
    {
        this.name = name;
        this.description = description;
        this.count = count || 1;
    }
 
    withdraw(amount) { //validate postive number and withdraw can't be under zero
        if(amount > 0 && this.count - amount >= 0)
                   this.count -= amount;
    }

    deposit(amount) {  //validate postive number and withdraw can't be under zero
        if(amount > 0 )
            this.count += amount; 
    }

}