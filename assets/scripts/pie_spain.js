
d3.csv('data/SPAIN/spain_clean_dataset.csv').then(function(data) {
   
//    var selectedPlace = "New York";
    var selectedDateStart = "14";
    data = data.map(function(d){
        return{
            date : d.Date,
            language : d["Tweet language (ISO 639-1)"],
            country : d.Country
        };
    });
    
    data = data.filter(function(d) {
        return ((d.date.startsWith(selectedDateStart)));
    });
//    console.log(data);
    
    var dataset = [];
    
    var countEN = 0, countES = 0, countDA = 0, countDE = 0, countFI = 0, countFR = 0, countHU = 0, countIT = 0, countNL = 0, countPT = 0, countRU = 0, countSV = 0, countTR = 0;
    
    data.forEach(function(d){
        if (d.language=="en"){
            countEN++;
        }
        else if (d.language=="es"){
            countES++;
        }
        else if (d.language=="da"){
            countDA++;
        }
        else if (d.language=="de"){
            countDE++;
        }
        else if (d.language=="fi"){
            countFI++;
        }
        else if (d.language=="fr"){
            countFR++;
        }
        else if (d.language=="hu"){
            countHU++;
        }
        else if (d.language=="it"){
            countIT++;
        }
        else if (d.language=="nl"){
            countNL++;
        }
        else if (d.language=="pt"){
            countPT++;
        }
        else if (d.language=="ru"){
            countRU++;
        }
        else if (d.language=="sv"){
            countSV++;
        }
        else if (d.language=="tr"){
            countTR++;
        }
    });
    var totalCount = countEN + countDA + countDE + countES + countFI + countFR + countHU + countIT + countNL + countPT + countRU + countSV + countTR
    
    dataset.push({label: "English",count: countEN});
    dataset.push({label: "Spanish",count: countES});
    dataset.push({label: "Danish",count: countDA});
    dataset.push({label: "German",count: countDE});
    dataset.push({label: "Finnish",count: countFI});
    dataset.push({label: "French",count: countFR});
    dataset.push({label: "Hungarian",count: countHU});
    dataset.push({label: "Italian",count: countIT});
    dataset.push({label: "Dutch",count: countNL});
    dataset.push({label: "Portuguese",count: countPT});
    dataset.push({label: "Russian",count: countRU});
    dataset.push({label: "Swedish",count: countSV});
    dataset.push({label: "Turkish",count: countTR});
// console.log(dataset);

//var color = d3.scaleOrdinal(["#ec6416","#e2cf56","#8A56E2","#e2cf56","#68e256","#e25668","#56aee2","#e256ae","#aee256","#5668e2","#5668e2","#643409","#08e288","#61033f"]);
    var color = d3.scaleOrdinal(["#ec6416","#e2cf56","#8A56E2","#e6194B","#68e256","#9A6324","#56aee2","#e256ae","#000000","#e6beff","rgb(147, 130, 15)","#643409","#08e288","#61033f"]);
var pieDiv = document.getElementById("pie-container_spain");
//console.log(pieDiv.clientHeight);

var pieWidth = document.documentElement.clientWidth/4;
var pieHeight = document.documentElement.clientHeight/2;
var pieRadius = Math.min(pieWidth,pieHeight)/2.4;
//console.log(pieHeight);
//console.log(pieWidth);
//var margin = {top: pieHeight/20 , right: pieHeight/20 , bottom: pieHeight/20, left: pieHeight/20};
    
//console.log(margin);
    
var svg = d3.select("#pie_spain").append("svg")
			.attr("width", pieWidth)
            .attr("filter", "url(#dropshadow)")
			.attr("height", pieHeight)
			.append("g")
            .attr('transform', 'translate(' + pieRadius*1.1 + ',' + pieRadius*1.1 + ')')
;


var arc = d3.arc()
            .outerRadius(pieRadius)
            .innerRadius(pieRadius/2)
;
var pie = d3.pie()
            .sort(null)
//            .startAngle(1.1*Math.PI)
//            .endAngle(3.1*Math.PI)
            .value(function(d){ return d.count; });    


 /* For the drop shadow filter for pie... */
  var defs = svg.append("defs");

  var filter = defs.append("filter")
      .attr("id", "dropshadow")

  filter.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 10)
      .attr("result", "blur");
  filter.append("feOffset")
      .attr("in", "blur")
      .attr("dx", 2)
      .attr("dy", 2)
      .attr("result", "offsetBlur");

  var feMerge = filter.append("feMerge");

  feMerge.append("feMergeNode")
      .attr("in", "offsetBlur")
  feMerge.append("feMergeNode")
      .attr("in", "SourceGraphic");

    
// /* For the drop shadow filter for pie... */
//  var defss = svg.append("defss");
//
//  var filterr = defs.append("filter")
//      .attr("id", "dropshadow")
//
//  filter.append("feGaussianBlur")
//      .attr("in", "SourceAlpha")
//      .attr("stdDeviation", 4)
//      .attr("result", "blur");
//  filter.append("feOffset")
//      .attr("in", "blur")
//      .attr("dx", 2)
//      .attr("dy", 2)
//      .attr("result", "offsetBlur");
//
//  var feMerge = filter.append("feMerge");
//
//  feMerge.append("feMergeNode")
//      .attr("in", "offsetBlur")
//  feMerge.append("feMergeNode")
//      .attr("in", "SourceGraphic");
    
    
    
    
    
var path = svg.selectAll('path')
  .data(pie(dataset))
  .enter()
  .append('path')
//  .attr("stroke", "white")
//  .attr("stroke-width", "1px")
  .attr('d', arc)
  .attr('fill', function(d) { return color(d.data.label); })
//  .attr("filter", "url(#dropshadow)")
  .each(function(d) { this._current = d; })
  .transition()
    .ease(d3.easeBounce)
    .duration(2000)
    .attrTween("d", tweenPie)
  .transition()
    .ease(d3.easeElastic)
    .delay(function(d, i) { return 2000 + i * 50; })
    .duration(750)
    .attrTween("d", tweenDonut);

function tweenPie(b) {
  b.innerRadius = 0;
  var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
  return function(t) { return arc(i(t)); };
}

function tweenDonut(b) {
  b.innerRadius = pieRadius * .6;
  var i = d3.interpolate({innerRadius: 0}, b);
  return function(t) { return arc(i(t)); };
}

//    console.log(this._current);
var formatComma = d3.format(",");

var tooltip = d3.select("body")	
        .append("div")
        .style("position", "absolute")
        .style("z-index", "100")
        .style("padding", "3px 8px")
        .style("background", "black")
        .style("color", "white")
        .style("text-align", "center")
        .style("font-size", "1em")
        .style("font-family", "Lato")
        .style("border", "1px solid #000")
        .style("border-radius", "2px")
        .style("visibility", "hidden");
    
    
d3.select("#pie_spain").selectAll("path") 
            .on("mouseover", function(d){return tooltip.style("visibility", "visible"), tooltip.html("<strong><span style = 'text-transform: uppercase; font-size: 1.5em;'>" + d.data.label + "</span></strong>" + "</br>" + "No. of Tweets : " + formatComma(d.data.count) );})
            .on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
            .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
//d3.select("#pie_spain").selectAll("path")
//    .attr("font-size",function(d){return "10px;})
    
    var title = svg.append("g").attr("class","pie-title");

            if (selectedDateStart=="21"){
                var dateend = "st";
            }
            else if (selectedDateStart=="22"){
                var dateend = "nd";
            }
            else{
                var dateend = "th";
            }
          
      
        title.append("text")
        .attr("x", 0)
        .attr("y", 0)
//        .attr("width", 500)
        .attr("font-size", function(d){return pieWidth/25;})
        .style("font-weight",700)
        .style("font-family","Lato")
        .attr("text-align","center")
        .attr("text-anchor","middle")
        .attr("dy", "-1em")
        .text("SPAIN");
    
        title.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 500)
        .attr("font-size", function(d){return pieWidth/30;})
        .style("font-weight",700)
        .style("font-family","Lato")
        .attr("text-align","center")
        .attr("text-anchor","middle")
        .attr("dy", "0.5em")
        .text(selectedDateStart + dateend + " April 2016");
    
        title.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 500)
        .attr("font-size", function(d){return pieWidth/30;})
        .style("font-weight",500)
        .style("font-family","Lato")
        .attr("text-align","center")
        .attr("text-anchor","middle")
        .attr("dy", "2em")
        .text("No. of Tweets : " + formatComma(totalCount));
        
        
    
    
    

 
  });

//Callback from Slider

var drawPieSPAIN = function(selectedDateStart){
    d3.select("#pie_spain").selectAll("*").remove();
    
d3.csv('data/SPAIN/spain_clean_dataset.csv').then(function(data) {
   
//    var selectedPlace = "New York";
//    var selectedDateStart = "14";
    data = data.map(function(d){
        return{
            date : d.Date,
            language : d["Tweet language (ISO 639-1)"],
            country : d.Country
        };
    });
    
    data = data.filter(function(d) {
        return ((d.date.startsWith(selectedDateStart)));
    });
//    console.log(data);
    
    var dataset = [];
    
    var countEN = 0, countES = 0, countDA = 0, countDE = 0, countFI = 0, countFR = 0, countHU = 0, countIT = 0, countNL = 0, countPT = 0, countRU = 0, countSV = 0, countTR = 0;
    
    data.forEach(function(d){
        if (d.language=="en"){
            countEN++;
        }
        else if (d.language=="es"){
            countES++;
        }
        else if (d.language=="da"){
            countDA++;
        }
        else if (d.language=="de"){
            countDE++;
        }
        else if (d.language=="fi"){
            countFI++;
        }
        else if (d.language=="fr"){
            countFR++;
        }
        else if (d.language=="hu"){
            countHU++;
        }
        else if (d.language=="it"){
            countIT++;
        }
        else if (d.language=="nl"){
            countNL++;
        }
        else if (d.language=="pt"){
            countPT++;
        }
        else if (d.language=="ru"){
            countRU++;
        }
        else if (d.language=="sv"){
            countSV++;
        }
        else if (d.language=="tr"){
            countTR++;
        }
    });
    
    var totalCount = countEN + countDA + countDE + countES + countFI + countFR + countHU + countIT + countNL + countPT + countRU + countSV + countTR
    dataset.push({label: "English",count: countEN});
    dataset.push({label: "Spanish",count: countES});
    dataset.push({label: "Danish",count: countDA});
    dataset.push({label: "German",count: countDE});
    dataset.push({label: "Finnish",count: countFI});
    dataset.push({label: "French",count: countFR});
    dataset.push({label: "Hungarian",count: countHU});
    dataset.push({label: "Italian",count: countIT});
    dataset.push({label: "Dutch",count: countNL});
    dataset.push({label: "Portuguese",count: countPT});
    dataset.push({label: "Russian",count: countRU});
    dataset.push({label: "Swedish",count: countSV});
    dataset.push({label: "Turkish",count: countTR});
// console.log(dataset);

//var color = d3.scaleOrdinal(["#ec6416","#e2cf56","#8A56E2","#e2cf56","#68e256","#e25668","#56aee2","#e256ae","#aee256","#5668e2","#5668e2","#643409","#08e288","#61033f"]);
    var color = d3.scaleOrdinal(["#ec6416","#e2cf56","#8A56E2","#e6194B","#68e256","#9A6324","#56aee2","#e256ae","#000000","#e6beff","rgb(147, 130, 15)","#643409","#08e288","#61033f"]);
    
var pieDiv = document.getElementById("pie-container_spain");
//console.log(pieDiv.clientHeight);
var pieWidth = document.documentElement.clientWidth/4;
var pieHeight = document.documentElement.clientHeight/2;
var pieRadius = Math.min(pieWidth,pieHeight)/2.4;
 
var svg = d3.select("#pie_spain").append("svg")
			.attr("width", pieWidth)
            .attr("filter", "url(#dropshadow)")
			.attr("height", pieHeight)
			.append("g")
            .attr('transform', 'translate(' + pieRadius*1.1 + ',' + pieRadius*1.1 + ')')
;


var arc = d3.arc()
            .outerRadius(pieRadius)
            .innerRadius(pieRadius/2);
var pie = d3.pie()
            .sort(null)
            .value(function(d){ return d.count; });    
    
var path = svg.selectAll('path')
  .data(pie(dataset))
  .enter()
  .append('path')
//  .attr("stroke", "white")
//  .attr("stroke-width", "1px")
  .attr('d', arc)
  .attr('fill', function(d) { return color(d.data.label); })
  .each(function(d) { this._current = d; })
  .transition()
    .ease(d3.easeBounce)
    .duration(2000)
    .attrTween("d", tweenPie)
  .transition()
    .ease(d3.easeElastic)
    .delay(function(d, i) { return 2000 + i * 50; })
    .duration(750)
    .attrTween("d", tweenDonut);

function tweenPie(b) {
  b.innerRadius = 0;
  var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
  return function(t) { return arc(i(t)); };
}

function tweenDonut(b) {
  b.innerRadius = pieRadius * .6;
  var i = d3.interpolate({innerRadius: 0}, b);
  return function(t) { return arc(i(t)); };
}
    
var formatComma = d3.format(",");

var tooltip = d3.select("body")	
        .append("div")
        .style("position", "absolute")
        .style("z-index", "100")
        .style("padding", "3px 8px")
        .style("background", "black")
        .style("color", "white")
        .style("text-align", "center")
        .style("font-size", "1em")
        .style("font-family", "Lato")
        .style("border", "1px solid #000")
        .style("border-radius", "2px")
        .style("visibility", "hidden");
    
d3.select("#pie_spain").selectAll("path") 
            .on("mouseover", function(d){return tooltip.style("visibility", "visible"), tooltip.html("<strong><span style = 'text-transform: uppercase; font-size:1.5em;'>" + d.data.label + "</span></strong>" + "</br>" + "No. of Tweets : " + formatComma(d.data.count) );})
            .on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
            .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
    
    var title = svg.append("g")

      if (selectedDateStart=="21"){
                var dateend = "st";
            }
            else if (selectedDateStart=="22"){
                var dateend = "nd";
            }
            else{
                var dateend = "th";
            }  
      
        title.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 500)
        .attr("font-size", function(d){return pieWidth/25;})
        .style("font-weight",700)
        .style("font-family","Lato")
        .attr("text-align","center")
        .attr("text-anchor","middle")
        .attr("dy", "-1em")
        .text("SPAIN");
    
        title.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 500)
        .attr("font-size", function(d){return pieWidth/30;})
        .style("font-weight",700)
        .style("font-family","Lato")
        .attr("text-align","center")
        .attr("text-anchor","middle")
        .attr("dy", "0.3em")
        .text(selectedDateStart + dateend + " April 2016");
    
        title.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 500)
        .attr("font-size", function(d){return pieWidth/30;})
        .style("font-weight",500)
        .style("font-family","Lato")
        .attr("text-align","center")
        .attr("text-anchor","middle")
        .attr("dy", "2em")
        .text("No. of Tweets : " + formatComma(totalCount));
 
  });
};

//Callback from Map

var drawPie_spain = function(selectedPlace,selectedDateStart){
    d3.select("#pie_spain").selectAll("*").remove();
    
//    console.log(selectedDateStart);
//    console.log(selectedPlace);
    
d3.csv('data/SPAIN/spain_clean_dataset.csv').then(function(data) {
   
//    var selectedPlace = selectedPlace;
//    var selectedDateStart = selectedDateStart;
    data = data.map(function(d){
        return{
            date : d.Date,
            language : d["Tweet language (ISO 639-1)"],
            place : d.place,
            country : d.Country
        };
    })
    
//    console.log(data);
//    console.log((selectedDateStart).length);
//    console.log((selectedPlace).length);
//    console.log(selectedDateStart=="14");
//    console.log(selectedPlace=="Oregon");
    
    data = data.filter(function(d) {
        return ((d.place == selectedPlace) && (d.date.startsWith(selectedDateStart)));
    })
    
//    console.log(data);
    
    
    var dataset = [];
    
    var countEN = 0, countES = 0, countDA = 0, countDE = 0, countFI = 0, countFR = 0, countHU = 0, countIT = 0, countNL = 0, countPT = 0, countRU = 0, countSV = 0, countTR = 0;
    
    data.forEach(function(d){
        if (d.language=="en"){
            countEN++;
        }
        else if (d.language=="es"){
            countES++;
        }
        else if (d.language=="da"){
            countDA++;
        }
        else if (d.language=="de"){
            countDE++;
        }
        else if (d.language=="fi"){
            countFI++;
        }
        else if (d.language=="fr"){
            countFR++;
        }
        else if (d.language=="hu"){
            countHU++;
        }
        else if (d.language=="it"){
            countIT++;
        }
        else if (d.language=="nl"){
            countNL++;
        }
        else if (d.language=="pt"){
            countPT++;
        }
        else if (d.language=="ru"){
            countRU++;
        }
        else if (d.language=="sv"){
            countSV++;
        }
        else if (d.language=="tr"){
            countTR++;
        }
    });
    
    var totalCount = countEN + countDA + countDE + countES + countFI + countFR + countHU + countIT + countNL + countPT + countRU + countSV + countTR
    
//    console.log(totalCount);
    
    
    dataset.push({label: "English",count: countEN});
    dataset.push({label: "Spanish",count: countES});
    dataset.push({label: "Danish",count: countDA});
    dataset.push({label: "German",count: countDE});
    dataset.push({label: "Finnish",count: countFI});
    dataset.push({label: "French",count: countFR});
    dataset.push({label: "Hungarian",count: countHU});
    dataset.push({label: "Italian",count: countIT});
    dataset.push({label: "Dutch",count: countNL});
    dataset.push({label: "Portuguese",count: countPT});
    dataset.push({label: "Russian",count: countRU});
    dataset.push({label: "Swedish",count: countSV});
    dataset.push({label: "Turkish",count: countTR});
//console.log(dataset);
    
//var color = d3.scaleOrdinal(["#ec6416","#e2cf56","#8A56E2","08e288","#e2cf56","#68e256","#e25668","#56aee2","#e256ae","#aee256","#5668e2","#5668e2","#643409","#08e288","#61033f"]);
    var color = d3.scaleOrdinal(["#ec6416","#e2cf56","#8A56E2","#e6194B","#68e256","#9A6324","#56aee2","#e256ae","#000000","#e6beff","rgb(147, 130, 15)","#643409","#08e288","#61033f"]);
    
var pieDiv = document.getElementById("pie-container_spain");
//console.log(pieDiv.clientHeight);
var pieWidth = document.documentElement.clientWidth/4;
var pieHeight = document.documentElement.clientHeight/2;
var pieRadius = Math.min(pieWidth,pieHeight)/2.4;
console.log(d3.select("#dropshadow"));      
var svg = d3.select("#pie_spain").append("svg")
			.attr("width", pieWidth)
            .attr("filter", "url(#dropshadow)")
			.attr("height", pieHeight)
			.append("g")
            .attr('transform', 'translate(' + pieRadius*1.1 + ',' + pieRadius*1.1 + ')')
;


var arc = d3.arc()
            .outerRadius(pieRadius)
            .innerRadius(pieRadius/2);
var pie = d3.pie()
            .sort(null)
            .value(function(d){ return d.count; });    
    
var path = svg.selectAll('path')
  .data(pie(dataset))
  .enter()
  .append('path')
//  .attr("stroke", "white")
//  .attr("stroke-width", "1px")
  .attr('d', arc)
  .attr('fill', function(d) { return color(d.data.label); })
  .each(function(d) { this._current = d; })
  .transition()
    .ease(d3.easeBounce)
    .duration(2000)
    .attrTween("d", tweenPie)
  .transition()
    .ease(d3.easeElastic)
    .delay(function(d, i) { return 2000 + i * 50; })
    .duration(750)
    .attrTween("d", tweenDonut);

function tweenPie(b) {
  b.innerRadius = 0;
  var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
  return function(t) { return arc(i(t)); };
}

function tweenDonut(b) {
  b.innerRadius = pieRadius * .6;
  var i = d3.interpolate({innerRadius: 0}, b);
  return function(t) { return arc(i(t)); };
}
    
var formatComma = d3.format(",");

var tooltip = d3.select("body")	
        .append("div")
        .style("position", "absolute")
        .style("z-index", "100")
        .style("padding", "3px 8px")
        .style("background", "black")
        .style("color", "white")
        .style("text-align", "center")
        .style("font-size", "1em")
        .style("font-family", "Lato")
        .style("border", "1px solid #000")
        .style("border-radius", "2px")
        .style("visibility", "hidden");
    
d3.select("#pie_spain").selectAll("path") 
            .on("mouseover", function(d){return tooltip.style("visibility", "visible"), tooltip.html("<strong><span style = 'text-transform: uppercase; font-size:1.5em;'>" + d.data.label + "</span></strong>" + "</br>" + "No. of Tweets : " + formatComma(d.data.count) );})
            .on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
            .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    var title = svg.append("g")

        
      
        title.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 500)
        .attr("font-size", function(d){return pieWidth/25;})
        .style("font-weight",700)
        .style("font-family","Lato")
        .attr("text-align","center")
        .attr("text-anchor","middle")
        .attr("dy", "0em")
        .text( selectedPlace )
    
    ;
    
     title.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 500)
        .attr("font-size", function(d){return pieWidth/30;})
        .style("font-weight",500)
        .style("font-family","Lato")
        .attr("text-align","center")
        .attr("text-anchor","middle")
        .attr("dy", "1.5em")
        .text("No. of Tweets : " + formatComma(totalCount));
 
  })
};