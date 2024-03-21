curl -vvv --url 'smtp://smtp.office365.com:587' \
    --ssl-reqd \
    --mail-from 'gosl8908@deepnoid.com' \
    --mail-rcpt 'gosl8908@deepnoid.com' \
    --user 'gosl8908@deepnoid.com:gotjd0215!' \
    -F '=(;type=multipart/mixed' -F "=$file_content;type=text/plain" \
    -F "=@./cypress/reports/html/index.html;encoder=base64" \
    -H "Subject: [$date] $subject 자동화 테스트 결과" \
    -H "From: <gosl8908@deepnoid.com>" \
    -H "To:<gosl8908@deepnoid.com>"