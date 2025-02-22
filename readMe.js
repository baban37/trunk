/**
 * 注意事项
 * 1.不能使用小乌龟 SVN进行版本控制，会导致其他的游戏无法运行
 * 2.GitHub 不能使用网络卡顿
 * 3.当前的creep单位生产时间太长,会导致游戏中资源浪费严重导致严重的人口数量问题
 * 4.DataCenter中是使用的是全局变量,之后在搞一搞Cache的来替代
 * 5.现在出现生产问题,生产按权重生产会导致权重数值难以平衡
 * 6.生产时间问题,大Creep生产时间久会导致有些Creep一直无法生产,生产小的Creep又浪费资源又耽误时间
 * 7.不能使用最低能量生产方法,这样时间一旦久了必然会导致所有的Creep都使用最低能量生产
 * 8.当前代码没有布局需要手动布局
 * 9.当前代码中将运动和建筑单位进行分类建筑单位没有什么特别的,但是运动单位分为
 *      (1 harvester)矿工 专门挖取资源
 *      (2 trucker)搬运工 专门搬运资源
 *      (3 builder)建造者 专门建造建筑
 *      (4 upgrader)升级者 专门对房间控制器进行升级
 *      (5 otherBuilder)其他建造者 专门建造建筑 这个建造者的身体组件和builder一样,但是会前往别的房间进行建筑
 *                                            主要是帮其他的房间建造spawn
 *                                            以及度过前期没法生产带有大量部件的时期
 *      (6 cleaner)清洁者 专门清理房间中的垃圾 现在的个cleaner似乎出现bug了,正在考虑修改
 *      (7 controllerUper)控制器升级者 这个其实是一个搬运工但是只对控制器旁边的存储单位搬运资源
 *                                    现在这个单位已经不用了但是还没有想好怎么改(这个单位依然可以使用)
 *      (8 warriorer)战争者 这个单位是一个近战单位,他的主要功能是攻击敌方单位一旦遇见敌方单位进入我方房间就
 *                          就会开始生产该单位(但是现在这个单位的做用已经被防御塔取代了)
 *      (9 roomBuster)房间破坏者 这个单位是用来控制其他房间的控制器的
 *                              主要功能就是预定房间的控制器
 *                              攻击其他房间的控制器
 *                              占领其他房间的控制器
 *      (10 trosser)远方运输队 这个单位是用来运输资源的,不过是用来采集别的房间的资源并运回指定房间的
 *      (11 repairer)维修者 这个单位是用来维修建筑的
 * 
 * 
 * 一些想法和问题
 * 1.当前的代码不够灵活,房间的布局需要手动布局
 * 2.当前的代码中的防御塔是可以进行维修的,但是想要将墙或者防御罩进行维修需要花费大量的能量,现在还没有进行比较好
 *   的平衡
 * 3.清洁工的问题,现在想的是多个房间一个清洁工,因为清洁工就只是从废墟\尸体\掉落物中获取能量,所以清洁工要跨越房
 *   间,但是现在可能会让清洁工一下子卡死在房间的进入口,所以需要想办法解决这个问题
 * 4.需要加入预警机制,当房间受到不可逆威胁的时候就应该进入安全模式
 * 5.需要加入房间的布局机制,适当的进行自动化布局
 * 
 * 
 * 
 * 注意一下这个
 * https://www.jianshu.com/p/4dcc255ede6b
 * 
 * http://chuangxin.fun:3000/res?username=E51S29&targetShard=shard3
 * 
 * 
 * gm.createMarketOrder(ORDER_SELL,RESOURCE_HYDROGEN,300,110000,"E51S29")
 * gm.sellSomething(RESOURCE_UTRIUM,"E52S29",10000,0,"")
 * Game.spawns['Spawn1'].spawnCreep([ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], "warriorerLS",{memory: {role: "warriorer"}});
 * Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], "cleanerLS",{memory: {role: "cleaner"}});
 * Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], "harvesterLs",{memory: {role: "harvester"}});
 */