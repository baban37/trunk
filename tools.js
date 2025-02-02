const config = require('./Config');
const data = require("./DataCenter");
const consoleManager = require('./consoleManager');
module.exports = {
    /** 获取当前room内所有可以用于生产的能量room.energyAvailable */

    /** 
     * 获取用于生产body 
     * role : 生成的角色 
     * roomEnergyAvailable : 当前room的可用能量
     */
    getNeedCreepBody: function (role,roomEnergyAvailable) {
        var bodyWeight = null;
        var costMax = 0;
        var costMix = 0;
        // roomEnergyAvailable = roomEnergyAvailable-roomEnergyAvailable%500;
        switch (role) {
            case "harvester":
                bodyWeight = config.HARVESTER_BODY;
                costMax = config.HARVESTER_NUM[config.MAXENERGY];
                costMix = config.HARVESTER_NUM[config.MINENERGY];
                break;
            case "upgrader":
                bodyWeight = config.UPGRADER_BODY;
                costMax = config.UPGRADER_NUM[config.MAXENERGY];
                costMix = config.UPGRADER_NUM[config.MINENERGY];
                break;
            case "builder":
                bodyWeight = config.BUILDER_BODY;
                costMax = config.BUILDER_NUM[config.MAXENERGY];
                costMix = config.BUILDER_NUM[config.MINENERGY];
                break;
            case "repairer":
                bodyWeight = config.REPAIRER_BODY;
                costMax = config.REPAIRER_NUM[config.MAXENERGY];
                costMix = config.REPAIRER_NUM[config.MINENERGY];
                break;
            case "trosser":
                bodyWeight = config.TROSSER_BODY;
                costMax = config.TROSSER_NUM[config.MAXENERGY];
                costMix = config.TROSSER_NUM[config.MINENERGY];
                break;
            case "otherBuilder":
                bodyWeight = config.OTHERBUILDER_BODY;
                costMax = config.OTHERBUILDER_NUM[config.MAXENERGY];
                costMix = config.OTHERBUILDER_NUM[config.MINENERGY];
                break;
            case "cleaner":
                bodyWeight = config.CLEANER_BODY;
                costMax = config.CLEANER_NUM[config.MAXENERGY];
                costMix = config.CLEANER_NUM[config.MINENERGY];
                break;
            case "warriorer":
                bodyWeight = config.WARRIORER_BODY;
                costMax = config.WARRIORER_NUM[config.MAXENERGY];
                costMix = config.WARRIORER_NUM[config.MINENERGY];
                break;
            case "roomBuster":
                bodyWeight = config.ROOMBUSTER_BODY;
                costMax = config.ROOMBUSTER_NUM[config.MAXENERGY];
                costMix = config.ROOMBUSTER_NUM[config.MINENERGY];
                break;
            case "controllerUper":
                bodyWeight = config.CONTROLLERUPER_BODY;
                costMax = config.CONTROLLERUPER_NUM[config.MAXENERGY];
                costMix = config.CONTROLLERUPER_NUM[config.MINENERGY];
                break;
            case "trucker":
                bodyWeight = config.TRUCKER_BODY;
                costMax = config.TRUCKER_NUM[config.MAXENERGY];
                costMix = config.TRUCKER_NUM[config.MINENERGY];
                break;
            case "specialMineraler":
                bodyWeight = config.SPECIALMINERALER_BODY;
                costMax = config.SPECIALMINERALER_NUM[config.MAXENERGY];
                costMix = config.SPECIALMINERALER_NUM[config.MINENERGY];
                break;
            default:
                break;
        }
        if(bodyWeight == null){
            console.log("bodyWeight == null,role = " + role+"请检查Config.js");
            return null;
        }
        if(costMax == 0 || costMix == 0){
            consoleManager.log("costMax == 0||costMix == 0,role = " + role+"请检查Config.js");
            return null;
        }
        if(roomEnergyAvailable < costMix){
            return null;
        }
        if(roomEnergyAvailable > costMax){
            roomEnergyAvailable = costMax;
        }


        var allWeight = 0;
        for (var i = 0; i < bodyWeight.length; i++) {
            allWeight += bodyWeight[i].weight;
        }
        //开始构建body
        var needBody = [];
        for (var i = 0; i < bodyWeight.length; i++) {
            var body = bodyWeight[i].body;
            var weight = bodyWeight[i].weight;
            var canCost = (1.0 * weight) / allWeight * roomEnergyAvailable / this.bodyCost(body);
            var canCost = Math.floor(canCost);
            if(canCost <= 0 || canCost == null){
                canCost = 1;
            }
            if(body == WORK && canCost > 5 
            && role != "upgrader" 
            && role != "builder"
            && role!= "specialMineraler"
            ){
                canCost = 5;
            }
            if((role == "upgrader" || role == "builder" || role == "specialMineraler") 
            && body == WORK && canCost >= 10){
                canCost = 10;
            }
            for (var j = 0; j < canCost; j++) {
                needBody.push(body);
            }
        }
        if(roomEnergyAvailable < this.creatCreepCost(needBody)){
            consoleManager.log("能量不足"+role);
            return null;
        }
        return needBody;
    },

    creatCreepCost : function(body){
        let totalCost = 0;
        for (let part of body) {
            totalCost += config.BODY_PART_COSTS[part];
        }
        return totalCost;
    },

    bodyCost : function(body){
        switch (body) {
            case MOVE:
                return config.BODY_PART_COSTS.MOVE;
            case WORK:
                return config.BODY_PART_COSTS.WORK;
            case CARRY:
                return config.BODY_PART_COSTS.CARRY;
            case ATTACK:
                return config.BODY_PART_COSTS.ATTACK;
            case RANGED_ATTACK:
                return config.BODY_PART_COSTS.RANGED_ATTACK;
            case HEAL:
                return config.BODY_PART_COSTS.HEAL;
            case CLAIM:
                return config.BODY_PART_COSTS.CLAIM;
            case TOUGH:
                return config.BODY_PART_COSTS.TOUGH;
            default:
                return 0;
        }
    },
    /**
     * 
     * @param {Room} room
     * @param {*} energyCapacityAvailable
     * @returns 
     */
    getRoomLevel : function(room,energyCapacityAvailable){
        var roomLevel = null;
        switch (energyCapacityAvailable) {
            case config.ROOM_ENERGY_LEVEL_1.energy:
                roomLevel = config.ROOM_ENERGY_LEVEL_1; 
                break;

            case config.ROOM_ENERGY_LEVEL_2.energy:
                roomLevel = config.ROOM_ENERGY_LEVEL_2;
                break;

            case config.ROOM_ENERGY_LEVEL_3.energy:
                roomLevel = config.ROOM_ENERGY_LEVEL_3;
                break;

            case config.ROOM_ENERGY_LEVEL_4.energy:
                roomLevel = config.ROOM_ENERGY_LEVEL_4;
                break;

            case config.ROOM_ENERGY_LEVEL_5.energy:
                roomLevel = config.ROOM_ENERGY_LEVEL_5;
                break;
            
            case config.ROOM_ENERGY_LEVEL_6.energy:
                roomLevel = config.ROOM_ENERGY_LEVEL_6;
                break;
            
            case config.ROOM_ENERGY_LEVEL_7.energy:
                roomLevel = config.ROOM_ENERGY_LEVEL_7;
                break;

            case config.ROOM_ENERGY_LEVEL_8.energy:
                roomLevel = config.ROOM_ENERGY_LEVEL_8;
                break;

            default:
                //当前房间还没有升级完成还没有达到当前房间最大能量
                break;
        }

        if(roomLevel == null){
            var controllerLevel = room.controller.level-1;
            switch (controllerLevel) {
                case config.ROOM_ENERGY_LEVEL_1.level:
                    roomLevel = config.ROOM_ENERGY_LEVEL_1;
                    break;

                case config.ROOM_ENERGY_LEVEL_2.level:
                    roomLevel = config.ROOM_ENERGY_LEVEL_2;
                    break;

                case config.ROOM_ENERGY_LEVEL_3.level:
                    roomLevel = config.ROOM_ENERGY_LEVEL_3;
                    break;

                case config.ROOM_ENERGY_LEVEL_4.level:
                    roomLevel = config.ROOM_ENERGY_LEVEL_4;
                    break;

                case config.ROOM_ENERGY_LEVEL_5.level:
                    roomLevel = config.ROOM_ENERGY_LEVEL_5;
                    break;

                case config.ROOM_ENERGY_LEVEL_6.level:
                    roomLevel = config.ROOM_ENERGY_LEVEL_6;
                    break;

                case config.ROOM_ENERGY_LEVEL_7.level:
                    roomLevel = config.ROOM_ENERGY_LEVEL_7;
                    break;

                case config.ROOM_ENERGY_LEVEL_8.level:
                    roomLevel = config.ROOM_ENERGY_LEVEL_8;
                    break;

                default:
                    consoleManager.log("当前房间等级错误");
                    roomLevel = config.ROOM_ENERGY_LEVEL_1;
                    break;
            }
        }
        return roomLevel;
    },
    getNeedCreep: function (roleInfos,room) {
        var harvesters = data.getHarvestersByRoomName(room.name);
        var upgraders = data.getUpgradersByRoomName(room.name);
        var builders = data.getBuildersByRoomName(room.name);
        var repairers = data.getRepairersByRoomName(room.name);
        var truckers = data.getTruckersByRoomName(room.name);
        var specialMineralers = data.getSpecialMineralersByRoomName(room.name);
        var cleaners = data.getCleanersByRoomName(room.name);
        var constructionSites = data.roomConstructionSites.get(room.name);
        var needCreep = null;
        for(let i = 0; i < roleInfos.length; i++){
            var roleInfo = roleInfos[i];
            if(!roleInfo.parameters
                &&roleInfo.role != "specialMineraler"){
                continue;
            }
            var role = roleInfo.role;
            var needNum = roleInfo.num;
            switch (role) {
                case 'harvester':
                    if(harvesters.length < needNum){
                        needCreep = roleInfo;
                        break;
                    }
                    break;

                case 'upgrader':
                    if(upgraders.length < needNum){
                        needCreep = roleInfo;
                        break;
                    }
                    break;

                case 'builder':
                    if(constructionSites.length){
                        needNum=1;
                    }
                    if(builders.length < needNum){
                        needCreep = roleInfo;
                        break;
                    }
                    break;

                case 'repairer':
                    if(repairers.length < needNum){
                        needCreep = roleInfo;
                        break;
                    }
                    break;

                case 'trucker':
                    if(truckers.length < needNum){
                        needCreep = roleInfo;
                        break;
                    }
                    break;

                case 'specialMineraler':
                    if(specialMineralers.length < needNum){
                        //判断是否可以
                        var sources = room.find(FIND_MINERALS,{
                            filter:(structure)=>{
                                return structure.mineralAmount > 0; 
                            }   
                        });
                        if(sources==0){
                            break;
                        }
                        if(specialMineralers.length < needNum){
                            needCreep = roleInfo;
                        }
                        break;
                    }
                    break;

                case 'cleaner':
                    if(cleaners.length < needNum){
                        needCreep = roleInfo;
                    }
                    break;

                default:
                    break;
            }
            if(needCreep != null){
                break;
            }
        }
        return needCreep;
    }

    

}
