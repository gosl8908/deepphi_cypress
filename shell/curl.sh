# curl.sh

#!/bin/bash

# 이메일 전송
send_email() {
    local response=$(curl -vvv --url 'smtp://smtp.office365.com:587' \
        --ssl-reqd \
        --mail-from "$FROM_EMAIL" \
        --mail-rcpt "$TO_EMAIL" \
        --user "$EMAIL_USERNAME:$EMAIL_PASSWORD" \
        -F "=@./cypress/reports/html/index.html" \
        -H "Subject: [$DATE] $SUBJECT 자동화 테스트 결과" \
        -H "From: <$FROM_EMAIL>" \
        -H "To: <$TO_EMAIL>")

    if echo "$response" | grep -q "Login denied"; then
        echo "계정 정보가 잘못되었습니다. 다시 확인해주세요."
    fi
}

# 환경 변수 설정
export DATE=$(date +"%Y-%m-%d %a")
export SUBJECT="onprem"
export FROM_EMAIL="gosl8908@deepnoid.com"
export TO_EMAIL="gosl8908@deepnoid.com"

# 이메일 계정 정보 설정 (보안상의 이유로 하드코딩하지 않고 Secrets를 사용하는 것이 좋음)
export EMAIL_USERNAME="gosl8908@deepnoid.com"
export EMAIL_PASSWORD="rnrmf0801"

# 이메일 전송 함수 호출
send_email
