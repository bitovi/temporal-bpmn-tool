import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';

import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

import './style.css';

import $ from 'jquery';

import BpmnModeler from 'bpmn-js/lib/Modeler';

let selectedFile;
const container = $('#js-drop-zone');
const modeler = new BpmnModeler({
  container: '#js-canvas',
  keyboard: {
    bindTo: window,
  },
});

function createNewDiagram(filename) {
  fetch(`http://localhost:8000/api/diagrams/${filename}`)
    .then((result) => {
      return result.text();
    })
    .then((diagramXML) => {
      selectedFile = filename;
      openDiagram(diagramXML);
    })
    .catch((error) => alert(error.message));
}

async function openDiagram(xml) {
  try {
    await modeler.importXML(xml);

    container.removeClass('with-error').addClass('with-diagram');
  } catch (err) {
    container.removeClass('with-diagram').addClass('with-error');

    container.find('.error pre').text(err.message);

    console.error(err);
  }
}

function registerFileDrop(container, callback) {
  function handleFileSelect(e) {
    e.stopPropagation();
    e.preventDefault();

    const files = e.dataTransfer.files;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const xml = e.target.result;

      callback(xml);
    };

    reader.readAsText(file);
  }

  function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();

    e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  container.get(0).addEventListener('dragover', handleDragOver, false);
  container.get(0).addEventListener('drop', handleFileSelect, false);
}

// file drag / drop ///////////////////////

// check file api availability
if (!window.FileList || !window.FileReader) {
  window.alert(
    'Looks like you use an older browser that does not support drag and drop. ' +
      'Try using Chrome, Firefox or the Internet Explorer > 10.'
  );
} else {
  registerFileDrop(container, openDiagram);
}

// bootstrap diagram functions

$(function () {
  $('#save').click(function (e) {
    e.preventDefault();
    e.stopPropagation();

    modeler.saveXML().then(({ xml }) => {
      return fetch(`http://localhost:8000/api/diagrams/${selectedFile}`, {
        method: 'PUT',
        body: xml,
        headers: {
          'content-type': 'text/plain',
        },
      })
        .then((result) => {
          alert('Saved!');
          window.location.reload();
        })
        .catch((error) => {
          alert(error.message);
        });
    });
  });

  $(function () {
    fetch('http://localhost:8000/api/diagrams')
      .then((result) => {
        return result.json();
      })
      .then((fileList) => {
        fileList.forEach((filename) => {
          const link = $(`<li><a href="${filename}">${filename}</a></li>`);

          link.click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            createNewDiagram($(e.target).attr('href'));
          });

          $('.content .intro .note').append(link);
        });
      })
      .catch((error) => alert(error.message));
  });
});