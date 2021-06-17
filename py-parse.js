var main = async function(){
  document.getElementById('writepy').textContent = "print(\"Hi\")"
  document.getElementById("output").textContent = "> Python"
  document.getElementById("run").onclick = async function(){
    var text = document.getElementById("writepy").textContent
    var splittext = text.split("\n")
    for(var t = 0;t < splittext.length;t++){
      console.log(t,splittext[t],splittext)
      if(splittext[t].startsWith("print(\"")){
         document.getElementById("output").innerText += "\n" + splittext[t].replace("print(\"","").slice(0,-2)
    }
    }
  }
}
window.jsload = true
main().catch(function(err){
  console.log("Error:",err);
  main().catch(function(){alert("Error occured. Please reload")})
                          })

