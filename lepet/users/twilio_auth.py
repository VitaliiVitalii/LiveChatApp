# from twilio.rest import Client
# from django.conf import settings
#
#
# def send_verification_code(phone_number, code):
#     account_sid = settings.TWILIO_ACCOUNT_SID
#     auth_token = settings.TWILIO_AUTH_TOKEN
#     twilio_phone_number = settings.TWILIO_PHONE_NUMBER
#
#     client = Client(account_sid, auth_token)
#
#     message = client.messages.create(
#         body=f'Верифікаційний код: {code}',
#         from_=twilio_phone_number,
#         to=phone_number
#     )
#
#     return message.sid
