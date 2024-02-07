const { CLASSIFICATION, SEGMENTATION, DETECTION, TRANSFORMATION, CASE1, CASE2 } = require('./constant.module');

function createImageDataset({
    Dimension,
    LabelType,
    Structure,
    FolderName = undefined,
    Dataset,
    Label = undefined,
    Title,
    Detail = Title,
}) {
    // Dataset title 입력
    cy.get('#dataset_name').type(Title);
    // Dataset Detail 입력
    cy.get('.note-editable').type(Detail);

    // 1단계 Next 버튼 선택
    cy.get('.ng-dirty > .create-dataset > .step-content-box > .page-button > .btn').click();

    // Dimension 선택
    cy.contains(Dimension).click();

    // LabelType 선택
    cy.get('.mb10:nth-child(' + LabelType + ') > .ng-star-inserted > div > label > span').click();
    // structure 선택
    cy.get(':nth-child(' + Structure + ') > .folder-structure-content > .folder-structure-content__header').click();

    // cy.get('.folder-structure-item:nth-child(1) > .folder-structure-content > dl > dt > img').click();
    // 2단계 Next 버튼 선택
    cy.get('.ng-untouched > .create-dataset > .step-content-box > .page-button > .btn-primary').click();

    const FolderPath = FolderName ? `${FolderName}/` : '';
    cy.log(FolderPath);
    const FilePathDataset = `image/${FolderPath}${Dataset}`;
    const FilePathLabel = `image/${FolderPath}${Label}`;
    cy.log(FilePathDataset);
    // 타입별 데이터셋 파일 첨부
    if (LabelType === CLASSIFICATION) {
        if (Structure === CASE1) {
            // Dataset 파일 첨부
            cy.get('input[accept=".zip"][type="file"]').attachFile({
                // fileContent,
                filePath: FilePathDataset,
                fileName: Dataset,
                mimeType: 'application/zip',
            });
        } else {
            // Dataset 파일 첨부
            cy.get('input[accept=".zip"][type="file"]').attachFile({
                // fileContent,
                filePath: FilePathDataset,
                fileName: Dataset,
                mimeType: 'application/zip',
            });

            // Label 파일 첨부
            cy.get('.mb20 > .file-input > .input-wrap > input[accept=".csv"][type="file"]').attachFile({
                // fileContent,
                filePath: FilePathLabel,
                fileName: Label,
                mimeType: 'application/csv',
            });
        }
    } else {
        // Dataset 파일 첨부
        cy.get('input[accept=".zip"][type="file"]').attachFile({
            // fileContent,
            filePath: FilePathDataset,
            fileName: Dataset,
            mimeType: 'application/zip',
        });

        // Label 파일 첨부
        cy.get('.mb20 > .file-input > .input-wrap > input[accept=".zip"][type="file"]').attachFile({
            // fileContent,
            filePath: FilePathLabel,
            fileName: Label,
            mimeType: 'application/zip',
        });
    }

    // Upload 버튼 클릭
    cy.get('[style=""] > .step-content-box > .page-button > .btn-primary').click();

    if (Dimension == '3D 이미지 데이터' && LabelType === SEGMENTATION && Structure === CASE1) {
        cy.wait(3700);
    }

    // Dataset 업로드 확인
    cy.contains('성공', { timeout: 15 * 1000 }).should('be.visible');
    cy.contains('압축 해제 중', { timeout: 30 * 1000 }).should('be.visible');
    cy.contains('검증 진행 중', { timeout: 30 * 1000 }).should('be.visible');
    cy.contains('설정을 완료하세요', { timeout: 30 * 1000 }).should('be.visible');
}

function createImageProject(Title, Detail = Title) {
    cy.get('#createBtn').click(); // 프로젝트 생성 버튼 클릭
    cy.get(':nth-child(1) > .create-select-item__container > .create-select-item__content').click(); // Image 선택
    cy.get('.modal-button-content > .btn').click(); // 다음 버튼 클릭
    cy.wait(3 * 1000);
    cy.get('#project_name').type(Title); // 프로젝트 타이틀 입력
    cy.get('.note-editable').type(Detail); // 프로젝트 Detail 입력
    cy.get('.modal-button-content > .btn-primary').click(); // 프로젝트 생성 버튼 클릭
}

function createRecordDataset({
    TrainFileName,
    TestFileName = undefined,
    ValidationFileName = undefined,
    Title,
    Detail = Title,
    Site = undefined,
}) {
    // Dataset title 입력
    cy.get('#dataset_name').type(Title);
    // Dataset Detail 입력
    cy.get('.note-editable').type(Detail);
    // 1단계 Next 버튼 선택
    cy.get('.page-button > .btn').click();

    const filePathTrain = `record/${TrainFileName}`;
    const filePathTest = `record/${TestFileName}`;
    const filePathValidation = `record/${ValidationFileName}`;
    // Dataset 파일 첨부
    cy.get('input[accept=".csv"][type="file"]').eq(0).attachFile({
        // fileContent,
        filePath: filePathTrain,
        fileName: TrainFileName,
        mimeType: 'text/csv',
    });
    cy.get('input[accept=".csv"][type="file"]').eq(1).attachFile({
        // fileContent,
        filePath: filePathTest,
        fileName: TestFileName,
        mimeType: 'text/csv',
    });
    cy.get('input[accept=".csv"][type="file"]').eq(2).attachFile({
        // fileContent,
        filePath: filePathValidation,
        fileName: ValidationFileName,
        mimeType: 'text/csv',
    });

    cy.get('em').click(); // 자동탐지 체크

    // 2단계 Next 버튼 선택
    cy.get('.btn-primary').click();

    if (Site === 'Onprem') {
        cy.get('.default-tab > ul > :nth-child(2) > button').click();
        cy.wait(5000);
        cy.get('jhi-organization-record-dataset.ng-star-inserted')
            .contains('업로드중에는 진입이 불가능합니다', { timeout: 160 * 1000 })
            .should('not.exist');
    } else {
        // Dataset 업로드 확인
        cy.wait(5000);
        cy.contains('업로드중 중에는 진입이 불가능합니다', { timeout: 160 * 1000 }).should('not.exist');
    }
}

function createRecordProject(Title, Detail = Title) {
    cy.get('#createBtn').click(); // 프로젝트 생성 버튼 클릭
    cy.get(':nth-child(2) > .create-select-item__container > .create-select-item__content').click(); // Record 선택
    cy.get('.modal-button-content > .btn').click(); // 다음 버튼 클릭
    cy.wait(3 * 1000);
    cy.get('#project_name').type(Title); // 프로젝트 타이틀 입력
    cy.get('.note-editable').type(Detail); // 프로젝트 Detail 입력
    cy.get('.modal-button-content > .btn-primary').click(); // 프로젝트 생성 버튼 클릭
}

function createTestProject(Name) {
    /* 프로젝트 검색 */
    cy.get('.search-box > .input-form').type(Name);
    cy.get('.search-box > .btn-primary').click();
    cy.wait(3000);
    cy.get('.title').click();
    cy.wait(5000);

    // 평가 프로젝트 생성
    cy.get('.modeler__nav > ul > :nth-child(2) > button').click(); // 평가 프로젝트 탭
    cy.wait(3000);
    cy.get('.btn-floating > div').click({ force: true }); // 생성
    cy.wait(3000);
    cy.get('.modal-button-content > .btn').click(); // 다음
    cy.wait(1000);
    cy.get('.btn-primary').click(); // 다음
    cy.wait(1000);
    cy.get('.btn-primary').click(); // 확인
    cy.wait(5000);
}

module.exports = {
    createImageProject: createImageProject,
    createTestProject: createTestProject,
    createImageDataset: createImageDataset,
    createRecordProject: createRecordProject,
    createRecordDataset: createRecordDataset,
};
