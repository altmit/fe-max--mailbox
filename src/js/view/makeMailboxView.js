import { domAPI } from '../utils/domAPI.js';

export const makeMailboxView = async (mailboxTownNodes, unSortedTownInfo, sortedTownInfo) => {
  makeInfoView(unSortedTownInfo, sortedTownInfo);
  await waitSeconds(2);
  mailboxTownNodes.forEach(addMailboxTownClass);
};

const addMailboxTownClass = (town) => town.classList.add('mailboxTown');

const waitSeconds = (seconds) => {
  return new Promise((resolve, reject) => {
    if (!seconds || seconds < 0) {
      reject(new Error('seconds는 0보다 큰 숫자만 입력해주세요.'));
    }
    setTimeout(resolve, seconds * 1000);
  });
};

const makeInfoView = (unSortedTownInfo, sortedTownInfo) => {
  const mailboxInfo = domAPI.querySelector('.mailbox-info');
  const unSortedTownTemplate = unSortedView(unSortedTownInfo);
  const sortedTownTemplate = sortedView(sortedTownInfo);

  mailboxInfo.innerHTML = unSortedTownTemplate + sortedTownTemplate;
};

const unSortedView = (unSortedTownInfo) => {
  const names = unSortedTownInfo.map((item) => item.name);
  const template = `<p>${names.join(', ')}총 ${names.length}개의 마을입니다.</p>`;

  return template;
};

const sortedView = (sortedTownInfo) => {
  const text = sortedTownInfo.map((item) => ` ${item.name} : ${item.mailboxSize}`);
  const template = `<p>우체통의 크기는<br>${text}<br>순입니다.</p>`;

  return template;
};
