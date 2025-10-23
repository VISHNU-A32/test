<?php
// send-contact.php
// Handles submissions from the contact page form and forwards them via email.

// Configuration
$recipient = 'sales@nextgen-techno.com';
$redirectSuccess = 'nextgen-technologies-en-contact.html?success=1';
$redirectError = 'nextgen-technologies-en-contact.html?success=0';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: {$redirectError}");
    exit;
}

$company = trim($_POST['company'] ?? ''); // Honeypot field
if ($company !== '') {
    header("Location: {$redirectSuccess}");
    exit;
}

$name = strip_tags(trim($_POST['name'] ?? ''));
$emailInput = $_POST['email'] ?? '';
$email = filter_var($emailInput, FILTER_VALIDATE_EMAIL);
$subjectInput = strip_tags(trim($_POST['subject'] ?? ''));
$messageInput = trim($_POST['message'] ?? '');

if ($name === '' || !$email || $subjectInput === '' || $messageInput === '') {
    header("Location: {$redirectError}");
    exit;
}

// Prevent header injection
$subjectSafe = preg_replace("/[\r\n]+/", ' ', $subjectInput);
$emailSafe = str_replace(["\r", "\n"], '', $email);
$nameSafe = preg_replace("/[\r\n]+/", ' ', $name);

$body = "Name: {$nameSafe}\n" .
        "Email: {$emailSafe}\n" .
        "Subject: {$subjectSafe}\n" .
        "Message:\n{$messageInput}\n";

$headers = [];
$headers[] = 'From: NextGen Technologies Website <no-reply@nextgen-techno.com>';
$headers[] = "Reply-To: {$nameSafe} <{$emailSafe}>";
$headers[] = 'Content-Type: text/plain; charset=utf-8';

$mailSent = @mail($recipient, "Website Contact Form: {$subjectSafe}", $body, implode("\r\n", $headers));

if (!$mailSent) {
    header("Location: {$redirectError}");
    exit;
}

header("Location: {$redirectSuccess}");
exit;
