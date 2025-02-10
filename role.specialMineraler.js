const data = require('./DataCenter');
/**
 * 这个工人一般只生产一个
 * 挖矿物的工人
 * 和harvester的区别在于，这个挖特殊矿物不采集ENERGY
 */
var specialMineraler = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var state = this.checkState(creep);
        if(state == 0){
            //当前为挖矿状态
            this.worker(creep);
        }else if(state == 1){
            //当前为运输状态
            this.transport(creep);
        }

    },

    /** 挖矿 */
    worker: function(creep){
        var room = creep.room;
        var sources = room.find(FIND_MINERALS,{
            filter:(structure)=>{
                return structure.mineralAmount > 0; 
            }   
        });
        var source = null;
        if(sources.length > 0){
            source = sources[0];
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }else{
            //没有矿了,切换状态为1开始返回运输
            creep.memory.state = 1;
        }
    },

    /** 运输 */
    transport: function(creep){
        //找到terminal
        var structures = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TERMINAL
                    || (structure.structureType == STRUCTURE_CONTAINER
                        && structure.store.getFreeCapacity() > 0)
                        );
            }
        });
        var structure = null;
        if(structures.length > 0){
            var structure = creep.pos.findClosestByPath(structures);
        }
       
        if(structure == null){
            return;
        }else{
            if(creep.transfer(structure, RESOURCE_UTRIUM) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffffff'}});
                return;
            }
            if(creep.transfer(structure, RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE){
                creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffffff'}});
                return;
            }
        }
    },

    /** 状态判定加初始化 */
    checkState: function(creep){
         //判断当前的状态 0挖矿 1为运输状态
         var state = creep.memory.state;
         //初始化状态
         if(state == undefined){
             creep.memory.state = 0;
             state = 0;
         }
         //判断当前的状态
         else if(state == 0){
             var usedSpace = creep.store.getUsedCapacity(); 
             var allSpace = creep.store.getCapacity();
             if(usedSpace == allSpace){
                 //当前已经没有空间了,切换状态为1开始返回运输
                 creep.memory.state = 1;
                 state = 1;
             }
         }
         else if(state == 1){
            var usedSpace = creep.store.getUsedCapacity();
            if(usedSpace == 0){
                //当前已经没有能量了,切换状态为0开始挖矿
                creep.memory.state = 0;
                state = 0; 
            }
         }
         return state;
    }

}
module.exports = specialMineraler;
