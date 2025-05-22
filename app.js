document.addEventListener("DOMContentLoaded", () => {
  const connectBtn = document.getElementById("connectBtn");
  const walletAddressDiv = document.getElementById("walletAddress");
  const claimXPBtn = document.getElementById("claimXPBtn");
  const rewardsList = document.getElementById("rewardsList");
  const leaderboardList = document.getElementById("leaderboardList");
  const profileInfo = document.getElementById("profileInfo");
  const activitySummary = document.getElementById("activitySummary");
  const trackData = document.getElementById("trackData");

  let userAddress = null;
  let userXP = 0;
  let rewards = [
    { name: "First Mint Bonus", claimed: true },
    { name: "5 Day Streak", claimed: false },
    { name: "Special Airdrop", claimed: false },
  ];

  // Tab switching
  const tabButtons = document.querySelectorAll("nav .tab-btn");
  const tabContents = document.querySelectorAll("main .tab-content");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      tabContents.forEach(tc => tc.classList.remove("active"));

      btn.classList.add("active");
      const target = btn.getAttribute("data-tab");
      document.getElementById(target).classList.add("active");
    });
  });

  connectBtn.addEventListener("click", async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        userAddress = accounts[0];
        walletAddressDiv.innerText = userAddress;
        loadUserData();
      } catch {
        walletAddressDiv.innerText = "Connection failed.";
      }
    } else {
      walletAddressDiv.innerText = "No wallet found.";
    }
  });

  function loadUserData() {
    // Mock activity summary
    activitySummary.innerHTML = `
      <p><strong>+2.50 ETH</strong> Earned</p>
      <p><strong>-1.23 ETH</strong> Spent</p>
      <p>Minted Token #123 via Zora</p>
    `;

    // Mock profile info
    profileInfo.innerHTML = `
      <p>Address: ${userAddress}</p>
      <p>XP: ${userXP} points • 5-day streak</p>
    `;

    // Mock leaderboard
    const leaderboard = [
      { user: "Alice", xp: 1200 },
      { user: "Dave", xp: 980 },
      { user: "Spawniz", xp: 700 }
    ];
    leaderboardList.innerHTML = leaderboard
      .map(u => `<li>${u.user} - ${u.xp} XP</li>`)
      .join("");

    // Mock track data
    trackData.innerHTML = "Tracking all onchain activity...";

    // Show rewards list
    updateRewardsUI();
  }

  function updateRewardsUI() {
    rewardsList.innerHTML = rewards
      .map(r => {
        if (r.claimed) return `<li>${r.name} - Claimed</li>`;
        else return `<li>${r.name} - <button class="claim-btn">${r.claimed ? "Claimed" : "Claim"}</button></li>`;
      })
      .join("");
  }

  document.body.addEventListener("click", e => {
    if (e.target.classList.contains("claim-btn")) {
      const li = e.target.closest("li");
      const rewardName = li.textContent.replace(" - Claim", "");
      alert(`Reward claimed: ${rewardName}`);
      rewards = rewards.map(r => {
        if (r.name === rewardName) r.claimed = true;
        return r;
      });
      updateRewardsUI();
    }
  });

  claimXPBtn.addEventListener("click", () => {
    userXP += 100;
    alert("XP claimed! Your new XP: " + userXP);
    loadUserData();
  });
});