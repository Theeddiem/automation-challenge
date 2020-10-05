module.exports = class Item {
  constructor(name, description, count) {
    this.name = name;
    this.description = description;
    this.count = count || 1;
  }

  withdraw(amount) {
    this.count -= amount;
  }

  deposit(amount) {
    this.count += amount;
  }
};
