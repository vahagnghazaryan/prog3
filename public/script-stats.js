var socket = io.connect('http://localhost:3000');
//var table = document.getElementById("statistics");

setInterval(function(){
    socket.emit("get stats", []);
}, 1000);

socket.on("send stats",function(statistics){
    statistics = JSON.parse(statistics);
    //console.log(statistics);
})

console.log(statistics);