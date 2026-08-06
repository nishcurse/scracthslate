    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    export function initializeGoogle(
        callback: (response: CredentialResponse) => void,
    ) {
        if (!clientId) {
            throw new Error(
                "NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured.",
            );
        }

        window.google.accounts.id.initialize({
            client_id: clientId,
            callback,
        });
    }

    export function promptGoogleSignIn() {
        window.google.accounts.id.prompt();
    }