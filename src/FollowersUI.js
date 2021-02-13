import User from './User';
import emitter from './EventEmitter';
import ErrorMessage from './ErrorUI';
class FollowersUI {
  constructor() {
    this.followersContainer = document.querySelector('.followers');
    this.followersCards = document.querySelector('.followers__cards');
    this.error = document.querySelector('.error');
    this.registerListeners();
  }

  renderFollowersList() {
    this.followersCards.innerHTML = '';

    if (!User.followers.length) {
      this.followersCards.append(this.renderNoData());
      return;
    }

    User.followers.map((user) => {
      const card = document.createElement('div');
      card.classList.add('followers__card', 'card');

      const avatar = document.createElement('img');
      avatar.src = user.avatar_url;

      const usernameLink = document.createElement('a');
      usernameLink.href = user.html_url;
      usernameLink.textContent = user.login;
      usernameLink.target = 'blank';

      const usernameLinkWrapper = document.createElement('div');

      card.append(avatar);
      card.append(usernameLinkWrapper);
      usernameLinkWrapper.append(usernameLink);
      this.followersCards.append(card);
    });
  }

  renderNoData() {
    return ErrorMessage.render("We couldn't find any followers");
  }

  render() {
    if (User.followers) {
      this.renderFollowersList();
      this.followersContainer.classList.remove('hide');
    }
  }

  registerListeners() {
    emitter.subscribe('dataLoaded', () => {
      this.render();
    });
  }
}

export default new FollowersUI();
