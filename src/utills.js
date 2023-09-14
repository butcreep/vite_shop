export function findElement(startingElement, selector) {
  let currentElment = startingElement;
  while (currentElment) {
    if (currentElment.matches(selector)) {
      return currentElment;
    }
    currentElment = currentElment.parentElement;
  }
  return null;
}
