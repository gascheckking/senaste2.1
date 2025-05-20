// app.js

document.addEventListener("DOMContentLoaded", () => {
  const walletStatus = document.getElementById("walletAddress");
  const connectBtn = document.getElementById("connectBtn");
  const gasTracker = document.getElementById("gasTracker");
  const activityList = document.getElementById("activityList");
  const leaderboardList = document.getElementById("leaderboardList");
  const buyBtn = document.getElementById("buyTokenBtn");
  const buyStatus = document.getElementById("buyStatus");

  let userAddress = null;

  // Wallet Connect (native, no wagmi)
  connectBtn.addEventListener("click", async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        userAddress = accounts[0];
        walletStatus.innerText = userAddress.slice(0, 6) + "..." + userAddress.slice(-4);
      } catch (error) {
        walletStatus.innerText = "Connection failed.";
      }
    } else {
      walletStatus.innerText = "No wallet found.";
    }
  });

  // Fetch gas data
  async function fetchGas() {
    try {
      const res = await fetch("https://api.owlracle.info/v4/base/gas");
      const data = await res.json();
      const gwei = data.speeds[1].gasPrice / 1e9;
      gasTracker.innerHTML = `<strong>Base Gas:</strong> ${gwei.toFixed(2)} Gwei`;
    } catch {
      gasTracker.innerHTML = `<span style="color:red;">Failed to load gas</span>`;
    }
  }

  fetchGas();
  setInterval(fetchGas, 15000); // update every 15s

  // Dummy leaderboard
  const dummyLeaders = ["Spawniz", "0x1234", "BaseLord", "ZoraMaxxer"];
  leaderboardList.innerHTML = dummyLeaders.map((n, i) => `<li>#${i + 1} – ${n}</li>`).join("");

  // Dummy activity
  const dummyActivity = ["Minted token X", "Claimed rewards", "Bought WarpAI"];
  activityList.innerHTML = dummyActivity.map(a => `<li>${a}</li>`).join("");

  // Dummy buy button (no tx)
  buyBtn.addEventListener("click", () => {
    const amt = document.getElementById("tokenAmount").value;
    if (!userAddress) return buyStatus.innerText = "Connect wallet first.";
    if (!amt) return buyStatus.innerText = "Enter amount.";

    buyStatus.innerHTML = `Simulating buy of ${amt} ETH worth of WarpAI...`;
    setTimeout(() => {
      buyStatus.innerHTML = `<span style="color:green;">Success (mocked)</span>`;
    }, 1500);
  });
});