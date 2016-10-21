# irish-lotto

Nodejs module wrapper for the Irish/EuroMillions Lotto.

```js
var lotto = require('irish-lotto')

lotto.getProjectedJackpot('Lotto', function(result) {
  console.log(result);
})
```

## Installation

```bash
$ npm install irish-lotto
```


## Tests
To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## Features
This module returns 3 web service calls from the [resultsservice.lottery.ie](http://resultsservice.lottery.ie/resultsservice.asmx)

```js
// @param string Name of lottery
lotto.getProjectedJackpot('Lotto', function(result) {
  console.log(result, null, 2);
})
```

```js
// @param string Name of lottery
// @param number Number of Results to be returned
lotto.getResults('EuroMillions', 2, function(result) {
  console.log(result, null, 2);
})
```

```js
// @param string Name of lottery
// @param string Draw Date to be returned
lotto.getResultsForDate('Lotto', '2016-10-12',  function(result) {
  console.log(result, null, 2);
})
```


## Sample URLs for service
* http://resultsservice.lottery.ie/resultsservice.asmx
* http://resultsservice.lottery.ie/resultsservice.asmx/GetProjectedJackpot?drawType=Lotto
* http://resultsservice.lottery.ie/resultsservice.asmx/GetResults?drawType=Lotto&lastNumberOfDraws=2
* http://resultsservice.lottery.ie/resultsservice.asmx/GetResultsForDate?drawType=Lotto&drawDate=2016-10-12
