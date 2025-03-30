function ConvertHandler() {

  this.getNum = function(input) {
    let result;
    const regex = /[a-zA-Z]/;
    const numStr = input.split(regex)[0];

    if (numStr === '') return 1;

    if ((numStr.match(/\//g) || []).length > 1) {
      return null;
    }

    if (numStr.includes('/')) {
      const [numerator, denominator] = numStr.split('/');
      result = parseFloat(numerator) / parseFloat(denominator);
    } else {
      result = parseFloat(numStr);
    }

    return isNaN(result) ? null : result;
  };

  this.getUnit = function(input) {
    const regex = /[a-zA-Z].*/;
    const unitStr = input.match(regex) ? input.match(regex)[0].toLowerCase() : '';

    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    const unit = unitStr.toLowerCase();

    if (!validUnits.includes(unit)) return null;

    return unit === 'l' ? 'L' : unit;
  };

  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };

    return unitMap[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const unitMap = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };

    return unitMap[unit];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;

    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = null;
    }

    return Math.round(result * 100000) / 100000;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
