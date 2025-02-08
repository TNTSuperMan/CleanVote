# CleanVote
CleanなVoteのWebアプリを作ります。
## 環境
パッケージマネージャはbunです。  
フロントエンドはVite+TypeScript+React+Router、バックエンド(REST API)はhonoで作っています。  
ReactRouterを使っているのでフロントエンドの全てのパスがindex.htmlになるようにしてください。  
バックエンドはCloudflare worker用に作っていますがhonoなので知らべれば大体どこでも動きます。
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
