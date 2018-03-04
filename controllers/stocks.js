const Quandl = require('quandl');
const moment = require('moment');
const Stock = require('../models/stock');

const quandl = new Quandl({
  auth_token: process.env.API_KEY,
  api_version: 3
});

exports.getStock = (req, res, next) => {
  const {
    search
  } = req.query;

  quandl.dataset({
    source: 'WIKI',
    table: search
  }, {
    order: 'desc',
    exclude_column_names: true,
    start_date: moment().subtract(2, 'months').format('YYYY-MM-DD'),
    end_date: moment().format('YYYY-MM-DD'),
    column_index: 4
  }, function (err, response) {
    if (err)
      throw err;
    let stockData = JSON.parse(response);
    let symbol = stockData.dataset.dataset_code;
    let data = stockData.dataset.data;
    const newStock = new Stock({
      symbol,
      data
    });
    newStock.save(err => {
      if (err)
        return next(err)
    });
    setTimeout(function () {
      Stock.find({}, (err, stocks) => {

        if (err)
          return next(err)

        let type = 'line';
        let dbData = {};
        let options = {
          legend: {
            position: 'bottom',
            display: true,
            labels: {
              boxHeight: 2,
              fontColor: 'red'
            }
          },
          tooltips: {
            enabled: true,
            mode: 'nearest'
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false
              }
            }],
            xAxes: [{
              ticks: {
                beginAtZero: false
              },
              type: 'time',
              time: {
                displayFormats: {
                  day: 'MMM D'
                }
              }
            }]
          }
        };
        let allDatasets = [];
        for (var i = 0; i < stocks.length; i++) {
          let hold = [];

          for (var j = 0; j < stocks[i].data.length; j++) {
            let priceOBJ = {
              x: stocks[i].data[j][0],
              y: stocks[i].data[j][1]
            };
            hold.push(priceOBJ);
          }
          let colorPool = ['red', 'blue', 'green', 'black', 'purple', 'y‚ellow'];
          let lineColor = colorPool[Math.floor(Math.random() * 5)];

          let stockData = {
            label: stocks[i].symbol,
            fill: false,
            data: hold,
            borderColor: [
              lineColor
            ],
            borderWidth: 1
          }

          allDatasets.push(stockData);

        }

        dbData.datasets = allDatasets;
        res.render('stocks', {
          type,
          dbData,
          options
        });

      });
    }, 3000)
  });
}

exports.updateUser = (req, res, next) => {

  Stock.find({}, (err, stocks) => {
    if (err)
      return next(err)

    let type = 'line';
    let dbData = {};
    let options = {
      legend: {
        position: 'bottom',
        display: true,
        labels: {
          boxHeight: 2,
          fontColor: 'red'
        }
      },
      tooltips: {
        enabled: true,
        mode: 'nearest'
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }],
        xAxes: [{
          ticks: {
            beginAtZero: false
          },
          type: 'time',
          time: {
            displayFormats: {
              day: 'MMM D'
            }
          }
        }]
      }
    };
    let allDatasets = [];
    for (var i = 0; i < stocks.length; i++) {
      let hold = [];

      for (var j = 0; j < stocks[i].data.length; j++) {
        let priceOBJ = {
          x: stocks[i].data[j][0],
          y: stocks[i].data[j][1]
        };
        hold.push(priceOBJ);
      }
      let colorPool = ['red', 'blue', 'green', 'black', 'purple', 'yellow'];
      let lineColor = colorPool[Math.floor(Math.random() * 5)];

      let stockData = {
        label: stocks[i].symbol,
        fill: false,
        data: hold,
        borderColor: [
          lineColor
        ],
        borderWidth: 1
      }

      allDatasets.push(stockData);

    }

    dbData.datasets = allDatasets;
    res.render('index', {
      type,
      dbData,
      options
    });

  });

}

exports.removeStock = (req, res, next) => {
  const sym = req.params.id;

  Stock.remove({
    symbol: sym
  }, function (err) {
    if (err) {
      return next(err);

    } else {
      res.send(['success']);
    }
  });

}
