import Color from 'color';

export interface RenderOptions {
	width: number;
	height: number;
	offset: number;
	background: boolean;
	backgroundColor: string;
	backgroundOpacity: number;
	border: boolean;
	borderWidth: number;
	borderColor: string;
	borderOpacity: number;
}

function toTransparentColor(color: string, opacity: number): string {
	return Color(color)
		.alpha(opacity / 100)
		.string();
}

export default function paintOffset(canvas: HTMLCanvasElement, options: RenderOptions) {
	const context = canvas.getContext('2d');

	function render({
		width,
		height,
		offset,
		background,
		backgroundColor,
		backgroundOpacity,
		border,
		borderWidth,
		borderColor,
		borderOpacity,
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
	}

	render(options);

	return {
		update: render,
	};
}
