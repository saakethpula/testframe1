// bpoly.ts
export interface Point {
    x: number;
    y: number;
  }
  
  // Function to calculate the area of a polygon using the Shoelace formula
  export function calculatePolygonArea(polygon: Point[]): number {
    const numPoints = polygon.length;
    let area = 0;
  
    for (let i = 0; i < numPoints; i++) {
      const nextIndex = (i + 1) % numPoints;
      area += polygon[i].x * polygon[nextIndex].y - polygon[nextIndex].x * polygon[i].y;
    }
  
    return Math.abs(area) / 2;
  }
  
  // Function to clip a polygon using the Sutherland-Hodgman algorithm
  export function sutherlandHodgmanClip(subjectPolygon: Point[], clipPolygon: Point[]): Point[] {
    let outputList = subjectPolygon;
  
    for (let i = 0; i < clipPolygon.length; i++) {
      const currentClipPoint = clipPolygon[i];
      const nextClipPoint = clipPolygon[(i + 1) % clipPolygon.length];
  
      const inputList = outputList;
      outputList = [];
  
      let prevPoint = inputList[inputList.length - 1];
  
      for (const currentPoint of inputList) {
        if (isInside(currentPoint, currentClipPoint, nextClipPoint)) {
          if (!isInside(prevPoint, currentClipPoint, nextClipPoint)) {
            outputList.push(intersection(prevPoint, currentPoint, currentClipPoint, nextClipPoint));
          }
          outputList.push(currentPoint);
        } else if (isInside(prevPoint, currentClipPoint, nextClipPoint)) {
          outputList.push(intersection(prevPoint, currentPoint, currentClipPoint, nextClipPoint));
        }
        prevPoint = currentPoint;
      }
    }
  
    return outputList;
  }
  
  // Helper function: Check if point is inside edge
  export function isInside(point: Point, edgeStart: Point, edgeEnd: Point): boolean {
    return (edgeEnd.x - edgeStart.x) * (point.y - edgeStart.y) > (edgeEnd.y - edgeStart.y) * (point.x - edgeStart.x);
  }
  
  // Helper function: Calculate intersection of two line segments
  export function intersection(p1: Point, p2: Point, p3: Point, p4: Point): Point {
    const x1 = p1.x,
      y1 = p1.y,
      x2 = p2.x,
      y2 = p2.y;
    const x3 = p3.x,
      y3 = p3.y,
      x4 = p4.x,
      y4 = p4.y;
  
    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    const intersectX = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / denom;
    const intersectY = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / denom;
  
    return { x: intersectX, y: intersectY };
  }
  
  // Function to check if a polygon is inside another polygon by a given percentage
  export function isPolygonInsideByPercentage(
    detectedPolygon: Point[],
    centralBox: Point[], // Treat the central box as a polygon
    percentage: number
  ): boolean {
    const detectedArea = calculatePolygonArea(detectedPolygon);
    const intersectionPolygon = sutherlandHodgmanClip(detectedPolygon, centralBox);
    const intersectionArea = calculatePolygonArea(intersectionPolygon);
  
    const overlapPercentage = (intersectionArea / detectedArea) * 100;
    return overlapPercentage >= percentage;
  }
  
  export function isPolygonCovering75PercentOfBox(
    detectedPolygon: Point[],
    centralBox: Point[], // Treat the central box as a polygon
    percentage: number
  ): boolean {
    // Calculate the total area of the central box
    const centralBoxArea = calculatePolygonArea(centralBox);
  
    // Clip the central box to the detected polygon
    const intersectionPolygon = sutherlandHodgmanClip(centralBox, detectedPolygon); // Clip central box by detected polygon
  
    // Calculate the area of the intersection polygon
    const intersectionArea = calculatePolygonArea(intersectionPolygon);
  
    // Calculate the percentage of the central box covered by the detected polygon
    const overlapPercentage = (intersectionArea / centralBoxArea) * 100;
  
    // Return true if at least the desired percentage of the central box is covered
    return overlapPercentage >= percentage;
  }