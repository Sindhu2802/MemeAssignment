const templatesEl = document.getElementById('templates');
const memesEl = document.getElementById('memes');
const topCaptionInput = document.getElementById('topCaptionInput');
const bottomCaptionInput = document.getElementById('bottomCaptionInput');
const addMemeBtn = document.getElementById('addMeme');
const uploadTemplate = document.getElementById('uploadTemplate');
const captionBox = document.getElementById('captionBox');

let templates = [
  'images/vi1.png',
  'images/funny2.png',
  'images/vi2.png',
  'images/meme1.jpeg',
  
];

let selectedTemplate = null;
let memes = [];

function renderTemplates() {
templatesEl.innerHTML = '';
  templates.forEach((src) => {
    const img = document.createElement('img');
    img.src = src;
    if (src === selectedTemplate) img.classList.add('selected');
    img.onclick = () => {
      selectedTemplate = src;
      captionBox.classList.remove('hidden'); 
      renderTemplates();
    };
    templatesEl.appendChild(img);
  });
}

function renderMemes() {
  memesEl.innerHTML = '';
  memes.forEach((meme, i) => {
    const div = document.createElement('div');
    div.className = 'meme';

    const img = document.createElement('img');
    img.src = meme.template;

    const topCaption = document.createElement('div');
    topCaption.className = 'caption top';
    topCaption.textContent = meme.topCaption || '';

    const bottomCaption = document.createElement('div');
    bottomCaption.className = 'caption bottom';
    bottomCaption.textContent = meme.bottomCaption || '';

    const btnContainer = document.createElement('div');
    btnContainer.className = 'meme-buttons';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => {
      const newTop = prompt('Edit top caption:', meme.topCaption) || '';
      const newBottom = prompt('Edit bottom caption:', meme.bottomCaption) || '';
      meme.topCaption = newTop.trim();
      meme.bottomCaption = newBottom.trim();
      renderMemes();
    };

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => {
      if (confirm('Delete this meme?')) {
        memes.splice(i, 1);
        renderMemes();
      }
    };

    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(delBtn);

    div.appendChild(img);
    div.appendChild(topCaption);
    div.appendChild(bottomCaption);
    div.appendChild(btnContainer);

    memesEl.appendChild(div);
  });
}

addMemeBtn.onclick = () => {
  if (!selectedTemplate) {
    alert('Please select a template first!');
    return;
  }
  const topCaption = topCaptionInput.value.trim();
  const bottomCaption = bottomCaptionInput.value.trim();
  if (!topCaption && !bottomCaption) {
    alert('Please enter at least one caption!');
    return;
  }
  memes.push({ template: selectedTemplate, topCaption, bottomCaption });
  topCaptionInput.value = '';
  bottomCaptionInput.value = '';
  captionBox.classList.add('hidden'); 
  renderMemes();
};

uploadTemplate.onchange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    const src = ev.target.result;
    templates.unshift(src);
    selectedTemplate = src;
    captionBox.classList.remove('hidden');
    renderTemplates();
  };
  reader.readAsDataURL(file);
};


renderTemplates();
renderMemes();
