<?php
$host = '';
$dbname = 'if0_38815801_avityonline';
$username = 'if0_38815801';
$password = 'Elias19771977';

try {
  $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  die("Erreur de connexion : " . $e->getMessage());
}
?>
