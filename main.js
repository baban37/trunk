//这里很奇怪在游戏中如果使用import 就会报错 但是在本地运行就不会报错
//import roleHarvester from './role.harvester.js';
const cleanModule = require('./clean');
const creepWork = require('./creepwork');
const tools = require('./tools');
const factory = require('./factory');
const structureWork = require('./structureWork');
const initFactory = require('./initFactory');
const consoleManager = require('./consoleManager');
const gm = require('./gmService');

startGame ();

module.exports.loop = function () {
    // 检查参数合理性   
    
    // 调用 clean 方法
    cleanModule.clean();
    
    // 初始化creep
    initFactory.initCreep();
    // 初始化房间
    initFactory.initRoom();
    
    // 根据不同情况孵化creep
    
    // factory.spawnCreeps(Game);

    // 
    factory.run();
    
    // 执行creep的工作
    creepWork.startWork(Game);
    
    // 执行建筑的工作
    structureWork.startWork(Game);
}

/**
 * 开始游戏的函数
 * 该函数用于初始化游戏环境，检查参数合理性，并在控制台输出游戏开始的消息
 * 在此处尝试使用HTML对控制台进行布局
 * 开始游戏
 */
function startGame () {   
    //这里应该加载一些不会改变数据
    consoleManager.log("开始游戏\n");
    /** 注入GM */
    Object.defineProperty(global, 'gm', {
        value: gm,
        writable: true, // 是否可写
        enumerable: true, // 是否可枚举
        configurable: true // 是否可配置
    });
}