/**
 * 任务相关声明
 */
interface Creep{
    ManageMisson():void

    // 任务
    handle_feed():void
    handle_carry():void
    handle_Carryshard():void
    handle_carrygleaner():void
    handle_carryenergysupply():void
    handle_carrymine():void
    handle_repair():void
    handle_planC():void
    handle_dismantle():void
    handle_quickRush():void
    handle_expand():void
    handle_support():void
    handle_control():void
    handle_helpBuild():void
    handle_helpUpgrade():void
    handle_helpRepair():void
    handle_sign():void
    handle_aio():void
    handle_cconstruction():void
    handle_mineral():void
    handle_outmine():void
    handle_power():void
    handle_deposit():void
    handle_defend_attack():void
    handle_defend_range():void
    handle_defend_double():void
    handle_task_squard():void
    handle_double():void
    handle_aisentry():void
}

interface CreepMemory{
    MissionData?:any
    double?:string  // 双人小队
    captain?:boolean
    swith?:boolean
    disPos?:string
    num?:number
    bindpoint?:string
    tick?:number
    controlledBySquardFrame?:boolean
    squad?:Squad
    arrived?:boolean
    targetFlag?:string
    Extensions_id?:string
    transfercreep?:string,
    creeptime?:number,
    arrive?:number,
    carsourceid?:string/*外矿专用-能量矿ID*/
    readystate?:boolean,
    deathcreep?:string,
    arrivestate?:boolean,
    hitsinjured?:number,/*血量的受伤信息*/
}


