/**
 * Created by admin on 2017/3/17.
 */
import {valueToRgb} from "./ColorUtils";

let vertex = `
		attribute vec2 aVertexPosition;
		attribute vec2 aTextureCoord;
		attribute vec2 aColor;
		uniform vec2 projectionVector;
		varying vec2 vTextureCoord;
		varying vec4 vColor;
		const vec2 center = vec2(-1.0, 1.0);
		
		void main(void) {
			gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);
			vTextureCoord = aTextureCoord;
			vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);
		}`;

let fragment = `
		precision lowp float;
		varying vec2 vTextureCoord;
		varying vec4 vColor;
		uniform sampler2D uSampler;
		uniform vec4 uReplace;
		uniform float threshold;
		
		void main(void) {
			vec4 fg = texture2D(uSampler, vTextureCoord);
			if(fg.a >= threshold){
				fg = uReplace * fg.a;
			}
			gl_FragColor = fg * vColor;
		}`;

export class ColorFilter extends egret.CustomFilter {
	private _color = -1;
	private _threshold = 1;
	private _rgb: any = {};

	constructor(color = NaN, threshold = 1) {
		super(vertex, fragment, {uReplace: {}, threshold: threshold});

		this.color = color;
		this.threshold = threshold;
	}

	get color() {
		return this._color
	}

	set color(value) {
		if (value && this._color != value) {
			this._color = value;

			let rgb = valueToRgb(this._color).map(v => v / 255);

			this._rgb.x = rgb[0];
			this._rgb.y = rgb[1];
			this._rgb.z = rgb[2];
			this._rgb.w = 1;

			this.uniforms.uReplace = this._rgb;
		}
	}

	get threshold() {
		return this._threshold
	}

	set threshold(value) {
		if (this._threshold != value) {
			this._threshold = value;

			this.uniforms.threshold = this._threshold;
		}
	}
}