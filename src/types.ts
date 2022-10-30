/**
 * Interface defining the component's options object
 */
export interface BytesnbinaryCoreComponentOptions {
  // Add the definitions here
}

/**
 * Default options for the component
 */
export const DEFAULT_BYTESNBINARY_CORE_OPTIONS: BytesnbinaryCoreComponentOptions =
  {
    // Specify the values here
  };
export const enum AuthErrorKeys {
  CodeExpired = 'Code Expired',
  TokenExpired = 'Token Expired',
  TokenInvalid = 'Token Invalid',
  ClientInvalid = 'Client Invalid',
  ClientVerificationFailed = 'Client Verification Failed',
  ClientSecretMissing = 'Client Secret Missing',
  ClientUserMissing = 'Client User Missing',
  InvalidCredentials = 'Invalid Credentials',
  UserVerificationFailed = 'User Verification Failed',
  UnknownError = 'Unknown Error',
  WrongPassword = 'Incorrect Password',
  KeyInvalid = 'Key Invalid',
  OtpInvalid = 'Otp Invalid',
  OtpExpired = 'Otp Token Incorrect or Expired',
}
export const enum ErrorKeys {
  EntityNotFound = 'EntityNotFound',
}
