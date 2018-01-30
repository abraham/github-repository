import { Seed, Property, html, TemplateResult } from '@nutmeg/seed';
import { svg } from 'lit-html';
import * as numeral from 'numeral';

import { Cache } from './cache';
import { Repo, RepoData } from './repo';

export class GithubRepository extends Seed {
  @Property() public ownerRepo: string;

  private repo: Repo;
  private cache: Cache;
  private error: string;

  constructor() {
    super();
    this.cache = new Cache(this);
  }

  /** The component instance has been inserted into the DOM. */
  public connectedCallback() {
    super.connectedCallback();
    if (this.cache.data) {
      this.repo = new Repo(this.cache.data);
      this.render();
    }
    if(this.cache.expired) {
      this.ownerRepo && this.getRepository(this.ownerRepo);
    }
  }

  /** The component instance has been removed from the DOM. */
  public disconnectedCallback() {
    super.disconnectedCallback();
  }

  /** Watch for changes to these attributes. */
  public static get observedAttributes(): string[] {
    return super.observedAttributes;
  }

  /** Rerender when the observed attributes change. */
  public attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  private async getRepository(ownerRepo: string): Promise<void> {
    const response = await fetch(`https://api.github.com/repos/${ownerRepo}`);
    const data = await response.json();
    if (response.status === 200) {
      this.repo = new Repo(data);
      this.cache.data = data;
    } else {
      this.error = data.message;
    }
    this.render();
  }

  private countDisplay(count: number): string {
    if (count < 1000) {
      return String(count);
    } else if (count < 100000) {
      return numeral(count).format('0a');
    } else {
      return numeral(count).format('0.00a');
    }
  }

  /** Styling for the component. */
  public get styles(): TemplateResult {
    return html`
      <style>
        :host {
          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0 ,0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
        }

        * {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        }

        .content {
          padding-bottom: 16px;
          background-color: #FAFAFA;
          color: #212121;
          display: flex;
          flex-direction: column;
        }

        .row {
          margin: 12px 16px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        #header {
          padding-top: 16px;
          margin-top: 0;
          margin-bottom: 8px;
          font-weight: 500;
          font-size: 28px;
        }

        #footer {
          margin-bottom: 0;
        }

        #clone {
          padding: 0 16px;
          margin: 0;
          background-color: #e0e0e0;
        }

        #counters svg {
          height: 12px;
        }

        #counters .item {
          display: flex;
          flex-direction: column;
          text-align: center;
        }

        #badges-slot {
          margin: 0 16px;
          justify-content: start;
        }

        #images-slot::slotted(img) {
          width: 100%;
        }

        ::slotted(a) {
          margin: 12px 2px;
        }

        // Workaround for ShadyDOM polyfill
        [slot="images"] {
          width: 100%;
        }

        // Workaround for ShadyDOM polyfill
        #badges-slot a {
          margin: 12px 2px;
        }

        #footer .item {
          min-width: 100px;
        }

        .logo svg {
          width: 24px;
          height: 24px;
        }

        .language-color {
          position: relative;
          top: 1px;
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        a {
          color: #0366d6;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        // loading

        #loader {
          margin 24px;
        }

        .loader-item {
          padding-top: 8px;
          margin-left: 16px;
          max-width: 472px;
          min-height: 220px;
        }

        @keyframes placeHolderShimmer{
          0%{
            background-position: -468px 0
          }
          100%{
            background-position: 468px 0
          }
        }

        .animated-background {
          animation-duration: 1s;
          animation-fill-mode: forwards;
          animation-iteration-count: infinite;
          animation-name: placeHolderShimmer;
          animation-timing-function: linear;
          background: #f6f7f8;
          background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
          background-size: 800px 104px;
          height: 96px;
          position: relative;
        }

        .background-masker {
          background: #FAFAFA;
          position: absolute;
        }

        .background-masker.header-top {
          top: 0;
          left: 0;
          right: 0;
          height: 10px;
        }

        .background-masker.header-right {
          top: 10px;
          left: 40px;
          height: 8px;
          width: 10px;
        }

        .background-masker.header-right {
          width: auto;
          left: 300px;
          right: 0;
          height: 40px;
        }

        .background-masker.content-top,
        .background-masker.content-second-line,
        .background-masker.content-third-line,
        .background-masker.content-second-end,
        .background-masker.content-third-end,
        .background-masker.content-first-end {
          top: 40px;
          left: 0;
          right: 0;
          height: 6px;
        }

        .background-masker.content-top {
          height:20px;
        }

        .background-masker.content-first-end,
        .background-masker.content-second-end,
        .background-masker.content-third-end{
          width: auto;
          left: 380px;
          right: 0;
          top: 60px;
          height: 8px;
        }

        .background-masker.content-second-line  {
          top: 68px;
        }

        .background-masker.content-second-end {
          left: 420px;
          top: 74px;
        }

        .background-masker.content-third-line {
          top: 82px;
        }

        .background-masker.content-third-end {
          left: 300px;
          top: 88px;
        }
      </style>
    `;
  }

  private get logo(): TemplateResult {
    return svg`
      <svg xmlns="http://www.w3.org/2000/svg" aria-label="GitHub" role="img" viewBox="0 0 512 512">
        <rect width="512" height="512" rx="50%"/>
        <path fill="#fff" d="M335 499c14 0 12 17 12 17H165s-2-17 12-17c13 0 16-6 16-12l-1-50c-71 16-86-28-86-28-12-30-28-37-28-37-24-16 1-16 1-16 26 2 40 26 40 26 22 39 59 28 74 22 2-17 9-28 16-35-57-6-116-28-116-126 0-28 10-51 26-69-3-6-11-32 3-67 0 0 21-7 70 26 42-12 86-12 128 0 49-33 70-26 70-26 14 35 6 61 3 67 16 18 26 41 26 69 0 98-60 120-117 126 10 8 18 24 18 48l-1 70c0 6 3 12 16 12z"/>
      </svg>
    `;
  }

  private get issuesIcon(): TemplateResult {
    return svg`
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16">
        <path fill-rule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"/>
      </svg>
    `;
  }

  private get forkIcon(): TemplateResult {
    return svg`
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16">
        <path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"/>
      </svg>
    `;
  }

  private get starIcon(): TemplateResult {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16">
        <path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"/>
      </svg>
    `;
  }

  private get watchIcon(): TemplateResult {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6C13 14 16 8 16 8s-3-6-7.94-6zM8 12c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4zm2-4c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"/>
      </svg>
    `;
  }

  private get headerTemplate(): TemplateResult {
    return html`
      <div id="header" class="row">
        <span class="item">
          <a href="${this.repo.owner.htmlUrl}" target="_blank">${this.repo.owner.login}</a> /
          <a href="${this.repo.htmlUrl}" target="_blank">${this.repo.name}</a>
        </span>
        <span class="logo item"><a href="https://github.com" target="_blank">${this.logo}</a></span>
      </div>
    `;
  }

  private get descriptionTemplate(): TemplateResult {
    return html`
      <div id="description" class="row">${this.repo.description}</div>
    `;
  }

  private get cloneTemplate(): TemplateResult {
    return html`
      <div id="clone" class="row">
        <pre>${this.repo.sshUrl}</pre>
      </div>
    `;
  }

  private get countsTemplate(): TemplateResult {
    return html`
      <div id="counters" class="row">
        <a class="item" href="${this.repo.htmlUrl}/watchers" target="_blank">
          <span>${this.watchIcon} Watchers</span>
          <span>${this.countDisplay(this.repo.watchersCount)}</span>
        </a>
        <a class="item" href="${this.repo.htmlUrl}/stargazers" target="_blank">
          <span>${this.starIcon} Stars</span>
          <span>${this.countDisplay(this.repo.starsCount)}</span>
        </a>
        <a class="item" href="${this.repo.htmlUrl}/network" target="_blank">
          <span>${this.forkIcon} Forks</span>
          <span>${this.countDisplay(this.repo.forksCount)}</span>
        </a>
        <a class="item" href="${this.repo.htmlUrl}/issues" target="_blank">
          <span>${this.issuesIcon} Issues</span>
          <span>${this.countDisplay(this.repo.openIssuesCount)}</span>
        </a>
      </div>
    `;
  }

  private get languageTemplate(): TemplateResult {
    return html`
      <div id="language">
        <span class="language-color" style="background-color: ${this.repo.languageColor};"></span>
        ${this.repo.language}
      </div>
    `;
  }

  private get footerTemplate(): TemplateResult {
    return html`
      <div id="footer" class="row">
        <span class="item">${this.languageTemplate}</span>
        <span class="item">${this.repo.displayLicense}</span>
        <span class="item">Updated ${this.repo.displayUpdatedAt}</span>
      </div>
    `;
  }

  /** HTML Template for the component. */
  public get template(): TemplateResult {
    if (this.error) {
      return html`
        <div id="error" class="content">
          <div class="row"><span>Error getting <a href="https://github.com/${this.ownerRepo}" target="_blank">${this.ownerRepo}</a> details from from GitHub:<span></div>
          <div class="row">"${this.error}"</div>
        </div>
      `;
    } else if (!this.repo) {
      return html`
        <div id="loader" class="content">
          <div class="loader-item">
            <div class="animated-background">
              <div class="background-masker header-top"></div>
              <div class="background-masker header-right"></div>
              <div class="background-masker content-top"></div>
              <div class="background-masker content-first-end"></div>
              <div class="background-masker content-second-line"></div>
              <div class="background-masker content-second-end"></div>
              <div class="background-masker content-third-line"></div>
              <div class="background-masker content-third-end"></div>
            </div>
          </div>
        </div>
      `;
    } else {
      return html`
        <div class="content">
          <slot id="images-slot" name="images"></slot>
          ${this.headerTemplate}
          ${this.descriptionTemplate}
          ${this.countsTemplate}
          ${this.cloneTemplate}
          <div id="badges-slot" class="row">
            <slot class="row" name="badges"></slot>
          </div>
          ${this.footerTemplate}
        </div>
      `;
    }
  }
}

window.customElements.define('github-repository', GithubRepository);
