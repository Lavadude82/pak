const request = require("request");
const fs = require("fs");
const { cwd } = require("process");
const { log } = require("console");

var args = process.env.ARGS;
const usage =
    `NodePak -
    usage : pak create <template>  
    usage : pak save <dir> <name>
    
Actions - 
    create - creates a copy of the specified template inside the current directory
    save - saves the specified directory as a template with the given name
    remove - removes the saved template`

args = args.split(" ")

if(args[0] == "create"){
    if(args[1] == undefined) return log(`No Template Specified!`)
        log(`Copying template - ${args[1]}`)
    try{
        fs.cpSync(__dirname + `/cached/` + args[1],cwd(),{recursive:true})
    }catch(e){
        log(`Template Could Not Be Found or Copied!`)
        process.exit()
    }
        log(`Done!`)
        return;
}

if(args[0] == "save"){
    
    if(args[1] == undefined) return log(`No Directory Specified!`)
    if(args[2] == undefined) return log(`No Name Specified!`)
    try{
    const paths = fs.readdirSync(__dirname + `/cached/`);
    }catch(e){
        log(`Could Not Get Temaplates from ${__dirname}/cached/`)
    }
    if(paths.includes(args[2])) return log(`Template Already Exists!`)
    log(`Saving ${args[1]} as template "${args[2]}"`)
try{
    fs.mkdirSync(__dirname + `/cached/` + args[2]);
}catch(e){
    log(`Could Not Make Template Directory!`)
    process.exit()
}
    log(`Copying files to saved template "${args[2]}"`)
    try{
    fs.cpSync(args[1],__dirname + `/cached/` + args[2],{recursive:true})
    }catch(e){
        log(`Could Not Copy Files!`)
        process.exit()
    }
    log(`Done!`)
    return;
}
if(args[0] == "remove"){
    if(args[1] == undefined) return log(`No Template Specified!`)
    log(`Removing template "${args[1]}"`)
try{
    fs.rmSync(__dirname + `/cached/` + args[1],{recursive:true,})
}catch(e){
    log(`Could Not Remove Template!`)
    process.exit()
}
    log(`Done!`)
    return;
}
    
    log(usage)
