import smtplib
from email.mime.text import MIMEText
import urllib.parse
import sys

# 第三方 SMTP 服务
mail_host = sys.argv[1]  # SMTP服务器
mail_user = sys.argv[2]  # 用户名
mail_pass = sys.argv[3]  # 密码

receivers = sys.argv[4].split(',')  # 接收邮件，可设置为你的QQ邮箱或者其他邮箱

title = sys.argv[5]  # 邮件主题
content = urllib.parse.unquote(sys.argv[6]) # 针对编码之后的内容进行解码

message = MIMEText(content, 'html', 'utf-8')  # 内容, 格式, 编码
message['From'] = "{}".format(mail_user)
message['To'] = ",".join(receivers)
message['Subject'] = title
message['Cc']= ";".join(receivers) # 抄送

# print("Subject%s, From %s, To %s, Cc %s"%(title, message['From'], message['Cc'], message['Cc']))

try:
    smtpObj = smtplib.SMTP_SSL(mail_host, 465)  # 启用SSL发信, 端口一般是465
    smtpObj.login(mail_user, mail_pass)  # 登录验证
    smtpObj.sendmail(mail_user, receivers, message.as_string())  # 发送
    print("mail has been send successfully.")
except smtplib.SMTPException as e:
    print(e)