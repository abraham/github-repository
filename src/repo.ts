import { Colors } from './colors';
import { User, UserData } from './user';
import { License, LicenseData } from './license';

export class Repo {
  public owner: User;
  private readonly months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  private license: License;

  constructor(private data: RepoData) {
    this.license = new License(data.license);
    this.owner = new User(data.owner);
  }

  public get name(): string {
    return this.data.name;
  }

  public get fullName(): string {
    return this.data.full_name;
  }

  public get htmlUrl(): string {
    return this.data.html_url;
  }

  public get description(): string {
    return this.data.description;
  }

  public get sshUrl(): string {
    return this.data.ssh_url;
  }

  public get displayPushedAt(): string {
    const month = this.months[this.pushedAt.getMonth()];
    return `${month} ${this.pushedAt.getDate()} ${this.pushedYear}`;
  }

  public get homepage(): string {
    return this.data.homepage;
  }

  public get displayHomepage(): string {
    return (this.homepage || '')
               .replace('http://www.', '')
               .replace('https://www.', '')
               .replace('http://', '')
               .replace('https://', '');
  }

  public get starsCount(): number {
    return this.data.stargazers_count;
  }

  public get watchersCount(): number {
    return this.data.subscribers_count;
  }

  public get openIssuesCount(): number {
    return this.data.open_issues_count;
  }

  public get forksCount(): number {
    return this.data.forks_count;
  }

  public get language(): string {
    return this.data.language || 'Unknown language';
  }

  public get languageColor(): string {
    return Colors.language(this.data.language);
  }

  public get displayLicense(): string {
    return this.license.name;
  }

  private get pushedAt(): Date {
    return new Date(Date.parse(this.data.pushed_at));
  }

  private get pushedYear(): string {
    return (new Date()).getFullYear() === this.pushedAt.getFullYear() ? '' : `${this.pushedAt.getFullYear()}`;
  }
}

export class EmptyRepo {
  public id = 0;
  public fullName = '';
  public owner = { htmlUrl: '', login: '' };
  public htmlUrl = '';
  public name = '';
  public description = '';
  public homepage = '';
  public displayHomepage = '';
  public sshUrl = '';
  public watchersCount = 0;
  public starsCount = 0;
  public openIssuesCount = 0;
  public forksCount = 0;
  public language = '';
  public languageColor = '';
  public displayPushedAt  = '';
  public displayLicense = '';
};

export interface RepoData {
  id: number;
  name: string;
  full_name: string;
  owner: UserData;
  private: boolean;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  mirror_url: string | null;
  archived: boolean;
  open_issues_count: number;
  license: LicenseData;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  network_count: number;
  subscribers_count: number;
}
