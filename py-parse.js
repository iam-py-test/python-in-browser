var main = async function(){
  document.getElementById('writepy').textContent = "print(\"Hi\")"
  document.getElementById("run").onclick = async function(){
    var text = document.getElementById("writepy").textContent
    var splittext = text.split("\n")
    for(var t = 0;t < splittext.length;t++){
      if(splittext[t].startsWith("print(\"")){
         document.getElementById("output").innerText += "\n" + splittext[t].replace("print(\"","").slice(0,-1)
    }
    }
  }
}
window.jsload = true
main().catch(function(err){
  console.log("Error:",err);
  main().catch(function(){alert("Error occured. Please reload")})
                          })

