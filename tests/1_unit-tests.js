const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('Function convertHandler.getNum(input)', function() {

        test('Correctly read a whole number input', function() {
            assert.equal(convertHandler.getNum('32L'), 32);
        });

        test('Correctly read a decimal number input', function() {
            assert.equal(convertHandler.getNum('3.2L'), 3.2);
        });

        test('Correctly read a fractional input', function() {
            assert.equal(convertHandler.getNum('1/2L'), 0.5);
        });

        test('Correctly read a fractional input with a decimal', function() {
            assert.equal(convertHandler.getNum('3.5/2L'), 1.75);
        });

        test('Correctly return an error on a double-fraction', function() {
            assert.isNull(convertHandler.getNum('3/2/3L'));
        });

        test('Correctly default to 1 when no numerical input is provided', function() {
            assert.equal(convertHandler.getNum('L'), 1);
        });
    });

    suite('Function convertHandler.getUnit(input)', function() {

        test('Correctly read each valid input unit', function() {
            const units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
            units.forEach(unit => {
                assert.equal(
                    convertHandler.getUnit(`3.2${unit}`).toLowerCase(),
                    unit === 'l' ? 'l' : unit
                );
            });
        });

        test('Correctly return an error for an invalid input unit', function() {
            assert.isNull(convertHandler.getUnit('3.2invalidUnit'));
        });

        test('Return the correct unit when given valid input with different cases', function() {
            assert.equal(convertHandler.getUnit('3.2L'), 'L');
            assert.equal(convertHandler.getUnit('3.2l'), 'L');
        });
    });

    suite('Function convertHandler.getReturnUnit(initUnit)', function() {

        test('Return the correct return unit for each valid input unit', function() {
            const unitsMap = {
                'gal': 'L',
                'L': 'gal',
                'mi': 'km',
                'km': 'mi',
                'lbs': 'kg',
                'kg': 'lbs'
            };

            for (const [input, expected] of Object.entries(unitsMap)) {
                assert.equal(convertHandler.getReturnUnit(input), expected);
            }
        });
    });

    suite('Function convertHandler.spellOutUnit(unit)', function() {

        test('Return the spelled-out string unit for each valid input unit', function() {
            const unitsSpelledOut = {
                'gal': 'gallons',
                'L': 'liters',
                'mi': 'miles',
                'km': 'kilometers',
                'lbs': 'pounds',
                'kg': 'kilograms'
            };

            for (const [input, expected] of Object.entries(unitsSpelledOut)) {
                assert.equal(convertHandler.spellOutUnit(input), expected);
            }
        });
    });

    suite('Function convertHandler.convert(num, unit)', function() {

        test('Correctly convert gal to L', function() {
            assert.approximately(
                convertHandler.convert(1, 'gal'),
                3.78541,
                0.00001
            );
        });

        test('Correctly convert L to gal', function() {
            assert.approximately(
                convertHandler.convert(1, 'L'),
                0.26417,
                0.00001
            );
        });

        test('Correctly convert mi to km', function() {
            assert.approximately(
                convertHandler.convert(1, 'mi'),
                1.60934,
                0.00001
            );
        });

        test('Correctly convert km to mi', function() {
            assert.approximately(
                convertHandler.convert(1, 'km'),
                0.62137,
                0.00001
            );
        });

        test('Correctly convert lbs to kg', function() {
            assert.approximately(
                convertHandler.convert(1, 'lbs'),
                0.45359,
                0.00001
            );
        });

        test('Correctly convert kg to lbs', function() {
            assert.approximately(
                convertHandler.convert(1, 'kg'),
                2.20462,
                0.00001
            );
        });
    });

    suite('Function convertHandler.getString(initNum, initUnit, returnNum, returnUnit)', function() {

        test('Correctly return the formatted string with all parameters', function() {
            const initNum = 3.1;
            const initUnit = 'mi';
            const returnNum = 4.98901;
            const returnUnit = 'km';
            const expected = '3.1 miles converts to 4.98901 kilometers';

            assert.equal(
                convertHandler.getString(initNum, initUnit, returnNum, returnUnit),
                expected
            );
        });
    });
});