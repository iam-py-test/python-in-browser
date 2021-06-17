var main = async function(){
  document.getElementById('writepy').textContent = "print(\"Hi\")"
  document.getElementById("output").textContent = "> python"
  document.getElementById("run").onclick = async function(){
    var text = document.getElementById("writepy").innerText
    var splittext = text.split("\n")
    for(var t = 0;t < splittext.length;t++){
      console.log(t,splittext[t])
      if(splittext[t].startsWith("print(")){
         document.getElementById("output").innerText += "\n" + splittext[t].replace("print(","").slice(0,-1).replaceAll("\"","").replaceAll("'","").replaceAll("\\n","\n")
    }
    }
  }
  
  
  document.getElementById('clear').onclick = function(){
    document.getElementById("output").textContent = '> python'
  }
  
}
window.jsload = true
main().catch(function(err){
  console.log("Error:",err);
  main().catch(function(){alert("Error occured. Please reload")})
                          })

