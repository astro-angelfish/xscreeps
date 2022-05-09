/* 爬虫移动相关 */
interface Creep {
    // 标准化地址，例如：E44S49/24/32/shard3
    standardizePos(pos: RoomPosition): string | null
    // 寻找不允许对穿的爬虫的位置
    getStandedPos(): RoomPosition[]
    // 通用寻路
    findPath(target:RoomPosition,range:number,ops?:number):string|null
    // 使用压缩数据移动
    goByPath(): CreepMoveReturnCode | ERR_NO_PATH | ERR_NOT_IN_RANGE | ERR_INVALID_TARGET
    // 通用移动
    goTo(target:RoomPosition,range:number,ops?:number):CreepMoveReturnCode | ERR_NO_PATH | ERR_NOT_IN_RANGE | ERR_INVALID_TARGET
    // 请求对穿
    requestCross(direction: DirectionConstant): OK | ERR_BUSY | ERR_NOT_FOUND
    // 处理对穿
    manageCross(direction: DirectionConstant, crossLevel: number): boolean
    // 单位移动
    go(direction: DirectionConstant): CreepMoveReturnCode | ERR_INVALID_TARGET
    // 跨shard移动
    arriveTo(target: RoomPosition, range: number, shard: shardName, shardData?: shardRoomData[]): void
    updateShardAffirm(): void
    serializeFarPath(positions: RoomPosition[]): string
    goTo_defend(target: RoomPosition, range: number): CreepMoveReturnCode | ERR_NO_PATH | ERR_NOT_IN_RANGE | ERR_INVALID_TARGET
    findPath_defend(target: RoomPosition, range: number): string | null
    // 逃离移动
    Flee(target: RoomPosition, range: number): void
    // 战争相关移动
    findPath_aio(target: RoomPosition, range: number): string | null
    goTo_aio(target: RoomPosition, range: number): CreepMoveReturnCode | ERR_NO_PATH | ERR_NOT_IN_RANGE | ERR_INVALID_TARGET
}

/* 爬虫移动记忆 */
interface CreepMemory {
    // 爬虫移动数据
    moveData?: {
        // 序列化之后的路径信息
        path?: string
        // 移动索引，标志 creep 现在走到的第几个位置
        index?: number
        // 上一个位置信息，形如"14/4"，用于在 creep.move 返回 OK 时检查有没有撞墙
        prePos?: string
        // 所在shard
        shard?: string
        // 缓存路径的目标，该目标发生变化时刷新路径, 形如"14/4E14S1"
        targetPos?: string
    }
    // 爬虫绕过房间列表
    bypassRooms?: string[]
    // 对穿等级
    crossLevel?: number
    // 目标shard
    targetShard?: string
    // 跨shard穿过的portalRoom
    protalRoom?: string
    // 不允许对穿
    standed?: boolean
    // 爬虫上一个tick所在的位置
    prePos?: string
    // 禁用自己对穿
    disableCross?: boolean
    // 跨多个shard数据
    shardAffirm?: shardAffirmData[]
}

type shardName = "shard0" | "shard1" | "shard2" | "shard3"

interface shardRoomData {
    shard: shardName,    // 星门所在shard
    roomName: string,        // 星门所处的房间
    disShardName?: shardName,
    x: number,
    y: number
}

interface shardAffirmData {
    shardName: shardName,    // 星门所在shard
    disShardName: shardName  // 星门通向shard
    roomName: string,        // 星门所处的房间
    disRoomName: string,     // 星门通向的房间
    affirm: boolean,
    x: number,
    y: number
}