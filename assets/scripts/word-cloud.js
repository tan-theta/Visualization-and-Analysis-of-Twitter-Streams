
console.log(document.documentElement.clientWidth);
var drawCloudDefault = function(){
    var TARGET_ELEMENT_ID = '#cloud';  
console.log(USA_14);
var data = d3.entries(USA_14);
console.log(data);

    var cloudDimensions = document.querySelector ('#cloud').getBoundingClientRect();
//    console.log(cloudDimensions);
    
var cloudWidth = document.documentElement.clientWidth/4;
var cloudHeight = document.documentElement.clientHeight/2;

  var h = ((Math.ceil(cloudWidth / 100.0) -1) * 100);
  var w = ((Math.ceil(cloudHeight / 100.0) -1) * 100);

  var random = d3.randomIrwinHall(2);
  var countMax = d3.max(data, function(d){ return d.value} );
  var sizeScale = d3.scaleLinear().domain([0, countMax]).range([15, 65])

  var words = data.map(function(d) {
    return {
    text: d.key,
    size: sizeScale(d.value)
    };
  });
console.log(words);
  d3.layout.cloud().size([h, w])
    .words(words)
    .rotate(function() { return Math.round(1-random()) *90; }) 
//    .rotate(function() { return (~~(Math.random() * 6) - 3) * 30; })
    .font("Impact")
    .fontSize(function(d) { return d.size; })
    .on("end", draw) 
    .start();

   
    /* For the drop shadow filter for pie... */
  var defs = d3.selectAll("svg").append("defs");

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
    
    
    //Filter for Word CLoud
var defs = d3.selectAll("svg").append("defs");

//Filter for the outside glow
var filter = defs.append("filter")
    .attr("id","glow")
filter.append("feGaussianBlur")
    .attr("stdDeviation","3")
    .attr("result","coloredBlur");
var feMerge = filter.append("feMerge");
feMerge.append("feMergeNode")
    .attr("in","coloredBlur")
feMerge.append("feMergeNode")
    .attr("in","SourceGraphic");
    
    
//Filter for the outside glow on bar chart
var filter = defs.append("filter")
    .attr("id","glow-bar")
filter.append("feGaussianBlur")
    .attr("stdDeviation","5")
    .attr("result","coloredBlur");
var feMerge = filter.append("feMerge");
feMerge.append("feMergeNode")
    .attr("in","coloredBlur")
feMerge.append("feMergeNode")
    .attr("in","SourceGraphic");
    
//Filter for Choropleth Map
var defs = d3.selectAll("svg").append("defs");

var filter = defs.append("filter")
      .attr("id", "map-filter")

  filter.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 15)
      .attr("result", "blur");
  filter.append("feOffset")
      .attr("in", "blur")
      .attr("dx", 0)
      .attr("dy", 0)
      .attr("result", "offsetBlur");

  var feMerge = filter.append("feMerge");

  feMerge.append("feMergeNode")
      .attr("in", "offsetBlur")
  feMerge.append("feMergeNode")
      .attr("in", "SourceGraphic");

//Filter for Choropleth Map Selected State
var defs = d3.selectAll("svg").append("defs");

var filter = defs.append("filter")
      .attr("id", "map-state-filter")

  filter.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 5)
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
    
//Filter for Choropleth Map Legend
var defs = d3.selectAll("svg").append("defs");

var filter = defs.append("filter")
      .attr("id", "map-legend-filter")

  filter.append("feGaussianBlur")
    .attr("stdDeviation","20")
    .attr("result","coloredBlur");
var feMerge = filter.append("feMerge");
feMerge.append("feMergeNode")
    .attr("in","coloredBlur")
feMerge.append("feMergeNode")
    .attr("in","SourceGraphic");

//None Filter on click
var defs = d3.selectAll("svg").append("defs");

var filter = defs.append("filter")
      .attr("id", "no-filter")

  filter.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 0)
      .attr("result", "blur");
  filter.append("feOffset")
      .attr("in", "blur")
      .attr("dx", 0)
      .attr("dy", 0)
      .attr("result", "offsetBlur");

  var feMerge = filter.append("feMerge");

  feMerge.append("feMergeNode")
      .attr("in", "offsetBlur")
  feMerge.append("feMergeNode")
      .attr("in", "SourceGraphic");

  // wordcloud 描画
  function draw(words) {
    d3.select(TARGET_ELEMENT_ID)
      .append("svg")
//        .attr("filter", "url(#dropshadow)")
        
        .attr("class", "ui fluid image")
//        .attr("transform", "translate(" + w / 10 + "," + h / 5 + ")")
        .attr("preserveAspectRatio", "xMinYMin meet")
//        .attr("viewBox", "0 0 300 300")
        .attr("viewBox", "0 0 " + w + " " + h ) 
        .attr("width", w)    
        .attr("height", h)  
      .append("g")
        .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .on("mouseover",function(d){
        d3.select(this).style("cursor", "pointer").attr("filter", "url(#glow-bar)")
            })
        .on("mouseout",function(d){
        d3.select(this).style("cursor", "default").attr("filter", "url(#no-filter)")
            })
        .transition()
        .ease(d3.easeElastic)
        .delay(1000)
        .duration(2000)
        .attr("filter", "url(#glow)") .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return d3.schemeCategory10[i % 10]; })
        .style("fill-opacity",1)
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
  }
};

drawCloudDefault();
    
//.transition()
//        .ease(d3.easeCubic)
//        .duration('200')

//Callback from Slider

var drawCloudUSA = function(selectedDateStart){
    d3.select("#cloud").selectAll("*").remove();
  var selectedCloud = "USA_" + selectedDateStart ;

  

var TARGET_ELEMENT_ID = '#cloud';  

var data = d3.entries(window[selectedCloud]);
//    console.log(data);
    

    var cloudDimensions = document.querySelector ('#cloud').getBoundingClientRect();
var cloudWidth = document.documentElement.clientWidth/4;
var cloudHeight = document.documentElement.clientHeight/2;

  var h = ((Math.ceil(cloudWidth / 100.0) -1) * 100);
  var w = ((Math.ceil(cloudHeight / 100.0) -1) * 100);

  var random = d3.randomIrwinHall(2);
  var countMax = d3.max(data, function(d){ return d.value} );
  var sizeScale = d3.scaleLinear().domain([0, countMax]).range([15, 65])

  var words = data.map(function(d) {
    return {
    text: d.key,
    size: sizeScale(d.value)
    };
  });
    
//    console.log(words);

  d3.layout.cloud().size([h, w])
    .words(words)
    .rotate(function() { return Math.round(1-random()) *90; }) 
//    .rotate(function() { return (~~(Math.random() * 6) - 3) * 30; })
    .font("Impact")
    .fontSize(function(d) { return d.size; })
    .on("end", draw) 
    .start();


   // wordcloud 描画
  function draw(words) {
    d3.select(TARGET_ELEMENT_ID)
      .append("svg")
        .attr("class", "ui fluid image")
//        .attr("transform", "translate(" + w / 10 + "," + h / 5 + ")")
        .attr("preserveAspectRatio", "xMinYMin meet")
//        .attr("viewBox", "0 0 300 300")
        .attr("viewBox", "0 0 " + w + " " + h ) 
        .attr("width", w)    
        .attr("height", h)  
      .append("g")
        .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text") .on("mouseover",function(d){ d3.select(this).style("cursor", "pointer").attr("filter", "url(#glow-bar)") }) .on("mouseout",function(d){ d3.select(this).style("cursor", "default").attr("filter", "url(#no-filter)") })
        .transition()
        .ease(d3.easeElastic)
        .delay(1000)
        .duration(2000)
        .attr("filter", "url(#glow)") 
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return d3.schemeCategory10[i % 10]; })
        .style("fill-opacity",1)
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
  }
};


//Callback from Map
    
var drawCloud = function(selectedPlace,selectedDateStart){
    d3.select("#cloud").selectAll("*").remove();
//    console.log(selectedPlace.split(" "));
    if(selectedPlace.split(" ").length>1){
        var selectedCloud = selectedPlace.split(" ")[0] + "_" + selectedPlace.split(" ")[1]+"_" + selectedDateStart;
    }
    else{
        var selectedCloud = selectedPlace +"_" + selectedDateStart ;
    }
   
console.log(selectedCloud);
//    console.log(window[selectedCloud]);
//    for(o in window){
//        console.log(window);
//    }
//    
//let myVar = selectedCloud;
//let nameObject = {selectedCloud};
//let getVarNameFromObject = (nameObject) => {
//  for(let varName in nameObject) {
//    return varName;
//  }
//}
//let varName = getVarNameFromObject(nameObject);
//console.log(varName);

var TARGET_ELEMENT_ID = '#cloud';  

var data = d3.entries(window[selectedCloud]);
    

    var cloudDimensions = document.querySelector ('#cloud').getBoundingClientRect();
var cloudWidth = document.documentElement.clientWidth/4;
var cloudHeight = document.documentElement.clientHeight/2;

  var h = ((Math.ceil(cloudWidth / 100.0) -1) * 100);
  var w = ((Math.ceil(cloudHeight / 100.0) -1) * 100);

  var random = d3.randomIrwinHall(2);
  var countMax = d3.max(data, function(d){ return d.value} );
    console.log(countMax);
  var sizeScale = d3.scaleLinear().domain([0, countMax]).range([15, 65])

  var words = data.map(function(d) {
    return {
    text: d.key,
    size: sizeScale(d.value)
    };
  });

  d3.layout.cloud().size([h, w])
    .words(words)
    .rotate(function() { return Math.round(1-random()) *90; }) 
//    .rotate(function() { return (~~(Math.random() * 6) - 3) * 30; })
    .font("Impact")
    .fontSize(function(d) { return d.size; })
    .on("end", draw) 
    .start();


  // wordcloud 描画
  function draw(words) {
    d3.select(TARGET_ELEMENT_ID)
      .append("svg")
        .attr("class", "ui fluid image")
//        .attr("transform", "translate(" + w / 10 + "," + h / 5 + ")")
        .attr("preserveAspectRatio", "xMinYMin meet")
//        .attr("viewBox", "0 0 300 300")
        .attr("viewBox", "0 0 " + w + " " + h ) 
        .attr("width", w)    
        .attr("height", h)  
      .append("g")
        .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text") .on("mouseover",function(d){ d3.select(this).style("cursor", "pointer").attr("filter", "url(#glow-bar)") }) .on("mouseout",function(d){ d3.select(this).style("cursor", "default").attr("filter", "url(#no-filter)") })
        .transition()
        .ease(d3.easeElastic)
        .delay(1000)
        .duration(2000)
        .attr("filter", "url(#glow)") 
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return d3.schemeCategory10[i % 10]; })
        .style("fill-opacity",1)
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
  }
};

