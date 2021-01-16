let curEl = null;
const dnd = () => {
  const divs = document.querySelectorAll('.file');
  divs.forEach((el) => {
    el.draggable = true;
    el.addEventListener('dragstart', start, false);
    el.addEventListener('dragover', dragOverHandler);
    // el.addEventListener("dragend", dragEndHandler);
    el.addEventListener('drop', end, false);
  });
};

document.onload = dnd();

function start(e) {
  curEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function dragOverHandler(e) {
  e.preventDefault();

  e.dataTransfer.dropEffect = 'move';

  return false;
}

function dragEndHandler() {
  this.style.opacity = '1';
}

function end(e) {
  if (curEl !== this) {
    curEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
}
