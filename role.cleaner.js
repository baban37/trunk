const { forEach } = require("lodash");
/**这是一个清道夫专门用来清理垃圾的 所以这个没有Work组件*/
var roleCleaner = {
    /** @param {Creep} creep **/
    run: function(creep) {
        //判断当前的状态 0为清理状态 1为运输状态
        var state = creep.memory.state;
        //初始化状态
        if(state == undefined){
            creep.memory.state = 0;
            state = 0;
        }
        //判断当前的状态
        else if(state == 0){
            var freeSpace = creep.store.getFreeCapacity(RESOURCE_ENERGY);
            if(freeSpace == 0){
               
                //当前已经没有空间清理了,切换状态为1
                creep.memory.state = 1;
                state = 1;
            }
        }else if(state == 1){
            var usedSpace = 0; 
            for(const resourceType in creep.store) {
                var temp = creep.store.getUsedCapacity(resourceType);
                if(temp > 0){
                    usedSpace = temp;
                    break;
                }
            }
            
            if(usedSpace == 0){
                // 全部能量已经被清理完了,去找其他可以清理的地方
                creep.memory.state = 0;
                state = 0;
            }
        }
        //清理状态
        if(state == 0){
            //是否已经清理了
            var isClean = false;
            isClean = this.findTrash(creep.room, creep);
            if(isClean){
                return;
            }

            // 不在去隔壁房间清理垃圾了
            if(!isClean
                && creep.store.getFreeCapacity() == 0
                ){
                //没有垃圾了,将现在的能量全部送回去
                creep.memory.state = 1;
                state = 1;
            }
            
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_CONTAINER
                            || structure.structureType == STRUCTURE_STORAGE)
                        && ((structure.store.getUsedCapacity(RESOURCE_HYDROGEN) > 0)
                            || (structure.store.getUsedCapacity(RESOURCE_UTRIUM) > 0))
                        
                        ); 

                }
            });
            if(targets.length > 0) {
                // 找到最近的目标
                var closestTarget = creep.pos.findClosestByPath(targets);
                if(creep.room.name == "E51S29"){
                    if(creep.withdraw(closestTarget, RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                    } else{
                        creep.memory.state = 1;
                        return true;
                    }
                }else{
                    if(creep.withdraw(closestTarget, RESOURCE_UTRIUM) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                    } else{
                        creep.memory.state = 1;
                        return true;
                    }
                }
                
            }
                
            
           

        }else if(state == 1){
            //当前为返回运输状态
            
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TERMINAL); // 优先放入终端，如果没有终端则放入STORAGE
                }
            });

            if(targets.length == 0){
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE); // 优先放入终端，如果没有终端则放入STORAGE
                    }
                });  
            }

            if(targets.length > 0) {

                // 找到最近的目标
                // if(creep.room.my){
                //     var closestTarget = creep.pos.findClosestByPath(targets);
                //     if(creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //         creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                //     }
                // }
                var closestTarget = creep.pos.findClosestByPath(targets);
                if(creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                }else{
                    for(const resourceType in creep.store) {
                        creep.transfer(closestTarget, resourceType);
                    }
                }
                
                
            }
        }
    
    },
     /** @param {Room} room  @param {Creep} creep**/
    findTrash : function(room,creep){
         
        var droppedResources = room.find(FIND_DROPPED_RESOURCES);

        if(droppedResources.length > 0){
            if(creep.room.name != room.name){
                creep.moveTo(new RoomPosition(25, 25, room.name),{visualizePathStyle: {stroke: '#ffaa00'}});
                return true;
            }
            
            // 找到垃圾了,开始清理
            var closestTarget = creep.pos.findClosestByPath(droppedResources);
            
            if(creep.pickup(closestTarget) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
            }else{
                creep.memory.state = 1;
                return true;
            }
            
            return true;
        }   

        // 看看坟墓垃圾
        var tombstones = room.find(FIND_TOMBSTONES, {
            filter: (tombstone) => {
                return tombstone.store != undefined ;
            }
        }); 
        if(tombstones.length > 0){
            if(creep.room.name != room.name){
                creep.moveTo(new RoomPosition(25, 25, room.name),{visualizePathStyle: {stroke: '#ffaa00'}});
                return true;
            }
            // 找到坟墓垃圾了,开始清理
            var closestTarget = creep.pos.findClosestByPath(tombstones);
            for(const resourceType in closestTarget.store) {
                if(creep.withdraw(closestTarget, resourceType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                }else{
                    creep.memory.state = 1;
                    return true;
                }
            }
        }

        // 看看废墟垃圾
        var ruins = room.find(FIND_RUINS, {
            
            filter: (ruin) => {
                return ruin.store!= undefined && 
                ruin.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
            }
        }); 
        
        if(ruins.length > 0){
            
            if(creep.room.name != room.name){
                creep.moveTo(new RoomPosition(25, 25, room.name),{visualizePathStyle: {stroke: '#ffaa00'}});
                return true;
            }
            // 找到废墟垃圾了,开始清理
            var closestTarget = creep.pos.findClosestByPath(ruins);
            for(const resourceType in closestTarget.store) {
                if(creep.withdraw(closestTarget, resourceType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                }else{
                    creep.memory.state = 1;
                    return true;
                }
            }
            return true;
        }
        
        //全部找完了没有垃圾
        return false;
    }
};
module.exports = roleCleaner;