class Queue {
    constructor() {
        this.items = [];
    }

    // Add an element to the end of the queue
    enqueue(element) {
        this.items.push(element);
    }

    // Remove an element from the front of the queue
    dequeue() {
        if(this.isEmpty())
            throw new Error("Underflow - Queue is empty");
        return this.items.shift();
    }

    // Check the element at the front of the queue
    front() {
        if(this.isEmpty())
            throw new Error("No elements in Queue");
        return this.items[0];
    }

    // Check if the queue is empty
    isEmpty() {
        return this.items.length == 0;
    }

    // Print the elements in the queue
    printQueue() {
        let str = "";
        for(let i = 0; i < this.items.length; i++)
            str += this.items[i] +" ";
        return str;
    }
}

export default Queue;