const aaa = '我是aaa'
const bbb = '我是bbb'
const ccc = '我是ccc'


// module.exports = {
//     aaa,
//     bbb
// }

export default bbb

export { aaa }

exports.ccc = ccc

setTimeout(() => {
    console.log('aaa-->', aaa)
}, 5000)