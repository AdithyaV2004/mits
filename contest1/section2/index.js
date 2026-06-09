//Q1 Sum all transactions per user
// let l=[
//   { user: "A", amount: 100 },
//   { user: "B", amount: 200 },
//   { user: "A", amount: 50 }
// ]
// let no={};
// for(let i=0;i<l.length;i++){
//     us=l[i].user;
//     if(!(us in no)){
//         no[us]=l[i].amount    
//     }else{
//         no[us]+=l[i].amount
//     }
// }
// console.log(no);


//Q2 Transform API response to object (id → name)
// let l=[
//   { id: 1, name: "Alice" },
//   { id: 2, name: "Bob" },
// ]
// let u={}
// for(let i=0;i<l.length;i++){
//     us=l[i].id;
//     if(!(us in u)){
//         u[us]=l[i].name;
//     }
// }
// console.log(u);


// Q3 Remove falsy values from object
// let o={ a: 0, b: null, c: "hello", d: undefined, e: 5 };
// for (const key in o){
//     if(!(o[key])){
//         delete o[key];
//     }
// }
// console.log(o);


//Q4 Check for permissions from roles
// const roles={ admin:["read","write"], user:["read"], staff: ["write"]};
// let checkRole="user";
// let action="write";
// console.log(roles[checkRole]==action);


//Q5 Transform array of orders into revenue per category
// let t=[
//   { id: 1, category: "electronics", price: 100 },
//   { id: 2, category: "clothes", price: 50 },
//   { id: 3, category: "electronics", price: 200 }
// ]
// s={}
// t.map((i)=>{
//     if(i.category in s){
//         s[i.category]+=i.price;
//     }else{
//         s[i.category]=i.price;
//     }
// })
// console.log(s);


//Q6 Remove duplicate objects by id
// let l=[
//   { id: 1, name: "A" },
//   { id: 1, name: "A" },
//   { id: 2, name: "B" },
// ]
// u=[];
// for(let i=0;i<l.length;i++){
//     if(u.includes(l[i].id)){
//         l.splice(i,1);
//         i--;
//     }else{
//         u.push(l[i].id);
//         console.log(u)
//     }
// }
// console.log(l);

//Q7 







//Q8 Build index of ids grouped by category
// let l=[
//   { id: 1, category: "fruit" },
//   { id: 2, category: "veggie" },
//   { id: 3, category: "fruit" }
// ];

// f={};
// l.forEach((t)=>{
//     fruit=t.category;
//     if(fruit in f){
//         f[fruit].push(t.id);
//     }else{
//         f[fruit]=[t.id];
//     }
// })
// console.log(f);





//Q13 Deep merge two nested objects
// o1={ a: { x: 1, y: 2 } };
// o2={ a: { y: 3, z: 4 } };








//Q15 Merge two objects (no sum, override second)
// let o1={ a: 10, b: 20 };
// let o2={ a: 5, c: 15 };
// no={};
// for(const keys in o1){
//     no[keys]=o1[keys];
// }
// for(const keys in o2){
//     no[keys]=o2[keys];
// }
// console.log(no);