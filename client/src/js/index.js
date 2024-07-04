import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';
import { putDb } from './database';
import { put } from '../../../server/routes/htmlRoutes';

window.addEventListener('load', async () => {
    const editor = document.getElementById('editor');

    // Get content from the database
    const content = await getDb();
    if (content) {
        editor.value = content;
    }

    // Save content to the database
    document.getElementById('saveButton').addEventListener('click', async () => {
        const content = editor.value;
        putDb(content);
    }
    );
});

    const main = document.querySelector('#main');
    main.innerHTML = '';

    const loadSpinner = () => {
        const spinner = document.createElement('div');
        spinner.classList.add('spinner');
        spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
        main.appendChild(spinner);
    };

    const editor = new Editor();

    if (typeof editor === 'undefined') {
        loadSpinner();
    }

    // Check if service workers are supported
    if ('serviceWorker' in navigator) {
        // register workbox service worker
        const workboxSW = new Workbox('/src-sw.js');
        workboxSW.register();
    } else {
        console.error('Service workers are not supported in this browser.');
    }