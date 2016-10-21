import { expect } from 'chai';
import lotto from '../src/index';

describe('Irish Lotto', () => {

  describe('GetProjectedJackpot', () => {

      it('should return an object and have correct properties', (done) => {
          lotto.getProjectedJackpot('Lotto', (result) => {
            expect(result).to.be.an('object');
            expect(result.response).to.have.property('amount');
            expect(result.response).to.have.property('drawDate');
            expect(result.response).to.have.property('guaranteed');
            done()
          })
      })

      it('should not be an error', (done) => {
        lotto.getProjectedJackpot('Lotto', (result) => {
          expect(result).to.have.property('error', false);
          done()
        })
      })

      it('should be an error', (done) => {
        lotto.getProjectedJackpot('Loto', (result) => {
          expect(result).to.have.property('error', true);
          expect(result).to.have.property('message');
          done()
        })
      })

      it('should be a type error', (done) => {
        lotto.getProjectedJackpot(5, (result) => {
          expect(result).to.have.property('error', true);
          expect(result).to.have.property('message', 'DrawType must be of type string.');
          done()
        })
      })

  });

  describe('GetResults', () => {

    it('should be an object with response array with 2 objects', (done) => {
      lotto.getResults('EuroMillions', 2, (result) => {
        expect(result.response[0]).to.have.property('drawName', 'EuroMillions');
        expect(result).to.have.property('error', false);
        expect(result).to.be.an('object');
        expect(result.response).to.have.lengthOf(2);
        done()
      })
    })

    it('should be a number type error', (done) => {
      lotto.getResults('EuroMillionsPlus', '2', (result) => {
        expect(result).to.have.property('error', true);
        expect(result).to.have.property('message', 'LastNumberOfDraws must be of type number.');
        done()
      })
    })

    it('should be a string type error', (done) => {
      lotto.getResults(null, 1, (result) => {
        expect(result).to.have.property('error', true);
        expect(result).to.have.property('message', 'DrawType must be of type string.');
        done()
      })
    })

  });

  describe('GetResultsForDate', () => {

    it('should be an object with response array with 1 objects', (done) => {
      lotto.getResultsForDate('Lotto', '2016-10-12', (result) => {
        expect(result.response[0]).to.have.property('drawName', 'Lotto');
        expect(result).to.have.property('error', false);
        expect(result).to.be.an('object');
        expect(result.response).to.have.lengthOf(1);
        done()
      })
    })

    it('should be a string type error', (done) => {
      lotto.getResultsForDate(4, '2016-10-12', (result) => {
        expect(result).to.have.property('error', true);
        expect(result).to.have.property('message', 'DrawType must be of type string.');
        done()
      })
    })

    it('should be a string type error', (done) => {
      lotto.getResultsForDate('Lotto', 1, (result) => {
        expect(result).to.have.property('error', true);
        expect(result).to.have.property('message', 'DrawDate must be of type string.');
        done()
      })
    })

  });


});
