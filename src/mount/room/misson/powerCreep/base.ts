import { getAllEffects, isOPWR } from "@/mount/powercreep/misson/constant"
import { isInArray } from "@/utils"
/* 超能powercreep相关任务 */
export default class PowerCreepMisson extends Room {
    /* Pc任务管理器 */
    public PowerCreep_TaskManager(): void {
        if (this.controller.level < 7) return
        var storage_ = this.storage
        if (!storage_) return
        var pc = Game.powerCreeps[`${this.name}/queen/${Game.shard.name}`]
        var pcspawn = Game.getObjectById(this.memory.StructureIdData.PowerSpawnID) as StructurePowerSpawn
        if (!pc)
            return
        else {
            /* 看看是否存活，没存活就孵化 */
            if (!pc.ticksToLive && pcspawn) {
                pc.spawn(pcspawn)
                return
            }
        }
        this.enhance_storage()
        this.enhance_lab()
        this.enhance_extension()
        this.enhance_spawn()
        this.enhance_tower()
        this.enhance_source()
        this.enhance_mineral()
        //this.enhance_factory()
        //this.enhance_powerspawn()
    }
    /* 挂载增强storage的任务 适用于queen类型pc */
    public enhance_storage(): void {
        if ((Game.time - global.Gtime[this.name]) % 5) return
        if (this.memory.switch.StopEnhanceStorage) return
        var storage_ = this.storage
        if (!storage_) return
        let pc = Game.powerCreeps[`${this.name}/queen/${Game.shard.name}`]
        if (!pc || !pc.powers[PWR_OPERATE_STORAGE] || pc.powers[PWR_OPERATE_STORAGE].cooldown) return
        if (!storage_.effects) storage_.effects = []
        if ((storage_.store.getFreeCapacity() <= 30000 && !isOPWR(storage_)) || (storage_.store.getUsedCapacity() >= 1000000 && storage_.effects.length && storage_.effects[0].ticksRemaining <= 40) && this.MissionNum('PowerCreep', '仓库扩容') <= 0) {
            /* 发布任务 */
            var thisTask: MissionModel = {
                name: "仓库扩容",
                delayTick: 40,
                range: 'PowerCreep',
            }
            thisTask.CreepBind = { 'queen': { num: 1, bind: [] } }
            this.AddMission(thisTask)
        }
    }

    /* 挂载增强lab的任务 适用于queen类型pc */
    public enhance_lab(): void {
        if ((Game.time - global.Gtime[this.name]) % 10) return
        if (this.memory.switch.StopEnhanceLab) return
        var storage_ = this.storage
        if (!storage_) return
        let pc = Game.powerCreeps[`${this.name}/queen/${Game.shard.name}`]
        if (!pc || !pc.powers[PWR_OPERATE_LAB] || pc.powers[PWR_OPERATE_LAB].cooldown) return
        let disTask = this.MissionName('Room', '资源合成')
        if (!disTask) return
        if (this.MissionNum('PowerCreep', '合成加速') > 0) return
        let list = []
        let comData = []
        for (let bindLab in disTask.LabBind) {
            if (!isInArray([disTask.Data.raw1, disTask.Data.raw2], disTask.LabBind[bindLab])) comData.push(bindLab)
        }
        for (let id of comData) {
            var lab_ = Game.getObjectById(id) as StructureLab
            if (lab_ && !isOPWR(lab_))
                list.push(id)
        }
        if (list.length <= 0) return
        var thisTask: MissionModel = {
            name: "合成加速",
            delayTick: 40,
            range: 'PowerCreep',
            Data: {
                lab: list
            }
        }
        thisTask.CreepBind = { 'queen': { num: 1, bind: [] } }
        this.AddMission(thisTask)
    }
    /* 挂载防御塔任务 适用于queen类型pc 配合主动防御 */
    public enhance_tower(): void {
        if ((Game.time - global.Gtime[this.name]) % 11) return
        if (this.memory.switch.StopEnhanceTower) return
        var storage_ = this.storage
        if (!storage_) return
        let pc = Game.powerCreeps[`${this.name}/queen/${Game.shard.name}`]
        if (!pc || !pc.powers[PWR_OPERATE_TOWER] || pc.powers[PWR_OPERATE_TOWER].cooldown) return
        if (this.MissionNum('PowerCreep', '塔防增强') > 0) return
        if (this.memory.state == 'war' && this.memory.switch.AutoDefend) {
            let towers_list = []
            if (this.memory.StructureIdData.AtowerID.length > 0)
                for (var o of this.memory.StructureIdData.AtowerID) {
                    var otower = Game.getObjectById(o) as StructureTower
                    if (otower && !isOPWR(otower)) {
                        towers_list.push(otower.id)
                    }
                }
            if (towers_list.length <= 0) return
            /* 发布任务 */
            var thisTask: MissionModel = {
                name: "塔防增强",
                delayTick: 40,
                range: 'PowerCreep',
                Data: {
                    tower: towers_list
                }
            }
            thisTask.CreepBind = { 'queen': { num: 1, bind: [] } }
            this.AddMission(thisTask)
        }
    }
    /* 挂载填充拓展任务 适用于queen类型pc */
    public enhance_extension(): void {
        if ((Game.time - global.Gtime[this.name]) % 25) return
        if (this.memory.switch.StopEnhanceExtension) return
        var storage_ = this.storage
        if (!storage_ || storage_.store.getUsedCapacity('energy') < 20000) return
        let pc = Game.powerCreeps[`${this.name}/queen/${Game.shard.name}`]
        if (!pc || !pc.powers[PWR_OPERATE_EXTENSION] || pc.powers[PWR_OPERATE_EXTENSION].cooldown) return
        if (this.energyAvailable < this.energyCapacityAvailable * 0.1 && this.MissionNum('PowerCreep', '扩展填充') <= 0) {
            var thisTask: MissionModel = {
                name: "扩展填充",
                delayTick: 30,
                range: 'PowerCreep',
                Data: {
                }
            }
            thisTask.CreepBind = { 'queen': { num: 1, bind: [] } }
            this.AddMission(thisTask)
        }
    }
    /* 挂载spawn加速任务 适用于queen类型pc */
    public enhance_spawn(): void {
        if ((Game.time - global.Gtime[this.name]) % 13) return
        if (this.memory.switch.StopEnhanceSpawn) return
        var storage_ = this.storage
        if (!storage_) return
        let pc = Game.powerCreeps[`${this.name}/queen/${Game.shard.name}`]
        if (!pc || !pc.powers[PWR_OPERATE_SPAWN] || pc.powers[PWR_OPERATE_SPAWN].cooldown) return
        if (this.MissionNum("PowerCreep", '虫卵强化') > 0) return
        // 在战争时期、对外战争时期，启动
        var ssss = false
        let list = ['攻防一体', '双人小队', '四人小队', '紧急支援']
        for (let i of list) if (this.MissionNum('Creep', i) > 0) ssss = true
        if (this.memory.state == 'war' && this.memory.switch.AutoDefend) ssss = true
        if (ssss) {
            var thisTask: MissionModel = {
                name: "虫卵强化",
                delayTick: 50,
                range: 'PowerCreep',
                Data: {
                }
            }
            thisTask.CreepBind = { 'queen': { num: 1, bind: [] } }
            this.AddMission(thisTask)
        }
    }
    /* 挂载升级工厂任务 适用于queen类型pc */
    public enhance_factory(): void {
        if (this.memory.switch.StopEnhanceFactory) return
        var storage_ = this.storage
        if (!storage_) return
        let pc = Game.powerCreeps[`${this.name}/queen/${Game.shard.name}`]
        if (!pc || !pc.powers[PWR_OPERATE_FACTORY] || pc.powers[PWR_OPERATE_FACTORY].cooldown) return
        if (this.MissionNum("PowerCreep", '工厂合成') > 0) return
        var thisTask: MissionModel = {
            name: "工厂强化",
            delayTick: 50,
            range: 'PowerCreep',
            Data: {
            }
        }
        thisTask.CreepBind = { 'queen': { num: 1, bind: [] } }
        this.AddMission(thisTask)
    }
    /* 挂载powerspawn增强任务 适用于queen类型pc */
    public enhance_powerspawn(): void {
        if (this.memory.switch.StopEnhancePowerSpawn) return
        var storage_ = this.storage
        if (!storage_ || !this.memory.pausePS || (this.memory.energyPS && storage_.store.energy <= 1.2 * this.memory.energyPS)) return
        let pc = Game.powerCreeps[`${this.name}/queen/${Game.shard.name}`]
        if (!pc || !pc.powers[PWR_OPERATE_POWER] || pc.powers[PWR_OPERATE_POWER].cooldown) return
        if (this.MissionNum("PowerCreep", 'power升级') > 0) return
        var thisTask: MissionModel = {
            name: "power强化",
            delayTick: 40,
            range: 'PowerCreep',
            Data: {
            }
        }
        thisTask.CreepBind = { 'queen': { num: 1, bind: [] } }
        this.AddMission(thisTask)
    }
    /* 挂载source增强任务 适用于queen类型pc */
    public enhance_source(): void {
        if ((Game.time - global.Gtime[this.name]) % 14) return
        if (this.memory.switch.StopEnhanceSource) return
        var storage_ = this.storage
        if (!storage_) return
        let pc = Game.powerCreeps[`${this.name}/queen/${Game.shard.name}`]
        if (!pc || !pc.powers[PWR_REGEN_SOURCE] || pc.powers[PWR_REGEN_SOURCE].cooldown) return
        let source_ = [];
        let a: Structure<StructureConstant>;
        for (let o of this.memory.StructureIdData.source) {
            var source = Game.getObjectById(o) as Structure<StructureConstant>
            if (source && !isInArray(getAllEffects(source), PWR_REGEN_SOURCE)) {
                source_.push(source.id)
                continue
            }
            if (!a || (a.effects && a.effects.length && a.effects[0].ticksRemaining > source.effects[0].ticksRemaining)) a = source;
        }
        if (source_.length <= 0 && a) source_.push(a.id)
        if (source_.length <= 0 || this.MissionNum("PowerCreep", 'source强化') > 0) return
        var thisTask: MissionModel = {
            name: "source强化",
            delayTick: 40,
            range: 'PowerCreep',
            Data: {
                source_: source_
            }
        }
        thisTask.CreepBind = { 'queen': { num: 1, bind: [] } }
        this.AddMission(thisTask)
    }
    /* 挂载mineral增强任务 适用于queen类型pc */
    public enhance_mineral(): void {
        if ((Game.time - global.Gtime[this.name]) % 15) return
        if (this.memory.switch.StopEnhanceSource) return
        var storage_ = this.storage
        if (!storage_) return
        let pc = Game.powerCreeps[`${this.name}/queen/${Game.shard.name}`]
        if (!pc || !pc.powers[PWR_REGEN_MINERAL] || pc.powers[PWR_REGEN_MINERAL].cooldown) return
        let mineral_ = Game.getObjectById(this.memory.StructureIdData.mineralID) as Mineral;
        if (!mineral_ || !mineral_.mineralAmount || this.MissionNum("PowerCreep", 'mineral强化') > 0) return
        var thisTask: MissionModel = {
            name: "mineral强化",
            delayTick: 40,
            range: 'PowerCreep',
            Data: {
            }
        }
        thisTask.CreepBind = { 'queen': { num: 1, bind: [] } }
        this.AddMission(thisTask)
    }

}