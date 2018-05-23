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

  var data;

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
        // console.log("+++++++++++a is "+a+"b is "+b);
        data = this.storage[a][b];
        return data;
    },
    put: function (a, b, value){
        // if (a > b){
        //     let x = b;
        //     b = a;
        //     a = x;
        // }
        if (typeof this.storage[a] !== "object")
            this.storage[a] = {};
        this.storage[a][b] = value;
        // console.log("++++++saving ["+a+"] and ["+b+"]");
    }
}



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
      cost = dictionary.get(coolingCapacity,Math.round(temperature));
      if (cost == undefined){
        // console.log("here!!!!!")
        cost = 0;
      } 

    } 
    if(type === "HEATING"){
      // console.log("+++++++Temp is "+temperature);
      // switch(Math.round(temperature)){
      //   case 21:
      //     cost = dictionary.get(heatingCapacity,27);
      //     break;
      //   case 22:
      //     cost = dictionary.get(heatingCapacity,26);
      //     break;
      //   case 23:
      //     cost = dictionary.get(heatingCapacity,25);
      //     break;
      //   case 24:
      //     cost = dictionary.get(heatingCapacity,24);
      //     break;
      //   case 25:
      //     cost = dictionary.get(heatingCapacity,23);
      //     break;
      //   case 26:
      //     cost = dictionary.get(heatingCapacity,22);
      //     break;
      //   case 27:
      //     cost = dictionary.get(heatingCapacity,21);
      //     break;          
      }
      cost = dictionary.get(coolingCapacity,Math.round(temperature));
      if (cost == undefined){
         console.log("here!!!!!")
        cost = 0;
      } 
    }  
    console.log("Cost for temp "+Math.round(temperature)+" is "+cost);
    return cost;
  }

  //Get the context of the canvas element we want to select
  var costResultActual =0;
  var costResultNoSensor =0;
  var costResultActual1 =0;
  var costResultNoSensor1 =0;
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

    dictionary.put('2.5','21',0.16/4);
    dictionary.put('2.5','22',0.14/4);
    dictionary.put('2.5','23',0.13/4);
    dictionary.put('2.5','24',0.12/4);
    dictionary.put('2.5','25',0.11/4);
    dictionary.put('2.5','26',0.10/4);
    dictionary.put('2.5','27',0.09/4);

    dictionary.put('3.5','21',0.26/4);
    dictionary.put('3.5','22',0.24/4);
    dictionary.put('3.5','23',0.21/4);
    dictionary.put('3.5','24',0.19/4);
    dictionary.put('3.5','25',0.18/4);
    dictionary.put('3.5','26',0.17/4);
    dictionary.put('3.5','27',0.15/4);

    dictionary.put('4.3','21',0.40/4);
    dictionary.put('4.3','22',0.37/4);
    dictionary.put('4.3','23',0.33/4);
    dictionary.put('4.3','24',0.30/4);
    dictionary.put('4.3','25',0.25/4);
    dictionary.put('4.3','26',0.22/4);
    dictionary.put('4.3','27',0.19/4);

    dictionary.put('8','21',0.66/4);
    dictionary.put('8','22',0.61/4);
    dictionary.put('8','23',0.53/4);
    dictionary.put('8','24',0.49/4);
    dictionary.put('8','25',0.46/4);
    dictionary.put('8','26',0.43/4);
    dictionary.put('8','27',0.40/4);

    dictionary.put('10','21',0.87/4);
    dictionary.put('10','22',0.80/4);
    dictionary.put('10','23',0.70/4);
    dictionary.put('10','24',0.65/4);
    dictionary.put('10','25',0.52/4);
    dictionary.put('10','26',0.47/4);
    dictionary.put('10','27',0.40/4);

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
          if ((obj.actual == obj.noSensor) && (obj.noSensor == obj.OTtemperature) && (obj.actual == obj.OTtemperature)){
            costResultActual = costResultActual;
            costResultNoSensor = costResultNoSensor;

            // console.log("acutal Equal "+costResultActual+" noSensor Equal"+costResultNoSensor);


            document.getElementById("coolingActualCost").innerHTML = " $"+costResultActual.toFixed(2);
            document.getElementById("coolingNoSensorCost").innerHTML = " $"+costResultNoSensor.toFixed(2); 
            document.getElementById("coolingMoneySaved").innerHTML = " $"+(costResultNoSensor.toFixed(2)-costResultActual.toFixed(2)).toFixed(2); 
          } else {
            costResultActual = costResultActual+getCost(obj.roomsize, obj.actual, "COOLING");
            costResultNoSensor = costResultNoSensor+getCost(obj.roomsize, obj.noSensor, "COOLING");
             document.getElementById("coolingActualCost").innerHTML = " $"+costResultActual.toFixed(2);
             document.getElementById("coolingNoSensorCost").innerHTML = " $"+costResultNoSensor.toFixed(2); 
             document.getElementById("coolingMoneySaved").innerHTML = " $"+(costResultNoSensor.toFixed(2)-costResultActual.toFixed(2)).toFixed(2); 

          }
         // console.log("acutal "+costResultActual+" noSensor "+costResultNoSensor);

          // console.log('Costing'+getCost(obj.roomsize, obj.actual, "COOLING"));
      } else if(obj.deviceid === 'room_heated') {
          counter1 = counter1+1;
          timeData1.push(counter1*0.25);
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
           if ((obj.actual == obj.noSensor) && (obj.noSensor == obj.OTtemperature) && (obj.actual == obj.OTtemperature)){
            costResultActual1 = costResultActual1;
            costResultNoSensor1 = costResultNoSensor1;

             console.log("acutal Equal "+costResultActual1+" noSensor Equal"+costResultNoSensor1);


            document.getElementById("heatingActualCost").innerHTML = " $"+costResultActual1.toFixed(2);
            document.getElementById("heatingNoSensorCost").innerHTML = " $"+costResultNoSensor1.toFixed(2); 
            document.getElementById("heatingMoneySaved").innerHTML = " $"+(costResultNoSensor1.toFixed(2)-costResultActual1.toFixed(2)).toFixed(2); 
          } else {
            costResultActual1 = costResultActual1+getCost(obj.roomsize, obj.actual, "HEATING");
            costResultNoSensor1 = costResultNoSensor1+getCost(obj.roomsize, obj.noSensor, "HEATING");
             document.getElementById("heatingActualCost").innerHTML = " $"+costResultActual1.toFixed(2);
             document.getElementById("heatingNoSensorCost").innerHTML = " $"+costResultNoSensor1.toFixed(2); 
             document.getElementById("heatingMoneySaved").innerHTML = " $"+(costResultNoSensor1.toFixed(2)-costResultActual1.toFixed(2)).toFixed(2); 
             console.log("Actural Temp is "+obj.actual+" acutal "+getCost(obj.roomsize, obj.actual, "HEATING")+" noSensor "+getCost(obj.roomsize, obj.noSensor, "HEATING"));   
          }
                 
      }
    } catch (err) {
      console.error(err);
    }
  }
});
