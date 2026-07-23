import {
  bufferToDataUrl,
  dataUrlToBuffer,
  downloadScanObject,
  uploadScanObject
} from "./supabase-storage.js";
import { getUserAppState, saveUserAppState } from "./user-app-data.js";

const PHOTO_NAMES = {
  frontPhoto: "front.jpg",
  sidePhoto: "side.jpg"
};

function pickScanMeta(body) {
  const meta = {};
  if (!body || typeof body !== "object") {
    return meta;
  }

  if (typeof body.scanComplete === "boolean") {
    meta.scanComplete = body.scanComplete;
  }
  if (body.scores && typeof body.scores === "object") {
    meta.scores = body.scores;
  }
  if (body.analysis && typeof body.analysis === "object") {
    meta.analysis = body.analysis;
  }
  if (Array.isArray(body.scoreHistory)) {
    meta.scoreHistory = body.scoreHistory.slice(-12);
  }
  if (body.journey && typeof body.journey === "object") {
    meta.journey = body.journey;
  }
  if (body.planProgress && typeof body.planProgress === "object") {
    meta.planProgress = body.planProgress;
  }
  if (typeof body.preview6mUrl === "string" || body.preview6mUrl === null) {
    meta.preview6mUrl = body.preview6mUrl;
  }
  if (typeof body.preview6mAt === "string" || body.preview6mAt === null) {
    meta.preview6mAt = body.preview6mAt;
  }
  if (Array.isArray(body.chatHistory)) {
    meta.chatHistory = body.chatHistory.slice(-40);
  }
  if (body.procedureSimulations && typeof body.procedureSimulations === "object") {
    meta.procedureSimulations = body.procedureSimulations;
  }
  if (typeof body.rescanPending === "boolean") {
    meta.rescanPending = body.rescanPending;
  }

  return meta;
}

async function uploadPhotoIfPresent(userId, field, dataUrl) {
  if (!dataUrl || typeof dataUrl !== "string") {
    return { skipped: true };
  }
  if (dataUrl.indexOf("data:image/") !== 0) {
    return { skipped: true };
  }

  const parsed = dataUrlToBuffer(dataUrl);
  if (!parsed) {
    return { error: "Invalid " + field + " data URL", status: 400 };
  }

  const name = PHOTO_NAMES[field];
  const contentType =
    parsed.contentType && parsed.contentType.indexOf("image/") === 0
      ? parsed.contentType
      : "image/jpeg";

  const uploaded = await uploadScanObject(userId, name, parsed.buffer, contentType);
  if (uploaded.error) {
    return uploaded;
  }

  return { ok: true, path: uploaded.path, field: field };
}

async function downloadPhotoDataUrl(userId, field) {
  const name = PHOTO_NAMES[field];
  const downloaded = await downloadScanObject(userId, name);
  if (downloaded.missing) {
    return { missing: true };
  }
  if (downloaded.error) {
    return downloaded;
  }

  const contentType =
    downloaded.contentType && downloaded.contentType.indexOf("image/") === 0
      ? downloaded.contentType
      : "image/jpeg";

  return {
    ok: true,
    field: field,
    dataUrl: bufferToDataUrl(downloaded.buffer, contentType)
  };
}

async function uploadAnalysisJson(userId, analysis) {
  if (!analysis || typeof analysis !== "object") {
    return { skipped: true };
  }
  const body = Buffer.from(JSON.stringify(analysis), "utf8");
  return uploadScanObject(userId, "analysis.json", body, "application/json");
}

async function downloadAnalysisJson(userId) {
  const downloaded = await downloadScanObject(userId, "analysis.json");
  if (downloaded.missing) {
    return { missing: true };
  }
  if (downloaded.error) {
    return downloaded;
  }
  try {
    const analysis = JSON.parse(downloaded.buffer.toString("utf8"));
    return { ok: true, analysis: analysis };
  } catch (error) {
    return { error: "Corrupt analysis.json", status: 500 };
  }
}

export async function getUserScan(userId) {
  const appStateResult = await getUserAppState(userId);
  if (appStateResult.error) {
    return appStateResult;
  }

  const appState =
    appStateResult.state && typeof appStateResult.state === "object" ? appStateResult.state : {};
  const scanMeta =
    appState.scan && typeof appState.scan === "object" ? appState.scan : {};

  const [front, side, analysisFile] = await Promise.all([
    downloadPhotoDataUrl(userId, "frontPhoto"),
    downloadPhotoDataUrl(userId, "sidePhoto"),
    downloadAnalysisJson(userId)
  ]);

  if (front.error) return front;
  if (side.error) return side;
  if (analysisFile.error) return analysisFile;

  const analysis =
    analysisFile.analysis ||
    (scanMeta.analysis && typeof scanMeta.analysis === "object" ? scanMeta.analysis : null);

  const hasRemoteScan = !!(
    front.dataUrl ||
    side.dataUrl ||
    analysis ||
    scanMeta.scanComplete
  );

  if (!hasRemoteScan) {
    return {
      scan: null,
      appState: appState
    };
  }

  return {
    scan: {
      scanComplete: scanMeta.scanComplete !== false,
      scores: scanMeta.scores || (analysis && analysis.scores) || null,
      analysis: analysis,
      frontPhoto: front.dataUrl || null,
      sidePhoto: side.dataUrl || null,
      scoreHistory: Array.isArray(appState.scoreHistory)
        ? appState.scoreHistory
        : Array.isArray(scanMeta.scoreHistory)
          ? scanMeta.scoreHistory
          : [],
      journey: appState.journey || scanMeta.journey || null,
      planProgress: appState.planProgress || scanMeta.planProgress || {},
      preview6mUrl: scanMeta.preview6mUrl || null,
      preview6mAt: scanMeta.preview6mAt || null,
      chatHistory: Array.isArray(scanMeta.chatHistory) ? scanMeta.chatHistory : [],
      procedureSimulations:
        scanMeta.procedureSimulations && typeof scanMeta.procedureSimulations === "object"
          ? scanMeta.procedureSimulations
          : {},
      rescanPending: !!scanMeta.rescanPending,
      scanUpdatedAt: scanMeta.scanUpdatedAt || appState.updatedAt || null
    },
    appState: appState
  };
}

export async function saveUserScan(userId, body) {
  const meta = pickScanMeta(body);
  const now = new Date().toISOString();

  const existingApp = await getUserAppState(userId);
  if (existingApp.error) {
    return existingApp;
  }
  const currentApp =
    existingApp.state && typeof existingApp.state === "object" ? existingApp.state : {};
  const currentScan =
    currentApp.scan && typeof currentApp.scan === "object" ? currentApp.scan : {};

  const uploads = [];
  let uploadedFront = false;
  let uploadedSide = false;
  let uploadedAnalysis = false;

  if (body && body.frontPhoto) {
    uploads.push(
      uploadPhotoIfPresent(userId, "frontPhoto", body.frontPhoto).then(function (result) {
        if (result && result.ok) uploadedFront = true;
        return result;
      })
    );
  }
  if (body && body.sidePhoto) {
    uploads.push(
      uploadPhotoIfPresent(userId, "sidePhoto", body.sidePhoto).then(function (result) {
        if (result && result.ok) uploadedSide = true;
        return result;
      })
    );
  }
  if (meta.analysis) {
    uploads.push(
      uploadAnalysisJson(userId, meta.analysis).then(function (result) {
        if (result && result.ok) uploadedAnalysis = true;
        return result;
      })
    );
  }

  const uploadResults = await Promise.all(uploads);
  for (let i = 0; i < uploadResults.length; i++) {
    if (uploadResults[i] && uploadResults[i].error) {
      return uploadResults[i];
    }
  }

  const scanPointer = Object.assign({}, currentScan, {
    scanUpdatedAt: now
  });

  if (typeof meta.scanComplete === "boolean") {
    scanPointer.scanComplete = meta.scanComplete;
  }
  if (meta.scores) {
    scanPointer.scores = meta.scores;
  } else if (meta.analysis && meta.analysis.scores) {
    scanPointer.scores = meta.analysis.scores;
  }
  if (uploadedFront || currentScan.hasFrontPhoto) {
    scanPointer.hasFrontPhoto = true;
  }
  if (uploadedSide || currentScan.hasSidePhoto) {
    scanPointer.hasSidePhoto = true;
  }
  if (uploadedAnalysis || currentScan.hasAnalysis) {
    scanPointer.hasAnalysis = true;
  }
  if (Object.prototype.hasOwnProperty.call(meta, "preview6mUrl")) {
    scanPointer.preview6mUrl = meta.preview6mUrl;
  }
  if (Object.prototype.hasOwnProperty.call(meta, "preview6mAt")) {
    scanPointer.preview6mAt = meta.preview6mAt;
  }
  if (meta.chatHistory) {
    scanPointer.chatHistory = meta.chatHistory;
  }
  if (meta.procedureSimulations) {
    scanPointer.procedureSimulations = meta.procedureSimulations;
  }
  if (typeof meta.rescanPending === "boolean") {
    scanPointer.rescanPending = meta.rescanPending;
  }

  // Keep full analysis out of user_metadata (size limits); Storage holds analysis.json.
  delete scanPointer.analysis;

  const appPatch = {
    scan: scanPointer
  };
  if (meta.scoreHistory) {
    appPatch.scoreHistory = meta.scoreHistory;
  }
  if (meta.journey) {
    appPatch.journey = meta.journey;
  }
  if (meta.planProgress) {
    appPatch.planProgress = meta.planProgress;
  }

  const saved = await saveUserAppState(userId, appPatch);
  if (saved.error) {
    return saved;
  }

  return {
    ok: true,
    scanUpdatedAt: now,
    state: saved.state
  };
}
