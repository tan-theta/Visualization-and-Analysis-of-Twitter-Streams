		var w = window.innerWidth;
			var h = window.innerHeight/2;

			var width = w,
			height = h;

			var pos_num = 0;
			var neut_num = 0;
			var neg_num = 0;

// set projection
var projection = d3.geoMercator();

// create path variable
var path = d3.geoPath()
.projection(projection);


//sentiment color scale	
var color_scale = d3.scaleLinear()
.domain([-1, 0, 1])
.range(["red", "white", "green"]);


// create svg variable
var svg = d3.select("#svgDiv").append("svg")
.attr("width", width)
.attr("height", height);

// Color legend.
var legend = d3.legendColor()
.scale(color_scale)
.title("Tweet Sentiment")
.labels(["Very Negative", "Negative", "Neutral", "Positive", "Very Positive"]);

svg.append("g")
.attr("transform", "translate(1000,300)")
.call(legend);


d3.json("us.json").then(function(topo) {

	//console.log(topo);

	states = topojson.feature(topo, topo.objects.states).features

  	// set projection parameters
  	projection
  	.scale(700)
  	.center([-106, 37.5]);

	// add states from topojson
	svg.selectAll("path")
	.data(states).enter()
	.append("path")
	.attr("class", "feature")
	.style("fill", "rgb(245,245,245)")
	.attr("d", path);

    // put border around states 
    svg.append("path")
    .datum(topojson.mesh(topo, topo.objects.states, function(a, b) { return a !== b; }))
    .attr("class", "mesh")
    .attr("d", path);

    //function to count the tweets
    function tweet_counter(src){

    	d3.csv(src, function(d){

    		if(d['sentiment'] == 0){
    			neut_num++;
    		}
    		else if(d['sentiment'] > 0){
    			pos_num++;
    		}
    		else{
    			neg_num++;
    		}
    	})

    	mydata = [{"label":"Positive Sentiment", "value":pos_num}, 
    	{"label":"Neutral", "value":neut_num}, 
    	{"label":"Negative Sentiment", "value":neg_num}];

    	localStorage.setItem("pie_data",  mydata);
	  // Retrieve
	  console.log("fetched data " + localStorage.getItem("pie_data"));


	}
    // function to draw circles
    function update_circles_us(src){
    	var data_t = []

    	d3.csv(src ,function(d){
    		d['Latitude'] = +d['Latitude']
    		d['Longitude'] = +d['Longitude']
    		d['sentiment'] = +d['sentiment']


    		data_t.push([d['Longitude'], d['Latitude'], d['sentiment']]);


    		svg.selectAll("circle")
    		.data(data_t).enter()
    		.append("circle")
    		.attr("cx", function (d) { return projection(d)[0]; })
    		.attr("cy", function (d) { return projection(d)[1]; })
    		.attr("r", "8px")
    		.attr("fill", function(d){color = color_scale(d[2]); return color; } )
    		.attr("fill-opacity", 0.7)
    	});
    }

    var count = 1;

    tweet_counter("data/extension/clean_us_0.csv");
    update_circles_us("data/extension/clean_us_0.csv");
    pos_num = 0;
    neut_num = 0;
    neg_num = 0;

 	var delayInMilliseconds = 5000; //5 seconds

	var count = 1;                  //  set your counter to 1

	function myLoop () {            //  create a loop function
		setTimeout(function () {   

			svg.selectAll("circle").remove();   

			var src_string = "data/extension/clean_us_"+ count +".csv";

			count++;  

			tweet_counter(src_string);
			update_circles_us(src_string);
			pos_num = 0;
			neut_num = 0;
			neg_num = 0;

		    if (count < 33) {         //  if the counter < number of datasets, call the loop function
		    	myLoop();            //    again which will trigger another 
		    }
		    else{
		    	count = 0;
		    	myLoop();
		    }                        
		}, delayInMilliseconds)
	}

	myLoop();  



}).catch(function(error){

});


