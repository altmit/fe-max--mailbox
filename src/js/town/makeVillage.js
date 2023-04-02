import { Town } from './Town.js';

export const makeVillage = (parentWidth, parentHeight) => {
  const village = [];
  const MAX_TOWN_COUNT = 10;
  let trialCount = 0;

  while (village.length < MAX_TOWN_COUNT) {
    const isLastTrial = trialCount === 3;
    if (isLastTrial) {
      return village;
    }

    const town = new Town(parentWidth, parentHeight);
    if (village.length && isOverlapWithPreTowns(village, town)) {
      trialCount++;
      continue;
    }

    town.setTown();
    village.push(town);
  }

  return village;
};

const isOverlapWithPreTowns = (towns, town) => {
  return towns.some((prevTown) => isOverlap(prevTown, town));
};

const isOverlap = (prevTown, currentTown) => {
  return !(
    isLocatedLeft(prevTown, currentTown) ||
    isLocatedRight(prevTown, currentTown) ||
    isLocatedTop(prevTown, currentTown) ||
    isLocatedBottom(prevTown, currentTown)
  );
};

const isLocatedLeft = (prevTown, currentTown) => {
  return prevTown.pointX + prevTown.width < currentTown.pointX;
};

const isLocatedRight = (prevTown, currentTown) => {
  return currentTown.pointX + currentTown.width < prevTown.pointX;
};

const isLocatedTop = (prevTown, currentTown) => {
  return prevTown.pointY + prevTown.height < currentTown.pointY;
};

const isLocatedBottom = (prevTown, currentTown) => {
  return currentTown.pointY + currentTown.height < prevTown.pointY;
};
