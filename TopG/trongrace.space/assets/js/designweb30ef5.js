const main = async () => {

    const {
        tronWeb
    } = window;
    const TRX_IN_SUN = 1000000;
    if (!tronWeb) return console.log('Do not run this before tronWeb is injected.');

    const contractAddress = 'TQ1nzLrLhQauF5zZrJUy7SZHQr57P2Vo3d';
    const contract = await tronWeb.contract().at(contractAddress);

    var myVar = setInterval(compute, 5000);
    async function compute() {

        const userAddress = tronWeb.defaultAddress.base58;
        const userBasePercent = (await contract.getUserPercentRate(tronWeb.defaultAddress.base58).call() / 100);
        const contractBonusRate = (await contract.getContractBalanceRate().call() / 100) - 1;
        const leaderBonusRate = (await contract.getLeaderBonusRate().call() / 100);
        const communityBonusRate = (await contract.getCommunityBonusRate().call() / 100);
        const holdPercentRate = userBasePercent - contractBonusRate - 1;
        const userPercentRate = userBasePercent + leaderBonusRate + communityBonusRate;
        var reflink = "https://trongrace.space?ref=" + tronWeb.defaultAddress.base58;
        const userAvailable = await contract.getUserAvailable(tronWeb.defaultAddress.base58).call() / TRX_IN_SUN;
        const totalInvested = await contract.getUserTotalDeposits(tronWeb.defaultAddress.base58).call() / TRX_IN_SUN;
        const totalWithdrawn = await contract.getUserTotalWithdrawn(tronWeb.defaultAddress.base58).call() / TRX_IN_SUN;
        const totalNumberOfDeposits = await contract.getUserAmountOfDeposits(tronWeb.defaultAddress.base58).call();
        const userLastDepositTime = await contract.getUserLastDeposit(tronWeb.defaultAddress.base58).call() * 1000;
        const totalEarned = totalWithdrawn + userAvailable;
        const refRewards = await contract.getUserReferralsStats(tronWeb.defaultAddress.base58).call();
        const refBonus = tronWeb.toDecimal(refRewards["1"]._hex) / TRX_IN_SUN;
        const refNumbers = refRewards["2"];
        const ref1 = refNumbers["0"];
        const ref2 = refNumbers["1"];
        const ref3 = refNumbers["2"];
        const ref4 = refNumbers["3"];
        const ref5 = refNumbers["4"];
        const ref6 = refNumbers["5"];
        const ref7 = refNumbers["6"];
        const ref8 = refNumbers["7"];
        const ref9 = refNumbers["8"];
        const ref10 = refNumbers["9"];
        const ref11 = refNumbers["10"];
        const contractBalance = await contract.totalInvested().call() / TRX_IN_SUN;
        const totalUsers = await contract.totalDeposits().call();
        const d = new Date(userLastDepositTime);
        if (d.getFullYear() > 2019) {
            document.getElementById("userCheckpoint").innerHTML = d.toDateString();
        }

        document.getElementById("walletAddress").value = userAddress;
        document.getElementById("contributeAddress").style.display = "block";
        document.getElementById("contributeAddresss").style.display = "none";
        document.getElementById("userPercentRate").innerHTML = userPercentRate.toFixed(1);
        document.getElementById("holdPercentRate").innerHTML = holdPercentRate.toFixed(1);
        document.getElementById("contractBonusRate").innerHTML = contractBonusRate.toFixed(1);
        document.getElementById("leaderBonusRate").innerHTML = leaderBonusRate.toFixed(1);
        document.getElementById("communityBonusRate").innerHTML = communityBonusRate.toFixed(1);

        if (totalInvested > 0) {
            document.getElementById("reflinkdisplay").value = reflink;
        } else {
            document.getElementById("reflinkdisplay").value = "Not an Active Account";
        }

        document.getElementById("userAvailable").innerHTML = userAvailable.toFixed(4);
        document.getElementById("totalInvested").innerHTML = totalInvested.toFixed(4);
        document.getElementById("totalWithdrawn").innerHTML = totalWithdrawn.toFixed(4);
        document.getElementById("totalNumberOfDeposits").innerHTML = totalNumberOfDeposits;
        document.getElementById("totalEarned").innerHTML = totalEarned.toFixed(4);
        document.getElementById("refRewards").innerHTML = refBonus.toFixed(4);
        document.getElementById("ref1").innerHTML = ref1;
        document.getElementById("ref2").innerHTML = ref2;
        document.getElementById("ref3").innerHTML = ref3;
        document.getElementById("ref4").innerHTML = ref4;
        document.getElementById("ref5").innerHTML = ref5;
        document.getElementById("ref6").innerHTML = ref6;
        document.getElementById("ref7").innerHTML = ref7;
        document.getElementById("ref8").innerHTML = ref8;
        document.getElementById("ref9").innerHTML = ref9;
        document.getElementById("ref10").innerHTML = ref10;
        document.getElementById("ref11").innerHTML = ref11;
        document.getElementById("totalInvested1").innerHTML = contractBalance.toFixed(0);
        document.getElementById("userPercentRate1").innerHTML = userPercentRate.toFixed(1);
        document.getElementById("totalUsers").innerHTML = totalUsers;
        if (location.href.includes("ref=")) {
            var num = location.href.indexOf("ref=")
            var refAddress = (location.href.substring(num + 4, num + 38)).toString();
            document.getElementById("upline").innerHTML = refAddress;
        }
    }

    tronWeb.on('addressChanged', async ({
        base58
    }) => {
        compute();
    });

    let deposting = false
    const investButton1 = $('#investButton1');
    investButton1.on('click', async e => {
        e.preventDefault();
        if (deposting) {
            return false
        }

        deposting = true
        investButton1.html(`<i class="fa fa-link"></i> DEPOSIT`)
        investButton1.css('opacity', 0.8)

        const leader = 'TPD6sM5PYAYB2ZNcwmvmvNXDWBTc9xLPbJ';
        const trxNum = $('#trxValue1');
        const trxVal = trxNum.val();
        if (trxVal <= 0) return;

        try {
            if (location.href.includes("ref=")) {
                var num = location.href.indexOf("ref=")
                var refAddress = (location.href.substring(num + 4, num + 38)).toString();
                await contract.invest(refAddress).send({
                    callValue: trxVal * TRX_IN_SUN
                });
                swal({
                    title: "Success !, Check Personal Wallet",
                    icon: "success",
                });
                compute();
            } else {
                await contract.invest(leader).send({
                    callValue: trxVal * TRX_IN_SUN
                });
                swal({
                    title: "Success !, Check Personal Wallet",
                    icon: "success",
                });
                compute();
            }
            compute();
            deposting = false
            investButton1.html(`<i class="fa fa-link"></i> DEPOSIT `)
            investButton1.css('opacity', 1)
        } catch (err) {
            //aert(err)
            swal({
                title: "Insufficient Balance, insufficient energy or Canceled.",
                icon: "error",
            });
            deposting = false
            investButton1.html(`<i class="fa fa-link"></i> DEPOSIT `)
            investButton1.css('opacity', 1)
        }


    });

    const withdrawButton = $('#withdrawbutton');
    withdrawButton.on('click', async e => {
        e.preventDefault();
        await contract.withdraw().send({
            feeLimit: 1000000000
        });
        compute();
    });

}

const onLoadHandler = () => {
    let counter = 0;
    const maxAttempts = 5; // We're only going to check this many times.

    // Add an event listener for when 'tronWeb' is successfully injected.
    window.addEventListener('tronWebInjected', main, {
        once: true
    });

    const intervalId = setInterval(() => {
        const {
            tronWeb
        } = window;
        counter++;

        // If we tried more than the 'maxAttempt' we stop checking.
        if (counter > maxAttempts) {
            //console.log(`- Could not find tronWeb after ${counter - 1} attempts.`);

            // Clean up the event listener.
            window.removeEventListener('tronWebInjected', main, {
                once: true
            });

            // Clean up interval.
            return clearInterval(intervalId);
        }

        //console.log(`${counter}: Checking for tronWeb...`);

        // Check if 'tronWeb' is injected in the page.
        if (tronWeb && tronWeb.ready) {
            //console.log('- tronWeb was successfully injected!');

            // Clean up interval.
            clearInterval(intervalId);

            // Dispatch 'tronWebInjected' event to trigger the 'main' function.
            dispatchEvent(new Event('tronWebInjected'));
        }
    }, 1000); // We're going to check ever 1000 milliseconds (or every 1 seconds).
};
window.addEventListener('load', onLoadHandler, {
    once: true
});

function copyFunction() {
    var copyText = document.getElementById("reflinkdisplay");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
}