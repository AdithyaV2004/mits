// //Q1 Return players sorted by score (highest first) with a rank field. Players with the same score must share the same rank, and the next rank should skip accordingly.

// const players = [
//   { name: "Aman", score: 320 },
//   { name: "Riya", score: 410 },
//   { name: "Kabir", score: 410 },
//   { name: "Arjun", score: 250 },
//   { name: "Sneha", score: 320 }
// ];

// let d={}
// for (let player of players){
//     if(!(player.score in d)){
//         d[player.score]=[]
//     }
//     d[player.score].push(player.name)
// }

// let keys=Object.keys(d);
// keys=keys.sort((a,b)=>b-a);
// let l=[];
// let r=1;

// for (let i of keys){
//     for(let j of d[i]){
//         l.push({"name":j, "score":i, "rank":r})
//     }
//     r+=Object.values(d[i]).length;
// }
// console.log(l);



// //Q2 Produce the inverse mapping:

// const branches = {
//   CSE: ["Aman", "Riya"],
//   ECE: ["Kabir"],
//   ME: ["Arjun", "Sneha"]
// };

// let d={};

// for(let k of Object.keys(branches)){
//     Object.values(branches[k]).forEach((student)=>{
//         d[student]=k;
//     })
// }
// console.log(d)



// //Q3 Calculate the final payable amount after applying the category discount to each item.

// const cart = [
//   { name: "Laptop", price: 80000, qty: 1, category: "electronics" },
//   { name: "Mouse", price: 500, qty: 2, category: "electronics" },
//   { name: "Shoes", price: 3000, qty: 1, category: "fashion" }
// ];

// const coupons = {
//   electronics: 0.10,   // 10% off
//   fashion: 0.20        // 20% off
// };

// let tot=0;
// cart.forEach((it)=>{
//     cat=it.category;
//     p=it.price;
//     q=it.qty
//     dis=coupons[cat];
//     tot+=(p*(1-dis))*q;
// });
// console.log(tot);



// //Q4 Return the second most purchased product:

// const orders = [
//   "Laptop", "Mouse", "Laptop", "Keyboard",
//   "Laptop", "Mouse", "Keyboard", "Mouse", "Monitor"
// ];
// let d={};
// nd={}
// orders.forEach((order)=>{
//     if(!(order in d)){
//         d[order]=0;
//     }
//     d[order]+=1;
// });
// console.log(d);



//Q5  Return one flat array of every student who has cgpa ≥ 8, tagged with their college and department:

const colleges = [
  {
    name: "MITS",
    departments: [
      { name: "CSE", students: [{ name: "A", cgpa: 8.2 }, { name: "B", cgpa: 9.1 }] },
      { name: "ECE", students: [{ name: "C", cgpa: 7.5 }] }
    ]
  },
  {
    name: "NIT",
    departments: [
      { name: "ME", students: [{ name: "D", cgpa: 8.8 }, { name: "E", cgpa: 6.9 }] }
    ]
  }
];


// const result = colleges.flatMap(college =>
//   college.departments.flatMap(dept =>
//     dept.students
//       .filter(student => student.cgpa >= 8)
//       .map(student => ({
//         name: student.name,
//         cgpa: student.cgpa,
//         college: college.name,
//         department: dept.name
//       }))
//   )
// );

// const result=colleges.flatMap(college=>{
//     college.departments.flatMap(dept=>{
//         dept.students
//     })
// })


// console.log(result);



