
module.exports = class Item { 

    constructor(name, description, count)
    {
        this.name = name;
        this.description = description;
        this.count = count || 1;
    }
 
    withdraw(amount) {
        if(amount > 0 && this.count - amount >= 0)
                   this.count -= amount;
    }

    deposit(amount) { 
        if(amount > 0 )
            this.count += amount; 
    }

}