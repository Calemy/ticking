declare class Ticker {
    constructor(interval: number);
    
    start(): void;

    nextTick(): Promise<void>;

    stop(): void;

    on(event: "start" | "tick" | "stop", listener: (...args: any[]) => void): Ticker
}

export = Ticker;