document.addEventListener("DOMContentLoaded", () => {

  const countries = {

    Afghanistan:{
      provinces:["کابل","هرات","بلخ"],
      bank:{
        title:"عزیزی بانک افغانستان",
        number:"909090090009",
        owner:"فرهاد احسان"
      }
    },

    Iran:{
      provinces:["تهران","مشهد","اصفهان"],
      bank:{
        title:"بانک ملت ایران",
        number:"908080909900009",
        owner:"ذین العابدین"
      }
    },

    Turkey:{
      provinces:["استانبول","انقره"],
      bank:{
        title:"بانک ترکیه",
        number:"90809099",
        owner:"علی رضا"
      }
    }

  };

  const fromCountry = document.getElementById("fromCountry");
  const toCountry = document.getElementById("toCountry");
  const province = document.getElementById("province");
  const bankCard = document.getElementById("bankCard");

  const confirmPayment = document.getElementById("confirmPayment");

  // ❗ پر کردن هر دو dropdown (خیلی مهم)
  function loadCountries(){

    fromCountry.innerHTML = `<option value="">کشور مبدا</option>`;
    toCountry.innerHTML = `<option value="">کشور مقصد</option>`;

    Object.keys(countries).forEach(country => {

      fromCountry.innerHTML += `<option value="${country}">${country}</option>`;
      toCountry.innerHTML += `<option value="${country}">${country}</option>`;

    });

  }

  loadCountries();

  // ❗ نمایش ولایت + بانک
  toCountry.addEventListener("change", () => {

    province.innerHTML = "";

    const c = countries[toCountry.value];
    if(!c) return;

    c.provinces.forEach(p => {
      province.innerHTML += `<option>${p}</option>`;
    });

    bankCard.innerHTML = `
      <div class="bank-real-card">

        <div class="bank-name">
          ${c.bank.title}
        </div>

        <div class="bank-number">
          ${c.bank.number}
        </div>

        <div class="bank-owner">
          ${c.bank.owner}
        </div>

        <div class="bank-country">
          ${toCountry.value}
        </div>

      </div>

      <div class="alert alert-info mt-3">
        لطفاً مبلغ را به حساب بالا واریز نموده و سپس رسید را آپلود کنید.
      </div>
    `;

  });

  // ❗ فعال شدن آپلود بعد از تیک
  confirmPayment.addEventListener("change", () => {

    const uploadBox = document.getElementById("uploadBox");
    const submitBtn = document.getElementById("submitBtn");

    if(confirmPayment.checked){
      uploadBox.classList.remove("d-none");
      submitBtn.disabled = false;
    } else {
      uploadBox.classList.add("d-none");
      submitBtn.disabled = true;
    }

  });

});
