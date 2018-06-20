import 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { GithubRepository } from '../src/github-repository';

// Increase timeout for AppVeyor
const TIMEOUT = 500;

describe('<github-repository>', () => {
  let component: GithubRepository;
  let stub: sinon.SinonStub;

  beforeEach(async () => {
    localStorage.clear();
    const realFetch = window.fetch;
    stub = sinon.stub(window, 'fetch').callsFake(async (url: string) => {
      const ownerRepo = url.replace('https://api.github.com/repos/', '');
      return realFetch(`./base/test/data/${ownerRepo}.json`);
    });
  });

  afterEach(() => {
    stub.restore();
  });

  describe('without properties', () => {
    beforeEach(() => {
      component = fixture('<github-repository></github-repository>');
    });

    it('renders loading', () => {
      expect(component.$('#loader')).to.exist;
      expect(component.$('.animated-background')).to.exist;
      expect(component.$$('.background-masker').length).to.eq(8);
    });
  });

  describe('with owner-repo', () => {
    beforeEach(async () => {
      component = fixture('<github-repository owner-repo="abraham/twitter-status"></github-repository>');
      await sleep(TIMEOUT);
    });

    it('renders the header', () => {
      const links = component.$$('#header a') as NodeListOf<HTMLAnchorElement>;
      expect(links.length).to.eq(3);
      expect(links[0].href).to.eq('https://github.com/abraham');
      expect(links[0].innerText).to.eq('abraham');
      expect(links[1].href).to.eq('https://github.com/abraham/twitter-status');
      expect(links[1].innerText).to.eq('twitter-status');
      expect(links[2].href).to.eq('https://github.com/abraham/twitter-status');
      expect(links[2].querySelector('svg').getAttribute('aria-label')).to.eq('GitHub');
    });

    it('renders the description', () => {
      expect(component.$('#description').innerText).to.eq('Twitter Status Web Component npmjs.com/package/twitter-status');
    });

    it('renders the homepage', () => {
      const link = component.$('#homepage a') as HTMLAnchorElement;
      expect(link.href).to.eq('https://www.npmjs.com/package/twitter-status');
      expect(link.innerText).to.eq('npmjs.com/package/twitter-status');
    });

    it('renders the counters', () => {
      const links = component.$$('#counters a') as NodeListOf<HTMLAnchorElement>;
      expect(links.length).to.eq(4);
      expect(links[0].href).to.eq('https://github.com/abraham/twitter-status/watchers');
      expect(links[0].innerText.trim()).to.eq('Watchers\n1');
      expect(links[1].href).to.eq('https://github.com/abraham/twitter-status/stargazers');
      expect(links[1].innerText.trim()).to.eq('Stars\n5');
      expect(links[2].href).to.eq('https://github.com/abraham/twitter-status/network');
      expect(links[2].innerText.trim()).to.eq('Forks\n1');
      expect(links[3].href).to.eq('https://github.com/abraham/twitter-status/issues');
      expect(links[3].innerText.trim()).to.eq('Issues\n6');
    });

    it('renders clone', () => {
      expect(component.$('#clone pre').innerText).to.eq('git@github.com:abraham/twitter-status.git');
    });

    it('renders the footer', () => {
      const links = component.$$('#footer .item');
      expect(links.length).to.eq(3);
      expect(links[0].innerText).to.include('TypeScript');
      expect(links[1].innerText).to.include('Updated Jan 27');
      expect(links[2].innerText).to.include('MIT License');
    });
  });

  describe('with owner-repo for an empty project', () => {
    beforeEach(async () => {
      component = fixture('<github-repository owner-repo="abraham/empty"></github-repository>');
      await sleep(TIMEOUT);
    });

    it('renders the header', () => {
      const links = component.$$('#header a') as NodeListOf<HTMLAnchorElement>;
      expect(links.length).to.eq(3);
      expect(links[0].href).to.eq('https://github.com/abraham');
      expect(links[0].innerText).to.eq('abraham');
      expect(links[1].href).to.eq('https://github.com/abraham/empty');
      expect(links[1].innerText).to.eq('empty');
      expect(links[2].href).to.eq('https://github.com/abraham/empty');
      expect(links[2].querySelector('svg').getAttribute('aria-label')).to.eq('GitHub');
    });

    it('renders the description', () => {
      expect(component.$('#description').innerText).to.eq('');
    });


    it('does not render homepage', () => {
      expect(component.$('#homepage')).to.be.null;
    });

    it('renders the counters', () => {
      const links = component.$$('#counters a') as NodeListOf<HTMLAnchorElement>;
      expect(links.length).to.eq(4);
      expect(links[0].href).to.eq('https://github.com/abraham/empty/watchers');
      expect(links[0].innerText.trim()).to.eq('Watchers\n1');
      expect(links[1].href).to.eq('https://github.com/abraham/empty/stargazers');
      expect(links[1].innerText.trim()).to.eq('Stars\n0');
      expect(links[2].href).to.eq('https://github.com/abraham/empty/network');
      expect(links[2].innerText.trim()).to.eq('Forks\n0');
      expect(links[3].href).to.eq('https://github.com/abraham/empty/issues');
      expect(links[3].innerText.trim()).to.eq('Issues\n0');
    });

    it('renders clone', () => {
      expect(component.$('#clone pre').innerText).to.eq('git@github.com:abraham/empty.git');
    });

    it('renders the footer', () => {
      const links = component.$$('#footer .item');
      expect(links.length).to.eq(3);
      expect(links[0].innerText).to.include('Unknown language');
      expect(links[1].innerText).to.include('Updated Jan 28 2017');
      expect(links[2].innerText).to.include('Unknown license');
    });

    it('renders link decorators', () => {
      const linksCount = component.$$('a').length;
      expect(component.$$('a[target="_blank"]').length).to.eq(linksCount);
      expect(component.$$('a[rel="noopener"]').length).to.eq(linksCount);
    });
  });

  describe('GitHub API', () => {
    it('is requested', () => {
      window.fetch = sinon.spy();
      component = fixture('<github-repository owner-repo="abraham/twitter-status"></github-repository>');
      expect((window.fetch as sinon.SinonSpy).calledWith('https://api.github.com/repos/abraham/twitter-status')).to.be.true;
      expect((window.fetch as sinon.SinonSpy).calledOnce).to.be.true;
    });

    describe('with error response', () => {
      beforeEach(async () => {
        stub.restore();
        const realFetch = window.fetch;
        stub = sinon.stub(window, 'fetch').callsFake(async () => {
          const error = await realFetch(`./base/test/data/error.json`);
          return new Response(await error.text(), { status: 403, statusText: 'Forbidden' })
        });
        component = fixture('<github-repository owner-repo="abraham/twitter-status"></github-repository>');
        await sleep(TIMEOUT);
      });

      afterEach(() => {
        stub.restore();
      });

      it('renders error', () => {
        expect(component.$('#error')).to.exist;
        const text = `Error getting abraham/twitter-status details from from GitHub:
"API rate limit exceeded for 71.90.116.85. (But here\'s the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)"`;
        expect(component.$('#error').innerText).to.eq(text);
      });
    });

    describe('with recent cache', () => {
      beforeEach(async () => {
        const data = await fetch('https://api.github.com/repos/abraham/twitter-status');
        const cache = {
          data: await data.json(),
          cachedAt: Date.now() - (23 * 60 * 60 * 1000),
        };
        window.localStorage.setItem('github-repository_abraham/twitter-status_cache', JSON.stringify(cache));
      });

      it('is not requested', () => {
        window.fetch = sinon.spy();
        component = fixture('<github-repository owner-repo="abraham/twitter-status"></github-repository>');
        expect((window.fetch as sinon.SinonSpy).calledWith('https://api.github.com/repos/abraham/twitter-status')).to.be.false;
        expect((window.fetch as sinon.SinonSpy).calledOnce).to.be.false;
      });
    });

    describe('with old cache', () => {
      beforeEach(async () => {
        const data = await fetch('https://api.github.com/repos/abraham/twitter-status');
        const cache = {
          data: await data.json(),
          cachedAt: Date.now() - (25 * 60 * 60 * 1000),
        };
        window.localStorage.setItem('github-repository_abraham/twitter-status_cache', JSON.stringify(cache));
      });

      it('is requested', () => {
        window.fetch = sinon.spy();
        component = fixture('<github-repository owner-repo="abraham/twitter-status"></github-repository>');
        expect((window.fetch as sinon.SinonSpy).calledWith('https://api.github.com/repos/abraham/twitter-status')).to.be.true;
        expect((window.fetch as sinon.SinonSpy).calledOnce).to.be.true;
        setTimeout(() => {
          const cache = JSON.parse(window.localStorage.getItem('github-repository_abraham/twitter-status_cache'));
          expect(cache.cachedAt).to.be.within(Date.now() - 1000, Date.now() + 1000);
        }, TIMEOUT);
      });
    });
  });


  describe('slot', () => {
    beforeEach(async () => {
      component = fixture(`
        <github-repository owner-repo="abraham/twitter-status">
          <img slot="images" src="https://raw.githubusercontent.com/abraham/twitter-status/master/images/simple.png" alt="Twitter Status embed preview" />
          <a slot="badges" href="https://npmjs.com/package/twitter-status" target="_blank"><img src="https://img.shields.io/npm/v/twitter-status.svg?style=flat&label=version&colorB=4bc524" alt="Version Status" /></a>
          <a slot="badges" href="https://circleci.com/gh/abraham/twitter-status" target="_blank"><img src="https://img.shields.io/circleci/project/github/abraham/twitter-status.svg?style=flat&label=macos" alt="macOS Build Status" /></a>
        </github-repository>
      `);
      await sleep(TIMEOUT);
    });

    it('badges are rendered', () => {
      const assignedNodes = (component.$('#badges-slot slot') as HTMLSlotElement).assignedNodes();
      expect(assignedNodes.length).to.eq(2);
      expect((assignedNodes[0] as HTMLAnchorElement).href).to.eq('https://npmjs.com/package/twitter-status');
    });

    it('images are rendered', () => {
      const assignedNodes = (component.$('#images-slot') as HTMLSlotElement).assignedNodes();
      expect(assignedNodes.length).to.eq(1);
      expect((assignedNodes[0] as HTMLImageElement).src).to.eq('https://raw.githubusercontent.com/abraham/twitter-status/master/images/simple.png');
    });
  });
});

function fixture(tag: string): GithubRepository {
  function fixtureContainer(): HTMLElement {
    let div = document.createElement('div');
    div.classList.add('fixture');
    return div;
  }
  let fixture = document.body.querySelector('.fixture') || document.body.appendChild(fixtureContainer());
  fixture.innerHTML = tag;
  return fixture.children[0] as GithubRepository;
}

function sleep(ms: number): Promise<{}> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
