# curl -vvv --url 'smtp://smtp.office365.com:587' \  # SMTP 서버 주소 및 포트
#     --ssl-reqd \  # SSL 연결 필요 여부
#     --mail-from 'gosl8908@deepnoid.com' \  # 발신자 이메일 주소 
#     --mail-rcpt 'gosl8908@deepnoid.com' \  # 수신자 이메일 주소들
#     --user 'gosl8908@deepnoid.com:rnrmf0801!' \  # SMTP 서버에 인증하기 위한 사용자 정보
#     -F '=(;type=multipart/mixed' \  # 이메일 컨텐츠 유형
#     -F "=$file_content;type=text/plain" \  # 첨부할 텍스트 내용
#     -F "=@./cypress/reports/html/index.html;encoder=base64" \  # HTML 파일 첨부 (Base64 인코딩)
#     -H "Subject: [$date] $subject 자동화 테스트 결과" \  # 이메일 제목
#     -H "From: <gosl8908@deepnoid.com>" \  # 발신자
#     -H "To:<gosl8908@deepnoid.com>"  # 수신자 목록
    curl -vvv --url 'smtp://smtp.office365.com:587' \
    --ssl-reqd \
    --mail-from 'gosl8908@deepnoid.com' \
    --mail-rcpt 'gosl8908@deepnoid.com' \
    --user 'gosl8908@deepnoid.com:rnrmf0801' \
    -F '=(;type=multipart/mixed' -F "=$file_content;type=text/plain" \
    -F "=@./cypress/reports/html/index.html;encoder=base64" \
    -H "Subject: [$date] $subject 자동화 테스트 결과" \
    -H "From: <gosl8908@deepnoid.com>" \
    -H "To:<gosl8908@deepnoid.com>"