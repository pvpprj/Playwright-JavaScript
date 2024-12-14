var marks = new Array(1,2,3,4,5);  
console.log(marks);

let sum=0;
let total = marks.reduce((sum,mark)=> sum+mark,0);
console.log("total = "+total);

