class AutoLogoutService {
    constructor() {
        this.logoutTimer = null;
        this.warningTimer = null;
        this.warningThreshold = 5 * 60 * 1000; // 5 minutes warning
        this.isWarningShown = false;
    }

    startAutoLogout(token, onWarning, onLogout) {
        this.clearTimers();
        this.isWarningShown = false;
        
        // 🧪 TESTING MODE: Use 2 minutes total instead of 24 hours
        const testExpiration = Date.now() + (1 * 60 * 1000); // 2 minutes total
        
        // 🚨 COMMENT OUT THE REAL ONE FOR TESTING:
        // const expiration = this.getTokenExpiration(token);
        // const timeUntilExpiry = expiration - Date.now();
        
        const timeUntilExpiry = testExpiration - Date.now();
        
        console.log(`🧪 TEST: Token expires in: ${Math.round(timeUntilExpiry / 1000)} seconds`);
        
        // Set main logout timer
        if (timeUntilExpiry > 0) {
            this.logoutTimer = setTimeout(() => {
                console.log('🧪 TEST: Auto logout triggered!');
                onLogout();
            }, timeUntilExpiry);
            
            // Set warning timer (30 seconds before expiry for testing)
            const warningTime = timeUntilExpiry - (30 * 1000); // 30 second warning
            if (warningTime > 0) {
                this.warningTimer = setTimeout(() => {
                    console.log('🧪 TEST: Showing expiration warning');
                    this.isWarningShown = true;
                    onWarning(0.5); // 0.5 minutes warning
                }, warningTime);
            }
        } else {
            onLogout();
        }
    }

    getTokenExpiration(token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000;
        } catch (error) {
            console.error('Error parsing token:', error);
            return Date.now() + 24 * 60 * 60 * 1000;
        }
    }

    clearTimers() {
        if (this.logoutTimer) {
            clearTimeout(this.logoutTimer);
            this.logoutTimer = null;
        }
        if (this.warningTimer) {
            clearTimeout(this.warningTimer);
            this.warningTimer = null;
        }
        this.isWarningShown = false;
    }

    resetTimers(token, onWarning, onLogout) {
        console.log('🔄 Resetting auto logout timers');
        this.clearTimers();
        this.startAutoLogout(token, onWarning, onLogout);
    }
}

export default new AutoLogoutService();