var linuxMessage = `` /**/

  var main = async function(){
  window.mods = {}
  window.fs = {}
    window.vars = new Map([["__name__","__main__"]])
  window.fs["main.py"] = {type:"file",contents:"print('1')"}
  window.fs["log.txt"] = {type:"file",contents:"123"}
  
  
  document.getElementById('writepy').textContent = "print(\"Hi\")"
  document.getElementById("output").innerText = "> python\n" + linuxMessage
  document.getElementById("run").onclick = async function(){
    var text = document.getElementById("writepy").innerText
    var splittext = text.split("\n")
    for(var t = 0;t < splittext.length;t++){
      console.log(t,splittext[t])
      
      if(splittext[t] === 'exit()'){
        return;
      }
      
      if(splittext[t].startsWith("print") & (splittext[t].includes("\"")||splittext[t].includes("'")||splittext.includes("“")||splittext.includes("”")) ){
         document.getElementById("output").innerText += "\n" + splittext[t].replace("print(","").slice(0,-1).replaceAll("\"","").replaceAll("'","").replaceAll("“","").replaceAll("”","").replaceAll("\\n","\n")
        continue
    }
      if(splittext[t].startsWith("print")){
        console.log(window.vars.get(splittext[t].replace("print(","").slice(0,-1)))
        if(window.vars.get(splittext[t].replace("print(","").slice(0,-1)) !== undefined){
          document.getElementById('output').innerText  += "\n" + window.vars.get(splittext[t].replace("print(","").slice(0,-1))
        }
      }
      
      
      if(splittext[t].startsWith("import ")){
        window.mods[splittext[t].split(" ")[1]] = true
      }
      
      if(splittext[t].includes(" = \"") === true){
        var parts = splittext[t].split(" = ")
        var name = parts[0]
        var value = parts[1].slice(1,-1)
        console.log(parts,name,value,window.vars)
        window.vars.set(name,value)
        console.log(window.vars)
      }
      
      if(splittext[t].startsWith("base64.") & window.mods['base64'] === true){
        var cmd = splittext[t].split(".")
        if(cmd[1].startsWith('b64encode')){
          cmd.shift(0)
          cmd = cmd.join(".")
          
        }
      }
      
      if(splittext[t].startsWith("os.") & window.mods["os"] === true){
        var cmd = splittext[t].split(".")
        cmd.shift(0)
        cmd = cmd.join(".") 
        console.log(cmd)
        if(cmd.startsWith("system(")){
          var syscmd = cmd.replace("system(","").replaceAll("\"","").replaceAll("'","").slice(0,-1)
          console.log(syscmd)
          if(syscmd === "clear"){
            document.getElementById("output").textContent = "> python\n" + linuxMessage
          }
          if(syscmd.startsWith("echo")){
            document.getElementById("output").innerText += "\n" + syscmd.replace("echo ","").replace("\\n","\n")
          }
          if(syscmd.includes("rm") === true){
            if(syscmd === "rm *"){
              window.fs = {}
            }
            else{
              delete window.fs[syscmd.replace("rm ","")]
            }
          }
          if(syscmd === "ls"){
            document.getElementById("output").innerText += "\n"
            var files = Object.keys(window.fs)
            console.log(files)
            files.forEach(function(f){
              document.getElementById('output').innerText += f + " "
              document.getElementById("output").innerHTML += "&nbsp;&nbsp;"
            })
          }
          
        }
      }
    }
  }
  
  
  document.getElementById('clear').onclick = function(){
    document.getElementById("output").textContent = '> python'
  }
  document.getElementById("reset").onclick = function(){
    document.getElementById('output').innerText = "\n"
    document.getElementById("output").innerText += "> python"
    document.getElementById("writepy").textContent = "print(\"Hi\")"
    window.mods = {}
  }
}
window.jsload = true
main().catch(function(err){
  console.log("Error:",err);
  main().catch(function(){alert("Error occured. Please reload")})
                          })

