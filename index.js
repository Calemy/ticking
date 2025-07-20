const EventEmitter = require("node:events")

module.exports = class Ticker{
    #emitter = new EventEmitter()
    #interval;
    #userInterval;
    constructor(interval) {
        this.#userInterval = interval || 0;
    }

    start(){
        if(!this.#userInterval){
            throw "Please provide an interval in ms"
        }
        this.#interval = setInterval(() => this.#emitter.emit("tick"), this.#userInterval)
        this.#emitter.emit("start")
    }

    nextTick(){
        return new Promise((resolve) => {
            if(!this.#interval) return resolve();
            this.#emitter.once("tick", () => resolve())
        })
    }

    stop(){
        clearInterval(this.#interval)
        this.#interval = undefined;
        this.#emitter.emit("stop")
    }

    on(event, listener){
        this.#emitter.on(event, listener)
        return this;
    }
}