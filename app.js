document.addEventListener("DOMContentLoaded", () => {

  const countries = {
    Afghanistan: ["کابل", "هرات", "بلخ"],
    Iran: ["تهران", "مشهد", "اصفهان"],
    Turkey: ["استانبول", "انقره"]
  };

  const fromCountry = document.getElementById("fromCountry");
  const toCountry = document.getElementById("toCountry");
  const province = document.getElementById("province");
  const bankCard = document.getElementById("bankCard");

  // ❗ اگر یکی از این‌ها نبود → stop کن
  if (!fromCountry || !toCountry || !province) {
    console.log("ERROR: missing HTML elements");
    return;
  }

  // پر کردن dropdown ها
  Object.keys(countries).forEach(c => {

    fromCountry.innerHTML += `<option value="${c}">${c}</option>`;
    toCountry.innerHTML += `<option value="${c}">${c}</option>`;

  });

  // تغییر کشور مقصد
  toCountry.addEventListener("change", () => {

    province.innerHTML = "";

    const list = countries[toCountry.value];
    if (!list) return;

    list.forEach(p => {
      province.innerHTML += `<option>${p}</option>`;
    });

    if (bankCard) {
      bankCard.innerHTML = `
        <div class="bank-real-card">
          <div class="bank-name">${toCountry.value}</div>
        </div>
      `;
    }

  });

});      submitBtn.disabled = true;
    }

  });

});    .classList.remove("d-none");

  const file = document.getElementById("receipt").files[0];

  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = async () => {

    const base64 = reader.result.split(",")[1];

    const body = {

      senderName: document.getElementById("senderName").value,
      receiverName: document.getElementById("receiverName").value,
      fromCountry: document.getElementById("fromCountry").value,
      toCountry: toCountry.value,
      province: province.value,
      phone: document.getElementById("phone").value,
      fileName: file.name,
      base64

    };

    const response = await fetch(
      "YOUR_GOOGLE_SCRIPT_URL",
      {
        method: "POST",
        body: JSON.stringify(body)
      }
    );

    const data = await response.json();

    document.getElementById("loadingOverlay")
      .classList.add("d-none");

    document.getElementById("successBox")
      .classList.remove("d-none");

    document.getElementById("successBox").innerHTML = `
      درخواست موفقانه ثبت شد ✅
      <hr>
      کد رهگیری: <b>${data.trackingCode}</b>
      <br><br>
      نمبر حواله: <b>${data.transferCode}</b>
    `;

  };

}
