document.addEventListener("DOMContentLoaded", () => {
  const connectBtn = document.getElementById("connectWallet");
  const headerWallet = document.getElementById("headerWalletAddress");
  const gasValue = document.getElementById("gasValue");
  const gasProgress = document.getElementById("gasProgress");
  const buyBtn = document.getElementById("buyWP");
  const warpPoints = document.getElementById("warpPoints");

  let userAddress = null;

  connectBtn.addEventListener("click", async () => {
    if (!window.ethereum) return alert("No wallet found");
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      userAddress = accounts[0];
      headerWallet.innerText = userAddress.slice(0, 6) + "..." + userAddress.slice(-4);
      document.getElementById("connectedWalletInfo").style.display = "flex";
      connectBtn.style.display = "none";
    } catch {
      alert("Connection failed");
    }
  });

  async function fetchGas() {
    try {
      const res = await fetch("https://api.owlracle.info/v4/base/gas");
      const data = await res.json();
      const gwei = data.speeds[1].gasPrice / 1e9;
      gasValue.innerText = `${gwei.toFixed(1)} Gwei`;
      gasProgress.style.width = `${Math.min(gwei * 2, 100)}%`;
    } catch {
      gasValue.innerText = "Error loading gas";
    }
  }

  fetchGas();
  setInterval(fetchGas, 15000);

  buyBtn.addEventListener("click", () => {
    if (!userAddress) return alert("Connect wallet first");
    warpPoints.innerText = parseInt(warpPoints.innerText) + 100;
    alert("Bought 100 WP (mock)");
  });
});