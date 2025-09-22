/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {GoogleGenAI, Modality, GenerateContentResponse} from '@google/genai';

// --- DOM Element References ---
const designStudioPage = document.getElementById('design-studio-page') as HTMLElement;
const brandKitPage = document.getElementById('brand-kit-page') as HTMLElement;
const automationPage = document.getElementById('automation-page') as HTMLElement;
const navDesignStudio = document.getElementById('nav-design-studio') as HTMLButtonElement;
const navBrandKit = document.getElementById('nav-brand-kit') as HTMLButtonElement;
const navAutomation = document.getElementById('nav-automation') as HTMLButtonElement;

// Design Studio Elements
const imageUploadArea = document.getElementById('image-upload-area') as HTMLDivElement;
const imageUploadInput = document.getElementById('image-upload') as HTMLInputElement;
const promptInput = document.getElementById('prompt-input') as HTMLTextAreaElement;
const logoSelectionContainer = document.getElementById('logo-selection-container') as HTMLDivElement;
const generateBtn = document.getElementById('generate-btn') as HTMLButtonElement;
const generateBtnText = document.getElementById('generate-btn-text') as HTMLSpanElement;
const generateSpinner = document.getElementById('generate-spinner') as HTMLSpanElement;
const originalImageContainer = document.getElementById('original-image-container') as HTMLDivElement;
const generatedImageContainer = document.getElementById('generated-image-container') as HTMLDivElement;
const downloadBtn = document.getElementById('download-btn') as HTMLButtonElement;

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
const newProductImageArea = document.getElementById('new-product-image-area') as HTMLDivElement;
const newProductImageUpload = document.getElementById('new-product-image-upload') as HTMLInputElement;
const newProductImageText = document.getElementById('new-product-image-text') as HTMLSpanElement;
const newProductName = document.getElementById('new-product-name') as HTMLInputElement;
const newProductDescription = document.getElementById('new-product-description') as HTMLTextAreaElement;
const addProductBtn = document.getElementById('add-product-btn') as HTMLButtonElement;
const productCatalogContainer = document.getElementById('product-catalog-container') as HTMLDivElement;


// Automation Elements
const automationPromptInput = document.getElementById('automation-prompt-input') as HTMLTextAreaElement;
const automationToggleBtn = document.getElementById('automation-toggle-btn') as HTMLButtonElement;
const automationBtnText = document.getElementById('automation-btn-text') as HTMLSpanElement;
const automationStatusIndicator = document.getElementById('automation-status-indicator') as HTMLSpanElement;
const automationStatusText = document.getElementById('automation-status-text') as HTMLSpanElement;
const automationTodayStatus = document.getElementById('automation-today-status') as HTMLDivElement;
const automationHistoryContainer = document.getElementById('automation-history-container') as HTMLDivElement;


// --- App State ---
type Product = {
    id: number;
    name: string;
    description: string;
    imageBase64: string;
    imageMimeType: string;
};

let originalImageBase64: string | null = null;
let originalImageMimeType: string | null = null;
let selectedLogoBase64: string | null = null;
let generatedImageBase64: string | null = null;
let generatedImageMimeType: string | null = null;
let isLoading = false;
let newProductImage: { data: string; mimeType: string; } | null = null;

let brandKit: {
    guidelines: string;
    colors: string[];
    logos: string[];
    products: Product[];
} = {
    guidelines: '',
    colors: [],
    logos: [],
    products: []
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
    generatedImageContainer.innerHTML = `
      <div class="flex flex-col items-center justify-center text-gray-400 h-full">
          <i class="fa-solid fa-spinner animate-spin text-4xl mb-4"></i>
          <p>Our AI designer is crafting your image...</p>
          <p class="text-sm text-gray-500">This can take a moment.</p>
      </div>`;
    downloadBtn.classList.add('hidden');
  } else {
    generateBtnText.classList.remove('hidden');
    generateSpinner.classList.add('hidden');
  }
};

const displayImage = (container: HTMLElement, base64: string, mimeType: string) => {
  container.innerHTML = '';
  const img = document.createElement('img');
  img.src = `data:${mimeType};base64,${base64}`;
  img.className = 'w-full h-full object-contain rounded-md';
  container.appendChild(img);
};

const showError = (container: HTMLElement, message: string) => {
  container.innerHTML = `
    <div class="flex flex-col items-center justify-center text-red-400 p-4 h-full">
        <i class="fa-solid fa-circle-exclamation text-4xl mb-4"></i>
        <p class="font-semibold">An Error Occurred</p>
        <p class="text-sm text-center">${message}</p>
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

// --- Brand Kit Functions ---
const saveBrandKit = () => saveToLocalStorage('stashBrandKit', brandKit);
const loadBrandKit = () => {
    brandKit = loadFromLocalStorage('stashBrandKit', { guidelines: '', colors: [], logos: [], products: [] });
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
  noLogoOption.className = 'aspect-square bg-gray-800 rounded-md flex items-center justify-center cursor-pointer p-2 border-2 border-cyan-400';
  noLogoOption.innerHTML = `<span class="text-xs text-center text-gray-400">No Logo</span>`;
  noLogoOption.onclick = () => {
    selectedLogoBase64 = null;
    document.querySelectorAll('#logo-selection-container > div').forEach(el => el.classList.remove('border-cyan-400'));
    noLogoOption.classList.add('border-cyan-400');
  };
  logoSelectionContainer.appendChild(noLogoOption);

  brandKit.logos.forEach(logoData => {
    const logoOption = document.createElement('div');
    logoOption.className = 'aspect-square bg-gray-800 rounded-md flex items-center justify-center cursor-pointer p-2 border-2 border-transparent hover:border-cyan-300';
    const img = document.createElement('img');
    img.src = logoData;
    img.className = 'w-full h-full object-contain';
    logoOption.appendChild(img);
    logoOption.onclick = () => {
      selectedLogoBase64 = logoData;
      document.querySelectorAll('#logo-selection-container > div').forEach(el => el.classList.remove('border-cyan-400'));
      logoOption.classList.add('border-cyan-400');
    };
    logoSelectionContainer.appendChild(logoOption);
  });
};


const renderProductCatalog = () => {
    productCatalogContainer.innerHTML = '';
    brandKit.products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'relative bg-gray-700 rounded-lg shadow-lg overflow-hidden group';
        card.innerHTML = `
            <img src="data:${product.imageMimeType};base64,${product.imageBase64}" class="w-full h-24 object-cover">
            <div class="p-2">
                <p class="font-bold text-sm truncate">${product.name}</p>
            </div>
            <button data-product-id="${product.id}" class="remove-product-btn absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                <i class="fa-solid fa-times"></i>
            </button>
        `;
        productCatalogContainer.appendChild(card);
    });

    document.querySelectorAll('.remove-product-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt((e.currentTarget as HTMLButtonElement).dataset.productId, 10);
            brandKit.products = brandKit.products.filter(p => p.id !== productId);
            saveBrandKit();
            renderProductCatalog();
        });
    });
};


const renderBrandKitUI = () => {
    styleGuidelinesInput.value = brandKit.guidelines || '';
    
    brandColorsContainer.innerHTML = '';
    brandKit.colors.forEach((color, index) => {
        const swatch = document.createElement('div');
        swatch.className = 'relative w-16 h-16 rounded-md border-2 border-gray-600';
        swatch.style.backgroundColor = color;
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '<i class="fa-solid fa-times"></i>';
        removeBtn.className = 'absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs';
        removeBtn.onclick = () => {
            brandKit.colors.splice(index, 1);
            saveBrandKit();
            renderBrandKitUI();
        };
        swatch.appendChild(removeBtn);
        brandColorsContainer.appendChild(swatch);
    });

    brandLogosContainer.innerHTML = '';
    brandKit.logos.forEach((logoData, index) => {
        const logoWrapper = document.createElement('div');
        logoWrapper.className = 'relative p-2 bg-gray-700 rounded-lg';
        const img = document.createElement('img');
        img.src = logoData;
        img.className = 'w-full h-full object-contain';
        logoWrapper.appendChild(img);
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '<i class="fa-solid fa-times"></i>';
        removeBtn.className = 'absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs';
        removeBtn.onclick = () => {
            brandKit.logos.splice(index, 1);
            saveBrandKit();
            renderBrandKitUI();
        };
        logoWrapper.appendChild(removeBtn);
        brandLogosContainer.appendChild(logoWrapper);
    });
    renderSelectableLogos();
    renderProductCatalog();
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
      displayImage(generatedImageContainer, generatedImageBase64, generatedImageMimeType);
      downloadBtn.classList.remove('hidden');
  } else {
      showError(generatedImageContainer, result.error);
      downloadBtn.classList.add('hidden');
  }
  
  updateLoadingState(false);
};

const handleDownloadClick = () => {
  if (generatedImageBase64 && generatedImageMimeType) {
    const a = document.createElement('a');
    a.href = `data:${generatedImageMimeType};base64,${generatedImageBase64}`;
    const fileExtension = generatedImageMimeType.split('/')[1] || 'png';
    a.download = `stash-ai-design.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
    saveBrandKit();
    renderBrandKitUI();
};

// --- Automation Functions ---
const renderAutomationUI = () => {
    // Render settings
    automationPromptInput.value = automationState.prompt;

    // Render toggle button and status
    automationStatusText.textContent = automationState.enabled ? 'Enabled' : 'Disabled';
    automationBtnText.textContent = automationState.enabled ? 'Disable Daily Automation' : 'Enable Daily Automation';
    automationToggleBtn.classList.toggle('bg-red-600', automationState.enabled);
    automationToggleBtn.classList.toggle('hover:bg-red-700', automationState.enabled);
    automationToggleBtn.classList.toggle('bg-green-600', !automationState.enabled);
    automationToggleBtn.classList.toggle('hover:bg-green-700', !automationState.enabled);
    automationStatusIndicator.classList.toggle('bg-green-500', automationState.enabled);
    automationStatusIndicator.classList.toggle('bg-gray-500', !automationState.enabled);


    // Render history
    automationHistoryContainer.innerHTML = '';
    if (automationHistory.length === 0) {
        automationHistoryContainer.innerHTML = `<div class="col-span-full text-center text-gray-500 py-8">No designs generated yet.</div>`;
    } else {
        [...automationHistory].reverse().forEach(item => {
            const card = document.createElement('div');
            card.className = 'bg-gray-700 rounded-lg shadow-lg overflow-hidden';
            card.innerHTML = `
                <img src="data:${item.imageMimeType};base64,${item.imageBase64}" class="w-full h-40 object-cover">
                <div class="p-3">
                    <p class="font-bold text-sm">${new Date(item.date).toLocaleDateString()}</p>
                    <p class="text-xs text-gray-400 truncate" title="${item.prompt}">${item.prompt}</p>
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
        todayStatusContainer.innerHTML = `<p class="text-yellow-400">Automation is enabled, but setup is incomplete. Please add a prompt and at least one product to the <strong>Product Catalog</strong> in your Brand Kit.</p>`;
        return;
    }

    const hasRunToday = automationHistory.some(h => h.date === today);
    if (hasRunToday) {
        todayStatusContainer.innerHTML = `<p class="text-green-400"><i class="fa-solid fa-check-circle mr-2"></i>Today's design has already been generated.</p>`;
        return;
    }

    todayStatusContainer.innerHTML = `
        <div class="flex items-center text-cyan-400">
            <i class="fa-solid fa-spinner animate-spin mr-2"></i>
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
        todayStatusContainer.innerHTML = `<p class="text-green-400"><i class="fa-solid fa-check-circle mr-2"></i>Successfully generated today's design!</p>`;
    } else {
        todayStatusContainer.innerHTML = `<p class="text-red-400"><i class="fa-solid fa-exclamation-circle mr-2"></i>Failed to generate today's design. Error: ${result.error}</p>`;
    }
};


// --- Event Listeners Setup ---
const pages = {
  'design-studio': { page: designStudioPage, nav: navDesignStudio },
  'brand-kit': { page: brandKitPage, nav: navBrandKit },
  'automation': { page: automationPage, nav: navAutomation },
};

const navigateTo = (pageKey: keyof typeof pages) => {
  Object.entries(pages).forEach(([key, { page, nav }]) => {
    const isActive = key === pageKey;
    page.classList.toggle('hidden', !isActive);
    nav.classList.toggle('text-cyan-400', isActive);
    nav.classList.toggle('font-semibold', isActive);
    nav.classList.toggle('text-gray-300', !isActive);
  });
   if (pageKey === 'design-studio') {
        renderSelectableLogos();
    }
};

Object.entries(pages).forEach(([key, { nav }]) => {
  nav.addEventListener('click', () => navigateTo(key as keyof typeof pages));
});


// Design Studio Listeners
imageUploadArea.addEventListener('click', () => imageUploadInput.click());
imageUploadArea.addEventListener('dragover', (e) => { e.preventDefault(); imageUploadArea.classList.add('border-cyan-400', 'bg-gray-700'); });
imageUploadArea.addEventListener('dragleave', (e) => { e.preventDefault(); imageUploadArea.classList.remove('border-cyan-400', 'bg-gray-700'); });
imageUploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  imageUploadArea.classList.remove('border-cyan-400', 'bg-gray-700');
  if (e.dataTransfer?.files?.[0]) handleImageUpload(e.dataTransfer.files[0]);
});
imageUploadInput.addEventListener('change', (e) => {
  const target = e.target as HTMLInputElement;
  if (target.files?.[0]) handleImageUpload(target.files[0]);
});
generateBtn.addEventListener('click', handleGenerateClick);
downloadBtn.addEventListener('click', handleDownloadClick);

// Brand Kit Listeners
saveGuidelinesBtn.addEventListener('click', () => {
    brandKit.guidelines = styleGuidelinesInput.value;
    saveBrandKit();
    alert('Guidelines saved!');
});
colorPicker.addEventListener('input', () => { colorHexInput.value = colorPicker.value; });
colorHexInput.addEventListener('input', () => { colorPicker.value = colorHexInput.value; });
addColorBtn.addEventListener('click', () => {
    const newColor = colorHexInput.value;
    if (newColor && !brandKit.colors.includes(newColor)) {
        brandKit.colors.push(newColor);
        saveBrandKit();
        renderBrandKitUI();
    }
});
logoUploadArea.addEventListener('click', () => logoUploadInput.click());
logoUploadInput.addEventListener('change', (e) => {
    if ((e.target as HTMLInputElement).files) handleLogoUpload((e.target as HTMLInputElement).files);
});

// Brand Kit - Product Catalog Listeners
newProductImageArea.addEventListener('click', () => newProductImageUpload.click());
newProductImageUpload.addEventListener('change', async (e) => {
    const target = e.target as HTMLInputElement;
    if (target.files?.[0]) {
        const file = target.files[0];
        const { data, mimeType } = await fileToGenerativePart(file);
        newProductImage = { data, mimeType };
        newProductImageText.textContent = file.name;
        newProductImageArea.classList.add('border-cyan-400');
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
    saveBrandKit();
    renderProductCatalog();

    // Reset form
    newProductName.value = '';
    newProductDescription.value = '';
    newProductImage = null;
    newProductImageText.textContent = 'Click to upload';
    newProductImageArea.classList.remove('border-cyan-400');
    newProductImageUpload.value = '';
});


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


// --- Initial App Load ---
document.addEventListener('DOMContentLoaded', () => {
    loadBrandKit();
    loadAutomationState();
    loadAutomationHistory();

    renderBrandKitUI();
    renderAutomationUI();
    navigateTo('design-studio'); // Default page
    runDailyAutomation();
});

export {};