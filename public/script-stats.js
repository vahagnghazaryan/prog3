var socket = io.connect('http://localhost:4444');
var table = document.getElementById("Statistics");

setInterval(function(){
    socket.emit("get stats", []);
}, 5000);

socket.on("send stats",function(statistics){
    statistics = JSON.parse(statistics);
    table.innerHTML = "";
    tableHTML = "<tr><td>Time</td><td>Winter</td><td>Spring</td><td>Summer</td><td>Automn</td><td>SpecialEvent</td><<td>Grass</td><td>Grasseater</td><td>Animal</td><td>Enemy</td><td>Water</td><td>Flower</td></tr>";
    for(var st of statistics){
        tableHTML+="<tr>";
        tableHTML+="<td>"+st.timestamp+"</td>";
        tableHTML+="<td>"+st.winter_count+"</td>";
        tableHTML+="<td>"+st.spring_count+"</td>";
        tableHTML+="<td>"+st.summer_count+"</td>";
        tableHTML+="<td>"+st.automn_count+"</td>";
        tableHTML+="<td>"+st.mutation_count+"</td>";
        tableHTML+="<td>"+st.grass+"</td>";
        tableHTML+="<td>"+st.grassEater+"</td>";
        tableHTML+="<td>"+st.animal+"</td>";
        tableHTML+="<td>"+st.enemy+"</td>";
        tableHTML+="<td>"+st.water+"</td>";
        tableHTML+="<td>"+st.flower+"</td>";
        tableHTML+="</tr>";
    }

    table.innerHTML = tableHTML;
})
