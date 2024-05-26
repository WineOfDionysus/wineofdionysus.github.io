var fullScreen = 0;

window.addEventListener("load",()=>{
    var plotsType = document.getElementById("selectType");
    plotsType.addEventListener('change', function(e) {  
        setSettings();
      });
    var plotsHeight = document.getElementById("plotsH");
    plotsHeight.addEventListener('change', function(e) {  
        setSettings();
      });
    var plotsWidth = document.getElementById("plotsW");
    plotsWidth.addEventListener('change', function(e) {  
        setSettings();
      });
});



function setSettings()
{
    var standart1 = "https://thingspeak.com/channels/2388828/charts/1?api_key=P270Q7US5PVK73F5&width=auto&height=auto&xaxis=Дата и время&title=Данные датчика температуры";
    var standart2 = "https://thingspeak.com/channels/2388828/charts/2?api_key=P270Q7US5PVK73F5&width=auto&height=auto&xaxis=Дата и время&title=Данные датчика влажности";
    var standart3 = "https://thingspeak.com/channels/2388828/charts/1?api_key=P270Q7US5PVK73F5&width=auto&height=auto&xaxis=Дата и время&title=Данные датчика температуры";
    var standart4 = "https://thingspeak.com/channels/2388828/charts/2?api_key=P270Q7US5PVK73F5&width=auto&height=auto&xaxis=Дата и время&title=Данные датчика влажности";

    var plot1 = document.getElementById("p1");
    var plot2 = document.getElementById("p2");
    var plot3 = document.getElementById("p3");
    var plot4 = document.getElementById("p4");

    plot1.src = standart1;
    plot2.src = standart2;
    plot3.src = standart3;
    plot4.src = standart4;

    if(fullScreen == 0)
    {

        var plotsHeight = document.getElementById("plotsH");
        var plotsWidth = document.getElementById("plotsW");

        document.getElementsByTagName('iframe')[0].height = plotsHeight.value + "px";
        document.getElementsByTagName('iframe')[1].height = plotsHeight.value + "px";

        document.getElementsByTagName('iframe')[0].width = plotsWidth.value + "%";
        document.getElementsByTagName('iframe')[1].width = plotsWidth.value + "%";
    }
    else
    {
        document.getElementsByTagName('iframe')[0].height = window.screen.height/2 + "px";
        document.getElementsByTagName('iframe')[1].height = window.screen.height/2 + "px";

        document.getElementsByTagName('iframe')[0].width = "100%";
        document.getElementsByTagName('iframe')[1].width = "100%";
    }

    var plotsType = document.getElementById("selectType");

    if(plotsType.value == "line")
    {
        plot1.src = plot1.src + "&type=line";
        plot2.src = plot2.src + "&type=line";
        plot3.src = plot4.src + "&type=line";
        plot4.src = plot3.src + "&type=line";
    }
    else if(plotsType.value == "spline")
    {
        plot1.src = plot1.src + "&type=spline";
        plot2.src = plot2.src + "&type=spline";
        plot3.src = plot3.src + "&type=spline";
        plot4.src = plot4.src + "&type=spline";
    }
    else if(plotsType.value == "column")
    {
        plot1.src = plot1.src + "&type=column";
        plot2.src = plot2.src + "&type=column";
        plot3.src = plot3.src + "&type=column";
        plot4.src = plot4.src + "&type=column";
    }

    var auto_update_checkbox = document.getElementById("auto-update");
    if(auto_update_checkbox.checked)
    {
        plot1.src = plot1.src + "&dynamic=true";
        plot2.src = plot2.src + "&dynamic=true";
        plot3.src = plot3.src + "&dynamic=true";
        plot4.src = plot4.src + "&dynamic=true";
    }

    if(document.getElementById("nums").value != "")
    {
        plot1.src = plot1.src + "&results=" + document.getElementById("nums").value;
        plot2.src = plot2.src + "&results=" + document.getElementById("nums").value;
        plot3.src = plot3.src + "&results=" + document.getElementById("nums").value;
        plot4.src = plot4.src + "&results=" + document.getElementById("nums").value;
    }

    var date_check = document.getElementById("datecheck");
    if(date_check.checked)
    {
        
        var dstart = new Date(Date.parse(document.getElementById("datestart").value));
        var dend = new Date(Date.parse(document.getElementById("dateend").value));


        if(dstart.value != NaN && dend.value != NaN)
        {
            plot1.src = plot1.src + "&start=" + dstart.toISOString().substring(0,10) + "%20" + dstart.toISOString().substring(11,19) +
            "&end=" + dend.toISOString().substring(0,10) + "%20" + dend.toISOString().substring(11,19);

            plot2.src = plot2.src + "&start=" + dstart.toISOString().substring(0,10) + "%20" + dstart.toISOString().substring(11,19) +
            "&end=" + dend.toISOString().substring(0,10) + "%20" + dend.toISOString().substring(11,19);

            plot3.src = plot1.src + "&start=" + dstart.toISOString().substring(0,10) + "%20" + dstart.toISOString().substring(11,19) +
            "&end=" + dend.toISOString().substring(0,10) + "%20" + dend.toISOString().substring(11,19);

            plot4.src = plot2.src + "&start=" + dstart.toISOString().substring(0,10) + "%20" + dstart.toISOString().substring(11,19) +
            "&end=" + dend.toISOString().substring(0,10) + "%20" + dend.toISOString().substring(11,19);
        }
    }
}

function downloadData()
{
    var data = 'https://api.thingspeak.com/channels/2388828/feeds.csv?api_key=P270Q7US5PVK73F5';
    if(document.getElementById("setSettingsToLoad").checked)
    {
        if(document.getElementById("nums").value != "")
        {
            data += "&results=" + document.getElementById("nums").value;
        }

        if(document.getElementById("datecheck").checked)
        {
            var dstart = new Date(Date.parse(document.getElementById("datestart").value));
            var dend = new Date(Date.parse(document.getElementById("dateend").value));

            data += "&start=" + dstart.toISOString().substring(0,10) + "%20" + dstart.toISOString().substring(11,19) +
            "&end=" + dend.toISOString().substring(0,10) + "%20" + dend.toISOString().substring(11,19);
        }

    }

    document.location = data;
}

function setFullScreen()
{
    alert("Что-бы выйти из полноэкранного, нажмите 2 раза Ctrl");
    fullScreen = 1;
    document.getElementsByClassName("settings")[0].style.display = "none";
    document.getElementsByClassName("plotsSettings")[0].style.display = "none";
    setSettings();

    document.addEventListener("keydown", documentEventSetDefault);
}

var documentEventSetDefault = function(event)
{
    if(event.ctrlKey)
    {
        fullScreen = 0;
        setSettings();
        document.getElementsByClassName("settings")[0].style.display = "inline";
        document.getElementsByClassName("plotsSettings")[0].style.display = "inline";

        document.removeEventListener("keydown", documentEventSetDefault);
    }
};

