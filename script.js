/* created by Samyak Jain
    on 15 July 2020 */

onload = function(){
    console.log("here onload");
    var chatObj = {
        init : function(){
            this.cacheDom();
            this.eventBind();
        },
        cacheDom : function(){
            this.chatBox = document.getElementById("chatbox");
            this.msgBox = document.getElementById("msgbox");
            this.msgList = document.getElementById("msgList");
            this.typeBox = document.getElementById("typebox");
            this.sendBtn = document.getElementById("sendBtn");
        },
        eventBind : function(){
            sendBtn.addEventListener("click",this.addMsg);
            typeBox.addEventListener("keyup",this.addMsgEnter);
        },
        render : async function(){
            // console.log("here render");
            scrollBottom();
            if(this.newMsg.length !== 0){
                let nMsg = document.createElement('li');
                nMsg.innerHTML=this.newMsg;
                nMsg.className = "userMsg";
                msgList.appendChild(nMsg);
                typeBox.value = "";
                nMsg = document.createElement('li');
                let data = await eval("getJoke()");
                nMsg.innerHTML=data.value.joke;
                // nMsg.innerHTML="ok";
                nMsg.className = "botMsg";
                msgList.appendChild(nMsg);
            }
            scrollBottom();    
        },
        addMsg : function(){
            // console.log("here addMsg");
            chatObj.newMsg = typeBox.value.trim();
            chatObj.render();
        },
        addMsgEnter : function(e){
            // console.log("here addMsg");
            if(e.key === "Enter"){
                chatObj.newMsg = typeBox.value.trim();
                chatObj.render();
            }
            
        },
    }
    chatObj.init();

}
function scrollBottom(){
    var scrollElm = document.scrollingElement;
    scrollElm.scrollTop = scrollElm.scrollHeight;
}
async function getJoke() {
    const response = await fetch('http://api.icndb.com/jokes/random');
    const jsonResp = await response.json();
    return jsonResp;
}
