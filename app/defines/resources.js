'use strict';

module.exports = [
    {
      id: 0,
      name: 'Iron',
      price: 3.02,
      level: 1,
      icon: '/images/materials/iron.png'
    },
    {
      id: 1,
      name: 'Wood',
      price: 0.67,
      level: 1,
      icon: '/images/materials/wood.png'
    },
    {
      id: 2,
      name: 'Plastic',
      price: 1.52,
      level: 1,
      icon: '/images/materials/plastic.png'
    },
    {
      id: 3,
      name: 'Glass',
      price: 2.38,
      level: 1,
      icon: '/images/materials/glass.png'
    },
    {
      id: 4,
      name: 'Hammer',
      level: 2,
      recipe: [[0, 1], [1, 1]],
      icon: '/images/materials/hammer.png'
    },
    {
      id: 5,
      name: 'Hatchet',
      level: 2,
      recipe: [[0, 2], [1, 2]],
      icon: '/images/materials/hatchet.png'
    },
    {
      id: 6,
      name: 'Magnifier',
      level: 2,
      recipe: [[3, 2], [2, 1]],
      icon: '/images/materials/magnifier.png'
    },
    {
      id: 7,
      name: 'Door',
      level: 2,
      recipe: [[1, 5]],
      icon: '/images/materials/door.png'
    }
  ];