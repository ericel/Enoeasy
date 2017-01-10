import { ApiService } from './api/api.service';
import { ListingService } from './listing/listing.service';
import { AuthService } from './authentication/auth.service';
import { StoreHelper } from './store-helper';
export const SERVICE_PROVIDER = [
  ApiService,
  StoreHelper,
  AuthService,
  ListingService
];
