Handlebars.registerHelper('ifeq', function (a, b, options) {
    if (a == b) { return options.fn(this); }
    return options.inverse(this);
});

Handlebars.registerHelper('ifneq', function (a, b, options) {
    if (a != b) { return options.fn(this); }
    return options.inverse(this);
});

async function loadTemplate(templateName, data = {}) {
  const templatePath = `/templates/${templateName}.html`;
  const response = await fetch(templatePath)
  const templateString = await response.text();
  const template = Handlebars.compile(templateString);
  return template(data);
}

async function render(element) {
  const templateName = element.getAttribute('template');
  const html = await loadTemplate(templateName, element.dataset);
  console.log(element.dataset);
  element.innerHTML = html;
}

async function renderAll() {
  const renders = [...document.getElementsByTagName('render')];
  renders.forEach(render);
}

async function switchTab(tab) {
  let elements = [...document.getElementsByTagName('render')];
  let element = elements.find(el => el.getAttribute('template') == 'header')
  element.dataset.tab = tab;
  await render(element);

  
  elements = [...document.getElementsByTagName('render')];
  element = elements.find(el => el.getAttribute('template') == 'content')
  element.dataset.tab = tab;
  await render(element);
}

async function togglePop() {
  let elements = [...document.getElementsByTagName('render')];
  let element = elements.find(el => el.getAttribute('template') == 'header')
  if (element.dataset.pop) {
    delete element.dataset.pop;
  }
  else {
    element.dataset.pop = true;
  }
  await render(element);

  
  elements = [...document.getElementsByTagName('render')];
  element = elements.find(el => el.getAttribute('template') == 'content')
  if (element.dataset.pop) {
    delete element.dataset.pop;
  }
  else {
    element.dataset.pop = true;
  }
  await render(element);
}

renderAll();

