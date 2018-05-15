$(document).ready(function () {
  var timeData = [];
  var temperatureData = [];
  var actualData = [];
  var nosensorData = [];
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
      }, {
          id: 'actual',
          type: 'linear',
          scaleLabel: {
            labelString: 'Actual(C)',
            display: true
          },
          position: 'right'
        }]
    }
  }

  //Get the context of the canvas element we want to select
  var ctx = document.getElementById("myChart");
  var optionsNoAnimation = { animation: false }
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
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
      if(!obj.time || !obj.temperature) {
        return;
      }
      timeData.push(obj.time);
      temperatureData.push(obj.temperature);
      // only keep no more than 50 points in the line chart
      const maxLen = 50000;
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
    } catch (err) {
      console.error(err);
    }
  }
});
