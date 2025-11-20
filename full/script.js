document.getElementById('submitBtn').addEventListener('click', function () {
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerText;

    // 1. Collect Data
    const name = document.getElementById('name').value.trim();
    const department = document.getElementById('department').value;
    const agreement = document.querySelector('input[name="entry.1639981020"]:checked');

    // Collect Checkboxes
    const checkboxes = document.querySelectorAll('input[name="entry.1883722675"]:checked');
    const acknowledgments = Array.from(checkboxes).map(cb => cb.value);

    // 2. Validation
    let isValid = true;

    // Reset errors
    document.getElementById('name').classList.remove('input-error');
    document.getElementById('department').classList.remove('input-error');

    if (!name) {
        document.getElementById('name').classList.add('input-error');
        isValid = false;
    }
    if (!department) {
        document.getElementById('department').classList.add('input-error');
        isValid = false;
    }

    if (!isValid) {
        alert('الرجاء تعبئة جميع الحقول المطلوبة (الاسم والإدارة).');
        return;
    }
    // There are 7 required checkboxes
    const checkboxError = document.getElementById('checkboxError');
    if (checkboxes.length < 7) {
        checkboxError.style.display = 'block';
        alert('يجب الموافقة على جميع بنود الإقرار (7 بنود).');
        // Scroll to the error
        checkboxError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    } else {
        checkboxError.style.display = 'none';
    }
    if (!agreement) {
        alert('الرجاء تحديد الموافقة على الشروط.');
        return;
    }
    if (agreement.value === 'لا أوافق') {
        alert('لا يمكن إتمام العملية دون الموافقة على الشروط.');
        return;
    }

    // 3. Prepare Form Data
    const formData = new FormData();
    formData.append('entry.88294716', name);
    formData.append('entry.1038598923', department);
    formData.append('entry.1639981020', agreement.value);

    // Append multiple values for checkboxes
    acknowledgments.forEach(val => {
        formData.append('entry.1883722675', val);
    });

    // 4. Submit via Fetch (No-CORS mode to avoid errors, though we can't read response)
    submitBtn.disabled = true;
    submitBtn.innerText = 'جاري الإرسال...';

    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc6KEIh6gWPkodDpAgWTQN1sIQq8r-v1mWv7q2Jdqfk-lUyEw/formResponse';

    fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors', // Important for Google Forms
        body: formData
    })
        .then(() => {
            // Since no-cors returns an opaque response, we assume success if no network error
            alert('تم إرسال الإقرار بنجاح!');
            // Redirect to the main dashboard
            window.location.href = '../index.html';
        })
        .catch(err => {
            console.error('Error:', err);
            alert('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.');
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
        });
});
