import 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';

describe('<github-repository>', () => {
  let component;

  describe('without properties', () => {
    beforeEach(() => {
      component = fixture('<github-repository></github-repository>');
    });

    it('renders default', () => {
      expect(component.$('.content').innerText).to.include('Welcome to <github-repository>');
    });
  });

  
  describe('ownerRepo', () => {
    beforeEach(() => {
      component = fixture('<github-repository owner-repo="Pickle"></github-repository>');
    });

    it('is rendered', () => {
      expect(component.$('.content').innerText).to.include('ownerRepo: Pickle');
    });
  });


  describe('slot', () => {
    beforeEach(() => {
      component = fixture('<github-repository>slot content</github-repository>');
    });

    it('is rendered', () => {
      // Firefox has different output so testing for inclusion instead of exact match.
      expect(component.$('slot').assignedNodes()[0].wholeText).to.include('slot content');
      // TODO: Switch to simpler test when Firefox is no longer polyfilled.
      // expect(component.innerText).equal('slot content');
    });
  });

  describe('--github-repository-background-color', () => {
    describe('with default', () => {
      beforeEach(() => {
        component = fixture('<github-repository></github-repository>');
      });

      it('is set', () => {
        expect(getComputedStyle(component.$('.content')).backgroundColor).equal('rgb(250, 250, 250)');
      });
    });

    describe('with outside value', () => {
      beforeEach(() => {
        component = fixture(`
          <div>
            <style>
              github-repository.blue {
                --github-repository-background-color: #03A9F4;
              }
            </style>
            <github-repository class="blue"></github-repository>
          </div>
        `).querySelector('github-repository');
      });

      it('is set', () => {
        expect(getComputedStyle(component.$('.content')).backgroundColor).equal('rgb(3, 169, 244)');
      });
    });
  });
});

function fixture(tag: string): HTMLElement {
  function fixtureContainer(): HTMLElement {
    let div = document.createElement('div');
    div.classList.add('fixture');
    return div;
  }
  let fixture = document.body.querySelector('.fixture') || document.body.appendChild(fixtureContainer());
  fixture.innerHTML = tag;
  return fixture.children[0] as HTMLElement;
}
