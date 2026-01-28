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
    // 日付・時刻フォーマットの日本語化
    {
        file: 'resources/scripts/components/server/files/FileObjectRow.tsx',
        regex: /from 'date-fns';(?![\s\S]*import \{ ja \})/,
        replace: "from 'date-fns';\nimport { ja } from 'date-fns/locale';"
    },
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
