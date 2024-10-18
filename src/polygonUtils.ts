// polygonUtils.ts

import { Point } from './bpoly';

// Calculate the center of a bounding polygon
export const calculatePolygonCenter = (polygon: Point[], imageWidth: number, imageHeight: number): Point => {
  const total = polygon.reduce(
    (acc, vertex) => ({
      x: acc.x + vertex.x * imageWidth, // Convert normalized to actual image dimensions
      y: acc.y + vertex.y * imageHeight, // Convert normalized to actual image dimensions
    }),
    { x: 0, y: 0 }
  );
  return {
    x: total.x / polygon.length,
    y: total.y / polygon.length,
  };
};
export {};