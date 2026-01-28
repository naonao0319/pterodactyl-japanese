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
        file: 'resources/views/admin/nodes/new.blade.php',
        regex: />Create Node<\/button>/,
        replace: ">ノード作成</button>"
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
