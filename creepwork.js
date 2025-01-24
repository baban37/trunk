const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleRepairer = require('role.repairer');
const roleTrosser = require('role.trosser');
const roleOtherBuilder = require('role.otherBuilder');
const roleCleaner = require('role.cleaner');
const roleWarriorer = require('role.warriorer');
const roleRoomBuster = require('role.roomBuster');
const roleControllerUper = require('role.controllerUper');
const roleTrucker = require('role.trucker');
const roleSpecialMineraler = require('role.specialMineraler');
//各各角色开始工作
module.exports = {
     /** @param {Game} Game **/
    startWork: function(Game) {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            //在观察的时候可以打开
            // if(creep.hits/creep.hitsMax * 1.0 <= 0.1){
            //     console.log("creep快死了creep的是:"+creep.memory.role);
            // }  
            // if(creep.ticksToLive <= 120){
            //     console.log("creep快死了creep的是:"+creep.memory.role
            //     +",剩余tick"+creep.ticksToLive);
            // }
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            else if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            else if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            else if(creep.memory.role == 'repairer') { // 如果是修理工，则执行修理工的工作
                roleRepairer.run(creep);
            }
            //隔壁来了个坏东西
            else if(creep.memory.role == 'trosser'){
                roleTrosser.run(creep);
            }
            else if(creep.memory.role == 'otherBuilder'){
                roleOtherBuilder.run(creep);
            }
            else if(creep.memory.role == 'cleaner'){
                roleCleaner.run(creep);
            }
            else if(creep.memory.role == 'warriorer'){
                roleWarriorer.run(creep);
            } 
            else if(creep.memory.role == 'roomBuster'){
                roleRoomBuster.run(creep);
            }
            else if(creep.memory.role == 'controllerUper'){
                roleControllerUper.run(creep);
            }
            else if(creep.memory.role == 'trucker'){
                roleTrucker.run(creep);
            }
            else if(creep.memory.role == 'specialMineraler'){
                roleSpecialMineraler.run(creep); 
            }
            
        }
    }
}