def generate_reply(email_text):

    email_lower = email_text.lower()

    # Leave related
    if "leave" in email_lower:
        return """
        Hello,

        Your leave request has been received.
        Please take care and keep us updated.

        Regards,
        HR Team
        """

    # Interview related
    elif "interview" in email_lower:
        return """
        Hello,

        Thank you for informing us.
        We understand the situation.

        Please arrive safely.

        Regards,
        Recruitment Team
        """

    # Meeting related
    elif "meeting" in email_lower:
        return """
        Hello,

        Thank you for the update.
        We acknowledge the delay.

        Regards,
        Team
        """

    # Default reply
    else:
        return """
        Hello,

        Thank you for your email.
        We have received your message and will get back to you shortly.

        Regards,
        Support Team
        """