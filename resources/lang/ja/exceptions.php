<?php

return [
    'daemon_connection_failed' => 'デーモンとの通信試行中に例外が発生し、HTTP/:code レスポンスコードが返されました。この例外はログに記録されました。',
    'node' => [
        'servers_attached' => 'ノードを削除するには、リンクされているサーバーがない状態である必要があります。',
        'daemon_off_config_updated' => 'デーモンの設定が更新されましたが、デーモン上の設定ファイルを自動的に更新しようとした際にエラーが発生しました。変更を適用するには、デーモンの設定ファイル (config.yml) を手動で更新する必要があります。',
    ],
    'allocations' => [
        'server_using' => '現在、この割り当てにはサーバーが割り当てられています。割り当てを削除するには、サーバーが割り当てられていない必要があります。',
        'too_many_ports' => '一度に1000以上のポートを単一の範囲に追加することはサポートされていません。',
        'invalid_mapping' => ':port に提供されたマッピングが無効であり、処理できませんでした。',
        'cidr_out_of_range' => 'CIDR表記では、/25 から /32 のマスクのみ許可されています。',
        'port_out_of_range' => '割り当てポートは1024より大きく、65535以下である必要があります。',
    ],
    'nest' => [
        'delete_has_servers' => 'アクティブなサーバーが関連付けられているNestはパネルから削除できません。',
        'egg' => [
            'delete_has_servers' => 'アクティブなサーバーが関連付けられているEggはパネルから削除できません。',
            'invalid_copy_id' => 'スクリプトのコピー元として選択されたEggが存在しないか、それ自体がスクリプトをコピーしています。',
            'must_be_child' => 'このEggの「設定のコピー元」ディレクティブは、選択されたNestの子オプションである必要があります。',
            'has_children' => 'このEggは他の1つ以上のEggの親です。このEggを削除する前に、それらのEggを削除してください。',
        ],
        'variables' => [
            'env_not_unique' => '環境変数 :name はこのEgg内で一意である必要があります。',
            'reserved_name' => '環境変数 :name は保護されており、変数に割り当てることはできません。',
            'bad_validation_rule' => 'バリデーションルール ":rule" は、このアプリケーションにとって有効なルールではありません。',
        ],
        'importer' => [
            'json_error' => 'JSONファイルの解析中にエラーが発生しました: :error。',
            'file_error' => '提供されたJSONファイルは無効でした。',
            'invalid_json_provided' => '提供されたJSONファイルは認識可能な形式ではありません。',
        ],
    ],
    'subusers' => [
        'editing_self' => '自分自身のサブユーザーアカウントを編集することは許可されていません。',
        'user_is_owner' => 'サーバー所有者をこのサーバーのサブユーザーとして追加することはできません。',
        'subuser_exists' => 'そのメールアドレスのユーザーは、すでにこのサーバーのサブユーザーとして割り当てられています。',
    ],
    'databases' => [
        'delete_has_databases' => 'アクティブなデータベースがリンクされているデータベースホストサーバーは削除できません。',
    ],
    'tasks' => [
        'chain_interval_too_long' => 'チェーンタスクの最大間隔時間は15分です。',
    ],
    'locations' => [
        'has_nodes' => 'アクティブなノードが関連付けられているロケーションは削除できません。',
    ],
    'users' => [
        'node_revocation_failed' => '<a href=":link">ノード #:node</a> 上のキーの取り消しに失敗しました。 :error',
    ],
    'deployment' => [
        'no_viable_nodes' => '自動デプロイメントの要件を満たすノードが見つかりませんでした。',
        'no_viable_allocations' => '自動デプロイメントの要件を満たす割り当てが見つかりませんでした。',
    ],
    'api' => [
        'resource_not_found' => 'リクエストされたリソースはこのサーバー上に存在しません。',
    ],
];
