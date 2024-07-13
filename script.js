let formFilled = false; // Flag to track if form was filled previously

// Listen for input events on each field to validate and show alerts dynamically
document.getElementById('deliveryNo').addEventListener('input', validateDeliveryNo);
document.getElementById('deliveryDate').addEventListener('input', validateDeliveryDate);
document.getElementById('motherName').addEventListener('input', validateMotherName);
document.getElementById('babyWeight').addEventListener('input', validateBabyWeight);
document.getElementById('babySex').addEventListener('change', validateBabySex);
document.getElementById('timeOfDay').addEventListener('change', validateTimeOfDay);
document.getElementById('hourTime').addEventListener('input', validateHourTime);
document.getElementById('minuteTime').addEventListener('input', validateMinuteTime);

function validateDeliveryNo() {
  const deliveryNo = document.getElementById('deliveryNo').value;
  // Check if deliveryNo contains only digits
  const isValid = /^\d+$/.test(deliveryNo);
  toggleAlert('deliveryNo', isValid ? '' : 'ডেলিভারি নম্বর লিখুন');
}


function validateDeliveryDate() {
  const deliveryDate = document.getElementById('deliveryDate').valueAsDate;
  toggleAlert('deliveryDate', deliveryDate ? '' : 'ডেলিভারির তারিখ দিন');
}

function validateMotherName() {
  const motherName = document.getElementById('motherName').value;
  toggleAlert('motherName', motherName ? '' : 'মায়ের নাম লিখুন');
}

function validateBabyWeight() {
  const babyWeight = document.getElementById('babyWeight').value;
  toggleAlert('babyWeight', babyWeight ? '' : 'শিশুর ওজন লিখুন');
}

function validateBabySex() {
  const babySex = document.getElementById('babySex').value;
  toggleAlert('babySex', babySex ? '' : 'শিশুর জেন্ডার নির্বাচন করুন');
}

function validateTimeOfDay() {
  const timeOfDay = document.getElementById('timeOfDay').value;
  toggleAlert('timeOfDay', timeOfDay ? '' : 'ডেলিভারির সময় নির্বাচন করুন');
}

function validateHourTime() {
  const hourTime = document.getElementById('hourTime').value;
  toggleAlert('hourTime', (hourTime >= 1 && hourTime <= 12 && Number.isInteger(Number(hourTime))) ? '' : '1 থেকে 12 এর মধ্যে লিখুন');
}

function validateMinuteTime() {
  const minuteTime = document.getElementById('minuteTime').value;
  toggleAlert('minuteTime', (minuteTime === '' || (minuteTime >= 0 && minuteTime <= 59 && Number.isInteger(Number(minuteTime)))) ? '' : '0 থেকে 59 এর মধ্যে লিখুন');
}

function toggleAlert(inputId, message) {
  const inputField = document.getElementById(inputId);
  const alertId = `${inputId}-alert`;
  
  // Check if an alert is already present for this input
  let alertDiv = document.getElementById(alertId);
  if (!message) {
    // Remove alert if message is empty (field is filled)
    if (alertDiv) {
      alertDiv.remove();
    }
  } else {
    // Add or update alert message
    if (!alertDiv) {
      alertDiv = document.createElement('div');
      alertDiv.id = alertId;
      alertDiv.classList.add('alert');
      inputField.parentNode.insertBefore(alertDiv, inputField.nextSibling);
    }
    alertDiv.textContent = message;
  }
}

function generateText() {
  // Validate all fields before generating text
  validateDeliveryNo();
  validateDeliveryDate();
  validateMotherName();
  validateBabyWeight();
  validateBabySex();
  validateTimeOfDay();
  validateHourTime();
  validateMinuteTime();

  // Check if all fields are filled
  if (!document.querySelector('.alert')) {
    // Proceed with generating the announcement text
    const deliveryNo = document.getElementById('deliveryNo').value;
    const deliveryDate = document.getElementById('deliveryDate').valueAsDate?.toLocaleDateString('bn-BD');
    const motherName = document.getElementById('motherName').value;
    const babyWeight = document.getElementById('babyWeight').value;
    const babySex = document.getElementById('babySex').value;
    const timeOfDay = document.getElementById('timeOfDay').value;
    const hourTime = document.getElementById('hourTime').value;
    let minuteTime = document.getElementById('minuteTime').value || '০';

    // Ensure minute time has two digits
    if (minuteTime.length === 1) {
      minuteTime = '০' + minuteTime;
    }

    // Convert numbers to Bengali
    const convertToBengali = num => num.replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]);

    const timeString = minuteTime === '০' ? `${convertToBengali(hourTime)}` : `${convertToBengali(hourTime)}:${convertToBengali(minuteTime)}`;

    // Generate announcement text
    const announcementText = `Delivery no. ${deliveryNo}\n “যার মা আছে, সে কখনই গরীব নয়।” - আব্রাহাম লিংকন\n\nগাইবান্ধা জেলার সুন্দরগঞ্জ উপজেলার সর্বানন্দ ইউনিয়নে তালুক সর্বানন্দ কমিউনিটি ক্লিনিকের আমি মোছাঃ ফারজানা খাতুন (CHCP, CSBA) ${deliveryDate} তারিখে ${timeOfDay} ${timeString} ঘটিকায় ${motherName} এর একটি Normal Delivery করিয়েছি। জন্মগত ${babySex} শিশুর ওজন প্রায় ${babyWeight} কেজি।\nমা ও শিশু উভয়েই সুস্থ আছে, ইন শা' আল্লাহ।\n\nপ্রয়োজনে:\nনরমাল ডেলিভারী হোম\n(সুন্দরগঞ্জ বাইপাস থেকে ১০ গজ দক্ষিণে)`;

    document.getElementById('announcementText').value = announcementText;

    // Determine which message to show based on formFilled flag
    if (!formFilled) {
      showSuccessMessage('✅ লেখা সফলভাবে তৈরি হয়েছে!');
      formFilled = true;
    } else {
      showSuccessMessage('✅ লেখা সফলভাবে পরিবর্তন হয়েছে!');
    }
  }
}

function showSuccessMessage(message) {
  const successMessage = document.getElementById('successMessage');
  successMessage.textContent = message;
  successMessage.classList.add('show');

  // Hide success message after 3 seconds
  setTimeout(() => {
    successMessage.classList.remove('show');
  }, 3000);
}

function copyText() {
  const textarea = document.getElementById('announcementText');
  textarea.select();
  document.execCommand('copy');
  alert('Copied the text: ' + textarea.value);
}
