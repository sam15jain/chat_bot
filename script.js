/* created by Samyak Jain
    on 15 July 2020 */

onload = function () {
    console.log("here onload");
    askedWeather = false;
    askedNews = false;
    newsCnt = 0;
    jokesCnt = 0;
    replyCnt = 0;
    chatEnd = false;


    var chatObj = {
        init: function () {
            this.cacheDom();
            this.eventBind();
        },
        cacheDom: function () {
            this.chatBox = document.getElementById("chatbox");
            this.msgBox = document.getElementById("msgbox");
            this.msgList = document.getElementById("msgList");
            this.typeBox = document.getElementById("typebox");
            this.sendBtn = document.getElementById("sendBtn");
        },
        eventBind: function () {
            sendBtn.addEventListener("click", this.addMsg);
            typeBox.addEventListener("keyup", this.addMsgEnter);
        },
        
        
        userRender: async function () {
            // console.log("here render");
            scrollBottom();
            if (this.newMsg.length !== 0) {
                showMsg(this.newMsg,"userMsg");
                typeBox.value = "";
                setTimeout(function(){chatObj.botRender()},500);                
            }
            scrollBottom();
        },


        botRender: async function () {
            let totalOptions = 4;
            if(this.newMsg.toLowerCase() === "bye" || this.newMsg.toLowerCase() === "'bye'"){
                if(chatEnd === false){
                    showMsg("Chat has ended !","botMsg");
                    setTimeout(
                        function(){
                            showMsg("Enter 'reset' to start the chat again !","botMsg");
                        } , 1000 
                    );
                    
                    chatEnd = true;      
                }
                return;
            }
            if(chatEnd === true ){
                if(this.newMsg.toLowerCase() === "reset" || this.newMsg.toLowerCase() === "'reset'"){
                    location.reload();
                }
                else{
                    showMsg("Chat has ended ! Enter 'reset' to start the chat again !","botMsg");
                }
                return;
            }
            if(this.newMsg === "#" || this.newMsg === "'#'" || this.newMsg === "' # '"){
                showMenu();
                return;
            }
            let optionNo = parseInt(this.newMsg);
            if (isNaN(optionNo) == false && 1 <= optionNo && optionNo <= totalOptions) {
                var data = await functionsArr[optionNo - 1]();
                // var data = await eval("functionsArr[optionNo - 1]()");
            }
            else {
                data = "Please enter a valid option number (1 to 4) and try again ! :)";
            }

            showMsg(data,"botMsg");

            if (replyCnt === 0) {
                setTimeout(
                    function(){
                        showMsg("Keep entering option numbers to keep chatting with me. <br><br>You can enter ' # ' anytime to see the options menu again ! :) <br><br> Enter 'bye' to end the chat at any time.","botMsg");
                    }, 1000
                );
                replyCnt = 1;
            }
        },


        addMsg: function () {
            // console.log("here addMsg");
            chatObj.newMsg = typeBox.value.trim();
            chatObj.userRender();
        },
        addMsgEnter: function (e) {
            // console.log("here addMsg");
            if (e.key === "Enter") {
                chatObj.newMsg = typeBox.value.trim();
                chatObj.userRender();
            }
        }

    }

    chatObj.init();
}
var functionsArr = [
    getNews,
    getWeather,
    getFact,
    getJoke
]

var jsonObj = {

}

async function getNews() {
    
    return "This is a news";
}

async function getWeather() {
    

    return "This is the weather";
}

async function getJoke() {
    if (jokesCnt % 5 === 4) {
        const response = await fetch('https://api.icndb.com/jokes/random');
        const jsonResp = await response.json();
        jokesCnt++;
        return jsonResp.value.joke;
    }
    else {
        const options = {
            headers: {
                Accept: "application/json"
            }
        };
        const response = await fetch("https://icanhazdadjoke.com/", options);
        const jsonResp = await response.json();
        jokesCnt++;
        return jsonResp.joke;
    }

}

async function getFact() {
    const response = await fetch('https://uselessfacts.jsph.pl//random.json?language=en');
    const jsonResp = await response.json(); 
    return jsonResp.text;
    // return "Fun Fact: I am a Bot but I have feelings too!! :)";
}

function scrollBottom() {
    var scrollElm = document.scrollingElement;
    scrollElm.scrollTop = scrollElm.scrollHeight;
}

function showMenu() {
    let nMsg = document.createElement('li');
    nMsg.innerHTML = "Menu: <br>1.Check the news <br>2.Get weather updates <br>3.Hear a fun fact <br>4.Hear a joke <br>(Enter an option number to continue or enter 'bye' to end the chat.)";
    nMsg.className = "botMsg";
    msgList.appendChild(nMsg);
}

function showMsg(data,msgClass){
    let nMsg = document.createElement('li');
    nMsg.innerHTML = data;
    nMsg.className = msgClass;
    msgList.appendChild(nMsg);
}