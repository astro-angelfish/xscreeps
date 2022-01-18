import { compare, isInArray } from "@/utils"

export default class linkExtension extends StructureLink {
    public ManageMission():void{
        if (!this.room.memory.Misson['Structure']) this.room.memory.Misson['Structure'] = []
        var allmyTask = []
        for (var task of this.room.memory.Misson['Structure'])
        {
            if (!task.structure) continue
            if (isInArray(task.structure,this.id))
            {
                allmyTask.push(task)
            }
        }
        /* 按照优先级排序 */
        if (allmyTask.length <= 0) return
        else if (allmyTask.length >= 1)
            allmyTask.sort(compare('level'))
        /* 处理任务 */
        let thisTask = allmyTask[0]
        if (thisTask.delayTick < 99995)
            thisTask.delayTick--
        switch (thisTask.name){
            case "链传送能":{this.Handle_Link(thisTask);break}
        }
    }


    /* 链传送能 */
    public Handle_Link(task:MissionModel):void{
        if (this.cooldown && this.cooldown > 0) return
        /* 执行任务 */
        if (!task.Data || !task.Data.disStructure)
        {
            this.room.DeleteMission(task.id)
        }
        if (this.store.getUsedCapacity('energy') <= 0)
        {
            return
        }
        var dis = Game.getObjectById(task.Data.disStructure) as StructureLink
        if (!dis || dis.store.getUsedCapacity('energy') >= 790)
        {
            /* 如果未找到link 或者 对方link满了，就删除任务 */
            this.room.DeleteMission(task.id)
            return
        }
        /* 传完就删除任务 */
        this.transferEnergy(dis)
        this.room.DeleteMission(task.id)
    }
}