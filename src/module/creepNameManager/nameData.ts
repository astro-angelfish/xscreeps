type nameDataFormat = {
    [key: string]: {
        peace: string[],
        war: string[]
    }
}

/**
 * 名字数据(包括可以说的话)
 */
export const nameData: nameDataFormat = {
    '胡桃': {
        // 日常语音
        peace: [
            '不如去我那喝杯茶？嘿嘿~', '一个客户，两个客户，三个客户', '哎呀,麻烦啦…', '咳咳太阳出来我晒太阳', '月亮出来我晒月亮咯', '打雷啦！起身啦！', '哇！！！是雪！！！', '嗯…真舒服', '啊!帽子都要吹飞了…', '嗯~早起身体好', '晚睡人会飘~', '哟!中午好呀!吃了嘛?', '嘿嘿嘿，月亮出来咯，咱也出来了！', '喔，困了吗？那你好好休息，我一个人四处转转',
            '胡桃的胡，是胡吃海喝的。胡桃的桃，却不是淘气的桃！哈哈哈哈哈…嗯？不好笑嘛', '变个戏法给你看，瞧好咯…火！然后…芜湖~火蝴蝶！飞吧！', '你到处旅行，一定见多识广。有空，也给我讲讲你自己的故事吧？', '需要帮手嘛？需要帮手嘛？我来啦！若你需要帮助，胡桃我定当全力以赴，绝不推辞！', '神之眼…神之眼？嗯…这东西，随缘就好',
            '哦呀？哦呀呀？', '大丘丘病了，二丘丘瞧~三丘丘买药，四丘丘熬~五丘丘死了，六丘丘抬！', '小巷派暗黑打油诗人，正是本人~', '天青海阔，皓月凌空。此情此景正适合作诗一首。', '哎，真想找些新乐子，无所事事比死亡可怕多了', '啦啦啦啦~ 吃水煮鱼配虾饺啦~',
        ],
        // 战时语音
        war: [
            '喝！', '起！', '散！', '吃饱喝饱，一路走好！', '再会啦！', '蝶火燎原！', '嚯——！', '走~', '咻~', '噫——！', '糟糕！', '到我了吗…', '我记…仇…', '呃啊——', '干嘛呀！', '哦？该我出马了？', '你很有眼光嘛！', '一波送走，全送走！'
        ],
    },
    '刻晴': {
        peace: [
            '耽误太多时间，事情可就做不完了', '劳逸结合是不错，但也别放松过头。', '无论是冒险还是做生意，机会都稍纵即逝。', '好大的雨…真耽误事。所以说他们的工作，明明昨天就能做完，为什么要拖到今天？', '没关系，继续前进吧。这种程度的雪，算不了什么。', '啊…天气真好，工作又正好告一段落，要不要…去逛逛街呢？', '夜幕降临，灯火初上。嗯——又是安宁祥和的一天呢。',
            '祝你好梦。我吗？…嗯，还有十来件事要处理，做完就能休息了。', '在你看来，支撑璃月走过千年，最重要的东西是什么？', '心有所向，日复一日，必有精进。', '很好，在需要随机应变的时候，又多了一种选择。', '能和你一路结伴而行，我感觉受益匪浅。如果真的有一天，我抵达了理想中的终点，我的身边，还会有你陪伴吗？'
        ],
        war: [
            '去吧！', '迅影如剑！', '可别眨眼。', '喝啊——！', '嘿！', '哈！', '无处可逃！', '剑出，影随——', '剑光如我，斩尽芜杂！', '以退为进…', '调整战略吧。', '时机…不对。', '太不甘心了…', '辜负了…期待。', '唔…可恶。', '小伤而已。', '只是巧合…', '走吧，时间紧迫。', '是突发事件吗？', '速战速决。'
        ]
    },
    '甘雨': {
        peace: [
            '安逸的氛围…喜欢。', '趴在草地上，能听见大地的心跳', '工作…工作还没有做完…真的可以提前休息吗？', '嗯？天晴了吗？是什么时候…', '嗯。空气很适宜。', '啊，琉璃百合的味道，真好啊…', '早上好…唔？是哪里没有梳理好吗，请不要盯着我的…盯着我的头饰看。', '愿帝君保佑你', '饮必甘露，食必嘉禾。', '力量？…真是久违了。', '如果…可以用和平的方式解决。不，没什么…', '这就是新的生活之道吧…我明白了，我不会抱怨的。'
        ],
        war: [
            '禁止接触。', '闲人勿扰。', '霜寒化生。', '风雪的缩影。', '如琉璃般飘落。', '这项工作，该划掉了。', '为了岩王帝君！', '下一项工作是…', '我会跟上的…', '运动，是必要的…', '…是我久疏战场。', '欸？好像弄砸了？', '需要…补充能量。', '帝君…对不起…', '「契约」…尚未完成…', '我得…再撑一会…', '疏忽了…'
        ]
    },
    '神子': {
        peace: [
            '很多人的一生，写于纸上也不过几行，大多都是些无聊的故事', '嗯~伤脑筋，中午吃些什么呢？', '嗯~伤脑筋，中午吃些什么呢？', '现在的巫女，一个比一个可爱', '明明生命短暂，却能散发映昼光辉', '随我一同去月下漫步吧，不许拒绝。'
        ],
        war: [
            '律令。', '咒禁。', '敕！', '显化。', '留形。', '真瞳显现！', '雷霆侘寂！', '雷光凄美啊。', '这样下去可不行啊。', '可不能再玩下去了。', '好了，要认真一些了哦。', '哎呀，玩过头了…', '结局真是糟糕啊…', '止步于此，何谈永恒…', '就这样？', '真是麻烦。', '这时候想起我了？'
        ]
    },
    '凌人': {
        peace: [
            '暗线已经布置妥当，嗯，差不多该收网了…', '暂且先避下雨吧，不必着急，很快就会有人来送伞了。', '如今的雪景，与多年前的那场雪…并无二致。', '既然在这个时间点找我，不如留下来吃晚饭吧。', '能力提高了？呵，那可真是好事。', '力量这种东西，果然只有掌握在自己手中，才能安心。', '坐上家主之位以后，我少有松懈的时刻。有你在旁的这段日子，却有些奇妙。嗯…就好像在晒太阳一样吧。'
        ],
        war: [
            '苍流水影。', '剑影。', '秋水三尺。', '呵…安息吧。', '神里流…水囿！', '那么，我也认真起来吧。', '不知鹿死谁手呢？', '百密终是有一疏么…', '花无百日红…', '世事无常…', '不过如此。', '不自量力…', '哦？是邀请我去散步吗？'
        ]
    },
    '五郎': {
        peace: [
            '枕戈坐甲，才能应对变数。', '难得没有战事，来场体能训练吧！', '尾巴湿了…找堆篝火烤一烤吧。', '有敌情吗！', '晒太阳虽好，士气却不能松懈啊。', '晨练时间到了，要和我一起去登山吗？', '强大的力量，是为了保护同伴。', '要保护同伴，不能只是被动防守，必须积极进攻。', '攻夺胜利的要领，是牢记战斗的意义，遵循正确的战法，拿出锐不可当的气势。', '有了锐不可当的气势，与战友们紧密配合，方可无往不胜。谢谢你的指点！这是属于你我二人共同的胜利。'
        ],
        war: [
            '进军！', '强攻！', '结阵！', '随我出征！', '势如破竹！', '兵贵先声！', '今日运势不错！', '我还能战斗！', '没到认输的时候！', '兵败了…', '海祇岛的…大家…', '全军…撤退…', '不痛不痒！', '整装待发！', '准备进军！', '行兵列阵！'
        ]
    },
    '申鹤': {
        peace: [
            '回向正道，保身护命...', '刀枪无眼，红绳的力量也有极限，所以我才不喜欢人多的地方。', '按照凡人的做法，这种时候，是否应该…撑伞？', '早安。晨露很甜，要分一点给你吗？', '若是午后困乏，不妨试试打坐养神，很有效果。', '放心休息吧，我睡眠很浅，有什么动静，我会替你查看的。', '邪祟易驱，心魔难除。若自身无法放下执念，仙法与术式都无从挽回。', '我能操控的力量…愈发强大了。', '	师父若知道了，怕是会让我多系几根红绳吧…', '心无杂念，方可超然'
        ],
        war: [
            '听令！', '显！', '魂出！', '炼气化神！', '意生冰身！', '付君真形！', '天真敕奏！', '寒冰变神！', '依律奉行！', '休要怪我…', '我不甘心…', '必须…诛除！', '难逃…宿命…', '死丧既定…', '劫煞为灾…', '不成气候。', '休想！', '别后悔！'
        ]
    },
    '云堇': {
        peace: [
            '不勒头，不画脸，今天乐得清闲。', '云婵娟来花婵娟，风流尽在山水间。', '喂呀，冻煞我了。', '暖阳和煦，真是好风光啊。', '夜里寒气重，早点歇息，晚安。', '业精于勤而荒于嬉', '勤学苦练至今，总算是有了些成果。'
        ],
        war: [
            '着！', '崩！', '旗来！', '飞云旗！', '看枪！', '听我号令！', '戮力同心！', '一鼓作气！', '别把裙子弄坏了…', '得重整旗鼓才行。', '哼，好戏在后面。', '哼，好戏在后面。', '罢了…', '没办法…唱下去了…', '要沉住气…', '有点狼狈…', '下手好重…', '今天该唱哪出呢？'
        ]
    },
    '优菈': {
        peace: [
            '西风剑术？想和我学两手吗？等你学成再找你报仇，想必能增添不少乐趣。', '快到伞下来，别被淋湿了。要是你得了病，身体早早就垮掉，那我找谁报仇去？', '麻烦的天气，雷声会干扰听觉，影响我对周边的感知。', '不错，以我现在的实力，哪怕和代理团长一较高下，也十拿九稳了！', '凉爽的事，我都很中意。', '浓郁的汤品，我实在不能接受。'
        ],
        war: [
            '求饶吧。', '结霜！', '粉化！', '判决！', '破碎！', '以眼还眼！', '冰浪怒涛！', '以霜还怨！', '坚冰，断绝深仇！', '加快脚步。', '开战不利…', '要正式接敌了…', '不赖嘛！', '狼狈的收场…', '我还能…撑住…', '罪人的结局吗…', '游击骑士，率先行动。'
        ]
    },
    '阿贝多': {
        peace: [
            '风景不错，趁着休息，就把这一幕画下来吧。', '「世界的真相」…究竟是什么呢？', '光线充足，生物行为活跃，嗯，很适合写生。', '午安，我听到了你的脚步声', '外面安静下来了，呼。', '天才？…不少人这么称呼我。其实，我不这样认为。', '「黑土」，是炼金术的词源，也是最初的状态。活在这个世界上，我等俗类必须寻找意义。', '「白垩」，即是变化的开始。抽离了杂质，准备好接受一切知识。要和我一起去探索世界吗？', '「赤成」，炼金术的意思是，情感的炼化。我的赤色好像来自于你。', '「黄金」，炼金术最后的阶段。无价值的事物终于找到了自己的意义，变化成了黄金。我，也找到了意义。'
        ],
        war: [
            '绽放吧。', '拟造阳华。', '创生之法。', '此即，诞生之刻。', '冥古，于此显生。', '见证伟业吧。', '大地的秘宝。', '无言的叙事。', '计算失误…', '需要重新评估…', '必须改变策略。', '尘归尘，土归土…', '实验失败了吗？', '我的研究，结束了…', '阈值以内…', '失算了…'
        ]
    },
    '托马': {
        peace: [
            '这几天花得太多，身上只剩十摩拉了，不过幸好还有十摩拉！', '怎么突然下雨了？你没事吧？要不要用我的外套挡挡？', '别在雪地上跑哦，摔了我可不扶你。', '天气真不错啊，一起散步吧。', '嗯，晚安。你这一天也辛苦了吧。早点休息去吧，别熬夜。', '既然得到了神之眼，就得好好珍惜，我可不想把它弄丢了。', '这样就能变强吗？不是在开玩笑吧，我还有衣服没洗完呢。', '似乎…有一股火焰在我心中燃烧。', '拥有了强大的力量，要用来做什么呢？嗯…得好好考虑考虑了啊。', '谢谢你对我的信赖。你给予我的恩惠，比火焰更温暖。放心吧，我找到自己想做的事了。这份力量将化作坚盾，一直守护你。'
        ],
        war: [
            '火之盾！', '看看这个', '小心着火', '后援登场。', '护持之火！', '我来守护你。', '里面有什么好东西呢？', '惨了惨了…', '喂！有必要吗？', '嘶，有那么点疼…', '要回老家了啊…', '各位…保重。', '没能尽到…守护的职责…', '疼疼疼。', '好吧，家务待会再说。'
        ]
    },
    '公子': {
        peace: [
            '哟，伙伴！今天精神不错啊', '哈——吃的真爽。活动活动，消化一下好了。', '真是愉快的一天。明天再见，伙伴！', '	在这干站着，也不会有对手找上门的。', '哈哈哈，不知老家那边，是否也在下雪？', '啊！风中传来了纷争的气息。', '真是畅快的风！', '感觉身体和头脑，都被穿过的风洗净了。真舒畅。', '	只要能让我变强，「神之眼」也好，「邪眼」也好，师承深渊的罪人也好，都无所谓…', '喔！好像变强了一些，找谁试试好了…'
        ],
        war: [
            '要上了！', '哈！', '势如狂澜！', '来吧！', '接下来———', '呼———', '一箭止水！', '逃得掉吗！', '破绽，稍纵即逝！', '忍着点。这可是很痛的！', '兵贵神速。', '哈！有点意思。', '不赖嘛！', '生死边缘而已，我很擅长处理。', '怎能这样...得而复失...', '失手了...', '还挺...有两下子...', '嘁！大意了。', '哈，强敌何在？'
        ]
    },
    '重云': {
        peace: [
            '正午灵气极盛，可得抓紧练功。', '晚间最适静息凝神，更要抓紧练功。', '方士驱邪一靠咒术，二赖武艺。另辟蹊径亦可，但终非正道。', '驱邪缚魅，内外澄清，啊，呃…糟了，后半句口诀忘了。', '雨是无根水，是最澄净的水，对驱邪除魔大有帮助。', '大有帮助。打雷的时候…', '啊…好天气，真是舒服。', '习武与术法一样，都有境界。受你指导，我又有进益了。'
        ],
        war: [
            '剑印染冰！', '剑，出！', '急如敕令', '听我法旨。', '邪魔退去！', '宝印幻剑！', '束手伏诛吧。', '且看踏风纵云的本领。', '这等器物，有助于驱邪除魔。', '不枉你我一番劳苦！', '小伤不足挂齿。', '不能再轻敌了。', '你莫猖狂！', '还是技不如人吗…', '辱没了…方士一门…'
        ]
    },
    '凝光': {
        peace: [
            '「琉璃亭」和「新月轩」，你更常去哪一家？', '茶馆已经客满了？那就来「群玉阁」坐坐吧。只要…你付得起价钱。', '找笔新的投资吧。无论如何，摩拉都不会嫌多。', '哦？下雨了啊。替我打伞吧。', '不过是寻常雪景。我带你见见，真正的「碎雪」。', '	风平浪静？呵，不要相信你的眼睛，眼睛会说谎。', '	这样的大风天，会成为捕鱼人的灾难。也会成为…呵，没什么。', '时间和摩拉作为筹码，等价交换到「力量」吗…有趣。我认可它的价值。', '武斗」缺乏风度，只能作为下策中的下策。'
        ],
        war: [
            '雕虫小技。', '别白费功夫。', '哼，劝你放弃。', '你的性命，我收下了。', '向我臣服吧。', '永别了', '竟然敢伤我', '我记下了。', '哼。', '这世上之人，皆为棋子…', '胜负已分…真是无可奈何。', '这就是，「天权」的终焉？…', '血债血还。'
        ]
    },
    '烟绯': {
        peace: [
            '律法既是约束，也是工具，请你千万记住哦！记不住的话，我就多给你念叨两遍。', '法理与人情有时冲突，有时兼容。权衡二者，真是种学问呢。', '唔唔，居然还有这种案件…天下之大，无奇不有啊。', '这…这是什么倒霉天气，有、有点冷哦…阿嚏…', '趁着天好，背背律条', '钟离先生学识渊博，堪称行走的书库', '「不期修古，不法常可」，这句话是我必须牢记的教诲。', '唯有遵循应守之「律」，人才能获得解开一切问题的「法」。', '生日快乐，这个匣子送你'
        ],
        war: [
            '嘣嘣——', '焚烧吧！', '速速退下！', '律火，引！', '食炎之罚！', '丹书铁契！', '什么，有纰漏？', '得修正错误！', '你犯规…', '判断…失误了吗…', '律法…还有漏洞…', '我不能…接受…', '麻烦了…'
        ]
    },
    '雷神': {
        peace: [
            '徒然无事，对砚枯坐。哼。', '无人相陪，此般花鸟余情，也不过衬托我身不移不变的背景罢了。', '只是雨滴有什么麻烦的。这还没有打雷呢。', '冬将军也来了。', '雷鸣闪电，一瞬即逝。正因如此，才会想要撷取「永恒」。不，才必须掌握「永恒」。', '有什么事情，说来便是。'
        ],
        war: [
            '威光无赦！', '无处遁逃！', '泡影看破！', '无念，断绝！', '此刻，寂灭之时！', '稻光，亦是永恒！', '…枷锁当断。', '…诸恶当斩。', '…肃清阻碍。', '浮世一梦…', '无念，无执…', '雷鸣，将歇…', '无礼…', '荒谬…'
        ]
    },
    '神里': {
        peace: [
            '请多指教哦。', '像这样悠闲安稳的时光，如果再多一点就好了…我真贪心啊。', '剑，就和茶一样，细细品味才能理解其中风雅。', '刀剑抱业，名工怀宝。', '请随我一同避雨吧。', '大御所大人…是在诉说什么吗？', '雪霁银妆素，桔高映琼枝。', '风和日丽，要去哪边走走么？', '晚上好。夜风舒畅，会是一个良宵呢。', '若知是梦何须醒，不比真如一相会。', '	非常感谢。与你切磋使我受益良多，相信在剑术上也能更进一步。', '尝有所思，斯世如磐；孰料浮世事，留驻难。'
        ],
        war: [
            '起舞吧。', '失礼了。', '雪纷飞。', '…拿下了！', '樱吹雪。', '神里流…霜灭！', '久违的对手…', '不容小觑呢。', '该决断了…', '失态了…', '我还有…未竟之事…', '让家族…蒙羞了…', '无礼的家伙…'
        ]
    },
    '九条': {
        peace: [
            '只有保持心、弓、箭三位一体，才能命中正鹄。', '为将军大人实现「永恒」，这就是我的「愿望」。', '想要留住雪花。但在手心里，它只会融化得更快。', '天清气朗，适合演武', '我没有午休的习惯，但如果你想，我可以等你。', '去休息吧，这里有我看着就行。', '满意的弦音，看我一击即中。', '力量已经融入我体内，随时听命。', '我一个人，就是一支幕府军！'
        ],
        war: [
            '羽移！', '散！', '雷闪！', '常道恢弘，鸣神永恒！', '落雷…不悔！', '雷光千道！', '我会坚持到底…', '必须寻找突破点！', '快到极限了…', '生命终非永恒。', '我绝无怨言…', '哼，是我败了。', '战况不顺…'
        ]
    },
    '心海': {
        peace: [
            '我是珊瑚宫心海，海祇岛的「现人神巫女」', '雨中行军，可以隐蔽声息，但对体能却是很大的考验…', '雪…真漂亮呀', '天色真好，一起走走吧？', '嗯…这么大的风，正适合用火攻之计。', '好好休息，养精蓄锐。晚安。', '真希望这次作战快点结束', '越是情况紧迫，越要稳住心态', '我其实，并不擅长与人交流', '我虽然并不崇尚武力，但能够变强是一件好事。', '力量在不断地涌出…想必下次作战，我们可以配合得更好。', '沧海月明，潮起潮落。力量更进一步，心境也会有所不同。'
        ],
        war: [
            '帮帮忙！', '别担心。', '休养生息。', '沧海之约', '翻涌吧！', '深海的加护！', '我们走吧。', '好累…', '需要变更战术。', '谨慎为上。', '计策…出问题了吗？', '失误了…', '不会再犯同样的错误。', '失策！', '真难缠…'
        ]
    },
    '万叶': {
        peace: [
            '飘摇风雨中，带刀归来赤脚行', '既然手边有树叶，我可以为你吹奏一曲。', '在大雨中漫步，让人神志清醒。不过等雨停之后，还是尽快把衣服烤干比较好。', '飘摇风雨中，睹物思故乡，这把刀…是我与故乡唯一的联系了。', '晴空万里，真让人心情愉快。', '我喜欢下雪，雪后的世界很安静，无人来扰我清梦。', '抬头见月，侧耳听风，壶中有酒，我心太平…', '安静的世界，适合好好休息。明天见。', '找个好天气，出海看看如何？', '海上的风浪很大，我也要变得更强。', '这把刀，更加锋利了。', '雪落在地上的声音，细不可闻…但现在的我，应该可以听到了。'
        ],
        war: [
            '起！', '嘿！', '踏风！', '御风而行。', '朔风解意。', '往返自然！', '云隐…雁鸣！', '风共云行。', '可叹，落叶飘零。', '该出发了。', '呼、有一套嘛…', '静心凝神。', '保持专注！', '深感遗憾…', '下次…绝不会再…', '结束了吗…', '不要…紧。'
        ]
    },
    '早柚': {
        peace: [
            '「终末番」早柚，参上。', '呼啊…呼噜呼噜——', '工作还不如睡觉。', '什么时候才能长高呢？', '快躲雨，被雨淋到就长不高了。', '舒舒服服的好天气，啊——好困哦。', '风起之时，便是开溜的好时机。', '好困，午睡时间还没到吗？', '终于…可以睡觉了…晚…晚安…', '我有长高一点点吗？', '太好了，能溜得更快了，这下子肯定不会被抓住了。'
        ],
        war: [
            '走啦。', '溜咯。', '咕噜，哈！…嘿呀。', '极意遁走。', '抓不住我…呜。', '随风而遁…呜。', '分身之术。', '出来吧！', '嘿咻…呜。', '疾风遁术。', '头晕乎乎的。', '逃跑的话，该用…', '没能…逃掉…', '…晚、晚安了…', '不该偷懒的…'
        ]
    },
    '宵宫': {
        peace: [
            '欢迎光临「长野原」', '烟花易逝，人情长存。', '没事做的话，我来给你讲故事吧！', '你养过金鱼吗？很乖巧很可爱哦。', '哈哈，看我搓个雪球，咻——', '	呜哇，烟花要湿透了！得找地方躲躲，啊，要来不及了！', '风好大啊——声音都被吹回来啦——！', '飞得更高，炸得更响！', '邪恶退散！正义必胜！'
        ],
        war: [
            '想看烟花吗？', '点燃引信！', '小心火烛~', '祭典重现！', '金鱼来啦！', '烟花来喽！', '不妙不妙！', '出丑了啊…', '得小心起来了啊…', '一不小心就…', '玩过头了…', '祭典…结束了。'
        ]
    },
    '钟离': {
        peace: [
            '旅程总有一天会迎来终点，不必匆忙', '为「流通」而造的船，遇到港口也会停泊', '欲买桂花同载酒…只可惜故人，何日再见呢？', '嗯…不适合度假的天气。去听听戏吧。', '希望今日也有好景气。', '不以规矩，不能成方圆', '不管是常人还是仙人，惟有各司其职，方能保璃月长久太平。', '当代堂主？嗯…那孩子，我应付不来。', '	怎么，难得闲暇，不好好休息却反来找我。是想听我讲故事吗？', '力量似乎渐渐回来了。不多，但有用。'
        ],
        war: [
            '壁立千仞。', '震天撼地。', '靡坚不摧。', '俱收并蓄。', '安如磐石。', '固若金汤。', '天理长驱。', '此乃天道。', '天动万象。', '你的实力我姑且认可。', '哈，有点意思。', '不太擅长危机应对啊。', '啊，略感疲惫…', '让你看到，难堪的一面了啊。', '磐石…也会归于尘土…'
        ]
    },
    '魈': {
        peace: [
            '荒野上的孤魂，休想伤我分毫。', '…呃啊…哼，想起了一些不愉快的事。', '魔物不会因为下雨就休息。我们走', '天晴了？哼，我不关心天气。', '雪积起来之后，就可以挖着吃了。', '时候不早了。出发吧。', '午餐…回望舒客栈吧。', '夜晚，不祥之物最易骚动。你最好别出门。', '你去吧，我会在这里等你。', '如果有一天，连你也陷入了黑暗。就由我来——', '杀戮是我的强项。如果你下不去手，就叫我来。', '杏仁豆腐的味道，和「美梦」非常相似呢', '力量的尽头，是自我毁灭。回答我，为何如此执着呢？', '新的力量？这力量，也只会被用于斩杀', '只是这种程度而已。没什么值得大惊小怪的。'
        ],
        war: [
            '哼。', '无聊。', '无用。', '这里！', '无能。', '就此消失。', '靖妖傩舞。', '悲鸣吧。', '对你有用便好。', '住口。', '愚蠢。', '这是…报应吗。', '这一天…到来了呀。', '就凭你？', '听召而来。', '诸邪退散。'
        ]
    },
    '可莉': {
        peace: [
            '西风骑士团「火花骑士」，可莉，前来报到！', '哼哼哼，这次的炸弹可是防水的。', '啊！什么东西爆炸了？！…哦，是打雷啊。', '早安！带可莉出去玩吧！我们一起来冒险！', '琴团长是好人！虽然…有点可怕…', '你好！你是来找可莉玩的吗？'
        ],
        war: [
            '蹦蹦炸弹！', '弹起来吧！', '嘿咻！', '轰轰火花！', '火力全开！', '全——都可以炸完！', '啦啦啦~', '哇…怎么会这样…', '琴团长…它欺负我…', '玩累了，有点晕…', '可莉…想回家了…', '又闯祸了…', '好疼啊！'
        ]
    },
    '迪奥娜': {
        peace: [
            '哈～～好舒服，身体都变得更柔软了', '才,才没有在等你。我只是，正好在休息而已！', '唉？！…我没有在发抖！没有！…呜…', '这个凉飕飕的触感，哇…好棒,好有趣。', '猫的眼睛，看得见黑暗中的一切猎物！', '猫的四肢，爬的上全提瓦特最高的树。'
        ],
        war: [
            '嘿…呀！', '咻咻——', '目标确认。', '攻守兼备。', '抓到你了', '我可不好欺负！', '迪奥娜特调！', '贪杯的下场…哼！', '反省吧，酒鬼', '唔，来了。', '我不会认输…！', '酒的味道…好臭…', '泉水精灵…不要走…', '眼睛…睁不开了…'
        ]
    },
    '砂糖': {
        peace: [
            '那是什么？啊…不见了，我可以去看看吗！', '趁现在，赶快整理一下研究笔记…', '嗯——！好久没出来透气了。', '湿度上升，嗯…要不要再加一组实验呢？', '告诉你一个小秘密，我对谁都没有讲过', '「生物炼金」的研究，终于有突破了。', '	这次旅行，我又收集到了很多研究材料，谢谢你，我会好好利用的。'
        ],
        war: [
            '吸附力测试。', '陆叁零捌式风单元！', '确认…安全距离！', '超扩散态！', '柒伍式超级风模块！', '无相之风…拟造！', '有点，超出预想…', '不痛不痛，不痛的…', '研究…又失败了。', '还需要…调整。', '该…睡一会儿了。', '不应该啊…', '眼镜会碎掉的！'
        ]
    },
    '诺艾尔': {
        peace: [
            '只要你需要我，我随时都会出现在你的身边。', '听见了吗？是风神的声音。每到我心烦意乱的时候，听见风声就能平静下来。', '这就是…新的力量？谢谢你，这样我就能帮到更多人了。', '还不能满足，在成为正式的西风骑士之前，我都要加倍努力。'
        ],
        war: [
            '岩石的重量，令人安心。', '一定要干净利落。', '交给我吧。', '该打扫战场了。', '我会注意骑士的风度。', '我会注意女仆的礼仪。', '应该赶得上', '还有人需要帮忙。', '心满意足。', '没关系，轻伤而已。', '唔，衣服都弄脏了…', '我不会退缩的。', '让骑士团…蒙羞了…', '	我还想…保护大家…', '再见了…主人…', '唔…失态了。'
        ]
    },
    '行秋': {
        peace: [
            '「有时明月无人夜，独向昭潭制恶龙。」', '「衣裓贮文章，自言学雕虫。」', '正所谓「偷得浮生半日闲」，哈哈。', '晴了就好，不然藏书会生霉的。', '明天我也在老地方。只要你不中途迷了路，就准能找得到我。', '阁下近来可好？如果闲来无事，可以来「万文集舍」转转。', '咳，咳咳。恭祝你福寿与天齐，庆贺你生辰快乐。', '如果没有能力，那我心中的那个字，可能也就停在纸面上了吧。'
        ],
        war: [
            '雨线难画。', '裁————！', '断！', '古华神秘。', '织诗成锦。', '裁雨留虹。', '形随神至。', '该行动了。', '计划有变。', '「请从绝处，读我侠义。」', '承蒙…赐教…', '灯华易散…我是知道的。', '失手了…', '不妨事。', '大意了。'
        ]
    },
    '七七': {
        peace: [
            '我是七七，是个僵尸…啊，还要说什么来着。', '早上了吗？今天要做的是…我看看笔记', '	…忘记帮白先生分拣药材了。', '晚上好，今天…我做了什么来着…', '想去凉快点的地方。', '又忘记带伞了。', '想堆雪人…可以陪我吗？', '今天不该出门的。', '凉凉的，很舒服。', '你问我吗…？对不起，我不记得了…', '唔，听起来像老古董…'
        ],
        war: [
            '流转不息。', '生生不绝', '去。', '起。', '听诏，宣此诰命。', '真名，度厄真君。', '玉签，仙法开匣。', '要更快一点吗？', '痛。', '啊——', '要活下去…', '还会…被封印吗…', '好冷…', '不要…', '没感觉…', '居然…'
        ]
    },
    '莫娜': {
        peace: [
            '这么大的雨…不仅看不见星光，连水占盘都模糊了。', '这些落雷…究竟是从哪个星空降下的呢？', '你不是这个世界的人', '你的意思是…想要闲聊？', '命中当如此，我早已预知到了。', '虚假之天，星空下的命运早已注定。', '水中之影，涟漪中窥见启明星升起。', '…再进一步，就能找到世界的真实了吗？'
        ],
        war: [
            '水中幻愿。', '…命运的虚影。', '命运，倒映水中。', '命运，在此显现。', '命定于此。', '无法判断…', '天命既定！', '这样更能看清星空了…', '讨厌的命运…', '还没…推算到这！', '无法违抗的…命运…', '推算结束了…', '烦人。'
        ]
    },
    '菲谢尔': {
        peace: [
            '我即断罪之皇女，真名为菲谢尔', '我即断罪之皇女，真名为菲谢尔', '不知在遥远彼方的扈从…', '奥兹，我之眷属啊…', '你的深眠将平安无梦'
        ],
        war: [
            '以断罪之名！', '现身吧，奥兹！', '回应我吧！', '奥兹：又来了…', '黑之翼，屏断昼夜——', '至夜幻现！', '影之鸦，渴求幽夜——', '奥兹：一如小姐所愿！', '奥兹：至夜幻现！', '皇女的命运，不应该在此完结…！', '我将再度降临…呜…', '不敬之徒', '这个世界，也容不得本皇女吗…'
        ]
    },
    '香菱': {
        peace: [
            '嗯，闲着也是闲着，还不如一起找找食材去！', '嗯…我不太喜欢雨天。', '我想想…今天有没有晒衣服出去…', '走走走，我带你去找松茸！', '来的正好！一起去补充点食材吧？', '呼哇~！好爽！全身上下都充满了力量！', '有这种力量的话…终于可以…不好，口水要流下来了！', '大师父教我的枪法，很厉害吧？', '烤鸽子肉，来两串？哎呀~尝尝嘛'
        ],
        war: [
            '锅巴，喷火！', '热和热和嘛。', '开锅了开锅了！', '嘿…哈！', '讲不通，就打扁咯！', '见识下师父的枪法！', '跑起来跑起来！', '哎呀，疼疼疼…', '呜，今天的食材好凶啊。', '搞砸了呢…', '突然…好渴啊…', '救命啊，食材打人啦！'
        ]
    },
    '班尼特': {
        peace: [
            '这就是你的冒险团吗？真好啊…又热闹，又有人情味。', '不如在周围找找看吧，说不定有宝藏呢！', '早上好！我们今天去哪儿冒险啊？', '这样距离你就又近了一步，我会继续努力的！', '所有力量都提升了！除了运气，哈哈。', '我什么都喜欢，但最喜欢的还是冒险！'
        ],
        war: [
            '哈——', '烧起来吧！', '上天去吧！', '喝啊！', '炸飞你们！', '都闪开！', '我来保护大家！', '该总攻击了！', '有大家在身边，伤口就不会痛！', '冒险、冒险！', '好，出发！', '是货真价实的宝藏！', '简直是奇迹！', '别担心…我坚持得住。', '绝地反击？这个我熟，让我来吧。', '不出意料的…坏运气…', '没能突破…厄运的封锁…', '痛死了。'
        ]
    },
    '北斗': {
        peace: [
            '想切磋的话，我随时奉陪。', '啊——干完活，喝口酒。真畅快。', '喂，打雷而已。在海上不用怕，在陆地上，就更不用怕了。', '这天气，很适合出航啊。', '注意扬起来的风沙，别揉眼睛。', '哟，早。我准备出发了，一起来？', '这时间过得可真快。去吧，一帆风顺', '航海准备，兄弟们，各就各位，全新的冒险要开始了！', '痛快！又变强了不少！', '好样的，有你这种得力的兄弟，是我北斗的荣光！我也不能让你小瞧了啊。', '这满载而归的滋味，开瓶美酒来庆祝吧！'
        ],
        war: [
            '闪开！', '哈！', '悉数奉还！', '接下吧！', '——喝啊！', '这是斩灭「海山」的力量！', '给我瞧好了！', '化作焦炭吧！', '哟，真让人开心。', '还没完呢！', '哼，我来精神了。', '我绝不屈服。', '糟透了', '兄弟们…先…撤…', '全员…归航…', '区区小伤。'
        ]
    },
    '安柏': {
        peace: [
            '侦察骑士安柏，前来报到！', '好想跑一会儿步呀', '下雨了…蝴蝶结会淋湿的', '下雨了啊…视野会有影响，要小心哦。', '唔哇~天气真好。', '嗯…要是风大点就好了。', '真舒服呀…', '早上好哟！要不要一起晨跑？', '天黑了，要我点个火把吗？', '蒙德城的飞行冠军，就是我啦！', '就算是你，比赛我也不会放水！', '哇！像乘着风一样轻快~', '现在的速度，没有人能追得上了吧！'
        ],
        war: [
            '靠你咯。', '兔兔伯爵，出击！', '哼哼~哼哼哼~', '百发百中！', '箭如…雨下！', '你没有退路了！', '跑累了…', '好痛…这家伙…', '…我可不会认输！', '交给我吧！', '来比赛吧！'
        ]
    },
    '凯亚': {
        peace: [
            '没想到你也知道忙里偷闲。', '这雨天里，冰冻的力量会更强吧，有趣。', '怎么，你怕冷？', '呼…趁着这雪天，跟你讲一个鬼故事吧。', '真是和平啊，可又能持续多久呢？', '享受这一天吧。', '你该不会怕黑吧？哦？那我…可找到新素材了。', '这就要走了吗。那就下回见了，别让我等太久啊。', '哦？代理团长大人，你可要多多支持她。', '嚯，你也有两下子嘛。', '你好像一直都很照顾我嘛。谢啦。', '力量又增强了啊…我说，你那是什么眼神，怎么感觉比我还兴奋。'
        ],
        war: [
            '老实点！', '冻结吧！', '这个如何？', '小心着凉。', '抱歉哦。', '真是急性子啊你。', '呼，哈哈。', '起风了。', '运气还不错！', '挺有趣的。', '哈哈，真有乐子。', '看来该认真了。', '似乎变得无聊了…', '麻烦的家伙…', '太难看了…', '还没尽…兴…'
        ]
    },
    '琴': {
        peace: [
            '「蒲公英骑士」，琴，申请入队', '行动起来吧，我们不该在这里停留。', '骑士团的大家…有没有认真工作呢？', '走吧，前往下一个目标！', '这样的天气，正适合行动。', '舒适的天气。', '一日之计在于晨', '好，现在开始处理任务吧。', '我以此剑起誓，必将胜利献给你', '丽莎，有她在的话，我会安心很多。', '蒲公英，蒲公英，跟风一起，到远方去吧。', '优秀的骑士不能挑食。', '只要风不停歇，我就不会停下脚步。', '我做得还不够好。自从与你相遇，一直承蒙你的关照。这份感激…'
        ],
        war: [
            '一决胜负！', '…哈！', '…散！', '风，回应我吧。', '以剑为誓！', '风之神，请指引我们。', '我，没事…！', '还有同伴…需要保护…', '还不能放弃…', '蒙德…', '个人的力量是有极限的…', '我…还不够称职…', '这点伤而已！'
        ]
    },
    '丽莎': {
        peace: [
            '啊…早安，琴。嗯？不好意思，我看错了。', '午休时间到了…', '你还不睡吗？我已经困了呢…', '该不会想让我加班吧…那可不好哦。', '锻炼的机会，应该多留给新人，不是吗？', '芭芭拉的歌，你听过么？'
        ],
        war: [
            '哼哼。', '该电一电了。', '别逃哟。', '…Blitz！', '这是…惩罚哦！', '…呵呵~', '酥酥麻麻的哟。', '快点投降吧。', '可别上瘾喔。', '有你的嘛。', '有点生疏了呀…', '哎呀，手套要破了呢。', '出门好累…', '看来我大意了呢…', '不要那么粗暴。', '让姐姐帮帮你吧。'
        ]
    },
    '芭芭拉': {
        peace: [
            '再这样站下去，会…想睡觉的…', '这样淋着不要紧吗？会感冒的吧？', '欸！是雪花欸！冰冰凉凉的~！', '放心，我不会被吹走的！', '早安~今天也要加油呀。', '辛苦了！请好好休息吧。', '是大家脸上的笑容，一直在支持我。', '我不太喜欢苦的东西，特别是…苦瓜。', '芭芭拉的舞步…治愈力UP！', '谢谢你的支持~啊，不好，好像有点太激动了…心脏怦怦跳个不停。'
        ],
        war: [
            '我会保护大家！', '打起精神来哟！', '演唱，开始！', '♪哼哼~哼哼哼~', '准备好了吗~', '大家加油喔！', '芭芭拉，冲呀！', '呼…呼…没问题！', '能跟得上！', '我没关系的！', '大家的声音，听不到呢…', '有点，没力气了…', '姐姐…'
        ]
    },
    '迪卢克': {
        peace: [
            '偶尔悠闲一下，也不错。', '我不用伞，你随意。', '想试试隐藏菜单吗？', '夜晚到了。', '寒暄就免了。昨夜一切平安就好。', '凯亚吗…那个男人说的话，只能信一半。', '力量增强了…虽然还不够，但终归是在向前方探索。', '为了达成目标，力量是必须的。'
        ],
        war: [
            '呵。', '哈。', '在此——宣判！', '火焰——烧尽。', '审判——喝啊！', '哼，就当是聚沙成塔。', '还不赖。', '一点一滴地积累吧。', '你会付出代价。', '败者…没有借口…', '计划…出错了吗…', '要熄灭了吗…', '可恶。'
        ]
    },
    '雷泽': {
        peace: [
            '你的气味…好闻。一起狩猎吧！', '唔，兔子的味道…', '走吗，肚子饿了。', '我去望风，走了叫我。', '怕就快点躲起来。', '避开树，跟我来！', '风…唔…舒服。', '风…嗯…扎扎的，有点疼。', '太阳出来了。狩猎一起去？', '大块吃肉，开心！', '你去睡觉吧，我看月亮', '手臂，更粗了…？', '磨爪子，磨牙，要更强！', '牙齿，爪子，腿。更强，更有力气…保护你！'
        ],
        war: [
            '走开！', '啊！', '嗷！', '别过来！', '杀了你！…', '唔，好难呼吸…', '想回去…', '我的…卢皮卡…', '嘴里，咸的…'
        ]
    },
    '温迪': {
        peace: [
            '早，准备开始新的冒险了吗？', '我还不困哦。要我陪你走走么？', '嗯…想接着听下去的话，送我一个苹果吧。', '动身吧，旅行者。佚失的诗篇，还在等着我们呢。', '等雪积起来…我们来打雪仗吧！', '难得呀，要不要去飞一飞？', '来得正好，旅行者。我想听听，你的愿望是什么？', '来，坐这边。我写了一首新诗哦，就叫它「旅行者之风」吧。', '欸！刚刚发生了什么！'
        ],
        war: [
            '哟呼——', '在这哟。', '留意脚下。', '一起来玩吧。', '别想逃开喔？', '起风咯~', '飞，比跑快吧？', '哎呀，别盯着我打呀。', '等等，这可不好玩！', '啊呀，弦断了…', '稍微睡一下吧…', '好粗鲁哦。'
        ]
    },
}