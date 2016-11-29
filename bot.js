module.exports = {

    var income;

    // tax thresholds//

    let t2 = 18200.0
    let t3 = 37000.0
    let t4 = 80000.0
    let t5 = 180000.0

    // fixed tax + percentages //

    let f3 = 3572.0
    let f4 = 17457.0
    let f5 = 54547.0

    let perc2 = 0.19
    let perc3 = 0.325
    let perc4 = 0.37
    let perc5 = 0.45


function calcTax () {

    let s0 = "You don't make enough money to pay taxes."

    let s1 = "With an annual income of ${income}, your net income is ${netIncome()} with a total of ${taxPaid()} of tax that is payed."

    let s6 = "This means that ${percPaid()}% of your total income goes to tax."

    // let s7 = "The total tax paid consists of the income tax of $\(taxPaid()) and Medicare levy of $\(mediCare()) added together."

    if (income <= 18200) {
        return "${s0}";
    } else {
        return "${s1} ${s6}";

}


    function taxPaid() {
        if (income >= 18201 && income < 37000.5) {
            return ((income - t2)*perc2);
        } else if (income >= 37000.5 && income < 80000.5) {
            return (f3 + (income - t3)*perc3);
        } else if (income >= 80000.5 && income <= 180000) {
            return (f4 + (income - t4)*perc4);
        } else if (income >= 180000) {
            return (f5 + (income - t5)*perc5);
        } else {
            return 0;
        }

    }
    function netIncome() {
            return (income - taxPaid())
    }

  };
