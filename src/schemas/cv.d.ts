// $  pnpx quicktype -s schema cv.schema.json -o cv.d.ts

// To parse this data:
//
//   import { Convert, CvD } from "./file";
//
//   const cvD = Convert.toCvD(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface CvD {
	personalInfo: PersonalInfo;
	summary: string;
	experience: Experience[];
	education: Education[];
	skills: Skills;
	awards?: Award[];
	certifications?: Certification[];
	interests?: string[];
	projects?: Project[];
	references?: References;
}

export interface Award {
	date?: Date;
	description?: string;
	issuer?: string;
	title: string;
}

export interface Certification {
	credentialUrl?: string;
	date?: Date;
	issuer: string;
	name: string;
}

export interface Education {
	degree: string;
	endDate?: Date;
	fieldOfStudy?: string;
	grade?: string;
	institution: string;
	location?: string;
	startDate?: Date;
}

export interface Experience {
	achievements?: string[];
	company: string;
	endDate?: Date | null;
	isCurrent?: boolean;
	jobTitle: string;
	location?: string;
	responsibilities?: string[];
	startDate: Date;
}

export interface PersonalInfo {
	email: string;
	firstName: string;
	github?: string;
	lastName: string;
	linkedin?: string;
	location?: string;
	phone?: string;
	photo?: Photo;
	title?: string;
	website?: string;
}

export interface Photo {
	alt?: string;
	fallback?: Fallback;
	height?: number;
	variants: Variants;
	width?: number;
}

export enum Fallback {
	Avif = "avif",
	JPEG = "jpeg",
	Webp = "webp",
}

export interface Variants {
	avif: Avif;
	jpeg: JPEG;
	webp: Webp;
}

export interface Avif {
	mimeType: AvifMIMEType;
	url: string;
}

export enum AvifMIMEType {
	ImageAvif = "image/avif",
}

export interface JPEG {
	mimeType: JPEGMIMEType;
	url: string;
}

export enum JPEGMIMEType {
	ImageJPEG = "image/jpeg",
}

export interface Webp {
	mimeType: WebpMIMEType;
	url: string;
}

export enum WebpMIMEType {
	ImageWebp = "image/webp",
}

export interface Project {
	description?: string;
	name: string;
	technologies?: string[];
	url?: string;
}

export interface References {
	availableOnRequest?: boolean;
	list?: List[];
}

export interface List {
	contact?: string;
	name: string;
	relationship?: string;
}

export interface Skills {
	languages?: string[];
	soft?: string[];
	technical?: string[];
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
	public static toCvD(json: string): CvD {
		return cast(JSON.parse(json), r("CvD"));
	}

	public static cvDToJson(value: CvD): string {
		return JSON.stringify(uncast(value, r("CvD")), null, 2);
	}
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
	const prettyTyp = prettyTypeName(typ);
	const parentText = parent ? ` on ${parent}` : '';
	const keyText = key ? ` for key "${key}"` : '';
	throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
	if (Array.isArray(typ)) {
		if (typ.length === 2 && typ[0] === undefined) {
			return `an optional ${prettyTypeName(typ[1])}`;
		} else {
			return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
		}
	} else if (typeof typ === "object" && typ.literal !== undefined) {
		return typ.literal;
	} else {
		return typeof typ;
	}
}

function jsonToJSProps(typ: any): any {
	if (typ.jsonToJS === undefined) {
		const map: any = {};
		typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
		typ.jsonToJS = map;
	}
	return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
	if (typ.jsToJSON === undefined) {
		const map: any = {};
		typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
		typ.jsToJSON = map;
	}
	return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
	function transformPrimitive(typ: string, val: any): any {
		if (typeof typ === typeof val) return val;
		return invalidValue(typ, val, key, parent);
	}

	function transformUnion(typs: any[], val: any): any {
		// val must validate against one typ in typs
		const l = typs.length;
		for (let i = 0; i < l; i++) {
			const typ = typs[i];
			try {
				return transform(val, typ, getProps);
			} catch (_) { }
		}
		return invalidValue(typs, val, key, parent);
	}

	function transformEnum(cases: string[], val: any): any {
		if (cases.indexOf(val) !== -1) return val;
		return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
	}

	function transformArray(typ: any, val: any): any {
		// val must be an array with no invalid elements
		if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
		return val.map(el => transform(el, typ, getProps));
	}

	function transformDate(val: any): any {
		if (val === null) {
			return null;
		}
		const d = new Date(val);
		if (isNaN(d.valueOf())) {
			return invalidValue(l("Date"), val, key, parent);
		}
		return d;
	}

	function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
		if (val === null || typeof val !== "object" || Array.isArray(val)) {
			return invalidValue(l(ref || "object"), val, key, parent);
		}
		const result: any = {};
		Object.getOwnPropertyNames(props).forEach(key => {
			const prop = props[key];
			const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
			result[prop.key] = transform(v, prop.typ, getProps, key, ref);
		});
		Object.getOwnPropertyNames(val).forEach(key => {
			if (!Object.prototype.hasOwnProperty.call(props, key)) {
				result[key] = transform(val[key], additional, getProps, key, ref);
			}
		});
		return result;
	}

	if (typ === "any") return val;
	if (typ === null) {
		if (val === null) return val;
		return invalidValue(typ, val, key, parent);
	}
	if (typ === false) return invalidValue(typ, val, key, parent);
	let ref: any = undefined;
	while (typeof typ === "object" && typ.ref !== undefined) {
		ref = typ.ref;
		typ = typeMap[typ.ref];
	}
	if (Array.isArray(typ)) return transformEnum(typ, val);
	if (typeof typ === "object") {
		return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
			: typ.hasOwnProperty("arrayItems") ? transformArray(typ.arrayItems, val)
				: typ.hasOwnProperty("props") ? transformObject(getProps(typ), typ.additional, val)
					: invalidValue(typ, val, key, parent);
	}
	// Numbers can be parsed by Date but shouldn't be.
	if (typ === Date && typeof val !== "number") return transformDate(val);
	return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
	return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
	return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
	return { literal: typ };
}

function a(typ: any) {
	return { arrayItems: typ };
}

function u(...typs: any[]) {
	return { unionMembers: typs };
}

function o(props: any[], additional: any) {
	return { props, additional };
}

function m(additional: any) {
	return { props: [], additional };
}

function r(name: string) {
	return { ref: name };
}

const typeMap: any = {
	"CvD": o([
		{ json: "awards", js: "awards", typ: u(undefined, a(r("Award"))) },
		{ json: "certifications", js: "certifications", typ: u(undefined, a(r("Certification"))) },
		{ json: "education", js: "education", typ: a(r("Education")) },
		{ json: "experience", js: "experience", typ: a(r("Experience")) },
		{ json: "interests", js: "interests", typ: u(undefined, a("")) },
		{ json: "personalInfo", js: "personalInfo", typ: r("PersonalInfo") },
		{ json: "projects", js: "projects", typ: u(undefined, a(r("Project"))) },
		{ json: "references", js: "references", typ: u(undefined, r("References")) },
		{ json: "skills", js: "skills", typ: r("Skills") },
		{ json: "summary", js: "summary", typ: "" },
	], false),
	"Award": o([
		{ json: "date", js: "date", typ: u(undefined, Date) },
		{ json: "description", js: "description", typ: u(undefined, "") },
		{ json: "issuer", js: "issuer", typ: u(undefined, "") },
		{ json: "title", js: "title", typ: "" },
	], false),
	"Certification": o([
		{ json: "credentialUrl", js: "credentialUrl", typ: u(undefined, "") },
		{ json: "date", js: "date", typ: u(undefined, Date) },
		{ json: "issuer", js: "issuer", typ: "" },
		{ json: "name", js: "name", typ: "" },
	], false),
	"Education": o([
		{ json: "degree", js: "degree", typ: "" },
		{ json: "endDate", js: "endDate", typ: u(undefined, Date) },
		{ json: "fieldOfStudy", js: "fieldOfStudy", typ: u(undefined, "") },
		{ json: "grade", js: "grade", typ: u(undefined, "") },
		{ json: "institution", js: "institution", typ: "" },
		{ json: "location", js: "location", typ: u(undefined, "") },
		{ json: "startDate", js: "startDate", typ: u(undefined, Date) },
	], false),
	"Experience": o([
		{ json: "achievements", js: "achievements", typ: u(undefined, a("")) },
		{ json: "company", js: "company", typ: "" },
		{ json: "endDate", js: "endDate", typ: u(undefined, u(Date, null)) },
		{ json: "isCurrent", js: "isCurrent", typ: u(undefined, true) },
		{ json: "jobTitle", js: "jobTitle", typ: "" },
		{ json: "location", js: "location", typ: u(undefined, "") },
		{ json: "responsibilities", js: "responsibilities", typ: u(undefined, a("")) },
		{ json: "startDate", js: "startDate", typ: Date },
	], false),
	"PersonalInfo": o([
		{ json: "email", js: "email", typ: "" },
		{ json: "firstName", js: "firstName", typ: "" },
		{ json: "github", js: "github", typ: u(undefined, "") },
		{ json: "lastName", js: "lastName", typ: "" },
		{ json: "linkedin", js: "linkedin", typ: u(undefined, "") },
		{ json: "location", js: "location", typ: u(undefined, "") },
		{ json: "phone", js: "phone", typ: u(undefined, "") },
		{ json: "photo", js: "photo", typ: u(undefined, r("Photo")) },
		{ json: "title", js: "title", typ: u(undefined, "") },
		{ json: "website", js: "website", typ: u(undefined, "") },
	], false),
	"Photo": o([
		{ json: "alt", js: "alt", typ: u(undefined, "") },
		{ json: "fallback", js: "fallback", typ: u(undefined, r("Fallback")) },
		{ json: "height", js: "height", typ: u(undefined, 0) },
		{ json: "variants", js: "variants", typ: r("Variants") },
		{ json: "width", js: "width", typ: u(undefined, 0) },
	], false),
	"Variants": o([
		{ json: "avif", js: "avif", typ: r("Avif") },
		{ json: "jpeg", js: "jpeg", typ: r("JPEG") },
		{ json: "webp", js: "webp", typ: r("Webp") },
	], false),
	"Avif": o([
		{ json: "mimeType", js: "mimeType", typ: r("AvifMIMEType") },
		{ json: "url", js: "url", typ: "" },
	], false),
	"JPEG": o([
		{ json: "mimeType", js: "mimeType", typ: r("JPEGMIMEType") },
		{ json: "url", js: "url", typ: "" },
	], false),
	"Webp": o([
		{ json: "mimeType", js: "mimeType", typ: r("WebpMIMEType") },
		{ json: "url", js: "url", typ: "" },
	], false),
	"Project": o([
		{ json: "description", js: "description", typ: u(undefined, "") },
		{ json: "name", js: "name", typ: "" },
		{ json: "technologies", js: "technologies", typ: u(undefined, a("")) },
		{ json: "url", js: "url", typ: u(undefined, "") },
	], false),
	"References": o([
		{ json: "availableOnRequest", js: "availableOnRequest", typ: u(undefined, true) },
		{ json: "list", js: "list", typ: u(undefined, a(r("List"))) },
	], false),
	"List": o([
		{ json: "contact", js: "contact", typ: u(undefined, "") },
		{ json: "name", js: "name", typ: "" },
		{ json: "relationship", js: "relationship", typ: u(undefined, "") },
	], false),
	"Skills": o([
		{ json: "languages", js: "languages", typ: u(undefined, a("")) },
		{ json: "soft", js: "soft", typ: u(undefined, a("")) },
		{ json: "technical", js: "technical", typ: u(undefined, a("")) },
	], false),
	"Fallback": [
		"avif",
		"jpeg",
		"webp",
	],
	"AvifMIMEType": [
		"image/avif",
	],
	"JPEGMIMEType": [
		"image/jpeg",
	],
	"WebpMIMEType": [
		"image/webp",
	],
};
