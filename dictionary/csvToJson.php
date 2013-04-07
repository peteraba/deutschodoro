<?php

$handle = fopen(__DIR__ . '/dict.csv', "r");

if ($handle == false) {
    exit -1;
}

function getRow(array $data)
{
    switch ($data[4]) {
        case 'noun':
            $row = array(
                'article' => $data[0],
                'german' => $data[1],
                'genitive' => $data[2],
                'plural' => $data[3],
                'type' => 'noun',
                'category' => $data[5],
                'level' => $data[6],
                'english' => $data[7]
            );
            break;
        case 'adj':
            $row = array(
                'info' => $data[0],
                'german' => $data[1],
                'comparative' => $data[2],
                'superlative' => $data[3],
                'type' => 'adj',
                'category' => $data[5],
                'level' => $data[6],
                'english' => $data[7]
            );
            break;
        case 'verb':
            $row = array(
                'info' => $data[0],
                'german' => $data[1],
                'present' => $data[2],
                'past' => $data[3],
                'type' => 'verb',
                'category' => $data[5],
                'level' => $data[6],
                'english' => $data[7]
            );
        default:
            $row = array(
                'german' => $data[1],
                'type' => $data[4],
                'category' => $data[5],
                'level' => $data[6],
                'english' => $data[7]
            );
    }
    $row['hash'] = md5(print_r($data, true));
    return $row;
}

$dictionary = array();
while (($data = fgetcsv($handle, 1000, ";")) !== false) {
    $num = count($data);
    for ($c = 0; $c < $num; $c++) {
        if (strpos($data[$c], ',')===false) {
            $data[$c] = trim($data[$c]);
        } else {
            $data[$c] = explode(",", $data[$c]);
            foreach ($data[$c] as $key => $value) {
                $data[$c][$key] = trim($value);
                if (empty($data[$c][$key])) {
                    unset($data[$c][$key]);
                }
            }
        }
    }
    $dictionary[] = getRow($data);
}
fclose($handle);

$content = 'var dict = ' . json_encode($dictionary) . ";\n";

file_put_contents(__DIR__ . '/dict.js', $content);

echo "\n";