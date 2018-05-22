$(document).ready(function () {
  var timeData = [];
  var temperatureData = [];
  var actualData = [];
  var nosensorData = [];

  var timeData1 = [];
  var temperatureData1 = [];
  var actualData1 = [];
  var nosensorData1 = [];
  var cost;

  var counter = 1;
  var counter1 = 1;

  var dictionary = {
    storage: {},
    get: function (a, b){
        if (a > b) {
            let x = b;
            b = a;
            a = x;
        }
        return this.storage[a][b];
    },
    put: function (a, b, value){
        if (a > b){
            let x = b;
            b = a;
            a = x;
        }
        if (typeof this.storage[a] !== "object")
            this.storage[a] = {};
        this.storage[a][b] = value;
    }
}

dictionary.put("2.5","21",0.16/4);
dictionary.put("2.5","22",0.14/4);
dictionary.put("2.5","23",0.13/4);
dictionary.put("2.5","24",0.12/4);
dictionary.put("2.5","25",0.11/4);
dictionary.put("2.5","26",0.10/4);

dictionary.put("3.5","21",0.26/4);
dictionary.put("3.5","22",0.24/4);
dictionary.put("3.5","23",0.21/4);
dictionary.put("3.5","24",0.19/4);
dictionary.put("3.5","25",0.18/4);
dictionary.put("3.5","26",0.17/4);

dictionary.put("4.3","21",0.40/4);
dictionary.put("4.3","22",0.37/4);
dictionary.put("4.3","23",0.33/4);
dictionary.put("4.3","24",0.30/4);
dictionary.put("4.3","25",0.25/4);
dictionary.put("4.3","26",0.22/4);

dictionary.put("8","21",0.66/4);
dictionary.put("8","22",0.61/4);
dictionary.put("8","23",0.53/4);
dictionary.put("8","24",0.49/4);
dictionary.put("8","25",0.46/4);
dictionary.put("8","26",0.43/4);

dictionary.put("10","21",0.87/4);
dictionary.put("10","22",0.80/4);
dictionary.put("10","23",0.70/4);
dictionary.put("10","24",0.65/4);
dictionary.put("10","25",0.52/4);
dictionary.put("10","25",0.52/4);


  var data = {
    labels: timeData,
    datasets: [
      {
        fill: false,
        label: 'Temperature',
        yAxisID: 'Temperature',
        borderColor: "rgba(255, 204, 0, 1)",
        pointBoarderColor: "rgba(255, 204, 0, 1)",
        backgroundColor: "rgba(255, 204, 0, 0.4)",
        pointHoverBackgroundColor: "rgba(255, 204, 0, 1)",
        pointHoverBorderColor: "rgba(255, 204, 0, 1)",
        data: temperatureData
      },
      {
        fill: false,
        label: 'actual',
        yAxisID: 'Temperature',
        borderColor: "rgba(24, 120, 240, 1)",
        pointBoarderColor: "rgba(24, 120, 240, 1)",
        backgroundColor: "rgba(24, 120, 240, 0.4)",
        pointHoverBackgroundColor: "rgba(24, 120, 240, 1)",
        pointHoverBorderColor: "rgba(24, 120, 240, 1)",
        data: actualData
      },
      {
        fill: false,
        label: 'noSensor',
        yAxisID: 'Temperature',
        borderColor: "rgba(124, 252, 0, 1)",
        pointBoarderColor: "rgba(124, 252, 0, 1)",
        backgroundColor: "rgba(124, 252, 0, 0.4)",
        pointHoverBackgroundColor: "rgba(124, 252, 0, 1)",
        pointHoverBorderColor: "rgba(124, 252, 0, 1)",
        data: nosensorData
      }
    ]
  }

  var data1 = {
    labels: timeData1,
    datasets: [
      {
        fill: false,
        label: 'Temperature',
        yAxisID: 'Temperature',
        borderColor: "rgba(255, 204, 0, 1)",
        pointBoarderColor: "rgba(255, 204, 0, 1)",
        backgroundColor: "rgba(255, 204, 0, 0.4)",
        pointHoverBackgroundColor: "rgba(255, 204, 0, 1)",
        pointHoverBorderColor: "rgba(255, 204, 0, 1)",
        data: temperatureData1
      },
      {
        fill: false,
        label: 'actual',
        yAxisID: 'Temperature',
        borderColor: "rgba(24, 120, 240, 1)",
        pointBoarderColor: "rgba(24, 120, 240, 1)",
        backgroundColor: "rgba(24, 120, 240, 0.4)",
        pointHoverBackgroundColor: "rgba(24, 120, 240, 1)",
        pointHoverBorderColor: "rgba(24, 120, 240, 1)",
        data: actualData1
      },
      {
        fill: false,
        label: 'noSensor',
        yAxisID: 'Temperature',
        borderColor: "rgba(124, 252, 0, 1)",
        pointBoarderColor: "rgba(124, 252, 0, 1)",
        backgroundColor: "rgba(124, 252, 0, 0.4)",
        pointHoverBackgroundColor: "rgba(124, 252, 0, 1)",
        pointHoverBorderColor: "rgba(124, 252, 0, 1)",
        data: nosensorData1
      }
    ]
  }

var basicOption = {
    title: {
      display: true,
      text: 'Our IoT solution in a cooled room',
      fontSize: 36
    },
    scales: {
      yAxes: [{
        id: 'Temperature',
        type: 'linear',
        scaleLabel: {
          labelString: 'Temperature(C)',
          display: true
        },
        position: 'left',
        }]
    }
  }

var basicOption1 = {
    title: {
      display: true,
      text: 'Our IoT solution in a heated room',
      fontSize: 36
    },
    scales: {
      yAxes: [{
        id: 'Temperature',
        type: 'linear',
        scaleLabel: {
          labelString: 'Temperature(C)',
          display: true
        },
        position: 'left',
        }]
    }
  }


  function getCost(roomSize, temperature, type){
    switch(roomSize){
      case 9:
        coolingCapacity = 2.5;
        heatingCapacity = 3.5;
        break;
      case 25:
        coolingCapacity = 3.5;
        heatingCapacity = 4.3;
        break;
      case 55:
        coolingCapacity = 8;
        heatingCapacity = 10;
        break;  
    }

    if(type === "COOLING"){
      if (dictionary.get(coolingCapacity,Math.round(temperature) === "undefined")){
        cost = 0;
      } else {
        cost = cost+dictionary.get(coolingCapacity,Math.round(temperature));
    }

    if(type === "HEATING"){
     if (dictionary.get(coolingCapacity,Math.round(temperature) === "undefined")){
        cost = 0;
      } else {
        cost = cost+dictionary.get(coolingCapacity,Math.round(temperature));
    } 

    return cost;
  }


  //Get the context of the canvas element we want to select
  var ctx = document.getElementById("myChart");
  var ctx1 = document.getElementById("myChart1");
  var optionsNoAnimation = { animation: false }
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: basicOption
  });
  var myLineChart1 = new Chart(ctx1, {
    type: 'line',
    data: data1,
    options: basicOption1
  });

  var ws = new WebSocket('wss://' + location.host);
  ws.onopen = function () {
    console.log('Successfully connect WebSocket');
  }
  ws.onmessage = function (message) {
    console.log('receive message' + message.data);
    try {
      var obj = JSON.parse(message.data);
      if(!obj.time || !obj.OTtemperature) {
        return;
      }
      // only keep no more than 50 points in the line chart
      const maxLen = 50000;
      
      if(obj.deviceid === 'room_cooled'){
          counter = counter+1;
          timeData.push(counter*0.25);
          temperatureData.push(obj.OTtemperature);
          var len = timeData.length;
          if (len > maxLen) {
            timeData.shift();
            temperatureData.shift();
            actualData.shift();
            nosensorData.shift();
          }
          if (obj.actual) {
            actualData.push(obj.actual);
          }
          if (actualData.length > maxLen) {
            actualData.shift();
          }
          if (obj.noSensor) {
            nosensorData.push(obj.noSensor);
          }
          if (nosensorData.length > maxLen) {
            nosensorData.shift();
          }        

          myLineChart.update();
          document.getElementById("coolingActualCost").innerHTML = " $"+getCost(obj.roomsize, obj.actual, "COOLING");
          document.getElementById("coolingNoSensorCost").innerHTML = " $"+getCost(obj.roomsize, obj.actual, "COOLING");  

          console.log('Costing'+getCost(obj.roomsize, obj.actual, "COOLING"));
      } else if(obj.deviceid === 'room_heated') {
          counter1 = counter1+1;
          timeData1.push(counter*0.25);
          temperatureData1.push(obj.OTtemperature);
          var len = timeData1.length;
          if (len > maxLen) {
            timeData1.shift();
            temperatureData1.shift();
            actualData1.shift();
            nosensorData1.shift();
          }

          if (obj.actual) {
            actualData1.push(obj.actual);
          }
          if (actualData1.length > maxLen) {
            actualData1.shift();
          }
          if (obj.noSensor) {
            nosensorData1.push(obj.noSensor);
          }
          if (nosensorData1.length > maxLen) {
            nosensorData1.shift();
          }     
          myLineChart1.update();
          document.getElementById("heatingActualCost").innerHTML = " $"+getCost(obj.roomsize, obj.actual,"COOLING");
          document.getElementById("heatingNoSensorCost").innerHTML = " $"+getCost(obj.roomsize, obj.noSensor,"COOLING");           
      }
    } catch (err) {
      console.error(err);
    }
  }
};
