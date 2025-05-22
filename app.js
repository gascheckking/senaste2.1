document.addEventListener("DOMContentLoaded", () => {
  const walletDisplay = document.getElementById("headerWalletAddress") || document.getElementById("walletAddress");
  const connectBtn = document.getElementById("connectWallet") || document.getElementById("connectBtn");
  const gasTracker = document.getElementById("gasTracker");
  const activityList = document.getElementById("activityList");
  const leaderboardList = document.getElementById("leaderboardList");
  const buyBtn = document.getElementById("buyTokenBtn");
  const buyStatus = document.getElementById("buyStatus");
  const feedList = document.getElementById("feedList");
  const streakDisplay = document.getElementById("streakDisplay");
  const xpDisplay = document.getElementById("xpDisplay");

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

  // MOCKED gas fetch
  async function fetchGas() {
    try {
      const gwei = 8.3;
      gasTracker.innerHTML = `<strong>Base Gas:</strong> ${gwei.toFixed(2)} Gwei`;
    } catch {
      gasTracker.innerHTML = `<span style="color:red;">Failed to load gas</span>`;
    }
  }

  fetchGas();
  setInterval(fetchGas, 15000);

  // MOCKED leaderboard
  const dummyLeaders = [
    { name: "Spawniz", xp: 420 },
    { name: "BaseBoi", xp: 369 },
    { name: "ZoraMaxxer", xp: 215 }
  ];
  if (leaderboardList) {
    leaderboardList.innerHTML = dummyLeaders.map((n, i) => `<li>#${i + 1} – ${n.name}: ${n.xp} XP</li>`).join("");
  }

  // MOCKED activity
  const dummyActivity = [
    "Spawniz coined WarpToken",
    "You minted MemeX",
    "BaseBoi traded for 0.01 ETH"
  ];
  if (activityList) {
    activityList.innerHTML = dummyActivity.map(a => `<li>📈 ${a}</li>`).join("");
  }

  // MOCKED feed
  const dummyFeed = [
    { user: "ZoraMaxxer", action: "minted WarpDrop" },
    { user: "BaseBoi", action: "coined GAS99" },
    { user: "Spawniz", action: "bought OnchainChamp" }
  ];
  if (feedList) {
    feedList.innerHTML = dummyFeed.map(f => `<li>🔥 <strong>${f.user}</strong> ${f.action}</li>`).join("");
  }

  // MOCKED buy flow
  if (buyBtn) {
    buyBtn.addEventListener("click", () => {
      const amt = document.getElementById("tokenAmount").value;
      if (!userAddress) return buyStatus.innerText = "Connect wallet first.";
      if (!amt) return buyStatus.innerText = "Enter amount.";
      buyStatus.innerHTML = `Buying ${amt} ETH worth of WarpAI...`;
      setTimeout(() => {
        buyStatus.innerHTML = `<span style="color:green;">Success! 🎉</span>`;
        confettiAnimation();
      }, 1500);
    });
  }

  function confettiAnimation() {
    const confetti = document.createElement("div");
    confetti.innerText = "🎊";
    confetti.style.position = "fixed";
    confetti.style.top = "50%";
    confetti.style.left = "50%";
    confetti.style.transform = "translate(-50%, -50%)";
    confetti.style.fontSize = "2rem";
    document.body.appendChild(confetti);
    setTimeout(() => document.body.removeChild(confetti), 1500);
  }

  // MOCKED XP & Streak
  if (xpDisplay && streakDisplay) {
    xpDisplay.innerText = "1337 XP 🔥";
    streakDisplay.innerText = "Streak: 7 Days";
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