type PromprTree = Record<string, [string, PromprTree]>;

export class UserPrompt {
  private _status: PromprTree = {};
  private errors: [string, any][] = [];
  constructor() {
    return;
  }

  public update = (location: string[], status: string): void => {
    let current = this._status;
    for (let i = 0; i < location.length; i++) {
      if (!current[location[i]]) {
        current[location[i]] = ['', {}];
      }
      if (i === location.length - 1) {
        if (current[location[i]][0] === 'Error') {
          break;
        }
        current[location[i]][0] = status;
        break;
      }
      current = current[location[i]][1];
    }
    this.doLog();
    return;
  };

  public doLog = (): void => {
    let message = '';
    const recursivePrint = (data: PromprTree, prefix: string): void => {
      const keys = Object.keys(data);
      if (keys.length > 0) {
        keys.sort((a, b) => (a > b ? 1 : -1));
        keys.forEach((key) => {
          message += `${prefix}${key}: ${data[key][0]}\n`;
          recursivePrint(data[key][1], prefix + '  ');
        });
      }
    };

    recursivePrint(this._status, '');
    console.clear();
    console.log(message);
  };

  public addError = (location: string[], error: any): void => {
    this.update(location, 'Error');
    this.errors.push([location.join('-'), error]);
  };

  public printErrors = (): void => {
    this.errors.sort((a, b) => (a[0] > b[0] ? 1 : b[0] > a[0] ? -1 : 0));

    console.error(
      this.errors.map((e) => `${e[0]}: ${JSON.stringify(e[1], null, '  ')}`)
    );
  };
}
