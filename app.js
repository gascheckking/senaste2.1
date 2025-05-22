document.addEventListener("DOMContentLoaded", () => {
  const walletDisplay = document.getElementById("headerWalletAddress") || document.getElementById("walletAddress");
  const connectBtn = document.getElementById("connectWallet") || document.getElementById("connectBtn");
  const gasTracker = document.getElementById("gasTracker");
  const activityList = document.getElementById("activityList");
  const leaderboardList = document.getElementById("leaderboardList");
  const buyBtn = document.getElementById("buyTokenBtn");
  const buyStatus = document.getElementById("buyStatus");

  let userAddress = null;

  connectBtn.addEventListener("click", async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        userAddress = accounts[0];
        walletDisplay.innerText = userAddress.slice(0, 6) + "..." + userAddress.slice(-4);
        document.getElementById("connectedWalletInfo")?.style.display = "flex";
        connectBtn.style.display = "none";
      } catch {
        alert("Connection failed");
      }
    } else {
      alert("No wallet found");
    }
  });

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
  setInterval(fetchGas, 15000);

  const dummyLeaders = ["Spawniz", "0x1234", "BaseLord", "ZoraMaxxer"];
  if (leaderboardList) {
    leaderboardList.innerHTML = dummyLeaders.map((n, i) => `<li>#${i + 1} – ${n}</li>`).join("");
  }

  const dummyActivity = ["Minted Token #123 via Zora", "Bought NFT on OpenSea", "Sent 0.001 ETH"];
  if (activityList) {
    activityList.innerHTML = dummyActivity.map(a => `<li>📉 ${a}</li>`).join("");
  }

  if (buyBtn) {
    buyBtn.addEventListener("click", () => {
      const amt = document.getElementById("tokenAmount").value;
      if (!userAddress) return buyStatus.innerText = "Connect wallet first.";
      if (!amt) return buyStatus.innerText = "Enter amount.";
      buyStatus.innerHTML = `Simulating buy of ${amt} ETH worth of WarpAI...`;
      setTimeout(() => {
        buyStatus.innerHTML = `<span style="color:green;">Success (mocked)</span>`;
      }, 1500);
    });
  }
});

function switchTab(tabName) {
  document.querySelectorAll(".tab-section").forEach(el => el.style.display = "none");
  const targetTab = document.querySelector(`#${tabName}`);
  if (targetTab) targetTab.style.display = "block";
  document.querySelectorAll(".footer-nav button").forEach(btn => btn.classList.remove("active"));
  const btn = Array.from(document.querySelectorAll(".footer-nav button")).find(b => b.dataset.tab === tabName);
  if (btn) btn.classList.add("active");
}
