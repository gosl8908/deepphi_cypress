function getFileName(FilePath) {
    const currentFilename = FilePath; // 현재 파일의 전체 경로
    const filenameParts = currentFilename.split('/'); // 경로를 '/'로 나눔 (윈도우의 경우 '\\'로 변경 필요)

    // 배열의 마지막 요소는 파일명
    const currentFile = filenameParts[filenameParts.length - 1];
    return currentFile;
}

module.exports = {
    getFileName: getFileName,
};
