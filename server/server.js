'use strict';
const express = require('express');
const http = require('http');
const io = require('socket.io');
const cors = require('cors');
const moment = require('moment');

const FETCH_INTERVAL = 5000;
const PORT = process.env.PORT || 4000;

const tickers = [
  'AAPL', // Apple
  'GOOGL', // Alphabet
  'MSFT', // Microsoft
  'AMZN', // Amazon
  'FB', // Facebook
  'TSLA', // Tesla
];

const intervals = {
  yday: {
    min: moment()
      .local()
      .subtract(1, 'day')
      .set('hour', 9)
      .set('minute', 30)
      .set('second', 0)
      .valueOf(),
    max: moment()
      .local()
      .subtract(1, 'day')
      .set('hour', 16)
      .set('minute', 0)
      .set('second', 0)
      .valueOf(),
    step: 300000,
  },
};

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return +random.toFixed(precision);
}

function toUtcDate(initDate) {
  const date = new Date(initDate);
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
}

function getQuote(ticker, date) {
  return {
    ticker,
    price: randomValue(100, 300, 2),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    date: toUtcDate(date).getTime(),
  };
}

function getQuotes(socket) {
  const quotes = tickers.map((ticker) => ({
    ticker,
    exchange: 'NASDAQ',
    price: randomValue(100, 300, 2),
    // change: randomValue(0, 200, 2),
    // change_percent: randomValue(0, 1, 2),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_trade_time: toUtcDate(),
  }));

  socket.emit('ticker', quotes);
}

function trackTickers(socket) {
  // run the first time immediately
  getQuotes(socket);

  // every N seconds
  const timer = setInterval(function () {
    getQuotes(socket);
  }, FETCH_INTERVAL);

  socket.on('disconnect', function () {
    clearInterval(timer);
  });
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: '*',
  },
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/ticker', function (req, res) {
  try {
    const { ticker, interval = 'yday' } = req.query;
    if (ticker) {
      const { min, max, step } = intervals[interval];
      const tickerValues = [];
      for (let time = min; time <= max; time += step) {
        tickerValues.push(getQuote(ticker, time));
      }
      res.status(200).json(tickerValues);
    } else {
      res.status(401).send('Wrong params');
    }
  } catch (error) {
    res.status(401).send('Something went wrong');
  }
});

socketServer.on('connection', (socket) => {
  socket.on('start', () => {
    trackTickers(socket);
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
