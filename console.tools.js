/**
 * 这个是控制台使用的工具
 * 将想要在控制台使用的方法放在这里,然后就可以在控制台进行调用了
 */
function consoleHelp() {
    var parameters; 
    // 获取控制台参数
    this.calculate = function() {
        // 从控制台读取输入信息
        parameters = prompt("请输入要计算的表达式:");
    };
    switch(parameters) {
        case "help":
            help();
            break;
        default:
            console.log("没有找到命令");
            break;
    }
};
function help() {
    console.log("将现有的所有可以使用的命令列出来");
}

