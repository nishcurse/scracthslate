export {};

declare global {
    interface Window {
        google: {
            accounts: {
                id: {
                    initialize(config: {
                        client_id: string;
                        callback: (response: CredentialResponse) => void;
                    }): void;

                    prompt(): void;

                    disableAutoSelect(): void;
                };
            };
        };
    }

    interface CredentialResponse {
        credential: string;
        select_by: string;
    }
}