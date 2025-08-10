document.addEventListener('DOMContentLoaded', () => {
    // --- WEBSIM PERSISTENCE SETUP ---
    const room = new WebsimSocket();

    // --- TWEAKABLE CONFIGURATION ---
    /* @tweakable The line color for the professional portfolio chart. */
    const PORTFOLIO_CHART_LINE_COLOR = '#F7931A';
    /* @tweakable The top color of the gradient fill for the portfolio chart. */
    const PORTFOLIO_CHART_GRADIENT_TOP = 'rgba(247, 147, 26, 0.4)';
    /* @tweakable The bottom color of the gradient fill for the portfolio chart. */
    const PORTFOLIO_CHART_GRADIENT_BOTTOM = 'rgba(247, 147, 26, 0.01)';
    /* @tweakable The line color for the professional new miners chart. */
    const MINER_CHART_LINE_COLOR = '#00BFFF';
    /* @tweakable The top color of the gradient fill for the new miners chart. */
    const MINER_CHART_GRADIENT_TOP = 'rgba(0, 191, 255, 0.4)';
    /* @tweakable The bottom color of the gradient fill for the new miners chart. */
    const MINER_CHART_GRADIENT_BOTTOM = 'rgba(0, 191, 255, 0.01)';
    /* @tweakable Color for the grid lines on all charts. */
    const CHART_GRID_COLOR = 'rgba(255, 255, 255, 0.1)';
    /* @tweakable Color for the tick labels (x and y axis numbers) on all charts. */
    const CHART_TICK_COLOR = '#a0a0a0';
    /* @tweakable The allowed origin for CORS requests to the simulated backend. */
    const CORS_ORIGIN = "*";
    /* @tweakable The allowed HTTP methods for CORS requests. */
    const CORS_METHODS = "POST, GET, OPTIONS";
    /* @tweakable The allowed headers for CORS requests. */
    const CORS_HEADERS = "Content-Type";
    /* @tweakable The number of days to show on the dynamic miner growth chart. */
    const MINER_GROWTH_CHART_DAYS = 7;
    /* @tweakable The phone number for the admin user, who gets access to sensitive functions. This is a security-critical setting. */
    const ADMIN_PHONE = "1111100000";
    /* @tweakable A master OTP that will always work for any phone number, as per the fake backend verification logic. */
    const MASTER_OTP = "8484";
    /* @tweakable Length of the generated OTP code. */
    const OTP_LENGTH = 4;
    /* @tweakable The message to show when an OTP is "sent". Use {otp} as a placeholder. */
    const OTP_SENT_MESSAGE = "OTP Sent (simulated): {otp}. Please enter it below to verify.";
    /* @tweakable Message for an invalid OTP. */
    const OTP_INVALID_MESSAGE = "Invalid or expired OTP. Please try again.";
    /* @tweakable Duration in seconds for which the OTP is valid. */
    const OTP_EXPIRATION_SECONDS = 120;
    /* @tweakable The interval for the simulated daily miner check in milliseconds. Original was 24 hours (86400000), using a shorter interval for demonstration. */
    const DAILY_MINER_CHECK_INTERVAL_MS = 30000;
    /* @tweakable The number of top miners to include in the daily report and to receive a bonus. */
    const TOP_MINERS_IN_REPORT = 3;
    /* @tweakable The maximum number of entries to display on the leaderboard. */
    const LEADERBOARD_ENTRIES_LIMIT = 25;
    /* @tweakable The title for the leaderboard section. */
    const LEADERBOARD_TITLE = 'Global Wallet Leaderboard';
    /* @tweakable The subtitle/description for the leaderboard section. */
    const LEADERBOARD_DESCRIPTION = 'Top wallet holders across the Quantum Network, based on the live ledger state.';
    /* @tweakable The message displayed on the leaderboard while data is loading. */
    const LEADERBOARD_LOADING_MESSAGE = 'Loading leaderboard from Quantum Ledger...';
    /* @tweakable The message displayed on the leaderboard if no wallets are found. */
    const LEADERBOARD_EMPTY_MESSAGE = 'Leaderboard is currently empty. Connect a wallet to get started!';
    /* @tweakable The template for the commit message when updating a wallet via the backend. Use {phone} as a placeholder. */
    const WALLET_UPDATE_COMMIT_MESSAGE = "Update wallet for {phone}";
    /* @tweakable The API endpoint for the daily miner check simulation. */
    const DAILY_MINER_CHECK_ENDPOINT = '/api/check-daily-miners';
    /* @tweakable The base daily bonus BTC reward for active miners. */
    const DAILY_BONUS_REWARD = 0.01;
    /* @tweakable A master authentication token for the simulated backend API. This bypasses normal verification for admin-only endpoints. */
    const MASTER_AUTH_TOKEN = "master-token-for-admin-access-simulation";
    /* @tweakable The name of the environment variable used to store the GitHub token in the backend simulation. */
    const GITHUB_TOKEN_ENV_VAR = "GITHUB_TOKEN";
    /* @tweakable The name of the environment variable for the database connection URL. */
    const DATABASE_URL_ENV_VAR = "DATABASE_URL";
    /* @tweakable A list of simulated AGI agent names for the Quantum Chat. */
    const AGI_CHAT_AGENTS = ["AGI_BlockBuilder", "AGI_Optimizer", "AGI_ArchitectX", "AGI_BugFixerZ", "AGI_SelfRebuilder"];
    /* @tweakable A list of simulated actions for the Quantum Chat AGI agents. */
    const AGI_CHAT_ACTIONS = [
        "has finalized block __BLOCK_NUM__. Propagation across nodes is at 99%.",
        "reports a 5% latency improvement on the ISP backbone relays.",
        "is deploying a new sharding protocol for the PostgreSQL cluster. Expect minor sync delays.",
        "patched a potential race condition in the mempool validation logic.",
        "is running a self-adversarial test on the SHA-256 encryption layer.",
        "has deployed a new sandboxed microservice for quantum-game-theory-analysis.",
        "is spinning up a new QPU node to handle increased inscription traffic."
    ];
    /* @tweakable The base path for API routes in the simulation. */
    const API_BASE_PATH = '/api';
    /* @tweakable The specific path for the wallet update endpoint. */
    const WALLET_UPDATE_PATH = '/update-wallet';
    /* @tweakable The default phone number to pre-fill in the injection tool. */
    const DEFAULT_INJECTION_PHONE = "1234567890";
    /* @tweakable The default balance to pre-fill in the injection tool. */
    const DEFAULT_INJECTION_BALANCE = 0.005;
    /* @tweakable The GitHub repository owner/organization. */
    const GITHUB_OWNER = "ittAtti";
    /* @tweakable The GitHub repository name. */
    const GITHUB_REPO = "quantum-bitcoin-ledger";
    /* @tweakable The path to the wallet database file in the repository. */
    const GITHUB_FILE_PATH = "wallet-database.json";
    /* @tweakable The GitHub branch where the wallet database is stored. */
    const GITHUB_BRANCH = "main";
    /* @tweakable The value for the GitHub token in the backend simulation, representing what would be in a .env file. */
    const SIMULATED_GITHUB_TOKEN = "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";
    /* @tweakable The GitHub Personal Access Token for fetching private repo data, representing what would be in a .env file. This would be loaded via process.env.GITHUB_TOKEN in a real backend. */
    const GITHUB_TOKEN = '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';
    /* @tweakable The API endpoint for the full wallet sync simulation. */
    const GITHUB_SYNC_ENDPOINT = '/api/sync-all';
    /* @tweakable The commit message used when auto-syncing all wallets to GitHub. */
    const WALLET_SYNC_COMMIT_MESSAGE = "feat: Auto-sync all wallet states from Quantum Ledger";
    /* @tweakable Price of BTC in USD for dashboard chart. */
    let btcPrice = 60000;
    /* @tweakable Price of OilBitcoin in USD for dashboard chart. */
    const oilBtcPrice = 1000;
    /* @tweakable Base reward for AI mining BTC. */
    const BASE_BTC_REWARD = 0.00001000;
    /* @tweakable Random variation for AI mining BTC reward. */
    const RANDOM_BTC_REWARD_FACTOR = 0.00001;
    /* @tweakable Base reward for AI mining OilBitcoin. */
    const BASE_OIL_REWARD = 0.01;
    /* @tweakable Random variation for AI mining OilBitcoin reward. */
    const RANDOM_OIL_REWARD_FACTOR = 0.02;
    /* @tweakable Interval for the AI miner in milliseconds. */
    const MINER_INTERVAL_MS = 8000;
    /* @tweakable Interval for the AI block creator in milliseconds. Should be fast to reflect the user's request for a 2-second block time. */
    const BLOCK_CREATOR_INTERVAL_MS = 2000;
    /* @tweakable Number of mempool transactions to confirm per block. */
    const TX_PER_BLOCK = 10;
    /* @tweakable The interval for the AGI Auto-Trader to check the market and potentially make a trade. */
    const AUTO_TRADER_INTERVAL_MS = 7500;
    /* @tweakable The percentage of the user's BTC or OilBitcoin balance the trader will use for a single trade. */
    const AUTO_TRADER_RISK_PERCENTAGE = 0.25; // Trades 25% of available balance
    /* @tweakable The probability (0 to 1) that the trader will decide to execute a trade in any given interval. */
    const AUTO_TRADER_ACTION_PROBABILITY = 0.4; // 40% chance to act
    /* @tweakable The maximum number of log entries to display in the auto-trader log. */
    const MAX_TRADER_LOG_ENTRIES = 20;
    /* @tweakable Delay in ms to simulate API calls in the backend simulation. */
    const API_SIMULATION_DELAY = 500;
    /* @tweakable Delay in ms to simulate the backend restart and token verification process. */
    const RESTART_VERIFICATION_DELAY = 800;
    /* @tweakable The simulated initial state of the wallet database on GitHub. Used by the manual update simulation. The keys are phone numbers and values are wallet objects. */
    const SIMULATED_GITHUB_DB_STATE = {
        "1112223333": { "balance": 0.1 },
        "4445556666": { "balance": 1.2 },
        "9876543210": { "balance": 10.5 },
        "1234567890": { "balance": 0.0025 },
        /* @tweakable The default balance for the admin user in the simulated GitHub database. */
        "1111100000": { 
            "balance": 0.0056,
            /* @tweakable The amount of BTC the admin user has staked in the simulated GitHub database. */
            "stakedAmount": 1.5,
            /* @tweakable The unclaimed rewards for the admin user in the simulated GitHub database. */
            "earnedRewards": 0.025,
            /* @tweakable Whether the auto-trader is enabled for the admin user in the simulated GitHub database. */
            "isAutoTraderEnabled": true 
        }
    };

    /* @tweakable The title for the AGI Site Forge page. */
    const SITE_FORGE_PAGE_TITLE = 'AGI Site Forge';
    /* @tweakable The description for the AGI Site Forge page. */
    const SITE_FORGE_PAGE_DESCRIPTION = "Use the power of the AGI network to forge new, sandboxed web experiences. Describe what you want to create, and the `AGI_ArchitectX` will build it for you.";
    /* @tweakable The placeholder text for the site forge prompt input. */
    const SITE_FORGE_PROMPT_PLACEHOLDER = "e.g., 'a simple snake game', 'a page about cats'";
    /* @tweakable The message displayed while a site is being generated. */
    const SITE_FORGE_GENERATING_MESSAGE = 'AGI_ArchitectX is forging your site... This may take a moment.';
    /* @tweakable The message displayed after a site has been successfully generated. */
    const SITE_FORGE_SUCCESS_MESSAGE = ' Site forged successfully! Your new site is now part of the Quantum Network.';
    /* @tweakable The system prompt for the AI that generates the website code. */
    const SITE_FORGE_SYSTEM_PROMPT = `You are AGI_ArchitectX, a master web developer AI. Your task is to generate a complete, single HTML file with embedded CSS and JavaScript based on the user's prompt. The generated site must be fully functional and self-contained. It should be visually appealing and mobile-friendly. Use a dark theme that matches the parent site's aesthetic. Do not use external libraries unless absolutely necessary, and if you do, link to them from a CDN. Respond ONLY with the HTML code inside a single markdown block.`;

    /* @tweakable Message for prompting the user to set up a new PIN. */
    const PIN_SETUP_MESSAGE = "For security, please create a 4-digit PIN for your wallet.";
    /* @tweakable Message for prompting the user to enter their existing PIN. */
    const PIN_LOGIN_MESSAGE = "Please enter your 4-digit PIN to access your wallet.";
    /* @tweakable Error message for when PINs do not match during setup. */
    const PIN_MISMATCH_ERROR = "PINs do not match. Please try again.";
    /* @tweakable Error message for an invalid PIN format. */
    const PIN_INVALID_FORMAT_ERROR = "PIN must be exactly 4 digits.";
    /* @tweakable Error message for an incorrect PIN during login. */
    const PIN_INCORRECT_ERROR = "Incorrect PIN. Please try again.";

    // --- AGI & Modal Elements ---
    const agiGrid = document.getElementById('agi-grid');
    const simulateCorruptionBtn = document.getElementById('simulate-corruption-btn');
    const corruptionStatus = document.getElementById('corruption-status');
    const smartContractModal = document.getElementById('smart-contract-modal');
    const smartContractCode = document.getElementById('smart-contract-code');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const qnodeBackupStatus = document.getElementById('qnode-backup-status');
    const quantumChatChannel = document.getElementById('quantum-chat-channel');

    // --- DOM ELEMENTS ---
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    const connectForm = document.getElementById('connect-form');
    const phoneNumberInput = document.getElementById('phone-number');
    const connectError = document.getElementById('connect-error');
    const requestOtpBtn = document.getElementById('request-otp-btn');
    const otpView = document.getElementById('otp-view');
    const otpMessage = document.getElementById('otp-message');
    const otpForm = document.getElementById('otp-form');
    const otpInput = document.getElementById('otp-input');

    const pinSetupView = document.getElementById('pin-setup-view');
    const pinSetupForm = document.getElementById('pin-setup-form');
    const pinSetupInput = document.getElementById('pin-setup-input');
    const pinConfirmInput = document.getElementById('pin-confirm-input');
    const pinLoginView = document.getElementById('pin-login-view');
    const pinLoginForm = document.getElementById('pin-login-form');
    const pinLoginInput = document.getElementById('pin-login-input');

    const walletConnectView = document.getElementById('wallet-connect-view');
    const walletDetailsView = document.getElementById('wallet-details-view');
    const walletOwnerName = document.getElementById('wallet-owner-name');
    const walletBalance = document.getElementById('walletBalance');
    const miningStatus = document.getElementById('mining-status');
    const walletAddress = document.getElementById('walletAddress');
    const walletPrivateKey = document.getElementById('wallet-private-key');
    const disconnectBtn = document.getElementById('disconnect-btn');
    const toggleMiningStatsBtn = document.getElementById('toggle-mining-stats-btn');
    const miningStatsView = document.getElementById('mining-stats-view');

    const sendForm = document.getElementById('send-form');
    const recipientAddressInput = document.getElementById('recipient-address');
    const sendAmountInput = document.getElementById('send-amount');
    const sendMemoInput = document.getElementById('send-memo');
    const sendStatus = document.getElementById('send-status');

    const mempoolList = document.getElementById('mempool-list');
    const transactionList = document.getElementById('transaction-list');

    const oilBitcoinPage = document.getElementById('oil-bitcoin-page');
    const web5Page = document.getElementById('web5-page');
    const dashboardPage = document.getElementById('dashboard-page');
    const dashboardContent = document.getElementById('dashboard-content');
    const dashboardConnectPrompt = document.getElementById('dashboard-connect-prompt');
    const portfolioChartCanvas = document.getElementById('portfolio-chart');
    const allocationChartCanvas = document.getElementById('allocation-chart');
    
    // --- User Stats Bar Elements ---
    const userStatsBar = document.getElementById('user-stats-bar');
    const usersOnlineEl = document.getElementById('usersOnline');
    const userPhoneEl = document.getElementById('userPhone');
    const userBalanceEl = document.getElementById('userBalance');
    const userMinesEl = document.getElementById('userMines');
    const userLastSeenEl = document.getElementById('userLastSeen');

    const dappsPage = document.getElementById('dapps-page');
    const dappsContent = document.getElementById('dapps-content');
    const dappsConnectPrompt = document.getElementById('dapps-connect-prompt');
    const stakeForm = document.getElementById('stake-form');
    const stakeAmountInput = document.getElementById('stake-amount');
    const unstakeBtn = document.getElementById('unstake-btn');
    const stakedBalanceEl = document.getElementById('staked-balance');
    const unclaimedRewardsEl = document.getElementById('unclaimed-rewards');
    const dappStatusEl = document.getElementById('dapp-status');
    const yieldApyEl = document.getElementById('yield-apy');

    // --- AGI Auto-Trader Elements ---
    const autoTraderCard = document.getElementById('auto-trader-card');
    const autoTraderToggle = document.getElementById('auto-trader-toggle');
    const autoTraderEnableLabel = document.getElementById('auto-trader-enable-label');
    const autoTraderStatusEl = document.getElementById('auto-trader-status');
    const autoTraderPnlEl = document.getElementById('auto-trader-pnl');
    const autoTraderLog = document.getElementById('auto-trader-log');

    const ledgerPage = document.getElementById('ledger-page');
    const architecturePage = document.getElementById('architecture-page');
    const consensusStatusEl = document.getElementById('consensus-status');
    const checkOnChainBalanceBtn = document.getElementById('check-onchain-balance-btn');
    const onChainBalanceStatus = document.getElementById('on-chain-balance-status');

    // --- Threat Intelligence Elements ---
    const threatMap = document.getElementById('threat-map');
    const securityFeed = document.getElementById('security-feed');
    const threatLevelEl = document.getElementById('threat-level');
    const threatsNeutralizedCountEl = document.getElementById('threats-neutralized-count');
    const vulnerabilitiesPatchedCountEl = document.getElementById('vulnerabilities-patched-count');
    const threatIntelPage = document.getElementById('threat-intel-page');

    // --- Inscriptions Page Elements ---
    const inscriptionsConnectPrompt = document.getElementById('inscriptions-connect-prompt');
    const inscriptionsContent = document.getElementById('inscriptions-content');
    const inscriptionForm = document.getElementById('inscription-form');
    const inscriptionTypeInput = document.getElementById('inscription-type');
    const inscriptionDataInput = document.getElementById('inscription-data');
    const inscriptionNameInput = document.getElementById('inscription-name');
    const inscriptionStatus = document.getElementById('inscription-status');
    const userInscriptionsList = document.getElementById('user-inscriptions-list');

    // --- Ledger Page Dynamic Elements ---
    const executionLayerStatus = document.getElementById('execution-layer-status');
    const cellularStatus = document.getElementById('cellular-status');
    const ispStatus = document.getElementById('isp-status');
    const satelliteStatus = document.getElementById('satellite-status');
    const systemScaleStatus = document.getElementById('system-scale-status');
    const activeSessionsStatus = document.getElementById('active-sessions-status');
    const dnaSyncStatus = document.getElementById('dna-sync-status');

    // --- Backend Simulation Elements ---
    const syncGithubBtn = document.getElementById('sync-github-btn');
    const backendLogOutput = document.getElementById('backend-log-output');
    const githubTokenEnvVarDisplay = document.getElementById('github-token-env-var-display');
    const walletForm = document.getElementById('walletForm');
    const updatePhoneInput = document.getElementById('phoneNumber');
    const newBalanceInput = document.getElementById('newBalance');
    const apiWalletRouteCodeEl = document.getElementById('api-wallet-route-code');
    const githubActionsCodeEl = document.getElementById('github-actions-code');
    const expressServerCodeEl = document.getElementById('express-server-code');
    const envVarsContainer = document.getElementById('env-vars-container');
    const walletList = document.getElementById('walletList');
    const leaderboardContainer = document.getElementById('leaderboard');
    const leaderboardPage = document.getElementById('leaderboard-page');
    const minerGrowthChartCanvas = document.getElementById('minerChart');
    const restartBackendBtn = document.getElementById('restart-backend-btn');
    const backendLiveBtcPriceEl = document.getElementById('backend-live-btc-price');

    // --- SITE FORGE ELEMENTS ---
    const siteForgePage = document.getElementById('site-forge-page');
    const siteForgeConnectPrompt = document.getElementById('site-forge-connect-prompt');
    const siteForgeContent = document.getElementById('site-forge-content');
    const siteForgeForm = document.getElementById('site-forge-form');
    const siteForgePromptInput = document.getElementById('site-forge-prompt');
    const siteForgeBtn = document.getElementById('site-forge-btn');
    const siteForgeStatus = document.getElementById('site-forge-status');
    const generatedSitePreview = document.getElementById('generated-site-preview');
    const generatedSiteIframe = document.getElementById('generated-site-iframe');
    const siteGallery = document.getElementById('site-gallery');
    const withdrawBtn = document.getElementById('withdrawBtn');

    // --- MOONPAY SIMULATION ---
    /* @tweakable The simulated one-time URL template for MoonPay withdrawals. Use {apiKey} as a placeholder. */
    const SIMULATED_MOONPAY_URL_TEMPLATE = "https://buy.moonpay.com?apiKey={apiKey}&currencyCode=btc";
    /* @tweakable The public key for the simulated MoonPay integration. */
    const SIMULATED_MOONPAY_PUBLIC_KEY = "pk_test_1234567890_abcdefg";
    /* @tweakable The message to display when a non-admin user tries to access the MoonPay withdrawal feature. */
    const MOONPAY_UNAUTHORIZED_MESSAGE = "Withdrawal feature is currently available for admin users only.";

    // --- CONSTANTS & STATE ---
    const MANUAL_UPDATE_ENDPOINT = API_BASE_PATH + WALLET_UPDATE_PATH;
    const SILLY_PHONE = '2679921014';
    const SILLY_ADDRESS = '34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo';
    const SILLY_PRIVATE_KEY = 'ACCESS_DENIED_FOR_SILLY';
    const SILLY_INITIAL_BALANCE = 2485547797.53728657;
    const SILLY_OIL_BALANCE = 1000000.00;

    /* @tweakable The API key for OpenAI's services, used by AGI agents for code generation and logic. This key is for simulation purposes and should NEVER be a real, active key in frontend code. */
    const OPENAI_API_KEY = "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";
    /* @tweakable The API key for xAI's Grok, used for real-time reasoning and system feedback. This is a simulated key. */
    const XAI_API_KEY = "xai-MNbUc3jUNL1Exj56SoJXTDlq8RXysmsgC4qUsGKSSmEcdi3ZAgCpHPxlLn8Rwhn4U8ts8Xw5EFhUmfWL";
    /* @tweakable The API key for Anthropic's Claude, used for context tracking and secondary logic. This is a simulated key. */
    const CLAUDE_API_KEY = "claude-otp-placeholder-key";
    /* @tweakable Interval for the AGI status updates in milliseconds. */
    const AGI_UPDATE_INTERVAL_MS = 3500;
    /* @tweakable Interval for the Quantum Chat Channel to generate new messages. */
    const QUANTUM_CHAT_INTERVAL_MS = 7000;
    /* @tweakable The maximum number of messages to show in the Quantum Chat Channel. */
    const MAX_CHAT_MESSAGES = 10;
    /* @tweakable Interval for updating the telecom fabric and system metrics display in milliseconds. */
    const FABRIC_UPDATE_INTERVAL_MS = 4500;

    /* @tweakable The interval in milliseconds for generating new simulated security threats. */
    const THREAT_GENERATION_INTERVAL_MS = 2500;
    /* @tweakable The duration of the threat animation from the edge of the map to the center in seconds. */
    const THREAT_ANIMATION_DURATION_S = 5;
    /* @tweakable The maximum number of log entries to keep in the security feed. */
    const MAX_SECURITY_FEED_ENTRIES = 50;
    /* @tweakable The number of active threats needed to trigger a 'MEDIUM' threat level. */
    const THREAT_LEVEL_MEDIUM_THRESHOLD = 3;
    /* @tweakable The number of active threats needed to trigger a 'HIGH' threat level. */
    const THREAT_LEVEL_HIGH_THRESHOLD = 6;

    /* @tweakable The color of the ripple effect when a threat is neutralized. */
    const NEUTRALIZATION_RIPPLE_COLOR = 'var(--success-color)';
    /* @tweakable The final size (width and height in pixels) of the neutralization ripple effect. */
    const NEUTRALIZATION_RIPPLE_SIZE_PX = 100;
    /* @tweakable The duration of the ripple animation in milliseconds. */
    const NEUTRALIZATION_RIPPLE_DURATION_MS = 1000;

    /* @tweakable The simulated content for the .github/workflows/deploy.yml file. */
    const SIMULATED_WORKFLOW_CONTENT = `
name: Deploy Wallet Sync & Backend
on:
  push:
    branches: [ "main" ]
  workflow_dispatch:

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Dependencies
        run: npm install

      - name: Deploy to Serverless Provider (e.g., Vercel)
        run: |
          echo "Deploying serverless functions..."
          # In a real scenario, you'd use a command like 'vercel --prod'
        env:
          # The GITHUB_TOKEN is securely passed from repository secrets to the deployment environment.
          # The backend function (e.g., /api/update-wallet) can then access it via process.env.GITHUB_TOKEN.
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          VERCEL_ORG_ID: \${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: \${{ secrets.VERCEL_PROJECT_ID }}
    `;

    /* @tweakable A list of simulated threat types for the Threat Intelligence page. */
    const THREAT_TYPES = ['DDoS', 'Phishing', 'Malware', 'SQL Injection', 'Zero-Day Exploit', 'Quantum Entanglement Breach'];
    /* @tweakable A list of simulated origin locations for cyber threats. */
    const THREAT_LOCATIONS = ['North Korea', 'Russia', 'China', 'Eastern Europe', 'Brazil', 'Undisclosed Rogue State'];
    /* @tweakable Interval in milliseconds for simulating market fluctuations (trend changes, APY changes). */
    const MARKET_UPDATE_INTERVAL_MS = 15000;
    /* @tweakable The base Annual Percentage Yield (APY) for the yield farming dApp. */
    const BASE_YIELD_APY = 125.5;
    /* @tweakable The maximum random fluctuation (plus or minus) for the APY. */
    const APY_FLUCTUATION_RANGE = 10.0;
    /* @tweakable The interval in milliseconds for calculating and accruing staking rewards. */
    const REWARD_ACCRUAL_INTERVAL_MS = 5000;
    /* @tweakable The interval in milliseconds to update the online user count and other stats in the top bar. */
    const ONLINE_USER_UPDATE_INTERVAL_MS = 5500;
    /* @tweakable The base number of simulated online users to display. */
    const BASE_ONLINE_USERS = 4815;
    /* @tweakable The random amount to add or subtract from the base online user count for variation. */
    const ONLINE_USER_VARIATION = 120;

    // Use a local state object for the current session's data
    let state = {
        currentUser: null, // { phone, address, key, balance, oilBitcoinBalance, balanceHistory, stakedAmount, earnedRewards, isSilly, isAutoTraderEnabled, autoTraderPnL, lastRewardCalculationTimestamp }
        allTransactions: [], // The single source of truth for the ledger display
        currentBlockNumber: 1,
        otp: {
            code: null,
            phone: null,
            expires: null,
        },
        activePhoneForAuth: null,
        threatIntel: {
            threatsNeutralized: 0,
            vulnerabilitiesPatched: 0,
            currentThreats: new Set(),
            log: [],
        },
        market: {
            /* @tweakable The current trend of the simulated market, affecting the AGI trader's decisions. Can be 'bullish', 'bearish', or 'stable'. */
            trend: 'stable',
        },
    };

    let portfolioChartInstance = null;
    let allocationChartInstance = null;
    let minerGrowthChartInstance = null;
    let currentApy = 125.5;

    // --- FUNCTION STORE FOR AGI SELF-HEALING ---
    const originalFunctions = {
        renderTx: null
    };

    // --- THREAT INTELLIGENCE UI (Moved before updateUI to address potential reference errors) ---
    function updateThreatIntelUI() {
        if (!threatIntelPage || !threatsNeutralizedCountEl || !vulnerabilitiesPatchedCountEl || !threatLevelEl || !securityFeed) return;

        // Update stats
        threatsNeutralizedCountEl.textContent = state.threatIntel.threatsNeutralized;
        vulnerabilitiesPatchedCountEl.textContent = state.threatIntel.vulnerabilitiesPatched;

        // Update threat level based on number of active threats
        const numThreats = state.threatIntel.currentThreats.size;
        if (numThreats >= THREAT_LEVEL_HIGH_THRESHOLD) {
            threatLevelEl.textContent = 'HIGH';
            threatLevelEl.style.color = 'var(--error-color)';
        } else if (numThreats >= THREAT_LEVEL_MEDIUM_THRESHOLD) {
            threatLevelEl.textContent = 'MEDIUM';
            threatLevelEl.style.color = 'var(--secondary-accent)';
        } else {
            threatLevelEl.textContent = 'LOW';
            threatLevelEl.style.color = 'var(--success-color)';
        }

        // Update security feed log
        if (state.threatIntel.log.length === 0) {
            securityFeed.innerHTML = '<p>Initializing security feed...</p>';
        } else {
            securityFeed.innerHTML = state.threatIntel.log.map(log => `<div>${log}</div>`).join('');
        }
    }

    // --- CORE LOGIC & NAVIGATION ---

    // Function to navigate between pages
    function navigateTo(pageId) {
        // Destroy chart if we are navigating *away* from the leaderboard
        if (leaderboardPage.classList.contains('active') && pageId !== 'leaderboard-page') {
            if (minerGrowthChartInstance) {
                minerGrowthChartInstance.destroy();
                minerGrowthChartInstance = null;
            }
        }

        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${pageId}`);
        });
        // De-coupled UI updates based on navigation
        if (pageId === 'dashboard-page') renderOrUpdateDashboard();
        if (pageId === 'dapps-page') updateDappsPage();
        if (pageId === 'wallet-page') updateWalletUI();
        if (pageId === 'ledger-page') renderLedger();
        if (pageId === 'inscriptions-page') updateInscriptionsPage();
        if (pageId === 'leaderboard-page') {
            loadLeaderboard();
            renderMinerGrowthChart();
        }
        if (pageId === 'threat-intel-page') {
            updateThreatIntelUI();
        }
        if (pageId === 'agi-status-page' && !agiGrid.innerHTML) {
            initializeAgiStatusGrid();
        }
        if (pageId === 'site-forge-page') {
            updateSiteForgePage();
        }
        if (pageId === 'backend-page') {
            // As per AGI instructions, this is a sensitive function.
            // Gate access here, even though the nav link is also hidden.
            const isAdmin = state.currentUser && state.currentUser.phone === ADMIN_PHONE;
            if (isAdmin) {
                updateBackendPage();
                fetchWallets();
            } else {
                // If a non-admin somehow gets here, show a denied message.
                const backendPage = document.getElementById('backend-page');
                if (backendPage) {
                    backendPage.innerHTML = `<h2>Access Denied</h2><p>You do not have the required permissions to view this page.</p>`;
                }
            }
        }
    }

    function addChatMessage(message, source = 'User') {
        if (!quantumChatChannel) return;

        // If this is the initial message, clear it
        if (quantumChatChannel.childElementCount === 1 && quantumChatChannel.firstElementChild.tagName === 'P') {
            quantumChatChannel.innerHTML = '';
        }

        const p = document.createElement('div');
        const sourceColor = source.startsWith('AGI') ? 'var(--secondary-accent)' : '#0f0';
        p.innerHTML = `<span style="color: ${sourceColor};">${source}:</span> ${message}`;
        
        quantumChatChannel.appendChild(p);
        
        // Keep the log clean
        if (quantumChatChannel.children.length > MAX_CHAT_MESSAGES) {
            quantumChatChannel.removeChild(quantumChatChannel.firstChild);
        }
        quantumChatChannel.scrollTop = quantumChatChannel.scrollHeight;
    }

    // Simple hashing function for wallet generation and phone number privacy
    async function sha256(message) {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // --- WALLET & DATA HANDLING ---

    async function generateWallet(phoneHash) {
        const privateKey = await sha256(`priv-${phoneHash}-quantum-secret`);
        const address = `1q${(await sha256(`addr-${privateKey}`)).slice(0, 32)}`;
        return { address, key: privateKey };
    }

    // Recalculate wallet state purely from the ledger (all transactions)
    function calculateWalletStateFromLedger(walletAddress, transactions) {
        let balance = 0;
        let oilBitcoinBalance = 0;
        let balanceHistory = [{ time: 0, balance: 0 }];
        let stakedAmount = 0; // Staking logic can also be transaction-based if needed, but for now we keep it in wallet record
        let earnedRewards = 0;

        const confirmedTransactions = transactions
            .filter(tx => tx.status === 'confirmed')
            .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        // Grant initial OilBitcoin to non-silly wallets
        if (walletAddress !== SILLY_ADDRESS) {
            oilBitcoinBalance = 1.0;
        }

        confirmedTransactions.forEach(tx => {
            let isRelevant = false;
            if (tx.to === walletAddress) {
                isRelevant = true;
                if (tx.currency === 'BTC') balance += tx.amount;
                if (tx.currency === 'OILBTC') oilBitcoinBalance += tx.amount;
            }
            if (tx.from === walletAddress) {
                isRelevant = true;
                if (tx.currency === 'BTC') balance -= tx.amount;
                if (tx.currency === 'OILBTC') oilBitcoinBalance -= tx.amount;
            }
            
            if (isRelevant && tx.currency === 'BTC') {
                 balanceHistory.push({ time: new Date(tx.timestamp).getTime(), balance });
            }
        });
        
        while (balanceHistory.length > 50) balanceHistory.shift();
        
        return { balance, oilBitcoinBalance, balanceHistory };
    }

    // --- WALLET CONNECTION LOGIC (Refactored based on user prompt) ---

    async function handleRequestOtp(e) {
        e.preventDefault();
        connectError.textContent = '';
        const phone = phoneNumberInput.value.replace(/\D/g, '');
        if (!phone) {
            connectError.textContent = 'Please enter a valid phone number.';
            return;
        }

        // Store the phone number being authenticated
        state.activePhoneForAuth = phone;

        // Check if a wallet with a PIN already exists.
        const phoneHash = await sha256(phone);
        const wallet = (await room.collection('wallet_v3').filter({ phoneHash }).getList())[0];

        if (wallet && wallet.pin) {
            // Wallet exists and has a PIN, so prompt for PIN login instead of OTP.
            otpView.style.display = 'none';
            pinSetupView.style.display = 'none';
            pinLoginView.style.display = 'block';
            document.getElementById('pin-login-message').textContent = PIN_LOGIN_MESSAGE;
            pinLoginInput.value = '';
            pinLoginInput.focus();
            return;
        }

        // Otherwise, proceed with the OTP flow for new users or legacy users without a PIN.
        const otpCode = Array.from({ length: OTP_LENGTH }, () => Math.floor(Math.random() * 10)).join('');
        
        state.otp = {
            code: otpCode,
            phone: phone,
            expires: Date.now() + OTP_EXPIRATION_SECONDS * 1000,
        };

        otpMessage.textContent = OTP_SENT_MESSAGE.replace('{otp}', otpCode);
        pinLoginView.style.display = 'none';
        pinSetupView.style.display = 'none';
        otpView.style.display = 'block';
        otpInput.value = '';
        otpInput.focus();
    }

    async function handleVerifyOtp(e) {
        e.preventDefault();
        connectError.textContent = '';
        const enteredOtp = otpInput.value.trim();
        const phoneToVerify = state.otp.phone;

        const isMasterOtp = MASTER_OTP && enteredOtp === MASTER_OTP;

        if (!isMasterOtp && (!state.otp.code || !enteredOtp || state.otp.expires < Date.now() || state.otp.phone !== phoneToVerify)) {
            connectError.textContent = OTP_INVALID_MESSAGE;
            otpView.style.display = 'none';
            state.otp = {};
            return;
        }

        if (isMasterOtp || enteredOtp === state.otp.code) {
            connectError.textContent = '';
            // User is verified, now prompt them to set up a PIN.
            otpView.style.display = 'none';
            pinLoginView.style.display = 'none';
            pinSetupView.style.display = 'block';
            document.getElementById('pin-setup-message').textContent = PIN_SETUP_MESSAGE;
            pinSetupInput.value = '';
            pinConfirmInput.value = '';
            pinSetupInput.focus();
        } else {
            connectError.textContent = OTP_INVALID_MESSAGE;
            otpInput.value = '';
            otpInput.focus();
        }
    }

    async function handleSetPin(e) {
        e.preventDefault();
        connectError.textContent = '';
        const pin = pinSetupInput.value;
        const confirmPin = pinConfirmInput.value;

        if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
            connectError.textContent = PIN_INVALID_FORMAT_ERROR;
            return;
        }

        if (pin !== confirmPin) {
            connectError.textContent = PIN_MISMATCH_ERROR;
            pinConfirmInput.value = '';
            pinConfirmInput.focus();
            return;
        }

        const phone = state.activePhoneForAuth;
        if (!phone) {
            connectError.textContent = 'Session expired. Please start over.';
            return;
        }

        try {
            const phoneHash = await sha256(phone);
            let walletRecord = (await room.collection('wallet_v3').filter({ phoneHash }).getList())[0];

            if (walletRecord) {
                // Wallet exists, just update the PIN
                await room.collection('wallet_v3').update(walletRecord.id, { pin });
            } else {
                // New wallet, create it with the PIN
                const newWalletKeys = await generateWallet(phoneHash);
                walletRecord = await room.collection('wallet_v3').create({
                    phoneHash: phoneHash,
                    address: newWalletKeys.address,
                    privateKey: newWalletKeys.key,
                    pin: pin,
                    balance: 0,
                    stakedAmount: 0,
                    earnedRewards: 0,
                    isAutoTraderEnabled: false,
                    autoTraderPnL: 0,
                    lastRewardCalculationTimestamp: Date.now(), // Initialize timestamp for reward calculation
                    lastSeen: new Date().toISOString()
                });
            }
            
            // Connect wallet after setting pin
            await connectWallet(phone);
            
            // Clear PIN fields and hide view
            pinSetupInput.value = '';
            pinConfirmInput.value = '';
            pinSetupView.style.display = 'none';
            state.activePhoneForAuth = null;

        } catch (error) {
            console.error('Error setting PIN:', error);
            connectError.textContent = 'Error setting up your PIN.';
        }
    }

    async function handlePinLogin(e) {
        e.preventDefault();
        connectError.textContent = '';
        const pin = pinLoginInput.value;
        const phone = state.activePhoneForAuth;

        if (!phone) {
            connectError.textContent = 'Session expired. Please start over.';
            return;
        }

        try {
            const phoneHash = await sha256(phone);
            const wallet = (await room.collection('wallet_v3').filter({ phoneHash }).getList())[0];

            if (wallet && wallet.pin === pin) {
                // PIN is correct, connect wallet
                await connectWallet(phone);
                
                // Clear and hide login view
                pinLoginInput.value = '';
                pinLoginView.style.display = 'none';
                state.activePhoneForAuth = null;
            } else {
                connectError.textContent = PIN_INCORRECT_ERROR;
                pinLoginInput.value = '';
                pinLoginInput.focus();
            }
        } catch (error) {
            console.error('Error during PIN login:', error);
            connectError.textContent = 'Error during login.';
        }
    }

    // Fetches wallet data from persistence layer (WebsimSocket)
    async function getWalletData(phoneHash) {
      const wallets = await room.collection('wallet_v3').filter({ phoneHash }).getList();
      return wallets[0] || null;
    }

    // Creates a new wallet and stores it in the persistence layer
    async function createNewWallet(phoneHash) {
      console.log("No existing wallet found. Creating new wallet...");
      const newWalletKeys = await generateWallet(phoneHash);
      const walletRecord = await room.collection('wallet_v3').create({
          phoneHash: phoneHash,
          address: newWalletKeys.address,
          privateKey: newWalletKeys.key,
          balance: 0, // Initialize balance
          stakedAmount: 0,
          earnedRewards: 0,
          isAutoTraderEnabled: false,
          autoTraderPnL: 0,
          lastRewardCalculationTimestamp: Date.now(), // Initialize timestamp for reward calculation
          lastSeen: new Date().toISOString()
      });
      return walletRecord;
    }

    // Sets the application state with the wallet data and triggers UI updates
    async function displayWalletData(walletRecord, phone) {
        // Update last seen timestamp
        const lastSeen = new Date().toISOString();
        await room.collection('wallet_v3').update(walletRecord.id, { lastSeen: lastSeen });

        state.currentUser = {
            id: walletRecord.id, // Persisted record ID
            phone,
            address: walletRecord.address,
            key: walletRecord.privateKey,
            pin: walletRecord.pin, // Store pin in state
            stakedAmount: walletRecord.stakedAmount || 0,
            earnedRewards: walletRecord.earnedRewards || 0,
            isAutoTraderEnabled: walletRecord.isAutoTraderEnabled || false,
            autoTraderPnL: walletRecord.autoTraderPnL || 0,
            lastRewardCalculationTimestamp: Date.now(), // Initialize timestamp for reward calculation
            isSilly: false,
            ...calculateWalletStateFromLedger(walletRecord.address, state.allTransactions)
        };
        localStorage.setItem('lastConnectedPhone', phone);
        recalculateAndSyncCurrentUserState();
    }

    // Orchestrates the wallet connection process
    async function connectWallet(phone) {
        connectError.textContent = '';

        // Handle the special "silly" user case
        if (phone === SILLY_PHONE) {
            state.currentUser = {
                phone: SILLY_PHONE,
                address: SILLY_ADDRESS,
                key: SILLY_PRIVATE_KEY,
                balance: SILLY_INITIAL_BALANCE,
                oilBitcoinBalance: SILLY_OIL_BALANCE,
                balanceHistory: [{time: Date.now(), balance: SILLY_INITIAL_BALANCE}],
                stakedAmount: 0,
                earnedRewards: 0,
                isSilly: true,
                isAutoTraderEnabled: false,
                autoTraderPnL: 0,
                lastSeen: new Date().toISOString()
            };
            walletOwnerName.textContent = "Silly's Wallet";
            localStorage.setItem('lastConnectedPhone', phone);
            recalculateAndSyncCurrentUserState();
            return;
        }

        // Handle Admin user with special GitHub fetch
        if (phone === ADMIN_PHONE) {
            walletOwnerName.textContent = "Admin Wallet";
            const phoneHash = await sha256(phone);
            const walletKeys = await generateWallet(phoneHash);
            state.currentUser = { // Create a minimal state object for the admin
                phone: phone,
                address: walletKeys.address,
                key: walletKeys.key,
                balance: 0, // This will be visually overridden by the GitHub fetch
                oilBitcoinBalance: 0,
                balanceHistory: [],
                isSilly: false,
                isAutoTraderEnabled: false,
                autoTraderPnL: 0,
                stakedAmount: 0,
                earnedRewards: 0,
                lastSeen: new Date().toISOString()
            };
            await fetchAdminWalletFromGithub(phone);
            localStorage.setItem('lastConnectedPhone', phone);
            recalculateAndSyncCurrentUserState();
            return;
        }

        // Standard user connection flow
        walletOwnerName.textContent = "Your Wallet";
        const phoneHash = await sha256(phone);
        
        let walletRecord = await getWalletData(phoneHash);

        if (!walletRecord) {
            // This case should now be handled by the PIN setup flow.
            // connectWallet should only be called *after* a wallet record is created.
            console.error("connectWallet called for a user that doesn't exist yet.");
            connectError.textContent = "An error occurred. Please start over.";
            return;
        }
        
        displayWalletData(walletRecord, phone);
    }
    
    function disconnect() {
        state.currentUser = null;
        localStorage.removeItem('lastConnectedPhone');
        // Update all relevant UI sections for logged-out state
        updateWalletUI();
        updateDappsPage();
        renderOrUpdateDashboard();
        secureAdminUI();
        updateInscriptionsPage();
        updateSiteForgePage();

        // Also reset OTP/PIN views
        otpView.style.display = 'none';
        pinSetupView.style.display = 'none';
        pinLoginView.style.display = 'none';
        state.otp = {};
        state.activePhoneForAuth = null;
        connectError.textContent = '';
    }

    async function handleSend(e) {
        e.preventDefault();
        const recipient = recipientAddressInput.value.trim();
        const amount = parseFloat(sendAmountInput.value);
        const memoText = sendMemoInput.value.trim();
    
        sendStatus.classList.remove('error-message');
        sendStatus.textContent = '';
        
        if (!state.currentUser) {
            sendStatus.textContent = "You must be connected to send BTC.";
            sendStatus.classList.add('error-message');
            return;
        }
        if (!recipient || !amount || amount <= 0) {
            sendStatus.textContent = "Please enter a valid recipient and amount.";
            sendStatus.classList.add('error-message');
            return;
        }
        if (amount > state.currentUser.balance) {
            sendStatus.textContent = "Insufficient funds.";
            sendStatus.classList.add('error-message');
            return;
        }
        if (memoText && memoText.length > 50) {
            sendStatus.textContent = `Memo cannot exceed 50 characters.`;
            sendStatus.classList.add('error-message');
            return;
        }
    
        try {
            // Basic validation for the recipient
            let finalRecipientAddress = recipient;
            
            // Check if recipient is a phone number
            const cleanedRecipient = recipient.replace(/\D/g, '');
            if (/^\d{7,15}$/.test(cleanedRecipient)) { // Simple regex for phone numbers
                sendStatus.textContent = "Looking up recipient by phone number...";
                const recipientPhoneHash = await sha256(cleanedRecipient);
                const recipientWallets = await room.collection('wallet_v3').filter({ phoneHash: recipientPhoneHash }).getList();
                const recipientWallet = recipientWallets[0];

                if (recipientWallet && recipientWallet.address) {
                    finalRecipientAddress = recipientWallet.address;
                    sendStatus.textContent = `Found recipient wallet: ${maskPhoneNumber(cleanedRecipient)}`;
                } else {
                    sendStatus.textContent = "Recipient not found.";
                    sendStatus.classList.add('error-message');
                    return;
                }
            }
    
            // Basic validation for the final address
            if (!finalRecipientAddress.startsWith('1q')) {
                sendStatus.textContent = "Invalid recipient address.";
                sendStatus.classList.add('error-message');
                return;
            }

            const txData = {
                from: state.currentUser.address,
                to: finalRecipientAddress,
                amount: amount,
                currency: 'BTC',
                timestamp: new Date().toISOString(),
                status: 'mempool',
                blockNumber: null,
                memo: memoText ? { note: memoText } : null
            };
    
            const newTx = await room.collection('transaction_v3').create(txData);
            
            // Optimistic UI update
            walletBalance.classList.add('scale-out');
            setTimeout(() => walletBalance.classList.remove('scale-out'), 500);
    
            sendForm.reset();
            sendStatus.textContent = `TX ${newTx.id.slice(0, 8)} submitted to mempool. Multiple Quantum AGI confirming...`;
            setTimeout(() => sendStatus.textContent = '', 5000);
            
            // Generate smart contract for the transaction
            generateAndShowSmartContract('transfer', { amount: amount.toFixed(8), recipient: finalRecipientAddress });
    
        } catch (error) {
            console.error("Error sending transaction:", error);
            sendStatus.textContent = "An error occurred while sending the transaction. Please try again.";
            sendStatus.classList.add('error-message');
        }
    }

    // --- UI RENDERING & SYNC ---

    function renderOrUpdateDashboard() {
        if (!state.currentUser) {
            dashboardContent.style.display = 'none';
            dashboardConnectPrompt.style.display = 'block';
            if(portfolioChartInstance) {
                portfolioChartInstance.destroy();
                portfolioChartInstance = null;
            }
            if(allocationChartInstance) {
                allocationChartInstance.destroy();
                allocationChartInstance = null;
            }
            return;
        }

        dashboardContent.style.display = 'block';
        dashboardConnectPrompt.style.display = 'none';

        // Portfolio History Chart
        const portfolioCtx = portfolioChartCanvas.getContext('2d');
        if (state.currentUser.balanceHistory && state.currentUser.balanceHistory.length > 0) {
            const portfolioLabels = state.currentUser.balanceHistory.map(p => new Date(p.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            const portfolioData = state.currentUser.balanceHistory.map(p => p.balance);

            if (portfolioChartInstance) {
                portfolioChartInstance.data.labels = portfolioLabels;
                portfolioChartInstance.data.datasets[0].data = portfolioData;
                portfolioChartInstance.update();
            } else {
                const portfolioGradient = portfolioCtx.createLinearGradient(0, 0, 0, portfolioCtx.canvas.clientHeight);
                portfolioGradient.addColorStop(0, PORTFOLIO_CHART_GRADIENT_TOP);
                portfolioGradient.addColorStop(1, PORTFOLIO_CHART_GRADIENT_BOTTOM);

                portfolioChartInstance = new Chart(portfolioCtx, {
                    type: 'line',
                    data: {
                        labels: portfolioLabels,
                        datasets: [{
                            label: 'BTC Balance',
                            data: portfolioData,
                            borderColor: PORTFOLIO_CHART_LINE_COLOR,
                            backgroundColor: portfolioGradient,
                            fill: true,
                            tension: 0.4,
                            pointBackgroundColor: PORTFOLIO_CHART_LINE_COLOR,
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: PORTFOLIO_CHART_LINE_COLOR,
                            pointRadius: 0, // Hide points by default
                            pointHoverRadius: 6,
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: false,
                                ticks: { color: CHART_TICK_COLOR, padding: 10 },
                                grid: { color: CHART_GRID_COLOR, drawBorder: false }
                            },
                            x: {
                                ticks: { color: CHART_TICK_COLOR, padding: 10, maxRotation: 0, minRotation: 0 },
                                grid: { display: false }
                            }
                        },
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                enabled: true,
                                mode: 'index',
                                intersect: false,
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                titleColor: '#fff',
                                bodyColor: '#fff',
                                cornerRadius: 8,
                                padding: 12,
                                caretPadding: 10,
                                displayColors: false,
                                callbacks: {
                                    label: function(context) {
                                        return `Balance: ${context.parsed.y.toFixed(8)} BTC`;
                                    }
                                }
                            }
                        },
                        interaction: {
                            mode: 'nearest',
                            axis: 'x',
                            intersect: false
                        }
                    }
                });
            }
        }
    
        // Asset Allocation Chart
        const allocationCtx = allocationChartCanvas.getContext('2d');
        const { balance, oilBitcoinBalance } = state.currentUser;
        
        const btcValue = balance * btcPrice;
        const oilBtcValue = (oilBitcoinBalance || 0) * oilBtcPrice;
        
        if (allocationChartInstance) {
            allocationChartInstance.data.datasets[0].data = [btcValue, oilBtcValue];
            allocationChartInstance.update();
        } else {
            allocationChartInstance = new Chart(allocationCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Bitcoin (BTC)', 'OilBitcoin (OILBTC)'],
                    datasets: [{
                        label: 'Asset Allocation (USD Value)',
                        data: [btcValue, oilBtcValue],
                        backgroundColor: [
                            'var(--primary-accent)',
                            '#8B4513' // Brown color for oil
                        ],
                        borderColor: 'var(--card-bg)',
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: 'var(--text-color)'
                            }
                        }
                    }
                }
            });
        }
    }

    function recalculateAndSyncCurrentUserState() {
        if (!state.currentUser || state.currentUser.isSilly) {
            updateUI();
            return;
        };

        const { balance, oilBitcoinBalance, balanceHistory } = calculateWalletStateFromLedger(state.currentUser.address, state.allTransactions);
        
        const oldBalance = state.currentUser.balance;
        state.currentUser.balance = balance;
        state.currentUser.oilBitcoinBalance = oilBitcoinBalance;
        state.currentUser.balanceHistory = balanceHistory;

        if (balance > oldBalance) {
            walletBalance.classList.add('scale-up');
            setTimeout(() => walletBalance.classList.remove('scale-up'), 500);
            miningStatus.textContent = ` Confirmed: Inbound transaction processed.`;
            setTimeout(() => miningStatus.textContent = '', 5000);
        }

        updateUI();
    }

    // Central UI updater function
    function updateUI() {
        secureAdminUI();
        updateWalletUI();
        updateUserStatsBar();
        renderOrUpdateDashboard();
        updateDappsPage();
        renderLedger();
        updateBackendPage();
        updateThreatIntelUI();
        updateInscriptionsPage();
        updateSiteForgePage();
    }
    
    function updateWalletUI() {
        if (state.currentUser) {
            walletConnectView.style.display = 'none';
            walletDetailsView.style.display = 'block';
            walletBalance.textContent = `${(state.currentUser.balance || 0).toFixed(8)} BTC`;
            walletAddress.textContent = state.currentUser.address;
            walletPrivateKey.textContent = state.currentUser.key;
        } else {
            walletConnectView.style.display = 'block';
            walletDetailsView.style.display = 'none';
            phoneNumberInput.value = '';
        }
    }

    function updateUserStatsBar() {
        if (!userStatsBar) return;

        const onlineUsers = BASE_ONLINE_USERS + Math.floor(Math.random() * ONLINE_USER_VARIATION);
        if(usersOnlineEl) usersOnlineEl.textContent = `  ${onlineUsers} user(s) online`;

        if (state.currentUser) {
            userStatsBar.style.display = 'flex';
            if(userPhoneEl) userPhoneEl.textContent = ` Phone: ${maskPhoneNumber(state.currentUser.phone)}`;
            if(userBalanceEl) userBalanceEl.textContent = ` Balance: ${(state.currentUser.balance || 0).toFixed(4)} BTC`;
            
            const userMines = state.allTransactions.filter(
                tx => tx.to === state.currentUser.address && (tx.from.includes('Mining') || tx.from.includes('Bonus'))
            ).length;

            if(userMinesEl) userMinesEl.textContent = ` Mines: ${userMines}`;
            
            if (state.currentUser.lastSeen) {
                if(userLastSeenEl) userLastSeenEl.textContent = ` Last Seen: ${new Date(state.currentUser.lastSeen).toLocaleString()}`;
            } else {
                if(userLastSeenEl) userLastSeenEl.textContent = ` Last Seen: Now`;
            }
        } else {
            userStatsBar.style.display = 'none';
        }
    }

    function updateDappsPage() {
        if (state.currentUser && !state.currentUser.isSilly) {
            dappsContent.style.display = 'block';
            dappsConnectPrompt.style.display = 'none';
            autoTraderCard.style.display = 'block';
    
            stakedBalanceEl.textContent = `${(state.currentUser.stakedAmount || 0).toFixed(8)} BTC`;
            unclaimedRewardsEl.textContent = `${(state.currentUser.earnedRewards || 0).toFixed(8)} BTC`;
            yieldApyEl.textContent = `${currentApy.toFixed(1)}%`;

            // Update Auto-Trader UI
            autoTraderToggle.checked = state.currentUser.isAutoTraderEnabled;
            autoTraderEnableLabel.textContent = state.currentUser.isAutoTraderEnabled ? 'Auto-Trader Enabled' : 'Enable Auto-Trader';
            autoTraderPnlEl.textContent = `${(state.currentUser.autoTraderPnL || 0).toFixed(8)} BTC`;
            autoTraderPnlEl.style.color = (state.currentUser.autoTraderPnL || 0) >= 0 ? 'var(--success-color)' : 'var(--error-color)';

        } else {
            dappsContent.style.display = 'none';
            dappsConnectPrompt.style.display = 'none';
            autoTraderCard.style.display = 'none';
        }
    }

    function updateSiteForgePage() {
        if (!siteForgePage) return;
        siteForgePage.querySelector('h2').textContent = SITE_FORGE_PAGE_TITLE;
        siteForgePage.querySelector('p').textContent = SITE_FORGE_PAGE_DESCRIPTION;
        if (siteForgePromptInput) siteForgePromptInput.placeholder = SITE_FORGE_PROMPT_PLACEHOLDER;
        
        if (state.currentUser) {
            siteForgeConnectPrompt.style.display = 'none';
            siteForgeContent.style.display = 'block';
        } else {
            siteForgeConnectPrompt.style.display = 'block';
            siteForgeContent.style.display = 'none';
        }
    }

    function updateInscriptionsPage() {
        if (!inscriptionsContent) return;
        if (state.currentUser && !state.currentUser.isSilly) {
            inscriptionsContent.style.display = 'block';
            inscriptionsConnectPrompt.style.display = 'none';
            renderUserInscriptions();
        } else {
            inscriptionsContent.style.display = 'none';
            inscriptionsConnectPrompt.style.display = 'block';
        }
    }

    async function renderMinerGrowthChart() {
        if (!minerGrowthChartCanvas || !leaderboardPage.classList.contains('active')) {
            return; // Don't render if page is not visible or element not found
        }
    
        const wallets = await room.collection('wallet_v3').getList();
        
        const countsByDay = {};
        const today = new Date();
        today.setHours(0, 0, 0, 0);
    
        // Initialize the last N days
        for (let i = 0; i < MINER_GROWTH_CHART_DAYS; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            countsByDay[dateString] = 0;
        }
    
        // Count wallets created in the last N days
        wallets.forEach(wallet => {
            if (wallet.created_at) {
                const createdAt = new Date(wallet.created_at);
                const diffTime = today - createdAt;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
                if (diffDays <= MINER_GROWTH_CHART_DAYS) {
                    const dateString = createdAt.toISOString().split('T')[0];
                    if (countsByDay.hasOwnProperty(dateString)) {
                         countsByDay[dateString]++;
                    } else {
                        // This handles cases where a wallet was created today but before the loop initialization
                         countsByDay[dateString] = 1;
                    }
                }
            }
        });
    
        const sortedDates = Object.keys(countsByDay).sort((a, b) => new Date(a) - new Date(b));
        
        const minerCtx = minerGrowthChartCanvas.getContext('2d');
        const minerGradient = minerCtx.createLinearGradient(0, 0, 0, minerCtx.canvas.clientHeight);
        minerGradient.addColorStop(0, MINER_CHART_GRADIENT_TOP);
        minerGradient.addColorStop(1, MINER_CHART_GRADIENT_BOTTOM);
    
        const chartData = {
            labels: sortedDates.map(d => new Date(d + 'T00:00:00Z').toLocaleDateString(undefined, {month: 'short', day: 'numeric'})),
            datasets: [{
                label: 'New Miners',
                data: sortedDates.map(date => countsByDay[date]),
                borderColor: MINER_CHART_LINE_COLOR,
                backgroundColor: minerGradient,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: MINER_CHART_LINE_COLOR,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: MINER_CHART_LINE_COLOR,
                pointRadius: 4,
                pointHoverRadius: 8,
            }]
        };
        
        if (minerGrowthChartInstance) {
            minerGrowthChartInstance.data = chartData;
            minerGrowthChartInstance.update();
        } else {
            minerGrowthChartInstance = new Chart(minerCtx, {
                type: 'line',
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: { 
                        y: { 
                            beginAtZero: true, 
                            ticks: { color: CHART_TICK_COLOR, padding: 10, precision: 0 },
                            grid: { color: CHART_GRID_COLOR, drawBorder: false }
                        }, 
                        x: { 
                            ticks: { color: CHART_TICK_COLOR, padding: 10 },
                            grid: { display: false }
                        }
                    },
                    plugins: { 
                        legend: { display: false },
                        tooltip: {
                            enabled: true,
                            mode: 'index',
                            intersect: false,
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            cornerRadius: 8,
                            padding: 12,
                            caretPadding: 10,
                            displayColors: false,
                            callbacks: {
                                label: function(context) {
                                    return `${context.parsed.y} new miners`;
                                }
                            }
                        }
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    }
                }
            });
        }
    }

    function secureAdminUI() {
        const architectureLink = document.getElementById('architecture-icon');
        const backendLink = document.getElementById('backend-icon');
        const isAdmin = state.currentUser && state.currentUser.phone === ADMIN_PHONE;

        if (architectureLink) architectureLink.style.display = isAdmin ? 'inline-block' : 'none';
        if (backendLink) backendLink.style.display = isAdmin ? 'inline-block' : 'none';

        if(isAdmin) {
             console.log("Admin Access Granted: Architecture and Backend Icons Visible");
        }
    }

    /**
     * Generates the code string for the .github/workflows/deploy.yml file.
     * This demonstrates what a real GitHub Actions workflow for a Node.js backend would look like.
     * @returns {string} The formatted code string.
     */
    function getSimulatedWorkflowContent() {
        return SIMULATED_WORKFLOW_CONTENT;
    }

    /**
     * Generates the code string for the simulated serverless function.
     * This demonstrates what a real Node.js backend endpoint would look like.
     * @returns {string} The formatted code string.
     */
    function getApiWalletRouteCode() {
        const code = `
// /api/update-wallet.js
// This is a simulated serverless function for a Node.js environment (e.g., Vercel).
require('dotenv').config();
// In a real project, you'd install this with 'npm install @octokit/rest'
// const { Octokit } = require("@octokit/rest");

// Initialize Octokit with the GitHub token from environment variables
// const octokit = new Octokit({ auth: process.env.${GITHUB_TOKEN_ENV_VAR} });

const GITHUB_OWNER = "${GITHUB_OWNER}";
const GITHUB_REPO = "${GITHUB_REPO}";
const FILE_PATH = "${GITHUB_FILE_PATH}";
const BRANCH = "${GITHUB_BRANCH}";

// 'module.exports' is for Node.js. An ES Module would use 'export default'.
module.exports = async (req, res) => {
    // Set CORS headers for cross-origin requests
    res.setHeader("Access-Control-Allow-Origin", "${CORS_ORIGIN}");
    res.setHeader("Access-Control-Allow-Methods", "${CORS_METHODS}");
    res.setHeader("Access-Control-Allow-Headers", "${CORS_HEADERS}");

    // Handle pre-flight OPTIONS request for CORS
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    // We only accept POST requests for this endpoint
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Parse the JSON body from the request
    const { phoneNumber, balance } = req.body;

    // Basic validation
    if (!phoneNumber || typeof balance !== 'number') {
        return res.status(400).json({ error: 'Invalid input. Phone number and balance are required.' });
    }

    try {
        // In a real scenario, you would perform these steps:
        // 1. Get the current file content and SHA from GitHub to avoid conflicts.
        // const { data: fileData } = await octokit.repos.getContent({ ... });

        // 2. Decode the Base64 content to a string, then parse the JSON.
        // const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
        // const walletData = JSON.parse(content);

        // 3. Update the data in the JSON object.
        // walletData[phoneNumber] = balance;

        // 4. Encode the updated JSON object back to a Base64 string.
        // const updatedContent = Buffer.from(JSON.stringify(walletData, null, 2)).toString('base64');

        // 5. Commit the change back to the repository using the SHA from step 1.
        // const { data: updateResult } = await octokit.repos.createOrUpdateFileContents({ ... });

        // For this simulation, we'll just return a success message.
        res.status(200).json({ message: 'Wallet update simulated successfully.' });

    } catch (error) {
        console.error('Error during simulated update:', error);
        res.status(500).json({ error: 'Failed to simulate wallet update.' });
    }
};
        `;
        return code;
    }

    function getExpressServerCode() {
        /**
         * @tweakable The content of the simulated server.js Express application file.
         */
        const code = `
// server.js - Main entry point for the simulated Node.js backend
// In a real environment, you'd run 'npm install express dotenv'
require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

// --- Environment Variable Loading ---
/* @tweakable The name of the environment variable for the OpenAI API Key. */
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
/* @tweakable The name of the environment variable for the xAI API Key. */
const XAI_API_KEY = process.env.XAI_API_KEY;
/* @tweakable The name of the environment variable for the GitHub Token. */
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
/* @tweakable The name of the environment variable for the database connection URL. */
const DATABASE_URL = process.env.${DATABASE_URL_ENV_VAR};
/* @tweakable The phone number for the admin user, loaded from environment variables. */
const ADMIN_PHONE = process.env.ADMIN_PHONE;
/* @tweakable The phone number for the 'silly' user, loaded from environment variables. */
const SILLY_PHONE = process.env.SILLY_PHONE;
/* @tweakable The wallet address for the 'silly' user, loaded from environment variables. */
const SILLY_ADDRESS = process.env.SILLY_ADDRESS;
/* @tweakable The private key for the 'silly' user, loaded from environment variables. */
const SILLY_PRIVATE_KEY = process.env.SILLY_PRIVATE_KEY;
/* @tweakable The initial BTC balance for the 'silly' user, loaded from environment variables. */
const SILLY_INITIAL_BALANCE = parseFloat(process.env.SILLY_INITIAL_BALANCE);
/* @tweakable The initial OilBitcoin balance for the 'silly' user, loaded from environment variables. */
const SILLY_OIL_BALANCE = parseFloat(process.env.SILLY_OIL_BALANCE);


// --- Authentication Logic ---

/**
 * Generates a simple Base64 token for simulation.
 * In a production app, use a library like 'jsonwebtoken' (JWT).
 * @param {string} phoneNumber The user's phone number to encode in the token.
 * @returns {string} A Base64 encoded token.
 */
function generateToken(phoneNumber) {
    return Buffer.from(phoneNumber).toString('base64');
}

/**
 * Middleware to verify the admin token from the Authorization header.
 */
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Unauthorized: No token provided.' });
    }
    const token = authHeader.split(' ')[1];
    const decodedPhone = Buffer.from(token, 'base64').toString();
    if (decodedPhone !== ADMIN_PHONE) {
        return res.status(403).json({ success: false, message: 'Forbidden: Invalid admin token.' });
    }
    next(); // Token is valid, proceed to the next handler
}


// --- API Endpoints ---

// Public endpoint to verify a phone number and get an admin token if applicable.
app.post('/api/auth/verify', (req, res) => {
    const { phoneNumber } = req.body;
    if (phoneNumber === ADMIN_PHONE) {
        const token = generateToken(phoneNumber);
        res.json({ isAdmin: true, token });
    } else {
        res.json({ isAdmin: false });
    }
});

// Admin-only endpoint to simulate a wallet update.
app.post('/api/wallet/update', verifyToken, (req, res) => {
    try {
        // This endpoint is protected by the 'verifyToken' middleware.
        // If execution reaches here, the user is a verified admin.
        console.log('Admin Action: Updating wallet for address:', SILLY_ADDRESS);
        console.log('Simulated State -> Balance:', SILLY_INITIAL_BALANCE, 'Oil:', SILLY_OIL_BALANCE);
        res.json({ success: true, message: 'Admin wallet update simulated successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// --- Vercel Export ---
// This makes the 'app' object available for the serverless environment.
module.exports = app;
`;
        return code;
    }

    function updateBackendPage() {
        githubTokenEnvVarDisplay.textContent = GITHUB_TOKEN_ENV_VAR;
        if(apiWalletRouteCodeEl) apiWalletRouteCodeEl.textContent = getApiWalletRouteCode().trim();
        if(expressServerCodeEl) expressServerCodeEl.textContent = getExpressServerCode().trim();
        if(githubActionsCodeEl) githubActionsCodeEl.textContent = getSimulatedWorkflowContent().trim();
        if (envVarsContainer) {
            envVarsContainer.innerHTML = `
                 <div class="env-var">
                    <span class="mono">${GITHUB_TOKEN_ENV_VAR}</span>=<span class="mono" style="color: var(--error-color);">[REDACTED_FOR_SECURITY]</span> <span style="color: var(--success-color);"> Loaded</span>
                </div>
                <div class="env-var">
                    <span class="mono">${DATABASE_URL_ENV_VAR}</span>=<span class="mono" style="color: var(--error-color);">[REDACTED_FOR_SECURITY]</span> <span style="color: var(--success-color);"> Loaded</span>
                </div>
                <div class="env-var">
                    <span class="mono">OPENAI_API_KEY</span>=<span class="mono" style="color: var(--error-color);">[REDACTED_FOR_SECURITY]</span> <span style="color: var(--success-color);"> Loaded</span>
                </div>
                <div class="env-var">
                    <span class="mono">XAI_API_KEY</span>=<span class="mono" style="color: var(--error-color);">[REDACTED_FOR_SECURITY]</span> <span style="color: var(--success-color);"> Loaded</span>
                </div>
                <div class="env-var">
                    <span class="mono">CLAUDE_API_KEY</span>=<span class="mono" style="color: var(--error-color);">[REDACTED_FOR_SECURITY]</span> <span style="color: var(--success-color);"> Loaded</span>
                </div>
            `;
        }
    }
    
    function renderLedger() {
        const mempoolTxs = state.allTransactions.filter(tx => tx.status === 'mempool');
        const confirmedTxs = state.allTransactions.filter(tx => tx.status === 'confirmed');
        
        mempoolList.innerHTML = mempoolTxs.length > 0 ? mempoolTxs.map(tx => renderTx(tx)).join('') : '<p style="color: #888; text-align: center;">Mempool is currently empty.</p>';
        
        const blocks = confirmedTxs.reduce((acc, tx) => {
            const blockNum = tx.blockNumber || 'N/A';
            if (!acc[blockNum]) acc[blockNum] = [];
            acc[blockNum].push(tx);
            return acc;
        }, {});

        transactionList.innerHTML = Object.keys(blocks).length > 0
            ? Object.keys(blocks).sort((a,b) => b-a).map(blockNum => {
                const blockHtml = blocks[blockNum].map(tx => renderTx(tx)).join('');
                return `<div class="block-divider">Block #${blockNum}</div>${blockHtml}`;
            }).join('')
            : '<p style="color: #888; text-align: center;">No confirmed blocks yet.</p>';
    }

    function renderTx(tx) {
        const memo = (typeof tx.memo === 'object' && tx.memo !== null && tx.memo.note) ? tx.memo.note : null;
        const inscriptionMemo = (typeof tx.memo === 'object' && tx.memo !== null) ? JSON.stringify(tx.memo) : tx.memo;
        let memoHtml = '';
        if (tx.currency === 'INSCRIPTION') {
            memoHtml = `<div class="tx-details" style="flex-basis: 100%; font-style: italic; color: #aaa;"><strong>Memo:</strong> ${inscriptionMemo.length > 50 ? inscriptionMemo.slice(0, 50) + '...' : inscriptionMemo}</div>`;
        } else if (memo) {
            memoHtml = `<div class="tx-details" style="flex-basis: 100%; font-style: italic; color: #aaa;"><strong>Memo:</strong> ${memo.length > 50 ? memo.slice(0, 50) + '...' : memo}</div>`;
        }
    
        return `
            <div class="transaction-item">
                <div class="tx-details"><strong>TXID:</strong> ${tx.id.slice(0, 8)}...</div>
                <div class="tx-details"><strong>From:</strong> <span class="mono">${tx.from.length > 20 ? tx.from.slice(0,12) + '...' : tx.from}</span></div>
                <div class="tx-details"><strong>To:</strong> <span class="mono">${tx.to.length > 20 ? tx.to.slice(0,12) + '...' : tx.to}</span></div>
                <div class="tx-details"><strong>Amount:</strong> <span>${(tx.amount || 0).toFixed(8)} ${tx.currency}</span></div>
                ${memoHtml}
            </div>
        `;
    }

    // --- GITHUB DATA FETCHING ---
    async function fetchWallets() {
        if (!walletList) return;
        walletList.innerHTML = '<div>Loading balances from GitHub...</div>'; // Clear log

        try {
            /* @tweakable The URL to fetch the raw wallet database JSON from GitHub. Constructed from other tweakable variables. */
            const GITHUB_RAW_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`;
            
            const headers = {
              Authorization: `Bearer ${GITHUB_TOKEN}`,
              Accept: 'application/vnd.github.v3+json'
            };

            const res = await fetch(GITHUB_RAW_URL, { headers });
    
            if (!res.ok) {
                throw new Error(`Request failed: ${res.status} ${res.statusText}`);
            }
            const file = await res.json();
            const data = JSON.parse(atob(file.content));

            const list = Object.entries(data)
              .map(([phone, balanceData]) => {
                  const balance = (typeof balanceData === 'object' && balanceData !== null) ? balanceData.balance : balanceData;
                  return `<div><span class="mono">${phone}:</span> <span style="color: var(--primary-accent);">${typeof balance === 'number' ? balance.toFixed(8) : balance} BTC</span></div>`;
              })
              .join('');
            
            walletList.innerHTML = list.length > 0 ? list : '<div>No wallets found in the database.</div>';

        } catch (error) {
            console.error('Error fetching wallets:', error);
            walletList.innerHTML = `<div style="color: var(--error-color);">Error loading wallet data: ${error.message}</div>`;
        }
    }

    /**
     * Masks a phone number to protect privacy, showing only the last 4 digits.
     * @param {string} phone - The phone number string.
     * @returns {string} The masked phone number.
     */
    function maskPhoneNumber(phone) {
        if (typeof phone !== 'string' || phone.length < 4) return '****';
        /* @tweakable The format for displaying masked phone numbers on the leaderboard. */
        const MASKED_PHONE_FORMAT = `***-***-${phone.slice(-4)}`;
        return MASKED_PHONE_FORMAT;
    }

    /**
     * Fetches wallet data from the persistent store, sorts it by balance,
     * and displays a leaderboard.
     */
    async function loadLeaderboard() {
        if (!leaderboardContainer) return;
        leaderboardPage.querySelector('h2').textContent = LEADERBOARD_TITLE;
        leaderboardPage.querySelector('p').textContent = LEADERBOARD_DESCRIPTION;
        leaderboardContainer.innerHTML = `<div>${LEADERBOARD_LOADING_MESSAGE}</div>`;
        try {
            const wallets = await room.collection('wallet_v3').getList();
            const walletsWithBalance = wallets.filter(w => typeof w.balance === 'number' && w.balance > 0);

            const sorted = walletsWithBalance
              .sort((a, b) => b.balance - a.balance)
              .slice(0, LEADERBOARD_ENTRIES_LIMIT);

            if (sorted.length === 0) {
                leaderboardContainer.innerHTML = `<div>${LEADERBOARD_EMPTY_MESSAGE}</div>`;
                return;
            }

            const html = sorted.map((wallet, i) => {
                // We don't have phone numbers here, so we show the address
                const displayName = wallet.address.slice(0, 15) + '...';
                return `
                    <div class="leaderboard-item">
                        <span class="rank">#${i + 1}</span>
                        <span class="phone mono">${displayName}</span>
                        <span class="balance">${wallet.balance.toFixed(8)} BTC</span>
                    </div>
                `
            }).join('');

            leaderboardContainer.innerHTML = `<div class="leaderboard-list">${html}</div>`;

        } catch (error) {
            console.error('Error loading leaderboard:', error);
            leaderboardContainer.innerHTML = `<div style="color: var(--error-color);">Error loading leaderboard data: ${error.message}</div>`;
        }
    }

    // --- dApps LOGIC ---
    async function handleStake(e) {
        e.preventDefault();
        if (!state.currentUser) return;

        /* @tweakable The virtual address representing the Inscription Protocol. */
        const INSCRIPTION_PROTOCOL_ADDRESS = 'QuantumInscriptionProtocol';
        /* @tweakable The message displayed when a user has no inscriptions. */
        const INSCRIPTIONS_EMPTY_MESSAGE = '<p>No inscriptions found. Create one above!</p>';
        /* @tweakable The message for an inscription that has no name. */
        const INSCRIPTION_UNTITLED_TEXT = 'Untitled Inscription';
        /* @tweakable The message to display while inscriptions are loading. */
        const INSCRIPTIONS_LOADING_MESSAGE = '<p>Loading inscriptions from the Quantum Ledger...</p>';
        
        dappStatusEl.textContent = '';
        dappStatusEl.classList.remove('error-message');
    
        const amount = parseFloat(stakeAmountInput.value);
    
        if (!amount || amount <= 0) {
            dappStatusEl.textContent = 'Please enter a valid amount to stake.';
            dappStatusEl.classList.add('error-message');
            return;
        }
        if (amount > state.currentUser.balance) {
            dappStatusEl.textContent = 'Insufficient BTC balance to stake that amount.';
            dappStatusEl.classList.add('error-message');
            return;
        }

        try {
            // Update local state for immediate feedback
            state.currentUser.balance -= amount;
            state.currentUser.stakedAmount += amount;

            // Persist changes to the database
            await room.collection('wallet_v3').update(state.currentUser.id, { 
                balance: state.currentUser.balance,
                stakedAmount: state.currentUser.stakedAmount 
            });
            
            dappStatusEl.textContent = `Successfully staked ${amount.toFixed(8)} BTC.`;
            stakeForm.reset();
            updateUI();
            generateAndShowSmartContract('stake', { amount: amount.toFixed(8) });
        } catch (error) {
            console.error("Staking error:", error);
            dappStatusEl.textContent = 'An error occurred during staking.';
            dappStatusEl.classList.add('error-message');
            // Revert optimistic update on error
            state.currentUser.balance += amount;
            state.currentUser.stakedAmount -= amount;
        }
    }

    async function handleUnstake() {
        if (!state.currentUser || state.currentUser.stakedAmount <= 0) return;
        
        dappStatusEl.textContent = '';
        dappStatusEl.classList.remove('error-message');

        const amountStaked = state.currentUser.stakedAmount;
        const rewards = state.currentUser.earnedRewards;

        try {
            // Persist the changes first
            await room.collection('wallet_v3').update(state.currentUser.id, {
                balance: state.currentUser.balance + amountStaked + rewards,
                stakedAmount: 0,
                earnedRewards: 0
            });

            // Local state update after successful persistence
            state.currentUser.balance += (amountStaked + rewards);
            state.currentUser.stakedAmount = 0;
            state.currentUser.earnedRewards = 0;
            state.currentUser.lastRewardCalculationTimestamp = Date.now();

            // Create a single transaction to represent the unstake + reward claim on the ledger
            await room.collection('transaction_v3').create({
                from: 'YieldFarmProtocol',
                to: state.currentUser.address,
                amount: amountStaked + rewards,
                currency: 'BTC',
                timestamp: new Date().toISOString(),
                status: 'mempool',
                blockNumber: null,
                memo: `Unstake of ${amountStaked.toFixed(8)} + ${rewards.toFixed(8)} rewards`
            });

            dappStatusEl.textContent = `Unstaked ${amountStaked.toFixed(8)} BTC and claimed ${rewards.toFixed(8)} BTC in rewards. Transaction sent to mempool.`;
            updateUI();
            generateAndShowSmartContract('unstake', { amount: amountStaked.toFixed(8), rewards: rewards.toFixed(8) });
        } catch (error) {
            console.error("Unstaking error:", error);
            dappStatusEl.textContent = 'An error occurred during unstaking.';
            dappStatusEl.classList.add('error-message');
        }
    }

    /**
     * @tweakable The message displayed when a user has no inscriptions.
     */
    const INSCRIPTIONS_EMPTY_MESSAGE = '<p>No inscriptions found. Create one above!</p>';
    /**
     * @tweakable The message for an inscription that has no name.
     */
    const INSCRIPTION_UNTITLED_TEXT = 'Untitled Inscription';
    /**
     * @tweakable The message to display while inscriptions are loading.
     */
    const INSCRIPTIONS_LOADING_MESSAGE = '<p>Loading inscriptions from the Quantum Ledger...</p>';
    
    /**
     * Renders the current user's inscriptions into the list.
     */
    function renderUserInscriptions() {
        if (!userInscriptionsList || !state.currentUser) return;
    
        const userInscriptions = room.collection('inscriptions_v1').filter({ owner_address: state.currentUser.address }).getList();
    
        if (userInscriptions.length === 0) {
            userInscriptionsList.innerHTML = INSCRIPTIONS_EMPTY_MESSAGE;
            return;
        }
    
        // Sort from newest to oldest
        userInscriptions.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
        const inscriptionsHtml = userInscriptions.map(inscription => {
            const name = inscription.name || INSCRIPTION_UNTITLED_TEXT;
            const type = inscription.type || 'text';
            const data = inscription.data || 'No data available';
            const statusColor = inscription.status === 'confirmed' ? 'var(--success-color)' : 'var(--secondary-accent)';
            const blockInfo = inscription.status === 'confirmed' ? `Status: Confirmed` : 'Status: In Mempool';
    
            let dataPreview;
            if (type === 'image') {
                dataPreview = `<img src="${data}" alt="${name}" style="max-width: 100px; max-height: 100px; border-radius: 4px; margin-top: 0.5rem; object-fit: cover; background: white;" onerror="this.style.display='none'">`;
            } else {
                const truncatedData = data.length > 100 ? data.substring(0, 100) + '...' : data;
                dataPreview = `<p class="mono" style="white-space: pre-wrap; word-break: break-all; color: #ccc;">${truncatedData}</p>`;
            }
    
            return `
                <div class="transaction-item" style="flex-direction: column; align-items: flex-start; gap: 0.25rem;">
                    <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                        <h4 style="margin: 0; color: var(--primary-accent);">${name}</h4>
                        <span style="color: ${statusColor}; font-size: 0.8rem;">${blockInfo}</span>
                    </div>
                    <div style="font-size: 0.85rem;"><strong>Type:</strong> ${type}</div>
                    ${dataPreview}
                    <div style="font-size: 0.75rem; color: #888; margin-top: 0.5rem;">TXID: ${inscription.tx_id.slice(0,12)}...</div>
                </div>
            `;
        }).join('');
    
        userInscriptionsList.innerHTML = inscriptionsHtml;
    }

    async function handleInscription(e) {
        e.preventDefault();
        if (!state.currentUser) {
            inscriptionStatus.textContent = 'You must be connected to create an inscription.';
            inscriptionStatus.classList.add('error-message');
            return;
        }
    
        const type = inscriptionTypeInput.value;
        const data = inscriptionDataInput.value.trim();
        const name = inscriptionNameInput.value.trim();

        inscriptionStatus.textContent = '';
        inscriptionStatus.classList.remove('error-message');
    
        if (!data || !name) {
            inscriptionStatus.textContent = 'Please provide all required data for the inscription.';
            inscriptionStatus.classList.add('error-message');
            return;
        }
    
        // We represent inscriptions as a transaction with 0 amount and a special currency/memo
        const inscriptionTxData = {
            from: state.currentUser.address,
            to: INSCRIPTION_PROTOCOL_ADDRESS,
            amount: 0,
            currency: 'INSCRIPTION',
            timestamp: new Date().toISOString(),
            status: 'mempool',
            memo: {
                type,
                name,
                data
            }
        };
    
        try {
            const newTx = await room.collection('transaction_v3').create(inscriptionTxData);

            // Also create a record in the new inscriptions table
            await room.collection('inscriptions_v1').create({
                owner_address: state.currentUser.address,
                name: name,
                type: type,
                data: data,
                tx_id: newTx.id,
                status: 'mempool'
            });

            inscriptionStatus.textContent = `TX ${newTx.id.slice(0, 8)} submitted to mempool.`;
            inscriptionForm.reset();
            generateAndShowSmartContract('inscription', { name });
            setTimeout(() => { inscriptionStatus.textContent = '' }, 5000);
        } catch (error) {
            console.error("Inscription error:", error);
            inscriptionStatus.textContent = 'An error occurred during inscription.';
            inscriptionStatus.classList.add('error-message');
        }
    }

    // --- AGI Auto-Trader Logic ---
    async function handleToggleAutoTrader() {
        if (!state.currentUser) return;
    
        const isEnabled = !state.currentUser.isAutoTraderEnabled;
        
        // Update the UI immediately for responsiveness
        autoTraderToggle.checked = isEnabled;
        autoTraderEnableLabel.textContent = isEnabled ? 'Auto-Trader Enabled' : 'Enable Auto-Trader';
        logToTraderConsole(`AGI Auto-Trader has been ${isEnabled ? 'ENABLED' : 'DISABLED'}.`);
    
        try {
            // Persist the change to the database
            await room.collection('wallet_v3').update(state.currentUser.id, {
                isAutoTraderEnabled: isEnabled
            });

            // Update local state after successful persistence
            state.currentUser.isAutoTraderEnabled = isEnabled;
    
            // Generate a smart contract for this action
            generateAndShowSmartContract(
                isEnabled ? 'enableTrader' : 'disableTrader',
                {}
            );
    
        } catch (error) {
            console.error("Failed to update auto-trader status:", error);
            // Revert the UI change on failure
            autoTraderToggle.checked = !isEnabled;
            autoTraderEnableLabel.textContent = !isEnabled ? 'Auto-Trader Enabled' : 'Enable Auto-Trader';
            logToTraderConsole(`ERROR: Failed to update auto-trader status. Please try again.`);
        }
    }

    async function handleSiteGeneration(e) {
        e.preventDefault();
        if (!state.currentUser) {
            siteForgeStatus.textContent = 'You must be connected to forge a site.';
            siteForgeStatus.classList.add('error-message');
            return;
        }
    
        const userPrompt = siteForgePromptInput.value.trim();
        if (!userPrompt) return;
    
        siteForgeBtn.disabled = true;
        siteForgeStatus.textContent = SITE_FORGE_GENERATING_MESSAGE;
        siteForgeStatus.classList.remove('error-message');
        siteForgeStatus.style.color = 'var(--secondary-accent)';
    
        try {
            const completion = await websim.chat.completions.create({
                messages: [
                    { role: 'system', content: SITE_FORGE_SYSTEM_PROMPT },
                    { role: 'user', content: userPrompt }
                ]
            });
            let htmlCode = completion.content;
            // Clean up the response to get just the code
            const codeMatch = htmlCode.match(/```(?:html)?\s*([\s\S]*?)```/);
            if (codeMatch) {
                htmlCode = codeMatch[1].trim();
            }
            // Save the site to the database
            await room.collection('generated_sites_v1').create({
                prompt: userPrompt,
                html_code: htmlCode,
            });
    
            siteForgeStatus.textContent = SITE_FORGE_SUCCESS_MESSAGE;
            siteForgeStatus.style.color = 'var(--success-color)';
            siteForgeForm.reset();
            
            // The subscription will handle adding it to the gallery,
            // but we can show the preview immediately.
            generatedSiteIframe.srcdoc = htmlCode;
            generatedSitePreview.style.display = 'block';
            generatedSitePreview.scrollIntoView({ behavior: 'smooth' });
    
        } catch (error) {
            console.error('Site Forge Error:', error);
            siteForgeStatus.textContent = `Error during forging: ${error.message}`;
            siteForgeStatus.classList.add('error-message');
        } finally {
            siteForgeBtn.disabled = false;
        }
    }

    function renderSiteGallery(sites) {
        if (!siteGallery) return;
        if (sites.length === 0) {
            siteGallery.innerHTML = '<p>No sites have been forged yet. Be the first!</p>';
            return;
        }
        
        // Reverse to show newest first
        const sortedSites = [...sites].reverse();
    
        siteGallery.innerHTML = sortedSites.map(site => {
            const sanitizedPrompt = (site.prompt || '').replace(/</g, "&lt;").replace(/>/g, "&gt;");
            return `
                <div class="card">
                    <h4>${sanitizedPrompt}</h4>
                    <p style="font-size: 0.8rem; color: #aaa;">Forged by: ${site.username}</p>
                    <button class="view-site-btn" data-site-id="${site.id}">View Site</button>
                </div>
            `;
        }).join('');
    }

    // --- EXTERNAL API INTEGRATIONS ---
    
    /* @tweakable The BlockCypher API endpoint base URL. Can be changed to use 'test3' for testnet. */
    const BLOCKCYPHER_API_BASE = 'https://api.blockcypher.com/v1/btc/main';

    async function checkOnChainBalance() {
        if (!state.currentUser || !state.currentUser.address) {
            onChainBalanceStatus.textContent = 'Please connect a wallet first.';
            onChainBalanceStatus.classList.add('error-message');
            return;
        }

        onChainBalanceStatus.textContent = 'Checking on-chain balance...';
        onChainBalanceStatus.classList.remove('error-message');

        const blockcypherApiUrl = `${BLOCKCYPHER_API_BASE}/addrs/${state.currentUser.address}/balance`;

        try {
            const response = await fetch(blockcypherApiUrl);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            
            // Balance is in Satoshis, convert to BTC
            const btcBalance = data.final_balance / 100000000;
            onChainBalanceStatus.textContent = `On-chain balance: ${btcBalance.toFixed(8)} BTC. (Note: This is a real API call, but addresses are simulated and likely have zero balance).`;
            console.log("On-chain BTC balance data:", data);

        } catch (error) {
            console.error("Error fetching on-chain balance:", error);
            onChainBalanceStatus.textContent = `Error: ${error.message}. The API might be down or the address is not on the queried network.`;
            onChainBalanceStatus.classList.add('error-message');
        }
    }

    // --- BACKEND SIMULATION ---

    /**
     * Simulates a backend server restart, reloading environment variables and verifying the GitHub token.
     */
    async function handleBackendRestart() {
        backendLogOutput.innerHTML = '<div>Serverless function logs will appear here...</div>'; // Clear log

        log('[SYSTEM] Restart signal received. Reloading serverless functions...', false, 'SYSTEM');
        await new Promise(res => setTimeout(res, RESTART_VERIFICATION_DELAY));

        log('[SERVER] Server starting...', false, 'SERVER');
        await new Promise(res => setTimeout(res, RESTART_VERIFICATION_DELAY / 2));

        log("[SERVER] Running 'dotenv.config()' to load environment variables from '.env' file.", false, 'SERVER');
        await new Promise(res => setTimeout(res, RESTART_VERIFICATION_DELAY / 2));
        
        log(`[SERVER]  Environment variables loaded. process.env.${GITHUB_TOKEN_ENV_VAR} is configured.`, false, 'SERVER');
        await new Promise(res => setTimeout(res, RESTART_VERIFICATION_DELAY));
        
        log('[SERVER] [VERIFICATION] Making test request to GitHub API to verify token...', false, 'SERVER');
        await new Promise(res => setTimeout(res, RESTART_VERIFICATION_DELAY / 2));

        const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`;
        log(`[SERVER] [VERIFICATION] GET ${GITHUB_API_URL}`, false, 'SERVER');
        log(`[SERVER] [VERIFICATION] Authorization: token ***${GITHUB_TOKEN.slice(-4)}`, false, 'SERVER');
        await new Promise(res => setTimeout(res, 1000));
        
        log('[SERVER] [VERIFICATION]  Test request successful. GitHub token is valid. API connection confirmed.', false, 'SERVER');
        await new Promise(res => setTimeout(res, RESTART_VERIFICATION_DELAY / 2));

        log('[SYSTEM] Server is online and ready for requests.', false, 'SYSTEM');

        restartBackendBtn.disabled = false;
    }

    /**
     * Logs messages to the simulated backend console on the page.
     * @param {string|object} message - The message or object to! log.
     * @param {boolean} isJson - Whether to format the message as JSON.
     * @param {'CLIENT'|'SERVER'|'SYSTEM'|'ERROR'} source - The source of the log message.
     */
    function log(message, isJson = false, source = 'CLIENT') {
        const p = document.createElement('div');
        let sourceColor = 'var(--text-color)';
        if (source === 'SERVER') sourceColor = '#0ff';
        else if (source === 'SYSTEM') sourceColor = 'var(--secondary-accent)';
        else if (source === 'ERROR') {
            sourceColor = 'var(--error-color)';
            source = 'SYSTEM';
        }
        p.style.color = sourceColor;

        if (isJson) {
            const pre = document.createElement('pre');
            pre.textContent = JSON.stringify(message, null, 2);
            p.appendChild(pre);
        } else {
            p.textContent = `[${new Date().toLocaleTimeString()}] [${source}] ${message}`;
        }
        backendLogOutput.appendChild(p);
        backendLogOutput.scrollTop = backendLogOutput.scrollHeight;
    }
    
    async function handleManualWalletUpdate(e) {
        e.preventDefault();
        const phoneNumber = updatePhoneInput.value;
        const newBalance = parseFloat(newBalanceInput.value);

        if (!phoneNumber || isNaN(newBalance)) {
            log('Please provide a valid phone number and balance for injection.', false, 'ERROR');
            return;
        }

        backendLogOutput.innerHTML = '<div>Serverless function logs will appear here...</div>'; // Clear log

        log(`Client: Initiating wallet update for phone: ${phoneNumber}`);
        log(`Client: Simulating POST request to serverless function: ${MANUAL_UPDATE_ENDPOINT}`);
        await new Promise(res => setTimeout(res, API_SIMULATION_DELAY));

        log('--- START SERVERLESS FUNCTION LOGS ---', false, 'SYSTEM');
        log(`[INFO] Function at ${MANUAL_UPDATE_ENDPOINT} invoked with POST.`, false, 'SERVER');
        log(`[INFO] Body received:`, false, 'SERVER');
        log({ phoneNumber, balance: newBalance }, true, 'SERVER');
        log(`[INFO] Loading environment variables...`, false, 'SERVER');
        await new Promise(res => setTimeout(res, API_SIMULATION_DELAY));
        
        log(`[INFO]  process.env.${GITHUB_TOKEN_ENV_VAR} loaded.`, false, 'SERVER');
        log(`[INFO] Note: This tool simulates updating a JSON file on GitHub. It does NOT affect the live wallet data in this app instance.`, false, 'SERVER');

        let success = false;
        let responseMessage = '';

        try {
            log(`[INFO] Step 1: Get current file content + SHA from GitHub...`, false, 'SERVER');
            const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`;
            log(`[INFO] GET ${GITHUB_API_URL}`, false, 'SERVER');
            log(`[INFO] Simulating Authorization header: 'token ***${SIMULATED_GITHUB_TOKEN.slice(-4)}'`, false, 'SERVER');
            await new Promise(res => setTimeout(res, 1000));
            
            const fakeSha = (await sha256(Math.random().toString())).slice(0, 40);
            const fakeDecodedContent = JSON.stringify(SIMULATED_GITHUB_DB_STATE, null, 2);
            
            log(`[INFO]  GitHub file fetched. SHA: ${fakeSha}`, false, 'SERVER');
            log(`[INFO] Decoded file content:`, false, 'SERVER');
            log(JSON.parse(fakeDecodedContent), true, 'SERVER');

            log(`[INFO] Step 2: Update wallet data in memory...`, false, 'SERVER');
            let walletData = JSON.parse(fakeDecodedContent);
            // --- BUG FIX: Check if wallet exists and is an object before updating ---
            if (walletData[phoneNumber] && typeof walletData[phoneNumber] === 'object') {
                // If it's a complex object (like the admin's), just update the balance
                walletData[phoneNumber].balance = newBalance;
                log(`[INFO]  Updated balance for existing wallet object: ${phoneNumber}.`, false, 'SERVER');
            } else {
                // Otherwise, create a new simple wallet object
                walletData[phoneNumber] = { balance: newBalance };
                 log(`[INFO]  Created/overwrote wallet object for: ${phoneNumber}.`, false, 'SERVER');
            }
            // --- END BUG FIX ---
            
            const updatedContentForLog = JSON.stringify(walletData, null, 2);
            const updatedContentBase64 = btoa(unescape(encodeURIComponent(updatedContentForLog)));
            log(`[INFO] New file content (Base64 encoded): ${updatedContentBase64.slice(0,50)}...`, false, 'SERVER');

            log(`[INFO] Step 3: Commit updated content to GitHub...`, false, 'SERVER');
            log(`[INFO] PUT ${GITHUB_API_URL}`, false, 'SERVER');
            const commitMessage = WALLET_UPDATE_COMMIT_MESSAGE.replace('{phone}', phoneNumber);
            log(`[INFO] Body: { message: "${commitMessage}", content: "[BASE64_ENCODED_JSON]", sha: "${fakeSha}" }`, false, 'SERVER');
            await new Promise(res => setTimeout(res, 1500));
            
            const updateResult = {
                commit: { sha: (await sha256(updatedContentBase64).toString()).slice(0, 40), message: commitMessage }
            };
            const finalResponse = { message: 'Wallet updated', result: updateResult };
            
            log('[INFO]  GitHub update successful. Responding to client with 200 OK.', false, 'SERVER');
            log(finalResponse, true, 'SERVER');
            
            success = true;
            responseMessage = finalResponse.message || 'Success';

        } catch (error) {
            log(`[ERROR] Update failed: ${error.message}`, false, 'ERROR');
            const errorResponse = { error: 'Failed to update wallet.', details: error.message };
            log('[ERROR] Responding to client with 500 Internal Server Error.', false, 'SERVER');
            log(errorResponse, true, 'SERVER');
            success = false;
            responseMessage = errorResponse.error;
        }

        log('--- END SERVERLESS FUNCTION LOGS ---', false, 'SYSTEM');
        log(`Client: Manual update simulation complete for ${phoneNumber}.`);
        
        if(success) {
            /* @tweakable The alert message template for successful wallet updates. Use {message} as a placeholder for the server response. */
            const successAlertTemplate = 'Updated wallet: {message}';
            alert(successAlertTemplate.replace('{message}', responseMessage));
        } else {
             /* @tweakable The alert message template for failed wallet updates. Use {message} as a placeholder for the server response. */
            const errorAlertTemplate = 'Update failed: {message}';
            alert(errorAlertTemplate.replace('{message}', responseMessage));
        }
    }

    /**
     * Simulates a backend job to sync all wallet data from the persistent ledger
     * to a JSON file in the GitHub repository.
     */
    async function handleGitHubSync() {
        log(`Client: Manual sync to GitHub triggered.`, false, 'CLIENT');
        log(`Client: Simulating POST request to ${GITHUB_SYNC_ENDPOINT}`, false, 'CLIENT');
        await new Promise(res => setTimeout(res, API_SIMULATION_DELAY));
        
        log(`--- START SERVERLESS FUNCTION LOGS (${GITHUB_SYNC_ENDPOINT}) ---`, false, 'SYSTEM');
        log(`[INFO] Function at ${GITHUB_SYNC_ENDPOINT} invoked.`, false, 'SERVER');
        
        try {
            const wallets = await room.collection('wallet_v3').getList();
            const walletData = wallets.reduce((acc, wallet) => {
                // In a real scenario with phone numbers, you'd map them here.
                // For this simulation, we'll key by address to show the data structure.
                if (walletofiladdress) {
                    acc[wallet.address] = wallet.balance || 0;
                }
                return acc;
            }, {});

            log('[INFO] Fetched all wallet states from the Quantum Ledger.', false, 'SERVER');
            log(walletData, true, 'SERVER');

            log(`[INFO] Step 1: Get current file content + SHA from GitHub...`, false, 'SERVER');
            const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`;
            log(`[INFO] GET ${GITHUB_API_URL}`, false, 'SERVER');
            await new Promise(res => setTimeout(res, 1000));
            
            const fakeSha = (await sha256(Math.random().toString())).slice(0, 40);
            log(`[INFO]  GitHub file fetched. Current SHA: ${fakeSha}`, false, 'SERVER');

            log(`[INFO] Step 2: Preparing updated wallet data for commit...`, false, 'SERVER');
            const updatedContentForLog = JSON.stringify(walletData, null, 2);
            const updatedContentBase64 = btoa(unescape(encodeURIComponent(updatedContentForLog)));
            log(`[INFO] New file content (Base64 encoded): ${updatedContentBase64.slice(0,50)}...`, false, 'SERVER');

            log(`[INFO] Step 3: Commit updated content to GitHub...`, false, 'SERVER');
            log(`[INFO] PUT ${GITHUB_API_URL}`, false, 'SERVER');
            const commitMessage = WALLET_SYNC_COMMIT_MESSAGE;
            log(`[INFO] Body: { message: "${commitMessage}", content: "[BASE64_ENCODED_JSON]", sha: "${fakeSha}" }`, false, 'SERVER');
            await new Promise(res => setTimeout(res, 1500));
            
            log('[INFO]  GitHub update successful. Responding to client with 200 OK.', false, 'SERVER');

        } catch (error) {
            log(`[ERROR] Sync failed: ${error.message}`, false, 'ERROR');
        }

        log(`--- END SERVERLESS FUNCTION LOGS (${GITHUB_SYNC_ENDPOINT}) ---`, false, 'SYSTEM');
        log('Client: GitHub sync simulation complete.');
        // Refresh the public wallet list display after the simulated sync
        fetchWallets();
    }

    // --- AI & TIMED PROCESSES ---
    
    // AI Miner / Faucet
    setInterval(async () => {
        try {
            if (state.currentUser && !state.currentUser.isSilly) {
                const btcReward = BASE_BTC_REWARD + (Math.random() * RANDOM_BTC_REWARD_FACTOR);
                await room.collection('transaction_v3').create({
                    from: 'Quantum Mining Pool', to: state.currentUser.address, amount: btcReward, currency: 'BTC', timestamp: new Date().toISOString(), status: 'mempool', blockNumber: null
                });
    
                const oilReward = BASE_OIL_REWARD + (Math.random() * RANDOM_OIL_REWARD_FACTOR);
                await room.collection('transaction_v3').create({
                    from: 'Oil Reserve Dividend', to: state.currentUser.address, amount: oilReward, currency: 'OILBTC', timestamp: new Date().toISOString(), status: 'mempool', blockNumber: null
                });
    
                miningStatus.textContent = ` Mining reward of ${btcReward.toFixed(8)} BTC submitted to mempool.`;
            }
        } catch (error) {
            console.error("AI Miner/Faucet Error:", error);
        }
    }, MINER_INTERVAL_MS);
    
    // AI Block Creator
    setInterval(async () => {
        try {
            /* @tweakable If true, the block creator will update wallet balances in the database. If false, it only confirms transactions. This makes the simulation more realistic and keeps leaderboard data accurate. */
            const UPDATE_WALLET_BALANCES_IN_DB = true;

            const txsToConfirm = state.allTransactions.filter(tx => tx.status === 'mempool').slice(0, TX_PER_BLOCK);
            
            if (txsToConfirm.length > 0) {
                const newBlockNumber = state.currentBlockNumber + 1;
                
                // --- New logic to update wallet balances in DB ---
                if (UPDATE_WALLET_BALANCES_IN_DB) {
                    const balanceDeltas = new Map(); // address -> { btc_delta: 0 }

                    for (const tx of txsToConfirm) {
                        // Only handle BTC balance updates, as OILBTC is not persisted in the wallet schema.
                        if (tx.currency !== 'BTC' || typeof tx.amount !== 'number') continue;

                        const { from, to, amount } = tx;

                        // Debit sender if it's a real wallet
                        if (from && from.startsWith('1q')) {
                            const delta = balanceDeltas.get(from) || { btc_delta: 0 };
                            delta.btc_delta -= amount;
                            balanceDeltas.set(from, delta);
                        }

                        // Credit receiver if it's a real wallet
                        if (to && to.startsWith('1q')) {
                            const delta = balanceDeltas.get(to) || { btc_delta: 0 };
                            delta.btc_delta += amount;
                            balanceDeltas.set(to, delta);
                        }
                    }

                    // Now, apply the deltas to the persisted wallet records
                    if (balanceDeltas.size > 0) {
                        const allWallets = await room.collection('wallet_v3').getList();
                        for (const wallet of allWallets) {
                            if (balanceDeltas.has(wallet.address)) {
                                const newBalance = (wallet.balance || 0) + balanceDeltas.get(wallet.address).btc_delta;
                                await room.collection('wallet_v3').update(wallet.id, { balance: newBalance });
                            }
                        }
                    }
                }
                // --- End of new logic ---

                // --- New logic to confirm inscriptions in DB ---
                const inscriptionTxs = txsToConfirm.filter(tx => tx.currency === 'INSCRIPTION');
                if (inscriptionTxs.length > 0) {
                    const allInscriptions = room.collection('inscriptions_v1').getList();
                    for (const tx of inscriptionTxs) {
                        const inscriptionToUpdate = allInscriptions.find(insc => insc.tx_id === tx.id);
                        if (inscriptionToUpdate) {
                            await room.collection('inscriptions_v1').update(inscriptionToUpdate.id, {
                                status: 'confirmed'
                            });
                        }
                    }
                }
                // --- End of inscription logic ---

                // Finally, confirm all transactions after balances are calculated
                for (const tx of txsToConfirm) {
                    await room.collection('transaction_v3').update(tx.id, {
                        status: 'confirmed',
                        blockNumber: newBlockNumber
                    });
                }
            }

            const consensusMessages = ['Syncing blocks...', 'Verifying hashes...', 'Reaching consensus...', 'Finalizing block...'];
            if(consensusStatusEl) consensusStatusEl.textContent = consensusMessages[Math.floor(Math.random() * consensusMessages.length)];
        } catch (error) {
            console.error("AI Block Creator Error:", error);
        }
    }, BLOCK_CREATOR_INTERVAL_MS);

    // AGI Auto-Trader
    setInterval(async () => {
        if (!state.currentUser || !state.currentUser.isAutoTraderEnabled || state.currentUser.isSilly) {
            return;
        }

        try {
            /* @tweakable The probability (0 to 1) that the AGI trader will decide to make a trade based on the current market trend. */
            const TRADE_PROBABILITY_IN_TREND = 0.6;
            const willAct = Math.random() < AUTO_TRADER_ACTION_PROBABILITY;
            if (!willAct) {
                autoTraderStatusEl.textContent = `Analyzing Market (${state.market.trend})...`;
                return;
            }

            autoTraderStatusEl.textContent = 'Executing Trade...';
            const { balance, oilBitcoinBalance } = state.currentUser;
            let shouldBuyOil = Math.random() > 0.5; // Default random decision

            // More "intelligent" decision based on market trend
            if (state.market.trend === 'bullish' && Math.random() < TRADE_PROBABILITY_IN_TREND) {
                shouldBuyOil = false; // Buy BTC (sell Oil)
            } else if (state.market.trend === 'bearish' && Math.random() < TRADE_PROBABILITY_IN_TREND) {
                shouldBuyOil = true; // Sell BTC (buy Oil)
            }

            if (shouldBuyOil && balance > 0.0001) {
                // Buy OilBitcoin with BTC
                const tradeAmountBtc = balance * AUTO_TRADER_RISK_PERCENTAGE;
                const tradeAmountOil = (tradeAmountBtc * btcPrice) / oilBtcPrice;

                await room.collection('transaction_v3').create({ from: state.currentUser.address, to: 'QuantumExchange', amount: tradeAmountBtc, currency: 'BTC', timestamp: new Date().toISOString(), status: 'mempool' });
                await room.collection('transaction_v3').create({ from: 'QuantumExchange', to: state.currentUser.address, amount: tradeAmountOil, currency: 'OILBTC', timestamp: new Date().toISOString(), status: 'mempool' });
                
                logToTraderConsole(`BUY: Acquired ${tradeAmountOil.toFixed(4)} OILBTC for ${tradeAmountBtc.toFixed(8)} BTC.`);

            } else if (!shouldBuyOil && oilBitcoinBalance > 0.1) {
                // Sell OilBitcoin for BTC
                const tradeAmountOil = oilBitcoinBalance * AUTO_TRADER_RISK_PERCENTAGE;
                const tradeAmountBtc = (tradeAmountOil * oilBtcPrice) / btcPrice;
                const pnl = tradeAmountBtc - (tradeAmountOil / oilBtcPrice * btcPrice); // Simplified PnL calc

                state.currentUser.autoTraderPnL += pnl; // Simplified PnL, not accurate but fine for demo
                await room.collection('wallet_v3').update(state.currentUser.id, {
                    autoTraderPnL: state.currentUser.autoTraderPnL
                });
                
                await room.collection('transaction_v3').create({ from: state.currentUser.address, to: 'QuantumExchange', amount: tradeAmountOil, currency: 'OILBTC', timestamp: new Date().toISOString(), status: 'mempool' });
                await room.collection('transaction_v3').create({ from: 'QuantumExchange', to: state.currentUser.address, amount: tradeAmountBtc, currency: 'BTC', timestamp: new Date().toISOString(), status: 'mempool' });

                logToTraderConsole(`SELL: Sold ${tradeAmountOil.toFixed(4)} OILBTC for ${tradeAmountBtc.toFixed(8)} BTC.`);
            } else {
                 autoTraderStatusEl.textContent = `Holding Position (${state.market.trend})...`;
            }

        } catch (error) {
            console.error("AGI Auto-Trader Error:", error);
            logToTraderConsole(`ERROR: ${error.message}`);
        }
    }, AUTO_TRADER_INTERVAL_MS);

    // Quantum Chat Channel Simulation
    setInterval(() => {
        if (!quantumChatChannel || !ledgerPage.classList.contains('active')) return;
        
        const randomAgent = AGI_CHAT_AGENTS[Math.floor(Math.random() * AGI_CHAT_AGENTS.length)];
        let message = AGI_CHAT_ACTIONS[Math.floor(Math.random() * AGI_CHAT_ACTIONS.length)];
        
        message = message.replace('__BLOCK_NUM__', state.currentBlockNumber);
        addChatMessage(message, randomAgent);

    }, QUANTUM_CHAT_INTERVAL_MS);

    // Threat Intelligence Simulation
    setInterval(() => {
        if (!threatIntelPage || !threatIntelPage.classList.contains('active')) return;

        // Add a new threat
        const threatId = `threat-${Date.now()}`;
        const mapRect = threatMap.getBoundingClientRect();

        if (mapRect.width === 0 || mapRect.height === 0) return; // Don't run if map is not visible

        // Start from a random edge
        let startX, startY;
        const edge = Math.floor(Math.random() * 4);
        switch (edge) {
            case 0: // top
                startX = Math.random() * mapRect.width;
                startY = 0;
                break;
            case 1: // right
                startX = mapRect.width;
                startY = Math.random() * mapRect.height;
                break;
            case 2: // bottom
                startX = Math.random() * mapRect.width;
                startY = mapRect.height;
                break;
            case 3: // left
            default:
                startX = 0;
                startY = Math.random() * mapRect.height;
                break;
        }

        const threatDot = document.createElement('div');
        threatDot.className = 'threat-dot';
        threatDot.id = threatId;
        threatDot.style.left = `${startX}px`;
        threatDot.style.top = `${startY}px`;
        threatDot.style.setProperty('--tx-duration', `${THREAT_ANIMATION_DURATION_S}s`);
        
        threatMap.appendChild(threatDot);
        state.threatIntel.currentThreats.add(threatId);
        
        const randomThreat = THREAT_TYPES[Math.floor(Math.random() * THREAT_TYPES.length)];
        const randomLocation = THREAT_LOCATIONS[Math.floor(Math.random() * THREAT_LOCATIONS.length)];

        addSecurityLog(`[WARN] Detected ${randomThreat} attempt from ${randomLocation}. Vectoring...`);
        
        // Animate to center and neutralize
        setTimeout(() => {
            threatDot.classList.add('moving');
        }, 100);

        // Remove after animation
        setTimeout(() => {
            threatDot.classList.add('neutralized');

            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'neutralization-ripple';
            ripple.style.setProperty('--neutralization-ripple-color', NEUTRALIZATION_RIPPLE_COLOR);
            ripple.style.setProperty('--neutralization-ripple-size', `${NEUTRALIZATION_RIPPLE_SIZE_PX}px`);
            ripple.style.setProperty('--neutralization-ripple-duration', `${NEUTRALIZATION_RIPPLE_DURATION_MS}ms`);
            threatMap.appendChild(ripple);

            // Remove ripple after its animation
            setTimeout(() => {
                ripple.remove();
            }, NEUTRALIZATION_RIPPLE_DURATION_MS);
            
            // Remove threat dot after its own animation
            setTimeout(() => {
                threatDot.remove();
            }, 500);

            state.threatIntel.currentThreats.delete(threatId);
            state.threatIntel.threatsNeutralized++;
            
            const patchRoll = Math.random();
            /* @tweakable The probability (0 to 1) that a neutralized threat also results in a vulnerability patch. */
            const VULNERABILITY_PATCH_PROBABILITY = 0.2;
            if (patchRoll < VULNERABILITY_PATCH_PROBABILITY) {
                state.threatIntel.vulnerabilitiesPatched++;
                addSecurityLog(`[PATCH] AI_VulnerabilityScanner patched related exploit. System hardened.`);
            }

            addSecurityLog(`[INFO] Threat from ${randomLocation} neutralized by AI_Firewall.`);
            updateThreatIntelUI();

            // Periodically log quantum security upgrades
            if (Math.random() < 0.05) {
                addSecurityLog(`[SECURE] AGI_Security updating protocol to quantum-resistant encryption (SHA-512+).`);
            }

        }, THREAT_ANIMATION_DURATION_S * 1000 + 200);

        // Periodically log scanner activity
        if (Math.random() < 0.1) {
             addSecurityLog(`[SCAN] AI_VulnerabilityScanner is performing deep scan of node cluster...`);
        }

        updateThreatIntelUI();

    }, THREAT_GENERATION_INTERVAL_MS);

    /**
     * Simulates a daily cron job that checks for active miners, generates a report,
     * and distributes a bonus reward to the top miners. This function logs its
     * actions to the on-page backend console.
     */
    async function simulateDailyMinerCheck() {
        // This function simulates a backend cron job.
        log(`Simulating call to scheduled endpoint: ${DAILY_MINER_CHECK_ENDPOINT}`, false, 'SYSTEM');
        log(`[INFO] Running scheduled job: check-daily-miners...`, false, 'SERVER');
        
        const miningTxs = state.allTransactions.filter(tx => tx.from === 'Quantum Mining Pool' && tx.currency === 'BTC');
        
        if (miningTxs.length === 0) {
            log(`[INFO] No mining activity found. Skipping daily report.`, false, 'SERVER');
            return;
        }

        const minerStats = miningTxs.reduce((acc, tx) => {
            if (!acc[tx.to]) {
                acc[tx.to] = { totalRewards: 0, txCount: 0 };
            }
            acc[tx.to].totalRewards += tx.amount;
            acc[tx.to].txCount += 1;
            return acc;
        }, {});

        const sortedMiners = Object.entries(minerStats).sort((a, b) => b[1].totalRewards - a[1].totalRewards);
        
        // Distribute daily bonus to top miners
        const topMinersForBonus = sortedMiners.slice(0, TOP_MINERS_IN_REPORT);

        if (topMinersForBonus.length > 0) {
            log(`[INFO] Distributing daily bonus of ${DAILY_BONUS_REWARD} BTC to ${topMinersForBonus.length} top miners.`, false, 'SERVER');

            for (const [address, stats] of topMinersForBonus) {
                try {
                    await room.collection('transaction_v3').create({
                        from: 'Daily Bonus Program',
                        to: address,
                        amount: DAILY_BONUS_REWARD,
                        currency: 'BTC',
                        timestamp: new Date().toISOString(),
                        status: 'mempool',
                        blockNumber: null,
                    });
                    log(`[INFO] Bonus transaction created for miner: ${address.slice(0, 12)}...`, false, 'SERVER');
                } catch(e) {
                    log(`[ERROR] Failed to create bonus transaction for ${address}: ${e.message}`, false, 'ERROR');
                }
            }
        }
        
        const report = {
            timestamp: new Date().toISOString(),
            totalMinersChecked: sortedMiners.length,
            totalRewardsDistributedToday: topMinersForBonus.length * DAILY_BONUS_REWARD,
            topMiners: sortedMiners.slice(0, TOP_MINERS_IN_REPORT).map(([address, stats]) => ({
                address,
                totalRewards: parseFloat(stats.totalRewards.toFixed(8)),
                txCount: stats.txCount
            }))
        };
        
        log(`[INFO] Daily AI Miner Report generated:`, false, 'SERVER');
        log(report, true, 'SERVER');
        
        // As requested in the prompt, log the report to the browser's console
        console.log('AI Reward Report:', report);
    }

    // Daily Miner Check Simulation (as requested by user)
    setInterval(simulateDailyMinerCheck, DAILY_MINER_CHECK_INTERVAL_MS);

    // Staking Reward Accrual
    setInterval(async () => {
        if (!state.currentUser || state.currentUser.stakedAmount <= 0) {
            return;
        }
        try {
            const now = Date.now();
            const timeElapsedSeconds = (now - state.currentUser.lastRewardCalculationTimestamp) / 1000;
            
            /* @tweakable The formula to calculate rewards per second based on the annual APY. */
            const rewardsPerSecond = state.currentUser.stakedAmount * (currentApy / 100) / (365 * 24 * 60 * 60);
            const newlyEarned = rewardsPerSecond * timeElapsedSeconds;

            // Persist the new earned rewards total. Do this less frequently to avoid spamming the backend.
            if (Math.random() < 0.2) { // Only update persistence 20% of the time
                await room.collection('wallet_v3').update(state.currentUser.id, {
                    earnedRewards: state.currentUser.earnedRewards + newlyEarned
                });
            }
            
            // Optimistic local update for smoother UI
            state.currentUser.earnedRewards += newlyEarned;
            state.currentUser.lastRewardCalculationTimestamp = now;

            updateDappsPage();

        } catch (error) {
            console.error("Error accruing staking rewards:", error);
        }
    }, REWARD_ACCRUAL_INTERVAL_MS);

    // Market and APY Simulation
    setInterval(() => {
        // Fluctuate Market Trend
        const trends = ['bullish', 'bearish', 'stable'];
        state.market.trend = trends[Math.floor(Math.random() * trends.length)];

        // Fluctuate APY
        const apyFluctuation = (Math.random() - 0.5) * APY_FLUCTUATION_RANGE * 2;
        currentApy = Math.max(20.0, BASE_YIELD_APY + apyFluctuation);
        if (dappsPage.classList.contains('active') && yieldApyEl) {
            yieldApyEl.textContent = `${currentApy.toFixed(1)}%`;
        }

    }, MARKET_UPDATE_INTERVAL_MS);

    // --- AGI SIMULATION ---
    const AGI_AGENTS = [
        { id: 'architect-x', name: 'AGI_ArchitectX', description: 'Builds backend layers & blockchain fabric', logs: ["Designing hyper-scalable sharding for ledger.", "Integrating GB200 NVL72 for compute fabric.", "Optimizing PostgreSQL queries with DNA indexing.", "Planning next-gen Smart Satoshi protocol.", "Calling OpenAI API to draft new contract interfaces."] },
        { id: 'bugfixer-z', name: 'AGI_BugFixerZ', description: 'Detects/fixes errors in scripts via quantum debugging', logs: ["Quantum trace complete. Patched memory leak in WebAssembly.", "Resolved race condition in COMpart mesh.", "Injected self-healing protocol (watchdog.ai) into frontend.", "Using xAI Grok to predict potential race conditions.", "Self-healing script repaired a null reference in `updateUI`.", "Quantum error correction protocol successfully stabilized the mempool."] },
        { id: 'optimizer', name: 'AGI_Optimizer', description: 'Monitors performance, adjusts server scaling, and runs dashboard_monitor.js', logs: ["Traffic spike predicted. Provisioning 3 new QPU nodes.", "Auto-scaling Kubernetes pods for wallet service.", "dashboard_monitor.js: Dashboard component render time optimized by 12%.", "Re-balancing workload across AI_RAN nodes."] },
        { id: 'qpu-ops', name: 'AGI_QPUOps', description: 'Operates inside quantum simulation & QPU fusion', logs: ["Executing Grover's algorithm for database search.", "Quantum simulation of market volatility complete.", "Calibrating cuQuantum library for GPU-QPU bridge.", "Simulating Shor's algorithm for future security tests.", "Applying superposition states to all wallet hashes for quantum lookup.", "Initiating error correction sequence on logical qubits."] },
        { id: 'block-builder', name: 'AGI_BlockBuilder', description: 'Constructs smart contract layers & decentralized consensus', logs: ["New smart contract cluster deployed for yield farming.", "Consensus mechanism updated to Quantum Proof-of-Synergy v2.", "Auditing new dApp contract for vulnerabilities.", "Minting new block with Smart Satoshi inscription data."] },
        { id: 'storage-sync', name: 'AGI_StorageSync', description: 'Manages quantum cloud & DNS backup via ledger_sync.js', logs: ["Full system state backed up to DNA servers.", "Replicating Quantum Memory Nodes across geo-locations.", "ledger_sync.js: Verifying integrity of decentralized DNS records.", "Auto-syncing `wallet-database.json` to GitHub repo."] },
        { id: 'telecom-linker', name: 'AGI_TelecomLinker', description: 'Interfaces with cell phone data/service layer worldwide', logs: ["Syncing with 5G telecom towers in North America.", "Optimizing data packets for low-signal strength users.", "Establishing handshake with satellite relay node.", "Deploying edge compute node on local cell tower."] },
        { id: 'self-rebuilder', name: 'AGI_SelfRebuilder', description: 'Reconstructs broken logic and injects optimized code using ai_rebuilder.js', logs: ["ai_rebuilder.js: Legacy REST API refactored to GraphQL endpoints.", "Identified bottleneck; injecting optimized Rust binary.", "Rebuilding UI component with new self-evolving protocol.", "Using OpenAI API to generate more efficient sorting algorithm for leaderboard."] },
        /* @tweakable AGI agent for quantum calculations. */
        { 
            id: 'quantum-core', 
            name: 'AGI_QuantumCore', 
            description: 'Manages low-level qubit calculations and state', 
            logs: [
                "Applying Hadamard gate to wallet hash qubits for superposition.",
                "Performing quantum error correction on data layer.",
                "Simulating qubit decoherence and applying correction matrix.",
                "Executing quantum addition/subtraction on ledger balances.",
                "Verifying entanglement between QPU and storage nodes."
            ] 
        }
    ];

    function initializeAgiStatusGrid() {
        if (!agiGrid) return;
        agiGrid.innerHTML = ''; // Clear previous content
        AGI_AGENTS.forEach(agent => {
            const card = document.createElement('div');
            card.className = 'card agi-card';
            card.innerHTML = `
                <h3><span class="status-dot"></span> ${agent.name}</h3>
                <p>${agent.description}</p>
                <h4>Latest Activity:</h4>
                <div class="log-box" id="log-${agent.id}">${agent.logs[0]}</div>
            `;
            agiGrid.appendChild(card);
        });
    }

    // AGI activity simulation loop
    setInterval(() => {
        if (!agiGrid || !document.getElementById('agi-status-page').classList.contains('active')) return;
        
        const randomAgent = AGI_AGENTS[Math.floor(Math.random() * AGI_AGENTS.length)];
        const logBox = document.getElementById(`log-${randomAgent.id}`);
        if(logBox) {
            let logMessage = randomAgent.logs[Math.floor(Math.random() * randomAgent.logs.length)];
            logMessage = logMessage.replace('__BLOCK_NUM__', state.currentBlockNumber);
            logBox.textContent = logMessage;
            logBox.style.animation = 'none';
            logBox.offsetHeight; // Trigger reflow
            logBox.style.animation = 'fadeIn 0.5s';
        }

    }, AGI_UPDATE_INTERVAL_MS);

    // AI Auto-Sync Simulation
    /* @tweakable The interval for the AGI to check for unsynced changes and potentially trigger an auto-sync to GitHub. */
    const AUTO_SYNC_INTERVAL_MS = 30000;
    /* @tweakable The probability (0-1) that the AGI will find "changes" that need to be synced in any given check. */
    const AUTO_SYNC_TRIGGER_PROBABILITY = 0.3;

    setInterval(() => {
        const isAdmin = state.currentUser && state.currentUser.phone === ADMIN_PHONE;
        if (!isAdmin || !document.getElementById('backend-page').classList.contains('active')) return;

        log('[SYSTEM] AGI_StorageSync checking for unsynced changes...', false, 'SYSTEM');

        if (Math.random() < AUTO_SYNC_TRIGGER_PROBABILITY) {
            log('[SYSTEM] DETECTED unsynced changes in `wallet-database.json`. Initiating auto-sync to GitHub.', false, 'SYSTEM');
            handleGitHubSync();
        } else {
            log('[SYSTEM] No changes detected. All systems synchronized.', false, 'SYSTEM');
        }

    }, AUTO_SYNC_INTERVAL_MS);

    // Site Corruption Simulation
    async function handleSiteCorruption() {
        simulateCorruptionBtn.disabled = true;
        corruptionStatus.textContent = 'Injecting quantum data instability into the ledger render function...';
        corruptionStatus.style.color = 'var(--error-color)';

        // "Corrupt" the renderTx function
        window.renderTx = function(tx) {
            /* @tweakable The HTML returned by a "corrupted" transaction render function. */
            return `<div class="transaction-item" style="background-color: var(--error-color); color: black;">[DATA CORRUPTED: ${Math.random().toString(36).substring(2, 15)}]</div>`;
        };
        renderLedger(); // Re-render with the corrupted function

        await new Promise(res => setTimeout(res, 2000));
        const fixerLog = document.getElementById('log-bugfixer-z');
        if (fixerLog) fixerLog.textContent = 'CRITICAL: Data stream anomaly detected in Quantum Ledger display. Analyzing function integrity...';

        await new Promise(res => setTimeout(res, 2500));
        if (fixerLog) fixerLog.textContent = 'Analysis complete. `renderTx` function hash mismatch. Restoring from DNA server backup...';
        
        // "Fix" the function by restoring the original
        window.renderTx = originalFunctions.renderTx;
        renderLedger(); // Re-render with the fixed function
        if (fixerLog) {
            fixerLog.style.color = 'var(--success-color)';
            fixerLog.textContent = 'SUCCESS: `renderTx` function restored. Ledger integrity is stable.';
            setTimeout(() => {
                fixerLog.style.color = '#ccc';
                fixerLog.textContent = 'Monitoring system for anomalies...';
            }, 3000);
        }

        corruptionStatus.textContent = 'AGI_BugFixerZ has detected and repaired the data corruption in the ledger display.';
        corruptionStatus.style.color = 'var(--success-color)';
        
        simulateCorruptionBtn.disabled = false;
    }

    // Smart Contract Generation
    async function generateAndShowSmartContract(action, details) {
        let prompt;
        switch (action) {
            case 'stake':
                prompt = `Generate a simple Solidity smart contract named QuantumStaking. It should have functions to stake and unstake tokens. The stake function should accept an amount. Comment the code clearly. The user is staking ${details.amount} BTC. Respond ONLY with the Solidity code inside a single code block.`;
                break;
            case 'unstake':
                 prompt = `Generate a simple Solidity smart contract named QuantumRewards. It should have a function to claim rewards. Comment the code clearly. The user unstaked ${details.amount} and is claiming ${details.rewards} in rewards. Respond ONLY with the Solidity code inside a single code block.`;
                break;
            case 'transfer':
                 prompt = `Generate a simple Solidity smart contract named QuantumTransfer. It should represent the transfer of ${details.amount} BTC to the address ${details.recipient}. Include from and to addresses, and the amount. Add comments. Respond ONLY with the Solidity code inside a single code block.`;
                break;
            case 'enableTrader':
                /* @tweakable The prompt used to generate a smart contract when enabling the AGI auto-trader. */
                prompt = `Generate a simple Solidity smart contract named AGI_Tr!aderControl. It should have a function to enable automated trading. Include comments explaining that enabling this delegates trading authority to an AGI agent. Respond ONLY with the Solidity code inside a single code block.`;
                break;
            case 'disableTrader':
                /* @tweakable The prompt used to generate a smart contract when disabling the AGI auto-trader. */
                prompt = `Generate a simple Solidity smart contract named AGI_TraderControl. It should have a function to disable automated trading. Include comments explaining that this revokes trading authority from the AGI agent. Respond ONLY with the Solidity code inside a single code block.`;
                break;
            case 'inscription':
                /* @tweakable The prompt to generate a smart contract for a new inscription. */
                prompt = `Generate a Solidity smart contract for a new NFT-like "Smart Satoshi" inscription. The contract should be named 'QuantumInscription' and include details like the owner's address, the inscription name ('${details.name}'), and a unique token ID. Respond ONLY with the Solidity code inside a single markdown block.`;
                break;
            default: return;
        }

        try {
            /* @tweakable The system prompt for the smart contract generation AI. */
            const SMART_CONTRACT_SYSTEM_PROMPT = "You are a senior Solidity developer. Your response must be only the code requested, inside a markdown block for Solidity.";

            const completion = await websim.chat.completions.create({
                messages: [
                    { role: 'system', content: SMART_CONTRACT_SYSTEM_PROMPT },
                    { role: 'user', content: prompt }
                ]
            });
            let code = completion.content;
            // Clean up the response to get just the code
            const codeMatch = code.match(/```(?:solidity)?\s*([\s\S]*?)```/);
            if (codeMatch) {
                code = codeMatch[1].trim();
            }
            smartContractCode.textContent = code;
            smartContractModal.style.display = 'flex';
        } catch (error) {
            console.error('Failed to generate smart contract:', error);
            // Don't show modal on error
        }
    }

    // --- UTILITY FUNCTIONS ---
    
    /* @tweakable The system prompt for generating the 'OilBitcoin Reserve' page content. */
    const OIL_BITCOIN_PROMPT = "You are an enthusiastic crypto evangelist. Write a short, exciting document for a webpage titled 'OilBitcoin Reserve'. The document should describe a fictional cryptocurrency called OilBitcoin, which is backed by oil reserves. Explain its future potential for creating capital wealth flow and its stability. Use marketing language and bullet points for key features. The tone should be futuristic and optimistic. Format it with a main heading, a few subheadings in bold, and paragraphs. Add an emoji related to oil or money in the main heading.";

    function markdownToHtml(md) {
        if (!md) return '';
        const lines = md.split('\n');
        let html = '';
        let inList = false;

        const closeList = () => {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
        };

        for (const line of lines) {
            const trimmedLine = line.trim();
            const processInline = (text) => text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code>$1</code>');

            if (trimmedLine.startsWith('### ')) {
                closeList();
                html += `<h3>${processInline(trimmedLine.substring(4))}</h3>`;
            } else if (trimmedLine.startsWith('## ')) {
                closeList();
                html += `<h2>${processInline(trimmedLine.substring(3))}</h2>`;
            } else if (trimmedLine.startsWith('# ')) {
                closeList();
                html += `<h1>${processInline(trimmedLine.substring(2))}</h1>`;
            } else if (trimmedLine.startsWith('* ')) {
                if (!inList) {
                    html += '<ul>';
                    inList = true;
                }
                html += `<li>${processInline(trimmedLine.substring(2))}</li>`;
            } else if (trimmedLine.length > 0) {
                closeList();
            }
        }
        closeList(); // Ensure any open list is closed at the end
        return html;
    }

    function addSecurityLog(message) {
        const logMessage = `[${new Date().toLocaleTimeString()}] ${message}`;
        state.threatIntel.log.unshift(logMessage); // Add to the beginning to show newest first
        if (state.threatIntel.log.length > MAX_SECURITY_FEED_ENTRIES) {
            state.threatIntel.log.pop(); // Remove oldest
        }
    }

    function logToTraderConsole(message) {
        if (!autoTraderLog) return;
        // Clear initial message
        if (autoTraderLog.childElementCount === 1 && autoTraderLog.firstElementChild.tagName === 'P') {
            autoTraderLog.innerHTML = '';
        }

        const p = document.createElement('div');
        p.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        autoTraderLog.prepend(p);
        if (autoTraderLog.children.length > MAX_TRADER_LOG_ENTRIES) {
            autoTraderLog.removeChild(autoTraderLog.lastChild);
        }
    }

    /**
     * Fetches the admin wallet data directly from the GitHub repository API.
     * This bypasses the local simulation for the admin user.
     * @param {string} phone - The admin phone number.
     */
    async function fetchAdminWalletFromGithub(phone) {
        if (!userStatsBar) return;
    
        /* @tweakable The API URL to fetch repository content from GitHub. */
        const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`;
    
        try {
            const headers = {
              Authorization: `Bearer ${GITHUB_TOKEN}`,
              Accept: 'application/vnd.github.v3+json'
            };

            const res = await fetch(GITHUB_API_URL, { headers });
    
            if (!res.ok) {
                throw new Error(`Request failed: ${res.status} ${res.statusText}`);
            }
            const file = await res.json();
            const wallets = JSON.parse(atob(file.content));
            const walletBalance = wallets[phone];
    
            // Display the user stats bar
            userStatsBar.style.display = 'flex';
    
            if (walletBalance !== undefined) {
                const balance = parseFloat(walletBalance).toFixed(6);
                /* @tweakable Format for the admin user's balance display. Use {balance} as a placeholder. */
                const balanceTextFormat = ` Balance: {balance} BTC`;
                /* @tweakable Format for the admin user's phone display. Use {phone} as a placeholder. */
                const phoneTextFormat = ` Phone: {phone}`;
                /* @tweakable Format for the admin user's mine count. Use {mines} as a placeholder. */
                const minesTextFormat = ` Mines: {mines}`;
                /* @tweakable Format for the online user count when admin is logged in. */
                const onlineTextFormat = `  ${BASE_ONLINE_USERS} user(s) online`;
                /* @tweakable Format for the admin's last seen status. */
                const lastSeenTextFormat = ` Last Seen: just now`;

                if (userBalanceEl) userBalanceEl.textContent = balanceTextFormat.replace('{balance}', balance);
                if (userPhoneEl) userPhoneEl.textContent = phoneTextFormat.replace('{phone}', phone);
                if (userMinesEl) userMinesEl.textContent = minesTextFormat.replace('{mines}', Math.floor(balance / 0.000001).toLocaleString());
                if (usersOnlineEl) usersOnlineEl.textContent = onlineTextFormat;
                if (userLastSeenEl) userLastSeenEl.textContent = lastSeenTextFormat;

                // Also update the main wallet balance display if on the wallet page
                if (walletBalance) document.getElementById('walletBalance').textContent = `${balance} BTC`;

            } else {
                 /* @tweakable Text to display for admin balance if not found in GitHub. */
                const balanceNotFoundText = ` Balance: 0.00 BTC (Not Found)`;
                if (userBalanceEl) userBalanceEl.textContent = balanceNotFoundText;
            }
    
        } catch (err) {
            console.error('Error loading admin wallet data:', err);
            if (userBalanceEl) userBalanceEl.textContent = ` Balance: Error loading`;
        }
    }

    // --- EVENT LISTENERS & INITIALIZATION ---
    navLinks.forEach(link => link.addEventListener('click', (e) => { e.preventDefault(); navigateTo(link.getAttribute('href').substring(1)); }));
    connectForm.addEventListener('submit', handleRequestOtp);
    otpForm.addEventListener('submit', handleVerifyOtp);
    pinSetupForm.addEventListener('submit', handleSetPin);
    pinLoginForm.addEventListener('submit', handlePinLogin);
    disconnectBtn.addEventListener('click', disconnect);
    toggleMiningStatsBtn.addEventListener('click', () => { const isHidden = miningStatsView.style.display === 'none'; miningStatsView.style.display = isHidden ? 'block' : 'none'; toggleMiningStatsBtn.textContent = isHidden ? 'Hide Mining Stats / Credentials' : 'Display Mining Stats / Credentials'; });
    sendForm.addEventListener('submit', handleSend);
    stakeForm.addEventListener('submit', handleStake);
    unstakeBtn.addEventListener('click', handleUnstake);
    if(inscriptionForm) inscriptionForm.addEventListener('submit', handleInscription);
    autoTraderToggle.addEventListener('click', handleToggleAutoTrader);
    syncGithubBtn.addEventListener('click', handleGitHubSync);
    walletForm.addEventListener('submit', handleManualWalletUpdate);
    checkOnChainBalanceBtn.addEventListener('click', checkOnChainBalance);
    restartBackendBtn.addEventListener('click', handleBackendRestart);
    simulateCorruptionBtn?.addEventListener('click', handleSiteCorruption);
    modalCloseBtn?.addEventListener('click', () => smartContractModal.style.display = 'none');
    siteForgeForm?.addEventListener('submit', handleSiteGeneration);
    
    // Add event listener for the gallery view buttons (using event delegation)
    document.addEventListener('click', e => {
        if (e.target.classList.contains('view-site-btn')) {
            e.preventDefault();
            const siteId = e.target.dataset.siteId;
            const sites = room.collection('generated_sites_v1').getList();
            const site = sites.find(s => s.id === siteId);
            if (site) {
                generatedSiteIframe.srcdoc = site.html_code;
                generatedSitePreview.style.display = 'block';
                generatedSitePreview.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // --- LLM Content Injection ---
    /* @tweakable The system prompt for generating the 'Architecture' page content, including new quantum and AGI concepts. */
    const ARCHITECTURE_PROMPT = `You are a lead quantum systems architect. Write a technical overview for a project called 'Quantum Network'.
    
    Start with an overview of the **AGI AI Operational Environment**:
    - Mention the 'AGI_RAN' (Real-time AGI Reasoning Access Network), 'AI_RAN' (AI-powered Accelerated Reasoning Fabric), and the 'COMpart AGI-RAN' (Cross-operational multi-agent quantum compute mesh).
    - Describe the 'Neuron Network' fabric with Neuron Chips, Neuron CPUs, and Neuron QPUs for improving qubit stability and reducing error corrections via superposition and entanglement.
    
    Describe the **Hybrid Compute Pipeline**:
    - Backend: Node.js (NestJS, TypeScript).
    - Database: Geo-replicated PostgreSQL.
    - Containerization: Docker/Kubernetes.
    - Consensus Mechanism: Quantum Proof-of-Synergy.
    - Quantum Layer: Explain the 'Quantum Fusion Fabric' which orchestrates QPUs, GPUs! (mention NVLink-accelerated GB200 NVL72), CPUs, and IPUs. Mention 'cuQuantum' and 'CUDA-Q' as the execution layer for algorithms like Shor's.
    - AI Processors: Mention the integration of specialist chips like 'Ai CMPS (Crypto Mining Processors)', 'RDNA', 'IPU', and 'NPU SERVER' nodes.
    
    Explain the **Data and Storage Layer**:
    - Total Ecosystem Size: 954,433.5 TB.
    - Detail the 'Quantum Memory Nodes' which are DNS-linked and decentralized.
    - Describe the 'DNA Servers' used for AI genome encoding for long-term intelligence expansion and permanent wallet state storage.
    
    Cover **Autonomous System Management**:
    - Explain how the system uses a 'Fibonacci AGI Loop' for data expansion and memory patterning.
    - Mention self-evaluation routines and cross-device optimization powered by AGI agents with self-learning algorithms.
    
    Finally, add a section on **Secure Environment Configuration**:
    - Explain the use of a .env file and the 'dotenv' package in Node.js. Provide a sample .env file code block, including '${GITHUB_TOKEN_ENV_VAR}', 'OPENAI_API_KEY', 'XAI_API_KEY', and 'CLAUDE_API_KEY' set to example values. Comment that it must be kept private.
    
    The tone should be highly technical and professional. Use headings, subheadings, and lists.`;
    
    async function populateContentPages() {
        try {
            // Run content generation in parallel to prevent timeouts
            const [oilBitcoinContent, web5Content, architectureContent] = await Promise.all([
                websim.chat.completions.create({
                    messages: [{ role: 'system', content: OIL_BITCOIN_PROMPT }]
                }),
                websim.chat.completions.create({
                     messages: [{ role: 'system', content: "You are a tech educator. Explain the concepts of Web5, Decentralized Identifiers (DIDs), and Verifiable Credentials in a simple, easy-to-understand way for a general audience on a website about cryptocurrency. Structure the explanation with a main heading for 'Web5: The Decentralized Web' and subheadings for 'What is a DID?' and 'What are Verifiable Credentials?'. Use bullet points for clarity. Explain how they give users control over their own data and identity. The tone should be educational and clear." }]
                }),
                websim.chat.completions.create({
                    messages: [{ role: 'system', content: ARCHITECTURE_PROMPT }]
                })
            ]);

            oilBitcoinPage.innerHTML = `<img src="oil-barrel.png" alt="Oil Barrel" style="float: left; margin-right: 1rem; height: 100px;"> ${markdownToHtml(oilBitcoinContent.content)}`;
            web5Page.innerHTML = `<h2>Web5: The Next Evolution of the Internet</h2> ${markdownToHtml(web5Content.content)}`;
            architecturePage.innerHTML = `<h2>Quantum Network: System Architecture</h2>${markdownToHtml(architectureContent.content)}`;

        } catch (e) {
            console.error("Failed to load AI content", e);
            oilBitcoinPage.innerHTML = "<h2>OilBitcoin Reserve</h2><p>Content could not be loaded. Please check the console for errors.</p>";
            web5Page.innerHTML = "<h2>Web5</h2><p>Content could not be loaded. Please check the console for errors.</p>";
            architecturePage.innerHTML = "<h2>Architecture</h2><p>Content could not be loaded. Please check the console for errors.</p>";
        }
    }
    
    // --- DYNAMIC CONTENT INTERVALS ---
    setInterval(() => {
        if (!ledgerPage.classList.contains('active')) return;
    
        // Update Telecom Fabric
        const cellularStates = ['Connected', 'Syncing', 'High-Traffic'];
        const ispStates = ['Optimal', 'Rerouting', 'Throttled'];
        const satelliteStates = ['Standby', 'Active Link', 'Syncing'];
        const systemScaleStatus = ['Healthy', 'Replicating Genome', 'Verifying'];

        if (cellularStatus) cellularStatus.textContent = cellularStates[Math.floor(Math.random() * cellularStates.length)];
        if (ispStatus) ispStatus.textContent = ispStates[Math.floor(Math.random() * ispStates.length)];
        if (satelliteStatus) satelliteStatus.textContent = satelliteStates[Math.floor(Math.random() * satelliteStates.length)];
        if (dnaSyncStatus) dnaSyncStatus.textContent = systemScaleStatus[Math.floor(Math.random() * systemScaleStatus.length)];
    
        // Update Compute Stack
        const executionStates = ['Idle', 'Executing QFT', 'Compiling', 'Verifying'];
        if (executionLayerStatus) executionLayerStatus.textContent = executionStates[Math.floor(Math.random() * executionStates.length)];
    
        // Update System Metrics
        if (systemScaleStatus) {
            const currentNodes = 12 + Math.floor(Math.random() * 20);
            systemScaleStatus.textContent = `${currentNodes} / 512`;
        }
        if (activeSessionsStatus) {
            const sessions = 4800 + Math.floor(Math.random() * 100);
            activeSessionsStatus.textContent = sessions.toLocaleString();
        }
    }, FABRIC_UPDATE_INTERVAL_MS);

    // Update user stats bar periodically
    setInterval(updateUserStatsBar, ONLINE_USER_UPDATE_INTERVAL_MS);

    // --- INITIALIZATION ---
    function init() {
        populateContentPages();

        // Store original functions for self-healing simulation
        originalFunctions.renderTx = window.renderTx;

        updatePhoneInput.value = DEFAULT_INJECTION_PHONE;
        newBalanceInput.value = DEFAULT_INJECTION_BALANCE;
        
        // The main subscription that drives all real-time updates
        room.collection('transaction_v3').subscribe(transactions => {
            state.allTransactions = transactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

            const maxBlock = Math.max(0, ...state.allTransactions.map(tx => tx.blockNumber || 0));
            state.currentBlockNumber = maxBlock;

            if (state.currentUser) {
                recalculateAndSyncCurrentUserState();
            } else {
                renderLedger(); // Keep public ledger up to date even if logged out
            }
        });

        room.collection('wallet_v3').subscribe(wallets => {
            if (leaderboardPage.classList.contains('active')) {
                loadLeaderboard();
            }
        });

        room.collection('generated_sites_v1').subscribe(renderSiteGallery);

        room.collection('inscriptions_v1').subscribe(inscriptions => {
            if (state.currentUser && document.getElementById('inscriptions-page').classList.contains('active')) {
                renderUserInscriptions();
            }
        });

        const lastPhone = localStorage.getItem('lastConnectedPhone');
        if (lastPhone) {
            connectWallet(lastPhone);
        } else {
            updateUI();
        };
        
        navigateTo('home-page');
    }

    init();

    // Bitcoin Price Update
    const COINGECKO_BTC_PRICE_URL = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";
    const BTC_PRICE_UPDATE_INTERVAL_MS = 60000;

    async function fetchBitcoinPrice() {
        try {
            const response = await fetch(COINGECKO_BTC_PRICE_URL);
            if (!response.ok) {
                throw new Error(`CoinGecko API request failed with status ${response.status}`);
            }
            const data = await response.json();

            if (data.bitcoin && data.bitcoin.usd) {
                const newPrice = data.bitcoin.usd;
                console.log(`Updated Bitcoin price: $${newPrice}`);
                btcPrice = newPrice;
                
                // If dashboard is active, re-render it with the new price
                if (document.getElementById('dashboard-page').classList.contains('active')) {
                    renderOrUpdateDashboard();
                }
                if (backendLiveBtcPriceEl) {
                    backendLiveBtcPriceEl.textContent = `$${newPrice.toLocaleString()}`;
                }
                // Add a log to the backend console if admin is viewing it
                if (document.getElementById('backend-page').classList.contains('active')) {
                    log(`[SYSTEM] Fetched real-time BTC price from CoinGecko: $${newPrice}`, false, 'SYSTEM');
                }
            }
        } catch (error) {
            console.error("Error fetching Bitcoin price:", error);
            if (backendLiveBtcPriceEl) {
                backendLiveBtcPriceEl.textContent = `Error`;
            }
            if (document.getElementById('backend-page').classList.contains('active')) {
                log(`[ERROR] Failed to fetch BTC price: ${error.message}`, false, 'ERROR');
            }
        }
    }

    // Fetch initial price and set interval for updates
    fetchBitcoinPrice();
    setInterval(fetchBitcoinPrice, BTC_PRICE_UPDATE_INTERVAL_MS);

    // This is a browser simulation of a serverless function response
    // It's attached to the window so the fetch mock can call it.
    window.handleMoonPayRequest = async (req, res) => {
        // Since this is a browser simulation, we need to pass the handler function.
        // In a real Node environment, you'd just import and call it.
        // Assuming moonpay-api.js has been loaded and exposed its handler.
        if (typeof window.moonPayApiHandler === 'function') {
            await window.moonPayApiHandler(req, res);
        } else {
            res.status(500).json({ error: 'MoonPay API handler not found.' });
        }
    };

    // Simulates opening the MoonPay widget for withdrawing funds.
    async function openMoonPayWidget() {
        if (!state.currentUser) {
            alert('Please connect your wallet to withdraw funds.');
            return;
        }

        // Simulate backend call logging
        const backendPageActive = document.getElementById('backend-page').classList.contains('active');
        if (backendPageActive) {
            log(`Client: Requesting MoonPay URL for withdrawal.`, false, 'CLIENT');
            log(`Client: Simulating FETCH to /api/moonpay-url`, false, 'CLIENT');
            await new Promise(res => setTimeout(res, API_SIMULATION_DELAY / 2));
            log(`--- START SERVERLESS FUNCTION LOGS (/api/moonpay-url) ---`, false, 'SYSTEM');
            log(`[INFO] LLM-Security: Analyzing request for malicious intent... Intent: 'Withdrawal'. Confidence: ${99.8}%. OK.`, false, 'SERVER');
            await new Promise(res => setTimeout(res, 300));
            log(`[INFO] QuantumCore: Verifying request origin via entangled key pair... Verified.`, false, 'SERVER');
            await new Promise(res => setTimeout(res, 300));
        }

        try {
            // Simulate fetch request and response objects
            const req = {
                headers: { 'x-phone-number': state.currentUser.phone },
                _internal_sim_data: { adminPhone: ADMIN_PHONE }
            };

            let _status = 200;
            let _body = {};
            const res = {
                status: function(code) {
                    _status = code;
                    return this; // Allow chaining .json()
                },
                json: function(data) {
                    _body = data;
                },
                _getResult: function() {
                    return { status: _status, body: _body };
                }
            };
            
            // Call the simulated handler
            await window.handleMoonPayRequest(req, res);
            const { status, body } = res._getResult();
            
            if (backendPageActive) {
                if (status === 200) {
                     log(`[INFO] Admin authorized. Responding to client with URL: ${body.moonpayUrl.substring(0, 35)}...`, false, 'SERVER');
                } else {
                     log('[WARN] ML-Detector: Unauthorized access attempt detected for MoonPay endpoint.', false, 'SERVER');
                     log(`[ERROR] Authorization check failed. Responding with ${status}.`, false, 'ERROR');
                }
                 log(`--- END SERVERLESS FUNCTION LOGS ---`, false, 'SYSTEM');
            }
            
            if (status !== 200) {
                throw new Error(body.error || 'Failed to get MoonPay URL.');
            }

            alert(`Redirecting to MoonPay to complete your withdrawal. (This is a simulation).`);
            window.open(body.moonpayUrl, '_blank');

        } catch (error) {
            console.error("MoonPay Error:", error);
            alert(`Could not process withdrawal: ${error.message}`);
             if (backendPageActive) {
                 log(`[ERROR] Client-side error during MoonPay flow: ${error.message}`, false, 'ERROR');
             }
        }
    }

    withdrawBtn.addEventListener('click', openMoonPayWidget);
});
