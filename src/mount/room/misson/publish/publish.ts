import { LabMap } from "@/constant/ResourceConstant"
import { isInArray, zipPosition } from "@/utils"

/* 房间原型拓展   --任务  --任务发布便捷函数 */
export default class RoomMissonPublish extends Room {
    /**
     * 搬运任务发布函数
     * @param creepData 爬虫绑定信息，例如：{'repair':{num:1,bind:[]},'build':{num:2,bind:[]}}
     * @param delayTick 任务的超时时间，如果不想设置超时可以设置为99999 
     * @param sR        提取资源的建筑所在房间
     * @param sX        提取资源的建筑X坐标
     * @param sY        提取资源的建筑Y坐标
     * @param tR        存放资源的建筑所在房间
     * @param tX        存放资源的建筑X坐标
     * @param tY        存放资源的建筑Y坐标
     * @param rType     资源类型[可选] 例如： 'energy' 或者 'XLH2O'等
     * @param num       要搬运的数量[可选]
     * @returns         任务对象
     */
    public public_Carry(creepData: BindData, delayTick: number, sR: string, sX: number, sY: number, tR: string, tX: number, tY: number, rType?: ResourceConstant, num?: number): MissionModel {
        var thisTask: MissionModel =
        {
            name: '物流运输',
            CreepBind: creepData,
            range: 'Creep',
            delayTick: delayTick,
            cooldownTick: 1,
            maxTime: 3,
            Data: {
                sourceRoom: sR,
                sourcePosX: sX,
                sourcePosY: sY,
                targetRoom: tR,
                targetPosX: tX,
                targetPosY: tY,
            }
        }
        if (rType) thisTask.Data.rType = rType
        if (num) thisTask.Data.num = num
        return thisTask
    }

    public public_Carrygleaner(disRoom: string, CreepNum: number, suicide: number, interval: number, level: 'T0' | 'T1' | 'T2' | 'T3' = 'T0'): MissionModel {
        var thisTask: MissionModel =
        {
            name: '拾荒者',
            range: 'Creep',
            delayTick: 99999,
            Data: {
                disRoom: disRoom,
                level: level,
                suicide: suicide
            }
        }
        thisTask.CreepBind = { 'gleaner': { num: CreepNum, interval: interval, bind: [], MSB: (level ? true : false) } }
        switch (level) {
            case 'T3':
                thisTask.LabMessage = { 'XKH2O': 'boost', 'XZHO2': 'boost' }
                break;
            case 'T2':
                thisTask.LabMessage = { 'KH2O': 'boost', 'ZHO2': 'boost' }
                break;
            case 'T1':
                thisTask.LabMessage = { 'KH': 'boost', 'ZO': 'boost' }
                break;
        }
        return thisTask
    }

    public public_Carrymine(disRoom: string, creepNum: number, level?: 'T0' | 'T1'): MissionModel {
        var thisTask: MissionModel =
        {
            name: '外矿偷取',
            range: 'Creep',
            delayTick: 99999,
            maxTime: 3,
            Data: {
                disRoom: disRoom,
            }
        }
        thisTask.CreepBind = { 'steal': { num: creepNum, interval: 1350, bind: [], MSB: (level === 'T1') ? true : false } }
        return thisTask
    }

    public public_Carryshard(disRoom: string, CreepNum: number, shard: shardName, res: ResourceConstant, interval: number, level: 'T0' | 'T1' | 'T11' | 'T2' | 'T3' | 'T9' = 'T0'): MissionModel {
        var thisTask: MissionModel =
        {
            name: '位面运输',
            range: 'Creep',
            delayTick: 99999,
            Data: {
                disRoom: disRoom,
                shard: shard,
                rType: res,
                level: level
            },
            reserve: true
        }
        thisTask.CreepBind = { 'truckshard': { num: CreepNum, interval: interval, bind: [], MSB: (level ? true : false) } }
        switch (level) {
            case 'T9':/*跨位面高净值物品专用*/
                thisTask.LabMessage = { 'XKH2O': 'boost', 'XZHO2': 'boost', 'XGHO2': 'boost', 'XLHO2': 'boost' }
                break;
            case 'T3':
                thisTask.LabMessage = { 'XKH2O': 'boost', 'XZHO2': 'boost' }
                break;
            case 'T2':
                thisTask.LabMessage = { 'KH2O': 'boost', 'ZHO2': 'boost' }
                break;
            case 'T1':
            case 'T11':
                thisTask.LabMessage = { 'KH': 'boost', 'ZO': 'boost' }
                break;
        }
        return thisTask
    }

    /**
     * 修墙任务的发布函数
     * @param Rtype     维修范围： global->全局维修 special->黄黑旗下建筑维修 nuker->核弹防御
     * @param num       任务相关维修爬数量
     * @param boostType boost类型 null->无boost LH/LH2O/XLH2O是boost类型
     * @param level     身体部件 分为 T0 T1 T2
     * @returns         任务对象
     */
    public public_repair(Rtype: 'global' | 'special' | 'nuker', num: number, boostType: ResourceConstant, level?: 'T0' | 'T1' | 'T2' | 'T3' | 'T4', maxhit?: number, retain?: boolean): MissionModel {
        var thisTask: MissionModel = {
            name: '墙体维护',
            range: 'Creep',
            delayTick: 99999,
            level: 10,
            Data: {
                RepairType: Rtype,
                num: num,
                boostType: boostType,
                level: level,
                maxhit: maxhit,
                retain: retain
            },
            maxTime: 3
        }
        thisTask.CreepBind = { 'repair': { num: num, bind: [], MSB: (level ? true : false) } }
        if (boostType == 'LH') {
            thisTask.LabMessage = { 'LH': 'boost' }
        }
        else if (boostType == 'LH2O') {
            thisTask.LabMessage = { 'LH2O': 'boost' }
        }
        else if (boostType == 'XLH2O') {
            thisTask.LabMessage = { 'XLH2O': 'boost' }
        }
        switch (level) {
            case 'T1':
                thisTask.LabMessage['KH'] = 'boost';
                thisTask.LabMessage['ZO'] = 'boost';
                break;
            case 'T2':
                thisTask.LabMessage['KH2O'] = 'boost';
                thisTask.LabMessage['ZHO2'] = 'boost';
                break;
            case 'T3':
                thisTask.LabMessage['XKH2O'] = 'boost';
                thisTask.LabMessage['XZHO2'] = 'boost';
                break;
            case 'T4':
                break;
        }
        thisTask.maxTime = 3
        return thisTask
    }

    /**
     *                  C计划 即占领一个房间开启安全模式，建造wall，保护主房
     * @param disRoom   目标房间
     * @returns         任务对象
     */
    public public_planC(disRoom: string, Cnum: number, upNum: number, shard?: shardName,): MissionModel {
        var thisTask: MissionModel = {
            name: 'C计划',
            range: 'Creep',
            delayTick: 20500,
            level: 10,
            Data: {
                state: 0,
                disRoom: disRoom,
            },
        }
        thisTask.reserve = true
        if (!shard) {
            thisTask.Data.shard = Game.shard.name
            thisTask.CreepBind = { 'cclaim': { num: Cnum, bind: [] }, 'cupgrade': { num: upNum, bind: [] } }
        }
        else {
            thisTask.Data.shard = shard
            thisTask.CreepBind = { 'cclaim': { num: Cnum, bind: [], interval: 1000 }, 'cupgrade': { num: upNum, bind: [], interval: 1000 } }
        }
        return thisTask
    }

    /**
     *                  link传任务发布函数
     * @param structure 传送的link
     * @param dislink   目的link
     * @param level     传送任务等级
     * @param delayTick 过期时间
     * @returns         任务对象
     */
    public public_link(structure: string[], dislink: string, level: number, delayTick?: number): MissionModel {
        var thisTask: MissionModel = {
            name: '链传送能',
            range: 'Structure',
            delayTick: 20,
            structure: structure,
            level: level,
            Data: {
                disStructure: dislink
            }
        }
        if (delayTick) thisTask.delayTick = delayTick
        return thisTask
    }

    /**
     *                  拆迁任务发布函数
     * @param disRoom   目标房间
     * @param num       数量
     * @param interval  时间间隔
     * @param boost     是否boost
     * @returns         任务对象
     */
    public public_dismantle(disRoom: string, shard: shardName, num: number, interval?: number, boost?: boolean): MissionModel {
        var thisTask: MissionModel = {
            name: '黄球拆迁',
            range: 'Creep',
            delayTick: 20500,
            level: 10,
            Data: {
                disRoom: disRoom,
                num: num,
                shard: shard
            },
        }
        thisTask.reserve = true
        if (this.controller.level <= 5) thisTask.Data.boost = false
        if (boost) {
            thisTask.Data.boost = true
            thisTask.LabMessage = { 'XZHO2': 'boost', 'XZH2O': 'boost' }
        }
        thisTask.CreepBind = { 'dismantle': { num: 0, interval: interval ? interval : 1200, bind: [], MSB: (boost ? true : false) } }
        return thisTask
    }

    public public_cconstruction(disRoom: string, disShard: shardName, num: number, interval: number, boost: boolean, bodylevel?: "T0" | "T1" | "T2" | "T3") {
        var thisTask: MissionModel = {
            name: '踩工地',
            range: 'Creep',
            delayTick: 80000,
            level: 10,
            Data: {
                disRoom: disRoom,
                num: num,
                shard: disShard,
            },
            maxTime: 5,
            reserve: true
        }
        if (boost) {
            switch (bodylevel) {

                case 'T3':
                    thisTask.Data.boost = true
                    thisTask.LabMessage = { 'XZHO2': 'boost', 'XGHO2': 'boost', 'XLHO2': 'boost', 'XKHO2': 'boost' }
                    break;
                default:

                    break;
            }
            if (bodylevel) thisTask.Data.bodylevel = bodylevel  // 一体机体型
        }
        else thisTask.Data.boost = false
        thisTask.CreepBind = { 'c-construction-site': { num: 0, interval: interval, bind: [], MSB: (boost ? true : false) } }
        thisTask.reserve = true
        return thisTask
    }

    public public_aio(disRoom: string, disShard: shardName, num: number, interval: number, boost: boolean, bodylevel?: "T0" | "T1" | "T2" | "T9" | "T8") {
        var thisTask: MissionModel = {
            name: '攻防一体',
            range: 'Creep',
            delayTick: 80000,
            level: 10,
            Data: {
                disRoom: disRoom,
                num: num,
                shard: disShard,
            },
            maxTime: 5
        }
        if (boost) {
            switch (bodylevel) {
                case 'T9':
                    break;
                case 'T8':
                    thisTask.Data.boost = true
                    thisTask.LabMessage = { 'ZO': 'boost', 'LO': 'boost', 'KO': 'boost' }
                    break;
                case 'T0':
                    thisTask.Data.boost = true
                    thisTask.LabMessage = { 'XZHO2': 'boost', 'XGHO2': 'boost', 'XLHO2': 'boost', 'XKHO2': 'boost' }
                    break;
                default:
                    thisTask.Data.boost = true
                    thisTask.LabMessage = { 'XZHO2': 'boost', 'XGHO2': 'boost', 'XLHO2': 'boost', 'XKHO2': 'boost' }
                    break;
            }
            if (bodylevel) thisTask.Data.bodylevel = bodylevel  // 一体机体型
        }
        else thisTask.Data.boost = false
        thisTask.CreepBind = { 'aio': { num: 0, interval: interval, bind: [], MSB: (boost ? true : false) } }
        thisTask.reserve = true
        return thisTask
    }

    public public_control(disRoom: string, shard: shardName, interval: number): MissionModel {
        var thisTask: MissionModel = {
            name: '控制攻击',
            range: 'Creep',
            delayTick: 99999,
            level: 10,
            Data: {
                disRoom: disRoom,
                shard: shard,
            },
        }
        thisTask.reserve = true
        thisTask.CreepBind = { 'claim-attack': { num: 1, interval: interval, bind: [] } }
        return thisTask
    }

    /**
     *                  急速冲级任务发布函数
     * @param num       冲级爬数量
     * @param boostType boost类型
     * @returns         任务对象
     */
    public public_quick(num: number, Type: ResourceConstant | null): MissionModel {
        var thisTask: MissionModel = {
            name: '急速冲级',
            range: 'Creep',
            delayTick: 99999,
            level: 10,
            Data: {
            },
            reserve: true
        }
        thisTask.CreepBind = { 'rush': { num: num, bind: [] } }
        if (Type && isInArray(['GH', 'GH2O', 'XGH2O'], Type)) {
            // console.log('极速冲级化合物',)
            thisTask.LabMessage = {}
            thisTask.LabMessage[Type] = 'boost'
        }
        return thisTask
    }

    /**
     *                  普通冲级任务发布函数
     * @param num       冲级爬数量
     * @param boostType boost类型
     * @returns         任务对象
     */
    public public_normal(num: number, boostType: ResourceConstant | null): MissionModel {
        var thisTask: MissionModel = {
            name: '急速冲级',
            range: 'Creep',
            delayTick: 99999,
            level: 10,
            Data: {
            },
        }
        thisTask.CreepBind = { 'rush': { num: num > 2 ? 2 : num, bind: [] } }
        if (boostType && isInArray(['GH', 'GH2O', 'XGH2O'], boostType)) {
            thisTask.LabMessage = { boostType: 'boost' }
        }
        return thisTask
    }

    /**
     * 
     * @param disRoom 目标房间
     * @param shard 目标房间shard
     * @param num  援建工和升级工分别数量
     * @param cnum claimer数量
     * @param defend 是否需要能抵抗一定攻击的能力
     * @returns 任务模型
     */
    public public_expand(disRoom: string, shard: shardName, num: number, cnum: number, level?: string): MissionModel {
        let defend = true;
        var thisTask: MissionModel = {
            name: '扩张援建',
            range: 'Creep',
            delayTick: 99999,
            level: 10,
            maxTime: 2,
            Data: {
                disRoom: disRoom,
                shard: shard,
                defend: defend,
                level: level
            },
        }
        thisTask.reserve = true
        thisTask.CreepBind = {
            'claim': { num: cnum, bind: [], interval: 1000, MSB: defend ? defend : false },
            'Ebuild': { num: num, bind: [], interval: 1000, MSB: defend ? defend : false },
            'Eupgrade': { num: num, bind: [], interval: 1000, MSB: defend ? defend : false }
        }
        if (defend) {
            switch (level) {
                case 'T1':
                    thisTask.LabMessage = { 'GH': 'boost', 'ZO': 'boost' }
                    break;
                case 'T2':
                    thisTask.LabMessage = { 'GH2O': 'boost', 'ZHO2': 'boost' }
                    break;
                case 'T3':
                    thisTask.LabMessage = { 'XGH2O': 'boost', 'XZHO2': 'boost', 'XKH2O': 'boost' }
                    break;
                case 'T4':
                    break;
                case 'T5':
                    thisTask.LabMessage = { 'GH': 'boost', 'ZO': 'boost' }
                    break;
                case 'T6':
                    thisTask.LabMessage = { 'GH2O': 'boost', 'ZHO2': 'boost' }
                    break;
                case 'T7':
                    thisTask.LabMessage = { 'XGH2O': 'boost', 'XZHO2': 'boost', 'XKH2O': 'boost', 'XLHO2': 'boost' }
                    break;
            }
        }
        return thisTask
    }

    public public_helpRepair(disRoom: string, num: number, shard?: string, time?: number, boostType?: ResourceConstant, level?: 'T0' | 'T1' | 'T2' | 'T3' | 'T4'): MissionModel {
        var thisTask: MissionModel = {
            name: '紧急墙体',
            range: 'Creep',
            delayTick: 20000,
            level: 10,
            Data: {
                disRoom: disRoom,
                num: num,
                shard: shard ? shard : Game.shard.name,
                level: level
            },
            maxTime: 2,
            reserve: true
        }
        thisTask.reserve = true
        thisTask.CreepBind = { 'repair-work': { num: num, bind: [], interval: time ? time : 1000, MSB: (level ? true : false) } }
        if (boostType) {
            if (boostType == 'LH') {
                thisTask.LabMessage = { 'LH': 'boost' }
            }
            else if (boostType == 'LH2O') {
                thisTask.LabMessage = { 'LH2O': 'boost' }
            }
            else if (boostType == 'XLH2O') {
                thisTask.LabMessage = { 'XLH2O': 'boost' }
            }
        }
        switch (level) {
            case 'T3':
                thisTask.LabMessage = { 'LH2O': 'boost', 'KH2O': 'boost', 'XZHO2': 'boost' }
                break;
            case 'T4':
                break;
        }
        thisTask.maxTime = 3
        return thisTask
    }

    public public_helpBuild(disRoom: string, num: number, shard?: string, time?: number, defend?: boolean): MissionModel {
        var thisTask: MissionModel = {
            name: '紧急援建',
            range: 'Creep',
            delayTick: 20000,
            level: 10,
            Data: {
                disRoom: disRoom,
                num: num,
                shard: shard ? shard : Game.shard.name,
                defend: defend,
            },
            maxTime: 2,
            reserve: true
        }
        thisTask.reserve = true
        thisTask.CreepBind = {
            'architect': { num: num, bind: [], interval: time ? time : 1000, MSB: (defend ? false : true) },
        }
        if (defend) // 有防备的
        {
            thisTask.LabMessage = { 'XZHO2': 'boost', 'XLH2O': 'boost', 'XLHO2': 'boost', 'XGHO2': 'boost', 'XKH2O': 'boost' }
        } else {
            thisTask.LabMessage = { 'XZHO2': 'boost', 'XLH2O': 'boost', 'XKH2O': 'boost' }
        }

        return thisTask

    }


    public_helpUpgrade(disRoom: string, num: number, shard?: string, time?: number, defend?: boolean): MissionModel {
        var thisTask: MissionModel = {
            name: '紧急升级',
            range: 'Creep',
            delayTick: 20000,
            level: 10,
            Data: {
                disRoom: disRoom,
                num: num,
                shard: shard ? shard : Game.shard.name,
                defend: defend,
            },
            maxTime: 2,
            reserve: true
        }
        thisTask.reserve = true
        thisTask.CreepBind = {
            'upgrade-work': { num: num, bind: [], interval: time ? time : 1000, MSB: (defend ? false : true) },
        }
        if (defend) // 有防备的
        {
            thisTask.LabMessage = { 'XZHO2': 'boost', 'XGH2O': 'boost', 'XLHO2': 'boost', 'XGHO2': 'boost', 'XKH2O': 'boost' }
        } else {
            thisTask.LabMessage = { 'XZHO2': 'boost', 'XGH2O': 'boost', 'XKH2O': 'boost' }
        }

        return thisTask

    }
    public public_support(disRoom: string, sType: 'double' | 'aio', shard: shardName, num: number = 1, boost: boolean): MissionModel {
        var thisTask: MissionModel = {
            name: '紧急支援',
            range: 'Creep',
            delayTick: 20000,
            level: 10,
            Data: {
                disRoom: disRoom,
                sType: sType,
                boost: boost
            },
            maxTime: 3,
        }

        thisTask.reserve = true
        if (sType == 'double') {
            thisTask.CreepBind = { 'double-attack': { num: num, bind: [], interval: 1000 }, 'double-heal': { num: num, bind: [], interval: 1000 } }
            thisTask.LabMessage = { 'XUH2O': 'boost', 'XLHO2': 'boost', 'XZHO2': 'boost', 'XGHO2': 'boost', 'XKHO2': 'boost' }
        }
        else if (sType == 'aio') {
            thisTask.CreepBind = { 'saio': { num: num, bind: [], interval: 1000 } }
            thisTask.LabMessage = { 'XLHO2': 'boost', 'XZHO2': 'boost', 'XGHO2': 'boost', 'XKHO2': 'boost' }
        }
        if (shard) thisTask.Data.shard = shard
        else thisTask.Data.shard = Game.shard.name
        return thisTask
    }

    /* 双人小队发布函数 */
    public public_Double(disRoom: string, shard: shardName, CreepNum: number, cType: 'dismantle' | 'attack', interval: number): MissionModel {
        var thisTask: MissionModel = {
            name: '双人小队',
            range: 'Creep',
            delayTick: 20000,
            level: 10,
            Data: {
                disRoom: disRoom,
                shard: shard,
                teamType: cType,
                num: CreepNum
            },
            reserve: true
        }
        if (!interval || interval < 100) return null
        if (cType == 'dismantle') {
            thisTask.CreepBind = { 'double-dismantle': { num: CreepNum, bind: [], interval: interval }, 'double-heal': { num: CreepNum, bind: [], interval: interval } }
            thisTask.LabMessage = { 'XZHO2': 'boost', 'XZH2O': 'boost', 'XGHO2': 'boost', 'XLHO2': 'boost', 'XKHO2': 'boost' }
        }
        else {
            thisTask.CreepBind = { 'double-attack': { num: CreepNum, bind: [], interval: interval }, 'double-heal': { num: CreepNum, bind: [], interval: interval } }
            thisTask.LabMessage = { 'XUH2O': 'boost', 'XZHO2': 'boost', 'XGHO2': 'boost', 'XLHO2': 'boost', 'XKHO2': 'boost' }
        }
        return thisTask
    }

    public public_Sign(disRoom: string, shard: string, str: string): MissionModel {
        var thisTask: MissionModel = {
            name: '房间签名',
            range: 'Creep',
            delayTick: 1600,
            level: 10,
            Data: {
                disRoom: disRoom,    // 目标房间
                shard: shard,    // 目标shard
                str: str,    // 签名内容
            },
            maxTime: 2       // 最大同时任务数量
        }
        thisTask.CreepBind = { 'scout': { num: 1, bind: [] } }
        return thisTask
    }

    /* 资源传送任务发布函数 */
    public public_Send(disRoom: string, rType: ResourceConstant, num: number): MissionModel {
        if (!this.memory.StructureIdData.terminalID) return null
        var terminal = this.terminal as StructureTerminal
        if (!terminal) {
            delete this.memory.StructureIdData.terminalID
            return null
        }
        var thisTask: MissionModel = {
            name: '资源传送',
            range: 'Structure',
            delayTick: 2500,
            structure: [terminal.id],
            level: 5,
            Data: {
                disRoom: disRoom,
                rType: rType,
                num: num
            },
            maxTime: 8
        }
        return thisTask
    }

    /**
     *  资源购买任务发布函数 做多同时允许3个
     * @param res   要购买的资源
     * @param num   要购买的数量
     * @param range 价格波动可接受区间
     * @param max   最高接受的价格
     * @returns     任务对象
     */
    public public_Buy(res: ResourceConstant, num: number, range: number, max?: number): MissionModel {
        if (!this.memory.StructureIdData.terminalID) return null
        var terminal = this.terminal as StructureTerminal
        if (!terminal) {
            delete this.memory.StructureIdData.terminalID
            return null
        }
        /* 开始进行任务 */
        var thisTask: MissionModel = {
            name: '资源购买',
            range: 'Structure',
            structure: [terminal.id],
            delayTick: 60,
            level: 10,
            maxTime: 3,
            Data: {
                rType: res,
                num: num,
                range: range
            }
        }
        thisTask.Data.maxPrice = max ? max : 35
        return thisTask
    }

    public public_Compound(num: number, disResource: ResourceConstant, bindData?: string[]): MissionModel {
        // 检验阶段
        if (!this.memory.StructureIdData.labInspect || Object.keys(this.memory.StructureIdData.labInspect).length < 3) return null
        var raw1 = Game.getObjectById(this.memory.StructureIdData.labInspect.raw1) as StructureLab
        var raw2 = Game.getObjectById(this.memory.StructureIdData.labInspect.raw2) as StructureLab
        if (!raw1) { delete this.memory.StructureIdData.labInspect.raw1; return }
        if (!raw2) { delete this.memory.StructureIdData.labInspect.raw2; return }
        for (var i of this.memory.StructureIdData.labInspect.com) {
            var thisLab = Game.getObjectById(i) as StructureLab
            if (!thisLab) {
                var index = this.memory.StructureIdData.labInspect.com.indexOf(i)
                this.memory.StructureIdData.labInspect.com.splice(index, 1)
                continue
            }
        }
        var raw1str = LabMap[disResource].raw1
        var raw2str = LabMap[disResource].raw2
        /* 开始进行任务 */
        var thisTask: MissionModel = {
            name: '资源合成',
            range: 'Room',
            delayTick: 50000,
            processing: true,
            level: 10,
            LabBind: {
            },
            Data: {
                num: num
            }
        }
        thisTask.LabMessage = {}
        thisTask.LabMessage[raw1str] = 'raw'
        thisTask.LabMessage[raw2str] = 'raw'
        thisTask.LabMessage[disResource] = 'com'
        thisTask.Data.raw1 = raw1str
        thisTask.Data.raw2 = raw2str
        return thisTask
    }

    /* 外矿开采任务发布函数 */
    public public_OutMine(sourceRoom: string, x: number, y: number, disRoom: string, central: boolean): MissionModel {
        var pos = new RoomPosition(x, y, sourceRoom)
        if (!this.storage) return null
        if (!pos) return null
        // 检查是否已经存在重复任务了
        for (var i of this.memory.Misson['Creep']) {
            if (i.name == '外矿开采' && i.Data.disRoom == disRoom)
                return null
        }
        var thisTask: MissionModel = {
            name: '外矿开采',
            range: 'Creep',
            delayTick: 99999,
            level: 10,
            Data: {
                disRoom: disRoom,
                central: central? central : false,
                startpoint: zipPosition(pos)
            },
        }
        thisTask.CreepBind = { 'out-claim': { num: 0, bind: [] }, 'out-harvest': { num: 0, bind: [] }, 'out-car': { num: 0, bind: [] }, 'out-defend': { num: 0, bind: [] }, 'out-attack': { num: 0, bind: [] }, 'out-carry': { num: 0, bind: [] } }
        return thisTask
    }

    /* power采集任务发布函数 */
    public public_PowerHarvest(disRoom: string, x: number, y: number, num: number): MissionModel {
        var thisTask: MissionModel = {
            name: 'power采集',
            range: 'Creep',
            delayTick: 5000,
            level: 10,
            Data: {
                room: disRoom,
                x: x,
                y: y,
                state: 1,
                num: num,
                Cnum: Math.ceil(num / 1600)
            },
            maxTime: 2,
        }
        thisTask.CreepBind = { 'power-attack': { num: 1, bind: [] }, 'power-heal': { num: 1, bind: [] }, 'power-carry': { num: 0, bind: [] } }
        return thisTask
    }

    /* deposit采集任务发布函数 */
    public public_DepositHarvest(disRoom: string, x: number, y: number, rType: DepositConstant, Num: number = 1): MissionModel {
        var thisTask: MissionModel = {
            name: 'deposit采集',
            range: 'Creep',
            delayTick: 10000,
            level: 10,
            Data: {
                room: disRoom,
                x: x,
                y: y,
                state: 1,
                rType: rType
            },
            maxTime: 2,
            reserve: true
        }
        // thisTask.CreepBind = { 'deposit': { num: 1, bind: [] } }
        thisTask.CreepBind = { 'deposit-harvest': { num: Num > 3 ? 3 : Num, bind: [] }, 'deposit-transfer': { num: 1, bind: [] } }
        // var MissonNum = this.MissionNum('Creep','deposit采集')
        // if (MissonNum > 2) return null
        // thisTask.maxTime = MissonNum
        return thisTask
    }

    /* 红球防御任务发布函数 */
    public public_red_defend(num: number): MissionModel {
        if (num < 1) return null;
        var thisTask: MissionModel = {
            name: '红球防御',
            range: 'Creep',
            delayTick: 99999,
            reserve: false,
            level: 10,
            Data: {},
        }
        var comList = ['XZHO2', 'XUH2O']
        thisTask.CreepBind = {}
        thisTask.CreepBind['defend-attack'] = { num: num, bind: [] }
        thisTask.LabMessage = { 'XZHO2': 'boost', 'XUH2O': 'boost' }
        return thisTask
    }

    /* 蓝球防御任务发布函数 */
    public public_blue_defend(num: number): MissionModel {
        if (num < 1) return null;
        var thisTask: MissionModel = {
            name: '蓝球防御',
            range: 'Creep',
            delayTick: 99999,
            reserve: false,
            level: 10,
            Data: {}
        }
        var comList = ['XZHO2', 'XKHO2']
        thisTask.CreepBind = {}
        thisTask.CreepBind['defend-range'] = { num: num, bind: [] }

        thisTask.LabMessage = { 'XZHO2': 'boost', 'XKHO2': 'boost' }

        return thisTask
    }

    /* 双人小队防御任务发布函数 */
    public public_double_defend(num: number): MissionModel {
        if (num < 1) return null;
        var thisTask: MissionModel = {
            name: '双人防御',
            range: 'Creep',
            delayTick: 99999,
            reserve: false,
            level: 10,
            Data: {}
        }
        var comList = ['XZHO2', 'XLHO2', 'XUH2O', 'XGHO2']
        thisTask.CreepBind = {}
        thisTask.CreepBind['defend-douAttack'] = { num: num, bind: [] }
        thisTask.CreepBind['defend-douHeal'] = { num: num, bind: [] }

        thisTask.LabMessage = { 'XZHO2': 'boost', 'XUH2O': 'boost', 'XLHO2': 'boost', 'XGHO2': 'boost' }

        return thisTask
    }

    /* 四人小队任务发布函数 */
    public public_squad(disRoom: string, shard: shardName, interval: number, RNum: number, ANum: number, DNum: number, HNum: number, AIONum: number, flag: string): MissionModel {
        var thisTask: MissionModel = {
            name: '四人小队',
            range: 'Creep',
            delayTick: 40000,
            level: 10,
            Data: {
                disRoom: disRoom,
                shard: shard,
                flag: flag
            },
            CreepBind: {},
            maxTime: 3,
            reserve: true
        }
        if (RNum + ANum + DNum + HNum + AIONum != 4) return null    // 防止数量不对
        if (HNum != 2 && AIONum != 4) return null   // 防止搭配不均
        let creepData = {
            'x-range': { num: RNum, bd: ['XZHO2', 'XLHO2', 'XKHO2', 'XGHO2'] },
            'x-heal': { num: HNum, bd: ['XZHO2', 'XLHO2', 'XKHO2', 'XGHO2'] },
            'x-aio': { num: AIONum, bd: ['XZHO2', 'XLHO2', 'XKHO2', 'XGHO2'] },
            'x-attack': { num: ANum, bd: ['XZHO2', 'XUH2O', 'XGHO2'] },
            'x-dismantle': { num: DNum, bd: ['XZHO2', 'XZH2O', 'XGHO2'] },
        }
        let tbd = []
        for (var i in creepData) {
            if (creepData[i].num > 0) {
                thisTask.CreepBind[i] = { num: creepData[i].num, bind: [], interval: interval }
                for (var j of creepData[i].bd) {
                    if (!isInArray(tbd, j)) tbd.push(j)
                }
            }
        }

        let mes: LabMessageData = {}
        for (let tbdRes of tbd) {
            mes[tbdRes] = 'boost'
        }

        thisTask.LabMessage = mes
        return thisTask
    }


    /* 资源转移任务发布函数 */
    public public_resource_transfer(disRoom: string, resource?: ResourceConstant, num?: number, whitelist?: ResourceConstant[]): MissionModel {
        var thisTask: MissionModel = {
            name: '资源转移',
            range: 'Room',
            delayTick: 40000,
            level: 10,
            Data: {
                disRoom: disRoom,
                rType: resource ? resource : null,
                num: num ? num : 8000000,
                whitelist: whitelist ? whitelist : []
            },
            maxTime: 1,
        }
        return thisTask
    }

    /* 资源链任务发布函数 */

    /**
     * 智能战争发布引擎
     * @param disRoom 目标房间
     * @param shard 目标房间shard
     * @param boost  是否进行boost
     * @returns 任务模型
     */
    public public_Aidestroy(disRoom: string, shard: shardName, boost?: boolean, bodylevel?: "T0" | "T1" | "T2" | "T3"): MissionModel {
        var thisTask: MissionModel = {
            name: '智能战争',
            range: 'Room',
            delayTick: 99999,
            level: 10,
            Data: {
                disRoom: disRoom,
                shard: shard
            },
        }
        if (boost) {
            thisTask.Data.boost = boost;
        }
        if (bodylevel) {
            thisTask.Data.bodylevel = bodylevel;
        }
        // thisTask.reserve = true
        // thisTask.CreepBind = { 'ai-sentry': { num: 1, interval: 1000, bind: [] } }
        // thisTask.LabMessage = { 'XZHO2': 'boost', 'XLHO2': 'boost', 'XGHO2': 'boost' }
        return thisTask
    }
}