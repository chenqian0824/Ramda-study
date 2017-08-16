let gt1 = R.gt(2)(1);
// console.log(gt1); true
let gt2 = R.gt('a')('c');
// console.log(gt2); false

let gte1 = R.gte(2)(2);
// console.log(gte1); true
let gte2 = R.gte('a')('c');
// console.log(gte2); false

let lt1 = R.lt(2)(1);
// console.log(lt1); false
let lt2 = R.lt('a')('z');
// console.log(lt2); true

let lte1 = R.lte(1)(2);
// console.log(lte1); true
let lte2 = R.lte('a')('v');
// console.log(lte2); true

let equals1 = R.equals(1)(1);
// console.log(equals1); true
let equals2 = R.equals(1)('1');
// console.log(equals2); false
var equals3 = R.equals([1, 2])([1,2]);
// console.log(equals3); // true
let equals4 = R.equals({a:1})({a:2});
// console.log(equals4); // false

let eqBy1 = R.eqBy(Math.abs, 5, -5);
// console.log(eqBy1);

let add1 = R.add(1)('10');
// console.log(add1); // 11

let subtract1 = R.subtract(10)(2);
//console.log(subtract1); // 8

let multiply1 = R.multiply(5)(6);
// console.log(multiply1); // 30

let divide1 = R.divide(5)(10);
// console.log(divide1); // 30

var gt10 = x => x > 10;
var even = x => x % 2 === 0;
let either1 = R.either(gt10)(even);
let either2 = either1(18);
let either3 = either1(3);
// console.log(either2); // true
// console.log(either3); // false

var gt10 = x => x > 10;
var even = x => x % 2 === 0;
let both1 = R.both(gt10)(even);
let both2 = both1(18);
let both3 = both1(4);
// console.log(both2); // true
// console.log(both3); // false

var gt10 = x => x > 10;
var lt20 = x => x < 20;
var even = x => x % 2 === 0;
let allPass1 = R.allPass([gt10, even, lt20]);
let allPass2 = allPass1(16);
let allPass3 = both1(13);
// console.log(allPass2); // true
// console.log(allPass3); // false

let split1 = R.split('.')('a.b.c.fanerge');
// console.log(split1); // ["a", "b", "c", "fanerge"]

let test1 = R.test(/^f/)('fanerge');
// console.log(test1); // true


let match1 = R.match(/([a-z]a)/g)('bananas')
// console.log(match1); // ["ba", "na", "na"]
let match2 = R.match(/a/)('n');
// console.log(match2); // []

let compose1 = R.compose(Math.abs, R.add(1), R.multiply(2))(4)
// console.log(compose1); // 9

let pipe1 = R.pipe(Math.abs, R.add(1), R.multiply(2))(4)
// console.log(pipe1);

var sumOfArr = arr => {
    let sum = 0;
    arr.forEach(i => sum += i);
    return sum;
};
var lengthArr = arr => arr.length;
var converge1 = R.converge(R.divide, [sumOfArr, lengthArr]);
var converge2 = converge1([1, 2, 3, 4, 5]);
// console.log(converge2); // 3

var addFourNumbers = (a, b, c, d) => a + b + c + d;
var curriedAddFourNumbers = R.curry(addFourNumbers);
var f = curriedAddFourNumbers(1)(2)(3)(4);
// console.log(f); // 10

var multiply2 = (a, b) => a * b;
var double = R.partial(multiply2, [3]);
// console.log(double(2));

var greet = (salutation, title, firstName, lastName) =>
  salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
var greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);
var dd = greetMsJaneJones('Hello'); 
// console.log(dd); // 'Hello, Ms. Jane Jones!'

var decreaseOne = x => x - 1;
var increaseOne = x => x + 1;
var useWith1 = R.useWith(Math.pow, [decreaseOne, increaseOne])(2)(44);
// console.log(useWith1) // 2^5 32

var productOfArr = arr => {
  var product = 1;
  arr.forEach(i => product *= i);
  return product;
};
var count = 0;
var factorial = R.memoize(n => {
  count += 1;
  return productOfArr(R.range(1, n + 1));
});
var memoize1 = factorial(5);
// console.log(memoize1, count); // 120, 1

var gt10 = x => x > 10;
var lte10 = R.complement(gt10);
var complement1 = lte10(11);
// console.log(complement1); // false

var takesThreeArgs = function (a, b, c) {
    return [a, b, c];
};
var takesTwoArgs = R.binary(takesThreeArgs);
var binary1 = takesTwoArgs(1, 2, 3);
// console.log(binary1); // [1, 2, undefined]

// var sayX = x => console.log('x is' + x);
// var tap1 = R.tap(sayX)(100);
// console.log(tap1); // x is100 100

// var tap2 = R.pipe(R.assoc('a', 2), R.tap(console.log),R.assoc('a', 3))({a: 1});
// console.log(tap2);

var f = (x, y) => {
    return x + y;
};
var zipWith1 = R.zipWith(f)([1, 2, 3])([4, 5, 6]);
// console.log(zipWith1); // [5, 7, 9]

var nums = [1, 2, 3, -99, 42, 6, 7];
var apply1 = R.apply(Math.max)(nums);
// console.log(apply1); // 42

var getMetrics = R.applySpec({
    sum: R.add,
    nested: {mul: R.multiply}
});
var applySpec1 = getMetrics(2, 4);
//console.log(applySpec1); // { sum: 6, nested: { mul: 8 } }

var byAge = R.ascend(R.prop('age'));
var people = [
    {name: 'fan', age: 11},
    {name: 'yu', age: 8},
    {name: 'zhen', age: 9}
];
var ascend1 = R.sort(byAge)(people);
// console.log(ascend1); // [ {name: 'yu', age: 8}, {name: 'zhen', age: 9}, {name: 'fan', age: 11}];

var byAge = R.descend(R.prop('age'));
var people = [
    {name: 'fan', age: 11},
    {name: 'yu', age: 8},
    {name: 'zhen', age: 9}
];
var descend1 = R.sort(byAge)(people);
// console.log(descend1); // [ {name: 'fan', age: 11}, {name: 'zhen', age: 9}, {name: 'yu', age: 8}];

var contains1 = R.contains(3)([1,2]);
var contains2 = R.contains({name: 'fan'})([{name: 'fan'},2]);
// console.log(contains1); // false
// console.log(contains2); // true

var equals3 = R.equals(3);
var all1 = R.all(equals3)([3, 3]);
// console.log(all1); // true

var lessThan0 = R.flip(R.lt)(0);
var lessThan2 = R.flip(R.lt)(2);
var any1 = R.any(lessThan0)([1, 2]);
// console.log(any1); // false
var any2 = R.any(lessThan2)([1, 2]);
// console.log(any2); // true

var isEven = n => n % 2 === 0;
var none1 = R.none(isEven)([1, 3, 5, 7, 9, 11]) // true
var none2 = R.none(isEven)([1, 3, 5, 7, 8, 11]) // false
// console.log(none2); // true

var head1 = R.head([1, 2, 3]);
// console.log(head1); // 1

var last1 = R.last('fan');
// console.log(last1); // n

var tail1 = R.tail([1, 2, 3]);
// console.log(tail1);  // [2, 3]

var init1 = R.init([1, 2, 3]);
// console.log(init1);  // [1, 2]

var list = [1, 2, 3, 4];
var nth1 = R.nth(0)(list);
// console.log(nth1); // 1

var takeLast1 = R.takeLast(3)([1, 2, 3, 4]);
// console.log(takeLast1); // [2, 3, 4]

var slice1 = R.slice(1, 3)([1, 2, 3, 4]);
// console.log(slice1); // [2, 3]

var remove1 = R.remove(2, 3)([1, 2, 3, 4, 5, 6, 7, 8]);
// console.log(remove1); // [1, 2, 6, 7, 8]

var insert1 = R.insert(2, 'x')([1, 2, 3]);
// console.log(insert1); // [1, 2, "x", 3]

var insertAll1 = R.insertAll(2, ['x', 'y', 'z'])([1, 2, 3, 4]);
// console.log(insertAll1); // [1, 2, "x", "y", "z", 3, 4]

var prepend1 = R.prepend('fee')(['ss', 'ee']);
// console.log(prepend1); // ["fee", "ss", "ee"]

var append1 = R.append('test')(['ss']);
// console.log(append1); // ["ss", "test"]

var intersperse1 = R.intersperse('/')(['aa', 'bb', 'cc']);
// console.log(intersperse1); // ["aa", "/", "bb", "/", "cc"]

var join1 = R.join('|')([1, 2, 3]);
// console.log(join1); // 1|2|3

var isEven = n => n % 2 === 0;
var filter1 = R.filter(isEven)([1, 2, 3]);
// console.log(filter1); // [2]

var reject1 = R.reject(isEven)([1, 2, 3]);
// console.log(reject1); // [1, 3]

var isNotFour = x => x !== 4;
var takeWhile1 = R.takeWhile(isNotFour)([1, 2, 3, 4, 3])
// console.log(takeWhile1); // [1, 2, 3]

var lteTwo = x => x <= 2;
var dropWhile1 = R.dropWhile(lteTwo)([1, 2, 3, 4, 3, 2, 1]);
// console.log(dropWhile1); // [3, 4, 3, 2, 1]

var without1 = R.without([1, 2])([1, 2, 1, 3, 4]);
// console.log(without1); // [3, 4]

var numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
var countBy1 = R.countBy(Math.floor)(numbers);
// console.log(countBy1); // {1: 3, 2: 2, 3: 1}

var splitAt1 = R.splitAt(1)([1, 2, 3]);
// console.log(splitAt1); // [[1],[2, 3]]

var splitEvery1 = R.splitEvery(3)([1, 2, 3, 4, 5, 6, 7]);
// console.log(splitEvery1); // [[1, 2, 3], [4, 5, 6], [7]]

var splitWhen1 = R.splitWhen(R.equals(2))([1, 2, 3, 1, 2, 3]);
// console.log(splitWhen1); // [[1], [2, 3, 1, 2, 3]]

var aperture1 = R.aperture(3)([1, 2, 3, 4, 5, 6, 7]);
// console.log(aperture1); // [[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7]]

var partition1 = R.partition(R.contains('s'))(['aaa', 'bbb', 'sss']);
// console.log(partition1); // [['sss'], ["aaa", "bbb"]]

var indexOf1 = R.indexOf(3)([1, 2, 3, 4]);
// console.log(indexOf1); // 2

var lastIndexOf1 = R.lastIndexOf(3)([-1, 3, 3, 0, 1, 2, 3, 4]);
// console.log(lastIndexOf1); // 6

var double = x => x * 2;
var map1 = R.map(double)([1, 2, 3]);
// console.log(map1); // [2, 4, 6]

var mapIndexed = R.addIndex(R.map);
var mapIndex1 = mapIndexed((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);
// console.log(mapIndex1); // ["0-f", "1-o", "2-o", "3-b", "4-a", "5-r"]

// var printXPlusFive = x => console.log(x + 5);
// var forEach1 = R.forEach(printXPlusFive, [1, 2, 3]); 
// console.log(forEach1); // [1, 2, 3]

var mySubtract = function (a, b) {
    return a - b;
};
var reduce1 = R.reduce(mySubtract, 0)([1, 2, 3, 4]);
// console.log(reduce1); // -10

var reduceRight1 = R.reduceRight(R.subtract, 0)([1, 2, 3, 4]);
// console.log(reduceRight1); // -2

var isOdd = (acc, x) => x % 2 === 1;
var ys = [2, 4, 6];
var reduceWhile1 = R.reduceWhile(isOdd, R.add, 111)(ys);
// console.log(reduceWhile1); // 111

var diff = function (a, b) { return a -b; };
var sort1 = R.sort(diff)([4, 2, 7, 5]);
// console.log(sort1); // [2, 4, 5, 7]

var alice = {
    name: 'alice',
    age: 40
};
var bob = {
    name: 'bob',
    age: 30
};
var clara = {
    name: 'clara',
    age: 40
};
var people = [clara, bob, alice];
var ageNameSort = R.sortWith([
        // R.descend(R.prop('age')),
        R.ascend(R.prop('name'))
    ]);
var sortWith1 = ageNameSort(people);
// console.log(sortWith1); // [{name: "alice", age: 40}, {name: "bob", age: 30}, {name: "clara", age: 40}]

var adjust1 = R.adjust(R.add(10) ,1)([1, 2, 3]);
// console.log(adjust1); // [1, 12, 3]

var ap1 = R.ap([R.multiply(2), R.add(3)])([1, 2, 3]);
// console.log(ap1); // [2, 4, 6, 4, 5, 6]

var flatten1 = R.flatten([1, 2, [ 3, 4, 5, [6]]]);
// console.log(flatten1); // [1, 2, 3, 4, 5, 6]

var groupWith1 = R.groupWith(R.equals)([0, 1, 1, 2, 3, 5, 8, 13, 21]);
// console.log(groupWith1); // [[0], [1, 1], [2], [3], [5], [8], [13], [21]]

var concat1 = R.concat([1, 2])(['a', 'b']);
// console.log(concat1); // [1, 2, "a", "b"]

var zip1 = R.zip([1, 2, 3])(['a', 'b', 'c']);
// console.log(zip1); // [[1, "a"], [2, "b"], [3, "c"]]

var zipObj1 = R.zipObj(['a', 'b', 'c'])([1, 2, 3]);
// console.log(zipObj1); // {a: 1, b: 2, c: 3}

var xprod1 = R.xprod([1, 2])(['a', 'b']);
// console.log(xprod1); // [[1, "a"], [1, "b"], [2, "a"], [2, "b"]]

var intersection1 = R.intersection([1, 2, 3, 4])([4, 3, 8]);
// console.log(intersection1); // [4, 3]

var buffaloSpringfield = [
  {id: 824, name: 'Richie Furay'},
  {id: 177, name: 'Neil Young'}
];
var csny = [
  {id: 204, name: 'David Crosby'},
  {id: 177, name: 'Neil Young'}
];
var intersectionWith1 = R.intersectionWith(R.eqBy(R.prop('id')), buffaloSpringfield)(csny);
// console.log(intersectionWith1); // [{id: 177, name: "Neil Young"}]

var difference1 = R.difference([1, 2, 3, 4])([7, 6, 5, 4, 3]);
// console.log(difference1); // [1, 2]

var cmp = (x, y) => x.a === y.a;
var l1 = [{a: 1}, {a: 2}, {a: 3}];
var l2 = [{a: 3}, {a: 4}];
var differenceWith1 = R.differenceWith(cmp, l1)(l2);
// console.log(differenceWith1); // [{a: 1}, {a: 2}]

var symmetricDifference1 = R.symmetricDifference([1, 2, 3, 4])([7, 6, 5, 4, 3]);
// console.log(symmetricDifference1); // [1, 2, 7, 6, 5]

var eqA = R.eqBy(R.prop('a'));
var l1 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
var l2 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
var symmetricDifferenceWith1 = R.symmetricDifferenceWith(eqA, l1, l2);
// console.log(symmetricDifferenceWith1); // [{a: 1}, {a: 2}, {a: 5}, {a: 6}]

var xs = [{a: 1}, {a: 2}, {a: 3}];
var find1 = R.find(R.propEq('a', 2))(xs);
// console.log(find1); // [{a: 2}]

var findIndex1 = R.findIndex(R.propEq('a', 2))(xs);
// console.log(findIndex1); // 1

var xs = [{a: 1, b: 0}, {a:1, b: 1}];
var findLast1 = R.findLast(R.propEq('a', 1))(xs);
// console.log(findLast1); // {a: 1, b: 1}

var xs = [{a: 1, b: 0}, {a:1, b: 1}];
var findLastIndex1 = R.findLastIndex(R.propEq('a', 1))(xs);
// console.log(findLastIndex1); // 1

var pluck1 = R.pluck('a')([{a: 1}, {a: 2}]);
// console.log(pluck1); // [1, 2]

var abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
var fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
var kids = [abby, fred];
var project1 = R.project(['name', 'grade'])(kids);
// console.log(project1); // [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]

var transpose1 = R.transpose([[1, 'a'], [2, 'b'], [3, 'c']]);
// console.log(transpose1); // [[1, 2, 3], ['a', 'b', 'c']]

var mergeAll1 = R.mergeAll([{foo: 1}, {bar: 2}, {baz: 3}]);
// console.log(mergeAll1); // {foo:1,bar:2,baz:3}

var fromPairs1 = R.fromPairs([['a', 1], ['b', 2], ['c', 3]])
// console.log(fromPairs1); // {a: 1, b: 2, c: 3}

var byGrade = R.groupBy(function (student) {
    let score = student.score;
    return score < 60 ? 'F' :
            score < 70 ? 'D' :
            score < 80 ? 'C' :
            score < 90 ? 'B' : 'A';
});
var students = [{name: 'Abby', score: 84},
                {name: 'Eddy', score: 58},
                {name: 'Jack', score: 90}];
var groupBy1 = byGrade(students);
// console.log(groupBy1); 
// {
//   'A': [{name: 'Jack', score: 90}],
//   'B': [{name: 'Abby', score: 84}]
//   'F': [{name: 'Eddy', score: 58}]
// }

var sortByFirstItem = R.sortBy(R.prop(0));
var sortBy1 = sortByFirstItem([[-1, 1], [-2, 2], [-3, 3]])
// console.log(sortBy1); // // [[-3, 3], [-2, 2], [-1, 1]]

var hasName = R.has('name');
var has1 = hasName({name: 'fan'});
// console.log(has1); // true

function Rectangle (width, height) {
    this.width = width;
    this.height = height;
}
Rectangle.prototype.area = function () {
    return this.width * this.height;
};
var square = new Rectangle(2, 2);
var hasIn1 = R.hasIn('width')(square); // 自身的
var hasIn2 = R.hasIn('area')(square); // 原型的
// console.log(hasIn1, hasIn2); // true true


var abby = {name: 'Abby', age: 7, hair: 'blond'};
var fred = {name: 'Fred', age: 12, hair: 'brown'};
var rusty = {name: 'Rusty', age: 10, hair: 'brown'};
var alois = {name: 'Alois', age: 15, disposition: 'surly'};
var kids = [abby, fred, rusty, alois];
var hasBrownHair = R.propEq('hair', 'brown');
var propEq1 = R.filter(hasBrownHair)(kids) // [fred, rusty]
// console.log(propEq1); // // [fred, rusty]

var pred = R.whereEq({a: 1, b: 2});
var whereEq1 = pred({a: 1, b: 2});
// console.log(whereEq1); // true

var pred = R.where({
    a: R.equals('foo'),
    b: R.equals('bzr'),
    x: R.gt(10),
    y: R.lt(20)
});
var where1 = pred({a: 'foo', b: 'bzr', x: 12, y: 15});
// console.log(where1); // true

var omit1 = R.omit(['a', 'b'])({a: 1, b: 2, c: 3, d: 4});
// console.log(omit1); // {b: 2, c: 3}

var isEven = n => n % 2 === 0;
var filter1 = R.filter(isEven)({a: 1, b: 2, c: 3, d: 4});
// console.log(filter1); // {b: 2, d: 4}

var isOdd = n => n % 2 === 1;
var reject1 = R.reject(isOdd)({a: 1, b: 2, c: 3, d: 4});
// console.log(reject1); // {b: 2, d: 4}

var dissoc1 = R.dissoc('b')({a: 1, b: 2, c: 3});
// console.log(dissoc1); // {a: 1, c: 3}

var assoc1 = R.assoc('c', 3)({a: 1, b: 2});
// console.log(assoc1); // {a: 1, b: 2, c: 3}

var partition1 = R.partition(R.contains('s'))({a: 'ssss', b: 'ttt', foo: 'bars'});
// console.log(partition1); // [ { a: 'sss', foo: 'bars' }, { b: 'ttt' }  ]

var pick1 = R.pick(['a', 'd'])({a: 1, b: 2, c: 3, d: 4});
// console.log(pick1); // {a: 1, d: 4}

var pickAll1 = R.pickAll(['a', 'd', 'f'])({a: 1, b: 2, c: 3, d: 4});
// console.log(pickAll1); // {a: 1, d: 4, f: undefined}

var isUpperCase = (val, key) => key.toUpperCase() === key;
var pickBy1 = R.pickBy(isUpperCase)({a: 1, b: 2, A: 3, B: 4});
// console.log(pickBy1); // {A: 3, B: 4}

var keys1 = R.keys({a: 1, b: 2});
// console.log(keys1); // ['a', 'b']

var F = function () {this.x = 'X'};
F.prototype.y = 'Y';
var f = new F();
var keysIn1 = R.keysIn(f);
// console.log(keysIn1); // ['x', 'y']

var values1 = R.values({a: 1, b: 2, c: 3});
// console.log(values1); // [1, 2, 3]

var F = function() { this.x = 'X'; };
F.prototype.y = 'Y';
var f = new F();
var valuesIn1 = R.valuesIn(f);
// console.log(valuesIn1); // ["X", "Y"]

var raceResultsByFirstName = {
  first: 'alice',
  second: 'jake',
  third: 'alice',
};
var invertObj1 = R.invertObj(raceResultsByFirstName);
// console.log(invertObj1); // {alice: "third", jake: "second"}

var raceResultsByFirstName = {
  first: 'alice',
  second: 'jake',
  third: 'alice',
};
var invert1 = R.invert(raceResultsByFirstName);
// console.log(invert1); // // { 'alice': ['first', 'third'], 'jake':['second'] }

var prop1 = R.prop('x')({x: 100});
// console.log(prop1); // 100

var double = x => x * 2;
var map1 = R.map(double)({x: 1, y: 2, z: 3});
// console.log(map1); // {x: 2, y: 4, z: 6}

var values = {x: 1, y: 2, z: 3};
var prependkeyAndDouble = (num, key, obj) => key + (num * 2);
var mapObjIndexed1 = R.mapObjIndexed(prependkeyAndDouble)(values);
// console.log(mapObjIndexed1); // {x: "x2", y: "y4", z: "z6"}

var printkeyConcatValue = (value, key) => console.log(key + ':' + value);
var forEachObjIndexed1 = R.forEachObjIndexed(printkeyConcatValue)({x: 1,y: 2});
// console.log(forEachObjIndexed1); // {x: 1,y: 2}

var merge1 = R.merge({'name': 'fred', 'age': 10})({'age': 40});
// console.log(merge1); // {name: "fred", age: 40}

var mergeWith1 = R.mergeWith(
        R.concat,
        {a: true, values: [10, 20]},
        {b: true, values: [15, 35]}
    );
// console.log(mergeWith1); // { a: true, b: true, values: [10, 20, 15, 35] }

var o1 = {a: 1, b: 2, c: 3, d: 4};
var o2 = {a: 10, b: 20, c: 3, d: 40};
var eqProps1 = R.eqProps('c', o1)(o2);
// console.log(eqProps1); //true

var tomato = {
    firstName: 'Tomato',
    data: {elapsed: 100, remaining: 1400},
    id: 123
};
var transformations = {
    firstName: R.trim,
    lastName: R.trim,
    data: {elapsed: R.add(1), remaining: R.add(-1)}
};
var evolve1 = R.evolve(transformations)(tomato);
// console.log(evolve1);
// {
//   firstName: 'Tomato',
//   data: {elapsed: 101, remaining: 1399},
//   id: 123
// }

var path1 = R.path(['a', 'b'], {a: {b: 2}});
// console.log(path1); // 2

var user1 = {address: {zipCode: 11111}};
var user2 = {address: {zipCode: 22222}};
var user3 = {address: {zipCode: 33333}};
var users = [user1, user2, user3];
var isFamous = R.pathEq(['address', 'zipCode'], 11111);
var pathEq1 = R.filter(isFamous)(users);
// console.log(pathEq1); // [user1]

var assocPath1 = R.assocPath(['a', 'b', 'c'], 42)({a: {b: {c: 0}}});
// console.log(assocPath1); // {a: {b: {c: 42}}}








