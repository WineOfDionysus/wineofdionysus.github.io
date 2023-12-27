function setSettings()
{
    var standart1 = "https://thingspeak.com/channels/2388828/charts/1?api_key=P270Q7US5PVK73F5";
    var standart2 = "https://thingspeak.com/channels/2388828/charts/2?api_key=P270Q7US5PVK73F5";

    var plot1 = document.getElementById("p1");
    var plot2 = document.getElementById("p2");

    plot1.src = standart1;
    plot2.src = standart2;

    var auto_update_checkbox = document.getElementById("auto-update");
    if(auto_update_checkbox.checked)
    {
        plot1.src = plot1.src + "&dynamic=true";
        plot2.src = plot2.src + "&dynamic=true";
    }

    if(document.getElementById("nums").value != "")
    {
        plot1.src = plot1.src + "&results=" + document.getElementById("nums").value;
        plot2.src = plot2.src + "&results=" + document.getElementById("nums").value;
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
        }
    }
}