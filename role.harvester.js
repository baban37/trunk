const data = require("./DataCenter");
//搬运工
var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        //creep.memory.nowState是当前harvester的状态,0是挖矿状态,1是运输状态
        var nowState = creep.memory.nowState;
        if(nowState==undefined){
            //初始化harvester的状态为0,即为挖矿状态
            creep.memory.nowState = 0;
        }else if(nowState == 1){
            //当前为运输状态,判断身上还有没有能量,有能量就继续运输,没有能量就切换状态为0,即为挖矿状态
            if(creep.store.getUsedCapacity() == 0){
                creep.memory.nowState = 0;
                nowState = 0;
            }
        }else if(nowState == 0){
                //当前为挖矿状态,判断身上有没有满,满了就切换状态为1,即为运输状态
                if(creep.store.getFreeCapacity() == 0){
                    creep.memory.nowState = 1;
                    nowState = 1;
                }
        }

        if(nowState == 0) {
            
            var sources = data.roomResources.get(creep.room.name);
            //creep.memory.harvester是当前harvester的资源编号
            var sourceNum = creep.memory.harvester;
            //给每一个harvester分配一个不同的source,防止卡死,注意只在第一次初始化时分配
            if(sourceNum==undefined){
                var harvesters = data.getHarvestersByRoomName(creep.room.name);
                if(harvesters.length==0){
                    creep.memory.harvester = 0;
                    sourceNum = 0;
                }else{
                    var sourceNum1 = 0;
                    var sourceNum0 = 0;
                    var temp;
                    for (let i = 0; i < harvesters.length; i++) {
                        const e = harvesters[i];
                        temp = e.memory.harvester;
                        if(temp!=undefined && temp==0){
                            sourceNum0++;
                        }else if(temp!=undefined && temp==1){
                            sourceNum1++;
                        }
                    }
                    if(sourceNum0 < 1){
                        //资源0没有人,直接分配0
                        creep.memory.harvester = 0;
                        sourceNum = 0;
                    }else if(sourceNum1 < 1 ){
                        //资源1还可以再分配一个
                        creep.memory.harvester = 1;
                        sourceNum = 1;
                    }
                }
            }
            
            if(creep.body.length > 25 && sources[sourceNum].energy == 0){
                if(sourceNum == 0){
                    creep.memory.harvester = 1;
                    sourceNum = 1;
                }else if(sourceNum == 1){
                    creep.memory.harvester = 0;
                    sourceNum = 0; 
                }
            }
            if(creep.harvest(sources[sourceNum]) == ERR_NOT_IN_RANGE) {
                //前往并绘制路径
                creep.moveTo(sources[sourceNum], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            // creep.drop(RESOURCE_ENERGY);//这个相当快速,但是有副作用
            // 查找需要传输能量的目标结构
            var targets = this.findEnergyTransferTargets(creep);
            if(targets.length > 0) {
                // 找到最近的目标
                var closestTarget = creep.pos.findClosestByPath(targets);
                if(closestTarget) {
                    if(creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            } else {
                // 查找需要传输能量的目标结构 注意当前存储的能量不会直接用于孵化
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER 
                            || structure.structureType == STRUCTURE_TOWER ) 
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                        && structure.id != "676f9e3aa941a1be93b670c2";
                    }
                });
                if(targets.length > 0) {
                    // 找到最近的目标
                    var closestTarget = creep.pos.findClosestByPath(targets);
                    if(closestTarget) {
                        if(creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }
            }
        }
    },

    // 查找需要传输能量的目标结构
    findEnergyTransferTargets: function(creep) {
        var truckers = data.getTruckersByRoomName(creep.room.name);
        if(truckers.length == 0 ){
            return creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        // structure.structureType == STRUCTURE_CONTAINER 
                            structure.structureType == STRUCTURE_EXTENSION 
                            || structure.structureType == STRUCTURE_SPAWN 
                            // || structure.structureType == STRUCTURE_TOWER 
                            // || structure.structureType == STRUCTURE_CONTAINER 
                            ) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
        }
        
        
        return creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    structure.structureType == STRUCTURE_CONTAINER 
                        // structure.structureType == STRUCTURE_EXTENSION 
                        // || structure.structureType == STRUCTURE_SPAWN 
                        // || structure.structureType == STRUCTURE_TOWER 
                        // || structure.structureType == STRUCTURE_CONTAINER 
                        ) && 
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
    },

    /** 获取到可以开采的矿的资源后,分配开采点 */
    distributionOfMines: function(){

    }

};

module.exports = roleHarvester;