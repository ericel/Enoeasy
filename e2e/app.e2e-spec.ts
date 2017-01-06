import { EnoeasyPage } from './app.po';

describe('enoeasy App', function() {
  let page: EnoeasyPage;

  beforeEach(() => {
    page = new EnoeasyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
