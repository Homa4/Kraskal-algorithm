function allMatrixs(numOfVertex) {
    let matrixDirect = [];
    let matrixUnd = [];
    let matrixB = [];
    let matrixC = [];
    let matrixD = [];
    let matrixH = [];
    let matrixTr = [];
    let matrixW = [];
    const variant = '3318';
    const n1 = Number(variant[0]);
    const n2 = Number(variant[1]);
    const n3 = Number(variant[2]);
    const n4 = Number(variant[3]);

    const kof = 1 - n3 * 0.02 - n4 * 0.005 - 0.25;

    function matrixGeneratorDirect() {
        for (let i = 0; i < numOfVertex; i++) {
            matrixDirect[i] = [];
            for (let j = 0; j < numOfVertex; j++) {
                let elem = Math.floor(Math.random() * 2 * kof);
                matrixDirect[i][j] = elem;
            }
        }
    }

    function matrixGeneratorUndirect() {
        matrixUnd = matrixDirect.map(row => [...row]);
        for (let i = 0; i < numOfVertex; i++) {
            for (let j = 0; j < i; j++) {
                matrixUnd[i][j] = matrixUnd[j][i];
            }
        }
    }

    function matrixBGenerator() {
        for (let i = 0; i < numOfVertex; i++) {
            matrixB[i] = [];
            for (let j = 0; j < numOfVertex; j++) {
                let elem = Math.random() * 2.0;
                matrixB[i][j] = elem;
            }
        }
    }

    function matrixCGenerator() {
        for (let i = 0; i < numOfVertex; i++) {
            matrixC[i] = [];
            for (let j = 0; j < numOfVertex; j++) {
                let elem = Math.ceil(matrixB[i][j] * 100 * matrixUnd[i][j]);
                matrixC[i][j] = elem;
            }
        }
    }

    function matrixDGenerator() {
        for (let i = 0; i < numOfVertex; i++) {
            matrixD[i] = [];
            for (let j = 0; j < numOfVertex; j++) {
                let elem = matrixC[i][j] > 0 ? 1 : 0;
                matrixD[i][j] = elem;
            }
        }
    }

    function matrixHGenerator() {
        for (let i = 0; i < numOfVertex; i++) {
            matrixH[i] = [];
            for (let j = 0; j < numOfVertex; j++) {
                let elem = matrixD[i][j] !== matrixD[j][i] ? 1 : 0;
                matrixH[i][j] = elem;
            }
        }
    }

    function matrixTrGenerator() {
        for (let i = 0; i < numOfVertex; i++) {
            matrixTr[i] = [];
            for (let j = 0; j < numOfVertex; j++) {
                let elem = i < j ? 1 : 0;
                matrixTr[i][j] = elem;
            }
        }
    }

    function matrixWGenerator() {
        for (let i = 0; i < numOfVertex; i++) {
            matrixW[i] = [];
            for (let j = 0; j < numOfVertex; j++) {
                let elem = (matrixD[i][j] + matrixH[i][j] * matrixTr[i][j]) * matrixC[i][j];
                matrixW[i][j] = elem;
            }
        }

        for (let i = 0; i < numOfVertex; i++) {
            for (let j = 0; j < i; j++) {
                matrixW[i][j] = matrixW[j][i];
            }
        }
    }

    matrixGeneratorDirect();
    matrixGeneratorUndirect();
    matrixBGenerator();
    matrixCGenerator();
    matrixDGenerator();
    matrixHGenerator();
    matrixTrGenerator();
    matrixWGenerator();

    

    return matrixW;
}

export default allMatrixs;
