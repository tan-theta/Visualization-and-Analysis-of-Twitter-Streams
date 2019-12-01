

var drawBar14 = function(selectedState){
    d3.select("#bar-chart").selectAll("*").remove();
  d3.csv('data/USA/Hour_14.csv').then(function(data) {

        data = data.filter(function(d) {
        return (d["State"]==selectedState);
    });
    
   console.log(data);
//    delete data[0]["State"]; 
    console.log(data);
    var data2 = data.map(function(d){
       return{
            ["10:00-11:59"] : d["10"],
            ["12:00-13:59"] : d["12"],
            ["14:00-15:59"] : d["14"],
            ["16:00-17:59"] : d["16"],
            ["18:00-19:59"] : d["18"],
            ["20:00-21:59"] : d["20"],
            ["22:00-23:59"] : d["22"]
        };
    });
//    console.log(data2);
    var data1 = d3.entries(data2[0]);
//    console.log(data1);
   console.log(data1);
    
//    var barWidth = document.documentElement.clientWidth/4;
var barHeight = document.documentElement.clientHeight*0.4;    
var barWidth = document.getElementById("bar-chart").clientWidth;
var margin = {top: 20, right: 30, bottom: 50, left: 50},
    width = barWidth - margin.left - margin.right,
    height = barHeight - margin.top - margin.bottom;

    var greyColor = "#898989";
    var barColor = "#518808";
    var highlightColor = "#394006";

    var svg = d3.select("#bar-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var x = d3.scaleBand()
        .range([0, width])
            .padding(0.4);
    var y = d3.scaleLinear()
        .range([height, 0]);

    var xAxis = d3.axisBottom(x).tickSize([]).tickPadding(10);
    var yAxis = d3.axisLeft(y);


    x.domain(data1.map( d => { return d.key; }));
    var max = d3.max(data1, function(d) { return +d.value;} ); if(max==0){return;}
      
      
    y.domain([0,max]);
    svg.append("g")
        .style("font-size","0.8em")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-35)");

    svg.append("g")
        .style("font-size","0.8em")
        .attr("class","y axis")
        .call(yAxis);

    svg.selectAll(".bar")
        .data(data1)
        .enter().append("rect")
        .attr("class", "bar")
        .on("mouseover",function(d){
        d3.select(this).attr("filter", "url(#glow-bar)")
    })
        .on("mouseout",function(d){
        d3.select(this).attr("filter", "url(#no-filter)");
    })
        .style("display", d => { return d.value === null ? "none" : null; })
        .style("fill",  d => { 
            return d.value == d3.max(data1,  d => { return +d.value; }) 
            ? highlightColor : barColor
            })
        .attr("x",  d => { return x(d.key); })
        .attr("width", x.bandwidth())
            .attr("y",  d => { return height; })
            .attr("height", 0)
                .transition()
                .duration(750)
                .delay(function (d, i) {
                    return i * 150;
                })
        .attr("y",  d => { return y(d.value); })
        .attr("height",  d => { return height - y(d.value); });

    svg.selectAll(".label")        
        .data(data1)
        .enter()
        .append("text")
        .attr("class", "label")
        .style("font-size","1em")
        .style("display",  d => { return d.value === null ? "none" : null; })
        .attr("x", ( d => { return x(d.key) +(x.bandwidth())/2; }))
            .style("fill",  d => { 
                return d.value == d3.max(data1,  d => { return +d.value; }) 
                ? highlightColor : barColor
                })
        .attr("y",  d => { return height; })
            .attr("height", 0)
                .transition()
                .duration(750)
                .delay((d, i) => { return i * 150; })
        .text( d => { return d.value; })
        .attr("text-anchor","middle")
        .attr("y",  d => { return y(d.value) + .1; })
        .attr("dy", "-.7em"); 
    
    
});  
};

drawBar14("USA");

var drawBar15 = function(selectedState){
    d3.select("#bar-chart").selectAll("*").remove();
  d3.csv('data/USA/Hour_15.csv').then(function(data) {

        data = data.filter(function(d) {
        return (d["State"]==selectedState);
    });
    
   console.log(data);
    delete data[0]["State"]; 
    
    var data2 = data.map(function(d){
       return{
            ["00:00-02:59"] : d["0"],
            ["03:00-05:59"] : d["3"],
            ["06:00-08:59"] : d["6"],
            ["09:00-11:59"] : d["9"],
            ["12:00-14:59"] : d["12"],
            ["15:00-17:59"] : d["15"],
            ["18:00-20:59"] : d["18"],
            ["21:00-23:59"] : d["21"],
        };
    });
//    console.log(data2);
    var data1 = d3.entries(data2[0]);
//    console.log(data1);
   
    
    var barHeight = document.documentElement.clientHeight*0.4;    
var barWidth = document.getElementById("bar-chart").clientWidth;
var margin = {top: 20, right: 30, bottom: 50, left: 50},
    width = barWidth - margin.left - margin.right,
    height = barHeight - margin.top - margin.bottom;

    var greyColor = "#898989";
    var barColor = "#518808";
    var highlightColor = "#394006";

    var svg = d3.select("#bar-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var x = d3.scaleBand()
        .range([0, width])
            .padding(0.4);
    var y = d3.scaleLinear()
        .range([height, 0]);

    var xAxis = d3.axisBottom(x).tickSize([]).tickPadding(10);
    var yAxis = d3.axisLeft(y);


    x.domain(data1.map( d => { return d.key; }));
    var max = d3.max(data1, function(d) { return +d.value;} ); if(max==0){return;}
    y.domain([0,max]);
    svg.append("g")
        .style("font-size","0.8em")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-35)");

    svg.append("g")
        .style("font-size","0.8em")
        .attr("class","y axis")
        .call(yAxis);

    svg.selectAll(".bar")
        .data(data1)
        .enter().append("rect")
        .attr("class", "bar")
        .on("mouseover",function(d){
        d3.select(this).attr("filter", "url(#glow-bar)")
    })
        .on("mouseout",function(d){
        d3.select(this).attr("filter", "url(#no-filter)")
    })
        .style("display", d => { return d.value === null ? "none" : null; })
        .style("fill",  d => { 
            return d.value == d3.max(data1,  d => { return +d.value; }) 
            ? highlightColor : barColor
            })
        .attr("x",  d => { return x(d.key); })
        .attr("width", x.bandwidth())
            .attr("y",  d => { return height; })
            .attr("height", 0)
                .transition()
                .duration(750)
                .delay(function (d, i) {
                    return i * 150;
                })
        .attr("y",  d => { return y(d.value); })
        .attr("height",  d => { return height - y(d.value); });

    svg.selectAll(".label")        
        .data(data1)
        .enter()
        .append("text")
        .attr("class", "label")
        .style("font-size","1em")
        .style("display",  d => { return d.value === null ? "none" : null; })
        .attr("x", ( d => { return x(d.key) +(x.bandwidth())/2; }))
            .style("fill",  d => { 
                return d.value == d3.max(data1,  d => { return +d.value; }) 
                ? highlightColor : barColor
                })
        .attr("y",  d => { return height; })
            .attr("height", 0)
                .transition()
                .duration(750)
                .delay((d, i) => { return i * 150; })
        .text( d => { return d.value; })
        .attr("text-anchor","middle")
        .attr("y",  d => { return y(d.value) + .1; })
        .attr("dy", "-.7em"); 
    
    
});  
};

var drawBar16 = function(selectedState){
    d3.select("#bar-chart").selectAll("*").remove();
  d3.csv('data/USA/Hour_16.csv').then(function(data) {

        data = data.filter(function(d) {
        return (d["State"]==selectedState);
    });
    
   console.log(data);
    delete data[0]["State"]; 
    
    var data2 = data.map(function(d){
       return{
            ["00:00-01:59"] : d["0"],
            ["02:00-03:59"] : d["2"],
            ["04:00-05:59"] : d["4"],
            ["06:00-07:59"] : d["6"],
            ["08:00-09:59"] : d["8"],
            ["10:00-11:59"] : d["10"],
            ["12:00-13:59"] : d["12"]
            
            
        };
    });
//    console.log(data2);
    var data1 = d3.entries(data2[0]);
//    console.log(data1);
   
    
    var barHeight = document.documentElement.clientHeight*0.4;    
var barWidth = document.getElementById("bar-chart").clientWidth;
var margin = {top: 20, right: 30, bottom: 50, left: 50},
    width = barWidth - margin.left - margin.right,
    height = barHeight - margin.top - margin.bottom;

    var greyColor = "#898989";
    var barColor = "#518808";
    var highlightColor = "#394006";

    var svg = d3.select("#bar-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var x = d3.scaleBand()
        .range([0, width])
            .padding(0.4);
    var y = d3.scaleLinear()
        .range([height, 0]);

    var xAxis = d3.axisBottom(x).tickSize([]).tickPadding(10);
    var yAxis = d3.axisLeft(y);


    x.domain(data1.map( d => { return d.key; }));
    var max = d3.max(data1, function(d) { return +d.value;} ); if(max==0){return;}
    y.domain([0,max]);
    svg.append("g")
        .style("font-size","0.8em")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-35)");

    svg.append("g")
        .style("font-size","0.8em")
        .attr("class","y axis")
        .call(yAxis);

    svg.selectAll(".bar")
        .data(data1)
        .enter().append("rect")
        .attr("class", "bar")
        .on("mouseover",function(d){
        d3.select(this).attr("filter", "url(#glow-bar)")
    })
        .on("mouseout",function(d){
        d3.select(this).attr("filter", "url(#no-filter)")
    })
        .style("display", d => { return d.value === null ? "none" : null; })
        .style("fill",  d => { 
            return d.value == d3.max(data1,  d => { return +d.value; }) 
            ? highlightColor : barColor
            })
        .attr("x",  d => { return x(d.key); })
        .attr("width", x.bandwidth())
            .attr("y",  d => { return height; })
            .attr("height", 0)
                .transition()
                .duration(750)
                .delay(function (d, i) {
                    return i * 150;
                })
        .attr("y",  d => { return y(d.value); })
        .attr("height",  d => { return height - y(d.value); });

    svg.selectAll(".label")        
        .data(data1)
        .enter()
        .append("text")
        .attr("class", "label")
        .style("font-size","1em")
        .style("display",  d => { return d.value === null ? "none" : null; })
        .attr("x", ( d => { return x(d.key) +(x.bandwidth())/2; }))
            .style("fill",  d => { 
                return d.value == d3.max(data1,  d => { return +d.value; }) 
                ? highlightColor : barColor
                })
        .attr("y",  d => { return height; })
            .attr("height", 0)
                .transition()
                .duration(750)
                .delay((d, i) => { return i * 150; })
        .text( d => { return d.value; })
        .attr("text-anchor","middle")
        .attr("y",  d => { return y(d.value) + .1; })
        .attr("dy", "-.7em"); 
    
    
});  
};

