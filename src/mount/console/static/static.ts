import { Colorful, isInArray, GenerateAbility, CalculateEnergy } from "@/utils"
import { forEach, result } from "lodash"
import { allLabData, allResource } from "../control/local/resource"
import { getStore } from "../control/local/store"


/* 与资源相关的 */
export default {
    resource: {
        all(): string {
            allResource()
            return `[resource] 全局资源统计完毕!`
        },
        lab(): string {
            allLabData()
            return `[resource] lab合成信息统计完毕!`
        },
        room(roomName: string): string {
            var thisRoom = Game.rooms[roomName]
            if (!thisRoom) return `[resource] 不存在房间${roomName}`
            allResource(roomName)
            return `[resource] 房间${roomName}资源统计完毕!`
        },
        com(): string {
            let result = '压缩商品资源:\n'
            result += 'battery(wn) utrium_bar(U) lemergium_bar(L) keanium_bar(K) zynthium_bar(Z) \n'
            result += 'ghodium_melt(G) oxidant(O) reductant(H) purifier(X)\n'
            result += '基础商品资源:\n'
            result += 'wire cell alloy condensate composite crystal liquid\n'
            result += Colorful('机械商品:\n', '#f7d492', true)
            result += Colorful('tube fixtures frame hydraulics machine\n', '#f7d492', false)
            result += Colorful('生物商品:\n', '#6cf0a9', true)
            result += Colorful('phlegm tissue muscle organoid organism\n', '#6cf0a9', false)
            result += Colorful('电子商品:\n', '#4ca7e5', true)
            result += Colorful('switch transistor microchip circuit device\n', '#4ca7e5', false)
            result += Colorful('奥秘商品:\n', '#da6bf5', true)
            result += Colorful('concentrate extract spirit emanation essence\n', '#da6bf5', false)
            return result
        }
    },
    store: {
        all(): string {
            getStore()
            return `[store] 全局容量信息统计完毕!`
        },
        room(roomName: string): string {
            var thisRoom = Game.rooms[roomName]
            if (!thisRoom) return `[store] 不存在房间${roomName}`
            getStore(roomName)
            return `[store] 房间${roomName}容量信息统计完毕!`
        }
    },
    /* 任务输出调试屏蔽 */
    missionInfo: {
        ignore(name: string): string {
            if (!isInArray(Memory.ignoreMissonName, name))
                Memory.ignoreMissonName.push(name)
            return `[ignore] 已经将任务${name}添加进输出调试的忽略名单里!`
        },
        remove(name: string): string {
            if (isInArray(Memory.ignoreMissonName, name)) {
                var index = Memory.ignoreMissonName.indexOf(name)
                Memory.ignoreMissonName.splice(index, 1)
                return `[ignore] 已经将任务${name}删除出输出调试的忽略名单里!`
            }
            return `[ignore] 删除 ${name} 出调试输出忽略名单失败!`

        },
        lab(ignore: true): string {
            Memory.ignoreLab = ignore;
            if (ignore) return `[ignore] 已经禁用控制台lab输出!`
            else return `[ignore] 已经启用控制台lab输出!`
        },
    },
    /*左上角显示操作*/
    visual: {
        toggle(roomName: string): string {
            let thisRoom = Game.rooms[roomName]
            if (!thisRoom) return `[Visual] 不存在房间${roomName}`
            thisRoom.memory.Visualdisplay = !thisRoom.memory.Visualdisplay
            return `[Visual] ${thisRoom} 可视化显示${thisRoom.memory.Visualdisplay}`

        },
    },
    flag: {
        clear(): string {
            for (let flags_key in Game.flags) {
                Game.flags[flags_key].remove()
            }
            return `[Visual] 完成旗帜清理`
        }
    },
    /*房间维护开销的计算*/
    maintain: {
        cost(roomName: string): string {
            let thisRoom = Game.rooms[roomName]
            if (!thisRoom) return `[Visual] 不存在房间${roomName}`
            /*筛选出所有的道路*/
            let structures_list = thisRoom.find(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_ROAD
            })
            let road_maintain_energy = 0;
            let role_maintain_energy = 0;
            if (structures_list.length > 0) {
                let getNtowerID = Game.getObjectById(thisRoom.memory.StructureIdData.NtowerID) as StructureTower
                if (!getNtowerID) {
                    return `[Maintain]  ${thisRoom} 没有对应的维修单位!`
                }
                let from_pos = `W${getNtowerID.pos.x}N${getNtowerID.pos.y}`
                for (let Data_ of structures_list) {
                    let to_pos = `W${Data_.pos.x}N${Data_.pos.y}`
                    let _number = Game.map.getRoomLinearDistance(from_pos, to_pos)
                    /*计算healnumber*/
                    let _heal_number = 800;
                    if (_number > 5) {
                        _heal_number -= (_number - 5) * 40
                    }
                    _heal_number = _heal_number < 200 ? 200 : _heal_number;
                    /*获取偏差数值*/
                    let _loss_number = 110;
                    if (Data_.hitsMax > 20000) {
                        _loss_number = 550;
                    }
                    if (Data_.hitsMax > 700000) {
                        _loss_number = 16500;
                    }

                    let _heal = Math.ceil(_loss_number / _heal_number);
                    road_maintain_energy += _heal * 10 * 1.5
                }
            }
            /*开始统计孵化开销*/
            for (let cof in thisRoom.memory.SpawnConfig) {
                let role = thisRoom.memory.SpawnConfig[cof]
                if (role.num === 0) continue
                let bd = global.CreepBodyData[thisRoom.name][cof];
                let body = GenerateAbility(bd[0], bd[1], bd[2], bd[3], bd[4], bd[5], bd[6], bd[7])
                let energy_ = CalculateEnergy(body)
                role_maintain_energy += energy_ * role.num
            }

            /*筛选出维护塔*/
            /*计算 基于塔的维修效果*/
            return `[Maintain]  ${thisRoom} 道路维护 ${road_maintain_energy},基础孵化 ${role_maintain_energy} 300tick ${(road_maintain_energy + role_maintain_energy) / 5}`
        }

    },

    pixel: {
        //开关搓像素
        switch(): string {
            Memory.StopPixel = !Memory.StopPixel
            return `[pixel] 自动搓像素改为${!Memory.StopPixel}`
        },
        //自动买像素
        buy(num: number, price: number, unit: number = 1, floor?: number): string {
            //查找现有订单
            let buyOrder: string;
            for (let i in Game.market.orders) {
                let order = Game.market.getOrderById(i);
                if (order.resourceType === PIXEL && order.type === ORDER_BUY) {
                    buyOrder = order.id;
                    break;
                }
            }
            Memory.pixelInfo.buy.price = price;
            Memory.pixelInfo.buy.unit = unit;
            Memory.pixelInfo.buy.floor = floor ? floor : 0;
            if (!Game.market.getOrderById(buyOrder)) {
                //创建新订单
                Memory.pixelInfo.buy.num = num - unit;
                Game.market.createOrder({type: ORDER_BUY, resourceType: PIXEL, price: price, totalAmount: unit});
                return `[Pixel] 创建像素购买订单!数量${num},价格${price},单位${unit},下限${floor}`
            } else {
                //更改现有订单
                Memory.pixelInfo.buy.num += num - unit;
                Game.market.changeOrderPrice(buyOrder, price);
                return `[Pixel] 追加像素购买订单!数量${num},价格${price},单位${unit},下限${floor}`
            }
        },
        //自动卖像素
        sell(num: number, price: number, unit: number = 1, ceil?: number): string {
            //查找现有订单
            let sellOrder: string;
            for (let i in Game.market.orders) {
                let order = Game.market.getOrderById(i);
                if (order.resourceType === PIXEL && order.type === ORDER_SELL) {
                    sellOrder = order.id;
                    break;
                }
            }
            Memory.pixelInfo.sell.price = price;
            Memory.pixelInfo.sell.unit = unit;
            Memory.pixelInfo.sell.ceil = ceil ? ceil : 0;
            if (!Game.market.getOrderById(sellOrder)) {
                //创建新订单
                Memory.pixelInfo.sell.num = num - unit;
                Game.market.createOrder({type: ORDER_SELL, resourceType: PIXEL, price: price, totalAmount: 1});
                return `[Pixel] 创建像素出售订单!数量${num},价格${price},单位${unit},上限${ceil}`
            } else {
                //更改现有订单
                Memory.pixelInfo.sell.num += num - unit;
                Game.market.changeOrderPrice(sellOrder, price);
                return `[Pixel] 追加像素出售订单!数量${num},价格${price},单位${unit},上限${ceil}`
            }
        },
        cancel(type: 'buy' | 'sell'): string {
            let cancelAmount = 0;
            for (let i in Game.market.orders) {
                let order = Game.market.getOrderById(i);
                if (order.resourceType === PIXEL && order.type === type) {
                    if (Game.market.cancelOrder(order.id) === OK) {
                        cancelAmount++;
                    } 
                }
            }
            if (type === 'buy') {
                Memory.pixelInfo.buy.num = 0;
            } else {
                Memory.pixelInfo.sell.num = 0;
            }
            return `[Pixel] 已取消${cancelAmount}个${type}订单!`
        }
    },
}