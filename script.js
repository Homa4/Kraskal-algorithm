const kraskalAlgorithm = (rad, numOfVertex, matrix) => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext('2d');
    const numberOfVertex = numOfVertex;
    const radius = rad;
    canvas.width = 1000;
    canvas.height = 600;
    const width = 1000;
    const height = 600;
    const arrOfVertex = [];
    const arrOfVertexDx2 = [];

    class LinkedListNode {
        constructor(value, next = null) {
            this.value = value;
            this.next = next;
        }

        toString() {
            return `${this.value}`;
        }
    }

    class LinkedList {
        constructor() {
            this.head = null;
            this.tail = null;
        }

        append(value) {
            const newNode = new LinkedListNode(value);

            if (!this.head) {
                this.head = newNode;
                this.tail = newNode;
                return this;
            }

            this.tail.next = newNode;
            this.tail = newNode;

            return this;
        }

        find(value) {
            if (!this.head) return null;

            let currentNode = this.head;

            while (currentNode) {
                if (currentNode.value === value) {
                    return currentNode;
                }
                currentNode = currentNode.next;
            }

            return null;
        }

        delete(value) {
            if (!this.head) return null;

            let deletedNode = null;
            while (this.head && this.head.value === value) {
                deletedNode = this.head;
                this.head = this.head.next;
            }

            let currentNode = this.head;

            if (currentNode !== null) {
                while (currentNode.next) {
                    if (currentNode.next.value === value) {
                        deletedNode = currentNode.next;
                        currentNode.next = currentNode.next.next;
                    } else {
                        currentNode = currentNode.next;
                    }
                }
            }

            if (this.tail?.value === value) {
                this.tail = currentNode;
            }

            return deletedNode;
        }

        toArray() {
            const nodes = [];
            let currentNode = this.head;

            while (currentNode) {
                nodes.push(currentNode.value);
                currentNode = currentNode.next;
            }

            return nodes;
        }

        sort() {
            if (!this.head || !this.head.next) return this;

            const mergeSort = (head) => {
                if (!head || !head.next) return head;

                const getMiddle = (head) => {
                    if (!head) return head;
                    let slow = head, fast = head;
                    while (fast.next && fast.next.next) {
                        slow = slow.next;
                        fast = fast.next.next;
                    }
                    return slow;
                }

                const sortedMerge = (a, b) => {
                    let result = null;
                    if (!a) return b;
                    if (!b) return a;

                    if (a.value.distance <= b.value.distance) {
                        result = a;
                        result.next = sortedMerge(a.next, b);
                    } else {
                        result = b;
                        result.next = sortedMerge(a, b.next);
                    }

                    return result;
                }

                let middle = getMiddle(head);
                let nextToMiddle = middle.next;

                middle.next = null;

                let left = mergeSort(head);
                let right = mergeSort(nextToMiddle);

                let sortedList = sortedMerge(left, right);
                return sortedList;
            }

            this.head = mergeSort(this.head);
            let currentNode = this.head;
            while (currentNode.next) {
                currentNode = currentNode.next;
            }
            this.tail = currentNode;
            return this;
        }
    }

    function fillLinesWithVertex(firstL, thirdL) {
        const secondL = 3;
        const dx1 = Math.floor(width / firstL) - radius;
        const dx2 = Math.floor(width / secondL);
        const dx3 = Math.floor(width / thirdL) - radius;
        const dy = Math.floor(width / (2 * firstL)) + 100;
        let x = dx1;
        let y = 50;
        let circleNumber = 1;

        for (let line = 0; line < 3; line++) {
            let currentLineCount = line === 0 ? firstL : (line === 1 ? secondL : thirdL);

            for (let i = 0; i < currentLineCount; i++) {
                arrOfVertex.push({ x, y });
                drawCircle(x, y, circleNumber++, radius);
                if (line === 0) {
                    x += dx1;
                } else if (line === 1) {
                    x += dx2;
                    arrOfVertexDx2.push({ x, y });
                } else {
                    x += dx3;
                }
            }

            y += dy;
            x = dx1;
        }
    }

    function generateMisRange(cord) {
        const resArr = [];
        let temp = cord;
        for (let i = 0; i < radius; i++) {
            temp--;
            resArr.push(temp);
        }

        resArr.reverse();
        resArr.push(cord);
        temp = cord;

        for (let i = 0; i < radius; i++) {
            temp++;
            resArr.push(temp);
        }
        return resArr;
    }

    function chekingIfHasMis(cordX) {
        const arr = generateMisRange(cordX);
        return arrOfVertexDx2.some(elem => arr.includes(elem.x));
    }

    function drawCircle(x, y, num, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#EE7674';//main circles
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillText(num, x, y);
    }

    function drawGraph(numberOfVertex) {
        let temp = numberOfVertex - 3;
        let tempForFun;
        if (temp % 2 === 0) {
            tempForFun = temp / 2;
            fillLinesWithVertex(tempForFun, tempForFun);
        } else {
            let second = Math.floor(temp / 2);
            let first = temp - second;
            fillLinesWithVertex(first, second);
        }
    }

    function drawCurvedLine(start, end, weight, angle, bendAngle = Math.PI / 6) {
        const midX = (start.x + end.x) / 2;
        const midY = (start.y + end.y) / 2;
    
        const controlX = midX + Math.cos(bendAngle) * 100;
        const controlY = midY + Math.sin(bendAngle) * 100;
    
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.quadraticCurveTo(controlX, controlY, end.x, end.y);
        ctx.stroke();
    
        // Calculate the position for the weight label on the curve
        const t = 0.5; // mid-point of the curve
        const curveX = Math.pow(1 - t, 2) * start.x + 2 * (1 - t) * t * controlX + Math.pow(t, 2) * end.x;
        const curveY = Math.pow(1 - t, 2) * start.y + 2 * (1 - t) * t * controlY + Math.pow(t, 2) * end.y;
    
        drawWeight({ x: curveX, y: curveY }, weight, angle);
    }
    


    function drawWeight(cords, weight, angle) {
        ctx.save(); 
        ctx.translate(cords.x, cords.y); 
        // ctx.rotate(angle); 
    
        ctx.beginPath();
        ctx.ellipse(0, 0, radius - 10, (radius - 10) / 2, angle, 0, Math.PI * 2);
        ctx.fillStyle = '#9DBF9E';//ellips
        ctx.fill();
        ctx.closePath();
    
        ctx.fillStyle = 'black';
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
    
        ctx.fillText(weight, 0, 0);
    
        ctx.restore(); 
    }
    

    function drawStraitLine(start, end, weight, angle) {
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
        ctx.closePath();
        
        const midX = (start.x + end.x) / 2;
        const midY = (start.y + end.y) / 2;
        drawWeight({ x: midX, y: midY }, weight, angle);
    }

    function drawEdgeLine(vertex1, vertex2, distance, angle) {
        const { x: x1, y: y1 } = vertex1;
        const { x: x2, y: y2 } = vertex2;

        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;

        const hasMis = chekingIfHasMis(midX);

        let drawCurved = false;

        arrOfVertex.forEach((elem) => {
            if (elem.x === midX && elem.y === midY) {
                drawCurved = true;
            } else if (hasMis && elem.y === midY) {
                drawCurved = true;
            }
        });

        if (drawCurved) {
            drawCurvedLine({ x: x1, y: y1 }, { x: x2, y: y2 }, distance, angle);
        } else {
            drawStraitLine({ x: x1, y: y1 }, { x: x2, y: y2 }, distance, angle);
        }
    }

    function drawGraphEdges() {
        const edges = new LinkedList();
        for (let i = 0; i < numberOfVertex; i++) {
            for (let j = i + 1; j < numberOfVertex; j++) {
                if (matrix[i][j] > 0) {
                    edges.append({ start: i, end: j, distance: matrix[i][j] });
                }
            }
        }

        edges.sort();

        const parent = [];
        const rank = [];

        function find(u) {
            if (parent[u] !== u) {
                parent[u] = find(parent[u]);
            }
            return parent[u];
        }

        function union(u, v) {
            const rootU = find(u);
            const rootV = find(v);

            if (rootU !== rootV) {
                if (rank[rootU] > rank[rootV]) {
                    parent[rootV] = rootU;
                } else if (rank[rootU] < rank[rootV]) {
                    parent[rootU] = rootV;
                } else {
                    parent[rootV] = rootU;
                    rank[rootU]++;
                }
            }
        }

        for (let i = 0; i < numberOfVertex; i++) {
            parent[i] = i;
            rank[i] = 0;
        }

        let currentNode = edges.head;
        let edgeCount = 0;

        while (currentNode && edgeCount < numberOfVertex - 1) {
            const edge = currentNode.value;
            if (find(edge.start) !== find(edge.end)) {
                union(edge.start, edge.end);
                const angle = Math.atan2(
                    arrOfVertex[edge.end].y - arrOfVertex[edge.start].y,
                    arrOfVertex[edge.end].x - arrOfVertex[edge.start].x
                );
                drawEdgeLine(arrOfVertex[edge.start], arrOfVertex[edge.end], edge.distance, angle);
                edgeCount++;
            }
            currentNode = currentNode.next;
        }

        console.log(edges.toArray());
    }

    drawGraph(numberOfVertex);
    drawGraphEdges();
    console.log(arrOfVertexDx2);
    console.log(matrix);
}

export default kraskalAlgorithm;
