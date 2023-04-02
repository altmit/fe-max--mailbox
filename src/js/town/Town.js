import { makeRandomNumber } from '../utils/utils.js';
import { makeVillage } from './makeVillage.js';

export class Town {
  static nameASCII = 65;
  static mailboxSizeStorage = new Map();
  static SMALLEST_LENGTH = 50;
  static SMALLEST_SPACE = 10;

  constructor(parentWidth, parentHeight) {
    this.name = '';
    this.width = this.makeRandomLength(parentWidth, Town.SMALLEST_LENGTH, Town.SMALLEST_SPACE);
    this.height = this.makeRandomLength(parentHeight, Town.SMALLEST_LENGTH, Town.SMALLEST_SPACE);
    this.pointX = this.makeRandomPoint(parentWidth, Town.SMALLEST_SPACE, this.width);
    this.pointY = this.makeRandomPoint(parentHeight, Town.SMALLEST_SPACE, this.height);
    this.children = [];
    this.hasMailbox = Math.random() < 0.4;
    this.mailboxSize = 0;
  }

  setTown() {
    this.name = String.fromCharCode(Town.nameASCII++);
    this.makeChildren(Town.SMALLEST_LENGTH);
    this.setMailboxSize();
  }

  setMailboxSize() {
    const MAX_MAILBOX_SIZE = 100;
    const MIN_MAILBOX_SIZE = 1;

    let randomSize = makeRandomNumber(MIN_MAILBOX_SIZE, MAX_MAILBOX_SIZE);

    while (Town.mailboxSizeStorage.has(randomSize)) {
      randomSize = makeRandomNumber(MIN_MAILBOX_SIZE, MAX_MAILBOX_SIZE);
    }

    Town.mailboxSizeStorage.set(randomSize, this.name);
    this.mailboxSize = randomSize;
  }

  makeChildren(smallestLength) {
    if (this.width / 4 <= smallestLength || this.height / 4 <= smallestLength) {
      return;
    }
    this.children = makeVillage(this.width, this.height);
  }

  makeRandomLength(parentLength, smallestLength, smallestSpace) {
    const maxLength = parentLength / 2;
    const minLength = smallestLength - smallestSpace;

    return makeRandomNumber(minLength, maxLength);
  }

  makeRandomPoint(parentLength, smallestSpace, distance) {
    const maxPoint = parentLength - smallestSpace * 2 - distance;
    const minPoint = smallestSpace;

    return makeRandomNumber(minPoint, maxPoint);
  }
}
