/**
 * 这是一个配置文件里面存放配置信息
 */
const config = {
    // 角色数量信息
    /**建筑工人数量 权重,数量,最高消耗能量,最低消耗能量  */
    BUILDER_NUM: [1, 1, 1500,300],
    /**搬运工数量 权重,数量,最高消耗能量,最低消耗能量 */
    HARVESTER_NUM: [1, 2, 1000,300],
    /**升级工数量 权重,数量,最高消耗能量,最低消耗能量 */
    UPGRADER_NUM: [2, 1, 1500,300],
    /**维修工数量 权重,数量,最高消耗能量,最低消耗能量 */
    REPAIRER_NUM: [3, 1, 1000,300],
    /**清理工数量 权重,数量,最高消耗能量,最低消耗能量 */
    CLEANER_NUM: [4, 1, 1000,500],
    /**战士数量 权重,数量,最高消耗能量,最低消耗能量 */
    WARRIORER_NUM: [5, 1,2000,150],
    /**房间破坏者数量 这个数量应该和我盯上的房间数量一致 权重,数量,最高消耗能量,最低消耗能量 */
    ROOMBUSTER_NUM: [6, 0, 1300,650],
    /**其他建造者数量 权重,数量,最高消耗能量 ,最低消耗能量*/
    OTHERBUILDER_NUM: [7, 0, 1000,1000],
    /**远方运输队数量 权重,数量,最高消耗能量,最低消耗能量 */
    TROSSER_NUM: [8, 4, 1000,1000],

    /** 我盯上的房间名字 */
    RESERVED_ROOM_NAME : ["E51S29"],
    /** 我自己的房间名字 */
    MY_ROOM_NAME : "E48S56",
    /** 冲级搬运工 权重,数量,最高消耗能量,最低消耗能量  */
    CONTROLLERUPER_NUM : [9,0,1000,1000],
    /** 大卡车 权重,数量,最高消耗能量,最低消耗能量  */
    TRUCKER_NUM : [10,2, 1000,1000],
    /** 权重 */
    WEIGHT:0,
    /** 数量 */
    NUMBER:1,
    /** 最高消耗能量 */
    MAXENERGY:2,
    /** 最低消耗能量 */
    MINENERGY:3,
    /** 身体部件的价格 */    
    BODY_PART_COSTS: {
        MOVE: 50,
        WORK: 100,
        CARRY: 50,
        ATTACK: 80,
        RANGED_ATTACK: 150,
        HEAL: 250,
        CLAIM: 600,
        TOUGH: 10
    },

    /** harvester身体比例 */
    HARVESTER_BODY:[
        {
            body : WORK,
            weight : 5
        },
        {
            body : CARRY,
            weight : 2
        },
        {
            body : MOVE,
            weight : 3
        },
    ],
    /** upgrader 身体比例 */
    UPGRADER_BODY:[
        {
            body : WORK,
            weight : 10
        },
        {
            body : CARRY,
            weight : 2
        },
        {
            body : MOVE,
            weight : 3
        },
    ],
    /** builder 身体比例 */
    BUILDER_BODY:[
        {
            body : WORK,
            weight : 10
        },
        {
            body : CARRY,
            weight : 2
        },
        {
            body : MOVE,
            weight : 3
        },
    ],
    /** repairer 身体比例 */
    REPAIRER_BODY:[
        {
            body : WORK,
            weight : 5
        },
        {
            body : CARRY,
            weight : 2
        },
        {
            body : MOVE,
            weight : 3
        },
    ],
    /** cleaner 身体比例 */
    CLEANER_BODY:[
        {
            body : CARRY,
            weight : 4
        },
        {
            body : MOVE,
            weight : 6
        },
    ],
    /** warriorer 身体比例 */
    WARRIORER_BODY:[
        {
            body : ATTACK,
            weight : 5
        },
        {
            body : MOVE,
            weight : 5
        },
    ],
    /** roomBuster 身体比例 */
    ROOMBUSTER_BODY:[
        {
            body : CLAIM,
            weight : 12
        },
        {
            body : MOVE,
            weight : 1
        },
    ],
    /** otherBuilder 身体比例 */
    OTHERBUILDER_BODY:[
        {
            body : WORK,
            weight : 5
        },
        {
            body : CARRY,
            weight : 2
        },
        {
            body : MOVE,
            weight : 3
        },
    ],
    /** trosser 身体比例 */
    TROSSER_BODY:[
        {
            body : WORK,
            weight : 5
        },
        {
            body : CARRY,
            weight : 2
        },
        {
            body : MOVE,
            weight : 3
        },
    ],
    /** controllerUper 身体比例 */
    CONTROLLERUPER_BODY:[
        {
            body : CARRY,
            weight : 5
        },
        {
            body : MOVE,
            weight : 5
        },
    ],
    /** trucker 身体比例 */
    TRUCKER_BODY:[
        {
            body : CARRY,
            weight : 5
        },
        {
            body : MOVE,
            weight : 5
        },
    ],


};
module.exports = config;