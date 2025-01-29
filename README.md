# CleanVote
CleanなVoteのWebアプリを作ります。
## 環境
パッケージマネージャはbunです。  
フロントエンドはVite+TypeScript+React、バックエンド(REST API)はhonoで作っています。  
バックエンドはCloudflare worker用に作っていますが以下のようにすればそれ以外でも動きます。
```js
import { serve } from "bun";
import app from "./server";
serve({
    fetch: app.fetch,
    port: 3928
});
```
## インストール
```bash
$ npm i
```
bunユーザーであれば
```bash
$ bun i
```
## 実行
フロントエンドは4000、バックエンドは3928のポートで動きます。
```bash
$ npm run dev
```
## 環境変数
クライアント側には.envに`VITE_TURNSTILE_KEY`にTurnstileのサイトキーを入れてください。  
.env.productionには`VITE_API_KEY`にバックエンドのREST APIのURLを入れてください。

サーバー側の.dev.varsにはapp.tsにある環境変数の宣言を見て察してください。
