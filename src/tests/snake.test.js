import snake from '../factoryFunctions/snake'
let testSnake = snake(10)
describe('allowable spot', () => {
  test('allowable spots return true', () => {
    expect(testSnake.allowableSpot([1, 1])).toBe(true);
  });
  test('not allowable spots return false when out of bounds', () => {
    expect(testSnake.allowableSpot([10, 1])).toBe(false);
  });
  test('not allowable spots return false when on top of snake', () => {
    expect(testSnake.allowableSpot([4, 4])).toBe(false);
  });
});
describe('add direction', () => {
  test('add direction works with positive number in 0 direction index', () => {
    expect(testSnake.addDirection([1, 1])).toStrictEqual([2, 1]);
  });
  test('add direction works with negative number in 0 direction index', () => {
    testSnake.direction = [-1, 0]
    expect(testSnake.addDirection([1, 1])).toStrictEqual([0, 1]);
  });
  test('add direction works with positive number in 1 direction index', () => {
    testSnake.direction = [0, 1]
    expect(testSnake.addDirection([1, 1])).toStrictEqual([1, 2]);
  });
  test('add direction works with negative number in 1 direction index', () => {
    testSnake.direction = [0, -1]
    expect(testSnake.addDirection([1, 1])).toStrictEqual([1, 0]);
  });
});
describe('Take next spot', () => {
  test('take next spot works when spot is open', () => {
    testSnake.direction = [1, 0]
    testSnake.takeNextSpot()
    expect(testSnake.spots).toStrictEqual([[5, 4], [4, 4], [4, 5], [4, 6]]);
  })
  test('take next spot to not add anything when it runs into self', () => {
    testSnake.direction = [-1, 0]
    testSnake.takeNextSpot()
    expect(testSnake.spots).toStrictEqual([[5, 4], [4, 4], [4, 5], [4, 6]]);
  })
  test('continuation of take next spot not add anything when it runs into itself', () => {
    expect(testSnake.dead).toBe(true)
  })
});
describe("move", () => {
  test("moves to next space properly", () => {
    testSnake.dead = false;
    testSnake.direction = [1, 0]
    testSnake.move()
    expect(testSnake.spots).toStrictEqual([[6, 4], [5, 4], [4, 4], [4, 5]]);
  })
})