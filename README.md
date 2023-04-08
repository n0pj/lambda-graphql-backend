# Lambda Graphql Backend

## Requirements

- Node.js

```bash
$ node -v
v18.7.0
```

- npm

```bash
$ npm -v
9.3.1
```

## 開発

1. プロジェクトルートとして以下のコマンドを実行

```
cd amplify/backend/function/lambdaGraphqlBackend/src/
```

or

```
code amplify/backend/function/lambdaGraphqlBackend/src/
```

2. .env ファイルを作成
   基本的に編集は不要

```
cp .env.example .env
```

3. パッケージインストール

```
npm install
```

4. 開発開始
   prisma, gql, ts は watch に対応している。

```
npm run dev
```

or

```
yarn dev
```

## コマンド一覧

- start: API サーバーを起動
- dev: API サーバーを起動し、watch する
- build: デプロイ用のファイルを生成
- prisma:generate: prisma のスキーマを生成
- graphql:codegen: gql の型を生成
