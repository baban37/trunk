//这里很奇怪在游戏中如果使用import 就会报错 但是在本地运行就不会报错
//import roleHarvester from './role.harvester.js';
const cleanModule = require('./clean');
const creepWork = require('./creepwork');
const tools = require('./tools');
const factory = require('./factory');
const structureWork = require('./structureWork');
const initFactory = require('./initFactory');

module.exports.loop = function () {
    // 检查参数合理性   
    
    // 调用 clean 方法
    cleanModule.clean();
    
    // 初始化creep
    initFactory.initCreep();
    // 初始化房间
    initFactory.initRoom();
    
    // 根据不同情况孵化creep
    factory.spawnCreeps(Game);
    
    // 执行creep的工作
    creepWork.startWork(Game);
    
    // 执行建筑的工作
    structureWork.startWork(Game);
}