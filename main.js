import kraskalAlgorithm from './script.js';
import allMatrixs from './matrixGenerator.js';
import undefinedGraph from './undirectGraph.js';

const radius = document.querySelector(".radius");
const numOfVertex = document.querySelector(".numberOfVertex");
const button = document.querySelector(".buttonUndef");
const buttonK = document.querySelector(".buttonK");

button.addEventListener("click", () => {
    const radiusValue = Number(radius.value);
    const numOfVertexValue = Number(numOfVertex.value);
    const matrix = allMatrixs(numOfVertexValue);
    kraskalAlgorithm(radiusValue, numOfVertexValue, matrix);
    undefinedGraph(radiusValue, numOfVertexValue, matrix);
    console.log(matrix);
});
