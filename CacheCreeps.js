/**
 * 这里是Creep相关扩展数据,会更根据Creep的状态进行动态修改
 * 当Creep死亡的时候一定要进行清理
 * 这个类优先存放在内存中
 * @author 八班37号
 */

var CacheCreeps = {
    /** 这个是Creep和resource的对应关系 String(Creep的名字), pos(位置x,y) */
    creepsTOresources:new Map(),

};
module.exports = CacheCreeps;