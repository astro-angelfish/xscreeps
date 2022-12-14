import { GenerateAbility, generateID } from "@/utils"

/* 房间原型拓展   --任务  --常规战争 */
export default class NormalWarExtension extends Room {
    // 拆迁黄球
    public Task_dismantle(mission: MissionModel): void {
        if ((Game.time - global.Gtime[this.name]) % 10) return
        if (mission.Data.boost) {
            // 体型
            global.MSB[mission.id] = { 'dismantle': GenerateAbility(40, 0, 10, 0, 0, 0, 0, 0) }
            // boost lab填充检查
            if (!this.Check_Lab(mission, 'transport', 'complex')) return
        }
        /* 数量投放 */
        if (mission.CreepBind['dismantle'].num == 0)
            mission.CreepBind['dismantle'].num = mission.Data.num
    }
    public Task_CConstruction(mission: MissionModel): void {
        if (mission.Data.boost) {
            // 体型
            let bodylevel = mission.Data.bodylevel
            switch (bodylevel) {
                case 'T3':
                    // 高级奶妈
                    global.MSB[mission.id] = { 'c-construction-site': GenerateAbility(0, 0, 10, 0, 1, 27, 0, 12) }
                    break;
                default:
                    // 默认不处理的
                    global.MSB[mission.id] = { 'c-construction-site': GenerateAbility(0, 0, 1, 0, 0, 0, 0, 0) }
                    break;

            }
            if ((Game.time - global.Gtime[this.name]) % 10) return
            // boost lab填充检查
            if (!this.Check_Lab(mission, 'transport', 'complex')) return
        }
        else {
            if ((Game.time - global.Gtime[this.name]) % 10) return
        }
        if (mission.CreepBind['c-construction-site'].num == 0)
            mission.CreepBind['c-construction-site'].num = mission.Data.num
    }

    // 一体机
    public Task_aio(mission: MissionModel): void {
        if (mission.Data.boost) {
            // 体型
            let bodylevel = mission.Data.bodylevel
            switch (bodylevel) {
                case 'T9':
                    global.MSB[mission.id] = { 'aio': GenerateAbility(0, 0, 10, 0, 15, 20, 0, 5) }
                    break;
                case 'T8':
                    /*过道清理员 -T1化合物*/
                    global.MSB[mission.id] = { 'aio': GenerateAbility(0, 0, 17, 0, 18, 15, 0, 0) }
                    break;
                case 'T2':
                    // 不可以防御6塔的体型，适合清理七级以内新手房
                    global.MSB[mission.id] = { 'aio': GenerateAbility(0, 0, 10, 0, 15, 20, 0, 5) }
                    break;
                case 'T1':
                    // 可以防御距离适中的六塔，适合骑墙
                    global.MSB[mission.id] = { 'aio': GenerateAbility(0, 0, 10, 0, 11, 20, 0, 9) }
                    break;
                case 'T0':
                    // 最高防御单位
                    global.MSB[mission.id] = { 'aio': GenerateAbility(0, 0, 10, 0, 6, 23, 0, 11) }
                    break;

            }
            if ((Game.time - global.Gtime[this.name]) % 10) return
            // boost lab填充检查
            if (!this.Check_Lab(mission, 'transport', 'complex')) return
        }
        else {
            if ((Game.time - global.Gtime[this.name]) % 10) return
        }
        if (mission.CreepBind['aio'].num == 0)
            mission.CreepBind['aio'].num = mission.Data.num
    }

    // 双人小队
    public Task_double(mission: MissionModel): void {
        if ((Game.time - global.Gtime[this.name]) % 11) return
        if (!this.Check_Lab(mission, 'transport', 'complex')) return
    }

    // 四人小队
    public Task_squad(mission: MissionModel): void {
        if ((Game.time - global.Gtime[this.name]) % 7) return
        if (!mission.Data.squadID) {
            if (!Memory.squadMemory) Memory.squadMemory = {}
            let randomStr = Math.random().toString(36).substr(3)
            if (!Memory.squadMemory[`${mission.Data.flag}|${randomStr}|${Game.shard.name}`]) {
                mission.Data.squadID = `${mission.Data.flag}|${randomStr}|${Game.shard.name}`
            }
        }
        else {
            if (Memory.squadMemory[mission.Data.squadID] && Object.keys(Memory.squadMemory[mission.Data.squadID].creepData).length >= 4) {
                delete mission.Data.squadID
            }
        }
        if (!this.Check_Lab(mission, 'transport', 'complex')) return
    }

    // 紧急支援
    public Task_HelpDefend(mission: MissionModel): void {
        if (mission.Data.sType == 'aio' && mission.Data.boost) {
            global.SpecialBodyData[this.name]['saio'] = GenerateAbility(0, 0, 10, 0, 6, 23, 0, 11)
        }
        if ((Game.time - global.Gtime[this.name]) % 7) return
        if (mission.LabBind) {
            if (!this.Check_Lab(mission, 'transport', 'complex')) return
        }
    }


}