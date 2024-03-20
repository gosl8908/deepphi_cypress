# curl -vvv --url 'smtp://smtp.office365.com:587' \  # SMTP 서버 주소 및 포트
#     --ssl-reqd \  # SSL 연결 필요 여부
#     --mail-from 'deepphi@deepnoid.com' \  # 발신자 이메일 주소
#     --mail-rcpt 'ckdeo1211@deepnoid.com' \  # 수신자 이메일 주소들
#     --mail-rcpt 'gosl8908@deepnoid.com' \
#     --mail-rcpt 'sph@deepnoid.com' \
#     --user 'deepphi@deepnoid.com:service_Dev1_!)#)' \  # SMTP 서버에 인증하기 위한 사용자 정보
#     -F '=(;type=multipart/mixed' \  # 이메일 컨텐츠 유형
#     -F "=$file_content;type=text/plain" \  # 첨부할 텍스트 내용
#     -F "=@./cypress/reports/html/index.html;encoder=base64" \  # HTML 파일 첨부 (Base64 인코딩)
#     -H "Subject: [$date] $subject 자동화 테스트 결과" \  # 이메일 제목
#     -H "From: <deepphi@deepnoid.com>" \  # 발신자
#     -H "To:<ckdeo1211@deepnoid.com>, <gosl8908@deepnoid.com>, <sph@deepnoid.com>"  # 수신자 목록