import { areComponentsEqual } from 'react-hot-loader';

export function isComponentOfType (classType, reactElement) {
  return areComponentsEqual(reactElement.type, classType);
}
