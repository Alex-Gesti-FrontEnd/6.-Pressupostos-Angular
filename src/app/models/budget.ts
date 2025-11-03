export interface ServiceOption {
  id: number;
  name: string;
  basePrice: number;
  enabled: boolean;
  pages: number;
  languages: number;
}

export interface Budget {
  clientName: string;
  phone: string;
  email: string;
  services: ServiceOption[];
  total: number;
  createdAt: Date;
}
