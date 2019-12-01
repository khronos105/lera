<?php

  require './config.php';
  require './PHPMailer/src/Exception.php';
  require './PHPMailer/src/PHPMailer.php';
  require './PHPMailer/src/SMTP.php';
  require './template.php';

/*
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
  die();
}*/



// Import PHPMailer classes into the global namespace
	// These must be at the top of your script, not inside a function
	use PHPMailer\PHPMailer\PHPMailer;
	//use PHPMailer\PHPMailer\SMTP;
	use PHPMailer\PHPMailer\Exception;

	// Instantiation and passing `true` enables exceptions
	$mail = new PHPMailer(false);



	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	try {
		//Server settings
		//$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
		$mail->isSMTP();                                            // Send using SMTP
		$mail->Host       = $email_config['smtp']['host'];                    // Set the SMTP server to send through
		$mail->SMTPAuth   = $email_config['smtp']['SMTPauth'];                                   // Enable SMTP authentication
		$mail->Username   = $email_config['smtp']['username'];          // SMTP username
		$mail->Password   = $email_config['smtp']['password'];                          // SMTP password
		$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
		$mail->Port       = $email_config['smtp']['port'];                                    	// TCP port to connect to

		//Recipients
		$mail->setFrom( $email_config['from'], $email_config['from_name']);
		$mail->addAddress( $email_config['to'], $email_config['to_name']);     // Add a recipient
		//$mail->addReplyTo('info@example.com', 'Information');
		//$mail->addCC('cc@example.com');
		//$mail->addBCC('bcc@example.com');

		// Attachments
		//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
		//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

		// Content
		$mail->isHTML(true);                                  // Set email format to HTML
		$mail->Subject = $email_config['subject'];
		$mail->Body    = email_template($request->data);
		$mail->AltBody = alt_email_template($request->data);

		$mail->send();
		echo 1;
	} catch (Exception $e) {
		echo 0;
	}

	die();
