import Color from 'color';

export interface RenderOptions {
	width: number;
	height: number;
	offset: number;
	offsetBackground: boolean;
	offsetBackgroundColor: string;
	offsetBackgroundOpacity: number;
	border: boolean;
	borderWidth: number;
	borderColor: string;
	borderOpacity: number;
	safeZone: boolean;
	safeZoneColor: string;
	safeZoneOpacity: number;
	safeZoneWidth: number;
}

function toTransparentColor(color: string, opacity: number): string {
	return Color(color)
		.alpha(opacity / 100)
		.string();
}

export default function paintOffset(img: HTMLImageElement, options: RenderOptions) {
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');

	function render({
		width,
		height,
		offset,
		offsetBackground: background,
		offsetBackgroundColor: backgroundColor,
		offsetBackgroundOpacity: backgroundOpacity,
		border,
		borderWidth,
		borderColor,
		borderOpacity,
		safeZone,
		safeZoneColor,
		safeZoneOpacity,
		safeZoneWidth,
	}: RenderOptions) {
		if (!context) return;
		const canvasWidth = width + offset * 2;
		const canvasHeight = height + offset * 2;

		canvas.width = canvasWidth;
		canvas.height = canvasHeight;

		context.clearRect(0, 0, canvas.width, canvas.height);

		if (background) {
			context.fillStyle = toTransparentColor(backgroundColor, backgroundOpacity);
			context.fillRect(0, 0, canvasWidth, canvasHeight);
			context.clearRect(offset, offset, width, height);
		}

		if (safeZone) {
			context.fillStyle = toTransparentColor(safeZoneColor, safeZoneOpacity);
			context.fillRect(offset, offset, width, height);
			context.clearRect(
				offset + safeZoneWidth,
				offset + safeZoneWidth,
				width - safeZoneWidth * 2,
				height - safeZoneWidth * 2,
			);
		}

		if (border) {
			const x = Math.floor(offset - borderWidth / 2);
			const y = Math.floor(offset - borderWidth / 2);
			const w = Math.ceil(offset + width + borderWidth / 2);
			const h = Math.ceil(offset + height + borderWidth / 2);
			context.beginPath();
			context.lineWidth = borderWidth;
			context.strokeStyle = toTransparentColor(borderColor, borderOpacity);
			context.moveTo(x, y);
			context.lineTo(w, y);
			context.lineTo(w, h);
			context.lineTo(x, h);
			context.closePath();
			context.stroke();
			context.fillStyle = 'red';
		}

		const src = canvas.toDataURL('image/png');

		img.width = canvasWidth;
		img.height = canvasHeight;
		img.src = src;
	}

	render(options);

	return {
		update: render,
	};
}
