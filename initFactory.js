const { forEach } = require("lodash");
const data = require("./DataCenter");
const consoleManager = require('./consoleManager');
/** 这是一个专门用来初始化的方法 */
var initFactory = {
    /** 初始化creep */
    initCreep : function () {
        //初始化creep
        var harvesters = new Map();
        var upgraders = new Map();
        var builders = new Map();
        var repairers = new Map();
        var trossers = new Map();
        var otherBuilders = new Map();
        var cleaners = new Map();
        var warriorers = new Map();
        var roomBusters = new Map();
        var controllerUpers = new Map();
        var truckers = new Map();
        var specialMineralers = new Map();
        
        var creeps = Game.creeps;
        //获取到了全部的creep
        forEach(creeps, function (creep) {
            if(creep.memory.role == "harvester"){
                harvesters.set(creep.name, creep);
            }
            if(creep.memory.role == "upgrader"){
                upgraders.set(creep.name, creep);
            }
            if(creep.memory.role == "builder"){
                builders.set(creep.name, creep);
            }
            if(creep.memory.role == "repairer"){
                repairers.set(creep.name, creep);
            }
            if(creep.memory.role == "trosser"){
                trossers.set(creep.name, creep);
            }
            if(creep.memory.role == "otherBuilder"){
                otherBuilders.set(creep.name, creep);
            }
            if(creep.memory.role == "cleaner"){
                cleaners.set(creep.name, creep);
            }
            if(creep.memory.role == "warriorer"){
                warriorers.set(creep.name, creep);
            }
            if(creep.memory.role == "roomBuster"){
                roomBusters.set(creep.name, creep);
            }
            if(creep.memory.role == "controllerUper"){
                controllerUpers.set(creep.name, creep);
            }
            if(creep.memory.role == "trucker"){
                truckers.set(creep.name, creep);
            }
            if(creep.memory.role == "specialMineraler"){
                specialMineralers.set(creep.name, creep); 
            }
            
        });
        //将creep的map存储到data中
        data.setHarvesters(harvesters);
        data.setUpgraders(upgraders);
        data.setBuilders(builders);
        data.setRepairers(repairers);
        data.setTrossers(trossers);
        data.setOtherBuilders(otherBuilders);
        data.setCleaners(cleaners);
        data.setWarriorers(warriorers);
        data.setRoomBusters(roomBusters);
        data.setControllerUpers(controllerUpers);
        data.setTruckers(truckers);
        data.setSpecialMineralers(specialMineralers);

    },
    /** 初始化房间信息 */
    initRoom : function(){
        //获取当前能获取到的全部建筑,和全部的建筑工地
        var rooms = Game.rooms;
        //建筑信息
        var roomStructures = new Map();
        //工地信息
        var roomConstructionSites = new Map();
        //敌人信息
        var roomHostileCreeps = new Map();
        //资源信息
        var roomResources = new Map();
        //房间地形信息
        var roomTerrain = new Map();

        forEach(rooms, function (room) {
            //寻找
            var structures = room.find(FIND_STRUCTURES);
            var constructionSites = room.find(FIND_CONSTRUCTION_SITES);
            var hostileCreeps = room.find(FIND_HOSTILE_CREEPS);
            var resources = room.find(FIND_SOURCES);
            if(hostileCreeps.length > 0){
                consoleManager.log("发现敌人"+room.name+hostileCreeps[0].pos.x+","+hostileCreeps[0].pos.y);
            }
            const terrain = room.getTerrain();
            roomTerrain.set(room.name, terrain);
            //赋值
            roomStructures.set(room.name, structures);
            roomConstructionSites.set(room.name, constructionSites);
            roomHostileCreeps.set(room.name, hostileCreeps);
            roomResources.set(room.name, resources);
        });

        //将房间信息存储到data中
        data.setRoomStructures(roomStructures);
        data.setRoomConstructionSites(roomConstructionSites);
        data.setRoomHostileCreeps(roomHostileCreeps);
        data.setRoomResources(roomResources);
        data.setRoomTerrain(roomTerrain);
        
    },
    /** 获取到可以开采的矿的资源后,分配开采点 */
    distributionOfMines: function(){
        var roomResources = data.roomResources;
        var roomBreakingPoints = new Map();
        forEach(roomResources, function (resources, roomName) {
            //获取到当前房间的地形
            var terrain = data.roomTerrain.get(roomName);
            var roomResource = {
                breakingPoints: [],
                resource: null,
            };
            var roomResourceBreakingPoints = [];
            forEach(resources, function (resource) {
                /** 开采点 */
                var breakingPoints = [];
                //获取到当前资源的位置
                var pos = resource.pos;
                //判断当前资源点周围所有可以开采的点
                if(terrain.get(pos.x-1,pos.y) != TERRAIN_MASK_WALL){
                    breakingPoints.push({x:pos.x-1,y:pos.y});
                }
                if(terrain.get(pos.x+1,pos.y) != TERRAIN_MASK_WALL){
                    breakingPoints.push({x:pos.x+1,y:pos.y});
                }
                if(terrain.get(pos.x,pos.y-1) != TERRAIN_MASK_WALL){
                    breakingPoints.push({x:pos.x,y:pos.y-1});
                }
                if(terrain.get(pos.x,pos.y+1) != TERRAIN_MASK_WALL){
                    breakingPoints.push({x:pos.x,y:pos.y+1});
                }
                if(terrain.get(pos.x-1,pos.y-1) != TERRAIN_MASK_WALL){
                    breakingPoints.push({x:pos.x-1,y:pos.y-1});
                }
                if(terrain.get(pos.x+1,pos.y+1) != TERRAIN_MASK_WALL){
                    breakingPoints.push({x:pos.x+1,y:pos.y+1});
                }
                if(terrain.get(pos.x-1,pos.y+1) != TERRAIN_MASK_WALL){
                    breakingPoints.push({x:pos.x-1,y:pos.y+1});
                }
                if(terrain.get(pos.x+1,pos.y-1) != TERRAIN_MASK_WALL){
                    breakingPoints.push({x:pos.x+1,y:pos.y-1});
                }
                //将当前资源的开采点存储到resource中
                roomResource.breakingPoints = breakingPoints;
                roomResource.resource = resource;
                roomResourceBreakingPoints.push(roomResource);
            });
            roomBreakingPoints.set(roomName, roomResourceBreakingPoints);
        });     
        data.setRoomBreakingPoints(roomBreakingPoints);   
    }


};
module.exports = initFactory;
    
