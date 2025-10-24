/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {GoogleGenAI, Modality, GenerateContentResponse} from '@google/genai';

// --- Constants ---
const STASH_LOGO_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA2gAAAB5CAMAAAC3vj9AAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAllBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB6TqcCAAAAMnRSTlMA+hL5A/UnBvH28I52fWg/Lh8V6uG8n4t1b2RgW0k/JOnk4dzY1M/NzMXAu6+ro52bmXt3d2pZUEA9MzEgGxsLBwIB/aH2AAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+YLFBEyD/8SctwAAAWlSURBVHja7dzrdtu2FAbgFxC45JxzB0hISAgJgQRAAv//f6k6s1l2Xy2Ppwfpae17bC+2WJk+5eGHw+FwOBwOh8PhcDgci/EwDOPk/D58v+P32/f/g2GkKqWGUqU0lKmln1K5tJSmpZZSqZTS0Eqp0h+lViqlNdRSqtQilVLKRyslK1LdK1JbpZ6VK2UvUrFKNStZydqUqVStZCVrV6ZWtZKVrl2ZytZKVrp2ZWrbKVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrpmpWtZVrp-ghAAAAABJRU5ErkJggg==';

// --- DOM Element References ---
const designStudioPage = document.getElementById('design-studio-page') as HTMLElement;
const calendarPage = document.getElementById('calendar-page') as HTMLElement;
const brandKitPage = document.getElementById('brand-kit-page') as HTMLElement;
const automationPage = document.getElementById('automation-page') as HTMLElement;
const navDesignStudio = document.getElementById('nav-design-studio') as HTMLButtonElement;
const navCalendar = document.getElementById('nav-calendar') as HTMLButtonElement;
const navBrandKit = document.getElementById('nav-brand-kit') as HTMLButtonElement;
const navAutomation = document.getElementById('nav-automation') as HTMLButtonElement;
const themeSwitcherButtons = document.querySelectorAll('.theme-switcher button');

// Design Studio Elements
const formatButtons = document.querySelectorAll('.format-btn') as NodeListOf<HTMLButtonElement>;
const categorySelect = document.getElementById('category-select') as HTMLSelectElement;
const imageUploadArea = document.getElementById('image-upload-area') as HTMLDivElement;
const imageUploadInput = document.getElementById('image-upload') as HTMLInputElement;
const promptInput = document.getElementById('prompt-input') as HTMLTextAreaElement;
const logoSelectionContainer = document.getElementById('logo-selection-container') as HTMLDivElement;
const generateBtn = document.getElementById('generate-btn') as HTMLButtonElement;
const generateBtnText = document.getElementById('generate-btn-text') as HTMLSpanElement;
const generateSpinner = document.getElementById('generate-spinner') as HTMLSpanElement;
const instagramPreviewContainer = document.getElementById('instagram-preview-container') as HTMLDivElement;
const captionOutput = document.getElementById('caption-output') as HTMLTextAreaElement;
const hashtagsOutput = document.getElementById('hashtags-output') as HTMLTextAreaElement;
const generateCaptionBtn = document.getElementById('generate-caption-btn') as HTMLButtonElement;
const generateHashtagsBtn = document.getElementById('generate-hashtags-btn') as HTMLButtonElement;
const downloadAllBtn = document.getElementById('download-all-btn') as HTMLButtonElement;
const addToCalendarBtn = document.getElementById('add-to-calendar-btn') as HTMLButtonElement;

// Brand Kit Elements
const styleGuidelinesInput = document.getElementById('style-guidelines-input') as HTMLTextAreaElement;
const saveGuidelinesBtn = document.getElementById('save-guidelines-btn') as HTMLButtonElement;
const colorPicker = document.getElementById('color-picker') as HTMLInputElement;
const colorHexInput = document.getElementById('color-hex-input') as HTMLInputElement;
const addColorBtn = document.getElementById('add-color-btn') as HTMLButtonElement;
const brandColorsContainer = document.getElementById('brand-colors-container') as HTMLDivElement;
const logoUploadArea = document.getElementById('logo-upload-area') as HTMLDivElement;
const logoUploadInput = document.getElementById('logo-upload-input') as HTMLInputElement;
const brandLogosContainer = document.getElementById('brand-logos-container') as HTMLDivElement;

// Brand Kit - Product Catalog Elements
const bulkProductUploadInput = document.getElementById('bulk-product-upload') as HTMLInputElement;
const newProductImageArea = document.getElementById('new-product-image-area') as HTMLDivElement;
const newProductImageUpload = document.getElementById('new-product-image-upload') as HTMLInputElement;
const newProductImageText = document.getElementById('new-product-image-text') as HTMLSpanElement;
const newProductName = document.getElementById('new-product-name') as HTMLInputElement;
const newProductDescription = document.getElementById('new-product-description') as HTMLTextAreaElement;
const addProductBtn = document.getElementById('add-product-btn') as HTMLButtonElement;
const productCatalogContainer = document.getElementById('product-catalog-container') as HTMLDivElement;

// Brand Kit - Design Templates Elements
const addTemplateBtn = document.getElementById('add-template-btn') as HTMLButtonElement;
const templateSearchInput = document.getElementById('template-search-input') as HTMLInputElement;
const templateListContainer = document.getElementById('template-list-container') as HTMLDivElement;
const templatePreviewContainer = document.getElementById('template-preview-container') as HTMLDivElement;

// Template Modal Elements
const templateModal = document.getElementById('template-modal') as HTMLDivElement;
const templateModalTitle = document.getElementById('template-modal-title') as HTMLHeadingElement;
const templateIdInput = document.getElementById('template-id-input') as HTMLInputElement;
const templateNameInput = document.getElementById('template-name-input') as HTMLInputElement;
const templatePromptInput = document.getElementById('template-prompt-input') as HTMLTextAreaElement;
const saveTemplateBtn = document.getElementById('save-template-btn') as HTMLButtonElement;
const closeTemplateModalBtn = document.getElementById('close-template-modal-btn') as HTMLButtonElement;


// Automation Elements
const automationPromptInput = document.getElementById('automation-prompt-input') as HTMLTextAreaElement;
const automationToggleBtn = document.getElementById('automation-toggle-btn') as HTMLButtonElement;
const automationBtnText = document.getElementById('automation-btn-text') as HTMLSpanElement;
const automationStatusIndicator = document.getElementById('automation-status-indicator') as HTMLSpanElement;
const automationStatusText = document.getElementById('automation-status-text') as HTMLSpanElement;
const automationTodayStatus = document.getElementById('automation-today-status') as HTMLDivElement;
const automationHistoryContainer = document.getElementById('automation-history-container') as HTMLDivElement;

// Calendar Elements
const calendarWeekView = document.getElementById('calendar-week-view') as HTMLDivElement;
const calendarMonthView = document.getElementById('calendar-month-view') as HTMLDivElement;
const calendarViewWeekBtn = document.getElementById('calendar-view-week') as HTMLButtonElement;
const calendarViewMonthBtn = document.getElementById('calendar-view-month') as HTMLButtonElement;
const calendarPrevBtn = document.getElementById('calendar-prev') as HTMLButtonElement;
const calendarNextBtn = document.getElementById('calendar-next') as HTMLButtonElement;
const calendarTitle = document.getElementById('calendar-title') as HTMLHeadingElement;
const calendarWeekGrid = document.getElementById('calendar-week-grid') as HTMLDivElement;
const calendarMonthGrid = document.getElementById('calendar-month-grid') as HTMLDivElement;
const batchGenerateBtn = document.getElementById('batch-generate-btn') as HTMLButtonElement;
const scheduledContentDetails = document.getElementById('scheduled-content-details') as HTMLDivElement;
const scheduledImagePreview = document.getElementById('scheduled-image-preview') as HTMLDivElement;
const scheduledDateTime = document.getElementById('scheduled-datetime') as HTMLInputElement;
const scheduledCaption = document.getElementById('scheduled-caption') as HTMLTextAreaElement;
const scheduledHashtags = document.getElementById('scheduled-hashtags') as HTMLTextAreaElement;
const saveScheduledBtn = document.getElementById('save-scheduled-btn') as HTMLButtonElement;
const deleteScheduledBtn = document.getElementById('delete-scheduled-btn') as HTMLButtonElement;

// Batch Modal Elements
const batchModal = document.getElementById('batch-modal') as HTMLDivElement;
const closeBatchModalBtn = document.getElementById('close-batch-modal-btn') as HTMLButtonElement;
const batchDaysInput = document.getElementById('batch-days-input') as HTMLInputElement;
const batchTemplateSelect = document.getElementById('batch-template-select') as HTMLSelectElement;
const batchFormatSelect = document.getElementById('batch-format-select') as HTMLSelectElement;
const batchProgress = document.getElementById('batch-progress') as HTMLDivElement;
const batchProgressBar = document.getElementById('batch-progress-bar') as HTMLDivElement;
const batchProgressText = document.getElementById('batch-progress-text') as HTMLParagraphElement;
const startBatchBtn = document.getElementById('start-batch-btn') as HTMLButtonElement;


// --- App State ---
type Product = {
    id: number;
    name: string;
    description: string;
    imageBase64: string;
    imageMimeType: string;
};

type Template = {
    id: number;
    name: string;
    prompt: string;
};

type ScheduledPost = {
    id: number;
    date: string;
    imageBase64: string;
    imageMimeType: string;
    caption: string;
    hashtags: string;
    format: string;
    category: string;
};

let selectedFormat = 'square';
let selectedAspectRatio = '1/1';
let selectedCategory = 'product';
let originalImageBase64: string | null = null;
let originalImageMimeType: string | null = null;
let selectedLogoBase64: string | null = null;
let generatedImageBase64: string | null = null;
let generatedImageMimeType: string | null = null;
let generatedCaption: string = '';
let generatedHashtags: string = '';
let isLoading = false;
let newProductImage: { data: string; mimeType: string; } | null = null;
let selectedTemplateId: number | null = null;
let selectedScheduledPostId: number | null = null;

// Calendar state
let currentCalendarDate = new Date();
let calendarView: 'week' | 'month' = 'week';
let scheduledPosts: ScheduledPost[] = [];

let brandKit: {
    guidelines: string;
    colors: string[];
    logos: string[];
    products: Product[];
    templates: Template[];
} = {
    guidelines: '',
    colors: [],
    logos: [],
    products: [],
    templates: []
};
let automationState = {
    enabled: false,
    prompt: ''
};
let automationHistory = [];


// --- Gemini AI Initialization ---
const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

// --- Helper Functions ---
const fileToGenerativePart = async (file: File): Promise<{mimeType: string; data: string}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        const result = reader.result;
        const data = result.split(',')[1];
        resolve({ mimeType: file.type, data });
      } else {
        reject(new Error('Failed to read file as data URL.'));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const updateLoadingState = (loading: boolean) => {
  isLoading = loading;
  generateBtn.disabled = isLoading;
  if (isLoading) {
    generateBtnText.classList.add('hidden');
    generateSpinner.classList.remove('hidden');
    instagramPreviewContainer.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--m3-on-surface-variant); height: 100%;">
          <i class="fas fa-spinner fa-spin" style="font-size: 2.5rem; margin-bottom: 1rem;"></i>
          <p>Our AI designer is crafting your image...</p>
          <p style="font-size: 0.875rem; color: var(--m3-outline);">This can take a moment.</p>
      </div>`;
    downloadAllBtn.classList.add('hidden');
    addToCalendarBtn.classList.add('hidden');
  } else {
    generateBtnText.classList.remove('hidden');
    generateSpinner.classList.add('hidden');
  }
};

const displayImage = (container: HTMLElement, base64: string, mimeType: string) => {
  container.innerHTML = '';
  const img = document.createElement('img');
  img.src = `data:${mimeType};base64,${base64}`;
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'contain';
  img.style.borderRadius = 'var(--m3-shape-small)';
  container.appendChild(img);
};

const showError = (container: HTMLElement, message: string) => {
  container.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--m3-error); padding: 1rem; height: 100%; text-align: center;">
        <i class="fas fa-circle-exclamation" style="font-size: 2.5rem; margin-bottom: 1rem;"></i>
        <p style="font-weight: 600;">An Error Occurred</p>
        <p style="font-size: 0.875rem;">${message}</p>
    </div>`;
};

// --- Data Persistence ---
const saveToLocalStorage = (key: string, data: any) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error(`Failed to save ${key} to localStorage`, e);
    }
};

const loadFromLocalStorage = (key: string, defaultValue: any) => {
     try {
        const savedData = localStorage.getItem(key);
        return savedData ? JSON.parse(savedData) : defaultValue;
    } catch (e) {
        console.error(`Failed to load ${key} from localStorage`, e);
        return defaultValue;
    }
}

const saveScheduledPosts = () => saveToLocalStorage('stashScheduledPosts', scheduledPosts);
const loadScheduledPosts = () => {
    scheduledPosts = loadFromLocalStorage('stashScheduledPosts', []);
};

// --- Brand Kit Functions ---
const saveGuidelines = () => saveToLocalStorage('stashBrandKit_guidelines', brandKit.guidelines);
const saveColors = () => saveToLocalStorage('stashBrandKit_colors', brandKit.colors);
const saveLogos = () => saveToLocalStorage('stashBrandKit_logos', brandKit.logos);
const saveProducts = () => saveToLocalStorage('stashBrandKit_products', brandKit.products);
const saveTemplates = () => saveToLocalStorage('stashBrandKit_templates', brandKit.templates);

const loadBrandKit = () => {
    brandKit.guidelines = loadFromLocalStorage('stashBrandKit_guidelines', '');
    brandKit.colors = loadFromLocalStorage('stashBrandKit_colors', []);
    brandKit.logos = loadFromLocalStorage('stashBrandKit_logos', []);
    brandKit.products = loadFromLocalStorage('stashBrandKit_products', []);
    brandKit.templates = loadFromLocalStorage('stashBrandKit_templates', []);

    // Pre-load Stash logo if none exist
    if (brandKit.logos.length === 0) {
        brandKit.logos.push(STASH_LOGO_BASE64);
        saveLogos(); // Save only the logos
    }
};
const saveAutomationState = () => saveToLocalStorage('stashAutomationState', automationState);
const loadAutomationState = () => {
    automationState = loadFromLocalStorage('stashAutomationState', { enabled: false, prompt: '' });
};
const saveAutomationHistory = () => saveToLocalStorage('stashAutomationHistory', automationHistory);
const loadAutomationHistory = () => {
    automationHistory = loadFromLocalStorage('stashAutomationHistory', []);
};


const renderSelectableLogos = () => {
  logoSelectionContainer.innerHTML = '';
  const noLogoOption = document.createElement('div');
  noLogoOption.style.aspectRatio = '1/1';
  noLogoOption.style.backgroundColor = 'var(--m3-surface)';
  noLogoOption.style.borderRadius = 'var(--m3-shape-medium)';
  noLogoOption.style.display = 'flex';
  noLogoOption.style.alignItems = 'center';
  noLogoOption.style.justifyContent = 'center';
  noLogoOption.style.padding = '0.5rem';
  noLogoOption.style.cursor = 'pointer';
  noLogoOption.style.border = '2px solid var(--m3-primary)';
  noLogoOption.innerHTML = `<span style="font-size: 0.75rem; text-align: center; color: var(--m3-on-surface-variant);">No Logo</span>`;
  noLogoOption.onclick = () => {
    selectedLogoBase64 = null;
    document.querySelectorAll('#logo-selection-container > div').forEach(el => (el as HTMLElement).style.borderColor = 'transparent');
    noLogoOption.style.borderColor = 'var(--m3-primary)';
  };
  logoSelectionContainer.appendChild(noLogoOption);

  brandKit.logos.forEach(logoData => {
    const logoOption = document.createElement('div');
    logoOption.style.aspectRatio = '1/1';
    logoOption.style.backgroundColor = 'var(--m3-surface)';
    logoOption.style.borderRadius = 'var(--m3-shape-medium)';
    logoOption.style.display = 'flex';
    logoOption.style.alignItems = 'center';
    logoOption.style.justifyContent = 'center';
    logoOption.style.padding = '0.5rem';
    logoOption.style.cursor = 'pointer';
    logoOption.style.border = '2px solid transparent';

    const img = document.createElement('img');
    img.src = logoData;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    logoOption.appendChild(img);
    logoOption.onclick = () => {
      selectedLogoBase64 = logoData;
      document.querySelectorAll('#logo-selection-container > div').forEach(el => (el as HTMLElement).style.borderColor = 'transparent');
      logoOption.style.borderColor = 'var(--m3-primary)';
    };
    logoSelectionContainer.appendChild(logoOption);
  });
};


const renderProductCatalog = () => {
    productCatalogContainer.innerHTML = '';
    brandKit.products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'm3-card';
        card.style.position = 'relative';
        card.style.padding = 'var(--m3-gap-2)';
        card.innerHTML = `
            <div style="height: 6rem; border-radius: var(--m3-shape-small); background-image: url(data:${product.imageMimeType};base64,${product.imageBase64}); background-size: cover; background-position: center;"></div>
            <div style="padding: 0.5rem;">
                <p class="m3-title-sm" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--m3-on-surface-variant);">${product.name}</p>
            </div>
            <button data-product-id="${product.id}" class="remove-product-btn m3-icon-btn m3-state" style="position: absolute; top: 0.25rem; right: 0.25rem; color: var(--m3-error); --m3-state-hover: .2;">
                <i class="material-icons">delete</i>
            </button>
        `;
        productCatalogContainer.appendChild(card);
    });

    document.querySelectorAll('.remove-product-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt((e.currentTarget as HTMLButtonElement).dataset.productId, 10);
            brandKit.products = brandKit.products.filter(p => p.id !== productId);
            saveProducts();
            renderProductCatalog();
        });
    });
};


// --- Brand Kit - Design Templates ---
const renderTemplatePreview = () => {
    if (selectedTemplateId === null) {
        templatePreviewContainer.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--m3-on-surface-variant);">
                Select a template to see a preview.
            </div>`;
        return;
    }

    const template = brandKit.templates.find(t => t.id === selectedTemplateId);
    if (!template) {
        selectedTemplateId = null;
        renderTemplatePreview();
        return;
    }

    const placeholders = template.prompt.match(/\[(.*?)\]/g) || [];

    // Highlight placeholders in prompt
    const highlightedPrompt = template.prompt.replace(/\[(.*?)\]/g, '<code style="background-color: var(--m3-primary-container); color: var(--m3-on-primary-container); padding: 2px 4px; border-radius: 4px;">$&</code>');

    templatePreviewContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; height: 100%; gap: var(--m3-gap-4);">
            <h3 class="m3-title-md" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--m3-on-surface);">${template.name}</h3>
            <div style="flex-grow: 1; background-color: var(--m3-surface-variant); border-radius: var(--m3-shape-medium); padding: 1rem; overflow-y: auto;">
                <p style="white-space: pre-wrap; font-family: monospace; font-size: 0.875rem; color: var(--m3-on-surface-variant);">${highlightedPrompt}</p>
            </div>
            ${placeholders.length > 0 ? `
            <div>
                <h4 class="m3-title-sm" style="color: var(--m3-on-surface-variant); margin-bottom: 0.5rem;">Placeholders:</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${placeholders.map(p => `<span style="background-color: var(--m3-secondary-container); color: var(--m3-on-secondary-container); font-size: 0.75rem; padding: 4px 8px; border-radius: 16px;">${p}</span>`).join('')}
                </div>
            </div>
            ` : ''}
            <button data-template-id="${template.id}" class="use-template-btn m3-btn m3-btn--filled m3-state" style="width: 100%;">
              <span>Use This Template</span>
            </button>
        </div>
    `;

    document.querySelector('.use-template-btn')?.addEventListener('click', () => {
        promptInput.value = template.prompt;
        navigateTo('design-studio');
    });
};

const renderTemplateList = () => {
    const searchTerm = templateSearchInput.value.toLowerCase();
    const filteredTemplates = brandKit.templates.filter(t => t.name.toLowerCase().includes(searchTerm));

    if (filteredTemplates.length === 0) {
        templateListContainer.innerHTML = `<div style="padding: 1rem; text-align: center; color: var(--m3-on-surface-variant);">No templates found.</div>`;
        return;
    }

    templateListContainer.innerHTML = '';
    filteredTemplates.forEach(template => {
        const item = document.createElement('div');
        const isActive = selectedTemplateId === template.id;
        item.style.padding = '1rem';
        item.style.cursor = 'pointer';
        item.style.borderLeft = `4px solid ${isActive ? 'var(--m3-primary)' : 'transparent'}`;
        item.style.backgroundColor = isActive ? 'var(--m3-surface-variant)' : 'transparent';

        item.innerHTML = `
            <p class="m3-title-sm" style="color: var(--m3-on-surface); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${template.name}</p>
            <p class="m3-body-md" style="color: var(--m3-on-surface-variant); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${template.prompt}</p>
            <div style="text-align: right; margin-top: 0.5rem;">
                 <button data-template-id="${template.id}" class="edit-template-btn m3-btn m3-btn--text m3-state">Edit</button>
                 <button data-template-id="${template.id}" class="delete-template-btn m3-btn m3-btn--text m3-state" style="color: var(--m3-error);">Delete</button>
            </div>
        `;
        item.addEventListener('click', (e) => {
            if ((e.target as HTMLElement).closest('button')) return; // Ignore clicks on buttons
            selectedTemplateId = template.id;
            renderTemplateList();
            renderTemplatePreview();
        });
        templateListContainer.appendChild(item);
    });

    document.querySelectorAll('.edit-template-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const templateId = parseInt((e.currentTarget as HTMLButtonElement).dataset.templateId, 10);
            openTemplateModal(templateId);
        });
    });

    document.querySelectorAll('.delete-template-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const templateId = parseInt((e.currentTarget as HTMLButtonElement).dataset.templateId, 10);
            if (confirm('Are you sure you want to delete this template?')) {
                brandKit.templates = brandKit.templates.filter(t => t.id !== templateId);
                if (selectedTemplateId === templateId) {
                    selectedTemplateId = null;
                }
                saveTemplates();
                renderTemplateList();
                renderTemplatePreview();
            }
        });
    });
};

const openTemplateModal = (id: number | null = null) => {
    templateIdInput.value = id ? id.toString() : '';
    if (id) {
        const template = brandKit.templates.find(t => t.id === id);
        if (template) {
            templateModalTitle.textContent = 'Edit Template';
            templateNameInput.value = template.name;
            templatePromptInput.value = template.prompt;
        }
    } else {
        templateModalTitle.textContent = 'Add New Template';
        templateNameInput.value = '';
        templatePromptInput.value = '';
    }
    templateModal.setAttribute('open', '');
};

const handleSaveTemplate = () => {
    const id = templateIdInput.value ? parseInt(templateIdInput.value, 10) : null;
    const name = templateNameInput.value.trim();
    const prompt = templatePromptInput.value.trim();

    if (!name || !prompt) {
        alert('Please provide a name and a prompt for the template.');
        return;
    }

    if (id) { // Editing existing
        const index = brandKit.templates.findIndex(t => t.id === id);
        if (index > -1) {
            brandKit.templates[index] = { id, name, prompt };
        }
    } else { // Creating new
        brandKit.templates.push({ id: Date.now(), name, prompt });
    }

    saveTemplates();
    renderTemplateList();
    templateModal.removeAttribute('open');
};

const renderBrandKitUI = () => {
    styleGuidelinesInput.value = brandKit.guidelines || '';
    
    brandColorsContainer.innerHTML = '';
    brandKit.colors.forEach((color, index) => {
        const swatch = document.createElement('div');
        swatch.style.position = 'relative';
        swatch.style.width = '4rem';
        swatch.style.height = '4rem';
        swatch.style.borderRadius = 'var(--m3-shape-small)';
        swatch.style.border = '2px solid var(--m3-outline)';
        swatch.style.backgroundColor = color;
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '<i class="material-icons" style="font-size: 1rem;">close</i>';
        removeBtn.className = 'm3-icon-btn m3-state';
        removeBtn.style.position = 'absolute';
        removeBtn.style.top = '-0.75rem';
        removeBtn.style.right = '-0.75rem';
        removeBtn.style.backgroundColor = 'var(--m3-error-container)';
        removeBtn.style.color = 'var(--m3-on-error-container)';
        removeBtn.style.width = '24px';
        removeBtn.style.height = '24px';

        removeBtn.onclick = () => {
            brandKit.colors.splice(index, 1);
            saveColors();
            renderBrandKitUI();
        };
        swatch.appendChild(removeBtn);
        brandColorsContainer.appendChild(swatch);
    });

    brandLogosContainer.innerHTML = '';
    brandKit.logos.forEach((logoData, index) => {
        const logoWrapper = document.createElement('div');
        logoWrapper.className = 'm3-card';
        logoWrapper.style.position = 'relative';
        logoWrapper.style.padding = '0.5rem';
        const img = document.createElement('img');
        img.src = logoData;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        logoWrapper.appendChild(img);
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '<i class="material-icons" style="font-size: 1rem">close</i>';
        removeBtn.className = 'm3-icon-btn m3-state';
        removeBtn.style.position = 'absolute';
        removeBtn.style.top = '0';
        removeBtn.style.right = '0';
        removeBtn.style.backgroundColor = 'var(--m3-error-container)';
        removeBtn.style.color = 'var(--m3-on-error-container)';
        removeBtn.style.width = '24px';
        removeBtn.style.height = '24px';
        removeBtn.onclick = () => {
            brandKit.logos.splice(index, 1);
            saveLogos();
            renderBrandKitUI();
        };
        logoWrapper.appendChild(removeBtn);
        brandLogosContainer.appendChild(logoWrapper);
    });
    renderSelectableLogos();
    renderProductCatalog();
    renderTemplateList();
    renderTemplatePreview();
};

// --- Core Generation Logic ---
const performGeneration = async (
    fullPrompt: string,
    baseImage: { data: string; mimeType: string },
    logoImageBase64?: string | null
): Promise<{ imageBase64: string; imageMimeType: string } | { error: string }> => {
    try {
        const imagePart = { inlineData: { mimeType: baseImage.mimeType, data: baseImage.data } };
        const contentParts: ({ inlineData: { mimeType: string; data: string; } } | { text: string; })[] = [imagePart];

        if (logoImageBase64) {
            const logoMimeType = logoImageBase64.split(';')[0].split(':')[1];
            const logoData = logoImageBase64.split(',')[1];
            contentParts.push({ inlineData: { mimeType: logoMimeType, data: logoData } });
        }

        contentParts.push({ text: fullPrompt });

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: { parts: contentParts },
            config: { responseModalities: [Modality.IMAGE, Modality.TEXT] },
        });

        const imageOutputPart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
        if (imageOutputPart?.inlineData) {
            return {
                imageBase64: imageOutputPart.inlineData.data,
                imageMimeType: imageOutputPart.inlineData.mimeType,
            };
        } else {
            const textResponse = response.text?.trim() || 'The AI did not generate an image. It might have refused the request if it violates safety policies.';
            return { error: textResponse };
        }
    } catch (e) {
        console.error(e);
        const message = e instanceof Error ? e.message : 'An unknown error occurred with the AI model.';
        return { error: message };
    }
};

// --- Instagram Features ---
const handleFormatSelection = (format: string, ratio: string) => {
    selectedFormat = format;
    selectedAspectRatio = ratio;

    // Update button states
    formatButtons.forEach(btn => {
        if (btn.dataset.format === format) {
            btn.style.borderColor = 'var(--m3-primary)';
            btn.classList.add('active');
        } else {
            btn.style.borderColor = 'transparent';
            btn.classList.remove('active');
        }
    });

    // Update preview container aspect ratio
    instagramPreviewContainer.style.aspectRatio = ratio;
};

const generateCaption = async () => {
    if (!generatedImageBase64 || !originalImageBase64) {
        alert('Please generate a design first.');
        return;
    }

    generateCaptionBtn.disabled = true;
    generateCaptionBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Generating...</span>';

    try {
        const category = categorySelect.value;
        const prompt = promptInput.value || 'your product';

        let captionPrompt = `Create an engaging Instagram caption for a ${category} post about ${prompt}. `;
        captionPrompt += `Keep it concise (100-150 characters), include a call-to-action, and match the Stash brand voice. `;
        captionPrompt += `Brand guidelines: ${brandKit.guidelines || 'Professional, friendly, and authentic'}. `;
        captionPrompt += `Only return the caption text, no hashtags.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp',
            contents: { parts: [{ text: captionPrompt }] },
        });

        const caption = response.text?.trim() || 'Check out our latest!';
        generatedCaption = caption;
        captionOutput.value = caption;
    } catch (e) {
        console.error(e);
        alert('Failed to generate caption. Please try again.');
    } finally {
        generateCaptionBtn.disabled = false;
        generateCaptionBtn.innerHTML = '<i class="material-icons">text_fields</i> <span>Generate Caption</span>';
    }
};

const generateHashtags = async () => {
    if (!generatedImageBase64 || !originalImageBase64) {
        alert('Please generate a design first.');
        return;
    }

    generateHashtagsBtn.disabled = true;
    generateHashtagsBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Generating...</span>';

    try {
        const category = categorySelect.value;
        const prompt = promptInput.value || 'your product';

        let hashtagPrompt = `Generate 15-20 relevant Instagram hashtags for a ${category} post about ${prompt}. `;
        hashtagPrompt += `Include a mix of popular, niche, and branded hashtags. `;
        hashtagPrompt += `Include #stash and other relevant tags. Return only the hashtags separated by spaces.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp',
            contents: { parts: [{ text: hashtagPrompt }] },
        });

        let hashtags = response.text?.trim() || '#stash';
        // Ensure hashtags start with #
        hashtags = hashtags.split(/\s+/).map(tag => tag.startsWith('#') ? tag : `#${tag}`).join(' ');
        generatedHashtags = hashtags;
        hashtagsOutput.value = hashtags;
    } catch (e) {
        console.error(e);
        alert('Failed to generate hashtags. Please try again.');
    } finally {
        generateHashtagsBtn.disabled = false;
        generateHashtagsBtn.innerHTML = '<i class="material-icons">tag</i> <span>Generate Hashtags</span>';
    }
};

// --- Calendar Functions ---
const renderCalendar = () => {
    if (calendarView === 'week') {
        renderWeekView();
    } else {
        renderMonthView();
    }
};

const renderWeekView = () => {
    const startOfWeek = new Date(currentCalendarDate);
    startOfWeek.setDate(currentCalendarDate.getDate() - currentCalendarDate.getDay());

    calendarTitle.textContent = `${startOfWeek.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;

    calendarWeekGrid.innerHTML = '';

    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        const dayStr = day.toISOString().split('T')[0];

        const dayCell = document.createElement('div');
        dayCell.className = 'm3-card';
        dayCell.style.minHeight = '150px';
        dayCell.style.padding = 'var(--m3-gap-2)';
        dayCell.style.cursor = 'pointer';

        const isToday = dayStr === new Date().toISOString().split('T')[0];
        if (isToday) {
            dayCell.style.borderLeft = '4px solid var(--m3-primary)';
        }

        const postsForDay = scheduledPosts.filter(p => p.date.startsWith(dayStr));

        dayCell.innerHTML = `
            <div class="m3-title-sm" style="margin-bottom: 0.5rem; color: ${isToday ? 'var(--m3-primary)' : 'var(--m3-on-surface)'};">${day.getDate()}</div>
            ${postsForDay.map(post => `
                <div class="scheduled-post-item" data-post-id="${post.id}" style="background-color: var(--m3-primary-container); padding: 0.25rem; border-radius: var(--m3-shape-small); margin-bottom: 0.25rem; cursor: pointer;">
                    <div style="width: 100%; aspect-ratio: ${post.format === 'square' ? '1/1' : post.format === 'story' ? '9/16' : post.format === 'portrait' ? '4/5' : '1.91/1'}; background-image: url(data:${post.imageMimeType};base64,${post.imageBase64}); background-size: cover; background-position: center; border-radius: var(--m3-shape-xs);"></div>
                </div>
            `).join('')}
        `;

        dayCell.onclick = (e) => {
            const target = e.target as HTMLElement;
            const postItem = target.closest('.scheduled-post-item') as HTMLElement;
            if (postItem) {
                const postId = parseInt(postItem.dataset.postId || '0', 10);
                showScheduledPost(postId);
            }
        };

        calendarWeekGrid.appendChild(dayCell);
    }
};

const renderMonthView = () => {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();

    calendarTitle.textContent = currentCalendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    calendarMonthGrid.innerHTML = '';

    for (let i = 0; i < 42; i++) {
        const day = new Date(startDate);
        day.setDate(startDate.getDate() + i);
        const dayStr = day.toISOString().split('T')[0];

        const dayCell = document.createElement('div');
        dayCell.className = 'm3-card';
        dayCell.style.minHeight = '100px';
        dayCell.style.padding = 'var(--m3-gap-2)';
        dayCell.style.opacity = day.getMonth() !== month ? '0.5' : '1';

        const isToday = dayStr === new Date().toISOString().split('T')[0];
        if (isToday) {
            dayCell.style.borderLeft = '4px solid var(--m3-primary)';
        }

        const postsForDay = scheduledPosts.filter(p => p.date.startsWith(dayStr));

        dayCell.innerHTML = `
            <div class="m3-label-sm" style="margin-bottom: 0.25rem; color: ${isToday ? 'var(--m3-primary)' : 'var(--m3-on-surface)'};">${day.getDate()}</div>
            <div style="display: flex; flex-wrap: wrap; gap: 2px;">
                ${postsForDay.slice(0, 3).map(post => `
                    <div class="scheduled-post-dot" data-post-id="${post.id}" style="width: 8px; height: 8px; background-color: var(--m3-primary); border-radius: 50%; cursor: pointer;"></div>
                `).join('')}
                ${postsForDay.length > 3 ? `<span class="m3-label-xs" style="color: var(--m3-on-surface-variant);">+${postsForDay.length - 3}</span>` : ''}
            </div>
        `;

        calendarMonthGrid.appendChild(dayCell);
    }
};

const showScheduledPost = (postId: number) => {
    const post = scheduledPosts.find(p => p.id === postId);
    if (!post) return;

    selectedScheduledPostId = postId;
    scheduledImagePreview.style.backgroundImage = `url(data:${post.imageMimeType};base64,${post.imageBase64})`;
    scheduledDateTime.value = post.date;
    scheduledCaption.value = post.caption;
    scheduledHashtags.value = post.hashtags;
    scheduledContentDetails.style.display = 'block';
    scheduledContentDetails.scrollIntoView({ behavior: 'smooth' });
};

const saveScheduledPost = () => {
    if (selectedScheduledPostId === null) return;

    const post = scheduledPosts.find(p => p.id === selectedScheduledPostId);
    if (!post) return;

    post.date = scheduledDateTime.value;
    post.caption = scheduledCaption.value;
    post.hashtags = scheduledHashtags.value;

    saveScheduledPosts();
    renderCalendar();
    alert('Post updated successfully!');
};

const deleteScheduledPost = () => {
    if (selectedScheduledPostId === null) return;

    if (!confirm('Are you sure you want to delete this scheduled post?')) return;

    scheduledPosts = scheduledPosts.filter(p => p.id !== selectedScheduledPostId);
    selectedScheduledPostId = null;

    saveScheduledPosts();
    renderCalendar();
    scheduledContentDetails.style.display = 'none';
    alert('Post deleted successfully!');
};

const addToCalendar = () => {
    if (!generatedImageBase64 || !generatedImageMimeType) {
        alert('Please generate a design first.');
        return;
    }

    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const dateStr = tomorrow.toISOString().slice(0, 16);

    const newPost: ScheduledPost = {
        id: Date.now(),
        date: dateStr,
        imageBase64: generatedImageBase64,
        imageMimeType: generatedImageMimeType,
        caption: captionOutput.value || '',
        hashtags: hashtagsOutput.value || '',
        format: selectedFormat,
        category: selectedCategory
    };

    scheduledPosts.push(newPost);
    saveScheduledPosts();

    alert('Added to calendar! Switch to the Calendar tab to schedule it.');
};

// --- Event Handlers ---
const handleImageUpload = async (file: File) => {
  if (!file.type.startsWith('image/')) {
    alert('Please select an image file.');
    return;
  }
  try {
    const {data, mimeType} = await fileToGenerativePart(file);
    originalImageBase64 = data;
    originalImageMimeType = mimeType;
    displayImage(originalImageContainer, data, mimeType);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Could not process file';
    showError(originalImageContainer, message);
    originalImageBase64 = null;
    originalImageMimeType = null;
  }
};

const handleGenerateClick = async () => {
  if (!originalImageBase64 || !originalImageMimeType) {
    alert('Please upload an image first.');
    return;
  }
  const userPrompt = promptInput.value.trim();
  if (!userPrompt) {
    alert('Please describe the design you want.');
    return;
  }
  updateLoadingState(true);

  const promptParts = [];
  if (brandKit.guidelines) promptParts.push(`Style Guidelines: """${brandKit.guidelines}"""`);
  if (brandKit.colors.length > 0) {
      promptParts.push(`Brand Colors: Use ONLY the following colors: ${brandKit.colors.join(', ')}.`);
  }
  if (selectedLogoBase64) {
    promptParts.push('Logo Placement: Place the provided logo tastefully on the final image, following brand guidelines for clear spacing.');
  }
  promptParts.push(`User Request: """${userPrompt}"""`);
  const finalPrompt = promptParts.join('\n\n');

  const result = await performGeneration(
      finalPrompt,
      { data: originalImageBase64, mimeType: originalImageMimeType },
      selectedLogoBase64
  );

  if ('imageBase64' in result) {
      generatedImageBase64 = result.imageBase64;
      generatedImageMimeType = result.imageMimeType;
      displayImage(instagramPreviewContainer, generatedImageBase64, generatedImageMimeType);
      downloadAllBtn.classList.remove('hidden');
      addToCalendarBtn.classList.remove('hidden');
  } else {
      showError(instagramPreviewContainer, result.error);
      downloadAllBtn.classList.add('hidden');
      addToCalendarBtn.classList.add('hidden');
  }

  updateLoadingState(false);
};

const handleDownloadClick = () => {
  if (generatedImageBase64 && generatedImageMimeType) {
    // Download image
    const imgLink = document.createElement('a');
    imgLink.href = `data:${generatedImageMimeType};base64,${generatedImageBase64}`;
    const fileExtension = generatedImageMimeType.split('/')[1] || 'png';
    const timestamp = new Date().toISOString().split('T')[0];
    imgLink.download = `stash-instagram-${selectedFormat}-${timestamp}.${fileExtension}`;
    document.body.appendChild(imgLink);
    imgLink.click();
    document.body.removeChild(imgLink);

    // Download caption & hashtags as text file
    if (captionOutput.value || hashtagsOutput.value) {
      const textContent = `STASH INSTAGRAM POST\n\nCaption:\n${captionOutput.value}\n\nHashtags:\n${hashtagsOutput.value}\n\nFormat: ${selectedFormat}\nCategory: ${selectedCategory}\nDate: ${new Date().toLocaleString()}`;
      const textBlob = new Blob([textContent], { type: 'text/plain' });
      const textLink = document.createElement('a');
      textLink.href = URL.createObjectURL(textBlob);
      textLink.download = `stash-instagram-content-${timestamp}.txt`;
      document.body.appendChild(textLink);
      textLink.click();
      document.body.removeChild(textLink);
      URL.revokeObjectURL(textLink.href);
    }

    alert('Downloaded successfully!');
  }
};

const handleLogoUpload = async (files: FileList) => {
    for (const file of Array.from(files)) {
        if (file.type.startsWith('image/')) {
            try {
                const { data, mimeType } = await fileToGenerativePart(file);
                brandKit.logos.push(`data:${mimeType};base64,${data}`);
            } catch (e) {
                console.error("Could not process logo file:", file.name, e);
            }
        }
    }
    saveLogos();
    renderBrandKitUI();
};

const handleBulkProductUpload = async (files: FileList) => {
    if (files.length === 0) return;

    alert(`Processing ${files.length} files. This may take a moment...`);

    const newProducts: Product[] = [];
    const processingPromises = Array.from(files).map(async (file) => {
        if (!file.type.startsWith('image/')) {
            console.warn(`Skipping non-image file: ${file.name}`);
            return; // Skip non-image files
        }

        try {
            // 1. Parse filename
            const fileNameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.'));
            const parts = fileNameWithoutExt.split('_');
            const name = (parts[0] || 'Untitled Product').replace(/-/g, ' ');
            const description = (parts.slice(1).join('_') || '').replace(/-/g, ' ');

            // 2. Convert file to base64
            const { data, mimeType } = await fileToGenerativePart(file);

            // 3. Create product object
            const newProduct: Product = {
                id: Date.now() + Math.random(), // Add random to avoid collision in fast loops
                name,
                description,
                imageBase64: data,
                imageMimeType: mimeType,
            };
            newProducts.push(newProduct);
        } catch (e) {
            console.error(`Failed to process file ${file.name}:`, e);
        }
    });

    await Promise.all(processingPromises);

    if (newProducts.length > 0) {
        brandKit.products.push(...newProducts);
        saveProducts();
        renderProductCatalog();
        alert(`${newProducts.length} products were successfully added!`);
    }

    // Reset the file input
    if (bulkProductUploadInput) bulkProductUploadInput.value = '';
};


// --- Automation Functions ---
const renderAutomationUI = () => {
    // Render settings
    automationPromptInput.value = automationState.prompt;

    // Render toggle button and status
    automationStatusText.textContent = automationState.enabled ? 'Enabled' : 'Disabled';
    automationBtnText.textContent = automationState.enabled ? 'Disable Daily Automation' : 'Enable Daily Automation';
    if(automationState.enabled) {
        automationToggleBtn.style.backgroundColor = 'var(--m3-error)';
        automationToggleBtn.style.color = 'var(--m3-on-error)';
    } else {
        automationToggleBtn.style.backgroundColor = 'var(--m3-primary)';
        automationToggleBtn.style.color = 'var(--m3-on-primary)';
    }
    automationStatusIndicator.style.backgroundColor = automationState.enabled ? 'var(--m3-primary)' : 'var(--m3-outline)';


    // Render history
    automationHistoryContainer.innerHTML = '';
    if (automationHistory.length === 0) {
        automationHistoryContainer.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: var(--m3-on-surface-variant); padding: 2rem;">No designs generated yet.</div>`;
    } else {
        [...automationHistory].reverse().forEach(item => {
            const card = document.createElement('div');
            card.className = 'm3-card';
            card.innerHTML = `
                <div style="height: 10rem; border-radius: var(--m3-shape-small); background-image: url(data:${item.imageMimeType};base64,${item.imageBase64}); background-size: cover; background-position: center;"></div>
                <div style="padding: 0.75rem;">
                    <p class="m3-title-sm">${new Date(item.date).toLocaleDateString()}</p>
                    <p class="m3-body-md" style="color: var(--m3-on-surface-variant); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${item.prompt}">${item.prompt}</p>
                </div>
            `;
            automationHistoryContainer.appendChild(card);
        });
    }
};

const runDailyAutomation = async () => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const todayStatusContainer = automationTodayStatus;

    if (!automationState.enabled) {
        todayStatusContainer.innerHTML = `<p>Automation is disabled. Enable it to generate a design for today.</p>`;
        return;
    }

    if (!automationState.prompt || brandKit.products.length === 0) {
        todayStatusContainer.innerHTML = `<p style="color: var(--m3-error);">Automation is enabled, but setup is incomplete. Please add a prompt and at least one product to the <strong>Product Catalog</strong> in your Brand Kit.</p>`;
        return;
    }

    const hasRunToday = automationHistory.some(h => h.date === today);
    if (hasRunToday) {
        todayStatusContainer.innerHTML = `<p style="color: var(--m3-primary);"><i class="material-icons" style="vertical-align: middle; margin-right: 0.5rem;">check_circle</i>Today's design has already been generated.</p>`;
        return;
    }

    todayStatusContainer.innerHTML = `
        <div style="display: flex; align-items: center; color: var(--m3-primary);">
            <i class="fas fa-spinner fa-spin" style="font-size: 1.5rem; margin-right: 1rem;"></i>
            <span>Generating design for ${today}...</span>
        </div>`;
    
    // Select product for the day and construct dynamic prompt
    const now = new Date();
    const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
    const fullDate = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    const productOfTheDay = brandKit.products[dayOfYear % brandKit.products.length];
    
    const dynamicPrompt = automationState.prompt
        .replace(/\[DATE\]/g, fullDate)
        .replace(/\[DAY_OF_WEEK\]/g, dayOfWeek)
        .replace(/\[PRODUCT_OF_THE_DAY\]/g, productOfTheDay.name) // Alias for backward compatibility
        .replace(/\[PRODUCT_NAME\]/g, productOfTheDay.name)
        .replace(/\[PRODUCT_DESCRIPTION\]/g, productOfTheDay.description);

    const promptParts = [];
    if (brandKit.guidelines) promptParts.push(`Style Guidelines: """${brandKit.guidelines}"""`);
    if (brandKit.colors.length > 0) {
        promptParts.push(`Brand Colors: Use ONLY the following colors: ${brandKit.colors.join(', ')}.`);
    }
    promptParts.push(`User Request: """${dynamicPrompt}"""`);
    const finalPrompt = promptParts.join('\n\n');

    const result = await performGeneration(finalPrompt, { data: productOfTheDay.imageBase64, mimeType: productOfTheDay.imageMimeType });

    if ('imageBase64' in result) {
        automationHistory.push({
            date: today,
            imageBase64: result.imageBase64,
            imageMimeType: result.imageMimeType,
            prompt: dynamicPrompt
        });
        saveAutomationHistory();
        renderAutomationUI();
        todayStatusContainer.innerHTML = `<p style="color: var(--m3-primary);"><i class="material-icons" style="vertical-align: middle; margin-right: 0.5rem;">check_circle</i>Successfully generated today's design!</p>`;
    } else {
        todayStatusContainer.innerHTML = `<p style="color: var(--m3-error);"><i class="material-icons" style="vertical-align: middle; margin-right: 0.5rem;">error</i>Failed to generate today's design. Error: ${result.error}</p>`;
    }
};


// --- Event Listeners Setup ---
const pages = {
  'design-studio': { page: designStudioPage, button: navDesignStudio },
  'calendar': { page: calendarPage, button: navCalendar },
  'brand-kit': { page: brandKitPage, button: navBrandKit },
  'automation': { page: automationPage, button: navAutomation },
};

const navigateTo = (pageKey: keyof typeof pages) => {
  const navButtons = [navDesignStudio, navCalendar, navBrandKit, navAutomation];

  Object.values(pages).forEach(({ page }) => page.classList.remove('active'));
  navButtons.forEach(btn => btn.classList.remove('active-tab'));

  pages[pageKey].page.classList.add('active');
  pages[pageKey].button.classList.add('active-tab');

   if (pageKey === 'design-studio') {
        renderSelectableLogos();
    } else if (pageKey === 'calendar') {
        renderCalendar();
    }
};


// Design Studio Listeners
formatButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const format = btn.dataset.format || 'square';
        const ratio = btn.dataset.ratio || '1/1';
        handleFormatSelection(format, ratio);
    });
});

categorySelect.addEventListener('change', () => {
    selectedCategory = categorySelect.value;
});

imageUploadArea.addEventListener('click', () => imageUploadInput.click());
imageUploadArea.addEventListener('dragover', (e) => { e.preventDefault(); imageUploadArea.style.backgroundColor = 'var(--m3-surface-variant)'; });
imageUploadArea.addEventListener('dragleave', (e) => { e.preventDefault(); imageUploadArea.style.backgroundColor = 'transparent'; });
imageUploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  imageUploadArea.style.backgroundColor = 'transparent';
  if (e.dataTransfer?.files?.[0]) handleImageUpload(e.dataTransfer.files[0]);
});
imageUploadInput.addEventListener('change', (e) => {
  const target = e.target as HTMLInputElement;
  if (target.files?.[0]) handleImageUpload(target.files[0]);
});
generateBtn.addEventListener('click', handleGenerateClick);
generateCaptionBtn.addEventListener('click', generateCaption);
generateHashtagsBtn.addEventListener('click', generateHashtags);
downloadAllBtn.addEventListener('click', handleDownloadClick);
addToCalendarBtn.addEventListener('click', addToCalendar);

// Brand Kit Listeners
saveGuidelinesBtn.addEventListener('click', () => {
    brandKit.guidelines = styleGuidelinesInput.value;
    saveGuidelines();
});
colorPicker.addEventListener('input', () => { 
    colorHexInput.value = colorPicker.value;
});
colorHexInput.addEventListener('input', () => { colorPicker.value = colorHexInput.value; });
addColorBtn.addEventListener('click', () => {
    const newColor = colorHexInput.value;
    if (newColor && !brandKit.colors.includes(newColor)) {
        brandKit.colors.push(newColor);
        saveColors();
        renderBrandKitUI();
    }
});
logoUploadArea.addEventListener('click', () => logoUploadInput.click());
logoUploadInput.addEventListener('change', (e) => {
    if ((e.target as HTMLInputElement).files) handleLogoUpload((e.target as HTMLInputElement).files);
});

// Brand Kit - Product Catalog Listeners
bulkProductUploadInput.addEventListener('change', (e) => {
    if ((e.target as HTMLInputElement).files) {
        handleBulkProductUpload((e.target as HTMLInputElement).files);
    }
});
newProductImageArea.addEventListener('click', () => newProductImageUpload.click());
newProductImageUpload.addEventListener('change', async (e) => {
    const target = e.target as HTMLInputElement;
    if (target.files?.[0]) {
        const file = target.files[0];
        const { data, mimeType } = await fileToGenerativePart(file);
        newProductImage = { data, mimeType };
        newProductImageText.textContent = file.name;
        newProductImageArea.style.borderColor = 'var(--m3-primary)';
    }
});
addProductBtn.addEventListener('click', () => {
    const name = newProductName.value.trim();
    const description = newProductDescription.value.trim();
    if (!name || !newProductImage) {
        alert('Please provide a product name and image.');
        return;
    }
    const newProduct: Product = {
        id: Date.now(),
        name,
        description,
        imageBase64: newProductImage.data,
        imageMimeType: newProductImage.mimeType,
    };
    brandKit.products.push(newProduct);
    saveProducts();
    renderProductCatalog();

    // Reset form
    newProductName.value = '';
    newProductDescription.value = '';
    newProductImage = null;
    newProductImageText.textContent = 'Click to upload';
    newProductImageArea.style.borderColor = 'var(--m3-outline)';
    newProductImageUpload.value = '';
});

// Brand Kit - Design Templates Listeners
addTemplateBtn.addEventListener('click', () => openTemplateModal());
saveTemplateBtn.addEventListener('click', handleSaveTemplate);
templateSearchInput.addEventListener('input', renderTemplateList);


// Calendar Listeners
calendarViewWeekBtn.addEventListener('click', () => {
    calendarView = 'week';
    calendarViewWeekBtn.classList.add('active');
    calendarViewMonthBtn.classList.remove('active');
    calendarWeekView.style.display = 'block';
    calendarMonthView.style.display = 'none';
    renderCalendar();
});

calendarViewMonthBtn.addEventListener('click', () => {
    calendarView = 'month';
    calendarViewMonthBtn.classList.add('active');
    calendarViewWeekBtn.classList.remove('active');
    calendarWeekView.style.display = 'none';
    calendarMonthView.style.display = 'block';
    renderCalendar();
});

calendarPrevBtn.addEventListener('click', () => {
    if (calendarView === 'week') {
        currentCalendarDate.setDate(currentCalendarDate.getDate() - 7);
    } else {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    }
    renderCalendar();
});

calendarNextBtn.addEventListener('click', () => {
    if (calendarView === 'week') {
        currentCalendarDate.setDate(currentCalendarDate.getDate() + 7);
    } else {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    }
    renderCalendar();
});

batchGenerateBtn.addEventListener('click', () => {
    // Populate template options
    batchTemplateSelect.innerHTML = '<option value="">Select a template...</option>';
    brandKit.templates.forEach(template => {
        const option = document.createElement('option');
        option.value = template.id.toString();
        option.textContent = template.name;
        batchTemplateSelect.appendChild(option);
    });
    batchModal.setAttribute('open', '');
});

closeBatchModalBtn.addEventListener('click', () => {
    batchModal.removeAttribute('open');
});

startBatchBtn.addEventListener('click', async () => {
    const days = parseInt(batchDaysInput.value, 10);
    const templateId = parseInt(batchTemplateSelect.value, 10);
    const format = batchFormatSelect.value;

    if (!templateId || !days) {
        alert('Please select a template and number of days.');
        return;
    }

    const template = brandKit.templates.find(t => t.id === templateId);
    if (!template || brandKit.products.length === 0) {
        alert('Template or products not found.');
        return;
    }

    startBatchBtn.disabled = true;
    batchProgress.style.display = 'block';

    const startDate = new Date();
    for (let i = 0; i < days; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const dateStr = currentDate.toISOString().slice(0, 16);

        // Select product for this day
        const product = brandKit.products[i % brandKit.products.length];

        // Generate dynamic prompt
        const dynamicPrompt = template.prompt
            .replace(/\[PRODUCT_NAME\]/g, product.name)
            .replace(/\[PRODUCT_DESCRIPTION\]/g, product.description)
            .replace(/\[DATE\]/g, currentDate.toLocaleDateString())
            .replace(/\[DAY_OF_WEEK\]/g, currentDate.toLocaleDateString('en-US', { weekday: 'long' }));

        // Build full prompt
        const promptParts = [];
        if (brandKit.guidelines) promptParts.push(`Style Guidelines: """${brandKit.guidelines}"""`);
        if (brandKit.colors.length > 0) {
            promptParts.push(`Brand Colors: Use ONLY the following colors: ${brandKit.colors.join(', ')}.`);
        }
        promptParts.push(`User Request: """${dynamicPrompt}"""`);
        const finalPrompt = promptParts.join('\n\n');

        // Generate image
        const result = await performGeneration(finalPrompt, { data: product.imageBase64, mimeType: product.imageMimeType });

        if ('imageBase64' in result) {
            // Generate caption
            const captionPrompt = `Create an engaging Instagram caption for a product post about ${product.name}. Keep it concise (100-150 characters), include a call-to-action, and match the Stash brand voice.`;
            const captionResponse = await ai.models.generateContent({
                model: 'gemini-2.0-flash-exp',
                contents: { parts: [{ text: captionPrompt }] },
            });
            const caption = captionResponse.text?.trim() || 'Check out our latest!';

            // Generate hashtags
            const hashtagPrompt = `Generate 15 relevant Instagram hashtags for a post about ${product.name}. Include #stash. Return only hashtags separated by spaces.`;
            const hashtagResponse = await ai.models.generateContent({
                model: 'gemini-2.0-flash-exp',
                contents: { parts: [{ text: hashtagPrompt }] },
            });
            let hashtags = hashtagResponse.text?.trim() || '#stash';
            hashtags = hashtags.split(/\s+/).map(tag => tag.startsWith('#') ? tag : `#${tag}`).join(' ');

            // Add to calendar
            scheduledPosts.push({
                id: Date.now() + i,
                date: dateStr,
                imageBase64: result.imageBase64,
                imageMimeType: result.imageMimeType,
                caption,
                hashtags,
                format,
                category: 'product'
            });
        }

        // Update progress
        const progress = Math.round(((i + 1) / days) * 100);
        batchProgressBar.style.width = `${progress}%`;
        batchProgressText.textContent = `${progress}%`;
    }

    saveScheduledPosts();
    alert(`Generated ${days} posts successfully!`);

    batchModal.removeAttribute('open');
    batchProgress.style.display = 'none';
    batchProgressBar.style.width = '0%';
    batchProgressText.textContent = '0%';
    startBatchBtn.disabled = false;

    navigateTo('calendar');
});

saveScheduledBtn.addEventListener('click', saveScheduledPost);
deleteScheduledBtn.addEventListener('click', deleteScheduledPost);

// Automation Listeners
automationToggleBtn.addEventListener('click', () => {
    automationState.enabled = !automationState.enabled;
    automationState.prompt = automationPromptInput.value; // Save prompt on toggle
    saveAutomationState();
    renderAutomationUI();
    runDailyAutomation(); // Re-check status when toggled
});
automationPromptInput.addEventListener('change', () => {
    automationState.prompt = automationPromptInput.value;
    saveAutomationState();
});

// Theme Switcher Listener
themeSwitcherButtons.forEach(button => {
    button.addEventListener('click', () => {
        const theme = (button as HTMLButtonElement).dataset.theme;
        document.body.classList.remove('theme-light', 'theme-dark');
        document.body.classList.add(theme === 'light' ? 'theme-light' : 'theme-dark');
    });
});


// --- Initial App Load ---
document.addEventListener('DOMContentLoaded', () => {
    // Modal Listeners
    closeTemplateModalBtn.addEventListener('click', () => templateModal.removeAttribute('open'));
    templateModal.addEventListener('click', (e) => {
        if (e.target === templateModal) {
            templateModal.removeAttribute('open');
        }
    });

    // Navigation Listeners
    navDesignStudio.addEventListener('click', () => navigateTo('design-studio'));
    navCalendar.addEventListener('click', () => navigateTo('calendar'));
    navBrandKit.addEventListener('click', () => navigateTo('brand-kit'));
    navAutomation.addEventListener('click', () => navigateTo('automation'));

    // Load data and render UI
    loadBrandKit();
    loadAutomationState();
    loadAutomationHistory();
    loadScheduledPosts();

    renderBrandKitUI();
    renderAutomationUI();
    navigateTo('design-studio'); // Default page
    runDailyAutomation();
});

export {};
