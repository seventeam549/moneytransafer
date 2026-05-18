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

const toCountry =
  document.getElementById("toCountry");

const province =
  document.getElementById("province");

const bankCard =
  document.getElementById("bankCard");

Object.keys(countries).forEach(country=>{

  toCountry.innerHTML += 
    <option value="${country}">
      ${country}
    </option>
  ;

});

toCountry.addEventListener("change",()=>{

  province.innerHTML = "";

  const c = countries[toCountry.value];

  c.provinces.forEach(p=>{

    province.innerHTML += 
      <option>${p}</option>
    ;

  });

  bankCard.innerHTML = 

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

  لطفاً مبلغ مورد نظر را به حساب فوق واریز نموده
  و سپس رسید پرداخت را آپلود نمایید.

  </div>

  ;

});

const confirmPayment =
  document.getElementById("confirmPayment");

confirmPayment.addEventListener("change",()=>{

  const uploadBox =
    document.getElementById("uploadBox");

  const submitBtn =
    document.getElementById("submitBtn");

  if(confirmPayment.checked){

    uploadBox.classList.remove("d-none");

    submitBtn.disabled = false;

  }else{

    uploadBox.classList.add("d-none");

    submitBtn.disabled = true;

  }

});

async function submitForm(){

  document.getElementById("loadingOverlay")
    .classList.remove("d-none");

  const file =
    document.getElementById("receipt").files[0];

  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = async ()=>{

    const base64 =
      reader.result.split(",")[1];

    const body = {

      senderName:
        document.getElementById("senderName").value,

      receiverName:
        document.getElementById("receiverName").value,

      fromCountry:
        document.getElementById("fromCountry").value,

      toCountry:
        toCountry.value,

      province:
        province.value,

      phone:
        document.getElementById("phone").value,

      fileName:file.name,

      base64
    };

    const response = await fetch(
      "YOUR_GOOGLE_SCRIPT_URL",
      {
        method:"POST",
        body:JSON.stringify(body)
      }
    );

    const data = await response.json();

    document.getElementById("loadingOverlay")
      .classList.add("d-none");

    document.getElementById("successBox")
      .classList.remove("d-none");

    document.getElementById("successBox")
      .innerHTML = 

      درخواست موفقانه ثبت شد ✅

      <hr>

      کد رهگیری:
      <b>${data.trackingCode}</b>

      <br><br>

      نمبر حواله:
      <b>${data.transferCode}</b>

      ;

  };

}
