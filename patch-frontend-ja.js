const fs = require('fs');
const path = require('path');

// フロントエンドの日本語化パッチ
// 注意: これはソースコードを直接書き換えます。バックアップを取ってから実行してください。

const replacements = [
    // ログイン画面
    {
        file: 'resources/scripts/components/auth/LoginContainer.tsx',
        search: "label={'Username or Email'}",
        replace: "label={'ユーザー名またはメールアドレス'}"
    },
    {
        file: 'resources/scripts/components/auth/LoginContainer.tsx',
        search: "label={'Password'}",
        replace: "label={'パスワード'}"
    },
    {
        file: 'resources/scripts/components/auth/LoginContainer.tsx',
        search: "title={'Login to Continue'}",
        replace: "title={'ログインして続行'}"
    },
    {
        file: 'resources/scripts/components/auth/LoginContainer.tsx',
        search: "Login",
        replace: "ログイン"
    },
    {
        file: 'resources/scripts/components/auth/LoginContainer.tsx',
        search: "Forgot password?",
        replace: "パスワードをお忘れですか？"
    },
    // ナビゲーションバー
    {
        file: 'resources/scripts/components/NavigationBar.tsx',
        search: "content={'Dashboard'}",
        replace: "content={'ダッシュボード'}"
    },
    {
        file: 'resources/scripts/components/NavigationBar.tsx',
        search: "content={'Account Settings'}",
        replace: "content={'アカウント設定'}"
    },
    {
        file: 'resources/scripts/components/NavigationBar.tsx',
        search: "content={'Sign Out'}",
        replace: "content={'ログアウト'}"
    },
    // サーバーコンソール - 詳細ブロック
    {
        file: 'resources/scripts/components/server/console/ServerDetailsBlock.tsx',
        search: "title={'Address'}",
        replace: "title={'アドレス'}"
    },
    {
        file: 'resources/scripts/components/server/console/ServerDetailsBlock.tsx',
        search: "title={'Uptime'}",
        replace: "title={'稼働時間'}"
    },
    {
        file: 'resources/scripts/components/server/console/ServerDetailsBlock.tsx',
        search: "title={'CPU Load'}",
        replace: "title={'CPU使用率'}"
    },
    {
        file: 'resources/scripts/components/server/console/ServerDetailsBlock.tsx',
        search: "title={'Memory'}",
        replace: "title={'メモリ使用率'}"
    },
    {
        file: 'resources/scripts/components/server/console/ServerDetailsBlock.tsx',
        search: "title={'Disk'}",
        replace: "title={'ディスク使用率'}"
    },
    {
        file: 'resources/scripts/components/server/console/ServerDetailsBlock.tsx',
        search: "title={'Network (Inbound)'}",
        replace: "title={'ネットワーク (受信)'}"
    },
    {
        file: 'resources/scripts/components/server/console/ServerDetailsBlock.tsx',
        search: "title={'Network (Outbound)'}",
        replace: "title={'ネットワーク (送信)'}"
    },
    {
        file: 'resources/scripts/components/server/console/ServerDetailsBlock.tsx',
        search: "'Offline'",
        replace: "'オフライン'"
    },
    {
        file: 'resources/scripts/components/server/console/ServerDetailsBlock.tsx',
        search: ">Offline<",
        replace: ">オフライン<"
    },
    // サーバーコンソール - 操作ボタン
    {
        file: 'resources/scripts/components/server/console/PowerButtons.tsx',
        search: "title={'Forcibly Stop Process'}",
        replace: "title={'プロセスの強制終了'}"
    },
    {
        file: 'resources/scripts/components/server/console/PowerButtons.tsx',
        search: "confirm={'Continue'}",
        replace: "confirm={'続行'}"
    },
    {
        file: 'resources/scripts/components/server/console/PowerButtons.tsx',
        search: "Forcibly stopping a server can lead to data corruption.",
        replace: "サーバーを強制終了すると、データの破損につながる可能性があります。"
    },
    {
        file: 'resources/scripts/components/server/console/PowerButtons.tsx',
        search: "Start",
        replace: "起動"
    },
    {
        file: 'resources/scripts/components/server/console/PowerButtons.tsx',
        search: "Restart",
        replace: "再起動"
    },
    {
        file: 'resources/scripts/components/server/console/PowerButtons.tsx',
        search: "{killable ? 'Kill' : 'Stop'}",
        replace: "{killable ? '強制終了' : '停止'}"
    },
    // 稼働時間表示
    {
        file: 'resources/scripts/components/server/UptimeDuration.tsx',
        search: "{days}d {hours}h {minutes}m",
        replace: "{days}日 {hours}時間 {minutes}分"
    },
    {
        file: 'resources/scripts/components/server/UptimeDuration.tsx',
        search: "{hours}h {minutes}m {seconds}s",
        replace: "{hours}時間 {minutes}分 {seconds}秒"
    },
    // ファイルマネージャー
    {
        file: 'resources/scripts/components/server/files/FileManagerContainer.tsx',
        regex: />\s*New File\s*</,
        replace: ">新規ファイル<"
    },
    {
        file: 'resources/scripts/components/server/files/UploadButton.tsx',
        regex: />\s*Upload\s*</,
        replace: ">アップロード<"
    },
    {
        file: 'resources/scripts/components/server/files/UploadButton.tsx',
        search: "Drag and drop files to upload.",
        replace: "ファイルをドラッグ＆ドロップしてアップロード"
    },
    {
        file: 'resources/scripts/components/server/files/NewDirectoryButton.tsx',
        regex: />\s*Create Directory\s*</,
        replace: ">ディレクトリ作成<"
    },
    {
        file: 'resources/scripts/components/server/files/NewDirectoryButton.tsx',
        regex: />\s*Create\s*</,
        replace: ">作成<"
    },
    {
        file: 'resources/scripts/components/server/files/NewDirectoryButton.tsx',
        regex: />\s*Cancel\s*</,
        replace: ">キャンセル<"
    },
    {
        file: 'resources/scripts/components/server/files/FileNameModal.tsx',
        regex: />\s*Create File\s*</,
        replace: ">ファイル作成<"
    },
    {
        file: 'resources/scripts/components/server/files/MassActionsBar.tsx',
        regex: />\s*Move\s*</,
        replace: ">移動<"
    },
    {
        file: 'resources/scripts/components/server/files/MassActionsBar.tsx',
        regex: />\s*Archive\s*</,
        replace: ">アーカイブ<"
    },
    {
        file: 'resources/scripts/components/server/files/MassActionsBar.tsx',
        regex: />\s*Delete\s*</,
        replace: ">削除<"
    },
    // ファイル操作メニュー
    {
        file: 'resources/scripts/components/server/files/FileDropdownMenu.tsx',
        regex: /title=\{['"]Rename['"]\}/,
        replace: "title={'名前変更'}"
    },
    {
        file: 'resources/scripts/components/server/files/FileDropdownMenu.tsx',
        regex: /title=\{['"]Move['"]\}/,
        replace: "title={'移動'}"
    },
    {
        file: 'resources/scripts/components/server/files/FileDropdownMenu.tsx',
        regex: /title=\{['"]Permissions['"]\}/,
        replace: "title={'権限変更'}"
    },
    {
        file: 'resources/scripts/components/server/files/FileDropdownMenu.tsx',
        regex: /title=\{['"]Copy['"]\}/,
        replace: "title={'コピー'}"
    },
    {
        file: 'resources/scripts/components/server/files/FileDropdownMenu.tsx',
        regex: /title=\{['"]Unarchive['"]\}/,
        replace: "title={'解凍'}"
    },
    {
        file: 'resources/scripts/components/server/files/FileDropdownMenu.tsx',
        regex: /title=\{['"]Archive['"]\}/,
        replace: "title={'アーカイブ'}"
    },
    {
        file: 'resources/scripts/components/server/files/FileDropdownMenu.tsx',
        regex: /title=\{['"]Download['"]\}/,
        replace: "title={'ダウンロード'}"
    },
    {
        file: 'resources/scripts/components/server/files/FileDropdownMenu.tsx',
        regex: /title=\{['"]Delete['"]\}/,
        replace: "title={'削除'}"
    },
    {
        file: 'resources/scripts/components/server/files/FileDropdownMenu.tsx',
        regex: /title=\{`Delete \$\{file\.isFile \? 'File' : 'Directory'\}`\}/,
        replace: "title={`\${file.isFile ? 'ファイル' : 'ディレクトリ'}を削除`}"
    },
    {
        file: 'resources/scripts/components/server/files/FileDropdownMenu.tsx',
        regex: /confirm=\{['"]Delete['"]\}/,
        replace: "confirm={'削除'}"
    },
    {
        file: 'resources/scripts/components/server/files/FileDropdownMenu.tsx',
        regex: /You will not be able to recover the contents of&nbsp;/,
        replace: "削除すると復元できません:&nbsp;"
    },
    {
        file: 'resources/scripts/components/server/files/FileDropdownMenu.tsx',
        regex: /<span className=\{['"]font-semibold text-gray-50['"]\}>\{file\.name\}<\/span> once deleted\./,
        replace: "<span className={'font-semibold text-gray-50'}>{file.name}</span>"
    },
    // スタートアップ画面
    {
        file: 'resources/scripts/components/server/startup/StartupContainer.tsx',
        search: "title={'Startup Settings'}",
        replace: "title={'スタートアップ設定'}"
    },
    {
        file: 'resources/scripts/components/server/startup/StartupContainer.tsx',
        search: "title={'Startup Command'}",
        replace: "title={'起動コマンド'}"
    },
    {
        file: 'resources/scripts/components/server/startup/StartupContainer.tsx',
        search: "title={'Docker Image'}",
        replace: "title={'Docker イメージ'}"
    },
    {
        file: 'resources/scripts/components/server/startup/StartupContainer.tsx',
        regex: /<h3 css=\{tw`mt-8 mb-2 text-2xl`\}>Variables<\/h3>/,
        replace: "<h3 css={tw`mt-8 mb-2 text-2xl`}>変数</h3>"
    },
    {
        file: 'resources/scripts/components/server/startup/StartupContainer.tsx',
        search: "This is an advanced feature allowing you to select a Docker image to use when running",
        replace: "これは高度な機能であり、このサーバーインスタンスを実行する際に使用する Docker イメージを選択できます。"
    },
    {
        file: 'resources/scripts/components/server/startup/StartupContainer.tsx',
        search: "this server instance.",
        replace: ""
    },
    {
        file: 'resources/scripts/components/server/startup/StartupContainer.tsx',
        regex: /This \{"server's"\} Docker image has been manually set by an administrator and cannot\s+be changed through this UI\./,
        replace: "このサーバーの Docker イメージは管理者によって手動で設定されているため、この UI から変更することはできません。"
    },
    {
        file: 'resources/scripts/components/server/startup/VariableBox.tsx',
        search: ">Read Only<",
        replace: ">読取専用<"
    },
    // Admin Panel - Dashboard (resources/views/admin/index.blade.php)
    {
        file: 'resources/views/admin/index.blade.php',
        search: "Administration",
        replace: "管理画面"
    },
    {
        file: 'resources/views/admin/index.blade.php',
        search: "Administrative Overview",
        replace: "管理概要"
    },
    {
        file: 'resources/views/admin/index.blade.php',
        search: "<small>A quick glance at your system.</small>",
        replace: "<small>システムの概要を素早く確認できます。</small>"
    },
    {
        file: 'resources/views/admin/index.blade.php',
        regex: />\s*System Information\s*</,
        replace: ">システム情報<"
    },
    {
        file: 'resources/views/admin/index.blade.php',
        search: "You are running Pterodactyl Panel version",
        replace: "現在実行中の Pterodactyl Panel バージョンは"
    },
    {
        file: 'resources/views/admin/index.blade.php',
        regex: /Your panel is up-to-date!/,
        replace: "パネルは最新です！"
    },
    {
        file: 'resources/views/admin/index.blade.php',
        regex: /Your panel is <strong>not up-to-date!<\/strong>/,
        replace: "パネルは<strong>最新ではありません！</strong>"
    },
    {
        file: 'resources/views/admin/index.blade.php',
        search: "The latest version is",
        replace: "最新バージョンは"
    },
    {
        file: 'resources/views/admin/index.blade.php',
        search: "and you are currently running version",
        replace: "ですが、現在のバージョンは"
    },
    {
        file: 'resources/views/admin/index.blade.php',
        search: "Get Help <small>(via Discord)</small>",
        replace: "ヘルプ <small>(Discord)</small>"
    },
    {
        file: 'resources/views/admin/index.blade.php',
        search: "Documentation",
        replace: "ドキュメント"
    },
    {
        file: 'resources/views/admin/index.blade.php',
        search: "Support the Project",
        replace: "プロジェクトを支援"
    },
    // Admin Panel - Settings (resources/views/admin/settings/index.blade.php)
    {
        file: 'resources/views/admin/settings/index.blade.php',
        search: "Panel Settings<small>Configure Pterodactyl to your liking.</small>",
        replace: "パネル設定<small>Pterodactylをお好みに設定します。</small>"
    },
    {
        file: 'resources/views/admin/settings/index.blade.php',
        regex: /<h3 class="box-title">Panel Settings<\/h3>/,
        replace: '<h3 class="box-title">パネル設定</h3>'
    },
    {
        file: 'resources/views/admin/settings/index.blade.php',
        search: "Company Name",
        replace: "会社名/組織名"
    },
    {
        file: 'resources/views/admin/settings/index.blade.php',
        search: "Require 2-Factor Authentication",
        replace: "二要素認証の強制"
    },
    {
        file: 'resources/views/admin/settings/index.blade.php',
        search: "> Not Required",
        replace: "> 必須ではない"
    },
    {
        file: 'resources/views/admin/settings/index.blade.php',
        search: "> Admin Only",
        replace: "> 管理者のみ"
    },
    {
        file: 'resources/views/admin/settings/index.blade.php',
        search: "> All Users",
        replace: "> 全ユーザー"
    },
    {
        file: 'resources/views/admin/settings/index.blade.php',
        search: "Default Language",
        replace: "デフォルト言語"
    },
    {
        file: 'resources/views/admin/settings/index.blade.php',
        regex: />Save<\/button>/,
        replace: ">保存</button>"
    },
    // Admin Panel - Users (resources/views/admin/users/index.blade.php)
    {
        file: 'resources/views/admin/users/index.blade.php',
        search: "List Users",
        replace: "ユーザー一覧"
    },
    {
        file: 'resources/views/admin/users/index.blade.php',
        search: "Users<small>All registered users on the system.</small>",
        replace: "ユーザー<small>システムに登録されている全ユーザー。</small>"
    },
    {
        file: 'resources/views/admin/users/index.blade.php',
        regex: />\s*User List\s*</,
        replace: ">ユーザー一覧<"
    },
    {
        file: 'resources/views/admin/users/index.blade.php',
        regex: />Create New<\/button>/,
        replace: ">新規作成</button>"
    },
    {
        file: 'resources/views/admin/users/index.blade.php',
        search: "Client Name",
        replace: "クライアント名"
    },
    {
        file: 'resources/views/admin/users/index.blade.php',
        search: "Username",
        replace: "ユーザー名"
    },
    {
        file: 'resources/views/admin/users/index.blade.php',
        search: "Servers Owned",
        replace: "所有サーバー"
    },
    {
        file: 'resources/views/admin/users/index.blade.php',
        search: "Can Access",
        replace: "アクセス可能"
    },
    {
        file: 'resources/views/admin/users/index.blade.php',
        title: "Servers that this user is marked as the owner of.",
        regex: /Servers that this user is marked as the owner of\./,
        replace: "このユーザーが所有者として設定されているサーバー。"
    },
    // Admin Panel - Servers (resources/views/admin/servers/index.blade.php)
    {
        file: 'resources/views/admin/servers/index.blade.php',
        search: "List Servers",
        replace: "サーバー一覧"
    },
    {
        file: 'resources/views/admin/servers/index.blade.php',
        search: "Servers<small>All servers available on the system.</small>",
        replace: "サーバー<small>システム上で利用可能な全サーバー。</small>"
    },
    {
        file: 'resources/views/admin/servers/index.blade.php',
        regex: />\s*Server List\s*</,
        replace: ">サーバー一覧<"
    },
    {
        file: 'resources/views/admin/servers/index.blade.php',
        search: 'placeholder="Search Servers"',
        replace: 'placeholder="サーバー検索"'
    },
    {
        file: 'resources/views/admin/servers/index.blade.php',
        search: "Server Name",
        replace: "サーバー名"
    },
    {
        file: 'resources/views/admin/servers/index.blade.php',
        search: "Owner",
        replace: "所有者"
    },
    {
        file: 'resources/views/admin/servers/index.blade.php',
        search: "Node",
        replace: "ノード"
    },
    {
        file: 'resources/views/admin/servers/index.blade.php',
        search: "Connection",
        replace: "接続"
    },
    {
        file: 'resources/views/admin/servers/index.blade.php',
        regex: />Suspended<\/span>/,
        replace: ">凍結中</span>"
    },
    {
        file: 'resources/views/admin/servers/index.blade.php',
        regex: />Installing<\/span>/,
        replace: ">インストール中</span>"
    },
    {
        file: 'resources/views/admin/servers/index.blade.php',
        regex: />Active<\/span>/,
        replace: ">稼働中</span>"
    },
    // Admin Panel - New Node (resources/views/admin/nodes/new.blade.php)
    {
        file: 'resources/views/admin/nodes/new.blade.php',
        search: "Nodes &rarr; New",
        replace: "ノード &rarr; 新規作成"
    },
    {
        file: 'resources/views/admin/nodes/new.blade.php',
        search: "New Node<small>Create a new local or remote node for servers to be installed to.</small>",
        replace: "新規ノード<small>サーバーをインストールするための新しいローカルまたはリモートノードを作成します。</small>"
    },
    {
        file: 'resources/views/admin/nodes/new.blade.php',
        search: "Basic Details",
        replace: "基本詳細"
    },
    {
        file: 'resources/views/admin/nodes/new.blade.php',
        search: 'label for="pName" class="form-label">Name</label>',
        replace: 'label for="pName" class="form-label">名前</label>'
    },
    {
        file: 'resources/views/admin/nodes/new.blade.php',
        search: 'label for="pDescription" class="form-label">Description</label>',
        replace: 'label for="pDescription" class="form-label">説明</label>'
    },
    {
        file: 'resources/views/admin/nodes/new.blade.php',
        search: 'label for="pLocationId" class="form-label">Location</label>',
        replace: 'label for="pLocationId" class="form-label">ロケーション</label>'
    },
    {
        file: 'resources/views/admin/nodes/new.blade.php',
        search: "Node Visibility",
        replace: "ノードの公開設定"
    },
    {
        file: 'resources/views/admin/nodes/new.blade.php',
        search: "Public </label>",
        replace: "公開 </label>"
    },
    {
        file: 'resources/views/admin/nodes/new.blade.php',
        search: "Private </label>",
        replace: "非公開 </label>"
    },
    {
        file: 'resources/views/admin/nodes/new.blade.php',
        search: "Communicate Over SSL",
        replace: "SSL通信"
    },
    {
        file: 'resources/views/admin/nodes/new.blade.php',
        search: "Use SSL Connection</label>",
        replace: "SSL接続を使用</label>"
    },
    {
        file: 'resources/views/admin/nodes/new.blade.php',
        search: "Use HTTP Connection</label>",
        replace: "HTTP接続を使用</label>"
    },
    {
        file: 'resources/views/admin/nodes/new.blade.php',
        search: "Behind Proxy",
        replace: "プロキシ配下"
    },
    {
        file: 'resources/views/admin/nodes/new.blade.php',
        search: "Not プロキシ配下",
        replace: "プロキシ配下ではない"
    },
    {
        file: 'resources/views/layouts/admin.blade.php',
        search: "BASIC ADMINISTRATION",
        replace: "基本管理"
    },
    {
        file: 'resources/views/layouts/admin.blade.php',
        search: "Overview",
        replace: "概要"
    },
    {
        file: 'resources/views/layouts/admin.blade.php',
        search: "Settings",
        replace: "設定"
    },
    {
        file: 'resources/views/layouts/admin.blade.php',
        search: "Application API",
        replace: "アプリケーションAPI"
    },
    {
        file: 'resources/views/layouts/admin.blade.php',
        search: "MANAGEMENT",
        replace: "管理"
    },
    {
        file: 'resources/views/layouts/admin.blade.php',
        search: "Databases",
        replace: "データベース"
    },
    {
        file: 'resources/views/layouts/admin.blade.php',
        search: "Locations",
        replace: "ロケーション"
    },
    {
        file: 'resources/views/layouts/admin.blade.php',
        search: "Nodes",
        replace: "ノード"
    },
    {
        file: 'resources/views/layouts/admin.blade.php',
        search: "Servers",
        replace: "サーバー"
    },
    {
        file: 'resources/views/layouts/admin.blade.php',
        search: "Users",
        replace: "ユーザー"
    },
    {
        file: 'resources/views/layouts/admin.blade.php',
        search: "SERVICE MANAGEMENT",
        replace: "サービス管理"
    },
    {
        file: 'resources/views/layouts/admin.blade.php',
        search: "Mounts",
        replace: "マウント"
    },
    {
        file: 'resources/views/layouts/admin.blade.php',
        search: "Nests",
        replace: "ネスト"
    },
    {
        file: 'resources/views/layouts/admin.blade.php',
        search: "Exit Admin Control",
        replace: "管理者画面を終了"
    },
    {
        file: 'resources/views/layouts/admin.blade.php',
        search: "Logout",
        replace: "ログアウト"
    },
    {
        file: 'resources/views/layouts/admin.blade.php',
        search: "Do you want to log out?",
        replace: "ログアウトしますか？"
    },
    {
        file: 'resources/views/layouts/admin.blade.php',
        search: "Log out",
        replace: "ログアウト"
    },
    {
        file: 'resources/views/admin/nests/index.blade.php',
        search: "All nests currently available on this system.",
        replace: "システムで現在利用可能なすべてのネスト。"
    },
    {
        file: 'resources/views/admin/nests/index.blade.php',
        search: "Configured Nests",
        replace: "構成済みのネスト"
    },
    {
        file: 'resources/views/admin/nests/index.blade.php',
        search: "Import Egg",
        replace: "Eggをインポート"
    },
    {
        file: 'resources/views/admin/nests/index.blade.php',
        search: "Create New",
        replace: "新規作成"
    },
    {
        file: 'resources/views/admin/nests/index.blade.php',
        search: "Eggs are a powerful feature of Pterodactyl Panel that allow for extreme flexibility and configuration. Please note that while powerful, modifying an egg wrongly can very easily brick your servers and cause more problems. Please avoid editing our default eggs — those provided by <code>support@pterodactyl.io</code> — unless you are absolutely sure of what you are doing.",
        replace: "Eggは、極めて高い柔軟性と構成を可能にするPterodactyl Panelの強力な機能です。強力ではありますが、Eggを誤って変更すると、サーバーが破損し、多くの問題が発生する可能性があることに注意してください。自分が何をしているのか完全に確信がない限り、デフォルトのEgg（<code>support@pterodactyl.io</code>によって提供されるもの）を編集することは避けてください。"
    },
    {
        file: 'resources/views/admin/nests/index.blade.php',
        search: "Import an Egg",
        replace: "Eggをインポート"
    },
    {
        file: 'resources/views/admin/nests/index.blade.php',
        search: "Egg File",
        replace: "Eggファイル"
    },
    {
        file: 'resources/views/admin/nests/index.blade.php',
        search: "Select the <code>.json</code> file for the new egg that you wish to import.",
        replace: "インポートしたい新規Eggの <code>.json</code> ファイルを選択してください。"
    },
    {
        file: 'resources/views/admin/nests/index.blade.php',
        search: "Associated Nest",
        replace: "関連ネスト"
    },
    {
        file: 'resources/views/admin/nests/index.blade.php',
        search: "Select the nest that this egg will be associated with from the dropdown. If you wish to associate it with a new nest you will need to create that nest before continuing.",
        replace: "このEggに関連付けるネストをドロップダウンから選択してください。新しいネストに関連付ける場合は、続行する前にそのネストを作成する必要があります。"
    },
    {
        file: 'resources/views/admin/nests/new.blade.php',
        search: "New Nest",
        replace: "新規ネスト"
    },
    {
        file: 'resources/views/admin/nests/new.blade.php',
        search: "Configure a new nest to deploy to all nodes.",
        replace: "すべてのノードにデプロイする新しいネストを構成します。"
    },
    {
        file: 'resources/views/admin/nests/new.blade.php',
        search: "This should be a descriptive category name that encompasses all of the eggs within the nest.",
        replace: "これは、ネスト内のすべてのEggを包含する説明的なカテゴリ名である必要があります。"
    },
    {
        file: 'resources/views/admin/nests/view.blade.php',
        search: "This should be a descriptive category name that encompasses all of the options within the service.",
        replace: "これは、サービス内のすべてのオプションを包含する説明的なカテゴリ名である必要があります。"
    },
    {
        file: 'resources/views/admin/nests/view.blade.php',
        search: "Nest ID",
        replace: "ネストID"
    },
    {
        file: 'resources/views/admin/nests/view.blade.php',
        search: "A unique ID used for identification of this nest internally and through the API.",
        replace: "内部およびAPIを通じてこのネストを一意に識別するために使用されるID。"
    },
    {
        file: 'resources/views/admin/nests/view.blade.php',
        search: "The author of this service option. Please direct questions and issues to them unless this is an official option authored by <code>support@pterodactyl.io</code>.",
        replace: "このサービスオプションの作成者。これが<code>support@pterodactyl.io</code>によって作成された公式オプションでない限り、質問や問題は作成者に直接お問い合わせください。"
    },
    {
        file: 'resources/views/admin/nests/view.blade.php',
        search: "A UUID that all servers using this option are assigned for identification purposes.",
        replace: "識別目的でこのオプションを使用するすべてのサーバーに割り当てられるUUID。"
    },
    {
        file: 'resources/views/admin/nests/view.blade.php',
        search: "Nest Eggs",
        replace: "ネストのEgg"
    },
    {
        file: 'resources/views/admin/nests/view.blade.php',
        search: "New Egg",
        replace: "新規Egg"
    },
    {
        file: 'resources/views/admin/nests/view.blade.php',
        search: " Delete Nest",
        replace: " ネストを削除"
    },
    {
        file: 'resources/views/admin/nodes/new.blade.php',
        regex: /Label for="pProxyTrue">\s*Behind Proxy\s*<\/label>/,
        replace: 'label for="pProxyTrue"> プロキシ配下 </label>'
    },
    {
        file: 'resources/views/admin/nodes/new.blade.php',
        search: "Configuration",
        replace: "設定"
    },
    {
        file: 'resources/views/admin/nodes/new.blade.php',
        search: "Daemon Server File Directory",
        replace: "Daemon サーバーファイルディレクトリ"
    },
    {
        file: 'resources/views/admin/nodes/new.blade.php',
        search: "Total Memory",
        replace: "合計メモリ"
    },
    {
        file: 'resources/views/admin/nodes/new.blade.php',
        search: "Memory Over-Allocation",
        replace: "メモリのオーバーアロケーション"
    },
    {
        file: 'resources/views/admin/nodes/new.blade.php',
        search: "Total Disk Space",
        replace: "合計ディスク容量"
    },
    {
        file: 'resources/views/admin/nodes/new.blade.php',
        search: "Disk Over-Allocation",
        replace: "ディスクのオーバーアロケーション"
    },
    {
        file: 'resources/views/admin/nodes/new.blade.php',
        search: "Daemon Port",
        replace: "Daemon ポート"
    },
    {
        file: 'resources/views/admin/nodes/new.blade.php',
        search: "Daemon SFTP Port",
        replace: "Daemon SFTP ポート"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "Configure your node settings.",
        replace: "ノードの設定を構成します。"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "Node Name",
        replace: "ノード名"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        regex: /Character limits: <code>a-zA-Z0-9_\.-<\/code> and <code>\[Space\]<\/code> \(min 1, max 100 characters\)./,
        replace: "文字制限: <code>a-zA-Z0-9_.-</code> および <code>[Space]</code> (最小1文字、最大100文字)。"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "Description",
        replace: "説明"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "Location",
        replace: "ロケーション"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        regex: /Allow Automatic Allocation <sup><a data-toggle="tooltip" data-placement="top" title="Allow automatic allocation to this Node\?">\?<\/a><\/sup>/,
        replace: '自動割り当てを許可 <sup><a data-toggle="tooltip" data-placement="top" title="このノードへの自動割り当てを許可しますか？">?</a></sup>'
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "Fully Qualified Domain Name",
        replace: "完全修飾ドメイン名 (FQDN)"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        regex: /Please enter domain name \(e.g <code>node.example.com<\/code>\) to be used for connecting to the daemon. An IP address may only be used <em>only<\/em> if you are not using SSL for this node./,
        replace: "デーモンへの接続に使用するドメイン名（例: <code>node.example.com</code>）を入力してください。SSLを使用しない場合のみ、IPアドレスを使用できます。"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "Why do I need a FQDN?",
        replace: "なぜFQDNが必要なのですか？"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "In order to secure communications between your server and this node we use SSL. We cannot generate a SSL certificate for IP Addresses, and as such you will need to provide a FQDN.",
        replace: "サーバーとこのノード間の通信を保護するためにSSLを使用します。IPアドレスに対してSSL証明書を生成することはできないため、FQDNを提供する必要があります。"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "Communicate Over SSL",
        replace: "SSL通信"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "Use SSL Connection",
        replace: "SSL接続を使用"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "Use HTTP Connection",
        replace: "HTTP接続を使用"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "In most cases you should select to use a SSL connection. If using an IP Address or you do not wish to use SSL at all, select a HTTP connection.",
        replace: "ほとんどの場合、SSL接続を選択する必要があります。IPアドレスを使用する場合や、SSLを使用したくない場合は、HTTP接続を選択してください。"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "Not Behind Proxy",
        replace: "プロキシ配下ではない"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        regex: /Behind Proxy\s*<\/label>/,
        replace: "プロキシ配下 </label>"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "If you are running the daemon behind a proxy such as Cloudflare, select this to have the daemon skip looking for certificates on boot.",
        replace: "Cloudflareなどのプロキシ配下でデーモンを実行している場合は、これを選択して、起動時にデーモンが証明書を探さないようにします。"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "Maintenance Mode",
        replace: "メンテナンスモード"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: " Disabled",
        replace: " 無効"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: " Enabled",
        replace: " 有効"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "If the node is marked as 'Under Maintenance' users won't be able to access servers that are on this node.",
        replace: "ノードが「メンテナンス中」としてマークされている場合、ユーザーはこのノード上のサーバーにアクセスできなくなります。"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "Allocation Limits",
        replace: "割り当て制限"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "Total Memory",
        replace: "合計メモリ"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "Overallocate",
        replace: "オーバーアロケーション"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "Enter the total amount of memory available on this node for allocation to servers. You may also provide a percentage that can allow allocation of more than the defined memory.",
        replace: "このノードでサーバーへの割り当てに使用できる合計メモリを入力します。定義されたメモリ以上の割り当てを許可する割合を指定することもできます。"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "Disk Space",
        replace: "ディスク容量"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "Enter the total amount of disk space available on this node for server allocation. You may also provide a percentage that will determine the amount of disk space over the set limit to allow.",
        replace: "このノードでサーバーの割り当てに使用できる合計ディスク容量を入力します。許可する制限を超えるディスク容量の量を決定する割合を指定することもできます。"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "General Configuration",
        replace: "一般設定"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "Maximum Web Upload Filesize",
        replace: "最大Webアップロードファイルサイズ"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "Enter the maximum size of files that can be uploaded through the web-based file manager.",
        replace: "Webベースのファイルマネージャーを介してアップロードできるファイルの最大サイズを入力します。"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "Daemon Port",
        replace: "Daemon ポート"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "Daemon SFTP Port",
        replace: "Daemon SFTP ポート"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "The daemon runs its own SFTP management container and does not use the SSHd process on the main physical server.",
        replace: "デーモンは独自のSFTP管理コンテナを実行し、メインの物理サーバー上のSSHdプロセスを使用しません。"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "Do not use the same port that you have assigned for your physical server's SSH process.",
        replace: "物理サーバーのSSHプロセスに割り当てたポートと同じポートを使用しないでください。"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "Save Settings",
        replace: "設定を保存"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "Reset Daemon Master Key",
        replace: "Daemonマスターキーをリセット"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: "Resetting the daemon master key will void any request coming from the old key. This key is used for all sensitive operations on the daemon including server creation and deletion. We suggest changing this key regularly for security.",
        replace: "デーモンマスターキーをリセットすると、古いキーからのリクエストは無効になります。このキーは、サーバーの作成や削除など、デーモン上のすべての機密操作に使用されます。セキュリティのために、定期的にこのキーを変更することをお勧めします。"
    },
    {
        file: 'resources/views/admin/nodes/view/index.blade.php',
        search: "A quick overview of your node.",
        replace: "ノードの概要です。"
    },
    {
        file: 'resources/views/admin/nodes/view/index.blade.php',
        regex: /<h3 class="box-title">Information<\/h3>/,
        replace: '<h3 class="box-title">情報</h3>'
    },
    {
        file: 'resources/views/admin/nodes/view/index.blade.php',
        search: "Daemon Version",
        replace: "Daemon バージョン"
    },
    {
        file: 'resources/views/admin/nodes/view/index.blade.php',
        search: "(Latest:",
        replace: "(最新:"
    },
    {
        file: 'resources/views/admin/nodes/view/index.blade.php',
        search: "System Information",
        replace: "システム情報"
    },
    {
        file: 'resources/views/admin/nodes/view/index.blade.php',
        search: "Total CPU Threads",
        replace: "合計CPUスレッド数"
    },
    {
        file: 'resources/views/admin/nodes/view/index.blade.php',
        regex: /<div class="box-header with-border">\s*Description\s*<\/div>/,
        replace: '<div class="box-header with-border"> 説明 </div>'
    },
    {
        file: 'resources/views/admin/nodes/view/index.blade.php',
        search: "Delete Node",
        replace: "ノードを削除"
    },
    {
        file: 'resources/views/admin/nodes/view/index.blade.php',
        search: "Deleting a node is a irreversible action and will immediately remove this node from the panel. There must be no servers associated with this node in order to continue.",
        replace: "ノードの削除は取り消せない操作であり、パネルからこのノードが即座に削除されます。続行するには、このノードに関連付けられているサーバーがない必要があります。"
    },
    {
        file: 'resources/views/admin/nodes/view/index.blade.php',
        search: "Yes, Delete This Node",
        replace: "はい、このノードを削除します"
    },
    {
        file: 'resources/views/admin/nodes/view/index.blade.php',
        search: "At-a-Glance",
        replace: "概要"
    },
    {
        file: 'resources/views/admin/nodes/view/index.blade.php',
        search: "This node is under",
        replace: "このノードは現在"
    },
    {
        file: 'resources/views/admin/nodes/view/index.blade.php',
        search: "Maintenance",
        replace: "メンテナンス中"
    },
    {
        file: 'resources/views/admin/nodes/view/index.blade.php',
        search: "Disk Space Allocated",
        replace: "割り当て済みディスク容量"
    },
    {
        file: 'resources/views/admin/nodes/view/index.blade.php',
        search: "Memory Allocated",
        replace: "割り当て済みメモリ"
    },
    {
        file: 'resources/views/admin/nodes/view/configuration.blade.php',
        search: "Your daemon configuration file.",
        replace: "Daemon設定ファイルです。"
    },
    {
        file: 'resources/views/admin/nodes/view/configuration.blade.php',
        search: "Configuration File",
        replace: "設定ファイル"
    },
    {
        file: 'resources/views/admin/nodes/view/configuration.blade.php',
        search: "This file should be placed in your daemon's root directory (usually <code>/etc/pterodactyl</code>) in a file called <code>config.yml</code>.",
        replace: "このファイルは、daemonのルートディレクトリ（通常は<code>/etc/pterodactyl</code>）に<code>config.yml</code>というファイル名で配置する必要があります。"
    },
    {
        file: 'resources/views/admin/nodes/view/configuration.blade.php',
        search: "Auto-Deploy",
        replace: "自動デプロイ"
    },
    {
        file: 'resources/views/admin/nodes/view/configuration.blade.php',
        search: "Use the button below to generate a custom deployment command that can be used to configure",
        replace: "下のボタンを使用して、ターゲットサーバー上でwingsを単一のコマンドで構成するための"
    },
    {
        file: 'resources/views/admin/nodes/view/configuration.blade.php',
        search: "wings on the target server with a single command.",
        replace: "カスタムデプロイコマンドを生成できます。"
    },
    {
        file: 'resources/views/admin/nodes/view/configuration.blade.php',
        search: "Generate Token",
        replace: "トークンを生成"
    },
    {
        file: 'resources/views/admin/nodes/view/configuration.blade.php',
        search: "Token created.",
        replace: "トークンが作成されました。"
    },
    {
        file: 'resources/views/admin/nodes/view/configuration.blade.php',
        search: "To auto-configure your node run the following command:",
        replace: "ノードを自動構成するには、次のコマンドを実行します:"
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        search: "Control allocations available for servers on this node.",
        replace: "このノード上のサーバーで使用可能な割り当てを制御します。"
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        regex: /<li class="active">Allocations<\/li>/,
        replace: '<li class="active">割り当て</li>'
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        search: "Existing Allocations",
        replace: "既存の割り当て"
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        search: "IP Address <i",
        replace: "IPアドレス <i"
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        search: "IP Alias",
        replace: "IPエイリアス"
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        search: "Port",
        replace: "ポート"
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        search: "Assigned To",
        replace: "割り当て先"
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        search: "Mass Actions",
        replace: "一括操作"
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        search: "Delete <i",
        replace: "削除 <i"
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        search: "Assign New Allocations",
        replace: "新しい割り当てを追加"
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        search: "Enter an IP address to assign ports to here.",
        replace: "ポートを割り当てるIPアドレスをここに入力します。"
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        search: "If you would like to assign a default alias to these allocations enter it here.",
        replace: "これらの割り当てにデフォルトのエイリアスを割り当てる場合は、ここに入力します。"
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        search: "Enter individual ports or port ranges here separated by commas or spaces.",
        replace: "個別のポートまたはポート範囲を、コンマまたはスペースで区切ってここに入力します。"
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        search: ">Submit</button>",
        replace: ">送信</button>"
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        search: "Delete Allocations for IP Block",
        replace: "IPブロックの割り当てを削除"
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        search: "Delete Allocations</button>",
        replace: "割り当てを削除</button>"
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        search: "Are you sure you want to delete this allocation?",
        replace: "この割り当てを削除してもよろしいですか？"
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        search: "Port Deleted!",
        replace: "ポートが削除されました！"
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        search: "Whoops!",
        replace: "おっと！"
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        search: "Are you sure you want to delete the following allocations:",
        replace: "次の割り当てを削除してもよろしいですか:"
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        search: "Allocations Deleted",
        replace: "割り当てが削除されました"
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        search: "An error occurred while attempting to delete these allocations. Please try again.",
        replace: "割り当ての削除中にエラーが発生しました。もう一度お試しください。"
    },
    {
        file: 'resources/views/admin/nodes/view/servers.blade.php',
        search: "All servers currently assigned to this node.",
        replace: "現在このノードに割り当てられているすべてのサーバー。"
    },
    {
        file: 'resources/views/admin/nodes/view/servers.blade.php',
        search: "Server Name",
        replace: "サーバー名"
    },
    {
        file: 'resources/views/admin/nodes/view/servers.blade.php',
        search: "Service",
        replace: "サービス"
    },
    {
        file: 'resources/views/admin/nodes/view/index.blade.php',
        search: ">About</a>",
        replace: ">概要</a>"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: ">About</a>",
        replace: ">概要</a>"
    },
    {
        file: 'resources/views/admin/nodes/view/configuration.blade.php',
        search: ">About</a>",
        replace: ">概要</a>"
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        search: ">About</a>",
        replace: ">概要</a>"
    },
    {
        file: 'resources/views/admin/nodes/view/servers.blade.php',
        search: ">About</a>",
        replace: ">概要</a>"
    },
    {
        file: 'resources/views/admin/nodes/view/index.blade.php',
        search: ">Settings</a>",
        replace: ">設定</a>"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: ">Settings</a>",
        replace: ">設定</a>"
    },
    {
        file: 'resources/views/admin/nodes/view/configuration.blade.php',
        search: ">Settings</a>",
        replace: ">設定</a>"
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        search: ">Settings</a>",
        replace: ">設定</a>"
    },
    {
        file: 'resources/views/admin/nodes/view/servers.blade.php',
        search: ">Settings</a>",
        replace: ">設定</a>"
    },
    {
        file: 'resources/views/admin/nodes/view/index.blade.php',
        search: ">Configuration</a>",
        replace: ">構成</a>"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: ">Configuration</a>",
        replace: ">構成</a>"
    },
    {
        file: 'resources/views/admin/nodes/view/configuration.blade.php',
        search: ">Configuration</a>",
        replace: ">構成</a>"
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        search: ">Configuration</a>",
        replace: ">構成</a>"
    },
    {
        file: 'resources/views/admin/nodes/view/servers.blade.php',
        search: ">Configuration</a>",
        replace: ">構成</a>"
    },
    {
        file: 'resources/views/admin/nodes/view/index.blade.php',
        search: ">Allocation</a>",
        replace: ">割り当て</a>"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: ">Allocation</a>",
        replace: ">割り当て</a>"
    },
    {
        file: 'resources/views/admin/nodes/view/configuration.blade.php',
        search: ">Allocation</a>",
        replace: ">割り当て</a>"
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        search: ">Allocation</a>",
        replace: ">割り当て</a>"
    },
    {
        file: 'resources/views/admin/nodes/view/servers.blade.php',
        search: ">Allocation</a>",
        replace: ">割り当て</a>"
    },
    {
        file: 'resources/views/admin/nodes/view/index.blade.php',
        search: ">Servers</a>",
        replace: ">サーバー</a>"
    },
    {
        file: 'resources/views/admin/nodes/view/settings.blade.php',
        search: ">Servers</a>",
        replace: ">サーバー</a>"
    },
    {
        file: 'resources/views/admin/nodes/view/configuration.blade.php',
        search: ">Servers</a>",
        replace: ">サーバー</a>"
    },
    {
        file: 'resources/views/admin/nodes/view/allocation.blade.php',
        search: ">Servers</a>",
        replace: ">サーバー</a>"
    },
    {
        file: 'resources/views/admin/nodes/view/servers.blade.php',
        search: ">Servers</a>",
        replace: ">サーバー</a>"
    },
    {
        file: 'resources/views/admin/nodes/new.blade.php',
        regex: />Create Node<\/button>/,
        replace: ">ノード作成</button>"
    },
    {
        file: 'resources/views/admin/servers/index.blade.php',
        search: "All servers currently available on this system.",
        replace: "システム上で利用可能な全サーバー。"
    },
    {
        file: 'resources/views/admin/servers/index.blade.php',
        search: "Create New",
        replace: "新規作成"
    },
    {
        file: 'resources/views/admin/servers/index.blade.php',
        search: "Server Name",
        replace: "サーバー名"
    },
    {
        file: 'resources/views/admin/servers/index.blade.php',
        search: "Owner",
        replace: "所有者"
    },
    {
        file: 'resources/views/admin/servers/index.blade.php',
        search: "Connection",
        replace: "接続"
    },
    {
        file: 'resources/views/admin/servers/index.blade.php',
        search: "Suspended",
        replace: "凍結中"
    },
    {
        file: 'resources/views/admin/servers/index.blade.php',
        search: "Installing",
        replace: "インストール中"
    },
    {
        file: 'resources/views/admin/servers/index.blade.php',
        search: "Install Failed",
        replace: "インストール失敗"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Create Server",
        replace: "サーバー作成"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Add a new server to the panel.",
        replace: "パネルに新しいサーバーを追加します。"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Core Details",
        replace: "基本詳細"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Server Name",
        replace: "サーバー名"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Server Owner",
        replace: "サーバー所有者"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Server Description",
        replace: "サーバー説明"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Start Server when Installed",
        replace: "インストール完了時にサーバーを起動"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Allocation Management",
        replace: "割り当て管理"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Default Allocation",
        replace: "デフォルトの割り当て"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Additional Allocation(s)",
        replace: "追加の割り当て"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Application Feature Limits",
        replace: "アプリケーション機能制限"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Database Limit",
        replace: "データベース制限"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Allocation Limit",
        replace: "割り当て制限"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Backup Limit",
        replace: "バックアップ制限"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Resource Management",
        replace: "リソース管理"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "CPU Limit",
        replace: "CPU制限"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "CPU Pinning",
        replace: "CPUピン留め"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Memory",
        replace: "メモリ"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Swap",
        replace: "スワップ"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Disk Space",
        replace: "ディスク容量"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Block IO Weight",
        replace: "ブロックIOウェイト"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Enable OOM Killer",
        replace: "OOM Killerを有効化"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Nest Configuration",
        replace: "ネスト構成"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Skip Egg Install Script",
        replace: "Eggインストールスクリプトをスキップ"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Docker Configuration",
        replace: "Docker構成"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Docker Image",
        replace: "Dockerイメージ"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Startup Configuration",
        replace: "スタートアップ構成"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Startup Command",
        replace: "スタートアップコマンド"
    },
    {
        file: 'resources/views/admin/servers/new.blade.php',
        search: "Service Variables",
        replace: "サービス変数"
    },
    {
        file: 'resources/views/admin/servers/partials/navigation.blade.php',
        search: ">About<",
        replace: ">概要<"
    },
    {
        file: 'resources/views/admin/servers/partials/navigation.blade.php',
        search: ">Details<",
        replace: ">詳細<"
    },
    {
        file: 'resources/views/admin/servers/partials/navigation.blade.php',
        search: ">Build Configuration<",
        replace: ">ビルド構成<"
    },
    {
        file: 'resources/views/admin/servers/partials/navigation.blade.php',
        search: ">Startup<",
        replace: ">スタートアップ<"
    },
    {
        file: 'resources/views/admin/servers/partials/navigation.blade.php',
        search: ">Database<",
        replace: ">データベース<"
    },
    {
        file: 'resources/views/admin/servers/partials/navigation.blade.php',
        search: ">Mounts<",
        replace: ">マウント<"
    },
    {
        file: 'resources/views/admin/servers/partials/navigation.blade.php',
        search: ">Manage<",
        replace: ">管理<"
    },
    {
        file: 'resources/views/admin/servers/partials/navigation.blade.php',
        search: ">Delete<",
        replace: ">削除<"
    },
    {
        file: 'resources/views/admin/servers/view/build.blade.php',
        search: "Build Details",
        replace: "ビルド詳細"
    },
    {
        file: 'resources/views/admin/servers/view/build.blade.php',
        search: "Resource Management",
        replace: "リソース管理"
    },
    {
        file: 'resources/views/admin/servers/view/build.blade.php',
        search: "Disk Space Limit",
        replace: "ディスク容量制限"
    },
    {
        file: 'resources/views/admin/servers/view/build.blade.php',
        search: "Allocated Memory",
        replace: "割り当てメモリ"
    },
    {
        file: 'resources/views/admin/servers/view/build.blade.php',
        search: "Allocated Swap",
        replace: "割り当てスワップ"
    },
    {
        file: 'resources/views/admin/servers/view/build.blade.php',
        search: "Block IO Proportion",
        replace: "ブロックIO比率"
    },
    {
        file: 'resources/views/admin/servers/view/build.blade.php',
        search: "Update Build Configuration",
        replace: "ビルド構成を更新"
    },
    {
        file: 'resources/views/admin/servers/view/manage.blade.php',
        search: "Additional actions to control this server.",
        replace: "このサーバーを制御するための追加操作。"
    },
    {
        file: 'resources/views/admin/servers/view/manage.blade.php',
        search: "Reinstall Server",
        replace: "サーバー再インストール"
    },
    {
        file: 'resources/views/admin/servers/view/manage.blade.php',
        search: "Install Status",
        replace: "インストールステータス"
    },
    {
        file: 'resources/views/admin/servers/view/manage.blade.php',
        search: "Toggle Install Status",
        replace: "インストールステータス切り替え"
    },
    {
        file: 'resources/views/admin/servers/view/manage.blade.php',
        search: "Suspend Server",
        replace: "サーバー凍結"
    },
    {
        file: 'resources/views/admin/servers/view/manage.blade.php',
        search: "Unsuspend Server",
        replace: "サーバー凍結解除"
    },
    {
        file: 'resources/views/admin/servers/view/manage.blade.php',
        search: "Transfer Server",
        replace: "サーバー転送"
    },
    {
        file: 'resources/views/admin/servers/view/delete.blade.php',
        search: "Delete this server from the panel.",
        replace: "パネルからこのサーバーを削除します。"
    },
    {
        file: 'resources/views/admin/servers/view/delete.blade.php',
        search: "Safely Delete Server",
        replace: "サーバーを安全に削除"
    },
    {
        file: 'resources/views/admin/servers/view/delete.blade.php',
        search: "Safely Delete This Server",
        replace: "このサーバーを安全に削除"
    },
    {
        file: 'resources/views/admin/servers/view/delete.blade.php',
        search: "Force Delete Server",
        replace: "サーバーを強制削除"
    },
    {
        file: 'resources/views/admin/servers/view/delete.blade.php',
        search: "Forcibly Delete This Server",
        replace: "このサーバーを強制削除"
    },
    {
        file: 'resources/views/admin/servers/view/index.blade.php',
        search: "Install Failed",
        replace: "インストール失敗"
    },
    {
        file: 'resources/views/admin/servers/view/manage.blade.php',
        search: "Toggle インストールステータス",
        replace: "インストールステータス切り替え"
    },
    {
        file: 'resources/views/admin/users/index.blade.php',
        search: "All users registered on the system.",
        replace: "システムに登録されている全ユーザー。"
    },
    {
        file: 'resources/views/admin/users/index.blade.php',
        search: "Create New",
        replace: "新規作成"
    },
    {
        file: 'resources/views/admin/users/index.blade.php',
        search: "Client Name",
        replace: "クライアント名"
    },
    {
        file: 'resources/views/admin/users/index.blade.php',
        search: "Username",
        replace: "ユーザー名"
    },
    {
        file: 'resources/views/admin/users/index.blade.php',
        search: "Owned Servers",
        replace: "所有サーバー"
    },
    {
        file: 'resources/views/admin/users/index.blade.php',
        search: "Servers that this user is marked as the owner of.",
        replace: "このユーザーが所有者として設定されているサーバー。"
    },
    {
        file: 'resources/views/admin/users/index.blade.php',
        search: "Can Access",
        replace: "アクセス可能"
    },
    {
        file: 'resources/views/admin/users/index.blade.php',
        search: "Servers that this user can access because they are marked as a subuser.",
        replace: "このユーザーがサブユーザーとして設定されているサーバー。"
    },
    {
        file: 'resources/views/admin/users/new.blade.php',
        search: "Create User",
        replace: "ユーザー作成"
    },
    {
        file: 'resources/views/admin/users/new.blade.php',
        search: "Add a new user to the system.",
        replace: "システムに新しいユーザーを追加します。"
    },
    {
        file: 'resources/views/admin/users/new.blade.php',
        search: "Identity",
        replace: "ID情報"
    },
    {
        file: 'resources/views/admin/users/new.blade.php',
        search: "Client First Name",
        replace: "名 (First Name)"
    },
    {
        file: 'resources/views/admin/users/new.blade.php',
        search: "Client Last Name",
        replace: "姓 (Last Name)"
    },
    {
        file: 'resources/views/admin/users/new.blade.php',
        search: "Default Language",
        replace: "デフォルト言語"
    },
    {
        file: 'resources/views/admin/users/new.blade.php',
        search: "The default language to use when rendering the Panel for this user.",
        replace: "このユーザーのパネル表示に使用するデフォルト言語。"
    },
    {
        file: 'resources/views/admin/users/new.blade.php',
        search: "Permissions",
        replace: "権限"
    },
    {
        file: 'resources/views/admin/users/new.blade.php',
        search: "Administrator",
        replace: "管理者"
    },
    {
        file: 'resources/views/admin/users/new.blade.php',
        search: "Setting this to 'Yes' gives a user full administrative access.",
        replace: "「はい」に設定すると、ユーザーに完全な管理者権限が付与されます。"
    },
    {
        file: 'resources/views/admin/users/new.blade.php',
        search: "Password",
        replace: "パスワード"
    },
    {
        file: 'resources/views/admin/users/new.blade.php',
        search: "Providing a user password is optional. New user emails prompt users to create a password the first time they login. If a password is provided here you will need to find a different method of providing it to the user.",
        replace: "ユーザーパスワードの設定は任意です。新規ユーザーメールは、初回ログイン時にパスワードの作成をユーザーに求めます。ここでパスワードを設定する場合は、別の方法でユーザーに通知する必要があります。"
    },
    {
        file: 'resources/views/admin/users/view.blade.php',
        search: "Manage User",
        replace: "ユーザー管理"
    },
    {
        file: 'resources/views/admin/users/view.blade.php',
        search: "Identity",
        replace: "ID情報"
    },
    {
        file: 'resources/views/admin/users/view.blade.php',
        search: "Client First Name",
        replace: "名 (First Name)"
    },
    {
        file: 'resources/views/admin/users/view.blade.php',
        search: "Client Last Name",
        replace: "姓 (Last Name)"
    },
    {
        file: 'resources/views/admin/users/view.blade.php',
        search: "Default Language",
        replace: "デフォルト言語"
    },
    {
        file: 'resources/views/admin/users/view.blade.php',
        search: "The default language to use when rendering the Panel for this user.",
        replace: "このユーザーのパネル表示に使用するデフォルト言語。"
    },
    {
        file: 'resources/views/admin/users/view.blade.php',
        search: "Update User",
        replace: "ユーザー更新"
    },
    {
        file: 'resources/views/admin/users/view.blade.php',
        search: "Permissions",
        replace: "権限"
    },
    {
        file: 'resources/views/admin/users/view.blade.php',
        search: "Administrator",
        replace: "管理者"
    },
    {
        file: 'resources/views/admin/users/view.blade.php',
        search: "Setting this to 'Yes' gives a user full administrative access.",
        replace: "「はい」に設定すると、ユーザーに完全な管理者権限が付与されます。"
    },
    {
        file: 'resources/views/admin/users/view.blade.php',
        search: "Password",
        replace: "パスワード"
    },
    {
        file: 'resources/views/admin/users/view.blade.php',
        search: "Leave blank to keep this user's password the same. User will not receive any notification if password is changed.",
        replace: "パスワードを変更しない場合は空白のままにしてください。変更してもユーザーには通知されません。"
    },
    {
        file: 'resources/views/admin/users/view.blade.php',
        search: "Delete User",
        replace: "ユーザー削除"
    },
    {
        file: 'resources/views/admin/users/view.blade.php',
        search: "There must be no servers associated with this account in order for it to be deleted.",
        replace: "このアカウントを削除するには、アカウントに関連付けられているサーバーがない必要があります。"
    },
    {
        file: 'resources/views/admin/locations/index.blade.php',
        search: "All locations that nodes can be assigned to for easier categorization.",
        replace: "ノードを分類しやすくするために割り当てることができるすべてのロケーション。"
    },
    {
        file: 'resources/views/admin/locations/index.blade.php',
        search: "Location List",
        replace: "ロケーション一覧"
    },
    {
        file: 'resources/views/admin/locations/index.blade.php',
        search: "Create New",
        replace: "新規作成"
    },
    {
        file: 'resources/views/admin/locations/index.blade.php',
        search: "Short Code",
        replace: "ショートコード"
    },
    {
        file: 'resources/views/admin/locations/index.blade.php',
        search: "Description",
        replace: "説明"
    },
    {
        file: 'resources/views/admin/locations/index.blade.php',
        search: "Create Location",
        replace: "ロケーション作成"
    },
    {
        file: 'resources/views/admin/locations/index.blade.php',
        search: "A short identifier used to distinguish this location from others. Must be between 1 and 60 characters, for example, <code>us.nyc.lvl3</code>.",
        replace: "他のロケーションと区別するための短い識別子です。1〜60文字である必要があります。例：<code>us.nyc.lvl3</code>。"
    },
    {
        file: 'resources/views/admin/locations/index.blade.php',
        search: "A longer description of this location. Must be less than 191 characters.",
        replace: "このロケーションの詳細な説明。191文字以下である必要があります。"
    },
    {
        file: 'resources/views/admin/locations/view.blade.php',
        search: "Location Details",
        replace: "ロケーション詳細"
    },
    {
        file: 'resources/views/admin/locations/view.blade.php',
        search: "Short Code",
        replace: "ショートコード"
    },
    {
        file: 'resources/views/admin/locations/view.blade.php',
        search: "Description",
        replace: "説明"
    },
    {
        file: 'resources/views/admin/locations/view.blade.php',
        search: "Servers",
        replace: "サーバー"
    },
    // Server View - Index
    {
        file: 'resources/views/admin/servers/view/index.blade.php',
        search: "Information",
        replace: "情報"
    },
    {
        file: 'resources/views/admin/servers/view/index.blade.php',
        search: "Internal Identifier",
        replace: "内部ID"
    },
    {
        file: 'resources/views/admin/servers/view/index.blade.php',
        search: "External Identifier",
        replace: "外部ID"
    },
    {
        file: 'resources/views/admin/servers/view/index.blade.php',
        search: "UUID / Docker Container ID",
        replace: "UUID / DockerコンテナID"
    },
    {
        file: 'resources/views/admin/servers/view/index.blade.php',
        search: "Current Egg",
        replace: "現在のEgg"
    },
    {
        file: 'resources/views/admin/servers/view/index.blade.php',
        search: "CPU Pinning",
        replace: "CPUピン留め"
    },
    {
        file: 'resources/views/admin/servers/view/index.blade.php',
        search: "Block IO Weight",
        replace: "ブロックIOウェイト"
    },
    {
        file: 'resources/views/admin/servers/view/index.blade.php',
        search: "Default Connection",
        replace: "デフォルト接続"
    },
    {
        file: 'resources/views/admin/servers/view/index.blade.php',
        search: "Connection Alias",
        replace: "接続エイリアス"
    },
    {
        file: 'resources/views/admin/servers/view/index.blade.php',
        search: "No Alias Assigned",
        replace: "エイリアス未割り当て"
    },
    {
        file: 'resources/views/admin/servers/view/index.blade.php',
        search: "More info",
        replace: "詳細情報"
    },
    {
        file: 'resources/views/admin/servers/view/index.blade.php',
        search: "Server Node",
        replace: "サーバーノード"
    },
    // Server View - Build
    {
        file: 'resources/views/admin/servers/view/build.blade.php',
        search: "Control allocations and system resources for this server.",
        replace: "このサーバーの割り当てとシステムリソースを制御します。"
    },
    {
        file: 'resources/views/admin/servers/view/build.blade.php',
        search: "Each <em>virtual</em> core (thread) on the system is considered to be <code>100%</code>. Setting this value to <code>0</code> will allow a server to use CPU time without restrictions.",
        replace: "システムの各<em>仮想</em>コア（スレッド）は<code>100%</code>と見なされます。この値を<code>0</code>に設定すると、サーバーは制限なしでCPU時間を使用できます。"
    },
    {
        file: 'resources/views/admin/servers/view/build.blade.php',
        search: "Enter the specific CPU cores that this process can run on, or leave blank to allow all cores. This can be a single number, or a comma seperated list. Example: <code>0</code>, <code>0-1,3</code>, or <code>0,1,3,4</code>.",
        replace: "このプロセスを実行できる特定のCPUコアを入力するか、空白のままにしてすべてのコアを許可します。単一の数値、またはカンマ区切りのリストを指定できます。例：<code>0</code>、<code>0-1,3</code>、または<code>0,1,3,4</code>。"
    },
    {
        file: 'resources/views/admin/servers/view/build.blade.php',
        search: "The maximum amount of memory allowed for this container. Setting this to <code>0</code> will allow unlimited memory in a container.",
        replace: "このコンテナに許可される最大メモリ容量。これを<code>0</code>に設定すると、コンテナ内のメモリが無制限になります。"
    },
    {
        file: 'resources/views/admin/servers/view/build.blade.php',
        search: "Setting this to <code>0</code> will disable swap space on this server. Setting to <code>-1</code> will allow unlimited swap.",
        replace: "これを<code>0</code>に設定すると、このサーバーのスワップ領域が無効になります。<code>-1</code>に設定すると、スワップが無制限になります。"
    },
    {
        file: 'resources/views/admin/servers/view/build.blade.php',
        search: "This server will not be allowed to boot if it is using more than this amount of space. If a server goes over this limit while running it will be safely stopped and locked until enough space is available. Set to <code>0</code> to allow unlimited disk usage.",
        replace: "この容量を超えて使用している場合、サーバーは起動できません。実行中にこの制限を超えた場合、サーバーは安全に停止され、十分な容量が確保されるまでロックされます。ディスク使用量を無制限にするには<code>0</code>に設定します。"
    },
    {
        file: 'resources/views/admin/servers/view/build.blade.php',
        search: "The IO performance of this server relative to other <em>running</em> containers on the system. Value should be between <code>10</code> and <code>1000</code>.</code>",
        replace: "システム上の他の<em>実行中</em>コンテナに対するこのサーバーのIOパフォーマンス。値は<code>10</code>から<code>1000</code>の間である必要があります。</code>"
    },
    {
        file: 'resources/views/admin/servers/view/build.blade.php',
        search: "Enabling OOM killer may cause server processes to exit unexpectedly.",
        replace: "OOM Killerを有効にすると、サーバープロセスが予期せず終了する可能性があります。"
    },
    {
        file: 'resources/views/admin/servers/view/build.blade.php',
        search: "Application Feature Limits",
        replace: "アプリケーション機能制限"
    },
    {
        file: 'resources/views/admin/servers/view/build.blade.php',
        search: "The total number of databases a user is allowed to create for this server.",
        replace: "ユーザーがこのサーバー用に作成できるデータベースの総数。"
    },
    {
        file: 'resources/views/admin/servers/view/build.blade.php',
        search: "The total number of allocations a user is allowed to create for this server.",
        replace: "ユーザーがこのサーバー用に作成できる割り当ての総数。"
    },
    {
        file: 'resources/views/admin/servers/view/build.blade.php',
        search: "The total number of backups that can be created for this server.",
        replace: "このサーバー用に作成できるバックアップの総数。"
    },
    {
        file: 'resources/views/admin/servers/view/build.blade.php',
        search: "Allocation Management",
        replace: "割り当て管理"
    },
    {
        file: 'resources/views/admin/servers/view/build.blade.php',
        search: "Game Port",
        replace: "ゲームポート"
    },
    {
        file: 'resources/views/admin/servers/view/build.blade.php',
        search: "The default connection address that will be used for this game server.",
        replace: "このゲームサーバーに使用されるデフォルトの接続アドレス。"
    },
    {
        file: 'resources/views/admin/servers/view/build.blade.php',
        search: "Assign Additional Ports",
        replace: "追加ポートの割り当て"
    },
    {
        file: 'resources/views/admin/servers/view/build.blade.php',
        search: "Please note that due to software limitations you cannot assign identical ports on different IPs to the same server.",
        replace: "ソフトウェアの制限により、異なるIP上の同一ポートを同じサーバーに割り当てることはできませんのでご注意ください。"
    },
    {
        file: 'resources/views/admin/servers/view/build.blade.php',
        search: "Remove Additional Ports",
        replace: "追加ポートの削除"
    },
    {
        file: 'resources/views/admin/servers/view/build.blade.php',
        search: "Simply select which ports you would like to remove from the list above. If you want to assign a port on a different IP that is already in use you can select it from the left and delete it here.",
        replace: "上のリストから削除したいポートを選択してください。すでに使用中の別のIP上のポートを割り当てたい場合は、左側から選択してここで削除できます。"
    },
    // Server View - Startup
    {
        file: 'resources/views/admin/servers/view/startup.blade.php',
        search: "Control startup command as well as variables.",
        replace: "起動コマンドと変数を制御します。"
    },
    {
        file: 'resources/views/admin/servers/view/startup.blade.php',
        search: "Startup Command Modification",
        replace: "起動コマンドの変更"
    },
    {
        file: 'resources/views/admin/servers/view/startup.blade.php',
        search: "Edit your server's startup command here. The following variables are available by default:",
        replace: "ここでサーバーの起動コマンドを編集します。デフォルトで以下の変数が利用可能です："
    },
    {
        file: 'resources/views/admin/servers/view/startup.blade.php',
        search: "Default Service Start Command",
        replace: "デフォルトのサービス起動コマンド"
    },
    {
        file: 'resources/views/admin/servers/view/startup.blade.php',
        search: "Save Modifications",
        replace: "変更を保存"
    },
    {
        file: 'resources/views/admin/servers/view/startup.blade.php',
        search: "Service Configuration",
        replace: "サービス構成"
    },
    {
        file: 'resources/views/admin/servers/view/startup.blade.php',
        search: "Changing any of the below values will result in the server processing a re-install command. The server will be stopped and will then proceed.",
        replace: "以下の値を変更すると、サーバーは再インストールコマンドを処理します。サーバーは停止し、その後処理が続行されます。"
    },
    {
        file: 'resources/views/admin/servers/view/startup.blade.php',
        search: "If you would like the service scripts to not run, ensure the box is checked at the bottom.",
        replace: "サービススクリプトを実行したくない場合は、下部のボックスにチェックが入っていることを確認してください。"
    },
    {
        file: 'resources/views/admin/servers/view/startup.blade.php',
        search: "This is a destructive operation in many cases. This server will be stopped immediately in order for this action to proceed.",
        replace: "これは多くの場合、破壊的な操作です。このアクションを実行するため、サーバーは直ちに停止されます。"
    },
    {
        file: 'resources/views/admin/servers/view/startup.blade.php',
        search: "Select the Nest that this server will be grouped into.",
        replace: "このサーバーをグループ化するNestを選択してください。"
    },
    {
        file: 'resources/views/admin/servers/view/startup.blade.php',
        search: "Select the Egg that will provide processing data for this server.",
        replace: "このサーバーの処理データを提供するEggを選択してください。"
    },
    {
        file: 'resources/views/admin/servers/view/startup.blade.php',
        search: "If the selected Egg has an install script attached to it, the script will run during install. If you would like to skip this step, check this box.",
        replace: "選択したEggにインストールスクリプトが添付されている場合、インストール中にスクリプトが実行されます。この手順をスキップしたい場合は、このボックスにチェックを入れてください。"
    },
    {
        file: 'resources/views/admin/servers/view/startup.blade.php',
        search: "Docker Image Configuration",
        replace: "Dockerイメージ構成"
    },
    {
        file: 'resources/views/admin/servers/view/startup.blade.php',
        search: "Or enter a custom image...",
        replace: "またはカスタムイメージを入力..."
    },
    {
        file: 'resources/views/admin/servers/view/startup.blade.php',
        search: "This is the Docker image that will be used to run this server. Select an image from the dropdown or enter a custom image in the text field above.",
        replace: "このサーバーの実行に使用されるDockerイメージです。ドロップダウンからイメージを選択するか、上のテキストフィールドにカスタムイメージを入力してください。"
    },
    // Server View - Database
    {
        file: 'resources/views/admin/servers/view/database.blade.php',
        search: "Manage server databases.",
        replace: "サーバーデータベースを管理します。"
    },
    {
        file: 'resources/views/admin/servers/view/database.blade.php',
        search: "Database passwords can be viewed when <a href=\"/server/{{ $server->uuidShort }}/databases\">visiting this server</a> on the front-end.",
        replace: "データベースのパスワードは、フロントエンドで<a href=\"/server/{{ $server->uuidShort }}/databases\">このサーバーにアクセス</a>すると確認できます。"
    },
    {
        file: 'resources/views/admin/servers/view/database.blade.php',
        search: "Active Databases",
        replace: "アクティブなデータベース"
    },
    {
        file: 'resources/views/admin/servers/view/database.blade.php',
        search: "Connections From",
        replace: "接続元"
    },
    {
        file: 'resources/views/admin/servers/view/database.blade.php',
        search: "Max Connections",
        replace: "最大接続数"
    },
    {
        file: 'resources/views/admin/servers/view/database.blade.php',
        search: "Create New Database",
        replace: "新規データベース作成"
    },
    {
        file: 'resources/views/admin/servers/view/database.blade.php',
        search: "Database Host",
        replace: "データベースホスト"
    },
    {
        file: 'resources/views/admin/servers/view/database.blade.php',
        search: "Select the host database server that this database should be created on.",
        replace: "このデータベースを作成するホストデータベースサーバーを選択してください。"
    },
    {
        file: 'resources/views/admin/servers/view/database.blade.php',
        search: "This should reflect the IP address that connections are allowed from. Uses standard MySQL notation. If unsure leave as <code>%</code>.",
        replace: "接続を許可するIPアドレスを反映させる必要があります。標準のMySQL表記を使用します。不明な場合は<code>%</code>のままにしてください。"
    },
    {
        file: 'resources/views/admin/servers/view/database.blade.php',
        search: "Concurrent Connections",
        replace: "同時接続数"
    },
    {
        file: 'resources/views/admin/servers/view/database.blade.php',
        search: "This should reflect the max number of concurrent connections from this user to the database. Leave empty for unlimited.",
        replace: "このユーザーからデータベースへの最大同時接続数を反映させる必要があります。無制限にする場合は空のままにしてください。"
    },
    {
        file: 'resources/views/admin/servers/view/database.blade.php',
        search: "A username and password for this database will be randomly generated after form submission.",
        replace: "このデータベースのユーザー名とパスワードは、フォーム送信後にランダムに生成されます。"
    },
    {
        file: 'resources/views/admin/servers/view/database.blade.php',
        search: "Create Database",
        replace: "データベース作成"
    },
    // Server View - Mounts
    {
        file: 'resources/views/admin/servers/view/mounts.blade.php',
        search: "Manage server mounts.",
        replace: "サーバーマウントを管理します。"
    },
    {
        file: 'resources/views/admin/servers/view/mounts.blade.php',
        search: "Available Mounts",
        replace: "利用可能なマウント"
    },
    {
        file: 'resources/views/admin/servers/view/mounts.blade.php',
        search: "Source",
        replace: "ソース"
    },
    {
        file: 'resources/views/admin/servers/view/mounts.blade.php',
        search: "Target",
        replace: "ターゲット"
    },
    {
        file: 'resources/views/admin/servers/view/mounts.blade.php',
        search: "Status",
        replace: "ステータス"
    },
    // Server View - Manage
    {
        file: 'resources/views/admin/servers/view/manage.blade.php',
        search: "This will reinstall the server with the assigned service scripts. <strong>Danger!</strong> This could overwrite server data.",
        replace: "割り当てられたサービススクリプトを使用してサーバーを再インストールします。<strong>危険！</strong> これによりサーバーデータが上書きされる可能性があります。"
    },
    {
        file: 'resources/views/admin/servers/view/manage.blade.php',
        search: "Server Must Install Properly to Reinstall",
        replace: "再インストールするにはサーバーが正常にインストールされている必要があります"
    },
    {
        file: 'resources/views/admin/servers/view/manage.blade.php',
        search: "If you need to change the install status from uninstalled to installed, or vice versa, you may do so with the button below.",
        replace: "インストールステータスを「未インストール」から「インストール済み」に、またはその逆に変更する必要がある場合は、下のボタンで行うことができます。"
    },
    {
        file: 'resources/views/admin/servers/view/manage.blade.php',
        search: "This will suspend the server, stop any running processes, and immediately block the user from being able to access their files or otherwise manage the server through the panel or API.",
        replace: "これにより、サーバーが凍結され、実行中のプロセスが停止し、ユーザーがファイルを操作したり、パネルやAPIを通じてサーバーを管理したりすることが即座にブロックされます。"
    },
    {
        file: 'resources/views/admin/servers/view/manage.blade.php',
        search: "This will unsuspend the server and restore normal user access.",
        replace: "これにより、サーバーの凍結が解除され、通常のユーザーアクセスが復元されます。"
    },
    {
        file: 'resources/views/admin/servers/view/manage.blade.php',
        search: "Transfer this server to another node connected to this panel.",
        replace: "このパネルに接続されている別のノードにこのサーバーを転送します。"
    },
    {
        file: 'resources/views/admin/servers/view/manage.blade.php',
        search: "<strong>Warning!</strong> This feature has not been fully tested and may have bugs.",
        replace: "<strong>警告！</strong> この機能は完全にはテストされておらず、バグがある可能性があります。"
    },
    {
        file: 'resources/views/admin/servers/view/manage.blade.php',
        search: "Transferring a server requires more than one node to be configured on your panel.",
        replace: "サーバーを転送するには、パネルで複数のノードが構成されている必要があります。"
    },
    {
        file: 'resources/views/admin/servers/view/manage.blade.php',
        search: "This server is currently being transferred to another node.",
        replace: "このサーバーは現在、別のノードへ転送中です。"
    },
    {
        file: 'resources/views/admin/servers/view/manage.blade.php',
        search: "Transfer was initiated at <strong>{{ $server->transfer->created_at }}</strong>",
        replace: "転送開始日時：<strong>{{ $server->transfer->created_at }}</strong>"
    },
    {
        file: 'resources/views/admin/servers/view/manage.blade.php',
        search: "The node which this server will be transferred to.",
        replace: "このサーバーの転送先ノード。"
    },
    {
        file: 'resources/views/admin/servers/view/manage.blade.php',
        search: "Default Allocation",
        replace: "デフォルト割り当て"
    },
    {
        file: 'resources/views/admin/servers/view/manage.blade.php',
        search: "The main allocation that will be assigned to this server.",
        replace: "このサーバーに割り当てられるメインの割り当て。"
    },
    {
        file: 'resources/views/admin/servers/view/manage.blade.php',
        search: "Additional Allocation(s)",
        replace: "追加の割り当て"
    },
    {
        file: 'resources/views/admin/servers/view/manage.blade.php',
        search: "Additional allocations to assign to this server on creation.",
        replace: "作成時にこのサーバーに割り当てる追加の割り当て。"
    },
    // Server View - Delete
    {
        file: 'resources/views/admin/servers/view/delete.blade.php',
        search: "This action will attempt to delete the server from both the panel and daemon. If either one reports an error the action will be cancelled.",
        replace: "この操作により、パネルとデーモンの両方からサーバーの削除が試みられます。どちらか一方でもエラーが発生した場合、操作はキャンセルされます。"
    },
    {
        file: 'resources/views/admin/servers/view/delete.blade.php',
        search: "Deleting a server is an irreversible action. <strong>All server data</strong> (including files and users) will be removed from the system.",
        replace: "サーバーの削除は取り消しができません。<strong>すべてのサーバーデータ</strong>（ファイルやユーザーを含む）がシステムから削除されます。"
    },
    {
        file: 'resources/views/admin/servers/view/delete.blade.php',
        search: "This action will attempt to delete the server from both the panel and daemon. If the daemon does not respond, or reports an error the deletion will continue.",
        replace: "この操作により、パネルとデーモンの両方からサーバーの削除が試みられます。デーモンが応答しない場合やエラーが発生した場合でも、削除は続行されます。"
    },
    {
        file: 'resources/views/admin/servers/view/delete.blade.php',
        search: "This method may leave dangling files on your daemon if it reports an error.",
        replace: "エラーが発生した場合、この方法ではデーモン上にファイルが残る可能性があります。"
    },
    // Database Host Management
    {
        file: 'resources/views/admin/databases/index.blade.php',
        search: "Database Hosts",
        replace: "データベースホスト"
    },
    {
        file: 'resources/views/admin/databases/index.blade.php',
        search: "Database hosts that servers can have databases created on.",
        replace: "サーバーがデータベースを作成できるデータベースホスト。"
    },
    {
        file: 'resources/views/admin/databases/index.blade.php',
        search: "Host List",
        replace: "ホスト一覧"
    },
    {
        file: 'resources/views/admin/databases/index.blade.php',
        search: "Create New Database Host",
        replace: "新規データベースホスト作成"
    },
    {
        file: 'resources/views/admin/databases/index.blade.php',
        search: "Create New",
        replace: "新規作成"
    },
    {
        file: 'resources/views/admin/databases/index.blade.php',
        search: "A short identifier used to distinguish this location from others. Must be between 1 and 60 characters, for example, <code>us.nyc.lvl3</code>.",
        replace: "この場所を他と区別するために使用される短い識別子。1〜60文字である必要があります。例：<code>us.nyc.lvl3</code>。"
    },
    {
        file: 'resources/views/admin/databases/index.blade.php',
        search: "The IP address or FQDN that should be used when attempting to connect to this MySQL host <em>from the panel</em> to add new databases.",
        replace: "新しいデータベースを追加するために<em>パネルから</em>このMySQLホストへの接続を試みるときに使用する必要があるIPアドレスまたはFQDN。"
    },
    {
        file: 'resources/views/admin/databases/index.blade.php',
        search: "The port that MySQL is running on for this host.",
        replace: "このホストでMySQLが実行されているポート。"
    },
    {
        file: 'resources/views/admin/databases/index.blade.php',
        search: "The username of an account that has enough permissions to create new users and databases on the system.",
        replace: "システム上で新しいユーザーとデータベースを作成するのに十分な権限を持つアカウントのユーザー名。"
    },
    {
        file: 'resources/views/admin/databases/index.blade.php',
        search: "The password to the account defined.",
        replace: "定義されたアカウントのパスワード。"
    },
    {
        file: 'resources/views/admin/databases/index.blade.php',
        search: "Linked Node",
        replace: "リンクされたノード"
    },
    {
        file: 'resources/views/admin/databases/index.blade.php',
        search: "This setting does nothing other than default to this database host when adding a database to a server on the selected node.",
        replace: "この設定は、選択されたノード上のサーバーにデータベースを追加するときに、このデータベースホストをデフォルトにする以外の機能はありません。"
    },
    {
        file: 'resources/views/admin/databases/index.blade.php',
        search: "The account defined for this database host <strong>must</strong> have the <code>WITH GRANT OPTION</code> permission. If the defined account does not have this permission requests to create databases <em>will</em> fail. <strong>Do not use the same account details for MySQL that you have defined for this panel.</strong>",
        replace: "このデータベースホストに定義されたアカウントは、<code>WITH GRANT OPTION</code> 権限を持っている<strong>必要があります</strong>。定義されたアカウントにこの権限がない場合、データベース作成リクエストは失敗<em>します</em>。<strong>このパネル用に定義したMySQLアカウントの詳細と同じものを使用しないでください。</strong>"
    },
    {
        file: 'resources/views/admin/databases/view.blade.php',
        search: "Database Hosts &rarr; View &rarr; {{ $host->name }}",
        replace: "データベースホスト &rarr; 詳細 &rarr; {{ $host->name }}"
    },
    {
        file: 'resources/views/admin/databases/view.blade.php',
        search: "Viewing associated databases and details for this database host.",
        replace: "このデータベースホストに関連するデータベースと詳細を表示しています。"
    },
    {
        file: 'resources/views/admin/databases/view.blade.php',
        search: "Host Details",
        replace: "ホスト詳細"
    },
    {
        file: 'resources/views/admin/databases/view.blade.php',
        search: "User Details",
        replace: "ユーザー詳細"
    },
    {
        file: 'resources/views/admin/databases/view.blade.php',
        search: "The password to the account defined. Leave blank to continue using the assigned password.",
        replace: "定義されたアカウントのパスワード。割り当てられたパスワードを使い続ける場合は空欄のままにしてください。"
    },
    {
        file: 'resources/views/admin/databases/view.blade.php',
        search: "The account defined for this database host <strong>must</strong> have the <code>WITH GRANT OPTION</code> permission. If the defined account does not have this permission requests to create databases <em>will</em> fail. <strong>Do not use the same account details for MySQL that you have defined for this panel.</strong>",
        replace: "このデータベースホストに定義されたアカウントは、<code>WITH GRANT OPTION</code> 権限を持っている<strong>必要があります</strong>。定義されたアカウントにこの権限がない場合、データベース作成リクエストは失敗<em>します</em>。<strong>このパネル用に定義したMySQLアカウントの詳細と同じものを使用しないでください。</strong>"
    },
    {
        file: 'resources/views/admin/databases/view.blade.php',
        search: "Databases",
        replace: "データベース"
    },
    {
        file: 'resources/views/admin/databases/view.blade.php',
        search: "Database Name",
        replace: "データベース名"
    },
    {
        file: 'resources/views/admin/databases/view.blade.php',
        search: "Connections From",
        replace: "接続元"
    },
    {
        file: 'resources/views/admin/databases/view.blade.php',
        search: "Max Connections",
        replace: "最大接続数"
    },
    {
        file: 'resources/views/admin/databases/view.blade.php',
        search: "Unlimited",
        replace: "無制限"
    },
    {
        file: 'resources/views/admin/databases/view.blade.php',
        search: "Save",
        replace: "保存"
    },
    {
        file: 'resources/views/admin/databases/view.blade.php',
        search: "Manage",
        replace: "管理"
    },
    {
        file: 'resources/views/admin/databases/view.blade.php',
        search: "None",
        replace: "なし"
    },
    {
        file: 'resources/views/admin/databases/index.blade.php',
        search: "Cancel",
        replace: "キャンセル"
    },
    {
        file: 'resources/views/admin/databases/index.blade.php',
        search: "Create",
        replace: "作成"
    },
    {
        file: 'resources/views/admin/databases/index.blade.php',
        search: "None",
        replace: "なし"
    },
    // 日付・時刻フォーマットの日本語化
    {
        file: 'resources/scripts/components/server/files/FileObjectRow.tsx',
        regex: /format\(\s*file\.modifiedAt,\s*['"]MMM do, yyyy h:mma['"]\s*\)/,
        replace: "format(file.modifiedAt, 'yyyy年M月d日 H:mm', { locale: ja })"
    },
    {
        file: 'resources/scripts/components/server/files/FileObjectRow.tsx',
        regex: /formatDistanceToNow\(\s*file\.modifiedAt,\s*\{\s*addSuffix:\s*true\s*\}\s*\)/,
        replace: "formatDistanceToNow(file.modifiedAt, { addSuffix: true, locale: ja })"
    },
    {
        file: 'resources/scripts/components/server/backups/BackupRow.tsx',
        regex: /from 'date-fns';(?![\s\S]*import \{ ja \})/,
        replace: "from 'date-fns';\nimport { ja } from 'date-fns/locale';"
    },
    {
        file: 'resources/scripts/components/server/backups/BackupRow.tsx',
        regex: /format\(\s*backup\.createdAt,\s*['"]ddd, MMMM do, yyyy HH:mm:ss['"]\s*\)/,
        replace: "format(backup.createdAt, 'yyyy年M月d日 HH:mm:ss', { locale: ja })"
    },
    {
        file: 'resources/scripts/components/server/backups/BackupRow.tsx',
        regex: /formatDistanceToNow\(\s*backup\.createdAt,\s*\{\s*includeSeconds:\s*true,\s*addSuffix:\s*true\s*\}\s*\)/,
        replace: "formatDistanceToNow(backup.createdAt, { includeSeconds: true, addSuffix: true, locale: ja })"
    },
    {
        file: 'resources/scripts/components/server/schedules/ScheduleRow.tsx',
        regex: /from 'date-fns';(?![\s\S]*import \{ ja \})/,
        replace: "from 'date-fns';\nimport { ja } from 'date-fns/locale';"
    },
    {
        file: 'resources/scripts/components/server/schedules/ScheduleRow.tsx',
        regex: /format\(\s*schedule\.lastRunAt,\s*["']MMM do 'at' h:mma["']\s*\)/,
        replace: "format(schedule.lastRunAt, 'M月d日 H:mm', { locale: ja })"
    },
    {
        file: 'resources/scripts/components/server/schedules/ScheduleEditContainer.tsx',
        regex: /from 'date-fns';(?![\s\S]*import \{ ja \})/,
        replace: "from 'date-fns';\nimport { ja } from 'date-fns/locale';"
    },
    {
        file: 'resources/scripts/components/server/schedules/ScheduleEditContainer.tsx',
        regex: /format\(\s*schedule\.lastRunAt,\s*["']MMM do 'at' h:mma["']\s*\)/,
        replace: "format(schedule.lastRunAt, 'M月d日 H:mm', { locale: ja })"
    },
    {
        file: 'resources/scripts/components/server/schedules/ScheduleEditContainer.tsx',
        regex: /format\(\s*schedule\.nextRunAt,\s*["']MMM do 'at' h:mma["']\s*\)/,
        replace: "format(schedule.nextRunAt, 'M月d日 H:mm', { locale: ja })"
    },
    {
        file: 'resources/scripts/components/elements/activity/ActivityLogEntry.tsx',
        regex: /from 'date-fns';(?![\s\S]*import \{ ja \})/,
        replace: "from 'date-fns';\nimport { ja } from 'date-fns/locale';"
    },
    {
        file: 'resources/scripts/components/elements/activity/ActivityLogEntry.tsx',
        regex: /format\(\s*activity\.timestamp,\s*['"]MMM do, yyyy H:mm:ss['"]\s*\)/,
        replace: "format(activity.timestamp, 'yyyy年M月d日 H:mm:ss', { locale: ja })"
    },
    {
        file: 'resources/scripts/components/elements/activity/ActivityLogEntry.tsx',
        regex: /formatDistanceToNowStrict\(\s*activity\.timestamp,\s*\{\s*addSuffix:\s*true\s*\}\s*\)/,
        replace: "formatDistanceToNowStrict(activity.timestamp, { addSuffix: true, locale: ja })"
    },
];


console.log('Applying Japanese patch to frontend source code...');

let successCount = 0;
let failCount = 0;

replacements.forEach(({ file, search, replace, regex }) => {
    const filePath = path.join(__dirname, file);

    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // 既に置換済みかチェック
        if (content.includes(replace)) {
            console.log(`[SKIP] Already patched: ${file} (${replace})`);
            return;
        }

        let matched = false;
        if (regex) {
            // Regex replacement
            if (regex.test(content)) {
                content = content.replace(regex, replace);
                matched = true;
            }
        } else if (content.includes(search)) {
            // String replacement
            content = content.split(search).join(replace);
            matched = true;
        }

        if (matched) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`[OK] Patched: ${file}`);
            successCount++;
        } else {
            console.warn(`[WARN] Pattern not found in ${file}: "${search || regex}"`);
            failCount++;
        }
    } else {
        console.error(`[ERR] File not found: ${file}`);
        failCount++;
    }
});

console.log(`\nPatch complete. Success: ${successCount}, Failed/Skipped: ${failCount}`);
console.log('Note: You need to rebuild the assets (yarn build:production) to apply changes.');
