// //Q1     Also use map function
// const students=[
//     {name: "Aman", marks:78},
//     {name:"Riya", marks:91},
//     {name:"Kabir", marks:65}
// ]
// nl=[]
// function grade(i){
//     if (i>90){
//         return "A";
//     }else if (i>70){
//         return "B";
//     }else{
//         return "C";
//     }
// }
// students.forEach((student)=>{
//     d={}
//     d["name"]=student.name.toUpperCase()
//     d["grade"]=grade(student.marks);
//     nl.push(d);
// })
// console.log(nl);



// //Q2
// const products= [
//   { name:"Laptop", price:80000 },
//   { name:"Mouse", price:500 },
//   { name:"Monitor", price:15000 },
//   { name:"Keyboard", price:1200 }
// ];
// console.log(products.filter((x => x.price>5000)));



// //Q3
// const users= [
//   { id:1, email:"a@test.com" },
//   { id:2, email:"b@test.com" },
//   { id:3, email:"a@test.com" },
//   { id:4, email:"c@test.com" }
// ];
// d={}
// users.forEach((user)=>{
//     if(user.email in d){
//         d[user.email]+=1;
//     }else{
//         d[user.email]=1;
//     }
// })
// let nl=users.filter(x=>d[x.email]>1);
// console.log(nl);



// //Q4
// const students= [
//   { name:"A", branch:"CSE" },
//   { name:"B", branch:"ECE" },
//   { name:"C", branch:"CSE" },
//   { name:"D", branch:"ME" }
// ];

// d={}
// students.forEach((student)=>{
//     if(student.branch in d){
//         d[student.branch].push(student.name);
//     }else{
//         d[student.branch]=[student.name];
//     }
// });
// console.log(d);



// //Q5
// const users= [
//   {
//     name:"Aman",
//     orders: ["Laptop","Mouse"]
//   },
//   {
//     name:"Riya",
//     orders: ["Keyboard"]
//   }
// ];

// // let ans=users.flatMap(user=>user.orders);
// // console.log(ans);


// let l=[]
// users.forEach((user)=>{
//     o=user.orders;
//     o.forEach((it)=>{
//         l.push(it)
//     })
// })
// console.log(l);



// //Q6
// const torders= [
// "Laptop",
// "Mouse",
// "Laptop",
// "Keyboard",
// "Laptop",
// "Mouse"
// ];

// let c=0, ind="";
// let d={}
// torders.forEach((order)=>{
//     if(order in d){
//         d[order]+=1;
//     }else{
//         d[order]=1
//     }
// });
// for (let [i, j] of Object.entries(d)){
//     if(j>c){
//         [ind, c]=[i, j];
//     }
// }
// console.log({
//     "product":ind,
//     "count":c
// });



// //Q7
// let ul=[];
// const users= [
//   {
//     name:"Aman",
//     posts: [
//       { title:"JS", likes:50 },
//       { title:"React", likes:10 }
//     ]
//   },
//   {
//     name:"Riya",
//     posts: [
//       { title:"Node", likes:80 }
//     ]
//   }
// ];

// users.forEach((user)=>{
//     user.posts.forEach((post)=>{
//         if(post.likes>40){
//             if(!(user.name in ul)){
//                 ul.push(user.name);
//             }            
//         }
//     })
// })
// console.log(ul);



// //Q8
// d={}
// const fs=require("fs");
// fs.readFile("hello.txt", "utf-8", (err, data)=>{
//     if(err){
//         console.log("Error while reading");
//     }
//     else{
//         let l=data.split("\n");
//         d["lines"]=l.length;
//         let w=data.split(" ");
//         d["words"]=w.length+l.length-1;
//         d["characters"]=data.length-l.length;
//         console.log(d);
//     }
// })


// //Q10

// const transactions= [
//   { user:"Aman", type:"credit", amount:1000 },
//   { user:"Aman", type:"debit", amount:200 },
//   { user:"Riya", type:"credit", amount:500 },
//   { user:"Riya", type:"debit", amount:100 }
// ];
// d={}

// transactions.forEach((tr)=>{
//     if (tr.user in d){
//         if (tr.type=="credit"){
//             d[tr.user]+=tr.amount;
//         }else{
//             d[tr.user]-=tr.amount;
//         }
//     }else{
//         if (tr.type=="credit"){
//             d[tr.user]=tr.amount;
//         }else{
//             d[tr.user]=-tr.amount;
//         }
//     }
// })
// console.log(d);



//Q11
// const nums= [1,2,3,4];     
// constresult=nums.map((num) => {  syntax error
// num*2;         Not returning the computed value
// });
// console.log(result);

// const nums= [1,2,3,4];
// const result=nums.map((num) => num*2);
// console.log(result);



//Q12
