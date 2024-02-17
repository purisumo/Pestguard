$(function() {
  /* ChartJS
   * -------
   * Data and config for chartjs
   */
  "use strict";
  var data = {
    labels: ["ASIA", "AFRICA", "NORTH AMERICA", "SOUTH AMERIC", "EUROPE"],
    datasets: [{
      label: "# of Votes",
      data: [5, 4, 3, 2, 2, 1],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      borderColor: [
        "rgba(255,99,132,1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
      fill: false,
    }, ],
  };
  var multiLineData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
    datasets: [{
        label: "Dataset 1",
        data: [12, 19, 3, 5, 2, 3],
        borderColor: ["#587ce4"],
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Dataset 2",
        data: [5, 23, 7, 12, 42, 23],
        borderColor: ["#ede190"],
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Dataset 3",
        data: [15, 10, 21, 32, 12, 33],
        borderColor: ["#f44252"],
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  var options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function(value, index, values) {
            // Define your custom y-axis labels here
            var labels = [
              "No Existence",
              "Very Light",
              "Light",
              "Moderate",
              "Light Moderate",
              "Heavy",
              "Very Heavy",
            ];
            return labels[value];
          },
        },
      }, ],
    },
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  // Get context with jQuery - using jQuery's .get() method.
  if ($("#barChart").length) {
    var barChartCanvas = $("#barChart").get(0).getContext("2d");
    // This will get the first returned node in the jQuery collection.
    var barChart = new Chart(barChartCanvas, {
      type: "bar",
      data: data,
      options: options,
    });
  }
});