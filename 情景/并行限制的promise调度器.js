function createPromiseQueue(concurrency) {
let taskQueue = []; // 存储待执行的任务队列
let runningCount = 0; // 当前正在执行的任务数

// 尝试执行下一个任务
function next() {
if (runningCount < concurrency && taskQueue.length> 0) {
    const task = taskQueue.shift(); // 获取队列中的一个任务
    runningCount++;
    task().finally(() => {
    runningCount--;
    next(); // 任务完成后，继续尝试执行下一个任务
    });
    }
    }

    // 返回一个函数，添加任务到队列
    function add(task) {
    return new Promise((resolve, reject) => {
    taskQueue.push(() => {
    return task()
    .then(resolve)
    .catch(reject);
    });
    next(); // 每添加一个任务，就尝试开始执行
    });
    }

    return {
    add
    };
    }

    // 测试：模拟异步任务
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const task1 = () => delay(1000).then(() => console.log('Task 1 completed'));
    const task2 = () => delay(2000).then(() => console.log('Task 2 completed'));
    const task3 = () => delay(1500).then(() => console.log('Task 3 completed'));
    const task4 = () => delay(500).then(() => console.log('Task 4 completed'));

    // 创建一个最大并发数为 2 的队列
    const queue = createPromiseQueue(2);

    queue.add(task1);
    queue.add(task2);
    queue.add(task3);
    queue.add(task4);