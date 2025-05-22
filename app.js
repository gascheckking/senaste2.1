document.addEventListener("DOMContentLoaded", () => {
  const connectBtn = document.getElementById("connectWalletBtn");
  const walletAddressDiv = document.getElementById("walletAddress");
  const xpDisplay = document.getElementById("xpDisplay");
  const txList = document.getElementById("txList");
  const claimXPBtn = document.getElementById("claimXPBtn");
  const rewardXP = document.getElementById("rewardXP");
  const rewardStreak = document.getElementById("rewardStreak");
  const mintBtn = document.getElementById("mintBtn");
  const mintAmount = document.getElementById("mintAmount");
  const mintStatus = document.getElementById("mintStatus");
  const leaderboardList = document.getElementById("leaderboardList");
  const referralLinkInput = document.getElementById("referralLink");
  const copyReferralBtn = document.getElementById("copyReferralBtn");
  const copyStatus = document.getElementById("copyStatus");

  let userAddress = null;
  let xp = 0;
  let streak = 0;

  // Wallet connect with ethers.js
  connectBtn.addEventListener("click", async () => {
    if (!window.ethereum) {
      alert("No Ethereum wallet found.");
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      userAddress = await signer.getAddress();
      walletAddressDiv.style.display = "block";
      walletAddressDiv.textContent = userAddress.slice(0, 6) + "..." + userAddress.slice(-4);
      connectBtn.style.display = "none";
      loadTransactions();
      loadLeaderboard();
      updateRewardsUI();
      generateReferralLink();
    } catch (e) {
      alert("Wallet connection failed.");
      console.error(e);
    }
  });

  // Mocked transaction data for demo
  function loadTransactions() {
    if (!userAddress) return;
    // Normally fetch real tx data from API
    const dummyTxs = [
      { hash: "0xabc123...", type: "Minted", token: "WarpAI Token", value: "0.01 ETH", date: "2025-05-23" },
      { hash: "0xdef456...", type: "Bought", token: "NFT #42", value: "0.005 ETH", date: "2025-05-22" },
      { hash: "0xghi789...", type: "Sold", token: "NFT #13", value: "0.008 ETH", date: "2025-05-20" }
    ];
    txList.innerHTML = "";
    dummyTxs.forEach(tx => {
      const li = document.createElement("li");
      li.textContent = `${tx.date}: ${tx.type} ${tx.token} for ${tx.value}`;
      txList.appendChild(li);
    });
  }

  // Rewards and streaks
  claimXPBtn?.addEventListener("click", () => {
    xp += 10;
    streak += 1;
    updateRewardsUI();
    alert(`You claimed 10 XP! Current streak: ${streak} days.`);
  });

  function updateRewardsUI() {
    rewardXP.textContent = xp;
    rewardStreak.textContent = streak;
    xpDisplay.textContent = `XP: ${xp} 🔥`;
  }

  // Minting simulation
  mintBtn.addEventListener("click", () => {
    const amount = parseFloat(mintAmount.value);
    if (!amount || amount < 0.001) {
      mintStatus.textContent = "Enter a valid amount ≥ 0.001 ETH";
      return;
    }
    mintStatus.textContent = `Minting ${amount} ETH worth of WarpAI Token...`;
    setTimeout(() => {
      mintStatus.textContent = "Mint successful! 🎉";
      xp += 20;
      updateRewardsUI();
    }, 1500);
  });

  // Leaderboard dummy data
  function loadLeaderboard() {
    const leaders = [
      { name: "Spawniz", xp: 350 },
      { name: "BaseLord", xp: 290 },
      { name: "ZoraMaxxer", xp: 220 },
      { name: userAddress ? `${userAddress.slice(0,6)}...` : "You", xp: xp }
    ];
    leaderboardList.innerHTML = "";
    leaders.forEach((leader, i) => {
      const li = document.createElement("li");
      li.textContent = `#${i+1} – ${leader.name}: ${leader.xp} XP`;
      if (leader.name.startsWith(userAddress?.slice(0,6))) li.style.fontWeight = "bold";
      leaderboardList.appendChild(li);
    });
  }

  // Referral link
  function generateReferralLink() {
    const baseUrl = "https://warp.ai/invite/";
    referralLinkInput.value = userAddress ? baseUrl + userAddress : baseUrl;
  }

  copyReferralBtn.addEventListener("click", () => {
    referralLinkInput.select();
    referralLinkInput.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(referralLinkInput.value).then(() => {
      copyStatus.textContent = "Referral link copied!";
      setTimeout(() => { copyStatus.textContent = ""; }, 2000);
    });
  });

  // Navigation tabs
  const tabs = document.querySelectorAll(".footer-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
      document.getElementById("tab-" + target).classList.add("active");
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });
});