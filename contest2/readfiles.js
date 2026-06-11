//Write a program that:
// 1. Reads all three files asynchronously.
// 2. Combines their contents.
// 3. Prints:

const fs = require("fs/promises");


fs.readFile("a.txt", "utf-8").then((data)=>{
    console.log(data);
    fs.readFile("b.txt", "utf-8").then((data)=>{
        console.log(data);
        fs.readFile("c.txt", "utf-8").then((data)=>{
            console.log(data);
        });
    });
});

