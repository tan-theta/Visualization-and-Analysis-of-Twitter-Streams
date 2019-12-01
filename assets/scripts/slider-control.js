// Step

var sliderDiv = document.getElementById("slider-control");
//console.log(pieDiv.clientHeight);
var sliderWidth = sliderDiv.clientWidth;
var sliderHeight = document.documentElement.clientHeight*0.4;
console.log(sliderWidth);
//console.log(sliderHeight);
var margin_left = sliderWidth*0.1;
 var data = [14,15,16];
  var sliderStep = d3
    .sliderBottom()
    .min(d3.min(data))
    .max(d3.max(data))
    .width(sliderWidth*0.8)
//    .attr('transform', 'translate(' + "50" + ',' + "50" + ')')
    .tickFormat((function(d, i){
    return d + "th April 2016"}))
    .ticks(2)
    .step(1)
    .default(14)
//    .on('onchange', val => {
//      d3.select('p#value-step').text((val));
//    })
    .on('onchange',function(d){
        
        console.log(sliderStep.value());
        redraw(sliderStep.value());
        drawPieUSA(sliderStep.value());
        drawCloudUSA(sliderStep.value());
    
    if(sliderStep.value()=="14"){
       drawBar14("USA"); 
    }
    else if(sliderStep.value()=="15"){
        drawBar15("USA");
//        console.log("15");
    }
    else{
        drawBar16("USA");
    };
                              
                              
    })
  ;

  var gStep = d3
    .select('div#slider-step')
    .append('svg')
    .attr('width', sliderWidth*1.1)
    .attr('height', sliderHeight)
    .append('g')
    .attr('transform', 'translate(' + sliderWidth*.15 + ',' + sliderHeight*0.5 + ')')
  ;

  gStep.call(sliderStep);