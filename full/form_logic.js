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

    // 3. Prepare Form Data - Using iframe submission method (most reliable)
    submitBtn.disabled = true;
    submitBtn.innerText = 'جاري الإرسال...';

    // Create a hidden iframe
    let iframe = document.getElementById('hidden_iframe');
    if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'hidden_iframe';
        iframe.name = 'hidden_iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }

    // Create a form
    const form = document.createElement('form');
    form.action = 'https://docs.google.com/forms/d/e/1FAIpQLSc6KEIh6gWPkodDpAgWTQN1sIQq8r-v1mWv7q2Jdqfk-lUyEw/formResponse';
    form.method = 'POST';
    form.target = 'hidden_iframe';

    // Add hidden inputs for all fields
    const addInput = (name, value) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.appendChild(input);
    };

    addInput('entry.88294716', name);
    addInput('entry.1038598923', department);
    addInput('entry.1639981020', agreement.value);

    // Add all checkbox values
    acknowledgments.forEach(val => {
        addInput('entry.1883722675', val);
    });

    // Append form to body and submit
    document.body.appendChild(form);
    form.submit();

    // Wait a moment for submission, then show success
    setTimeout(() => {
        // Remove the form
        document.body.removeChild(form);

        // Hide all sections
        const formSection = document.querySelector('.form-section:last-of-type');
        const checkboxesSection = document.querySelector('.form-section:nth-of-type(3)');
        const pdfSection = document.querySelector('.pdf-section');
        const personalInfoSection = document.querySelector('.form-section:first-of-type');

        if (personalInfoSection) personalInfoSection.style.display = 'none';
        if (pdfSection) pdfSection.style.display = 'none';
        if (checkboxesSection) checkboxesSection.style.display = 'none';
        if (formSection) formSection.style.display = 'none';

        // Create success message container
        const successDiv = document.createElement('div');
        successDiv.className = 'form-section';
        successDiv.style.textAlign = 'center';
        successDiv.style.padding = '40px 20px';
        successDiv.innerHTML = `
            <div style="font-size: 60px; margin-bottom: 20px;">✅</div>
            <h2 style="color: var(--primary-color); margin-bottom: 15px;">تم إرسال إقرارك بنجاح!</h2>
            <p style="color: #666; font-size: 1.1rem; margin-bottom: 30px;">شكرًا لك، تم تسجيل ردك في النظام.</p>
            <button onclick="window.location.reload()" class="btn-primary">إرسال رد آخر</button>
        `;

        document.querySelector('.container').appendChild(successDiv);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
});
