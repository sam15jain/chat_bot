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
        render : function(){
            // console.log("here render");
            var scrollElm = document.scrollingElement;
            scrollElm.scrollTop = scrollElm.scrollHeight;
            if(this.newMsg.length !== 0){
                let nMsg = document.createElement('li');
                nMsg.innerHTML=this.newMsg;
                nMsg.className = "userMsg";
                msgList.appendChild(nMsg);
                typeBox.value = "";
                nMsg = document.createElement('li');
                nMsg.innerHTML="OK";
                nMsg.className = "botMsg";
                msgList.appendChild(nMsg);
            }
            var scrollElm = document.scrollingElement;
            scrollElm.scrollTop = scrollElm.scrollHeight;
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