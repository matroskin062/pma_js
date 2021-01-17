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
    element.draggable = true;
    element.addEventListener('dragstart', dragStart);
    element.addEventListener('dragover', dragOver);
    element.addEventListener('drop', drop);
    element.addEventListener('click', multiSelection);
    element.addEventListener('dragend', dragEnd);
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

function closeCtxMenuOnFile(e) {
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

window.addEventListener('click', () => {
  closeMenus();
  document
    .querySelectorAll('.file')
    .forEach((el) => el.classList.remove('selected'));
});

document.addEventListener('dragstart', () => {
  closeMenus();
});

document.querySelector('[data-delete]').addEventListener('click', deleteFile);
document.querySelector('[data-rename]').addEventListener('click', renameFile);

document.querySelector('[data-create]').addEventListener('click', createFile);

function closeMenus() {
  closeCtxMenuOnFile();
  closeCtxMenuAddFile();
}

function createFile(e) {
  e.stopPropagation();
  const title = prompt('Enter File Title');
  if (title.trim()) {
    if (!files.includes(title)) {
      files.push(title);
      loadFiles();
    } else {
      alert('File with this name already exists!');
    }
  } else {
    alert('Filename cannot be empty');
  }
  closeCtxMenuAddFile();
}

function deleteFile() {
  const selected = document.querySelectorAll('[data-selected]');
  if (selected.length) {
    files = [...selected].filter((el, i) => el.innerText !== files[i]);
    loadFiles();
  } else {
    files = files.filter((el) => el !== currentElem);
    loadFiles();
  }
}

function renameFile() {
  const curElIdx = files.findIndex((el) => el === currentElem);
  const newTitle = prompt('Enter new title');
  if (newTitle.trim()) {
    files[curElIdx] = newTitle;
    loadFiles();
  } else {
    alert('Filename cannot be empty');
  }
}

function dragStart(e) {
  currentElem = e.target;
  currentElem.classList.add('selected');
}

function dragEnd() {
  currentElem.classList.remove('selected');
}

function dragOver(e) {
  e.preventDefault();
}

function drop() {
  if (currentElem !== this) {
    const text = this.innerText;
    this.innerText = currentElem.innerText;
    currentElem.innerText = text;
    document.querySelectorAll('.file').forEach((el, i) => {
      files[i] = el.innerText;
    });
  }
}

function multiSelection(e) {
  e.stopPropagation();
  if (e.ctrlKey || e.metaKey) {
    e.target.classList.toggle('selected');
    e.target.dataset.selected = 'true';
  }
}
