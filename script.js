function calculate() {
    var card1 = parseInt(document.getElementById('card1').value);
    var card2 = parseInt(document.getElementById('card2').value);
    var card3 = parseInt(document.getElementById('card3').value);
    var card4 = parseInt(document.getElementById('card4').value);

    var cards = [card1, card2, card3, card4];

    // Cek semua kemungkinan kombinasi
    var results = find24(cards);

    // Tampilkan hasil
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "";
    results.forEach(function(result) {
        resultDiv.innerHTML += result + "<br>";
    });
}

function find24(cards) {
    var results = [];
    var permutations = generatePermutations(cards);
    
    permutations.forEach(function(perm) {
        var operators = ['+', '-', '*', '/'];
        operators.forEach(function(op1) {
            operators.forEach(function(op2) {
                operators.forEach(function(op3) {
                    var expression = perm[0] + op1 + perm[1] + op2 + perm[2] + op3 + perm[3];
                    if (eval(expression) === 24) {
                        results.push(expression + " = 24");
                    }
                });
            });
        });
    });
    return results;
}

function generatePermutations(arr) {
    var results = [];
    function permute(arr, memo) {
        var cur, memo = memo || [];
        for (var i = 0; i < arr.length; i++) {
            cur = arr.splice(i, 1);
            if (arr.length === 0) {
                results.push(memo.concat(cur));
            }
            permute(arr.slice(), memo.concat(cur));
            arr.splice(i, 0, cur[0]);
        }
        return results;
    }
    return permute(arr);
}
