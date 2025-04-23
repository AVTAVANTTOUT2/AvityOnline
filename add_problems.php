<?php
require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$text = trim($data['text']);

if ($text) {
  $stmt = $pdo->prepare("INSERT INTO problems (text) VALUES (?)");
  $stmt->execute([$text]);
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false]);
}
?>
