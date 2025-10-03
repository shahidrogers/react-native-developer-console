import { SetupNetworkLoggingOptions } from '../types';
export declare function setupNetworkLogging(options?: SetupNetworkLoggingOptions): () => void;
export declare function autoSetupNetworkLogging(config?: SetupNetworkLoggingOptions['config']): () => void;
