var linuxMessage = `
Python 3.8.5 (default, May 27 2021, 13:30:53) 
[GCC 9.3.0] on linux
Type "help", "copyright", "credits" or "license" for more information.`

  var main = async function(){
  window.mods = {}
  window.fs = {}
  window.fs["main.py"] = {type:"file",contents:"print('1')"}
  
  
  document.getElementById('writepy').textContent = "print(\"Hi\")"
  document.getElementById("output").textContent = "> python\n" + linuxMessage
  document.getElementById("run").onclick = async function(){
    var text = document.getElementById("writepy").innerText
    var splittext = text.split("\n")
    for(var t = 0;t < splittext.length;t++){
      console.log(t,splittext[t])
      
      if(splittext[t] === 'exit()'){
        document.getElementById("output").innerText += "\nExited"
      }
      
      if(splittext[t].startsWith("print(")){
         document.getElementById("output").innerText += "\n" + splittext[t].replace("print(","").slice(0,-1).replaceAll("\"","").replaceAll("'","").replaceAll("“","").replaceAll("”","").replaceAll("\\n","\n")
    }
      
      if(splittext[t].startsWith("import ")){
        window.mods[splittext[t].split(" ")[1]] = true
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
          if(syscmd === "ls"){
            document.getElementById("output").innerText += "\n"
            var files = Object.keys(window.fs)
            console.log(files)
            files.forEach(function(f){
              document.getElementById('output').innerText += f + "   "
            })
          }
        }
      }
    }
  }
  
  
  document.getElementById('clear').onclick = function(){
    document.getElementById("output").textContent = '> python\n' + linuxMessage
  }
  document.getElementById("reset").onclick = function(){
    var lastcmd = document.getElementById('output').innerText.split("\n")
    console.log(lastcmd)
    document.getElementById('output').innerText = (lastcmd||"")
    if(!!lastcmd){
      document.getElementById("output").innerText += "\n"
    }
    document.getElementById("output").innerText += "> python\n" + linuxMessage
    document.getElementById("writepy").textContent = "print(\"Hi\")"
    window.mods = {}
  }
}
window.jsload = true
main().catch(function(err){
  console.log("Error:",err);
  main().catch(function(){alert("Error occured. Please reload")})
                          })

