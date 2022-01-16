/* 房间原型拓展   --任务  --运输工任务 */
export default class RoomMissonTransportExtension extends Room {
    // 虫卵填充任务
    public Spawn_Feed():void{
    /* 每11 tick 观察一次 */
        if (Game.time % 10) return
        if (!this.memory.StructureIdData.storageID) return
        if (this.RoleMissionNum('transport','虫卵填充') < 1)
        {
            let thisPos = new RoomPosition(Memory.RoomControlData[this.name].center[0],Memory.RoomControlData[this.name].center[1],this.name)
            let emptyExtensions = thisPos.findClosestByRange(FIND_MY_STRUCTURES,{filter:(structure)=>{
                return (structure.structureType == 'spawn' || structure.structureType == 'extension') && structure.store.getFreeCapacity('energy') > 0
            }})
            if (emptyExtensions)
            {
            /* 满足条件则触发虫卵填充任务 */
                var thisMisson:MissionModel = {
                name: "虫卵填充",
                range:"Creep",
                delayTick:50,
                cooldownTick:4,
                CreepBind:{'transport':{num:2,bind:[]}},
                Data:{}
                }
                this.AddMission(thisMisson)
            }
        }
    }

    // 防御塔填充任务
    public Tower_Feed():void{
        if (Game.shard.name == 'shard3')
        {
            if (Game.time % 15) return
        }
        else
        {
            if (Game.time % 5) return
        }
        if (this.controller.level < 5 || !this.memory.StructureIdData.storageID) return
        for (let id of this.memory.StructureIdData.AtowerID)
        {
            let tower = Game.getObjectById(id) as StructureTower
            if (!tower)
            {
                let index = this.memory.StructureIdData.AtowerID.indexOf(id)
                this.memory.StructureIdData.AtowerID.splice(index,1)
            }
            if (tower.store.getUsedCapacity('energy') < 500)
            {
                /* 下达搬运任务搬运 */
                let storage_ = Game.getObjectById(this.memory.StructureIdData.storageID) as StructureStorage
                if (!storage_) return
                if (storage_.store.getUsedCapacity('energy') < 1000)return
                let thisTask = this.Public_Carry({'transport':{num:2,bind:[]}},25,this.name,storage_.pos.x,storage_.pos.y,this.name,tower.pos.x,tower.pos.y,'energy',1000 - tower.store.getUsedCapacity('energy'))
                this.AddMission(thisTask)
                return
            }
        }
    }

    // 实验室能量填充任务 [包含多余物回收]
    public Lab_Feed():void{
        if ((global.Gtime[this.name]- Game.time) % 13) return
        if (!this.memory.StructureIdData.storageID) return
        if (!this.memory.StructureIdData.labs || this.memory.StructureIdData.labs.length <= 0)return
        if (this.RoleMissionNum('transport','物流运输') >= 1) return
        for (var id of this.memory.StructureIdData.labs)
        {
            var thisLab = Game.getObjectById(id) as StructureLab
            if (!thisLab)
            {
                var index = this.memory.StructureIdData.labs.indexOf(id)
                this.memory.StructureIdData.labs.splice(index,1)
                continue
            }
            if (thisLab.store.getUsedCapacity('energy') <= 800)
            {
                /* 下布搬运命令 */
                var storage_ = Game.getObjectById(this.memory.StructureIdData.storageID) as StructureStorage
                if (!storage_) return
                if (storage_.store.getUsedCapacity('energy') < 10000)return
                var thisTask = this.Public_Carry({'transport':{num:1,bind:[]}},25,this.name,storage_.pos.x,storage_.pos.y,this.name,thisLab.pos.x,thisLab.pos.y,'energy',2000 - thisLab.store.getUsedCapacity('energy'))
                this.AddMission(thisTask)
                return
            }
            /* 如果该实验室不在绑定状态却有多余资源 */
            if (!this.memory.RoomLabBind[id] && thisLab.mineralType)
            {
                var storage_ = Game.getObjectById(this.memory.StructureIdData.storageID) as StructureStorage
                if (!storage_) return
                var thisTask = this.Public_Carry({'transport':{num:1,bind:[]}},25,this.name,thisLab.pos.x,thisLab.pos.y,this.name,storage_.pos.x,storage_.pos.y,thisLab.mineralType,thisLab.store.getUsedCapacity(thisLab.mineralType))
                this.AddMission(thisTask)
                return
            }
        }
    }

    // 核弹填充任务
    public Nuker_Feed():void{
        
    }

    // 
}
