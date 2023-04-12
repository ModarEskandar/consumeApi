export class User {
  constructor(public username: string, private _token: string) {}
  get token() {
    console.log(this._token);

    return this._token;
  }
}
