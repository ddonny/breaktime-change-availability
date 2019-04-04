export const validation = (stringVal) => {
  console.log('stringVal', stringVal)
  let invalidFlag = false, invalidMessage = '';
  /* invalid rules */
  // 1. comma only for decimal separator
  let indexOfCommaSeparator = stringVal.indexOf(',');
  if ((indexOfCommaSeparator !== -1) && ((indexOfCommaSeparator + 3) < stringVal.length)) {
    invalidFlag = true;
    invalidMessage = '(invalid separator)'
  }
  // 2. space exist and character `r` on first index
  let spacePos = stringVal.indexOf(' ');
  if (spacePos > 0 && stringVal.toLowerCase().substr(0,1) !== 'r') {
    invalidFlag = true;
    invalidMessage = '(invalid separator)'
  }
  // 3. Rp not on first index
  if (stringVal.indexOf('Rp') > 0) {
    invalidFlag = true;
    invalidMessage = '(valid character in wrong position)'
  }
  // 4. any value, but no number exist
  if (stringVal.length > 0 && (stringVal.toLowerCase().replace('rp', '')).length === 0) {
    invalidFlag = true;
    invalidMessage = '(missing value)'
  }

  return {
    invalidFlag,
    invalidMessage
  };
}