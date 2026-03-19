import { escapeHtml } from "../utils/helpers.js";

export function renderImageGenApp(el) {
  const envKey = (typeof __GEMINI_API_KEY__ !== "undefined") ? __GEMINI_API_KEY__ : "";
  const savedKey = localStorage.getItem("gemini-api-key") || envKey;

  el.innerHTML = `
    <div class="imagegen-app">
      <div class="imagegen-settings">
        <div class="imagegen-row">
          <label>API Key</label>
          <div class="imagegen-key-wrap">
            <input type="password" class="imagegen-input imagegen-key" placeholder="Gemini API Key" value="${savedKey}" />
            <button class="imagegen-eye-btn" title="Show/Hide">👁️</button>
          </div>
        </div>
        <div class="imagegen-row imagegen-row-pair">
          <div class="imagegen-field">
            <label>Model</label>
            <select class="imagegen-select imagegen-model">
              <option value="gemini-3.1-flash-image-preview">Gemini 3.1 Flash Image</option>
              <option value="gemini-2.0-flash-preview-image-generation">Gemini 2.0 Flash (Fast)</option>
              <option value="gemini-2.0-flash-lite-preview-image-generation">Gemini 2.0 Flash Lite</option>
            </select>
          </div>
          <div class="imagegen-field">
            <label>Aspect Ratio</label>
            <select class="imagegen-select imagegen-aspect">
              <option value="">Auto</option>
              <option value="1:1">1:1</option>
              <option value="3:4">3:4</option>
              <option value="4:3">4:3</option>
              <option value="9:16">9:16</option>
              <option value="16:9">16:9</option>
            </select>
          </div>
        </div>
      </div>

      <div class="imagegen-prompt-area">
        <textarea class="imagegen-prompt" rows="3" placeholder="Describe the image you want to generate..."></textarea>
        <div class="imagegen-upload-row">
          <label class="imagegen-upload-btn">📎 Upload Image (for editing)
            <input type="file" class="imagegen-file" accept="image/*" hidden />
          </label>
          <span class="imagegen-file-name">No file selected</span>
          <button class="imagegen-clear-file hidden">✕</button>
        </div>
      </div>

      <div class="imagegen-actions">
        <button class="imagegen-generate-btn">✨ Generate Image</button>
      </div>

      <div class="imagegen-output">
        <div class="imagegen-placeholder">Enter a prompt and click Generate to create an image.</div>
      </div>
    </div>
  `;

  const keyInput     = el.querySelector(".imagegen-key");
  const eyeBtn       = el.querySelector(".imagegen-eye-btn");
  const modelSelect  = el.querySelector(".imagegen-model");
  const aspectSelect = el.querySelector(".imagegen-aspect");
  const promptArea   = el.querySelector(".imagegen-prompt");
  const fileInput    = el.querySelector(".imagegen-file");
  const fileName     = el.querySelector(".imagegen-file-name");
  const clearFile    = el.querySelector(".imagegen-clear-file");
  const generateBtn  = el.querySelector(".imagegen-generate-btn");
  const output       = el.querySelector(".imagegen-output");

  let uploadedImageData = null;
  let uploadedMimeType  = null;

  keyInput.addEventListener("input", () => {
    localStorage.setItem("gemini-api-key", keyInput.value.trim());
  });

  eyeBtn.addEventListener("click", () => {
    keyInput.type = keyInput.type === "password" ? "text" : "password";
  });

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;
    fileName.textContent = file.name;
    clearFile.classList.remove("hidden");
    uploadedMimeType = file.type;
    const reader = new FileReader();
    reader.onload = () => {
      uploadedImageData = reader.result.split(",")[1];
    };
    reader.readAsDataURL(file);
  });

  clearFile.addEventListener("click", () => {
    fileInput.value = "";
    fileName.textContent = "No file selected";
    clearFile.classList.add("hidden");
    uploadedImageData = null;
    uploadedMimeType = null;
  });

  [keyInput, promptArea].forEach((inp) => {
    inp.addEventListener("mousedown", (e) => e.stopPropagation());
  });

  generateBtn.addEventListener("click", async () => {
    const apiKey = keyInput.value.trim();
    if (!apiKey) {
      output.innerHTML = '<div class="imagegen-error">Please enter your Gemini API key.</div>';
      return;
    }
    const prompt = promptArea.value.trim();
    if (!prompt) {
      output.innerHTML = '<div class="imagegen-error">Please enter a prompt.</div>';
      return;
    }

    const model  = modelSelect.value;
    const aspect = aspectSelect.value;

    const parts = [];
    parts.push({ text: prompt });
    if (uploadedImageData) {
      parts.push({ inlineData: { mimeType: uploadedMimeType, data: uploadedImageData } });
    }

    const body = {
      contents: [{ parts }],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    };
    if (aspect) {
      body.generationConfig.aspectRatio = aspect;
    }

    output.innerHTML = '<div class="imagegen-loading"><div class="imagegen-spinner"></div>Generating image…</div>';
    generateBtn.disabled = true;

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        const msg = data.error?.message || res.statusText;
        output.innerHTML = `<div class="imagegen-error">API Error: ${escapeHtml(msg)}</div>`;
        return;
      }

      if (!data.candidates || !data.candidates[0]?.content?.parts) {
        const block = data.promptFeedback?.blockReason;
        output.innerHTML = `<div class="imagegen-error">${block ? "Blocked: " + escapeHtml(block) : "No content returned. Try a different prompt."}</div>`;
        return;
      }

      let html = "";
      for (const part of data.candidates[0].content.parts) {
        if (part.inlineData) {
          const src = `data:${part.inlineData.mimeType || "image/png"};base64,${part.inlineData.data}`;
          html += `<div class="imagegen-result-img"><img src="${src}" alt="Generated image" /><a class="imagegen-download" href="${src}" download="generated-image.png">💾 Save Image</a></div>`;
        } else if (part.text) {
          html += `<div class="imagegen-feedback">${escapeHtml(part.text)}</div>`;
        }
      }
      output.innerHTML = html || '<div class="imagegen-error">No image was generated. Try a different prompt.</div>';
    } catch (err) {
      output.innerHTML = `<div class="imagegen-error">Request failed: ${escapeHtml(err.message)}</div>`;
    } finally {
      generateBtn.disabled = false;
    }
  });

  promptArea.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      generateBtn.click();
    }
  });
}
