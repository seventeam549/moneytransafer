const countries = {
  Iran: {
    provinces:["تهران","مشهد","اصفهان"],
    account:{
      number:"0101010101",
      name:"ذین العابدین"
    }
  },

  Germany: {
    provinces:["Berlin","Hamburg","Bayern"],
    account:{
      number:"4455667788",
      name:"Hans Muller"
    }
  },

  Turkey: {
    provinces:["Istanbul","Ankara"],
    account:{
      number:"9988776655",
      name:"Ahmet"
    }
  }
};

const fromCountry = document.getElementById("fromCountry");
const toCountry = document.getElementById("toCountry");
const province = document.getElementById("province");
const accountInfo = document.getElementById("accountInfo");

fromCountry.innerHTML = `<option value="">کشور مبدا</option>`;
toCountry.innerHTML = `<option value="">کشور مقصد</option>`;

Object.keys(countries).forEach(country=>{

  fromCountry.innerHTML += `
    <option value="${country}">
      ${country}
    </option>
  `;

  toCountry.innerHTML += `
    <option value="${country}">
      ${country}
    </option>
  `;

});

fromCountry.addEventListener("change",()=>{

  const c = countries[fromCountry.value];

  if(!c){
    accountInfo.innerHTML = "کشور انتخاب نشده";
    return;
  }

  accountInfo.innerHTML = `
    <p>شماره حساب: <b>${c.account.number}</b></p>
    <p>نام حساب: <b>${c.account.name}</b></p>
  `;

});

toCountry.addEventListener("change",()=>{

  province.innerHTML = "";

  countries[toCountry.value].provinces.forEach(p=>{

    province.innerHTML += `
      <option>${p}</option>
    `;

  });

});

async function submitForm(){

  const loading = document.getElementById("loading");
  const successBox = document.getElementById("successBox");

  loading.classList.remove("d-none");

  const formData = new FormData();

  formData.append("senderName", document.getElementById("senderName").value);
  formData.append("receiverName", document.getElementById("receiverName").value);
  formData.append("fromCountry", fromCountry.value);
  formData.append("toCountry", toCountry.value);
  formData.append("province", province.value);
  formData.append("phone", document.getElementById("phone").value);
  formData.append("receipt", document.getElementById("receipt").files[0]);

  try{

    const response = await fetch("http://localhost:3000/api/transfer",{
      method:"POST",
      body:formData
    });

    const data = await response.json();

    loading.classList.add("d-none");

    successBox.classList.remove("d-none");

    successBox.innerHTML = `
      درخواست ثبت شد ✅
      <br>
      کد پیگیری: ${data.trackingCode}
    `;

  }catch(err){

    loading.classList.add("d-none");

    alert("خطا در ارتباط با سرور");

  }

}
