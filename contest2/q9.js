const fs=require("fs");

function readFilePromisified(file){
    return new Promise((resolve)=>{
        fs.readFile(file, "utf-8", (err, data)=>{
            resolve(data);
        })
    })
}

d=[]
async function main(){
    await readFilePromisified("user1.json").then(async (items)=>{
        await readFilePromisified("user2.json").then((data)=>{
            items=JSON.parse(items)
            data=JSON.parse(data)
            Object.keys(items).forEach((i)=>{
                d.push(items[i]);
            });
            Object.keys(data).forEach((i)=>{
                d.push(data[i]);
            });
            fs.writeFile("merged.json", JSON.stringify(d), "utf-8", (err)=>{
                if(err){
                    console.log("Error!!");
                }else{
                    console.log("Success");
                }
            })
        })
    })
}

main()