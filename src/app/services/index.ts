import { ApiService } from './api/api.service';
import { EasyapiService } from './easyapi/easyapi.service';
import { ListingService } from './listing/listing.service';
import { AuthService } from './auth/auth.service';
import { StatusService } from './status/status.service';
import { StoreHelper } from './store-helper';
import { GeolocationService } from './geolocation/geolocation';
export const SERVICE_PROVIDER = [
  ApiService,
  EasyapiService,
  StoreHelper,
  AuthService,
  ListingService,
  StatusService,
  GeolocationService
];
