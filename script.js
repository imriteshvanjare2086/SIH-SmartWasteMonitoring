function updateBinLevels(dryFill, wetFill) {
  // --- Dry Bin ---
  let dryBar = document.getElementById("dryBar");
  dryBar.style.width = dryFill + "%";
  dryBar.innerText = "Filled: " + dryFill + "%";

  if (dryFill >= 90)
  {
    document.getElementById("dryBadge").style.display = "inline-block";
  }
  else 
  {
    document.getElementById("dryBadge").style.display = "none";
  }

  // --- Wet Bin ---
  let wetBar = document.getElementById("wetBar");
  wetBar.style.width = wetFill + "%";
  wetBar.innerText = "Filled: " + wetFill + "%";

  if (wetFill >= 90) 
  {
    document.getElementById("wetBadge").style.display = "inline-block";
  } 
  else 
  {
    document.getElementById("wetBadge").style.display = "none";
  }

  // --- Notifications ---
  let notificationBox = document.getElementById("notification");
  let messages = [];
  if (dryFill >= 90) 
  {
      messages.push("🔔 Dry Waste Bin is full! Please call workers to clean.");
  }

  if (wetFill >= 90) 
  {
    messages.push("🔔 Wet Waste Bin is full! Please call workers to clean.");
  }

  if (messages.length > 0) 
  {
    notificationBox.style.display = "block";
    notificationBox.innerHTML = messages.join("<br>");
    alert(messages.join("\n")); // Popup notification
  } 
  else 
  {
    notificationBox.style.display = "none";
  }
}

// Fetch data from ESP32 (replace IP with your ESP32)
function fetchDataFromHardware() 
{
  fetch("http://192.168.2.6/binData")  // Replace with your ESP32 IP
    .then(res => res.json())
    .then(data => {
      updateBinLevels(data.dry, data.wet);
    })
    .catch(err => console.error("Error fetching data:", err));
}

// Auto update every 5 seconds
setInterval(fetchDataFromHardware, 5000);

// Initial call
fetchDataFromHardware();
