/**
 * Created by rocky.l on 2017/1/22.
 */


export class ColorMatrix {

// ant for contrast calculations:
	private static DELTA_INDEX: number[] = [
		0, 0.01, 0.02, 0.04, 0.05, 0.06, 0.07, 0.08, 0.1, 0.11,
		0.12, 0.14, 0.15, 0.16, 0.17, 0.18, 0.20, 0.21, 0.22, 0.24,
		0.25, 0.27, 0.28, 0.30, 0.32, 0.34, 0.36, 0.38, 0.40, 0.42,
		0.44, 0.46, 0.48, 0.5, 0.53, 0.56, 0.59, 0.62, 0.65, 0.68,
		0.71, 0.74, 0.77, 0.80, 0.83, 0.86, 0.89, 0.92, 0.95, 0.98,
		1.0, 1.06, 1.12, 1.18, 1.24, 1.30, 1.36, 1.42, 1.48, 1.54,
		1.60, 1.66, 1.72, 1.78, 1.84, 1.90, 1.96, 2.0, 2.12, 2.25,
		2.37, 2.50, 2.62, 2.75, 2.87, 3.0, 3.2, 3.4, 3.6, 3.8,
		4.0, 4.3, 4.7, 4.9, 5.0, 5.5, 6.0, 6.5, 6.8, 7.0,
		7.3, 7.5, 7.8, 8.0, 8.4, 8.7, 9.0, 9.4, 9.6, 9.8,
		10.0
	];

	// identity matrix ant:
	private static IDENTITY_MATRIX: number[] = [
		1, 0, 0, 0, 0,
		0, 1, 0, 0, 0,
		0, 0, 1, 0, 0,
		0, 0, 0, 1, 0,
		0, 0, 0, 0, 1
	];
	private static LENGTH = ColorMatrix.IDENTITY_MATRIX.length;
	private _source: number[];

// initialization:
	constructor(p_matrix: number[] = null) {
		this._source = [];
		p_matrix = ColorMatrix.fixMatrix(p_matrix);
		this.copyMatrix(((p_matrix.length == ColorMatrix.LENGTH) ? p_matrix : ColorMatrix.IDENTITY_MATRIX));
	}


// public methods:
	public reset(): void {
		for (let i = 0; i < ColorMatrix.LENGTH; i++) {
			this._source[i] = ColorMatrix.IDENTITY_MATRIX[i];
		}
	}

	public adjustColor(p_brightness, p_contrast, p_saturation, p_hue): void {
		this.adjustHue(p_hue);
		this.adjustContrast(p_contrast);
		this.adjustBrightness(p_brightness);
		this.adjustSaturation(p_saturation);
	}

	public adjustBrightness(p_val): void {
		p_val = ColorMatrix.cleanValue(p_val, 100);
		if (p_val == 0 || isNaN(p_val)) {
			return;
		}
		this.multiplyMatrix([
			1, 0, 0, 0, p_val,
			0, 1, 0, 0, p_val,
			0, 0, 1, 0, p_val,
			0, 0, 0, 1, 0,
			0, 0, 0, 0, 1
		]);
	}

	public adjustContrast(p_val): void {
		p_val = ColorMatrix.cleanValue(p_val, 100);
		if (p_val == 0 || isNaN(p_val)) {
			return;
		}
		let x;
		if (p_val < 0) {
			x = 127 + p_val / 100 * 127
		}
		else {
			x = p_val % 1;
			if (x == 0) {
				x = ColorMatrix.DELTA_INDEX[p_val];
			}
			else {
				//x = ColorMatrix.DELTA_INDEX[(p_val<<0)]; // this is how the IDE does it.
				x = ColorMatrix.DELTA_INDEX[(p_val << 0)] * (1 - x) + ColorMatrix.DELTA_INDEX[(p_val << 0) + 1] * x; // use linear interpolation for more granularity.
			}
			x = x * 127 + 127;
		}
		this.multiplyMatrix([
			x / 127, 0, 0, 0, 0.5 * (127 - x),
			0, x / 127, 0, 0, 0.5 * (127 - x),
			0, 0, x / 127, 0, 0.5 * (127 - x),
			0, 0, 0, 1, 0,
			0, 0, 0, 0, 1
		]);

	}

	public adjustSaturation(p_val): void {
		p_val = ColorMatrix.cleanValue(p_val, 100);
		if (p_val == 0 || isNaN(p_val)) {
			return;
		}
		let x = 1 + ((p_val > 0) ? 3 * p_val / 100 : p_val / 100);
		let lumR = 0.3086;
		let lumG = 0.6094;
		let lumB = 0.0820;
		this.multiplyMatrix([
			lumR * (1 - x) + x, lumG * (1 - x), lumB * (1 - x), 0, 0,
			lumR * (1 - x), lumG * (1 - x) + x, lumB * (1 - x), 0, 0,
			lumR * (1 - x), lumG * (1 - x), lumB * (1 - x) + x, 0, 0,
			0, 0, 0, 1, 0,
			0, 0, 0, 0, 1
		]);

	}

	public adjustHue(p_val): void {
		p_val = ColorMatrix.cleanValue(p_val, 180) / 180 * Math.PI;
		if (p_val == 0 || isNaN(p_val)) {
			return;
		}
		let cosVal = Math.cos(p_val);
		let sinVal = Math.sin(p_val);
		let lumR = 0.213;
		let lumG = 0.715;
		let lumB = 0.072;
		this.multiplyMatrix([
			lumR + cosVal * (1 - lumR) + sinVal * (-lumR), lumG + cosVal * (-lumG) + sinVal * (-lumG), lumB + cosVal * (-lumB) + sinVal * (1 - lumB), 0, 0,
			lumR + cosVal * (-lumR) + sinVal * (0.143), lumG + cosVal * (1 - lumG) + sinVal * (0.140), lumB + cosVal * (-lumB) + sinVal * (-0.283), 0, 0,
			lumR + cosVal * (-lumR) + sinVal * (-(1 - lumR)), lumG + cosVal * (-lumG) + sinVal * (lumG), lumB + cosVal * (1 - lumB) + sinVal * (lumB), 0, 0,
			0, 0, 0, 1, 0,
			0, 0, 0, 0, 1
		]);

	}

	public concat(p_matrix: number[]): number[] {
		p_matrix = ColorMatrix.fixMatrix(p_matrix);
		if (p_matrix.length != ColorMatrix.LENGTH) {
			return;
		}
		this.multiplyMatrix(p_matrix);
		return this._source;
	}

	public clone(): ColorMatrix {
		return new ColorMatrix(this._source);
	}

	public toString(): string {
		return "ColorMatrix [ " + this._source.join(" , ") + " ]";
	}

	// return a length 20 array (5x4):
	public toArray(): number[] {
		return this._source.slice(0, 20);
	}

// private methods:
	// copy the specified matrix's values to this matrix:
	protected copyMatrix(p_matrix: number[]): void {
		let l = ColorMatrix.LENGTH;
		for (let i = 0; i < l; i++) {
			this._source[i] = p_matrix[i];
		}
	}

	// multiplies one matrix against another:
	protected multiplyMatrix(p_matrix: number[]): void {
		let col: number[] = [];

		for (let i = 0; i < 5; i++) {
			for (let j = 0; j < 5; j++) {
				col[j] = this._source[j + i * 5];
			}
			for (let j = 0; j < 5; j++) {
				let val = 0;
				for (let k = 0; k < 5; k++) {
					val += p_matrix[j + k * 5] * col[k];
				}
				this._source[j + i * 5] = val;
			}
		}
	}

	// make sure values are within the specified range, hue has a limit of 180, others are 100:
	protected static cleanValue(p_val, p_limit) {
		return Math.min(p_limit, Math.max(-p_limit, p_val));
	}

	// makes sure matrixes are 5x5 (25 long):
	protected static fixMatrix(p_matrix: number[] = null): number[] {
		let p_matrixp_matrix;

		if (p_matrix == null) {
			return ColorMatrix.IDENTITY_MATRIX;
		}
		if (p_matrix instanceof ColorMatrix
		) {
			p_matrixp_matrix = p_matrix.slice(0);
		}
		if (p_matrix.length < ColorMatrix.LENGTH) {
			p_matrixp_matrix = p_matrix.slice(0, p_matrix.length).concat(ColorMatrix.IDENTITY_MATRIX.slice(p_matrix.length, ColorMatrix.LENGTH));
		}
		else if (p_matrix.length > ColorMatrix.LENGTH) {
			p_matrixp_matrix = p_matrix.slice(0, ColorMatrix.LENGTH);
		}
		return p_matrix;
	}
}
