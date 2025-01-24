const tools = require('./tools');
const { forEach } = require("lodash");
const config = require('./Config');
const data = require("./DataCenter");
module.exports = {
    spawnCreeps : function() {
        var rooms = Game.rooms;
        forEach(rooms, function (room) {
            var spawns = room.find(FIND_MY_SPAWNS);
            if(spawns.length == 0){
                //当前room内没有我的spawn直接结束
                return;
            }
            var harvesters = data.getHarvestersByRoomName(room.name);
            var upgraders = data.getUpgradersByRoomName(room.name);
            var builders = data.getBuildersByRoomName(room.name);
            var repairers = data.getRepairersByRoomName(room.name);
            var trossers = data.trossers;
            var otherBuilders = data.otherBuilders;
            var cleaners = data.cleaners;
            var warriorers = data.warriorers;
            var roomBusters = data.roomBusters;
            var controllerUpers = data.getControllerUpersByRoomName(room.name);
            var truckers = data.truckers;
            var roomTruckers = data.getTruckersByRoomName(room.name);
            var specialMineralers = data.getSpecialMineralersByRoomName(room.name);
            let needCreeps = [
                {
                    role : 'harvester', 
                    needNum : config.HARVESTER_NUM[config.NUMBER],
                    weight : config.HARVESTER_NUM[config.WEIGHT],
                    nowNum : harvesters.length
                },
                {
                    role : 'upgrader',
                    needNum : config.UPGRADER_NUM[config.NUMBER],
                    weight : config.UPGRADER_NUM[config.WEIGHT],
                    nowNum : upgraders.length
                },
                {
                    role : 'builder',
                    needNum : config.BUILDER_NUM[config.NUMBER],
                    weight : config.BUILDER_NUM[config.WEIGHT],
                    nowNum : builders.length
                },
                {
                    role : 'repairer',
                    needNum : config.REPAIRER_NUM[config.NUMBER],
                    weight : config.REPAIRER_NUM[config.WEIGHT],
                    nowNum : repairers.length
                },
                {
                    role : 'trosser',
                    needNum : config.TROSSER_NUM[config.NUMBER],
                    weight : config.TROSSER_NUM[config.WEIGHT],
                    nowNum : trossers.size
                },
                {
                    role : 'otherBuilder',
                    needNum : config.OTHERBUILDER_NUM[config.NUMBER],
                    weight : config.OTHERBUILDER_NUM[config.WEIGHT],
                    nowNum : otherBuilders.size
                },
                {
                    role : 'cleaner',
                    needNum : config.CLEANER_NUM[config.NUMBER],
                    weight : config.CLEANER_NUM[config.WEIGHT],
                    nowNum : cleaners.size
                },
                {
                    role : 'warriorer',
                    needNum : config.WARRIORER_NUM[config.NUMBER],
                    weight : data.roomHostileCreeps.size > 0 ? 0 : config.WARRIORER_NUM[config.WEIGHT],
                    nowNum : warriorers.size
                },
                {
                    role : 'roomBuster',
                    needNum : config.ROOMBUSTER_NUM[config.NUMBER],
                    weight : config.ROOMBUSTER_NUM[config.WEIGHT],
                    nowNum : roomBusters.size
                },
                {
                    role : 'controllerUper',
                    needNum : config.CONTROLLERUPER_NUM[config.NUMBER],
                    weight : config.CONTROLLERUPER_NUM[config.WEIGHT],
                    nowNum : controllerUpers.length
                },
                {
                    role : 'trucker',
                    needNum : config.TRUCKER_NUM[config.NUMBER],
                    weight : config.TRUCKER_NUM[config.WEIGHT],
                    nowNum : roomTruckers.length
                },
                {
                    role : 'specialMineraler',
                    needNum : config.SPECIALMINERALER_NUM[config.NUMBER],
                    weight : config.SPECIALMINERALER_NUM[config.WEIGHT], 
                    nowNum : specialMineralers.length
                }

            ];
            var realNeedCreeps = [];
            forEach(needCreeps, function (needCreep) {
                if(needCreep.role == 'specialMineraler'){
                    var sources = room.find(FIND_MINERALS,{
                        filter:(structure)=>{
                            return structure.mineralAmount > 0; 
                        }   
                    });
                    if(sources==0){
                        return;
                    }
                }
                if(needCreep.nowNum < needCreep.needNum){
                    realNeedCreeps.push(needCreep);
                }
            });

            if(realNeedCreeps.length == 0){
                return;
            }
            
            //检查当前spawns中有无正在执行的生产任务
            //注意这里循环套循环,但是spawns数量极少(一般1个最多3个),所以不会影响性能
            forEach(spawns, function (spawn) {
                if(spawn.spawning){
                    var name = spawn.spawning.name;
                    //获取当前正在生产的Creep
                    spawn.room.visual.text(
                        '正在孵化' + name,
                        spawn.pos.x + 1, 
                        spawn.pos.y, 
                        {align: 'left', opacity: 0.8});
                    //当前正在生产中,就不在判定其他Creep是否需要生产了
                    return;
                }
                var energyAvailable = room.energyAvailable;
                var energyCapacityAvailable = room.energyCapacityAvailable;
                
                //获取当前需要生成的Creep
                realNeedCreeps.sort(function (a, b) {
                    var aweight = a.weight;
                    var bweight = b.weight;
                    var aX = a.nowNum/a.needNum*1.0;
                    var bX = b.nowNum/b.needNum*1.0;
                    //小的更先生产
                    return aweight*aX*1.0 - bweight*bX*1.0;
                });
                //获取当前需要生成的Creep
                var body = null ;
                for (let i = 0; i < realNeedCreeps.length; i++) {
                    var realNeedCreep = realNeedCreeps[i];
                    body = tools.getNeedCreepBody(realNeedCreep.role,energyAvailable);
                    if(body != null){
                        break;
                    }
                }
                if(body == null){
                    // console.log('没有合适的Creep生成,当前房间的能量为' + energyAvailable + 'room' + room.name);
                    return;
                }
                var newName = realNeedCreep.role + Game.time;
                console.log('开始生成' + newName + 'room' + room.name);
                //生成Creep
                spawn.spawnCreep(body, newName,{memory: {role: realNeedCreep.role}});
                
            });
        });

    },

};