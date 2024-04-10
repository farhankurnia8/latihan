function calculate() {
    var card1 = parseInt(document.getElementById('card1').value);
    var card2 = parseInt(document.getElementById('card2').value);
    var card3 = parseInt(document.getElementById('card3').value);
    var card4 = parseInt(document.getElementById('card4').value);
    var card5 = parseInt(document.getElementById('card5').value);

    var cards = [card1, card2, card3, card4, card5];

    var results = find32(cards);

    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "";

    if (results.length > 0) {
        resultDiv.innerHTML = "<strong>Hasil 32 dapat diperoleh dengan kombinasi kartu berikut:</strong><br>";
        results.forEach(function(result) {
            resultDiv.innerHTML += result + "<br>";
        });
    } else {
        resultDiv.innerHTML = "Tidak ada kombinasi kartu yang menghasilkan 32.";
    }
}

function find32(cards) {
    var results = [];
    var permutations = generatePermutations(cards);
    
    permutations.forEach(function(perm) {
        var operators = ['+', '-', '*', '/'];
        operators.forEach(function(op1) {
            operators.forEach(function(op2) {
                operators.forEach(function(op3) {
                    operators.forEach(function(op4) {
                        var expression = '(' + perm[0] + op1 + perm[1] + ')' + op2 + '(' + perm[2] + op3 + perm[3] + ')' + op4 + perm[4];
                        if (eval(expression) === 32) {
                            var result = "(((" + perm[0] + op1 + perm[1] + ")" + op2 + "(" + perm[2] + op3 + perm[3] + "))" + op4 + perm[4] + ") = 32";
                            results.push(result);
                        }
                    });
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
