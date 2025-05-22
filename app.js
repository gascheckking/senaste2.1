document.addEventListener("DOMContentLoaded", () => {
  const connectBtn = document.getElementById("connectBtn");
  const walletAddressEl = document.getElementById("walletAddress");
  const walletConnectBtn = document.getElementById("walletConnect");
  const claimRewardBtn = document.getElementById("claimRewardBtn");
  const claimXpBtn = document.getElementById("claimXpBtn");

  // Tab switching
  const tabs = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const target = tab.getAttribute("data-tab");
      tabContents.forEach(tc => {
        tc.id === target ? tc.classList.add("active") : tc.classList.remove("active");
      });
    });
  });

  // Wallet connect simulation
  async function connectWallet() {
    if(window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const addr = accounts[0];
        walletAddressEl.textContent = addr.slice(0,6) + "..." + addr.slice(-4);
        connectBtn.textContent = "Connected";
        walletConnectBtn.textContent = "Connected";
      } catch (e) {
        alert("Connection failed");
      }
    } else {
      alert("No Ethereum wallet found");
    }
  }

  connectBtn.addEventListener("click", connectWallet);
  walletConnectBtn.addEventListener("click", connectWallet);

  claimRewardBtn?.addEventListener("click", () => {
    alert("Reward claimed!");
  });

  claimXpBtn?.addEventListener("click", () => {
    alert("XP claimed!");
  });
});