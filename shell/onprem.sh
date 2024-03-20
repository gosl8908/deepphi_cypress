# 'result' 디렉토리를 만듭니다. 이미 존재하지 않는 경우에만 생성합니다.
mkdir -p result

# Cypress 테스트를 지정된 설정으로 실행하고 출력을 파일에 저장합니다.
# 표준 출력 (stdout)과 표준 에러 (stderr)를 동시에 동일한 파일로 리다이렉트합니다.
# tee 명령어를 사용하여 출력을 터미널에 표시하고 동시에 파일에 저장합니다.
NO_COLOR=1 yarn cypress run --record --key $CYPRESS_RECORD_KEY \
    --spec "cypress/e2e/onprem/onprem-signup.cy.js" \
    --browser chrome 2>&1 | tee ./result/orign.txt

# 'Run Finished'부터 출력의 끝까지의 부분을 추출하기 위해 sed를 사용합니다.
# 추출된 부분을 별도의 파일에 저장합니다.
sed -n '/Run Finished/,$p' ./result/orign.txt > ./result/result.txt

# 'result.txt' 파일의 내용을 'file_content' 변수로 내보냅니다.
export file_content=$(cat ./result/result.txt)

# 현재 날짜와 요일을 가져와 'date' 변수에 저장합니다.
export date=`date +"%Y-%m-%d %a" `

# 이메일 제목을 'onprem'으로 설정합니다.
export subject="onprem"

# 'curl.sh'라는 쉘 스크립트를 실행합니다.
sh ./shell/curl.sh