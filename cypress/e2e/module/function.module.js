function getFileName(FilePath) {
    const CurrentFilename = FilePath; // 현재 파일의 전체 경로
    const FilenameParts = CurrentFilename.split('/'); // 경로를 '/'로 나눔 (윈도우의 경우 '\\'로 변경 필요)

    // 배열의 마지막 요소는 파일명
    const CurrentFile = FilenameParts[FilenameParts.length - 1];
    return CurrentFile;
}

module.exports = {
    getFileName: getFileName,
};
