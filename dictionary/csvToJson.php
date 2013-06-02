<?php

$handle = fopen(__DIR__ . '/dict.csv', "r");

if ($handle == false) {
    exit -1;
}

function getRow(array $data)
{
    if ($data[7] >= 100) {
        return false;
    }
    switch ($data[5]) {
        case 'noun':
            $row = array(
                'article' => $data[0],
                'german' => $data[2],
                'genitive' => $data[3],
                'plural' => $data[4],
                'category' => $data[6],
                'level' => $data[7],
                'english' => $data[8]
            );
            break;
        case 'adj':
            $row = array(
                'info' => $data[0],
                'german' => $data[2],
                'comparative' => $data[3],
                'superlative' => $data[4],
                'category' => $data[6],
                'level' => $data[7],
                'english' => $data[8]
            );
            break;
        case 'verb':
            $row = array(
                'info' => $data[0],
                'prefix' => $data[1],
                'german' => $data[2],
                'present' => $data[3],
                'past' => $data[4],
                'category' => $data[6],
                'level' => $data[7],
                'english' => $data[8]
            );
            break;
        default:
            $row = array(
                'german' => $data[2],
                'category' => $data[6],
                'level' => $data[7],
                'english' => $data[8]
            );
    }
    $row['type'] = $data[5];
    $row['hash'] = md5(json_encode($data));
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
    $rowData = getRow($data);
    if (false !== $rowData) {
        $dictionary[] = getRow($data);
    }
}
fclose($handle);

$content = "define(\n{dict: " . json_encode($dictionary) . "}\n);\n";

file_put_contents(__DIR__ . '/dict.js', $content);