export class User {
  private data: UserData;

  constructor(user: UserData) {
    this.data = user;
  }

  public get htmlUrl(): string {
    return this.data.html_url;
  }

  public get login(): string {
    return this.data.login;
  }
}

export class UserData {
  login: string;
  id: number;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: 'User'
  site_admin: boolean;
}
