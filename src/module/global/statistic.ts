import { AppLifecycleCallbacks } from "../framework/types"
/**
 * 统计所有爬虫归属，统计数目 【已测试】
 */
export function CreepNumStatistic(): void {
    if (!global.CreepNumData) global.CreepNumData = {}
    for (let roomName in Memory.RoomControlData) {
        if (Game.rooms[roomName] && !global.CreepNumData[roomName]) global.CreepNumData[roomName] = {}
        if (global.CreepNumData[roomName]) {
            /* 所有角色数量归零 从0开始统计 */
            for (let roleName in global.CreepNumData[roomName])
                global.CreepNumData[roomName][roleName] = 0
        }
    }
    /* 计算爬虫 */
    let shard = Game.shard.name
    for (let c in Memory.creeps) {
        let creep_ = Game.creeps[c]
        /* 代表爬虫死亡或进入星门，清除记忆 */
        if (!creep_) {
            // if (Game.rooms[Memory.creeps[c].belong].memory.enemy && Game.rooms[Memory.creeps[c].belong].memory.enemy[c]) {
            //     delete Game.rooms[Memory.creeps[c].belong].memory.enemy[c];
            // }
            delete Memory.creeps[c]
            if (Memory.creepscpu[c]) { delete Memory.creepscpu[c] }

            //console.log(`爬虫${c}的记忆已被清除！`)
            continue
        }
        /* 代表爬虫没记忆或刚出星门  */
        if (!creep_.memory.role) continue
        /* 代表爬虫是其他shard的来客 */
        if (creep_.memory.shard != shard) continue
        /* 代表爬虫所属房间已经没了 */
        if (!Game.rooms[creep_.memory.belong]) continue
        if (!global.CreepNumData[creep_.memory.belong][creep_.memory.role])
            global.CreepNumData[creep_.memory.belong][creep_.memory.role] = 0
        /* 添加统计数目 */
        if (["carry", "harvest", "out-car", "manage", "initial_speed"].includes(creep_.memory.role)) {
            if (Object.keys(creep_.body).length * 3 >= creep_.ticksToLive) continue;
        }
        global.CreepNumData[creep_.memory.belong][creep_.memory.role] += 1
    }
    /*进行ob数据超时回收*/
    if (!(Game.time % 100)) {
        for (let _ob in Memory.ObserverList) {
            if (Game.time - 5000 > Memory.ObserverList[_ob]) {
                delete Memory.ObserverList[_ob];
            }
        }
        for (let _ob in Memory.Findrouteroom) {
            if (Game.time - 5000 > Memory.Findrouteroom[_ob].t) {
                delete Memory.Findrouteroom[_ob];
            }
        }
        for (let _creeps in Memory.creepscpu) {
            if (!Game.creeps[_creeps]) delete Memory.creepscpu[_creeps];
        }
    }
}

export const creepRecycleAndStatistic: AppLifecycleCallbacks = {
    tickStart: CreepNumStatistic
}