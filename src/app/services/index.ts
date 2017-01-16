import { ApiService } from './api/api.service';
import { EasyapiService } from './easyapi/easyapi.service';
import { ListingService } from './listing/listing.service';
import { AuthService } from './auth/auth.service';
import { StoreHelper } from './store-helper';
export const SERVICE_PROVIDER = [
  ApiService,
  EasyapiService,
  StoreHelper,
  AuthService,
  ListingService
];
