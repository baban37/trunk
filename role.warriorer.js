const config = require("./Config");
const data = require("./DataCenter");
const { forEach } = require('lodash');
/**这是一个战士,专门干别人的spawn*/
var roleWarriorer = {
    /** @param {Creep} creep **/
    run: function(creep) {
        //判断当前状态 0前往指定区域 1开启攻击状态 2返回基地正常巡视
        var state = creep.memory.state;
        if(state == undefined){
            //初始化
            creep.memory.state = 0;
            state = 0;
        }else if(state == 0){
            var hostileCreeps = data.roomHostileCreeps;
            var hostileRoom = creep.room;
            var roomName = null;
            if(hostileCreeps.size > 0){
                forEach(hostileCreeps, function (creep) {
                    if(hostileRoom.name == creep.room.name){
                        //找到敌人了
                        creep.memory.state = 1;
                        state = 1;
                    }else{
                        hostileRoom = creep.room;
                    }
                });
                roomName = hostileRoom.name;
            }else{
                //没有敌人,执行特殊攻击
                roomName = "E51S29";
            }
            
            if(creep.room.name != roomName){
                creep.moveTo(new RoomPosition(25, 25, roomName),{visualizePathStyle: {stroke: '#ffaa00'}});
                return;
            }else{
                //已经到达指定位置
                creep.memory.state = 1;
                state = 1;
                //稳一手等一下下一个tick在攻击
                return ;
            }
        }else if (state == 1){
            //开启攻击状态
            //先看看有没有敌人

            if(creep.room.name != "E51S29"){
                creep.moveTo(new RoomPosition(25, 25, "E51S29"),{visualizePathStyle: {stroke: '#ffaa00'}});
                return;
            }

            var enemies = creep.room.find(FIND_HOSTILE_CREEPS);
            if(enemies.length > 0){
                //有敌人了,直接攻击
                var closestTarget = creep.pos.findClosestByPath(enemies);
                if(creep.attack(closestTarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return;
            }
            var spwans = creep.room.find(FIND_HOSTILE_SPAWNS );
            if(spwans.length > 0){
                //有敌人了,直接攻击
                if(creep.attack(spwans[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spwans[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return;
            }
            var structures = creep.room.find(FIND_HOSTILE_STRUCTURES,{
				filter: (structure) => {
					return !structure.my;
				}
			});
            if(structures.length > 0){
                var closestTarget = creep.pos.findClosestByPath(structures);
                //有敌人了,直接攻击
                if(creep.attack(closestTarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return;
            }

        }
        //前往指定区域

    }
};
module.exports = roleWarriorer;