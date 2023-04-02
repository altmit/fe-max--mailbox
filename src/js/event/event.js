import { domAPI } from '../utils/domAPI.js';
import { mergeSortMailboxTown } from '../utils/mergeSortMailboxTown.js';
import { makeMailboxView } from '../view/makeMailboxView.js';

export const addMailboxBtnEventListener = () => {
  const buttonNode = domAPI.querySelector('.mailbox-search-button');
  buttonNode.addEventListener('click', searchMailboxTown);
};

const searchMailboxTown = () => {
  const mailboxTownNodes = getMailboxTownNodes();
  const unSortedTownInfo = makeTownInfo(mailboxTownNodes);
  const sortedTownInfo = mergeSortMailboxTown(unSortedTownInfo);

  makeMailboxView(mailboxTownNodes, unSortedTownInfo, sortedTownInfo);
};

const getMailboxTownNodes = () => {
  const mailboxNodes = domAPI.getAllElementsByClassName('mailbox');
  return mailboxNodes.map((mailbox) => mailbox.parentElement);
};

const makeTownInfo = (mailboxTownNodes) => {
  const makeTemplate = (townNode) => {
    return {
      name: townNode.dataset.name,
      mailboxSize: Number(domAPI.querySelector('.mailbox', townNode).dataset.size),
    };
  };
  return mailboxTownNodes.map(makeTemplate);
};
