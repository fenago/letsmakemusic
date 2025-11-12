# Suno API Configuration

## API Details
- **Provider:** sunoapi.org
- **Base URL:** `https://api.sunoapi.org`
- **API Key:** Stored in `.env` file (DO NOT COMMIT)

## Files Created

### 1. `.env` (NEVER COMMIT THIS)
Contains your actual API key. This file is gitignored automatically.

```bash
SUNO_API_KEY=55fc5a26ff12dd6a1ab709d8d37e0cd4
SUNO_API_BASE_URL=https://api.sunoapi.org
```

### 2. `.env.example` (Safe to commit)
Template file for other developers. Does not contain real secrets.

### 3. `.gitignore` (Comprehensive protection)
Protects ALL sensitive files including:
- `.env` and all variants (`.env.*`, `.env.local`, etc.)
- API keys and secrets
- Firebase configs (if they contain private keys)
- iOS/Android keystores and certificates
- Build artifacts
- Node modules
- And much more...

## How to Use the API Key in Your Code

### React Native / JavaScript:
```javascript
import Config from 'react-native-config';

// Access the API key
const SUNO_API_KEY = Config.SUNO_API_KEY;
const SUNO_API_BASE_URL = Config.SUNO_API_BASE_URL;

// Make API calls
fetch(`${SUNO_API_BASE_URL}/endpoint`, {
  headers: {
    'Authorization': `Bearer ${SUNO_API_KEY}`,
    'Content-Type': 'application/json',
  },
})
```

### Install react-native-config if needed:
```bash
yarn add react-native-config
cd ios && pod install && cd ..
```

## Security Best Practices

✅ **DO:**
- Keep `.env` in `.gitignore`
- Use `.env.example` for documentation
- Rotate API keys if accidentally exposed
- Use different keys for development/production
- Store production keys in secure environment variables

❌ **DON'T:**
- Commit `.env` to git
- Share API keys in Slack/Discord/Email
- Hardcode API keys in source code
- Store keys in comments or documentation
- Push keys to public repositories

## If You Accidentally Commit Your API Key

1. **Immediately revoke the key** at sunoapi.org
2. Generate a new API key
3. Update `.env` with the new key
4. Remove the key from git history:
   ```bash
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch .env" \
     --prune-empty --tag-name-filter cat -- --all
   ```
5. Force push (if working alone):
   ```bash
   git push origin --force --all
   ```

## For Team Members

If you're cloning this repo:
1. Copy `.env.example` to `.env`
2. Ask the team lead for the actual API keys
3. Never commit your `.env` file

---

**Last Updated:** 2025-11-11
**API Key Set Up:** Yes ✅
**Protected by .gitignore:** Yes ✅
