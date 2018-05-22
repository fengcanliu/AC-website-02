$(document).ready(function () {
  var timeData = [];
  var temperatureData = [];
  var actualData = [];
  var nosensorData = [];
  var temperatureDataH = [];
  var actualDataH = [];
  var nosensorDataH = [];
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
        data: temperatureDataH
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
        data: actualDataH
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
        data: nosensorDataH
      }
    ]
  }
  var basicOption = {
    title: {
      display: true,
      text: 'Temperature & actual Real-time Data',
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
      // }, {
      //     id: 'actual',
      //     type: 'linear',
      //     scaleLabel: {
      //       labelString: 'Actual(C)',
      //       display: true
      //     },
      //     position: 'right'
      //   }]
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
    data: data1,
    options: basicOption
  });

  var ws = new WebSocket('wss://' + location.host);
  ws.onopen = function () {
    console.log('Successfully connect WebSocket');
  }
  ws.onmessage = function (message) {
    console.log('receive message' + message.data);
    try {
      var obj = JSON.parse(message.data);
      var obj1 = JSON.parse(message.data1);
      if(!obj.time || !obj.OTtemperature) {
        return;
      }
      if(!obj1.time || !obj1.OTtemperatureH) {
        return;
      }

      timeData.push(counter*0.25);
      counter = counter+1;
      temperatureData.push(obj.OTtemperature);
      temperatureDataH.push(obj1.OTtemperatureH);
      // only keep no more than 50 points in the line chart
      const maxLen = 50000;
      var len = timeData.length;
      if (len > maxLen) {
        timeData.shift();
        temperatureData.shift();
        actualData.shift();
        nosensorData.shift();
        temperatureDataH.shift();
        actualDataH.shift();
        nosensorDataH.shift();
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

      ///for heating
       if (obj1.actualH) {
        actualDataH.push(obj1.actualH);
      }
      if (actualDataH.length > maxLen) {
        actualDataH.shift();
      }
      if (obj1.noSensorH) {
        nosensorDataH.push(obj1.noSensorH);
      }
      if (nosensorDataH.length > maxLen) {
        nosensorDataH.shift();
      }

      myLineChart.update();
      myLineChart1.update();

    } catch (err) {
      console.error(err);
    }
  }
});
