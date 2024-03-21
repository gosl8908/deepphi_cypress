response=$(curl -vvv --url 'smtp://smtp.office365.com:587' \
    --ssl-reqd \
    --mail-from 'gosl8908@deepnoid.com' \
    --mail-rcpt 'gosl8908@deepnoid.com' \
    --user 'gosl8908@deepnoid.com:rnrmf0801' \
    -F "=@./cypress/reports/html/index.html" \
    -H "Subject: [$date] $subject 자동화 테스트 결과" \
    -H "From: <gosl8908@deepnoid.com>" \
    -H "To:<gosl8908@deepnoid.com>")

if echo "$response" | grep -q "Login denied"; then
    echo "계정 정보가 잘못되었습니다. 다시 확인해주세요."
fi