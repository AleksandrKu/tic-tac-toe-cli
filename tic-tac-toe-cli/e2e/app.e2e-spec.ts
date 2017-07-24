import { TicTacToeCliPage } from './app.po';

describe('tic-tac-toe-cli App', () => {
  let page: TicTacToeCliPage;

  beforeEach(() => {
    page = new TicTacToeCliPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
