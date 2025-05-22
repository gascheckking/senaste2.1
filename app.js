document.addEventListener("DOMContentLoaded", () => {
  const walletDisplay = document.getElementById("headerWalletAddress") || document.getElementById("walletAddress");
  const connectBtn = document.getElementById("connectWallet") || document.getElementById("connectBtn");
  const gasTracker = document.getElementById("gasTracker");
  const activityList = document.getElementById("activityList");
  const leaderboardList = document.getElementById("leaderboardList");
  const feedList = document.getElementById("feedList");
  const streakDisplay = document.getElementById("streakDisplay");
  const xpDisplay = document.getElementById("xpDisplay");

  let userAddress = null;

  connectBtn?.addEventListener("click", async () => {
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
      gasTracker.innerHTML = `<strong>Base Gas:</strong> ${gwei.toFixed(2)} Gwei ($${(gwei * 0.00000002 * 3000).toFixed(4)})`;
    } catch {
      gasTracker.innerHTML = `<span style="color:red;">Failed to load gas</span>`;
    }
  }

  fetchGas();
  setInterval(fetchGas, 15000);

  if (leaderboardList) {
    leaderboardList.innerHTML = [
      "Spawniz – 340 XP",
      "BaseLord – 275 XP",
      "ZoraMaxxer – 199 XP"
    ].map((n, i) => `<li>#${i + 1} – ${n}</li>`).join("");
  }

  if (activityList) {
    activityList.innerHTML = [
      "Jessepollak coined MemeX",
      "Spawniz minted GlitchLord",
      "You bought NFT for 0.003 ETH"
    ].map(a => `<li>📈 ${a}</li>`).join("");
  }

  if (feedList) {
    feedList.innerHTML = [
      "🔥 BaseLord minted Token A",
      "🔥 ZoraMaxxer coined MemePack",
      "🔥 Spawniz bought WarpNFT"
    ].map(f => `<li>${f}</li>`).join("");
  }

  if (xpDisplay && streakDisplay) {
    xpDisplay.innerText = "125 XP 🔥";
    streakDisplay.innerText = "Streak: 5 Days";
  }
});

function switchTab(tabName) {
  document.querySelectorAll(".tab-content").forEach(el => el.classList.remove("active"));
  const targetTab = document.querySelector(`#${tabName}`);
  if (targetTab) targetTab.classList.add("active");
  document.querySelectorAll(".footer-nav button").forEach(btn => btn.classList.remove("active"));
  const btn = Array.from(document.querySelectorAll(".footer-nav button")).find(b => b.dataset.tab === tabName);
  if (btn) btn.classList.add("active");
}
