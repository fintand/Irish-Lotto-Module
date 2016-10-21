import * as request from 'superagent';
import {parseString} from 'xml2js';
import {forOwn, isArrayLike, map, reduce, keys} from 'lodash';

const URL = 'http://resultsservice.lottery.ie/resultsservice.asmx';

const getProjectedJackpot = () => {

}


const getResults = () => {

}

const getResultsForDate = () => {

}

(function() {
  'use strict';
  request
    .get(URL + '/GetResults')
    .query({ drawType: 'Lotto', lastNumberOfDraws: 2 })
    .end((err, res) => {
      if(err || !res.ok) {
        console.log('uh oh');
      } else {
        parseString(res.text, function (err, result) {
          if(err) console.log(err);
          let results = result.ArrayOfDrawResult.DrawResult;

          function recurse(arr) {
            var res = map(arr, (item) => {
              return reduce(keys(item), (acc, key) => {
                if(key.toString() === 'Structure' || key.toString() === 'Numbers' || key.toString() === 'Tier' || (key.toString() === 'DrawNumber' && item[key].length > 1 )) {
                  acc[key.toString().charAt(0).toLowerCase() + key.slice(1)] = recurse(item[key]);
                } else {
                  acc[key.toString().charAt(0).toLowerCase() + key.slice(1)] = item[key].toString();
                }
                return acc;
              }, {})
            })
            return res;
          }
          console.log(JSON.stringify(recurse(results), null, 2));



          // let newResult = [];
          //
          // for (let i = 0; i < results.length; i++) {
          //   let obj = {};
          //   obj.drawName = results[i].DrawName.toString();
          //   obj.drawDate = results[i].DrawDate.toString();
          //   obj.drawNumber = results[i].DrawNumber.toString();
          //   obj.message = results[i].Message.toString();
          //   obj.promoMessage1 = results[i].PromoMessage1.toString();
          //   obj.promoMessage2 = results[i].PromoMessage2.toString();
          //   obj.topPrize = results[i].TopPrize.toString();
          //   obj.nextDrawDate = results[i].NextDrawDate.toString();
          //
          //   let newStructure = [];
          //   for (var j = 0; j < results[i].Structure.length; j++) {
          //     let obj = {};
          //
          //     let newTier = [];
          //     for (var k = 0; k < results[i].Structure[j].Tier.length; k++) {
          //       let obj = {};
          //       obj.winners = results[i].Structure[j].Tier[k].Winners.toString();
          //       obj.match = results[i].Structure[j].Tier[k].Match.toString();
          //       obj.prizeType = results[i].Structure[j].Tier[k].PrizeType.toString();
          //       obj.prize = results[i].Structure[j].Tier[k].Prize.toString();
          //       newTier.push(obj);
          //     }
          //     obj.tier = newTier;
          //     newStructure.push(obj)
          //   }
          //   obj.structure = newStructure;
          //
          //
          //   let newNumbers = [];
          //   for (var j = 0; j < results[i].Numbers.length; j++) {
          //     let obj = {};
          //
          //     let newDrawNumber = [];
          //     for (var k = 0; k < results[i].Numbers[j].DrawNumber.length; k++) {
          //       let obj = {};
          //       obj.number = results[i].Numbers[j].DrawNumber[k].Number.toString();
          //       obj.type = results[i].Numbers[j].DrawNumber[k].Type.toString();
          //
          //       newDrawNumber.push(obj);
          //     }
          //     obj.drawNumber = newDrawNumber;
          //     newNumbers.push(obj)
          //   }
          //   obj.numbers = newNumbers;
          //
          //
          //   newResult.push(obj);
          // }
          //
          // console.log(JSON.stringify(newResult, null, 2));

        });
      }
    })
}());










const getIrishLotto = function () {
  return [1,2,3,4,5,6,7];
}

const getEuroMillions = function() {
  return [4,6,1,7,23,31];
};

module.exports = {
  getIrishLotto,
  getEuroMillions
}
