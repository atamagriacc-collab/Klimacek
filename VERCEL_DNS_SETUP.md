# Vercel DNS Configuration for Firebase Email

## Status
Your domain `klimacek.app` is correctly configured with Vercel's nameservers:
- ns1.vercel-dns.com
- ns2.vercel-dns.com

## Required DNS Records for Firebase Email

You need to add the following DNS records through the Vercel Dashboard:

### Instructions

1. **Go to Vercel Dashboard**
   - Navigate to: https://vercel.com/dashboard
   - Select your team: "Klimacek's projects"
   - Go to the project: "klimacek"

2. **Access Domain Settings**
   - Click on "Domains" tab
   - Find `klimacek.app` in the list
   - Click on "DNS" or "Manage DNS"

3. **Add the Following Records**

#### 1. SPF Record (TXT)
- **Type:** TXT
- **Name:** @ (or leave blank for root)
- **Value:** `v=spf1 include:_spf.firebasemail.com ~all`
- **TTL:** 3600 (or default)
- **Purpose:** Authorizes Firebase to send emails on behalf of your domain

#### 2. Firebase Verification (TXT)
- **Type:** TXT
- **Name:** @ (or leave blank for root)
- **Value:** `firebase=klimacek-iot`
- **TTL:** 3600 (or default)
- **Purpose:** Verifies domain ownership for Firebase

#### 3. DKIM Record 1 (CNAME)
- **Type:** CNAME
- **Name:** `firebase1._domainkey`
- **Value:** `mail-klimacek-app.dkim1._domainkey.firebasemail.com.`
- **TTL:** 3600 (or default)
- **Purpose:** Email authentication signature

#### 4. DKIM Record 2 (CNAME)
- **Type:** CNAME
- **Name:** `firebase2._domainkey`
- **Value:** `mail-klimacek-app.dkim2._domainkey.firebasemail.com.`
- **TTL:** 3600 (or default)
- **Purpose:** Email authentication signature (backup)

## Alternative: Using Vercel CLI

If you have access to a Vercel API token:

```bash
# Set your token
export VERCEL_TOKEN="your-vercel-token"

# Add TXT records
vercel dns add klimacek.app "@" TXT "v=spf1 include:_spf.firebasemail.com ~all" --token="$VERCEL_TOKEN" --team="team_wKAZT3BDfEf2l4ye3SuEuxNW"
vercel dns add klimacek.app "@" TXT "firebase=klimacek-iot" --token="$VERCEL_TOKEN" --team="team_wKAZT3BDfEf2l4ye3SuEuxNW"

# Add CNAME records
vercel dns add klimacek.app firebase1._domainkey CNAME mail-klimacek-app.dkim1._domainkey.firebasemail.com. --token="$VERCEL_TOKEN" --team="team_wKAZT3BDfEf2l4ye3SuEuxNW"
vercel dns add klimacek.app firebase2._domainkey CNAME mail-klimacek-app.dkim2._domainkey.firebasemail.com. --token="$VERCEL_TOKEN" --team="team_wKAZT3BDfEf2l4ye3SuEuxNW"

# List all DNS records to verify
vercel dns ls klimacek.app --token="$VERCEL_TOKEN" --team="team_wKAZT3BDfEf2l4ye3SuEuxNW"
```

## Verification

After adding the records, verify them using:

```bash
# Check TXT records
nslookup -type=TXT klimacek.app

# Check CNAME records
nslookup firebase1._domainkey.klimacek.app
nslookup firebase2._domainkey.klimacek.app
```

## DNS Propagation

- DNS changes typically propagate within 5-30 minutes
- Full global propagation can take up to 48 hours
- Firebase will automatically verify the domain once DNS propagates

## Firebase Console Verification

1. Go to Firebase Console: https://console.firebase.google.com
2. Select project: `klimacek-iot`
3. Navigate to: Authentication > Settings > Authorized domains
4. Check if `klimacek.app` appears as verified

## Important Notes

- The domain is already properly configured with Vercel's nameservers
- You must add these records through Vercel (not your domain registrar)
- If records already exist with the same name, you may need to update or replace them
- Multiple TXT records with the same name (@ for root) can coexist

## Support

- Vercel DNS Documentation: https://vercel.com/docs/domains/managing-dns-records
- Firebase Email Documentation: https://firebase.google.com/docs/auth/custom-email-handler
- Team ID: team_wKAZT3BDfEf2l4ye3SuEuxNW
- Project ID: prj_IeKfRAkABHmjKnapbAQCAhcyb0VX