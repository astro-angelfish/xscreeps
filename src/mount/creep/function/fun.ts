/* 爬虫原型拓展   --功能  --功能 */

import { BoostedPartData } from "@/constant/BoostConstant";
import CreepNameManager from "@/module/creepNameManager";
import { isInArray } from "@/utils";


export default class CreepFunctionExtension extends Creep {
    /**
     * 
     * working状态
     */
    public workstate(rType: ResourceConstant = RESOURCE_ENERGY, ratio: number = 1): void {
        if (!this.memory.working) this.memory.working = false;
        if (this.memory.working && this.store[rType] == 0) {
            this.memory.working = false;
        }
        if (!this.memory.working && (this.store.getFreeCapacity() == 0 || (ratio != 1 && this.store.getUsedCapacity(rType) >= this.store.getCapacity(rType) * ratio))) {
            this.memory.working = true;
        }
    }

    public harvest_(source_: Source): void {
        if (!this.pos.isNearTo(source_)) {
            this.goTo(source_.pos, 1)
            this.memory.standed = false
        } else {
            this.harvest(source_)
            this.memory.standed = true
        }
    }

    public transfer_(distination: Structure, rType: ResourceConstant = RESOURCE_ENERGY, ops?: number): void {
        if (this.transfer(distination, rType) == ERR_NOT_IN_RANGE) {
            this.goTo(distination.pos, 1, ops)
        }
    }

    public upgrade_(ops?: number): void {
        if (this.room.controller) {
            if (this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
                this.goTo(this.room.controller.pos, 3, ops ? ops : 500)
                this.memory.standed = false
            }
            else this.memory.standed = true
        }
    }

    // 考虑到建筑和修复有可能造成堵虫，所以解除钉扎状态
    public build_(distination: ConstructionSite): void {
        if (this.build(distination) == ERR_NOT_IN_RANGE) {
            this.goTo(distination.pos, 1)
            this.memory.standed = false
        }
        else
            this.memory.standed = true
    }

    public repair_(distination: Structure, ops = null): void {
        let repair_s = this.repair(distination)
        if (repair_s == ERR_NOT_IN_RANGE) {
            this.goTo(distination.pos, 1, ops)
            this.memory.standed = false
        }
        else
            this.memory.standed = true
    }

    public withdraw_(distination: Structure, rType: ResourceConstant = RESOURCE_ENERGY, range: number = 1): void {
        if (this.withdraw(distination, rType) == ERR_NOT_IN_RANGE) {
            this.goTo(distination.pos, 1)
        }
        this.memory.standed = false
    }

    // 确认是否boost了,并进行相应Boost
    public BoostCheck(boostBody: string[], state: boolean = true): boolean {
        if (this.memory.boostState && state) return true;
        for (var body in this.memory.boostData) {
            if (!isInArray(boostBody, body)) continue
            if (!this.memory.boostData[body].boosted) {
                var tempID: string
                var thisRoomMisson = Game.rooms[this.memory.belong].GainMission(this.memory.MissionData.id)
                if (!thisRoomMisson) return false
                LoopB:
                for (var j in thisRoomMisson.LabBind) {
                    if (BoostedPartData[thisRoomMisson.LabBind[j]] && body == BoostedPartData[thisRoomMisson.LabBind[j]]) {
                        tempID = j
                        break LoopB
                    }
                }
                if (!tempID) continue
                var disLab = Game.getObjectById(tempID as Id<StructureLab>) as StructureLab
                if (!disLab) continue
                // 计算body部件
                let s = 0
                for (var b of this.body) {
                    if (b.type == body) s++
                }
                if (!disLab.mineralType) return false
                if (!this.pos.isNearTo(disLab)) this.goTo(disLab.pos, 1)
                else {
                    for (var i of this.body) {
                        if (i.type == body && i.boost != thisRoomMisson.LabBind[tempID]) {
                            disLab.boostCreep(this);
                            return false
                        }
                    }
                    this.memory.boostData[body] = { boosted: true, num: s, type: thisRoomMisson.LabBind[tempID] as ResourceConstant }
                }
                return false
            }
        }
        this.memory.boostState = true
        return true
    }

    // 召唤所有房间内的防御塔治疗/攻击 自己/爬虫 [不一定成功]
    public optTower(otype: 'heal' | 'attack', creep: Creep, boolean: boolean = false): void {
        if ((this.room.name != this.memory.belong || Game.shard.name != this.memory.shard) && !boolean) return
        if (Game.rooms[this.room.name].memory.StructureIdData?.AtowerID?.length < 1) return
        for (var i of Game.rooms[this.room.name].memory.StructureIdData.AtowerID) {
            let tower_ = Game.getObjectById(i) as StructureTower
            if (!tower_) continue
            if (otype == 'heal') {
                tower_.heal(creep)
            }
            else {
                tower_.attack(creep)
            }
        }
    }

    public isInDefend(creep: Creep): boolean {
        for (var i in Game.rooms[this.memory.belong].memory.enemy) {
            for (var id of Game.rooms[this.memory.belong].memory.enemy[i])
                if (creep.id == id) return true
        }
        return false
    }

    // 寻找数组里距离自己最近的爬虫 hurt为true则去除没有攻击部件的爬
    public closestCreep(creep: Creep[], hurt?: boolean): Creep {
        if (creep.length <= 0) return null
        let result = creep[0]
        // 计算距离
        for (var i of creep) {
            // 距离
            if (hurt) {
                if (!i.getActiveBodyparts('attack') && !i.getActiveBodyparts('ranged_attack')) continue
            }
            let distance0 = Math.max(Math.abs(this.pos.x - result.pos.x), Math.abs(this.pos.y - result.pos.y))
            let distance1 = Math.max(Math.abs(this.pos.x - i.pos.x), Math.abs(this.pos.y - i.pos.y))
            if (distance1 < distance0)
                result = i
        }
        return result
    }

    public hostileCreep_atk(nearCreep): number {
        let all_atk = 0;
        for (let i in nearCreep) {
            var creeps_hostile = nearCreep[i];
            for (let boost_i in creeps_hostile.body) {
                let body_data = creeps_hostile.body[boost_i]
                switch (body_data.type) {
                    case 'attack':
                    case 'ranged_attack':
                        all_atk += this.attack_number(body_data.type, body_data.boost)
                        break;
                }
            }
        }
        return all_atk;
    }
    public attack_number(type, boost) {
        let _boost_attack = {
            'UH': 1,
            'KO': 1,
            'LO': 1,
            'UH2O': 2,
            'KHO2': 2,
            'LHO2': 2,
            'XUH2O': 3,
            'XKHO2': 3,
            'XLHO2': 3,
        }
        let _x = 1;
        if (_boost_attack[boost]) {
            _x += _boost_attack[boost]
        }
        let _number = 0;
        switch (type) {
            case 'attack':
                _number = _x * 30;
                break;
            case 'ranged_attack':
                _number = _x * 10;
                break;
            case 'heal':
                _number = _x * 12;
                break;
        }
        return _number;
    }


    public SearchHostilecreeps(range: number = 1): Creep | null {
        if (!global.HostileCreepsData) return null
        if (!global.HostileCreepsData[this.room.name]) return null
        let creeps_list = global.HostileCreepsData[this.room.name] as Creep[];
        for (let creeps of creeps_list) {
            if (this.pos.inRangeTo(creeps, range)) {
                return creeps
            }
        }
        return null;
    }

    /**
    * 统计爬的某类身体部件数目并缓存
    */
    public countBodyPart(bodyType: BodyPartConstant): number {
        if (!this.memory.bodyPartCount) this.memory.bodyPartCount = {};
        if (!this.memory.bodyPartCount[bodyType]) {
            this.memory.bodyPartCount[bodyType] = this.getActiveBodyparts(bodyType);
        }
        return this.memory.bodyPartCount[bodyType];
    }

    /**
     * 说话，原神中的台词，所有人可见
     * 
     * @param type 说话类型，日常语音和战时语音 daily or war
     */
    public sayHi(type: stateType = 'peace') {
        // 第一次说话
        if (!this.memory.sayHi) {
            this.memory.sayHi = {
                // 上一次说话所处的状态
                state: type,
                // 上一次所说的话
                saying: ''
            }
        }

        // 判断是否可以说原神台词
        if (this.memory.sayHi.canSay === undefined) {
            const nameParts = this.name.split(' ');
            // 不符合命名格式
            if (nameParts.length <= 1) {
                this.memory.sayHi.canSay = false;
                return;
            }
            // 获取原神角色名
            const yuanshenName = nameParts[1];
            if (!CreepNameManager.isYuanshenName(yuanshenName)) {
                this.memory.sayHi.canSay = false;
                return;
            }
            this.memory.sayHi.yuanshenName = yuanshenName;
            this.memory.sayHi.canSay = true;
        }

        if (!this.memory.sayHi.canSay) return;

        const lexicon = CreepNameManager.getLexicon(this.memory.sayHi.yuanshenName, type);

        let index;
        let last;   // 标记是否是继续说上一次没说完的话

        if (this.memory.sayHi.lastIndex && this.memory.sayHi.state == type) {
            index = this.memory.sayHi.lastIndex;
            last = true;
        }
        else {
            index = Math.floor(Math.random() * lexicon.length);
            last = false;
        }

        this.memory.sayHi.state = type;

        let setence = lexicon[index];
        if (!setence) {
            delete this.memory.sayHi.lastIndex;
            delete this.memory.sayHi.saying;
            return;
        }
        if (last) {
            if (this.memory.sayHi.saying) {
                setence = setence.slice(setence.lastIndexOf(this.memory.sayHi.saying) + this.memory.sayHi.saying.length);
                // 去除首部特殊符号
                if (setence.length && ['。', '？', '…', '，', '！', '~', '——'].includes(setence[0])) {
                    setence = setence.slice(1);
                }
            }
            else {
                delete this.memory.sayHi.lastIndex;
                return;
            }
        }
        const words = setence.split(/[。？…，！~——]/);
        if (words.length <= 1) {
            if (setence.length) {
                this.say(setence, true);
                this.memory.sayHi.saying = setence;
            }
            else {
                delete this.memory.sayHi.lastIndex;
                delete this.memory.sayHi.saying;
            }
            return;
        }
        let len = words[0].length;
        let ii = 1;
        // +1 是因为要计入标点符号
        while (ii < words.length && len + words[ii].length + 1 <= 10) {
            len += words[ii++].length + 1;
        }
        ii--;
        while (ii && !words[ii]) ii--;
        if (ii >= words.length) {
            if (setence.length) {
                this.say(setence, true);
            }
            delete this.memory.sayHi.lastIndex;
            delete this.memory.sayHi.saying;
        }
        else {
            const w = setence.slice(0, setence.indexOf(words[ii]) + words[ii].length);
            if (w.length) {
                this.say(w, true);
                this.memory.sayHi.saying = w;
            }
            this.memory.sayHi.lastIndex = index;
        }
    }
}