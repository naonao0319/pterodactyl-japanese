<?php

/**
 * Contains all of the translation strings for different activity log
 * events. These should be keyed by the value in front of the colon (:)
 * in the event name. If there is no colon present, they should live at
 * the top level.
 */
return [
    'auth' => [
        'fail' => 'ログイン失敗',
        'success' => 'ログイン成功',
        'password-reset' => 'パスワードリセット',
        'reset-password' => 'パスワードリセット要求',
        'checkpoint' => '2段階認証要求',
        'recovery-token' => '2段階認証リカバリトークン使用',
        'token' => '2段階認証解決',
        'ip-blocked' => '未登録IPアドレスからのリクエストブロック: :identifier',
        'sftp' => [
            'fail' => 'SFTPログイン失敗',
        ],
    ],
    'user' => [
        'account' => [
            'email-changed' => 'メールアドレスを :old から :new に変更しました',
            'password-changed' => 'パスワードを変更しました',
        ],
        'api-key' => [
            'create' => '新しいAPIキー :identifier を作成しました',
            'delete' => 'APIキー :identifier を削除しました',
        ],
        'ssh-key' => [
            'create' => 'SSHキー :fingerprint をアカウントに追加しました',
            'delete' => 'SSHキー :fingerprint をアカウントから削除しました',
        ],
        'two-factor' => [
            'create' => '2段階認証を有効化しました',
            'delete' => '2段階認証を無効化しました',
        ],
    ],
    'server' => [
        'reinstall' => 'サーバーを再インストールしました',
        'console' => [
            'command' => 'サーバーで ":command" を実行しました',
        ],
        'power' => [
            'start' => 'サーバーを起動しました',
            'stop' => 'サーバーを停止しました',
            'restart' => 'サーバーを再起動しました',
            'kill' => 'サーバープロセスを強制終了しました',
        ],
        'backup' => [
            'download' => ':name バックアップをダウンロードしました',
            'delete' => ':name バックアップを削除しました',
            'restore' => ':name バックアップを復元しました (削除されたファイル: :truncate)',
            'restore-complete' => ':name バックアップの復元を完了しました',
            'restore-failed' => ':name バックアップの復元に失敗しました',
            'start' => '新しいバックアップ :name を開始しました',
            'complete' => 'バックアップ :name を完了としてマークしました',
            'fail' => 'バックアップ :name を失敗としてマークしました',
            'lock' => 'バックアップ :name をロックしました',
            'unlock' => 'バックアップ :name のロックを解除しました',
        ],
        'database' => [
            'create' => '新しいデータベース :name を作成しました',
            'rotate-password' => 'データベース :name のパスワードを変更しました',
            'delete' => 'データベース :name を削除しました',
        ],
        'file' => [
            'compress_one' => ':directory:file を圧縮しました',
            'compress_other' => ':directory 内の :count 個のファイルを圧縮しました',
            'read' => ':file の内容を閲覧しました',
            'copy' => ':file のコピーを作成しました',
            'create-directory' => 'ディレクトリ :directory:name を作成しました',
            'decompress' => ':directory 内の :files を解凍しました',
            'delete_one' => ':directory:files.0 を削除しました',
            'delete_other' => ':directory 内の :count 個のファイルを削除しました',
            'download' => ':file をダウンロードしました',
            'pull' => 'リモートファイルを :url から :directory にダウンロードしました',
            'rename_one' => ':directory:files.0.from を :directory:files.0.to に名前変更しました',
            'rename_other' => ':directory 内の :count 個のファイルを名前変更しました',
            'write' => ':file に新しい内容を書き込みました',
            'upload' => 'ファイルのアップロードを開始しました',
            'uploaded' => ':directory:file をアップロードしました',
        ],
        'sftp' => [
            'denied' => '権限不足のためSFTPアクセスをブロックしました',
            'create_one' => ':files.0 を作成しました',
            'create_other' => ':count 個の新しいファイルを作成しました',
            'write_one' => ':files.0 の内容を変更しました',
            'write_other' => ':count 個のファイルの内容を変更しました',
            'delete_one' => ':files.0 を削除しました',
            'delete_other' => ':count 個のファイルを削除しました',
            'create-directory_one' => ':files.0 ディレクトリを作成しました',
            'create-directory_other' => ':count 個のディレクトリを作成しました',
            'rename_one' => ':files.0.from を :files.0.to に名前変更しました',
            'rename_other' => ':count 個のファイルを名前変更または移動しました',
        ],
        'allocation' => [
            'create' => 'サーバーに :allocation を追加しました',
            'notes' => ':allocation のメモを ":old" から ":new" に更新しました',
            'primary' => ':allocation をプライマリサーバー割り当てに設定しました',
            'delete' => ':allocation 割り当てを削除しました',
        ],
        'schedule' => [
            'create' => 'スケジュール :name を作成しました',
            'update' => 'スケジュール :name を更新しました',
            'execute' => 'スケジュール :name を手動実行しました',
            'delete' => 'スケジュール :name を削除しました',
        ],
        'task' => [
            'create' => 'スケジュール :name に新しいタスク ":action" を作成しました',
            'update' => 'スケジュール :name のタスク ":action" を更新しました',
            'delete' => 'スケジュール :name のタスクを削除しました',
        ],
        'settings' => [
            'rename' => 'サーバー名を :old から :new に変更しました',
            'description' => 'サーバーの説明を :old から :new に変更しました',
        ],
        'startup' => [
            'edit' => '変数 :variable を ":old" から ":new" に変更しました',
            'image' => 'サーバーのDockerイメージを :old から :new に更新しました',
        ],
        'subuser' => [
            'create' => 'サブユーザーとして :email を追加しました',
            'update' => ':email のサブユーザー権限を更新しました',
            'delete' => 'サブユーザー :email を削除しました',
        ],
    ],
];
