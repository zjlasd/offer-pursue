// 宏任务队列（模拟）
let taskQueue = [];
// 微任务队列（模拟）
let microTaskQueue = [];

// 模拟 setTimeout
function setTimeoutTask(fn, delay) {
    taskQueue.push(fn); // 将宏任务推入队列
}

// 模拟 Promise.then
function promiseThen(fn) {
    microTaskQueue.push(fn); // 将微任务推入微任务队列
}

// 模拟执行栈和事件循环
function eventLoop() {
    // 模拟执行同步任务（执行栈）
    console.log('Start Event Loop');

    // 先执行微任务队列
    while (microTaskQueue.length > 0) {
        const microTask = microTaskQueue.shift(); // 取出一个微任务并执行
        microTask(); // 执行微任务
    }

    // 然后执行宏任务队列
    while (taskQueue.length > 0) {
        const task = taskQueue.shift(); // 取出一个宏任务并执行
        task(); // 执行宏任务

        // 在宏任务执行完之后，再次检查微任务队列
        while (microTaskQueue.length > 0) {
            const microTask = microTaskQueue.shift(); // 取出一个微任务并执行
            microTask(); // 执行微任务
        }
    }

    console.log('End Event Loop');
}

// 测试模拟事件循环

setTimeoutTask(() => {
    console.log('Task 1: Macro task');
    promiseThen(() => {
        console.log('Task 1: Micro task after Macro');
    });
});

setTimeoutTask(() => {
    console.log('Task 2: Macro task');
    promiseThen(() => {
        console.log('Task 2: Micro task after Macro');
    });
});

promiseThen(() => {
    console.log('Task 3: Micro task');
});

// 启动事件循环
eventLoop();
