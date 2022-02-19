/**イベント処理テンプレート */
export class Handler {
  static Input(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, dispatcher: (value: string) => void) {
    console.log(e.target.value);
    dispatcher(e.target.value);
    return true;
  }
}
