// path 模块提供了一些实用工具，用于处理文件和目录的路径
const path = require('path');


// path.sep提供平台特定的路径片段分隔符
// Windows 上是 \
// POSIX 上是 /
console.log(path.sep, 'foo\\bar\\baz'.split(path.sep), 'foo/bar/baz'.split(path.sep));


// path.delimiter提供平台特定的路径定界符 ; 用于 Windows : 用于 POSIX
console.log(process.env.PATH);
// 打印: 'C:\Windows\system32;C:\Windows;C:\Program Files\node\'
console.log(process.env.PATH.split(path.delimiter));
// 返回: ['C:\\Windows\\system32', 'C:\\Windows', 'C:\\Program Files\\node\\']


// path.basename() 方法会返回 path 的最后一部分，类似于 Unix 的 basename 命令
const fileName = path.basename('C:\\temp\\myfile.html');
const fileNameExt = path.basename('C:\\temp\\myfile.html', '.html');
console.log(fileName, fileNameExt)


// path.dirname() 方法会返回 path 的目录名，类似于 Unix 的 dirname 命令
console.log(path.dirname('/目录1/目录2/目录3'));
// 返回: '/目录1/目录2'


// path.extname() 方法会返回 path 的扩展名，即 path 的最后一部分中从最后一次出现 .（句点）字符直到字符串结束。 
// 如果在 path 的最后一部分中没有 .，或者如果 path 的基本名称（参见 path.basename()）除了第一个字符以外没有 .，则返回空字符串
const exts = [
    // 返回: '.html'
    path.extname('index.html'),
    // 返回: '.md'
    path.extname('index.coffee.md'),
    // 返回: '.'
    path.extname('index.'),
    // 返回: ''
    path.extname('.index'),
    // 返回: ''
    path.extname('index'),
    // 返回: '.md'
    path.extname('.index.md'),
]
console.log(exts)


// path.format(pathObject) 方法从对象返回路径字符串。 与 path.parse() 相反。
// 当为 pathObject 提供属性时，注意以下组合，其中一些属性优先于另一些属性：
// 如果提供了 pathObject.dir，则忽略 pathObject.root。
// 如果 pathObject.base 存在，则忽略 pathObject.ext 和 pathObject.name。
// 如果提供了 `dir`、 `root` 和 `base`，
// 则返回 `${dir}${path.sep}${base}`。
// `root` 会被忽略。
const pathStr1 = path.format({
    root: '\\ignored',
    dir: '\\home\\user\\dir',
    base: 'file.txt'
});
// 返回: '\home\user\dir\file.txt'
  
// 如果未指定 `dir`，则使用 `root`。 
// 如果只提供 `root`，或 'dir` 等于 `root`，则将不包括平台分隔符。 
// `ext` 将被忽略。
const pathStr2 = path.format({
    root: '\\',
    base: 'file.txt',
    ext: 'ignored'
});
// 返回: '\file.txt'
  
// 如果未指定 `base`，则使用 `name` + `ext`。
const pathStr3 = path.format({
    root: '\\',
    name: 'file',
    ext: '.txt'
});
// 返回: '\file.txt'
const pathStr4 = path.format({
    dir: 'C:\\path\\dir',
    base: 'file.txt'
});
// C:\path\dir\file.txt
console.log(pathStr1, pathStr2, pathStr3, pathStr4)

// path.parse() 方法会返回一个对象，其属性表示 path 的有效元素
console.log('parse----------', path.parse('C:\\目录1\\目录2\\文件.txt'));
// 返回:
// { root: 'C:\\',
//   dir: 'C:\\目录1\\目录2',
//   base: '文件.txt',
//   ext: '.txt',
//   name: '文件' }


// path.isAbsolute() 方法检测 path 是否为绝对路径
const isAbs0 = path.isAbsolute('/');    // true
const isAbs1 = path.isAbsolute('//');    // true
const isAbs2 = path.isAbsolute('//server');    // true
const isAbs3 = path.isAbsolute('\\\\server');  // true
const isAbs4 = path.isAbsolute('C:/foo/..');   // true
const isAbs5 = path.isAbsolute('C:\\foo\\..'); // true
const isAbs6 = path.isAbsolute('bar\\baz');    // false
const isAbs7 = path.isAbsolute('bar/baz');     // false
const isAbs8 = path.isAbsolute('.');           // false

console.log(isAbs0,isAbs1,isAbs2,isAbs3, isAbs4,isAbs5,isAbs6,isAbs7,isAbs8)


// path.join() 方法会将所有给定的 path 片段连接到一起（使用平台特定的分隔符作为定界符），然后规范化生成的路径
const comPath = path.join('/目录1', '../目录2', '目录3/目录4', '目录5', '..');
// 返回: '\目录1\目录2\目录3\目录4'
console.log(comPath)

// path.normalize() 方法规范化给定的 path，解析 '..' 和 '.' 片段
console.log(path.normalize('C:\\temp\\\\foo\\bar\\..\\'));
// 返回: 'C:\temp\foo\'


// path.relative(from, to) 方法根据当前工作目录返回 from 到 to 的相对路径
// 如果 from 和 to 各自解析到相同的路径（分别调用 path.resolve() 之后），则返回零长度的字符串
// 如果将零长度的字符串传入 from 或 to，则使用当前工作目录代替该零长度的字符串
console.log('relative-----------------', path.relative('C:\\orandea\\test\\aaa', 'C:\\orandea\\impl\\bbb'));
// 返回: '..\..\impl\bbb'


// path.resolve() 方法会将路径或路径片段的序列解析为绝对路径
// 给定的路径序列会从右到左进行处理，后面的每个 path 会被追加到前面，(直到构造出绝对路径--得到绝对路径后就不再追加了)
// 如果在处理完所有给定的 path 片段之后还未生成绝对路径，则会使用当前工作目录
const resolve1 = path.resolve('/目录1', '/目录2', '目录3');
// C:\目录2\目录3

const resolve2 = path.resolve('/目录1/目录2', './目录3');
// 返回: 'C:\目录1\目录2\目录3'

const resolve3 = path.resolve('/目录1/目录2', '/目录3/目录4/');
// 返回: 'C:\目录3\目录4'

const resolve4 = path.resolve('目录1', '目录2/目录3/', '../目录4/文件.gif');
// 如果当前工作目录是 C:\Users\admin\Desktop\todo\nodejs-api，
// 则返回 'C:\Users\admin\Desktop\todo\nodejs-api\目录1\目录2\目录4\文件.gif'

console.log('resovle', resolve1, resolve2, resolve3, resolve4)




