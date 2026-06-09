const fs=require("fs");

/*
Q1Create a file users.json.
- Read the JSON file.
- Extract all emails.
- Save them in `emails.txt`.
 */
// em='';
// fs.readFile("users.json", "utf-8", (err, data)=>{
//     const users=JSON.parse(data);
//     for(let i=0;i<users.length;i++){
//         em+=users[i].email+'\n';
//     }
//     fs.writeFile("mail.txt", em, "utf-8", (err)=>{
//         if(err){
//             console.log(err);
//         }
//     })
// })


/*
Q2 - Read the file.
- Find:
    - Highest marks
    - Lowest marks
    - Average marks
- Write a report into `report.txt`.
*/
// m=[];
// fs.readFile("marks.json", "utf-8", (err, data)=>{
//     const users=JSON.parse(data);
//     for(let i=0;i<users.length;i++){
//         m.push(users[i].marks);
//     }
//     const max=Math.max(...m)
//     const min=Math.min(...m);
//     sum=0;
//     for(let i=0; i<m.length;i++){
//         sum+=m[i];
//     }
//     const avg=sum/m.length;
//     rep=`Highest: ${max}\nLowest: ${min}\nAverage: ${avg};`
//     fs.writeFile("report.txt", rep, "utf-8", (err)=>{
//         if(err){
//             console.log("Error");
//         }
//     });
// })

/*Create `events.txt`.
### Task
- Read the events.
- Count occurrences of each event.
- Write a summary into `analytics.txt`.
*/
mess={}
let data=fs.readFile("events.txt", "utf-8", (err, data)=>{
    data=data.split("\r\n");
    for (let i=0;i<data.length;i++){
        const ev=data[i];
        if(ev in mess){
            mess[ev]+=1;
        }
        else{
            mess[ev]=0;
        }
    }
    fs.writeFile("analytics.txt", mess, "utf-8", (err)=>{
        if(err){
            console.log("error");
        }
    })
})

