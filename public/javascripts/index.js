$(document).ready(function () {
  var timeData = [];
  var temperatureData = [];
  var actualData = [];
  var nosensorData = [];

  var timeData1 = [];
  var temperatureData1 = [];
  var actualData1 = [];
  var nosensorData1 = [];

  var counter = 1;
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
    data1: data1,
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
      counter = counter+1;
      
      // only keep no more than 50 points in the line chart
      const maxLen = 50000;
      

      if(obj.actual == 'tutorial_room'){
          timeData.push(counter*0.25);
          temperatureData.push(obj.OTtemperature);
          var len = timeData1.length;
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
      } else {
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
      }


      myLineChart.update();
      myLineChart1.update();

    } catch (err) {
      console.error(err);
    }
  }
});
