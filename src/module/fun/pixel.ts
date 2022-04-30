import { AppLifecycleCallbacks } from "../framework/types"

export function pixel():void{
    if (Game.cpu.bucket >= 10000)
    {
        if (Game.shard.name != 'shard3')
        {
            Game.cpu.generatePixel()
        }
        else
        {
            let cpuUsed = Game.cpu.getUsed()
            if (cpuUsed <= 15) Game.cpu.generatePixel()
        }
    }
}

export const pixelManager:AppLifecycleCallbacks = {
    tickEnd:pixel
}