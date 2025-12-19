import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-widget',
  template: `
    <a href="https://wa.me/919558030481" target="_blank" rel="noopener noreferrer" class="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg z-50 animate-whatsapp-pulse">
        <span class="sr-only">Chat on WhatsApp</span>
        <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.77.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.04 20.15c-1.48 0-2.92-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.27 8.27 0 01-1.27-4.38c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.54-3.7 8.24-8.24 8.24zm4.18-5.37c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2s-1.51-1.74-1.67-2.04c-.16-.3-.02-.46.1-.6.1-.14.24-.36.36-.5.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42s-.54-1.28-.74-1.76c-.2-.48-.4-.4-.54-.4h-.52c-.16 0-.42.06-.64.3s-.86.84-.86 2.06c0 1.22.88 2.38 1 2.54s1.42 2.18 3.43 3.04c.48.2.86.32 1.16.42.48.14.9.12 1.24-.06.38-.2.62-.52.7-.94.08-.42.08-.78.06-.86s-.08-.14-.24-.26z"/>
        </svg>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatsAppWidgetComponent {}