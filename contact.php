<?php
$mailTo = 'yourmail@yourmal.com';
$name = htmlspecialchars($_POST['idi_name']);
$mailFrom = htmlspecialchars($_POST['idi_mail']);
$subject = 'Website Feedback';
$message_text = htmlspecialchars($_POST['idi_text']);
$message =  'From: '.$name.'; Email: '.$mailFrom.' ; Message: '.$message_text;
$headers .= 'From:' . $mailFrom . '\r\n';
mail($mailTo, $subject, $message, $headers);
?>