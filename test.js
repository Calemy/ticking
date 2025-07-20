const Ticker = require(".")

//Create ticker with ticking every 15ms
const ticker = new Ticker(15)

//Listening to events here
ticker.on("start", () => console.log("Ticker 1: started"))
.on("tick", () => console.log("Ticker 1: ticked"))
.on("stop", () => console.log("Ticker 1: stopped"))

//Starting the ticker
ticker.start()

//Waiting for the next tick
ticker.nextTick().then(() => {
    console.log(`Ticker 1: called nextTick`)

    //Create a second ticker ticking every 30ms
    const ticker2 = new Ticker(30)

    //Only attaching the tick event here
    ticker2.on("tick", () => console.log("Ticker 2: ticked"))

    //Starting the second ticker
    ticker2.start()

    ticker2.nextTick().then(() => {
        //Killing both tickers and log to the console
        ticker.stop()
        ticker2.stop()

        console.log("Ticker 2: called nextTick, killing Ticker 1 and Ticker 2")
    })
})
//If a ticker still runs, the program won't exit