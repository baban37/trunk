/**
 * 这是一个配置文件里面存放配置信息
 */
const config = {
    /** 红 */
    RED: "<font color='red'>",
    /** 绿 */
    GREEN: "<font color='green'>",
    /** 黄 */
    YELLOW: "<font color='yellow'>",
    /** 蓝 */
    BLUE: "<font color='blue'>",
    /** 紫色 */
    MAGENTA: "<font color='magenta'>",
    /** 青 */
    CYAN: "<font color='cyan'>",
    /** 白 */
    WHITE: "<font color='white'>",
    /** 结束 */
    OVER : "</font>",
    /** 换行 */
    NEWLINE : "<br>",

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
    CLEANER_NUM: [4, 0, 1000,500],
    /**战士数量 权重,数量,最高消耗能量,最低消耗能量 */
    WARRIORER_NUM: [5, 0,2000,150],
    /**房间破坏者数量 这个数量应该和我盯上的房间数量一致 权重,数量,最高消耗能量,最低消耗能量 */
    ROOMBUSTER_NUM: [6, 0, 1300,650],
    /**其他建造者数量 权重,数量,最高消耗能量 ,最低消耗能量*/
    OTHERBUILDER_NUM: [7, 0, 1000,1000],
    /**远方运输队数量 权重,数量,最高消耗能量,最低消耗能量 */
    TROSSER_NUM: [8, 0, 1000,1000],

    /** 我盯上的房间名字 */
    RESERVED_ROOM_NAME : ["E51S29"],
    /** 我自己的房间名字 */
    MY_ROOM_NAME : "E48S56",
    /** 冲级搬运工 权重,数量,最高消耗能量,最低消耗能量  */
    CONTROLLERUPER_NUM : [9,0,1000,1000],
    /** 大卡车 权重,数量,最高消耗能量,最低消耗能量  */
    TRUCKER_NUM : [10,2, 1000,1000],
    /** 挖矿物的工人 权重,数量,最高消耗能量,最低消耗能量 */
    SPECIALMINERALER_NUM : [11, 1, 2000,2000],

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
    /** specialMineraler 身体比例 */
    SPECIALMINERALER_BODY:[
        {
            body : WORK,
            weight : 5
        },
        {
            body : CARRY,
            weight : 3
        },
        {
            body : MOVE,
            weight : 2
        },
    ],


/********************** 新单位构建方法 **********************/
/** 房屋等级1 */
ROOM_ENERGY_LEVEL_1:{
    level:1,
    energy: 300,
    roles:[
        {
            parameters:true,
            role :'harvester',
            num : 2,
            body : [WORK,CARRY,MOVE],
            bodyNum : [1,1,1],
        },
        {
            parameters:true,
            role :'upgrader',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [1,1,1], 
        },
        {
            parameters:true,
            role :'builder',
            num : 2,
            body : [WORK,CARRY,MOVE],
            bodyNum : [1,1,1],
        },
        {
            parameters:true,
            role :'repairer',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [1,1,1], 
        },
    ],
},

ROOM_ENERGY_LEVEL_2:{
    level:2,
    energy: 550,
    roles:[
        {
            /** 是否有必要生成 */
            parameters:true,
            role :'harvester',
            num : 2,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2],
        },
        {
            parameters:true,
            role :'upgrader',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2], 
        },
        {
            parameters:true,
            role :'builder',
            num : 2,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2],
        },
        {
            parameters:true,
            role :'repairer',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2], 
        },
        {
            parameters:true,
            role :'trucker',
            num : 1,
            body : [CARRY,MOVE],
            bodyNum : [6,5],
        },
        {   
            parameters:false,
            role :'controllerUper',
            num : 1,
            body : [CARRY,MOVE],
            bodyNum : [6,5],
        },
        {
            parameters:false,
            role :'roomBuster',
            num : 1,
            body : [CLAIM,MOVE],
            bodyNum : [10,10],
        },
        {
            parameters:false,
            role :'specialMineraler',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2],
        },
        {
            parameters:false,
            role :'cleaner',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2],
        },
        {
            parameters:false,
            role :'warriorer',
            num : 1,
            body : [ATTACK,MOVE],
            bodyNum : [3,2],
        },
        {
            parameters:false,
            role :'trosser',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2],
        },
        {
            parameters:false,
            role :'otherBuilder',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2], 
        },
    ],
},
ROOM_ENERGY_LEVEL_3:{
    level:3,
    energy: 800,
    roles:[
        {
            /** 是否有必要生成 */
            parameters:true,
            role :'harvester',
            num : 2,
            body : [WORK,CARRY,MOVE],
            bodyNum : [5,3,3],
        },
        {
            parameters:true,
            role :'upgrader',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [5,3,3], 
        },
        {
            parameters:true,
            role :'builder',
            num : 2,
            body : [WORK,CARRY,MOVE],
            bodyNum : [5,3,3],
        },
        {
            parameters:true,
            role :'repairer',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [5,3,3], 
        },
        {
            parameters:true,
            role :'trucker',
            num : 1,
            body : [CARRY,MOVE],
            bodyNum : [8,8],
        },
        {   
            parameters:false,
            role :'controllerUper',
            num : 1,
            body : [CARRY,MOVE],
            bodyNum : [6,5],
        },
        {
            parameters:false,
            role :'roomBuster',
            num : 1,
            body : [CLAIM,MOVE],
            bodyNum : [8,8],
        },
        {
            parameters:false,
            role :'specialMineraler',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2],
        },
        {
            parameters:false,
            role :'cleaner',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2],
        },
        {
            parameters:false,
            role :'warriorer',
            num : 1,
            body : [ATTACK,MOVE],
            bodyNum : [3,2],
        },
        {
            parameters:false,
            role :'trosser',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2],
        },
        {
            parameters:false,
            role :'otherBuilder',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2], 
        },
    ]
},
ROOM_ENERGY_LEVEL_4:{
    level:4,
    energy: 1300,
    roles:[
        {
            /** 是否有必要生成 */
            parameters:true,
            role :'harvester',
            num : 2,
            body : [WORK,CARRY,MOVE],
            bodyNum : [5,8,8],
        },
        {
            parameters:true,
            role :'upgrader',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [5,8,8], 
        },
        {
            parameters:true,
            role :'builder',
            num : 2,
            body : [WORK,CARRY,MOVE],
            bodyNum : [5,8,8],
        },
        {
            parameters:true,
            role :'repairer',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [5,8,8], 
        },
        {
            parameters:true,
            role :'trucker',
            num : 1,
            body : [CARRY,MOVE],
            bodyNum : [13,13],
        },
        {   
            parameters:false,
            role :'controllerUper',
            num : 1,
            body : [CARRY,MOVE],
            bodyNum : [6,5],
        },
        {
            parameters:false,
            role :'roomBuster',
            num : 1,
            body : [CLAIM,MOVE],
            bodyNum : [8,8],
        },
        {
            parameters:false,
            role :'specialMineraler',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2],
        },
        {
            parameters:false,
            role :'cleaner',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2],
        },
        {
            parameters:false,
            role :'warriorer',
            num : 1,
            body : [ATTACK,MOVE],
            bodyNum : [3,2],
        },
        {
            parameters:false,
            role :'trosser',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2],
        },
        {
            parameters:false,
            role :'otherBuilder',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2], 
        },
    ]
},

ROOM_ENERGY_LEVEL_5:{
    level:5,
    energy: 1800,
    roles:[
        {
            /** 是否有必要生成 */
            parameters:true,
            role :'harvester',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [10,8,8],
        },
        {
            parameters:true,
            role :'upgrader',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [10,8,8], 
        },
        {
            parameters:true,
            role :'builder',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [10,8,8],
        },
        {
            parameters:true,
            role :'repairer',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [10,8,8], 
        },
        {
            parameters:true,
            role :'trucker',
            num : 1,
            body : [CARRY,MOVE],
            bodyNum : [18,18],
        },
        {   
            parameters:false,
            role :'controllerUper',
            num : 1,
            body : [CARRY,MOVE],
            bodyNum : [6,5],
        },
        {
            parameters:false,
            role :'roomBuster',
            num : 1,
            body : [CLAIM,MOVE],
            bodyNum : [8,8],
        },
        {
            parameters:false,
            role :'specialMineraler',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2],
        },
        {
            parameters:false,
            role :'cleaner',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2],
        },
        {
            parameters:false,
            role :'warriorer',
            num : 1,
            body : [ATTACK,MOVE],
            bodyNum : [3,2],
        },
        {
            parameters:false,
            role :'trosser',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2],
        },
        {
            parameters:false,
            role :'otherBuilder',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2], 
        },
    ]
},

ROOM_ENERGY_LEVEL_6:{
    level:6,
    energy: 2300,
    roles:[
        {
            /** 是否有必要生成 */
            parameters:true,
            role :'harvester',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [15,6,10],
        },
        {
            parameters:true,
            role :'trucker',
            num : 1,
            body : [CARRY,MOVE],
            bodyNum : [23,23],
        },
        {
            parameters:true,
            role :'upgrader',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [15,6,10], 
        },
        {
            parameters:true,
            role :'builder',
            num : 0,
            body : [WORK,CARRY,MOVE],
            bodyNum : [15,6,10],
        },
        {
            parameters:true,
            role :'cleaner',
            num : 1,
            body : [CARRY,MOVE],
            bodyNum : [10,20],
        },
        
        {
            parameters:true,
            role :'repairer',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [15,6,10], 
        },
        {   
            parameters:false,
            role :'controllerUper',
            num : 1,
            body : [CARRY,MOVE],
            bodyNum : [6,5],
        },
        {
            parameters:false,
            role :'roomBuster',
            num : 1,
            body : [CLAIM,MOVE],
            bodyNum : [8,8],
        },
        {
            parameters:false,
            role :'specialMineraler',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [15,6,10],
        },
        
        {
            parameters:false,
            role :'warriorer',
            num : 1,
            body : [ATTACK,MOVE],
            bodyNum : [3,2],
        },
        {
            parameters:false,
            role :'trosser',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2],
        },
        {
            parameters:false,
            role :'otherBuilder',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2], 
        },
    ]
},

ROOM_ENERGY_LEVEL_7:{
    level:7,
    energy: 5600,
    roles:[
        {
            /** 是否有必要生成 */
            parameters:true,
            role :'harvester',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [25,20,5],
        },
        {
            parameters:true,
            role :'upgrader',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [25,20,5], 
        },
        {
            parameters:true,
            role :'builder',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [25,20,5],
        },
        {
            parameters:true,
            role :'repairer',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [15,20,15], 
        },
        {
            parameters:true,
            role :'trucker',
            num : 1,
            body : [CARRY,MOVE],
            bodyNum : [25,25],
        },
        {   
            parameters:false,
            role :'controllerUper',
            num : 1,
            body : [CARRY,MOVE],
            bodyNum : [6,5],
        },
        {
            parameters:false,
            role :'roomBuster',
            num : 1,
            body : [CLAIM,MOVE],
            bodyNum : [8,8],
        },
        {
            parameters:false,
            role :'specialMineraler',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2],
        },
        {
            parameters:false,
            role :'cleaner',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2],
        },
        {
            parameters:false,
            role :'warriorer',
            num : 1,
            body : [ATTACK,MOVE],
            bodyNum : [3,2],
        },
        {
            parameters:false,
            role :'trosser',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2],
        },
        {
            parameters:false,
            role :'otherBuilder',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2], 
        },
    ]
},

ROOM_ENERGY_LEVEL_8:{
    level:8,
    energy: 12900,
    roles:[
        {
            /** 是否有必要生成 */
            parameters:true,
            role :'harvester',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [25,20,5],
        },
        {
            parameters:true,
            role :'upgrader',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [25,20,5], 
        },
        {
            parameters:true,
            role :'builder',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [25,20,5],
        },
        {
            parameters:true,
            role :'repairer',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [15,20,15], 
        },
        {
            parameters:true,
            role :'trucker',
            num : 1,
            body : [CARRY,MOVE],
            bodyNum : [25,25],
        },
        {   
            parameters:false,
            role :'controllerUper',
            num : 1,
            body : [CARRY,MOVE],
            bodyNum : [6,5],
        },
        {
            parameters:false,
            role :'roomBuster',
            num : 1,
            body : [CLAIM,MOVE],
            bodyNum : [8,8],
        },
        {
            parameters:false,
            role :'specialMineraler',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2],
        },
        {
            parameters:false,
            role :'cleaner',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2],
        },
        {
            parameters:false,
            role :'warriorer',
            num : 1,
            body : [ATTACK,MOVE],
            bodyNum : [3,2],
        },
        {
            parameters:false,
            role :'trosser',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2],
        },
        {
            parameters:false,
            role :'otherBuilder',
            num : 1,
            body : [WORK,CARRY,MOVE],
            bodyNum : [3,3,2], 
        },
    ]
},


};
module.exports = config;