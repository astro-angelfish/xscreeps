export const t3: ResourceConstant[] = ['XKH2O', 'XKHO2', 'XZH2O', 'XZHO2', 'XGH2O', 'XGHO2', 'XLHO2', 'XLH2O', 'XUH2O', 'XUHO2']
export const t2: ResourceConstant[] = ['KH2O', 'KHO2', 'ZH2O', 'ZHO2', 'GH2O', 'GHO2', 'LHO2', 'LH2O', 'UH2O', 'UHO2']
export const t1: ResourceConstant[] = ['KH', 'KO', 'GH', 'GO', 'LH', 'LO', 'ZO', 'ZH', 'UH', 'UO']

interface labRawMap {
    [mykey: string]: { raw1: ResourceConstant, raw2: ResourceConstant }
}

interface LabRawLevel {
    [mykey: string]: number
}
// lab合成相关常量信息
export const LabMap: labRawMap = {
    // 基本元素
    'OH': { raw1: 'H', raw2: 'O' },
    'ZK': { raw1: 'Z', raw2: 'K' },
    'UL': { raw1: 'U', raw2: 'L' },
    'G': { raw1: 'ZK', raw2: 'UL' },
    'GH': { raw1: 'G', raw2: 'H' },
    'GH2O': { raw1: 'GH', raw2: 'OH' },
    'XGH2O': { raw1: 'GH2O', raw2: 'X' },
    'ZO': { raw1: 'Z', raw2: 'O' },
    'ZHO2': { raw1: 'ZO', raw2: 'OH' },
    'XZHO2': { raw1: 'ZHO2', raw2: 'X' },
    'UH': { raw1: 'U', raw2: 'H' },
    'UH2O': { raw1: 'UH', raw2: 'OH' },
    'XUH2O': { raw1: 'UH2O', raw2: 'X' },
    'KH': { raw1: 'K', raw2: 'H' },
    'KH2O': { raw1: 'KH', raw2: 'OH' },
    'XKH2O': { raw1: 'KH2O', raw2: 'X' },
    'KO': { raw1: 'K', raw2: 'O' },
    'KHO2': { raw1: 'KO', raw2: 'OH' },
    'XKHO2': { raw1: 'KHO2', raw2: 'X' },
    'LH': { raw1: 'L', raw2: 'H' },
    'LH2O': { raw1: 'LH', raw2: 'OH' },
    'XLH2O': { raw1: 'LH2O', raw2: 'X' },
    'LO': { raw1: 'L', raw2: 'O' },
    'LHO2': { raw1: 'LO', raw2: 'OH' },
    'XLHO2': { raw1: 'LHO2', raw2: 'X' },
    'GO': { raw1: 'G', raw2: 'O' },
    'GHO2': { raw1: 'GO', raw2: 'OH' },
    'XGHO2': { raw1: 'GHO2', raw2: 'X' },
    'ZH': { raw1: 'Z', raw2: 'H' },
    'ZH2O': { raw1: 'ZH', raw2: 'OH' },
    'XZH2O': { raw1: 'ZH2O', raw2: 'X' },
    'UO': { raw1: 'U', raw2: 'O' },
    'UHO2': { raw1: 'UO', raw2: 'OH' },
    'XUHO2': { raw1: 'UHO2', raw2: 'X' },
}

// lab合成自动规划等级
export const LabLevel: LabRawLevel = {

    'ZK': 1,
    'UL': 1,

    'G': 2,

    'UH': 3,
    'UO': 3,
    'KH': 3,
    'KO': 3,
    'LH': 3,
    'LO': 3,
    'OH': 3,
    'ZO': 3,
    'ZH': 3,
    'GH': 3,
    'GO': 3,

    'LHO2': 4,
    'LH2O': 4,
    'GH2O': 4,
    'GHO2': 4,
    'KH2O': 4,
    'KHO2': 4,
    'ZH2O': 4,
    'ZHO2': 4,
    'UH2O': 4,
    'UHO2': 4,

    'XLHO2': 5,
    'XLH2O': 5,
    'XUH2O': 5,
    'XUHO2': 5,
    'XZH2O': 5,
    'XZHO2': 5,
    'XKH2O': 5,
    'XKHO2': 5,
    'XGH2O': 5,
    'XGHO2': 5,
}

// 化合物合成顺序 映射
export const ResourceMapData: { source: ResourceConstant, dis: ResourceConstant, map: ResourceConstant[] }[] = [
    /*  */
    { source: 'ZK', dis: 'G', map: [] },
    { source: 'ZK', dis: 'GH2O', map: ['G', 'GH',] },
    { source: 'ZK', dis: 'GHO2', map: ['G', 'GO'] },
    { source: 'ZK', dis: 'XGH2O', map: ['G', 'GH', 'GH2O'] },
    { source: 'ZK', dis: 'XGHO2', map: ['G', 'GO', 'GHO2'] },
    { source: 'G', dis: 'GH2O', map: [] },
    { source: 'G', dis: 'XGH2O', map: ['GH2O', 'GH'] },
    { source: 'G', dis: 'GHO2', map: [] },
    { source: 'G', dis: 'XGHO2', map: ['GHO2', 'GO'] },
    { source: 'GO', dis: 'GHO2', map: [] },
    { source: 'GO', dis: 'XGHO2', map: ['GHO2'] },
    { source: 'GH', dis: 'GH2O', map: [] },
    { source: 'GH', dis: 'XGH2O', map: ['GH2O'] },
    { source: 'GHO2', dis: 'XGHO2', map: [] },
    { source: 'GH2O', dis: 'XGH2O', map: [] },
    { source: 'UL', dis: 'G', map: [] },
    { source: 'UL', dis: 'GH2O', map: ['G', 'GH',] },
    { source: 'UL', dis: 'GHO2', map: ['G', 'GO',] },
    { source: 'UL', dis: 'XGH2O', map: ['G', 'GH', 'GH2O'] },
    { source: 'UL', dis: 'XGHO2', map: ['G', 'GO', 'GHO2'] },
    { source: 'UH', dis: 'UH2O', map: [] },
    { source: 'UH', dis: 'XUH2O', map: ['UH2O',] },
    { source: 'UH2O', dis: 'XUH2O', map: [] },
    { source: 'UO', dis: 'UHO2', map: [] },
    { source: 'UO', dis: 'XUHO2', map: ['UHO2',] },
    { source: 'UHO2', dis: 'XUHO2', map: [] },
    { source: 'KH', dis: 'KH2O', map: [] },
    { source: 'KH', dis: 'XKH2O', map: ['KH2O'] },
    { source: 'KH2O', dis: 'XKH2O', map: [] },
    { source: 'KO', dis: 'KHO2', map: [] },
    { source: 'KO', dis: 'XKHO2', map: ['KHO2',] },
    { source: 'KHO2', dis: 'XKHO2', map: [] },
    { source: 'LH', dis: 'LH2O', map: [] },
    { source: 'LH', dis: 'XLH2O', map: ['LH2O'] },
    { source: 'LH2O', dis: 'XLH2O', map: [] },
    { source: 'LO', dis: 'LHO2', map: [] },
    { source: 'LO', dis: 'XLHO2', map: ['LHO2'] },
    { source: 'LHO2', dis: 'XLHO2', map: [] },
    { source: 'ZH', dis: 'ZH2O', map: [] },
    { source: 'ZH', dis: 'XZH2O', map: ['ZH2O'] },
    { source: 'ZH2O', dis: 'XZH2O', map: [] },
    { source: 'ZO', dis: 'ZHO2', map: [] },
    { source: 'ZO', dis: 'XZHO2', map: ['ZHO2'] },
    { source: 'ZHO2', dis: 'XZHO2', map: [] },
    { source: 'OH', dis: 'GH2O', map: [] },
    { source: 'OH', dis: 'GHO2', map: [] },
    { source: 'OH', dis: 'XGH2O', map: ['GH2O'] },
    { source: 'OH', dis: 'XGHO2', map: ['GHO2'] },
    { source: 'OH', dis: 'UH2O', map: [] },
    { source: 'OH', dis: 'XUH2O', map: ['UH2O'] },
    { source: 'OH', dis: 'UHO2', map: [] },
    { source: 'OH', dis: 'XUHO2', map: ['UHO2'] },
    { source: 'OH', dis: 'LH2O', map: [] },
    { source: 'OH', dis: 'XLH2O', map: ['LH2O'] },
    { source: 'OH', dis: 'LHO2', map: [] },
    { source: 'OH', dis: 'XLHO2', map: ['LHO2'] },
    { source: 'OH', dis: 'KH2O', map: [] },
    { source: 'OH', dis: 'XKH2O', map: ['KH2O'] },
    { source: 'OH', dis: 'KHO2', map: [] },
    { source: 'OH', dis: 'XKHO2', map: ['KHO2'] },
    { source: 'OH', dis: 'ZH2O', map: [] },
    { source: 'OH', dis: 'XZH2O', map: ['ZH2O'] },
    { source: 'OH', dis: 'ZHO2', map: [] },
    { source: 'OH', dis: 'XZHO2', map: ['ZHO2'] },
]

// 化合物合成规划数据
export const resourceComDispatch = {
    'G': ['ZK', 'UL', 'G'],
    'UH': ['UH'],
    'UH2O': ['UH', 'OH', 'UH2O'],
    'XUH2O': ['UH', 'OH', 'UH2O', 'XUH2O'],
    'UO': ['UO'],
    'UHO2': ['UO', 'OH', 'UHO2'],
    'XUHO2': ['UO', 'OH', 'UHO2', 'XUHO2'],
    'GH': ['ZK', 'UL', 'G', 'GH'],
    'GH2O': ['ZK', 'UL', 'G', 'GH', 'OH', 'GH2O'],
    'XGH2O': ['ZK', 'UL', 'G', 'GH', 'OH', 'GH2O', 'XGH2O'],
    'GO': ['ZK', 'UL', 'G', , 'GO'],
    'GHO2': ['ZK', 'UL', 'G', 'GO', 'OH', 'GHO2'],
    'XGHO2': ['ZK', 'UL', 'G', 'GO', 'OH', 'GHO2', 'XGHO2'],
    'LH': ['LH'],
    'LH2O': ['LH', 'LH2O'],
    'XLH2O': ['LH', 'OH', 'LH2O', 'XLH2O'],
    'LO': ['LO'],
    'LHO2': ['LO', 'OH', 'LHO2'],
    'XLHO2': ['LO', 'OH', 'LHO2', 'XLHO2'],
    'KH': ['KH'],
    'KH2O': ['KH', 'OH', 'KH2O'],
    'XKH2O': ['KH', 'OH', 'KH2O', 'XKH2O'],
    'KO': ['KO'],
    'KHO2': ['KO', 'OH', 'KHO2'],
    'XKHO2': ['KO', 'OH', 'KHO2', 'XKHO2'],
    'ZH': ['ZH'],
    'ZH2O': ['ZH', 'OH', 'ZH2O'],
    'XZH2O': ['ZH', 'OH', 'ZH2O', 'XZH2O'],
    'ZO': ['ZO'],
    'ZHO2': ['ZO', 'OH', 'ZHO2'],
    'XZHO2': ['ZO', 'OH', 'ZHO2', 'XZHO2'],
    'UL': ['UL'],
    'ZK': ['ZK'],
    'OH': ['OH']
}

export const CompoundColor = {
    'L': '#6cf0a9',
    'LH': '#6cf0a9',
    'LHO2': '#6cf0a9',
    'XLHO2': '#6cf0a9',
    'LH2O': '#6cf0a9',
    'LO': '#6cf0a9',
    'XLH2O': '#6cf0a9',
    'U': '#4ca7e5',
    'UH': '#4ca7e5',
    'UO': '#4ca7e5',
    'UH2O': '#4ca7e5',
    'UHO2': '#4ca7e5',
    'XUH2O': '#4ca7e5',
    'XUHO2': '#4ca7e5',
    'Z': '#f7d492',
    'ZO': '#f7d492',
    'ZH': '#f7d492',
    'ZH2O': '#f7d492',
    'ZHO2': '#f7d492',
    'XZH2O': '#f7d492',
    'XZHO2': '#f7d492',
    'K': '#da6Bf5',
    'KH': '#da6Bf5',
    'KO': '#da6Bf5',
    'KH2O': '#da6Bf5',
    'KHO2': '#da6Bf5',
    'XKH2O': '#da6Bf5',
    'XKHO2': '#da6Bf5',
    'G': '#d9d6c3',
    'GH': '#d9d6c3',
    'GO': '#d9d6c3',
    'GH2O': '#d9d6c3',
    'GHO2': '#d9d6c3',
    'XGH2O': '#d9d6c3',
    'XGHO2': '#d9d6c3',
    'X': '#aa2116',
    'ZK': '#74787c',
    'UL': '#7c8577'
}

export const zipMap = {
    'energy': RESOURCE_BATTERY,
    'L': 'lemergium_bar',
    'Z': 'zynthium_bar',
    'K': 'keanium_bar',
    'U': 'utrium_bar',
    'G': 'ghodium_melt',
    'O': 'oxidant',
    'H': 'reductant',
    'X': 'purifier',
}

export const unzipMap = {
    'battery': RESOURCE_ENERGY,
    'lemergium_bar': RESOURCE_LEMERGIUM,
    'zynthium_bar': RESOURCE_ZYNTHIUM,
    'keanium_bar': RESOURCE_KEANIUM,
    'utrium_bar': RESOURCE_UTRIUM,
    'ghodium_melt': RESOURCE_GHODIUM,
    'oxidant': RESOURCE_OXYGEN,
    'reductant': RESOURCE_HYDROGEN,
    'purifier': RESOURCE_CATALYST,
}
interface AutomarketData {
    [resourceType: string]: {
        max: number,/*系统需要进行默认值的配置,支持通过订单传入更高优先级的价格上限*/
        time?: number,/*默认的扫描间隔为200t,支持固定间隔或者在订单传入*/
        Atype?: 1 | 2, /*Atype 类型描述 当前类型为必要,但是允许通过订单传入而非固定值 1 最高价 2 价格提升*/
        Aincrease?: number/*Atype类型为2的情况下需要次参数作为竞价幅度*/
    }
}

/*market-Buy-Auto类型处理*/
export const AutomarketBuydata: AutomarketData = {
    'metal': { max: 200 },/*紫色基础*/
    'alloy': { max: 500 },/*紫色加工*/
    'ops': { max: 30 },
    'O': { max: 20 },
    'H': { max: 20 },
    'Z': { max: 20 },
    'L': { max: 20 },
    'U': { max: 20 },
    'K': { max: 20 },
    'X': { max: 20 },
    'utrium_bar': { max: 20 },
    'lemergium_bar': { max: 20 },
    'zynthium_bar': { max: 20 },
    'keanium_bar': { max: 20 },
    'ghodium_melt': { max: 20 },
    'oxidant': { max: 20 },
    'reductant': { max: 20 },
    'purifier': { max: 20 },
    'power': { max: 200 }
}