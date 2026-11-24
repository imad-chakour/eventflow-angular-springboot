/**
 * Configuration centralisée de l'API
 * Toutes les requêtes passent par le Spring Cloud Gateway
 */
import { environment } from '../../../environments/environment';

export const API_CONFIG = {
  // URL du Spring Cloud Gateway (point d'entrée unique)
  gatewayUrl: environment.apiUrl,
  
  // Endpoints des microservices via le gateway
  endpoints: {
    users: '/api/users',
    campaigns: '/api/campaigns',
    events: '/api/events',
    analytics: '/api/analytics',
    notifications: '/api/notifications'
  }
};

/**
 * Helper pour construire les URLs complètes
 */
export function getApiUrl(endpoint: string): string {
  return `${API_CONFIG.gatewayUrl}${endpoint}`;
}
