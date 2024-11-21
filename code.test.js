const fs = require('fs');
const JSVerify = require('jsverify');
const jsc = require('jsverify');

eval(fs.readFileSync('code.js')+'');

const testset = [
    { graph: [[1, 5], [0, 2, 4], [1], [4, 6], [1, 3], [0], [3]], start: 1, end: 5, expected: [ 1, 0, 5 ] },
    { graph: [[1, 5], [0, 2, 4], [1], [4, 6], [1, 3], [0], [3]], start: 2, end: 6, expected: [ 2, 1, 4, 3, 6 ] },
    { graph: [[1, 5], [0, 2, 3, 4], [1], [1, 4, 6], [1, 3], [0], [3]], start: 1, end: 6, expected: [ 1, 3, 6 ] },
    { graph: [[1, 5], [0, 2, 3, 4], [1], [1, 4, 6], [1, 3], [0], [3]], start: 3, end: 2, expected: [ 3, 1, 2 ] },
    { graph: [[ 4, 5 ],[ 4, 5 ],[ 5, 6, 7 ],[ 5, 6 ],[ 0, 1, 7 ],[ 0, 1, 2, 3 ],[ 2, 3 ],[ 2, 4 ]], start: 1, end: 0, expected: [ 1, 4, 0 ] },
    { graph: [[ 4, 5 ],[ 4, 5 ],[ 5, 6, 7 ],[ 5, 6 ],[ 0, 1, 7 ],[ 0, 1, 2, 3 ],[ 2, 3 ],[ 2, 4 ]], start: 1, end: 6, expected: [ 1, 4, 0, 5, 2, 6 ] },
    { graph: [[ 4, 5 ],[ 4, 5 ],[ 5, 6, 7 ],[ 5, 6 ],[ 0, 1, 7 ],[ 0, 1, 2, 3 ],[ 2, 3 ],[ 2, 4 ]], start: 2, end: 7, expected: [ 2, 5, 0, 4, 7 ] },
    { graph: [[ 4, 5 ],[ 4, 5 ],[ 5, 6, 7 ],[ 5, 6 ],[ 0, 1, 7 ],[ 0, 1, 2, 3 ],[ 2, 3 ],[ 2, 4, 8],[ 7 ]], start: 2, end: 8, expected: [ 2, 5, 0, 4, 7, 8 ] },
];


testset.forEach(({ graph, start, end, expected }, index) => {
    let testWorks = (JSON.stringify(depthFirstSearch(graph, start, end)) === JSON.stringify(expected));
    console.log("\ntest:",index++, testWorks ? "Success" : "Failed");
    if(!testWorks){ throw console.log("Failed with values:", graph,"\nStart:", start,"\nEnd:", end, "\nExpected Result:",expected, "\nGot Result:", depthFirstSearch(graph, start, end));}
});