import { useCallback, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { X, Check, RotateCcw } from "lucide-react";

type Props = {
  file: File;
  aspect?: number; // default free
  onCancel: () => void;
  onCropped: (file: File) => void;
};

async function getCroppedFile(
  imageSrc: string,
  crop: Area,
  originalName: string,
  mime: string,
): Promise<File> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = imageSrc;
  });
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(crop.width);
  canvas.height = Math.round(crop.height);
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height,
  );
  const outputType = mime === "image/png" ? "image/png" : "image/jpeg";
  const blob: Blob = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b!), outputType, 0.92),
  );
  const ext = outputType === "image/png" ? "png" : "jpg";
  const base = originalName.replace(/\.[^.]+$/, "") || "image";
  return new File([blob], `${base}-cropped.${ext}`, { type: outputType });
}

const ASPECTS: { label: string; value: number | undefined }[] = [
  { label: "Free", value: undefined },
  { label: "1:1", value: 1 },
  { label: "4:3", value: 4 / 3 },
  { label: "3:2", value: 3 / 2 },
  { label: "16:9", value: 16 / 9 },
  { label: "3:4", value: 3 / 4 },
];

export function ImageCropper({ file, aspect: initialAspect, onCancel, onCropped }: Props) {
  const [src] = useState(() => URL.createObjectURL(file));
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState<number | undefined>(initialAspect);
  const [pixels, setPixels] = useState<Area | null>(null);
  const [busy, setBusy] = useState(false);

  const onCropComplete = useCallback((_a: Area, pixelsArea: Area) => {
    setPixels(pixelsArea);
  }, []);

  const handleSave = async () => {
    setBusy(true);
    try {
      if (!pixels) {
        onCropped(file);
        return;
      }
      const cropped = await getCroppedFile(src, pixels, file.name, file.type);
      onCropped(cropped);
    } finally {
      URL.revokeObjectURL(src);
      setBusy(false);
    }
  };

  const handleCancel = () => {
    URL.revokeObjectURL(src);
    onCancel();
  };

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-black/95">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-white/80 mr-2">Crop:</span>
          {ASPECTS.map((a) => (
            <button
              key={a.label}
              type="button"
              onClick={() => setAspect(a.value)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                aspect === a.value
                  ? "bg-white text-black"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {a.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setCrop({ x: 0, y: 0 });
              setZoom(1);
            }}
            className="ml-2 inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCancel}
            disabled={busy}
            className="inline-flex items-center gap-1 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" /> Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={busy}
            className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
          >
            <Check className="h-4 w-4" /> {busy ? "Saving..." : "Use image"}
          </button>
        </div>
      </div>
      <div className="relative flex-1">
        <Cropper
          image={src}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>
      <div className="flex items-center gap-3 border-t border-white/10 px-4 py-3">
        <span className="text-xs text-white/70">Zoom</span>
        <input
          type="range"
          min={1}
          max={4}
          step={0.01}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="flex-1"
        />
      </div>
    </div>
  );
}
