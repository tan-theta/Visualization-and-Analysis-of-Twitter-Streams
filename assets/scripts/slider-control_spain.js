// Step

var sliderDiv_spain = document.getElementById("slider-control_spain");
//console.log(pieDiv.clientHeight);
var sliderWidth_spain = document.documentElement.clientWidth*5/12;
var sliderHeight_spain = document.documentElement.clientHeight*0.4;
console.log(sliderWidth_spain);
//console.log(sliderHeight);
var margin_left = sliderWidth_spain*0.1;
 var data = [14,15,16,17,18,19,20,21,22];
  var sliderStep_spain = d3
    .sliderBottom()
    .min(d3.min(data))
    .max(d3.max(data))
    .width(sliderWidth_spain*0.6)
//    .attr('transform', 'translate(' + "50" + ',' + "50" + ')')
    .tickFormat((function(d, i){
    return d + "th April 2016"}))
    .ticks(8)
    .step(1)
    .default(14)
//    .on('onchange', val => {
//      d3.select('p#value-step').text((val));
//    })
    .on('onchange',function(d){
        
        redraw((sliderStep_spain.value()));
        drawPieSPAIN(sliderStep_spain.value());
        drawCloudSPAIN(sliderStep_spain.value());
        
        console.log(sliderStep_spain.value());
    
    if(sliderStep_spain.value()=="14"){
       drawBar14_spain("SPAIN"); 
    }
    else if(sliderStep_spain.value()=="15"){
        drawBar15_spain("SPAIN");
    }
     else if(sliderStep_spain.value()=="16"){
        drawBar16_spain("SPAIN");
    }
     else if(sliderStep_spain.value()=="17"){
        drawBar17_spain("SPAIN");
    }
     else if(sliderStep_spain.value()=="18"){
        drawBar18_spain("SPAIN");
    }
     else if(sliderStep_spain.value()=="19"){
        drawBar19_spain("SPAIN");
    }
     else if(sliderStep_spain.value()=="20"){
        drawBar20_spain("SPAIN");
    }
     else if(sliderStep_spain.value()=="21"){
        drawBar21_spain("SPAIN");
    }           
    else if(sliderStep_spain.value()=="22"){
        drawBar22_spain("SPAIN");
    }
                              
                              
    })
  ;


d3.select("#slider-step_spain").attr("text-transform","start");

console.log(d3.select("#slider-step_spain"));

  var gStep = d3
    .select('div#slider-step_spain')
    .append('svg')
    .attr('width', sliderWidth_spain*1)
    .attr('height', sliderHeight_spain)
    .append('g')
    .attr('transform', 'translate(' + sliderWidth_spain*.15 + ',' + sliderHeight_spain*0.5 + ')')
  ;

  gStep.call(sliderStep_spain);

  ;