import * as request from 'superagent';
import {parseString} from 'xml2js';
import {map, reduce, keys} from 'lodash';

const URL = 'http://resultsservice.lottery.ie/resultsservice.asmx';

const getProjectedJackpot = (drawType, cb) => {

  let responseObject = {error: true};

  try {
    if(typeof drawType !== 'string') {
      responseObject.message = 'DrawType must be of type string.'
      return cb(responseObject)
    }

    request
      .get(URL + '/GetProjectedJackpot')
      .query({drawType})
      .end((err, res) => {
        if(err || !res.ok) {
          responseObject.message = res.text;
          return cb(responseObject);
        } else {
          parseString(res.text, (err, result) => {
            if(err) {
              responseObject.message = 'Error parsing XML.';
              return cb(responseObject);
            } else {
              let obj = {};
              obj.amount = result.ProjectedJackpot.Amount.toString();
              obj.drawDate = result.ProjectedJackpot.DrawDate.toString();
              obj.guaranteed = result.ProjectedJackpot.Guaranteed.toString();

              responseObject.error = false;
              responseObject.response = obj;

              return cb(responseObject);
            }


          })
        }
      });

  } catch (e) {
    responseObject.message = e;
    return cb(responseObject);
  }
}

const getResults = (drawType, lastNumberOfDraws, cb) => {

  let responseObject = {error: true};

  try {
    if(typeof drawType !== 'string') {
      responseObject.message = 'DrawType must be of type string.'
      return cb(responseObject)
    }
    if(typeof lastNumberOfDraws !== 'number') {
      responseObject.message = 'LastNumberOfDraws must be of type number.'
      return cb(responseObject)
    }

    request
      .get(URL + '/GetResults')
      .query({ drawType, lastNumberOfDraws })
      .end((err, res) => {
        if(err || !res.ok) {
          responseObject.message = res.text;
          return cb(responseObject);
        } else {
          parseString(res.text, (err, result) => {
            if(err) {
              responseObject.message = 'Error parsing XML.'
              return cb(responseObject);
            }
            let results = result.ArrayOfDrawResult.DrawResult;

            function recurse(arr) {
              let res = map(arr, (item) => {
                return reduce(keys(item), (acc, key) => {
                  if(key.toString() === 'Structure' || key.toString() ===
                  'Numbers' || key.toString() === 'Tier' || key.toString() ===
                  'EuroMillionsRaffleResults' || key.toString() ===
                  'RaffleResults' || (key.toString() ===
                  'DrawNumber' && item[key].length > 1 )) {
                    acc[key.toString().charAt(0).toLowerCase() + key.slice(1)] =
                    recurse(item[key]);
                  } else {
                    acc[key.toString().charAt(0).toLowerCase() + key.slice(1)] =
                    item[key].toString();
                  }
                  return acc;
                }, {})
              })
              return res;
            }

            let responseResults = recurse(results);

            if(responseResults[0] == null) {
              responseObject.message = 'No data from remote.';
            } else {
              responseObject.error = false;
              responseObject.response = responseResults;
            }

            return cb(responseObject);
          });
        }
      })

  } catch (e) {
    responseObject.message = e;
    return cb(responseObject);
  }

}

const getResultsForDate = (drawType, drawDate, cb) => {

  let responseObject = {error: true};

  try {
    if(typeof drawType !== 'string') {
      responseObject.message = 'DrawType must be of type string.'
      return cb(responseObject)
    }
    if(typeof drawDate !== 'string') {
      responseObject.message = 'DrawDate must be of type string.'
      return cb(responseObject)
    }

    request
      .get(URL + '/GetResultsForDate')
      .query({ drawType, drawDate })
      .end((err, res) => {
        if(err || !res.ok) {
          responseObject.message = res.text;
          return cb(responseObject);
        } else {
          parseString(res.text, (err, result) => {
            if(err) {
              responseObject.message = 'Error parsing XML.'
              return cb(responseObject);
            }
            let results = result.ArrayOfDrawResult.DrawResult;
            function recurse(arr) {
              var res = map(arr, (item) => {
                return reduce(keys(item), (acc, key) => {
                  if(key.toString() === 'Structure' || key.toString() ===
                  'Numbers' || key.toString() === 'Tier' || key.toString() ===
                  'EuroMillionsRaffleResults' || key.toString() ===
                  'RaffleResults' || (key.toString() ===
                  'DrawNumber' && item[key].length > 1 )) {
                    acc[key.toString().charAt(0).toLowerCase() + key.slice(1)] =
                    recurse(item[key]);
                  } else {
                    acc[key.toString().charAt(0).toLowerCase() + key.slice(1)] =
                    item[key].toString();
                  }
                  return acc;
                }, {})
              })
              return res;
            }

            let responseResults = recurse(results);

            if(responseResults[0] == null) {
              responseObject.message = 'No data from remote.'
            } else {
              responseObject.error = false;
              responseObject.response = responseResults;
            }

            return cb(responseObject);
          });
        }
      })
  } catch (e) {
    responseObject.message = e;
    return cb(responseObject);
  }

}


module.exports = {
  getProjectedJackpot,
  getResults,
  getResultsForDate
}
