async function handleSubscribe(event, formType) {
event.preventDefault();
const form = document.getElementById(formType + '-form');
const email = form.querySelector('input[type="email"]').value;
const newsletter = form.querySelector('input[type="checkbox"]').checked;
const button = form.querySelector('button');
// Disable button while submitting
button.disabled = true;
button.textContent = 'Sending...';
try {
const response = await fetch('/api/subscribe', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({ 
            email, 
            newsletter,
            utm_source: 'annual-reflection-guide',
            utm_medium: 'website',
            utm_campaign: 'annual-reflection-guide-2025',
            referring_site: 'annual-reflection-guide'
          }),
});
if (response.ok) {
form.style.display = 'none';
document.getElementById(formType + '-success').style.display = 'block';
} else {
document.getElementById(formType + '-error').style.display = 'block';
button.disabled = false;
button.textContent = 'Get the guide';
}
} catch (error) {
document.getElementById(formType + '-error').style.display = 'block';
button.disabled = false;
button.textContent = 'Get the guide';
}
}
