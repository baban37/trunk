const config = require('./Config');
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
            console.log("costMax == 0||costMix == 0,role = " + role+"请检查Config.js");
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
            console.log("能量不足"+role);
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
    /** 通过ControllerLevel来判断creep应该有什么样的身体组件 */
    getBodyByControllerLevel:function(){

    },
    /** 通过优先级来判断应该获取到什么样的建筑 */
    getStructerByWeight:function(){

    },
    

}
