# CleanVote
CleanなVoteのWebアプリを作ります。
## 環境
パッケージマネージャはbunです。  
フロントエンドはVite+TypeScript+React+Router、バックエンド(REST API)はhonoで作っています。  
ReactRouterを使っているのでフロントエンドの全てのパスがindex.htmlになるようにしてください。  
バックエンドはCloudflare worker用に作っていますがhonoなので知らべれば大体どこでも動きます。  
バックエンドでのボット判定はTurnstile、データベースはCloudflare d1を使っていますが、utilsである程度の抽象化をしてたりしますのでお願いします。
## インストール
```bash
$ bun i
# or
$ bun i
# or
$ bun i
# or
$ bun i
# or
$ npm i
# or etc
```
bunこそ正義！bunこそ正義！bunこそ正義！bunこそ正義！でもnpm-run-allはnodejs無しで動くようになれよ...  
実はnpm-run-allあるのでnodejsが必要っぽいです。
## 実行
フロントエンドは4000、バックエンドは3928のポートで動きます。
```bash
$ bun run serve
# or
$ bun run serve
# or
$ bun run serve
# or
$ bun run serve
# or
$ npm run serve
# or etc
```
## 環境変数
クライアント側には.envに`VITE_TURNSTILE_KEY`にTurnstileのサイトキーを入れてください。  
.env.productionには`VITE_API_KEY`にバックエンドのREST APIのURLを入れてください。

サーバー側の.dev.varsにはapp.tsにある環境変数の宣言を見て察してください。
