# Pterodactyl Panel 日本語化リソース

Pterodactyl Panel v1.12.0 向けの日本語翻訳ファイルセットです。
`resources` ディレクトリ内の言語ファイルを置き換え、パッチスクリプトを実行することで、パネルの表示を日本語化することができます。

## 対応バージョン
- Pterodactyl Panel v1.12.0

## 翻訳対象

### フロントエンド（ユーザー画面）
- ✅ ログイン・認証画面
- ✅ ナビゲーション・メニュー
- ✅ サーバーコンソール（起動/停止/再起動、リソース表示）
- ✅ ファイルマネージャー（アップロード、ダウンロード、編集、削除など）
- ✅ スタートアップ設定
- ✅ バックアップ・スケジュール
- ✅ データベース管理
- ✅ アカウント設定（パスワード、メール、2段階認証、API/SSHキー）
- ✅ 日付・時刻の日本語フォーマット

### 管理者画面（Admin）
- ✅ ダッシュボード・概要
- ✅ パネル設定（基本設定、詳細設定、メール設定）
- ✅ ユーザー管理
- ✅ サーバー管理（一覧、作成、詳細、ビルド、削除）
- ✅ ノード管理（一覧、作成、設定、割り当て、構成）
- ✅ ロケーション管理
- ✅ データベースホスト管理
- ✅ Nest/Egg管理
- ✅ マウント管理
- ✅ アプリケーションAPI管理
- ✅ 成功・エラーメッセージ

## 注意事項
> [!WARNING]
> 本ファイルの使用については、以下の点にご注意ください。

- **トラブルの免責**: 本ファイルの使用により生じたトラブル（詳細設定の破損、起動不可など）に関しては、提供者は一切の責任を負いません。自己責任でご使用ください。
- **アドオン・テーマとの互換性**: アドオンやカスタムテーマを使用している環境では、正しく動作しない可能性があるため、**使用しないでください**。
- **翻訳の品質**: 機械翻訳やツールを使用している箇所があるため、日本語として不自然な表現が含まれている場合があります。また、一部翻訳が完了していない箇所がある可能性があります。
- **今後の更新**: 日本語ファイルは今後も改良・修正を予定しています。

## 導入方法

### 1. リポジトリのクローン
```bash
cd ~
git clone https://github.com/naonao0319/pterodactyl-japanese.git
```

### 2. ファイルの適用
リポジトリ内の `resources` ディレクトリと `patch-frontend-ja.js` をPterodactyl Panelディレクトリにコピーしてください。

```bash
# 言語ファイルとBladeテンプレートのコピー
sudo cp -r ~/pterodactyl-japanese/resources /var/www/pterodactyl/

# パッチスクリプトのコピー
sudo cp ~/pterodactyl-japanese/patch-frontend-ja.js /var/www/pterodactyl/
```

### 3. パッチの適用
Reactコンポーネントとコントローラーの日本語化を適用します。

```bash
cd /var/www/pterodactyl
sudo node patch-frontend-ja.js
```

### 4. ビルドの実行
変更を適用するために、パネルのアセットを再ビルドする必要があります。
[公式ドキュメント](https://pterodactyl.io/community/customization/panel.html)も併せて参照してください。

#### 必要な環境の準備 (Node.js & Yarn)
OSに応じたコマンドでNode.js等をインストールします。

**Ubuntu / Debian:**
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
npm i -g yarn
```

**CentOS:**
```bash
curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo -E bash -
sudo yum install -y nodejs
npm i -g yarn
```

#### パッケージのインストールとビルド
Pterodactylのインストールディレクトリで以下を実行します。

```bash
cd /var/www/pterodactyl
yarn

# プロダクションビルドの実行
sudo NODE_OPTIONS=--openssl-legacy-provider yarn build:production
```

### 5. キャッシュのクリア
```bash
sudo php artisan view:clear
sudo php artisan cache:clear
```

ビルド完了後、パネルを確認して日本語化が適用されているか確認してください。

## 更新方法
リポジトリが更新された場合は、以下の手順で適用できます。

```bash
cd ~/pterodactyl-japanese
git pull origin main

# ファイルを再コピー
sudo cp -r ~/pterodactyl-japanese/resources /var/www/pterodactyl/
sudo cp ~/pterodactyl-japanese/patch-frontend-ja.js /var/www/pterodactyl/

# パッチとビルドを再実行
cd /var/www/pterodactyl
sudo node patch-frontend-ja.js
sudo NODE_OPTIONS=--openssl-legacy-provider yarn build:production
sudo php artisan view:clear
```

## ライセンス
このプロジェクトはMITライセンスの下で公開されています。
