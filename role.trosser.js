const { forEach } = require("lodash");
const config = require("./Config");

/**远方运输队,去其他的房间进行运输能量 */
var roleTrosser = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var roomName = creep.memory.roomName;
        if(roomName == undefined){
            //初始化分配房间名称,初始化后面就不会再进行修改
            var trossers = _.filter(Game.creeps, (creep) => creep.memory.role == 'trosser');
            var roomName0 = 0;
            var roomName1 = 0;
            var roomName2 = 0;
            for (let i = 0; i < trossers.length; i++) {
                const e = trossers[i];
                if(e.memory.roomName == undefined
                || e.memory.roomName == null
                || e.memory.roomName == ""){
                    continue;
                }else if(e.memory.roomName == config.RESERVED_ROOM_NAME[0]){
                    roomName0++;
                }else if(e.memory.roomName == config.RESERVED_ROOM_NAME[1]){
                    roomName1++;
                }else if(e.memory.roomName == config.RESERVED_ROOM_NAME[2]){
                    roomName2++;
                }
            }
            if(roomName0 < 2){
                roomName = config.RESERVED_ROOM_NAME[0];
            }else if(roomName1 < 2){
                roomName = config.RESERVED_ROOM_NAME[1];
            }else if(roomName2 < 2){
                roomName = config.RESERVED_ROOM_NAME[2];
            }

        }
        creep.memory.roomName = roomName;

        //先获取当前的状态0是挖矿状态,1是运输状态
        var nowState = creep.memory.nowState;
        if(nowState == undefined){
            //初始化状态为0,即为挖矿状态
            creep.memory.nowState = 0;
            nowState = 0;
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
        var sourceNum = creep.memory.sourceNum;
        if(sourceNum == undefined){
            //初始化分配矿源编号
            var trossers = _.filter(Game.creeps, (creep) => creep.memory.role == 'trosser' 
            && creep.memory.roomName == roomName);
            
            if(trossers.length < 1){
                creep.memory.sourceNum = 0;
                sourceNum = 0;
            }else{  
                var sourceNum1 = 0;
                var sourceNum0 = 0;
                for (let i = 0; i < trossers.length; i++) {
                    const e = trossers[i];
                    if(e.memory.sourceNum == 0){
                        sourceNum0++;
                    }else if(e.memory.sourceNum == 1){
                        sourceNum1++;
                    }
                }  
                if(sourceNum1 > sourceNum0){
                    creep.memory.sourceNum = 0;
                    sourceNum = 0;
                }else{
                    creep.memory.sourceNum = 1;
                    sourceNum = 1;
                }              
            }
        }

        // 挖矿状态 注意是去隔壁的房间挖矿
        if(nowState == 0){
            //先看看是不是自己的房间
            if(creep.room.name != roomName){
                creep.moveTo(new RoomPosition(25, 25, roomName),{visualizePathStyle: {stroke: '#ffaa00'}});
            }else{
               //当前在别人的房间,准备挖矿
               var sources = creep.room.find(FIND_SOURCES);
               //开始挖矿
               if(creep.harvest(sources[sourceNum]) == ERR_NOT_IN_RANGE) {
                   creep.moveTo(sources[sourceNum], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }

        }else if(nowState == 1){
            //先试用trosser代替搬运工的只能
            if(creep.room.name == "E49S55"){
                //查看当前房间有没有spawn
                var spawns = creep.room.find(FIND_MY_SPAWNS,{
                    filter: (spawn) => {
                        return spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if(spawns.length > 0){
                    //有spawn,就去spawn里面取能量
                    if(creep.transfer(spawns[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(spawns[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                    return;
                }
            }
            
             // 查找需要传输能量的目标结构
             var targets = this.findEnergyTransferTargets(creep);
             if(targets.length > 0) {
                // 找到最近的目标
                var closestTarget = creep.pos.findClosestByPath(targets);
                if(creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                
             } else {
                // 当前没有可以存储能量的装置,返回自己的房间
                creep.moveTo(new RoomPosition(25, 25, config.MY_ROOM_NAME),{visualizePathStyle: {stroke: '#ffaa00'}});
                return;
             }
        }
    },
    // 查找需要传输能量的目标结构
    /** @param {Creep} creep **/
    findEnergyTransferTargets: function(creep) {
        var structures = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE //那个大箱子 
                    ||structure.structureType == STRUCTURE_CONTAINER)
                && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        return structures;
    }
};
module.exports = roleTrosser;