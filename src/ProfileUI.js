import User from './User';
import emitter from './EventEmitter';
import ErrorMessage from './ErrorUI';

class ProfileUI {
  constructor() {
    this.profile = document.querySelector('.profile');
    this.render.bind(this);
    this.registerListeners.bind(this);
    this.registerListeners();
  }

  render() {
    if (User.data) {
      this.profile.classList.remove('hide');
    } else {
      this.profile.classList.add('hide');
    }
  }

  renderNoData() {
    return ErrorMessage.render("We couldn't find any users");
  }

  registerListeners() {
    emitter.subscribe('dataLoaded', () => {
      document.querySelector('.container > .error')?.remove();
      this.render();
    });

    emitter.subscribe('noUser', () => {
      this.profile.classList.add('hide');
      document.querySelector('.container > .error')?.remove();
      document.querySelector('.container').append(this.renderNoData());
    });
  }
}

export default new ProfileUI();
