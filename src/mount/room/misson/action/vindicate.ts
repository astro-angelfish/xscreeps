import { avePrice, haveOrder, highestPrice } from "@/module/fun/funtion";
import { Colorful, GenerateAbility, isInArray } from "@/utils";

/* 房间原型拓展   --行为  --维护任务 */
export default class RoomMissonVindicateExtension extends Room {
    public Task_Repair(mission: MissionModel): void {
        /* 根据level决定任务爬虫体型 */
        if (mission.CreepBind.repair.num > 0) {
            let level = mission.Data.level
            if (!level) mission.Data.level = 'T0'
            if (level == 'T3') {
                global.MSB[mission.id] = { 'repair': GenerateAbility(30, 10, 10, 0, 0, 0, 0, 0) }
            }
            else if (level == 'T2') {
                global.MSB[mission.id] = { 'repair': GenerateAbility(6, 4, 10, 0, 0, 0, 0, 0) }
            }
            else if (level == 'T1') {
                global.MSB[mission.id] = { 'repair': GenerateAbility(20, 10, 15, 0, 0, 0, 0, 0) }
            }
            else if (level == 'T0') {
                // 默认配置
            }
            if ((Game.time - global.Gtime[this.name]) % 8) return
            if (mission.LabBind) {
                if (!this.Check_Lab(mission, 'transport', 'complex')) { }
            }
        }
        /*任务检测工具*/
        if ((Game.time - global.Gtime[this.name]) % 50) return
        if (mission.Data.maxhit && mission.CreepBind.repair.bind.length < 1) {
            /*存在最大生命判定 以及 爬已经全部死完*/
            var leastRam = this.getListHitsleast([STRUCTURE_RAMPART, STRUCTURE_WALL], 3)
            if (leastRam) {
                if (leastRam.hits > mission.Data.maxhit) {
                    /*完成刷墙任务*/
                    if (!mission.Data.retain) {
                        this.DeleteMission(mission.id)
                    } else {
                        mission.Data.hangstate = true;
                        if (Object.keys(mission.LabBind).length > 0) {
                            for (var l in mission.LabBind) {
                                // console.log('LabID: ',m.LabBind[l],'------解绑-------->MissonID: ',m.id)
                                this.UnBindLabData(l, mission.id)
                            }
                            mission.LabBind = {}
                        }
                    }
                } else {
                    if (this.memory.state == 'war' && mission.CreepBind.repair.num < 2) {
                        mission.CreepBind.repair.historynum = mission.CreepBind.repair.num;
                        mission.CreepBind.repair.num = 2;
                        mission.Data.hangstate = false;
                    } else if (this.memory.state == 'peace' && mission.CreepBind.repair.historynum) {
                        mission.CreepBind.repair.num = mission.CreepBind.repair.historynum;
                        delete mission.CreepBind.repair.historynum;
                        mission.Data.hangstate = false;
                    } else if (mission.CreepBind.repair.num < 1) {
                        mission.CreepBind.repair.num = 1;
                        mission.Data.hangstate = false;
                    }
                }
            }
        }
    }
    public Task_HelpRepair(mission: MissionModel): void {
        let level = mission.Data.level
        if (!level) mission.Data.level = 'T0'
        if (level == 'T3') {
            global.MSB[mission.id] = { 'repair-work': GenerateAbility(30, 10, 10, 0, 0, 0, 0, 0) }
        }
        else if (level == 'T2') {
            global.MSB[mission.id] = { 'repair-work': GenerateAbility(6, 4, 10, 0, 0, 0, 0, 0) }
        }
        else if (level == 'T1') {
            global.MSB[mission.id] = { 'repair-work': GenerateAbility(20, 10, 15, 0, 0, 0, 0, 0) }
        }
        else if (level == 'T0') {
            // 默认配置
        }
        if ((Game.time - global.Gtime[this.name]) % 8) return
        if (mission.LabBind) {
            if (!this.Check_Lab(mission, 'transport', 'complex')) { }
        }
    }

    /* 急速冲级 */
    public Task_Quick_upgrade(mission: MissionModel): void {
        if (this.controller.level >= 8) { this.DeleteMission(mission.id); console.log(`房间${this.name}等级已到8级，删除任务!`); return }
        if (!this.terminal) return
        if (!this.memory.StructureIdData.labs || this.memory.StructureIdData.labs.length <= 0) return
        /* 能量购买 */
        let terminal_ = this.terminal as StructureTerminal
        if (!terminal_) return
        if (!mission.Data.standed) mission.Data.standed = true
        /* 如果terminal附近已经充满了爬虫，则standed为false */
        // let creeps = terminal_.pos.findInRange(FIND_MY_CREEPS, 1)
        // if (creeps.length >= 8) mission.Data.standed = false
        // else mission.Data.standed = true
        if (!this.Check_Lab(mission, 'transport', 'complex')) return
        // if (Game.time % 40) return
        // if (terminal_.store.getUsedCapacity('energy') < 100000 && Game.market.credits >= 1000000) {
        //     let ave = avePrice('energy', 2)
        //     let highest = highestPrice('energy', 'buy', ave + 6)
        //     if (!haveOrder(this.name, 'energy', 'buy', highest, -0.2)) {
        //         let result = Game.market.createOrder({
        //             type: ORDER_BUY,
        //             resourceType: 'energy',
        //             price: highest + 0.1,
        //             totalAmount: 100000,
        //             roomName: this.name
        //         });
        //         if (result != OK) { console.log("创建能量订单出错,房间", this.name) }
        //         console.log(Colorful(`[急速冲级]房间${this.name}创建energy订单,价格:${highest + 0.01};数量:100000`, 'green', true))
        //     }
        // }
    }

    /* 普通冲级 */
    public Task_Normal_upgrade(mission: MissionModel): void {
        if (this.controller.level >= 8) { this.DeleteMission(mission.id); console.log(`房间${this.name}等级已到8级，删除任务!`); return }
        if (!this.memory.StructureIdData.terminalID) return
        if (!this.memory.StructureIdData.labs || this.memory.StructureIdData.labs.length <= 0) return
        if (mission.LabBind && !this.Check_Lab(mission, 'transport', 'complex')) return   // boost
    }

    /* 紧急援建 */
    public Task_HelpBuild(mission: MissionModel): void {
        if (!mission.Data.defend) {
            global.MSB[mission.id] = { 'architect': GenerateAbility(15, 24, 10, 0, 0, 1, 0, 0) }
        }
        if ((Game.time - global.Gtime[this.name]) % 9) return
        if (mission.LabBind) {
            if (!this.Check_Lab(mission, 'transport', 'complex')) return // 如果目标lab的t3少于 1000 发布搬运任务
        }
    }
    /*紧急升级*/
    public Task_HelpUpgrade(mission: MissionModel): void {
        if (!mission.Data.defend) {
            global.MSB[mission.id] = { 'upgrade-work': GenerateAbility(10, 30, 10, 0, 0, 0, 0, 0) }
        }
        if ((Game.time - global.Gtime[this.name]) % 9) return
        if (mission.LabBind) {
            if (!this.Check_Lab(mission, 'transport', 'complex')) return // 如果目标lab的t3少于 1000 发布搬运任务
        }
    }

    /* 资源转移任务 */
    public Task_Resource_transfer(mission: MissionModel): void {
        if (this.controller.level >= 8) {
            if ((Game.time - global.Gtime[this.name]) % 50) return
        } else {
            if ((Game.time - global.Gtime[this.name]) % 5) return
        }
        let storage_ = this.storage as StructureStorage
        let terminal_ = this.terminal as StructureTerminal
        if (!storage_ || !terminal_) {
            this.DeleteMission(mission.id)
            return
        }
        if (this.MissionNum('Structure', '资源传送') > 0) return //有传送任务就先不执行
        let _all_store = 0;
        if (storage_) _all_store += storage_.store.getUsedCapacity('energy');
        if (terminal_) _all_store += terminal_.store.getUsedCapacity('energy');
        if (_all_store < 100000) return   // 仓库资源太少不执行
        // 不限定资源代表除了能量和ops之外所有资源都要转移
        if (!mission.Data.rType) {
            for (var i in storage_.store) {
                if (mission.Data.whitelist.length > 0) {
                    if (!isInArray(mission.Data.whitelist, i)) continue
                }
                if (isInArray(['energy', 'ops'], i)) continue
                let missNum = (storage_.store[i] >= 50000) ? 50000 : storage_.store[i]
                let sendTask = this.public_Send(mission.Data.disRoom, i as ResourceConstant, missNum)
                if (this.AddMission(sendTask))
                    return

            }
            // 代表已经没有资源了 - 8级控制器终止任务
            if (this.controller.level >= 8) {
                this.DeleteMission(mission.id)
            }
            return
        }
        else {
            let rType = mission.Data.rType as ResourceConstant
            let num = mission.Data.num as number
            if (num <= 0 || storage_.store.getUsedCapacity(rType) <= 0)   // 数量或存量小于0 就删除任务
            {
                this.DeleteMission(mission.id)
                return
            }
            let missNum = (num >= 50000) ? 50000 : num
            if (missNum > storage_.store.getUsedCapacity(rType)) missNum = storage_.store.getUsedCapacity(rType)
            let sendTask = this.public_Send(mission.Data.disRoom, rType, missNum)
            if (sendTask && this.AddMission(sendTask)) {
                mission.Data.num -= missNum
            }
        }
    }
    // 扩张援建
    public Task_Expand(mission: MissionModel): void {
        // console.log('扩张援助体型检测',mission.Data.level)
        if (mission.Data.defend && mission.Data.level) {
            // console.log('扩张援助体型3',mission.Data.level)
            switch (mission.Data.level) {
                case 'T1':
                    global.MSB[mission.id] = {
                        'claim': GenerateAbility(0, 0, 5, 0, 0, 0, 1, 0),
                        'Ebuild': GenerateAbility(15, 15, 15, 0, 0, 0, 0, 0),
                        'Eupgrade': GenerateAbility(15, 15, 15, 0, 0, 0, 0, 0)
                    }
                    break;
                case 'T2':
                    global.MSB[mission.id] = {
                        'claim': GenerateAbility(0, 0, 5, 0, 0, 0, 1, 0),
                        'Ebuild': GenerateAbility(18, 18, 12, 0, 0, 0, 0, 0),
                        'Eupgrade': GenerateAbility(18, 18, 12, 0, 0, 0, 0, 0)
                    }
                    break;
                case 'T3':
                    // console.log('扩张援助体型3')
                    global.MSB[mission.id] = {
                        'claim': GenerateAbility(0, 0, 5, 0, 0, 0, 1, 0),
                        'Ebuild': GenerateAbility(30, 10, 10, 0, 0, 0, 0, 0),
                        'Eupgrade': GenerateAbility(30, 10, 10, 0, 0, 0, 0, 0)
                    }
                    break;
                case 'T4':
                    global.MSB[mission.id] = {
                        'claim': GenerateAbility(0, 0, 6, 0, 0, 1, 1, 0),
                        'Ebuild': GenerateAbility(14, 14, 15, 0, 0, 1, 0, 0),
                        'Eupgrade': GenerateAbility(14, 14, 15, 0, 0, 1, 0, 0)
                    }
                    break;
                case 'T5':
                    global.MSB[mission.id] = {
                        'claim': GenerateAbility(0, 0, 6, 0, 0, 1, 1, 0),
                        'Ebuild': GenerateAbility(14, 14, 15, 0, 0, 1, 0, 0),
                        'Eupgrade': GenerateAbility(14, 14, 15, 0, 0, 1, 0, 0)
                    }
                    break;
                case 'T6':
                    global.MSB[mission.id] = {
                        'claim': GenerateAbility(0, 0, 6, 0, 0, 1, 1, 0),
                        'Ebuild': GenerateAbility(17, 17, 12, 0, 0, 2, 0, 0),
                        'Eupgrade': GenerateAbility(17, 17, 12, 0, 0, 2, 0, 0)
                    }
                    break;
                case 'T7':
                    global.MSB[mission.id] = {
                        'claim': GenerateAbility(0, 0, 6, 0, 0, 1, 1, 0),
                        'Ebuild': GenerateAbility(28, 10, 10, 0, 0, 2, 0, 0),
                        'Eupgrade': GenerateAbility(28, 10, 10, 0, 0, 2, 0, 0)
                    }
                    break;
                default:
                    break;

            }
            // global.MSB[mission.id] = {
            //     'claim': GenerateAbility(0, 0, 10, 0, 0, 5, 1, 4),
            //     'Ebuild': GenerateAbility(10, 4, 20, 0, 0, 6, 0, 0),
            //     'Eupgrade': GenerateAbility(10, 4, 20, 0, 0, 6, 0, 0)
            // }
        }
        if ((Game.time - global.Gtime[this.name]) % 11) return
        if (!this.Check_Lab(mission, 'transport', 'complex')) return
    }



}