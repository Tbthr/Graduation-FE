declare interface NodeInfo{
    state: 'follower' | 'leader' | 'candidate',
    runState: 'run' | 'stop',
    clientId:string,
    currentTerm:number,
    ipPort:string,
    voteFor:string,
    commitIndex:number,
    lastApplied:number
}

declare interface LogInfo{
    commitState:boolean,
    index:number,
    term:number,
    setX:number,
}