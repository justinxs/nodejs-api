const process = require('process');
const fs = require('fs');
// 当 Node.js 清空其事件循环并且没有其他工作要安排时，会触发 'beforeExit' 事件
// 对于导致显式终止的条件，不会触发 'beforeExit' 事件，例如调用 process.exit() 或未捕获的异常

process.on('beforeExit', (code) => {
    console.log('进程 beforeExit 事件的代码: ', code);
    // 里面的异步任务导致 Node.js 进程继续，会出现死循环
    // setTimeout(() => {
    //     console.log('异步任务')
    // }, 2000);
});

process.on('exit', (code) => {
    console.log('进程 exit 事件的代码: ', code);
});

console.log('此消息最新显示');
// process.exit()
// 打印:
// 此消息最新显示
// 进程 beforeExit 事件的代码: 0
// 进程 exit 事件的代码: 0


// 当 Node.js 进程因以下原因之一即将退出时，则会触发 'exit' 事件：
// 显式调用 process.exit() 方法；
// Node.js 事件循环不再需要执行任何其他工作。
// 此时无法阻止退出事件循环，并且一旦所有 'exit' 事件的监听器都已完成运行时，Node.js 进程将终止
// process.exit()
process.on('exit', (code) => {
    setTimeout(() => {
        console.log('此处不会运行');
    }, 0);
});


// 'uncaughtException' 事件
// 当未捕获的 JavaScript 异常一直冒泡回到事件循环时，会触发 'uncaughtException' 事件
process.on('uncaughtException', (err, origin) => {
    fs.writeSync(
        process.stderr.fd,
        `error: ${err}\n` +
        `origin: ${origin}`
    );
});
process.on('uncaughtExceptionMonitor', (err, origin) => {
    MyMonitoringTool.logSync(err, origin, 'monitor');
});
setTimeout(() => {
    console.log('这里仍然会运行');
}, 500);

// 故意引起异常，但不要捕获它。
nonexistentFunc();
console.log('这里不会运行');





