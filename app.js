document.addEventListener("DOMContentLoaded", () => {
  const connectBtn = document.getElementById("connectWallet");
  const xpDisplay = document.getElementById("xpDisplay");
  const activityList = document.getElementById("activityList");
  const feedList = document.getElementById("feedList");
  const buyTokenBtn = document.getElementById("buyTokenBtn");
  const buyStatus = document.getElementById("buyStatus");
  const leaderboardList = document.getElementById("leaderboardList");
  const tabs = document.querySelectorAll(".tab-btn");
  const sections = document.querySelectorAll(".tab-section");

  let userAddress = null;
  let xpPoints = 0;

  // Wallet connect
  connectBtn.addEventListener("click", async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        userAddress = accounts[0];
        connectBtn.innerText = userAddress.slice(0, 6) + "..." + userAddress.slice(-4);
        loadUserData();
      } catch (err) {
        alert("Connection failed.");
      }
    } else {
      alert("No Ethereum wallet found.");
    }
  });

  // Load user data (mocked)
  function loadUserData() {
    xpPoints = 125; // mock XP
    xpDisplay.innerText = xpPoints + " XP 🔥";

    // Mock activity feed
    const activities = [
      "Jessepollak coined MemeX",
      "Spawniz minted GlitchLord",
      "You bought NFT for 0.003 ETH",
    ];
    activityList.innerHTML = activities.map(a => `<li>📈 ${a}</li>`).join("");

    // Mock live feed
    const live = [
      "BaseLord minted Token A",
      "ZoraMaxxer coined MemePack",
      "Spawniz bought WarpNFT",
    ];
    feedList.innerHTML = live.map(l => `<li>🔥 <strong>${l.split(" ")[0]}</strong> ${l.split(" ").slice(1).join(" ")}</li>`).join("");

    // Mock leaderboard
    const leaderboard = [
      { user: "Alice", xp: 1200 },
      { user: "Dave", xp: 980 },
      { user: "Spawniz", xp: 700 },
    ];
    leaderboardList.innerHTML = leaderboard
      .map((p, i) => `<li><strong>#${i + 1}</strong> ${p.user} - ${p.xp} XP</li>`)
      .join("");
  }

  // Buy token mock
  buyTokenBtn?.addEventListener("click", () => {
    buyStatus.innerText = "Minting WarpAI Coin...";
    setTimeout(() => {
      buyStatus.innerText = "WarpAI Coin minted successfully!";
      xpPoints += 50;
      xpDisplay.innerText = xpPoints + " XP 🔥";
    }, 1500);
  });

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const target = tab.getAttribute("data-tab");
      sections.forEach(section => {
        section.classList.toggle("active", section.id === target);
      });
    });
  });

  // Default active tab
  tabs[0].click();
});