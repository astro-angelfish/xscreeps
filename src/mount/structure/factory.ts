import { isInArray } from '@/utils'
import { identifyDispatch, ResourceCanDispatch } from '@/module/dispatch/resource';
import { unzipMap } from '@/constant/ResourceConstant';
import { object } from 'lodash';
export class factoryExtension extends StructureFactory {
    public ManageMission(): void {
        if (this.room.memory.switch.StopFactory) return
        this.ResourceMemory()
        this.ResourceBalance()
        this.factoryUnzip()
        this.factoryProduce()
    }

    // 资源平衡
    public ResourceBalance(): void {
        if ((Game.time - global.Gtime[this.room.name]) % 7) return
        let terminal_ = this.room.terminal as StructureTerminal
        let storage_ = this.room.storage as StructureStorage
        if (!terminal_ || !storage_) return
        if (!this.room.memory.productData || !this.room.memory.productData.balanceData) return
        // 找到manage爬虫
        var anytype = Object.keys(this.store)
        for (let i in this.room.memory.productData.balanceData) if (i) anytype = _.uniq([...anytype, i])//把所有资源遍历一遍
        for (let i of anytype) {
            if (this.room.RoleMissionNum('manage', '物流运输') > 0) return
            let num = this.store.getUsedCapacity(i as ResourceConstant)    // 数量
            // 搬走资源
            if (!this.room.memory.productData.balanceData[i] || !this.room.memory.productData.balanceData[i].num) {
                if (storage_.store.getFreeCapacity() < 10000) continue
                let thisTask = this.room.public_Carry({ 'manage': { num: 1, bind: [] } }, 10, this.room.name, this.pos.x, this.pos.y, this.room.name, storage_.pos.x, storage_.pos.y, i as ResourceConstant, num)
                this.room.AddMission(thisTask)
                continue
            }
            else {
                if (num > this.room.memory.productData.balanceData[i].num) {
                    if (storage_.store.getFreeCapacity() < 10000) continue
                    let thisTask = this.room.public_Carry({ 'manage': { num: 1, bind: [] } }, 10, this.room.name, this.pos.x, this.pos.y, this.room.name, storage_.pos.x, storage_.pos.y, i as ResourceConstant, num - this.room.memory.productData.balanceData[i])
                    this.room.AddMission(thisTask)
                }
                // 少了就搬进
                else if (num < this.room.memory.productData.balanceData[i].num && this.room.memory.productData.balanceData[i].fill) {
                    if (this.store.getFreeCapacity() < 2000) continue
                    if (i == 'energy') {
                        // 能量特殊
                        if (this.room.memory.productData.balanceData[i].num - num > 50 && this.room.memory.productData.balanceData[i].num - num < 1000) continue  // 相差太少就不搬了
                        if (storage_.store.getUsedCapacity('energy') <= 20000) continue
                        else {
                            let thisTask = this.room.public_Carry({ 'manage': { num: 1, bind: [] } }, 10, this.room.name, storage_.pos.x, storage_.pos.y, this.room.name, this.pos.x, this.pos.y, i as ResourceConstant, Math.abs(this.room.memory.productData.balanceData[i].num - num))
                            this.room.AddMission(thisTask)
                            continue
                        }
                    }
                    else if (isInArray(['U', 'L', 'K', 'H', 'O', 'Z', 'X'], i)) {
                        if (storage_.store.getUsedCapacity(i as ResourceConstant) < this.room.memory.productData.balanceData[i].num - num) {
                        }
                        else {
                            let thisTask = this.room.public_Carry({ 'manage': { num: 1, bind: [] } }, 10, this.room.name, storage_.pos.x, storage_.pos.y, this.room.name, this.pos.x, this.pos.y, i as ResourceConstant, Math.abs(this.room.memory.productData.balanceData[i].num - num))
                            this.room.AddMission(thisTask)
                            continue
                        }
                        // 搬运
                        if (!storage_.store[i]) continue
                    }
                    else {
                        if (storage_.store.getUsedCapacity(i as ResourceConstant) <= this.room.memory.productData.balanceData[i].num - num) {
                            if (storage_.store.getUsedCapacity(i as ResourceConstant) <= 0) continue
                            // 搬运
                            let thisTask = this.room.public_Carry({ 'manage': { num: 1, bind: [] } }, 10, this.room.name, storage_.pos.x, storage_.pos.y, this.room.name, this.pos.x, this.pos.y, i as ResourceConstant, storage_.store.getUsedCapacity(i as ResourceConstant))
                            this.room.AddMission(thisTask)
                            continue
                        }
                        else {
                            // 搬运
                            let thisTask = this.room.public_Carry({ 'manage': { num: 1, bind: [] } }, 10, this.room.name, storage_.pos.x, storage_.pos.y, this.room.name, this.pos.x, this.pos.y, i as ResourceConstant, Math.abs(this.room.memory.productData.balanceData[i].num - num))
                            this.room.AddMission(thisTask)
                            continue
                        }
                    }
                }
            }
        }
    }

    // 资源平衡记忆更新
    public ResourceMemory(): void {
        /* factory自身资源管理 */
        var factoryData = this.room.memory.productData.balanceData
        /* factory自身等级管理 */
        if (this.level) { if (this.level != this.room.memory.productData.level) this.room.memory.productData.level = this.level }
        else this.room.memory.productData.level = 0
        for (var i in factoryData) {
            /* 数量小于0就删除数据，节省memory */
            if (factoryData[i].num <= 0) {
                console.log(`[factory] 房间${this.room.name}删除balanceData数据${i}`)
                delete factoryData[i]
            }
        }
    }

    // 工厂生产
    public factoryProduce(): void {
        if ((Game.time - global.Gtime[this.room.name]) % 5) return
        if (this.cooldown) return
        if (!this.room.memory.productData.state) this.room.memory.productData.state = 'sleep'
        if (!_.isEmpty(this.room.memory.productData.unzip)) return  // 优先资源解压
        let state = this.room.memory.productData.state
        let terminal_ = this.room.terminal as StructureTerminal
        let storage_ = this.room.storage as StructureStorage
        if (!terminal_ || !storage_) return
        if (state == 'sleep') {
            this.room.memory.productData.balanceData = {}
            if ((Game.time - global.Gtime[this.room.name]) % 85) return
            delete this.room.memory.productData.producing
            let disCom = this.room.memory.productData.flowCom
            if (disCom)   // 检测是否可以直接生产商品 是否可以资源调度
            {
                let disComNumber = this.store.getUsedCapacity(disCom as ResourceConstant) + storage_.store.getUsedCapacity(disCom as ResourceConstant);
                if (disComNumber < 500) {
                    // 初始化numList数据
                    let numList = {}
                    let flow = true
                    // 判断合成资源是否足够
                    LoopA:
                    for (var i in COMMODITIES[disCom].components) {
                        numList[i] = storage_.store.getUsedCapacity(i as ResourceConstant)
                        if (COMMODITIES[disCom].level >= 4) {
                            // 如果仓库内的底物少于规定量
                            if (numList[i] < COMMODITIES[disCom].components[i] * 5) {
                                flow = false
                                // 判断一下能否调度 不能调度直接跳转到baseList相关合成判断
                                let identify = ResourceCanDispatch(this.room, i as ResourceConstant, COMMODITIES[disCom].components[i] * 5)
                                if (identify == "can") {
                                    console.log(`[dispatch]<factory> 房间${this.room.name}将进行资源为${i}的资源调度!`)
                                    let dispatchTask: RDData = {
                                        sourceRoom: this.room.name,
                                        rType: i as ResourceConstant,
                                        num: COMMODITIES[disCom].components[i] * 5,
                                        delayTick: 200,
                                        conditionTick: 35,
                                        buy: false,
                                    }
                                    Memory.ResourceDispatchData.push(dispatchTask)
                                }
                                else if (identify == 'running') return
                                else break LoopA
                            }
                            else {
                                continue
                            }
                        }
                        else {
                            if (numList[i] < COMMODITIES[disCom].components[i] * 10) {
                                flow = false
                                let identify = ResourceCanDispatch(this.room, i as ResourceConstant, COMMODITIES[disCom].components[i] * 10)
                                if (identify == "can") {
                                    console.log(`[dispatch]<factory> 房间${this.room.name}将进行资源为${i}的资源调度!`)
                                    let dispatchTask: RDData = {
                                        sourceRoom: this.room.name,
                                        rType: i as ResourceConstant,
                                        num: COMMODITIES[disCom].components[i] * 10,
                                        delayTick: 200,
                                        conditionTick: 35,
                                        buy: false,
                                    }
                                    Memory.ResourceDispatchData.push(dispatchTask)
                                }
                                else if (identify == 'running') return
                                else break LoopA
                            }
                            else {
                                continue
                            }
                        }
                    }
                    if (flow) {
                        console.log(`[factory] 房间${this.room.name}转入flow生产模式,目标商品为${disCom}`)
                        this.room.memory.productData.state = 'flow'
                        this.room.memory.productData.producing = { com: disCom }
                        return
                    }
                }
            }
            // 如果没有流水线商品或者商品不够生产流水线商品 就生产基本商品
            if (Object.keys(this.room.memory.productData.baseList).length <= 0) return
            let zip = []        // 压缩商品 bar
            let low = []        // 低级商品 Wire Cell Alloy Condensate 
            let high = []       // 高等商品 Composite Crystal Liquid 
            let zipList = ['utrium_bar', 'lemergium_bar', 'keanium_bar', 'zynthium_bar', 'ghodium_melt', 'oxidant', 'reductant', 'purifier', 'battery']
            let highlist = [
                'composite', 'crystal', 'liquid'
                , 'switch', 'transistor', 'microchip', 'circuit', 'device'
                , 'phlegm', 'tissue', 'muscle', 'organoid', 'organism'
                , 'tube', 'fixtures', 'frame', 'hydraulics', 'machine'
                , 'concentrate', 'extract', 'spirit', 'emanation', 'essence'
            ];
            for (var baseProduction in this.room.memory.productData.baseList) {
                if (isInArray(zipList, baseProduction)) zip.push(baseProduction)
                else if (isInArray(['wire', 'cell', 'alloy', 'condensate'], baseProduction)) low.push(baseProduction)
                else if (isInArray(highlist, baseProduction)) high.push(baseProduction)
            }
            // 检测基础商品是否满足
            for (let b of zip) {
                if (storage_.store.getUsedCapacity(b) < this.room.memory.productData.baseList[b].num - 3000) {
                    console.log(`[factory] 房间${this.room.name}转入base生产模式,目标商品为${b}`)
                    this.room.memory.productData.state = 'base'
                    this.room.memory.productData.producing = { com: b, num: this.room.memory.productData.baseList[b].num }
                    return
                }
            }
            // 检测低级商品是否满足
            LoopJ:
            for (let l of low) {
                if (storage_.store.getUsedCapacity(l) < this.room.memory.productData.baseList[l].num - 300) {
                    // if (this.owner.username == 'ExtraDim') {
                    //     /* 测试用 */
                    let minList = ['energy', 'L', 'O', 'H', 'U', 'K', 'Z', 'X', 'G']
                    //     // 判断一下是否有足够子资源
                    for (var i in COMMODITIES[l].components) {
                        if (!isInArray(minList, i) &&
                            storage_.store.getUsedCapacity(i as ResourceConstant) < COMMODITIES[l].components[i] &&
                            ResourceCanDispatch(this.room, i as ResourceConstant, COMMODITIES[l].components[i] * 100) == 'no') {
                            continue LoopJ
                        }
                    }
                    // }
                    console.log(`[factory] 房间${this.room.name}转入base生产模式,目标商品为${l}`)
                    this.room.memory.productData.state = 'base'
                    this.room.memory.productData.producing = { com: l, num: this.room.memory.productData.baseList[l].num }
                    return
                }
            }
            // 检测高级商品是否满足
            LoopJ:
            for (let h of high) {
                let _start_number = 300;
                let _comm = COMMODITIES[h]
                if (_comm.level && _comm.level > 3) {
                    _start_number = 10
                }
                if (storage_.store.getUsedCapacity(h) < this.room.memory.productData.baseList[h].num - _start_number) {
                    if (!COMMODITIES[h]) continue;
                    if (COMMODITIES[h].level > 0) {
                        let frequency_number = Math.ceil(1000 / COMMODITIES[h].cooldown)
                        for (var i in COMMODITIES[h].components) {
                            let minList = ['energy', 'L', 'O', 'H', 'U', 'K', 'Z', 'X', 'G']
                            let storage_number = storage_.store.getUsedCapacity(i as ResourceConstant)
                            let _need_number = COMMODITIES[h].components[i] * frequency_number;
                            if (!isInArray(minList, i)) {
                                if (storage_number > _need_number) {/*仓库有足够资源的情况下监测下一个资源*/
                                    continue;
                                }
                                if (ResourceCanDispatch(this.room, i as ResourceConstant, _need_number) == 'no') {
                                    // console.log(this.room.name, h, i, '监测调度错误', _need_number)
                                    continue LoopJ
                                }
                            }
                        }
                    }
                    console.log(`[factory] 房间${this.room.name}转入base生产模式,目标商品为${h}`)
                    this.room.memory.productData.state = 'base'
                    this.room.memory.productData.producing = { com: h, num: this.room.memory.productData.baseList[h].num }
                    return
                }
            }
        }
        else if (state == 'base')   // 生产基础商品
        {
            let disCom = this.room.memory.productData.producing.com
            let minList = ['energy', 'L', 'O', 'H', 'U', 'K', 'Z', 'X', 'G']
            // 挂载资源平衡数据
            // 判定所需数量是否足够
            for (var i in COMMODITIES[disCom].components) {
                if (isInArray(minList, i)) {
                    this.room.memory.productData.balanceData[i] = { num: 5000, fill: true }
                    if (storage_.store.getUsedCapacity(i as ResourceConstant) < 10000) {
                        // 资源调度
                        if (identifyDispatch(this.room, i as ResourceConstant, 10000, 1, 'deal')) {
                            console.log(`[dispatch] 房间${this.room.name}将进行资源为${i}的资源调度!`)
                            let dispatchTask: RDData = {
                                sourceRoom: this.room.name,
                                rType: i as ResourceConstant,
                                num: 10000,
                                delayTick: 200,
                                conditionTick: 35,
                                buy: true,
                                mtype: 'deal'
                            }
                            Memory.ResourceDispatchData.push(dispatchTask)
                        }
                        break
                    }
                }
                else {
                    // 其他资源的话，看看能不能调度
                    this.room.memory.productData.balanceData[i] = { num: COMMODITIES[disCom].components[i] * 10, fill: true }
                    if (this.room.RoleMissionNum('manage', '物流运输') <= 0) {
                        let _number_t = 100;
                        if (COMMODITIES[disCom].level > 0) {
                            _number_t = Math.ceil(1000 / COMMODITIES[disCom].cooldown)
                        }
                        if (this.store.getUsedCapacity(i as ResourceConstant) + storage_.store.getUsedCapacity(i as ResourceConstant) < COMMODITIES[disCom].components[i]) {
                            let identify = ResourceCanDispatch(this.room, i as ResourceConstant, COMMODITIES[disCom].components[i] * _number_t)
                            if (identify == 'can') {
                                console.log(`[dispatch]<factory> 房间${this.room.name}将进行资源为${i}的资源调度!`)
                                let dispatchTask: RDData = {
                                    sourceRoom: this.room.name,
                                    rType: i as ResourceConstant,
                                    num: COMMODITIES[disCom].components[i] * _number_t,
                                    delayTick: 200,
                                    conditionTick: 35,
                                    buy: false,
                                }
                                Memory.ResourceDispatchData.push(dispatchTask)
                            }
                            else if (identify == 'running') break
                            else {
                                console.log(`[资源调度]<factory> 商品${i}无法调度,工厂状态切换为sleep!`)
                                this.room.memory.productData.state = 'sleep'
                                return
                            }
                        }
                    }

                }
            }
            // 合成
            let result = this.produce(disCom)
            if (result == 0) {
                this.room.memory.productData.producing.num -= COMMODITIES[disCom].amount
            }
            else if (result == ERR_BUSY) {
                if (Game.powerCreeps[`${this.room.name}/queen/${Game.shard.name}`])
                    this.room.enhance_factory();
                else console.log(`[factory] 房间${this.room.name}出现工厂等级错误,不能生产${disCom}`)
            }
            if (this.room.memory.productData.producing.num <= 0)
                this.room.memory.productData.state = 'sleep'
        }
        else if (state == 'flow')   // 生产流水线商品
        {
            let disCom = this.room.memory.productData.producing.com
            let disComNumber = this.store.getUsedCapacity(disCom as ResourceConstant) + storage_.store.getUsedCapacity(disCom as ResourceConstant);
            if (disComNumber > 1000) {
                this.room.memory.productData.state = 'sleep'
                return
            }
            // 调度相关资源
            for (var i in COMMODITIES[disCom].components) {
                if (COMMODITIES[disCom].level < 4) {
                    if (isInArray(['energy'], i))
                        this.room.memory.productData.balanceData[i] = { num: 5000, fill: true }
                    else
                        this.room.memory.productData.balanceData[i] = { num: COMMODITIES[disCom].components[i] * 4, fill: true }
                    if (this.room.RoleMissionNum('manage', '物流运输') > 0) break
                    if (this.store.getUsedCapacity(i as ResourceConstant) + storage_.store.getUsedCapacity(i as ResourceConstant) < COMMODITIES[disCom].components[i]) {
                        console.log(`[factory] 房间${this.room.name}转入sleep生产模式`)
                        this.room.memory.productData.state = 'sleep'
                        return
                    }
                }
                else {
                    if (isInArray(['energy'], i))
                        this.room.memory.productData.balanceData[i] = { num: 5000, fill: true }
                    else
                        this.room.memory.productData.balanceData[i] = { num: COMMODITIES[disCom].components[i], fill: true }
                    if (this.room.RoleMissionNum('manage', '物流运输') > 0) break
                    if (this.store.getUsedCapacity(i as ResourceConstant) + storage_.store.getUsedCapacity(i as ResourceConstant) < COMMODITIES[disCom].components[i]) {
                        console.log(`[factory] 房间${this.room.name}转入sleep生产模式`)
                        this.room.memory.productData.state = 'sleep'
                        return
                    }
                }
            }
            // 合成

            let result = this.produce(disCom)
            if (result == 0) {
                this.room.memory.productData.producing.num -= COMMODITIES[disCom].amount
            }
            else if (result == ERR_BUSY) {
                if (!this.room.memory.productData.flowCom) {
                    console.log(`[factory] 房间${this.room.name}转入sleep生产模式`)
                    this.room.memory.productData.state = 'sleep'
                }
                if (Game.powerCreeps[`${this.room.name}/queen/${Game.shard.name}`])
                    this.room.enhance_factory();
                else console.log(`[factory] 房间${this.room.name}出现工厂等级错误,不能生产${disCom}`)
            }

        }
    }

    // 添加合成
    public add(res: CommodityConstant, num: number): string {
        if (!isInArray(Object.keys(COMMODITIES), res) || num <= 0 || !num) return `[factory] 错误参数`
        this.room.memory.productData.baseList[res] = { num: num }
        let result = `[factory] 房间${this.room.name}成功添加基础资源${res};目前基础资源列表如下:\n`
        for (var i in this.room.memory.productData.baseList) result += `${i}:${this.room.memory.productData.baseList[i].num}\n`
        return result
    }

    // 删除合成
    public remove(res: CommodityConstant): string {
        delete this.room.memory.productData.baseList[res]
        let result = `[factory] 房间${this.room.name}成功删除基础资源${res};目前基础资源列表如下:\n`
        for (var i in this.room.memory.productData.baseList) result += `${i}:${this.room.memory.productData.baseList[i].num}\n`
        return result
    }

    // 设置生产线资源
    public set(res: CommodityConstant): string {
        this.room.memory.productData.flowCom = res
        return `[factory] 房间${this.room.name}的流水线资源设置为${res}!`
    }

    // 删除生产线资源
    public del(res: CommodityConstant): string {
        delete this.room.memory.productData.flowCom
        return `[factory] 房间${this.room.name}的流水线资源已删除!`
    }

    /**
     * 更新工厂等级
     */
    public enhance_factory(): string {
        if (!Game.powerCreeps[`${this.room.name}/queen/${Game.shard.name}`]) return `${this.room.name}此房间无pc请先孵化pc`
        this.room.enhance_factory();
        return `发布pc确定工厂等级任务成功`
    }

    public factoryUnzip(): void {
        if (!this.room.memory.productData.unzip) this.room.memory.productData.unzip = {}
        if (this.cooldown) return
        if ((Game.time - global.Gtime[this.room.name]) % 10) return
        let unzipData = this.room.memory.productData.unzip
        if (_.isEmpty(unzipData)) return
        let unzipResource = Object.keys(unzipData)[0]
        if (unzipData['battery'] && unzipResource != 'battery') unzipResource = 'battery'   // 优先解压电池
        if (!isInArray(Object.keys(unzipMap), unzipResource)) {
            delete unzipData[unzipResource]
            console.log(`房间${this.room.name}存在错误解压资源类型,为:${unzipResource}`)
            return
        }
        let storage_ = this.room.storage
        if (!storage_) return
        if (storage_.store.getUsedCapacity(unzipResource as ResourceConstant) <= 0) {
            this.room.memory.productData.balanceData = {}
            delete unzipData[unzipResource]
            return
        }
        // 判断是否有足够解压资源
        if (unzipResource == 'battery') {
            this.room.memory.productData.balanceData['battery'] = { num: 1000, fill: true }
            if (this.store.getUsedCapacity(unzipResource) >= 50) {
                let result = this.produce(unzipMap[unzipResource])
                if (result == OK) {
                    unzipData['battery'].num -= 50
                }
                if (result == -7 || result == -10 || unzipData['battery'].num <= 0) {
                    this.room.memory.productData.balanceData = {}
                    delete unzipData[unzipResource]
                    return
                }
            }
        }
        else {
            if (storage_.store.getUsedCapacity('energy') < 25000) return    // 能量太少拒绝解压
            this.room.memory.productData.balanceData[unzipResource] = { num: 1000, fill: true }
            this.room.memory.productData.balanceData['energy'] = { num: 5000, fill: true }
            if (this.store.getUsedCapacity(unzipResource as CommodityConstant) >= 100) {
                let result = this.produce(unzipMap[unzipResource])
                if (result == OK) {
                    unzipData[unzipResource].num -= 100
                }
                if (result == -7 || result == -10 || unzipData[unzipResource].num <= 0) {
                    this.room.memory.productData.balanceData = {}
                    delete unzipData[unzipResource]
                    return
                }
            }

        }
    }
}
