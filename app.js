document.addEventListener("DOMContentLoaded", () => {
  const walletDisplay = document.getElementById("headerWalletAddress");
  const walletDisplayProfile = document.getElementById("headerWalletAddressProfile");
  const connectBtn = document.getElementById("connectWallet");
  const activityList = document.getElementById("activityList");
  const feedList = document.getElementById("feedList");
  const leaderboardList = document.getElementById("leaderboardList");
  const buyBtn = document.getElementById("buyTokenBtn");
  const buyStatus = document.getElementById("buyStatus");
  const streakDisplay = document.getElementById("streakDisplay");
  const xpDisplay = document.getElementById("xpDisplay");
  const inviteInput = document.getElementById("inviteCode");
  const inviteStatus = document.getElementById("inviteStatus");

  let userAddress = null;
  let userXP = 0;
  let userStreak = 0;

  connectBtn.addEventListener("click", async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        userAddress = accounts[0];
        walletDisplay.innerText = userAddress.slice(0,6) + "..." + userAddress.slice(-4);
        walletDisplayProfile.innerText = walletDisplay.innerText;
        connectBtn.style.display = "none";
        loadUserData();
      } catch {
        alert("Connection failed");
      }
    } else {
      alert("No wallet found");
    }
  });

  function loadUserData() {
    // Mock XP & Streak
    userXP = 180;
    userStreak = 6;
    xpDisplay.innerText = `${userXP} XP 🔥`;
    streakDisplay.innerText = `Streak: ${userStreak} Days`;

    // Mock Activity Feed
    const dummyActivity = [
      "Jessepollak coined MemeX",
      "Spawniz minted GlitchLord",
      "You bought NFT for 0.003 ETH"
    ];
    activityList.innerHTML = dummyActivity.map(a => `<li>📈 ${a}</li>`).join("");

    // Mock Live Feed
    const dummyFeed = [
      { user: "BaseLord", action: "minted Token A" },
      { user: "ZoraMaxxer", action: "coined MemePack" },
      { user: "Spawniz", action: "bought WarpNFT" }
    ];
    feedList.innerHTML = dummyFeed.map(f => `<li>🔥 <strong>${f.user}</strong> ${f.action}</li>`).join("");

    // Mock Leaderboard
    const dummyLeaders = [
      { name: "Spawniz", xp: 350 },
      { name: "BaseLord", xp: 290 },
      { name: "ZoraMaxxer", xp: 220 }
    ];
    leaderboardList.innerHTML = dummyLeaders.map((n,i) => `<li>#${i+1} – ${n.name}: ${n.xp} XP</li>`).join("");
  }

  buyBtn.addEventListener("click", () => {
    const amt = document.getElementById("tokenAmount").value;
    if (!userAddress) {
      buyStatus.innerText = "Connect wallet first.";
      return;
    }
    if (!amt || isNaN(amt) || Number(amt) <= 0) {
      buyStatus.innerText = "Enter valid amount.";
      return;
    }
    buyStatus.innerText = `Buying ${amt} ETH worth of WarpAI...`;
    setTimeout(() => {
      buyStatus.innerHTML = `<span style="color:#6abd45;">Success! 🎉</span>`;
      confettiAnimation();
    }, 1500);
  });

  if (inviteInput && inviteStatus) {
    inviteInput.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        const code = inviteInput.value.trim();
        if (!code) {
          inviteStatus.innerText = "Enter invite code.";
          return;
        }
        inviteStatus.innerText = `Claiming invite bonus for code: ${code}...`;
        setTimeout(() => {
          inviteStatus.innerHTML = `<span style="color:#6abd45;">Invite bonus claimed! +50 WP</span>`;
          inviteInput.value = "";
        }, 1500);
      }
    });
  }

  function confettiAnimation() {
    const confetti = document.createElement("div");
    confetti.innerText = "🎊";
    confetti.style.position = "fixed";
    confetti.style.top = "50%";
    confetti.style.left = "50%";
    confetti.style.transform = "translate(-50%, -50%)";
    confetti.style.fontSize = "3rem";
    confetti.style.zIndex = "10000";
    document.body.appendChild(confetti);
    setTimeout(() => document.body.removeChild(confetti), 1500);
  }
});

function switchTab(tabName) {
  document.querySelectorAll(".tab-section").forEach(el => el.classList.remove("active"));
  const target = document.getElementById(tabName);
  if (target) target.classList.add("active");

  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  const activeBtn = Array.from(document.querySelectorAll(".tab-btn")).find(b => b.dataset.tab === tabName);
  if (activeBtn) activeBtn.classList.add("active");
}
