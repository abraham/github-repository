export class License {
  private data: LicenseData;

  constructor(license: LicenseData) {
    this.data = license;
  }

  public get name(): string {
    return this.data ? this.data.name : 'Unknown license';
  }
}

export class LicenseData {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
  }
