/// <reference path="../.astro/types.d.ts" />

// EmailJS types
interface Window {
	emailjs: {
		init: (publicKey: string) => void;
		send: (serviceId: string, templateId: string, templateParams: Record<string, string>) => Promise<{ status: number; text: string }>;
	};
}

// Environment variables
interface ImportMetaEnv {
	readonly PUBLIC_EMAILJS_PUBLIC_KEY: string;
	readonly PUBLIC_EMAILJS_SERVICE_ID: string;
	readonly PUBLIC_EMAILJS_TEMPLATE_ID: string;
	readonly PUBLIC_EMAILJS_RECIPIENT_EMAIL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}