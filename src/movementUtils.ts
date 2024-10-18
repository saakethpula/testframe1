// movementUtils.ts

import { Point } from './bpoly';

// Determine movement direction to center the object
export const getMovementDirection = (objectCenter: Point, imageCenter: Point): string => {
  let direction = '';

  // Allow some tolerance (20 pixels) before giving movement instructions
  if (objectCenter.x < imageCenter.x - 20) {
    direction += 'Move right ';
  } else if (objectCenter.x > imageCenter.x + 20) {
    direction += 'Move left ';
  }

  if (objectCenter.y < imageCenter.y - 20) {
    direction += 'Move down ';
  } else if (objectCenter.y > imageCenter.y + 20) {
    direction += 'Move up ';
  }

  return direction || 'Object is centered';
};
export {};