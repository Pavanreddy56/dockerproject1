const apiBase = '/api';

async function init() {
  document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const file = document.getElementById('resume').files[0];
    if (!file) return alert('Choose a file');

    const fd = new FormData();
    fd.append('name', name);
    fd.append('email', email);
    fd.append('resume', file);

    const res = await fetch(apiBase + '/uploads/upload', { method: 'POST', body: fd });
    const j = await res.json();
    if (res.ok) {
      document.getElementById('uploadResult').innerText = 'Upload successful';
      loadResumes();
    } else {
      document.getElementById('uploadResult').innerText = j.error || JSON.stringify(j);
    }
  });

  document.getElementById('loadQuiz').addEventListener('click', loadQuiz);
  loadResumes();
}

async function loadResumes() {
  const res = await fetch(apiBase + '/uploads');
  const data = await res.json();
  const ul = document.getElementById('resumesList');
  ul.innerHTML = '';
  data.forEach(r => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = apiBase + '/uploads/file/' + r.filename;
    a.target = '_blank';
    a.innerText = r.name ? (r.name + ' — ' + r.originalName) : r.originalName;
    li.appendChild(a);
    const meta = document.createElement('div');
    meta.innerHTML = '<small>' + (r.email || '') + ' • ' + new Date(r.uploadedAt).toLocaleString() + '</small>';
    li.appendChild(meta);
    ul.appendChild(li);
  });
}

async function loadQuiz() {
  const res = await fetch(apiBase + '/questions');
  const qs = await res.json();
  const form = document.getElementById('quizForm');
  form.style.display = 'block';
  form.innerHTML = '';
  qs.forEach((q, idx) => {
    const qdiv = document.createElement('div');
    qdiv.innerHTML = '<p><strong>' + (idx+1) + '. ' + q.text + '</strong></p>';
    q.options.forEach((opt, oi) => {
      const id = 'q' + idx + '_o' + oi;
      qdiv.innerHTML += '<label><input type="radio" name="q' + idx + '" value="' + oi + '" data-id="' + q._id + '"/> ' + opt + '</label><br/>';
    });
    form.appendChild(qdiv);
  });
  const submit = document.createElement('button');
  submit.innerText = 'Submit Answers';
  submit.addEventListener('click', async (e) => {
    e.preventDefault();
    const answers = [];
    qs.forEach((q, idx) => {
      const checked = form.querySelector('input[name="q'+idx+'"]:checked');
      const val = checked ? parseInt(checked.value) : -1;
      answers.push({ questionId: q._id, answerIndex: val });
    });
    const r = await fetch(apiBase + '/questions/submit', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ answers })});
    const jr = await r.json();
    document.getElementById('quizResult').innerText = 'Score: ' + jr.score + '% (' + jr.correct + '/' + jr.total + ')';
  });
  form.appendChild(submit);
}

window.addEventListener('DOMContentLoaded', init);
