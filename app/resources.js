'use strict';

module.exports = [
    {
      id: 0,
      name: 'Iron',
      price: 3.02,
      level: 1
    },
    {
      id: 1,
      name: 'Wood',
      price: 0.67,
      level: 1
    },
    {
      id: 2,
      name: 'Plastic',
      price: 1.52,
      level: 1
    },
    {
      id: 3,
      name: 'Glass',
      price: 2.38,
      level: 1
    },
    {
      id: 4,
      name: 'Hammer',
      level: 2,
      recipe: [[0, 1], [1, 1]]
    },
    {
      id: 5,
      name: 'Axe',
      level: 2,
      recipe: [[0, 2], [1, 2]]
    },
    {
      id: 6,
      name: 'Magnifier',
      level: 2,
      recipe: [[3, 2], [2, 1]]
    },
    {
      id: 7,
      name: 'Door',
      level: 2,
      recipe: [[1, 5]]
    }
  ];