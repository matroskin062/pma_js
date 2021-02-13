import emitter from './EventEmitter';
import User from './User';
import ico from './assets/repo-ico.png';
import { getLangColor } from './utils';
import App from './App';
import ErrorMessage from './ErrorUI';

class ReposUI {
  constructor() {
    this.reposContainer = document.querySelector('.repos');
    this.reposCards = document.querySelector('.repos__cards');
    this.registerListeners();
  }

  renderReposList() {
    this.reposCards.innerHTML = '';

    if (!User.repos.length) {
      this.reposCards.append(this.renderNoData());
      return;
    }

    User.repos.map((repo) => {
      const card = document.createElement('div');
      card.classList.add('repos__card', 'card');

      const repoIco = document.createElement('img');
      repoIco.src = ico;

      const repoInfo = document.createElement('div');
      repoInfo.classList.add('repos__card-info');

      const cardTitleLink = document.createElement('a');
      cardTitleLink.textContent = repo.name;
      cardTitleLink.href = repo.html_url;
      cardTitleLink.target = 'blank';

      card.append(repoIco);
      card.append(repoInfo);
      repoInfo.append(cardTitleLink);

      if (repo.description) {
        const repoDesc = document.createElement('p');
        repoDesc.textContent = repo.description;
        repoInfo.append(repoDesc);
      }

      if (repo.language && App.colors[repo.language]) {
        const langBlock = document.createElement('div');
        langBlock.classList.add('language');

        const circle = document.createElement('span');
        circle.style.backgroundColor = getLangColor(repo.language);

        const title = document.createElement('p');
        title.textContent = repo.language;

        langBlock.append(circle, title);
        repoInfo.append(langBlock);
      }

      this.reposCards.append(card);
    });
  }

  renderNoData() {
    return ErrorMessage.render("We couldn't find any repos");
  }

  render() {
    if (User.repos) {
      this.renderReposList();
      this.reposContainer.classList.remove('hide');
    }
  }

  registerListeners() {
    emitter.subscribe('dataLoaded', () => {
      this.render();
      this.renderReposList();
    });
  }
}

export default new ReposUI();
