<?php
require 'db.php';

$stmt = $pdo->query("SELECT * FROM problems ORDER BY created_at DESC");
$problems = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($problems);
?>