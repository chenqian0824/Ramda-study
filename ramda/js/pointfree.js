// pointfree例子
var addOne = x => x + 1;
var square = x => x * x;
var addOneThenSquare = R.pipe(square, addOne);
var pointfree1 = addOneThenSquare(3);
// console.log(pointfree1); // 10
// addOneThenSquare是一个合成函数。定义它的时候，根本不需要提到要处理的值，这就是 Pointfree。

var prop = (p, obj) => obj[p]; // 封装了读取操作，它需要两个参数p（属性名）和obj（对象）。
var propRole = R.curry(prop)('role'); // 将函数柯里化
var demo1 = propRole({role: 'fan'});
// console.log(demo1); // fan

var data = [
  {name: '张三', role: 'worker'},
  {name: '李四', role: 'worker'},
  {name: '王五', role: 'manager'},
];
var isWorker = s => s === 'worker';
var getWorkers = R.filter(R.pipe(R.prop('role'), isWorker));
var demo2 = getWorkers(data);
// console.log(demo2); 
// [
//   {"name": "张三", "role": "worker"},
//   {"name": "李四", "role": "worker"}
// ]

var str = 'Lorem ipsum dolor sit amet consectetur adipiscing elit';
// 上面是一个字符串，请问其中最长的单词有多少个字符？
// 以空格分割单词
var splitBySpace = s => s.split(' ');
// 获得每个单词的长度
var getLength = w => w.length;
// 单词数组转化为单词长度的数组
var getLengArr = arr => R.map(getLength, arr);
// 返回较大的数字
var getBiggerNumber = (a, b) => a > b ? a : b;
// 返回最大的一个数字
var findBiggestNumber = arr => R.reduce(getBiggerNumber, 0, arr);

var getLongestWordLength = R.pipe(  
    splitBySpace,
    getLengArr,
    findBiggestNumber
  );
var demo3 = getLongestWordLength(str);
// console.log(demo3); // 11

// 使用ramda库
var getLongestWordLength = R.pipe(
    R.split(' '),
    R.map(R.length),
    R.reduce(R.max, 0)
  );
var demo3 = getLongestWordLength(str);
// console.log(demo3); // 11

// 下面是一段服务器返回的 JSON 数据。
var data = {
    result: "SUCCESS",
    interfaceVersion: "1.0.3",
    requested: "10/17/2013 15:31:20",
    lastUpdated: "10/16/2013 10:52:39",
    tasks: [
        {id: 104, complete: false,            priority: "high",
                  dueDate: "2013-11-29",      username: "Scott",
                  title: "Do something",      created: "9/22/2013"},
        {id: 105, complete: false,            priority: "medium",
                  dueDate: "2013-11-22",      username: "Lena",
                  title: "Do something else", created: "9/22/2013"},
        {id: 107, complete: true,             priority: "high",
                  dueDate: "2013-11-22",      username: "Mike",
                  title: "Fix the foo",       created: "9/22/2013"},
        {id: 108, complete: false,            priority: "low",
                  dueDate: "2013-11-15",      username: "Punam",
                  title: "Adjust the bar",    created: "9/25/2013"},
        {id: 110, complete: false,            priority: "medium",
                  dueDate: "2013-11-15",      username: "Scott",
                  title: "Rename everything", created: "10/2/2013"},
        {id: 112, complete: true,             priority: "high",
                  dueDate: "2013-11-27",      username: "Lena",
                  title: "Alter all quuxes",  created: "10/5/2013"}
    ]
};

// 现在要求是，找到用户 Scott 的所有未完成任务，并按到期日期升序排列。
/*var getIncompleteTaskSummaries = function (membername) {
  return fetchData()
  .then(R.prop('tasks'))
  .then(R.filter(R.propEq('username', membername)))
  .then(R.reject(R.propEq('complete', true)))
  .then(R.map(R.pick(['id', 'dueData', 'title', 'priority'])))
  .then(R.sortBy(R.prop('dueData')));
};*/
var fetchData = function (data) {
  return Promise.resolve(data);
};
// 提取 tasks 属性
var SelectTasks = R.prop('tasks');

// 过滤出指定的用户
var filterMember = member => R.filter(
  R.propEq('username', member)
  );

// 排除已经完成的任务
var excludeCompletedTasks = R.reject(R.propEq('complete', true));

// 选取指定属性
var selectFields = R.map(
    R.pick(['id', 'dueDate', 'title', 'priority'])
  );

// 按照到期日期排序
var sortByDueDate = R.sortBy(R.prop('dueDate'));

// 合成函数
var getIncompleteTaskSummaries = function (membername) {
  return fetchData(data)
  .then(R.prop('tasks'))
  .then(R.filter(R.propEq('username', membername)))
  .then(R.reject(R.propEq('complete', true)))
  .then(R.map(R.pick(['id', 'dueData', 'title', 'priority'])))
  .then(R.sortBy(R.prop('dueData')));
};

var scottList = getIncompleteTaskSummaries('Scott');
console.log(scottList);
[[object Object] {
  dueDate: "2013-11-15",
  id: 110,
  priority: "medium",
  title: "Rename everything"
}, [object Object] {
  dueDate: "2013-11-29",
  id: 104,
  priority: "high",
  title: "Do something"
}]



























































