import Page from '../../components/Page';
import HomeCanvas from './HomeCanvas';

export default class Home extends Page {
  constructor() {
    super({
      classes: { active: 'home--active' },
      element: '.home',
      elements: { list: '.home__list', items: '.home__item' },
      isScrollable: false,
    });

    this.create();
    this.canvas = new HomeCanvas();
  }

  create() {
    super.create();
  }
}
