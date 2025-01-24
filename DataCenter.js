/**
 * 这里的数据在初始化后不在进行修改
 */
const DataCenter = {
    /** 这个是全部的搬运工 String,Creep */
    harvesters: new Map(),
    /** 这个是全部的升级人员 String,Creep */
    upgraders: new Map(),
    /** 这个是全部的工人 String,Creep */
    builders: new Map(),
    /** 这个是全部的修理工 String,Creep */
    repairers: new Map(),
    /** 这个是全部的远程搬运工 String,Creep */
    trossers: new Map(),
    /** 这个是全部的远程工人 String,Creep */
    otherBuilders: new Map(),
    /** 这个是全部的搬运工 String,Creep */
    cleaners: new Map(),
    /** 这个是全部的搬运工 String,Creep */
    warriorers: new Map(),
    /** 这个是全部的搬运工 String,Creep */
    roomBusters: new Map(),
    /** 这个是全部的搬运工 String,Creep */
    controllerUpers: new Map(),
    /** 这个是全部的搬运工 String,Creep */
    truckers: new Map(),
    /** 这个是挖矿工人 String,Creep */
    specialMineralers : new Map(),


    /** 每个房间内的全部建筑 String(房间名字),Structures */
    roomStructures: new Map(),
    /** 每个房间内的全部建筑工地 String(房间名字),ConstructionSites */
    roomConstructionSites: new Map(),
    /** 每个房间的全部敌人 String(房间名字), Creeps(全部敌人直接找最近的干吧)*/
    roomHostileCreeps: new Map(),
    /** 每个房间的全部资源 String(房间名字), Resource[] */
    roomResources: new Map(),
    /**房间地图信息 String(房间名字),terrain(房间地形) */
    roomTerrain: new Map(),
    /** 房间可以开采的点 String(房间名字),roomResource(房间资源breakingPoints[],resource)*/
    roomBreakingPoints: new Map(),





    // 添加 setHarvesters 方法
    setHarvesters: function(harvesters) {
        this.harvesters = harvesters;
    },

    // 添加 setUpgraders 方法
    setUpgraders: function(upgraders) {
        this.upgraders = upgraders;
    },

    // 添加 setBuilders 方法
    setBuilders: function(builders) {
        this.builders = builders;
    },

    // 添加 setRepairers 方法
    setRepairers: function(repairers) {
        this.repairers = repairers;
    },

    // 添加 setTrossers 方法
    setTrossers: function(trossers) {
        this.trossers = trossers;
    },

    // 添加 setOtherBuilders 方法
    setOtherBuilders: function(otherBuilders) {
        this.otherBuilders = otherBuilders;
    },

    // 添加 setCleaners 方法
    setCleaners: function(cleaners) {
        this.cleaners = cleaners;
    },

    // 添加 setWarriorers 方法
    setWarriorers: function(warriorers) {
        this.warriorers = warriorers;
    },

    // 添加 setRoomBusters 方法
    setRoomBusters: function(roomBusters) {
        this.roomBusters = roomBusters;
    },

    // 添加 setControllerUpers 方法
    setControllerUpers: function(controllerUpers) {
        this.controllerUpers = controllerUpers;
    },

    // 添加 setTruckers 方法
    setTruckers: function(truckers) {
        this.truckers = truckers;
    },

    // 添加 setroomStructures 方法
    setRoomStructures: function(roomStructures) {
        this.roomStructures = roomStructures;
    },

    // 添加 setRoomConstructionSites 方法
    setRoomConstructionSites: function(roomConstructionSites) {
        this.roomConstructionSites = roomConstructionSites;
    },

    // 添加 setRoomHostileCreeps 方法
    setRoomHostileCreeps: function(roomHostileCreeps) {
        this.roomHostileCreeps = roomHostileCreeps;
    },
    
    // 添加 setRoomResources 方法
    setRoomResources: function(roomResources) {
        this.roomResources = roomResources;
    },
    // 添加 setRoomTerrain 方法
    setRoomTerrain: function(roomTerrain) {
        this.roomTerrain = roomTerrain;
    },
    // 添加 setRoomBreakingPoints 方法
    setRoomBreakingPoints: function(roomBreakingPoints) {
        this.roomBreakingPoints = roomBreakingPoints;
    },
    // 添加 setSpecialMineralers 方法
    setSpecialMineralers: function(specialMineralers) {
        this.specialMineralers = specialMineralers;
    },

    /** 通过房间名字获取该房间全部的Harvesters @param {String} roomName*/
    getHarvestersByRoomName: function(roomName) {
        var Creeps = [];
        for (var creep of this.harvesters.values()) {
            if (creep.room.name == roomName) {
                Creeps.push(creep);
            }
        }
        return Creeps;
    },

    /** 通过房间名字获取该房间全部的Upgraders @param {String} roomName*/
    getUpgradersByRoomName: function(roomName) {
        var Creeps = [];
        for (var creep of this.upgraders.values()) {
            if (creep.room.name == roomName) {
                Creeps.push(creep);
            }
        }
        return Creeps;
    },

    /** 通过房间名字获取该房间全部的Builders @param {String} roomName*/
    getBuildersByRoomName: function(roomName) {
        var Creeps = [];
        for (var creep of this.builders.values()) {
            if (creep.room.name == roomName) {
                Creeps.push(creep);
            }
        }
        return Creeps;
    },

    /** 通过房间名字获取该房间全部的Repairers @param {String} roomName*/
    getRepairersByRoomName: function(roomName) {
        var Creeps = [];
        for (var creep of this.repairers.values()) {
            if (creep.room.name == roomName) {
                Creeps.push(creep);
            }
        }
        return Creeps;
    },

    /** 通过房间名字获取该房间全部的Trossers @param {String} roomName*/
    getTrossersByRoomName: function(roomName) {
        var Creeps = [];
        for (var creep of this.trossers.values()) {
            if (creep.room.name == roomName) {
                Creeps.push(creep);
            }
        }
        return Creeps;
    },
    /** 通过房间名字获取该房间全部的OtherBuilders @param {String} roomName*/
    getOtherBuildersByRoomName: function(roomName) {
        var Creeps = [];
        for (var creep of this.otherBuilders.values()) {
            if (creep.room.name == roomName) {
                Creeps.push(creep);
            }
        }
        return Creeps;
    },

    /** 通过房间名字获取该房间全部的Cleaners @param {String} roomName*/
    getCleanersByRoomName: function(roomName) {
        var Creeps = [];
        for (var creep of this.cleaners.values()) {
            if (creep.room.name == roomName) {
                Creeps.push(creep);
            }
        }
        return Creeps;
    },

    /** 通过房间名字获取该房间全部的Warriorers @param {String} roomName*/
    getWarriorersByRoomName: function(roomName) {
        var Creeps = [];
        for (var creep of this.warriorers.values()) {
            if (creep.room.name == roomName) {
                Creeps.push(creep);
            }
        }
        return Creeps;
    },

    /** 通过房间名字获取该房间全部的RoomBusters @param {String} roomName*/
    getRoomBustersByRoomName: function(roomName) {
        var Creeps = [];
        for (var creep of this.roomBusters.values()) {
            if (creep.room.name == roomName) {
                Creeps.push(creep);
            }
        }
        return Creeps;
    },

    /** 通过房间名字获取该房间全部的ControllerUpers @param {String} roomName*/
    getControllerUpersByRoomName: function(roomName) {
        var Creeps = [];
        for (var creep of this.controllerUpers.values()) {
            if (creep.room.name == roomName) {
                Creeps.push(creep);
            }
        }
        return Creeps;
    },

    /** 通过房间名字获取该房间全部的Truckers @param {String} roomName*/
    getTruckersByRoomName: function(roomName) {
        var Creeps = [];
        for (var creep of this.truckers.values()) {
            if (creep.room.name == roomName) {
                Creeps.push(creep);
            }
        }
        return Creeps;
    },

    /** 通过房间名字获取该房间全部的SpecialMineralers @param {String} roomName*/
    getSpecialMineralersByRoomName: function(roomName) {
        var Creeps = [];
        for (var creep of this.specialMineralers.values()) {
            if (creep.room.name == roomName) {
                Creeps.push(creep);
            }
        }  
        return Creeps;
    },


    getStructersByRoomNameAndStructerType: function(roomName,structerType) {
        var structers = [];
        var tempStructers = this.roomStructures.get(roomName);
        for (var structer of tempStructers) {
            if (structer.structureType == structerType) {
                structers.push(structer);
            }
        }
        return structers;
    },

    
};

module.exports = DataCenter;
