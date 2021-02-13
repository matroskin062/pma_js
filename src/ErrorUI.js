import loupe from './assets/loupe.png';

class ErrorMessage {
  render(message) {
    const div = document.createElement('div');
    div.classList.add('error');

    const img = document.createElement('img');
    img.src = loupe;

    const innerDiv = document.createElement('div');
    const h1 = document.createElement('h1');
    h1.textContent = 'Not Found';

    const h3 = document.createElement('h3');
    h3.textContent = message || 'Sorry, we couldn’t find any info';

    innerDiv.append(h1, h3);
    div.append(img, innerDiv);

    return div;
  }
}

export default new ErrorMessage();
