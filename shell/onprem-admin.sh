# mkdir -p result

# NO_COLOR=1 yarn cypress run --record --key $CYPRESS_RECORD_KEY \
#     --spec "cypress/e2e/onprem_admin" \
#     --browser chrome 2>&1 | tee ./result/orign.txt

# sed -n '/Run Finished/,$p' ./result/orign.txt > ./result/result.txt

# export file_content=$(cat ./result/result.txt)
# export date=`date +"%Y-%m-%d %a" `
# export subject="onprem-admin"

# sh ./shell/curl.sh