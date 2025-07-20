# ticking

a simple tick manager inspired by golang's time.Tick making limiting parallelism less stressful.
<br>
Easy to use with mondern async/await syntax

## How to use it

#### Create a ticker

```js
const Ticker = require("ticking")

//or if you are on ESM
import Ticker from "ticking"

const ticker = new Ticker(100) //You have to provide the interval in here
```

#### Start the ticker

The ticker has to be started by the user for event reasons.
<br>
Starting a ticker without an interval set will throw an error.

```js
ticker.start() //This now sends a tick event every x milliseconds
```

#### Wait for the next tick

To wait for the next tick simply use the built-in function.

```js
ticker.nextTick().then(() => {
    //implement logic here
})

//or if you use async/await

await ticker.nextTick()
//implement your logic here
```

#### Stop the ticker

The ticker can be stopped easily at any time.

```js
ticker.stop()

//you can even start the ticker again by recalling ticker.start()
```

#### Events
I understand that you might not want to repeat waiting for every tick or want to handle scenarios where you start/stop the ticker.

```js
ticker.on("start", () => console.log("Started")) //This has to be set before calling ticker.start()
ticker.on("tick", () => console.log("Ticked"))
ticker.on("stop", () => console.log("Stopped"))
```


#### Example

I'm going to be creating 2 tickers using ESM with async/await

```js
import Ticker from "ticking"

//Create ticker with ticking every 15ms
const ticker = new Ticker(15)

//Listening to events here
ticker.on("start", () => console.log("Ticker 1: started"))
.on("tick", () => console.log("Ticker 1: ticked"))
.on("stop", () => console.log("Ticker 1: stopped"))

//Starting the ticker
ticker.start()

//Waiting for the next tick
await ticker.nextTick()
console.log(`Ticker 1: called nextTick`)

//Create a second ticker ticking every 30ms
const ticker2 = new Ticker(30)

//Only attaching the tick event here
ticker2.on("tick", () => console.log("Ticker 2: ticked"))

//Starting the second ticker
ticker2.start()
await ticker2.nextTick()

//Killing both tickers and log to the console
ticker.stop()
ticker2.stop()

console.log("Ticker 2: called nextTick, killing Ticker 1 and Ticker 2")
//If a ticker still runs, the program won't exit
```

#### Tips

This is awesome for ratelimiting when using parallelism.
<br>
If you want to change the interval, please create a new timer instead. This behaviour might change in the future.


#### Last words

As you can see, it's very easy to use, lightweight and offers a new way to deal with parallelism without the headache.
<br>
If you can agree with me on the above, consider leaving a star on the repository.