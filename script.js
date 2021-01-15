let files = ['MF DOOM - Doomsday.mp3', 'Depeche Mode - Personal Jesus.flac'];

const loadFiles = () => {
  const container = document.querySelector('.container');
  container.innerHTML = '';
  files.map((el) => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('file');
    newDiv.innerText = el;
    container.appendChild(newDiv);
  });

  const fileBlocks = document.querySelectorAll('.file');
  fileBlocks.forEach((element) => {
    element.addEventListener('contextmenu', openCtxMenuOnFile);
  });
};

document.onload = loadFiles();

const onFileMenu = document.querySelector('.file-menu');
const addMenu = document.querySelector('.add-menu');

let currentElem = '';

function openContextMenu(menuType, e) {
  e.preventDefault();
  menuType.classList.add('active');
  menuType.style.top = `${e.clientY}px`;
  menuType.style.left = `${e.clientX}px`;
  currentElem = e.target.innerText;
}

function closeContextMenu(menuType) {
  menuType.classList.remove('active');
}

function openCtxMenuOnFile(e) {
  openContextMenu(onFileMenu, e);
  closeContextMenu(addMenu);
}

function closeCtxMenuOnFile() {
  closeContextMenu(onFileMenu);
}

function openCtxMenuOnDocument(e) {
  if (e.target === document.querySelector('.container')) {
    openContextMenu(addMenu, e);
    closeContextMenu(onFileMenu);
  }
}

function closeCtxMenuAddFile() {
  closeContextMenu(addMenu);
}

document
  .querySelector('.container')
  .addEventListener('contextmenu', openCtxMenuOnDocument);

document.addEventListener('click', () => {
  closeCtxMenuOnFile();
  closeCtxMenuAddFile();
});

document.querySelector('[data-delete]').addEventListener('click', deleteFile);
document.querySelector('[data-rename]').addEventListener('click', renameFile);

document.querySelector('[data-create]').addEventListener('click', createFile);

function createFile(e) {
  e.stopPropagation();
  const title = prompt('Enter File Title');
  if (title.trim()) {
    files.push(title);
    loadFiles();
    closeCtxMenuAddFile();
  }
}

function deleteFile() {
  files = files.filter((el) => el !== currentElem);
  loadFiles();
}

function renameFile() {
  const curElIdx = files.findIndex((el) => el === currentElem);
  const newTitle = prompt('Enter new title');
  files[curElIdx] = newTitle;
  loadFiles();
}
