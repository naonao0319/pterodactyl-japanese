<?php

return [
    'notices' => [
        'created' => '新しいNest :name が正常に作成されました。',
        'deleted' => 'リクエストされたNestをパネルから正常に削除しました。',
        'updated' => 'Nestの設定オプションを正常に更新しました。',
    ],
    'eggs' => [
        'notices' => [
            'imported' => 'このEggと関連変数を正常にインポートしました。',
            'updated_via_import' => '提供されたファイルを使用してこのEggを更新しました。',
            'deleted' => 'リクエストされたEggをパネルから正常に削除しました。',
            'updated' => 'Eggの設定を正常に更新しました。',
            'script_updated' => 'Eggのインストールスクリプトが更新され、サーバーがインストールされるたびに実行されます。',
            'egg_created' => '新しいEggが正常に作成されました。この新しいEggを適用するには、実行中のデーモンを再起動する必要があります。',
        ],
    ],
    'variables' => [
        'notices' => [
            'variable_deleted' => '変数 ":variable" は削除され、再構築後にサーバーで使用できなくなります。',
            'variable_updated' => '変数 ":variable" が更新されました。変更を適用するには、この変数を使用しているサーバーを再構築する必要があります。',
            'variable_created' => '新しい変数が正常に作成され、このEggに割り当てられました。',
        ],
    ],
];
