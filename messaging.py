import smtplib
from email.message import EmailMessage

def send_email(recipient, subject, body, attachment=None):
    """
    Sends an email with the provided subject, body, and optional attachment.
    """
    sender_email = "sample@gmail.com"  # Replace with your email
    sender_password = "your password"       # Replace with your email's password

    # Create the email
    msg = EmailMessage()
    msg["From"] = sender_email
    msg["To"] = recipient
    msg["Subject"] = subject
    msg.set_content(body)

    # Add the attachment if provided
    if attachment:
        msg.add_attachment(
            attachment.encode("utf-8"),
            maintype="text",
            subtype="plain",
            filename="resume.txt"
        )

    # Send the email
    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:  # Replace with your SMTP server
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(msg)
        return "Email sent successfully!"
    except Exception as e:
        return f"Error sending email: {e}"
