/**
 * Created by rockyl on 2017/1/22.
 */

export function rgbToValue(r, g, b) {
	return (r << 16) + (g << 8) + b;
}

export function valueToRgb(value) {
	return [value >> 16, (value >> 8) % 256, value % 256];
}

export function hslToValue(h, s, l) {
	return this.rgbToValue.apply(this, this.hslToRgb(h, s, l));
}

export function valueToHsl(value) {
	return this.rgbToHsl.apply(this, this.valueToRgb(value));
}

export function hue2rgb(v1, v2, vh) {
	if (vh < 0) vh += 1;
	if (vh > 1) vh -= 1;
	if (vh < 1 / 6) return v1 + (v2 - v1) * 6 * vh;
	if (vh < 1 / 2) return v2;
	if (vh < 2 / 3) return v1 + (v2 - v1) * (2 / 3 - vh) * 6;
	return v1;
}

export function hslToRgb(h, s, l) {
	let r, g, b, v1, v2;

	h = h / 240;
	s = s / 240;
	l = l / 240;

	if (s == 0) {
		r = g = b = l;
	} else {
		if (l < 0.5) {
			v2 = l * (s + 1);
		} else {
			v2 = (l + s) - (l * s);
		}
		v1 = 2 * l - v2;

		r = this.hue2rgb(v1, v2, h + 1 / 3);
		g = this.hue2rgb(v1, v2, h);
		b = this.hue2rgb(v1, v2, h - 1 / 3);
	}

	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export function rgbToHsl(r, g, b) {
	r /= 255, g /= 255, b /= 255;
	let max = Math.max(r, g, b), min = Math.min(r, g, b);
	let h, s, l = (max + min) / 2;

	if (max == min) {
		h = s = 0; // achromatic
	} else {
		let d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}

	return [h, s, l];
}
