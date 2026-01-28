# Pterodactyl Panel 日本語化リソース

Pterodactyl Panel v1.12.0 向けの日本語翻訳ファイルセットです。
`resources` ディレクトリ内の言語ファイルを置き換えることで、パネルの表示を日本語化することができます。

## 対応バージョン
- Pterodactyl Panel v1.12.0

## 注意事項
> [!WARNING]
> 本ファイルの使用については、以下の点にご注意ください。

- **トラブルの免責**: 本ファイルの使用により生じたトラブル（詳細設定の破損、起動不可など）に関しては、提供者は一切の責任を負いません。自己責任でご使用ください。
- **アドオン・テーマとの互換性**: アドオンやカスタムテーマを使用している環境では、正しく動作しない可能性があるため、**使用しないでください**。
- **翻訳の品質**: 機械翻訳やツールを使用している箇所があるため、日本語として不自然な表現が含まれている場合があります。また、一部翻訳が完了していない箇所がある可能性があります。
- **今後の更新**: 日本語ファイルは今後も改良・修正を予定しています。

## 導入とビルド方法

### 1. ファイルの適用
リポジトリ内の `resources` ディレクトリを、Pterodactyl Panelの `resources` ディレクトリに上書きコピーしてください。

### 2. ビルドの実行
変更を適用するために、パネルのアセットを再ビルドする必要があります。
[公式ドキュメント](https://pterodactyl.io/community/customization/panel.html)も併せて参照してください。

#### 必要な環境の準備 (Node.js & Yarn)
OSに応じたコマンドでNode.js等をインストールします。

**Ubuntu / Debian:**
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

**CentOS:**
```bash
curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo -E bash -
sudo yum install -y nodejs yarn
```

#### パッケージのインストールとビルド
Pterodactylのインストールディレクトリ（例: `/var/www/pterodactyl`）で以下を実行します。

```bash
# Yarnのインストールとパッケージ依存関係の解決
npm i -g yarn
cd /var/www/pterodactyl
yarn

# プロダクションビルドの実行
export NODE_OPTIONS=--openssl-legacy-provider # Node.js v17以上の場合
yarn build:production
```

ビルド完了後、パネルを確認して日本語化が適用されているか確認してください。
