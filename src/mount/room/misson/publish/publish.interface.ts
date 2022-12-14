interface Room {
    Check_Lab(misson: MissionModel, role: string, tankType: 'storage' | 'terminal' | 'complex')
    public_Carry(creepData: BindData, delayTick: number, sR: string, sX: number, sY: number, tR: string, tX: number, tY: number, rType?: ResourceConstant, num?: number): MissionModel
    public_Carryshard(disRoom: string, CreepNum: number, shard: shardName, res: ResourceConstant, interval?: number, level?: 'T0' | 'T1' | 'T2' | 'T3'): MissionModel
    public_Carrygleaner(disRoom: string, CreepNum: number, suicide: number, interval?: number, level?: 'T0' | 'T1' | 'T2' | 'T3'): MissionModel
    public_Carrymine(disRoom: string, creepNum: number, level?: 'T0' | 'T1'): MissionModel
    public_repair(Rtype: 'global' | 'globalrampart' | 'globalwall' | 'special' | 'nuker', num: number, boostType: ResourceConstant, level?: 'T0' | 'T1' | 'T2' | 'T3' | 'T4', maxhit?: number, retain?: boolean): MissionModel
    public_planC(disRoom: string, Cnum: number, upNum: number, shard?: shardName,): MissionModel
    public_link(structure: string[], disStructure: string, level: number, delayTick?: number): MissionModel
    public_dismantle(disRoom: string, shard: shardName, num: number, interval?: number, boost?: boolean): MissionModel
    public_quick(num: number, boostType: ResourceConstant | null): MissionModel
    public_expand(disRoom: string, shard: shardName, num: number, cnum: number, level?: 'T0' | 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6' | 'T7'): MissionModel
    public_support(disRoom: string, sType: 'double' | 'aio', shard: shardName, num: number, boost: boolean): MissionModel
    public_control(disRoom: string, shard: shardName, interval: number): MissionModel
    public_helpBuild(disRoom: string, num: number, shard?: string, time?: number, defend?: boolean): MissionModel
    public_helpUpgrade(disRoom: string, num: number, shard?: string, time?: number, defend?: boolean): MissionModel
    public_helpRepair(disRoom: string, num: number, shard?: string, time?: number, boostType?: ResourceConstant, level?: 'T0' | 'T1' | 'T2' | 'T3' | 'T4'): MissionModel
    public_Sign(disRoom: string, shard: string, str: string): MissionModel
    public_Send(disRoom: string, rType: ResourceConstant, num: number): MissionModel
    public_Buy(res: ResourceConstant, num: number, range: number, max?: number): MissionModel
    public_Compound(num: number, disResource: ResourceConstant): MissionModel
    public_aio(disRoom: string, disShard: shardName, num: number, interval: number, boost: boolean, bodylevel?: "T0" | "T1" | "T2")
    public_cconstruction(disRoom: string, disShard: shardName, num: number, interval: number, boost: boolean, bodylevel?: "T0" | "T1" | "T2")
    public_OutMine(sourceRoom: string, x: number, y: number, disRoom: string, central: boolean): MissionModel
    public_PowerHarvest(disRoom: string, x: number, y: number, num: number): MissionModel
    public_DepositHarvest(disRoom: string, x: number, y: number, rType: DepositConstant, Num?: number): MissionModel
    public_red_defend(num: number, bodylevel?: "T0" | "T1" | "T2" | "T3"): MissionModel
    public_blue_defend(num: number, bodylevel?: "T0" | "T1" | "T2" | "T3"): MissionModel
    public_double_defend(num: number, bodylevel?: "T0" | "T1" | "T2" | "T3"): MissionModel
    public_squad(disRoom: string, shard: shardName, interval: number, RNum: number, ANum: number, DNum: number, HNum: number, AIONum: number, flag: string): MissionModel
    public_Double(disRoom: string, shard: shardName, CreepNum: number, cType: 'dismantle' | 'attack', interval: number): MissionModel
    public_resource_transfer(disRoom: string, resource?: ResourceConstant, num?: number, whitelist?: ResourceConstant[]): MissionModel
    public_normal(num: number, boostType: ResourceConstant | null): MissionModel

    public_Aidestroy(disRoom: string, shard: string, boost?: boolean, bodylevel?: "T0" | "T1" | "T2" | "T3")
}