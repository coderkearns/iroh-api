// A structure representing a table in a database.
class Table {
    constructor(name, data = []) {
        this.name = name;
        this.data = data;
    }

    findOneWhere(whereFn) {
        return this.data.find(whereFn);
    }

    findWhere(whereFn) {
        return this.data.filter(whereFn);
    }

    get count() {
        return this.data.length;
    }

    get nextId() {
        return Array.at(this.data, -1).id + 1;
    }

    get isEmpty() {
        return this.data.length === 0;
    }

    /* ----- Implement Methods ----- */

    get(id) {
        return this.findOneWhere(item => item.id === id);
    }

    // Get all items
    all() {
        return this.data;
    }

    // Get the first item that matches a WHERE clause
    getOneWhere(whereFn) {
        return this.findOneWhere(whereFn);
    }

    // Get all items that match a WHERE clause
    getWhere(whereFn) {
        return this.findMany(whereFn);
    }

    // Insert an item
    insert(item) {
        this.data.push({ id: this.nextId, ...item });
    }

    // Update an item. Accepts either a new value, or a function that returns a modified value.
    update(id, newValueOrUpdateFn) {
        const item = this.get(id);
        const index = this.data.indexOf(item);
        if (typeof newValueOrUpdateFn === "function") {
            this.data[index] = newValueOrUpdateFn(item);
        } else {
            this.data[index] = { ...item, ...newValueOrUpdateFn };
        }
    }

    // Update all items that match a WHERE clause
    updateWhere(whereFn, newValueOrUpdateFn) {
        const items = this.findWhere(whereFn);
        items.forEach(item => this.update(item.id, newValueOrUpdateFn));
    }

    // Delete an item
    delete(id) {
        const item = this.get(id);
        const index = this.data.indexOf(item);
        this.data.splice(index, 1);
    }

    // Delete all items that match a WHERE clause
    deleteWhere(whereFn) {
        const items = this.findWhere(whereFn);
        items.forEach(item => {
            this.delete(item.id);
        });
    }

    // Delete all items
    clear() {
        this.data = [];
    }

    /* ----- Utility Methods ----- */

    // Get a random item
    random() {
        return this.data[Math.floor(Math.random() * this.data.length)];
    }

    // Get a random item that matches a WHERE clause
    randomWhere(whereFn) {
        const items = this.findWhere(whereFn);
        return items[Math.floor(Math.random() * items.length)];
    }

    // Create a new table by applying a function to each item in the current table
    map(fn) {
        return new Table(this.name, this.data.map(fn));
    }

    // Return an array of mapped values
    mapArray(fn) {
        return this.data.map(fn);
    }

    filter(fn) {
        return new Table(this.name, this.data.filter(fn));
    }

    toString() {
        if (this.isEmpty) {
            return `TABLE ${this.name} (id)`;
        } else {
            const keys = Object.keys(this.data[0]);
            return `TABLE ${this.name} (${keys.join(", ")})`;
        }
    }
}

module.exports = Table;